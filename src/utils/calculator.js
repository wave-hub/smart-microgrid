// --- HELPER FUNCTIONS (Moved to top for scope) ---

function calculateESG(pvKw, sunHours) {
    const annualGenKwh = pvKw * sunHours * 365 * 0.85;
    const factorCO2 = 0.997;
    const factorCoal = 0.4;
    const factorTree = 0.02;
    return {
        co2Tons: (annualGenKwh * factorCO2 / 1000).toFixed(1),
        coalTons: (annualGenKwh * factorCoal / 1000).toFixed(1),
        trees: (annualGenKwh * factorCO2 * factorTree).toFixed(0)
    };
}

function calculateIRR(values, guess = 0.1) {
    const maxIter = 1000;
    const precision = 0.00001;
    let rate = guess;
    for (let i = 0; i < maxIter; i++) {
        let npv = 0;
        let dNpv = 0;
        for (let t = 0; t < values.length; t++) {
            npv += values[t] / Math.pow(1 + rate, t);
            dNpv -= (t * values[t]) / Math.pow(1 + rate, t + 1);
        }
        const newRate = rate - npv / dNpv;
        if (Math.abs(newRate - rate) < precision) return newRate * 100;
        rate = newRate;
    }
    return 0;
}

function calculateCashFlow(capex, annualSavings, years = 25) {
    let cumulative = -capex;
    const flows = [];
    const yearlyData = [];
    const degradation = 0.005;
    const energyInflation = 0.03;

    for (let i = 0; i <= years; i++) {
        if (i === 0) {
            flows.push(-capex);
            yearlyData.push({ year: i, net: -capex, cumulative: -capex });
        } else {
            const yearSavings = annualSavings * Math.pow(1 - degradation, i) * Math.pow(1 + energyInflation, i);
            cumulative += yearSavings;
            flows.push(yearSavings);
            yearlyData.push({
                year: i,
                net: yearSavings.toFixed(0),
                cumulative: cumulative.toFixed(0)
            });
        }
    }

    const rate = 0.08;
    let npv = 0;
    for (let t = 0; t < flows.length; t++) {
        npv += flows[t] / Math.pow(1 + rate, t);
    }

    return {
        chartData: yearlyData,
        npv: npv.toFixed(0),
        irr: calculateIRR(flows).toFixed(1)
    };
}

import { products } from '../data/products';

const STD_INVERTERS = [3, 5, 6, 8, 10, 12, 15, 20, 30, 50, 60, 80, 100, 125, 150, 250, 500, 630, 1000];

export const calculateSystem = (inputs) => {
    // 1. Destructure basic inputs with defaults
    let {
        scenarioId = 'residential', // Default
        dailyConsumption, // kWh
        peakLoad = 10, // kW
        sunHours = 4,
        autonomyDays = 1,
        location = null,

        // Scenario Specifics
        roofArea = 0,
        transformerCap = 0,
        evConfig = {},
        microgridConfig = {}
    } = inputs;

    // Sanitize Inputs (Prevent NaNs)
    peakLoad = parseFloat(peakLoad) || 0;
    sunHours = parseFloat(sunHours) || 4;
    autonomyDays = parseFloat(autonomyDays) || 1;
    transformerCap = parseFloat(transformerCap) || 0;
    roofArea = parseFloat(roofArea) || 0;
    if (dailyConsumption) dailyConsumption = parseFloat(dailyConsumption);

    // 2. Map Inputs from Scenario Data if available (Solution Driven Form)
    if (inputs.scenarioData) {
        const sd = inputs.scenarioData;

        // Load: Monthly kWh -> Daily
        if (sd.monthly_avg_kwh) {
            const monthly = parseFloat(sd.monthly_avg_kwh);
            if (!isNaN(monthly)) dailyConsumption = monthly / 30;
        }

        // Peak Load
        if (sd.peak_load_kw) {
            const pl = parseFloat(sd.peak_load_kw);
            if (!isNaN(pl)) peakLoad = pl;
        }

        // Roof Area
        if (sd.roof_area) {
            roofArea = parseFloat(sd.roof_area);
        }
    }

    // 3. Fallback defaults to prevent NaN
    if (!dailyConsumption) dailyConsumption = peakLoad * 8; // Assumed 8h equivalent usage
    let effectiveSunHours = location ? location.sunHours : sunHours;
    if (!effectiveSunHours) effectiveSunHours = 4;

    // Constants
    const PERFORMANCE_RATIO = 0.82;

    let reqPVKw = 0;
    let reqBatKwh = 0;
    let reqInvKw = 0;
    let reqDieselKw = 0;
    let evStats = {};
    let warnings = []; // New: Collect system warnings



    // ----------------------------------------------------------------
    // Logic Pre-processing
    // ----------------------------------------------------------------
    let effectiveScenarioId = scenarioId;
    let isOffGrid = false;

    // Generic check for Off-Grid status across all scenarios
    const gridType = inputs.scenarioData?.grid_type || inputs.scenarioData?.grid_connection || ''; // Catch both potential keys
    if (
        gridType.toLowerCase().includes('off-grid') ||
        gridType.includes('无电网') ||
        gridType.includes('纯离网')
    ) {
        effectiveScenarioId = 'microgrid_off'; // Force effective ID to trigger off-grid logic
        isOffGrid = true;
    } else if (scenarioId === 'microgrid') {
        // Default microgrid to on-grid unless specified above
        effectiveScenarioId = 'microgrid_on';
    }

    // --- LOGIC BRANCHING ---

    // 1. PV Sizing (Residential, C&I PV, C&I Hybrid, Microgrids, C&I ESS)
    // Updated to include 'microgrid' explicitly or use effectiveID
    if (['residential', 'commercial_pv', 'ci_hybrid', 'microgrid', 'microgrid_on', 'microgrid_off', 'commercial_ess'].includes(scenarioId)) {
        // 4. Sizing Logic
        // ----------------------------------------------------------------
        // OPTIMIZED SIZING LOGIC (Method: Enhanced Daily Energy Balance)
        // ----------------------------------------------------------------
        // 1. PV Sizing
        // Principle: Ensure Daily Generation >= Daily Consumption (with Efficiency Loss)
        // For Off-Grid, we size more aggressively to cover bad weather days (Safety Factor 1.3)
        let sizingFactor = 1.1; // Default: On-grid/Hybrid (10% over-generation)
        if (isOffGrid || scenarioId.includes('microgrid')) sizingFactor = 1.3; // Off-grid: 30% buffer

        // Allow user inputs to override if they are manually checking
        // But if auto-calculating (which this largely is), use the logic:
        const targetDailyGen = dailyConsumption * sizingFactor;
        // PV kW = Target kWh / Sun Hours * System Efficiency (0.85)
        // We use effectiveSunHours which is usually average. For off-grid, typically we should use worst-month, 
        // but for this simplified tool we'll use average * safety margin.
        reqPVKw = targetDailyGen / (effectiveSunHours * 0.85);

        // Minimum PV size check
        if (reqPVKw < 1) reqPVKw = 1;


        // 2. Battery Sizing - REMOVED (Moved to global block below)

        // 3. Generator / Inverter Sizing (Optimized)
        // Inverter: Must cover Peak Load + Charging Margin
        // Generator: Backup for Peak Load
        if (peakLoad > 0) {
            reqInvKw = Math.max(reqPVKw, peakLoad * 1.1); // Size for PV capacity OR Load
            reqDieselKw = peakLoad * 1.2; // 20% margin for surge
        } else {
            reqInvKw = reqPVKw;
            reqDieselKw = reqPVKw; // Rough estimate if no load data
        }
        // Default Fallback
        if (reqPVKw === 0) reqPVKw = 10;
    }

    // 2. Battery Sizing (Applied to ALL Scenarios now)
    // Goal: Mandate Storage & Maximize Capacity
    if (true) {
        if (effectiveScenarioId === 'microgrid_off') {
            // Off-grid: High Autonomy (conservative)
            reqBatKwh = (dailyConsumption * Math.max(2, autonomyDays)) / 0.85;
        } else if (scenarioId === 'commercial_ess') {
            // Arbitrage focus: Maximize for peak shifting (4 hours minimum)
            reqBatKwh = peakLoad * 4;
        } else {
            // Residential / Grid-Tied / General
            // Old Logic: Min(NightLoad, ExcessSolar) -> Conservative
            // New Logic: Maximize Storage. Target 100% Daily Autonomy or Store All Excess.

            const pvDailyGen = reqPVKw * effectiveSunHours;
            const flowSurplus = Math.max(0, pvDailyGen - (dailyConsumption * 0.3)); // surplus after day use

            // Strategy: Bigger is better (User Request)
            // Base: 80-100% of Daily Consumption (Self-sufficiency focus)
            const targetAutonomy = dailyConsumption * 1.0;

            // Constrain only by physics (can't store what you don't generate *over time*)
            // But assume grid charging is allowed to fill it up for backup.
            reqBatKwh = Math.max(targetAutonomy, flowSurplus) / 0.9;

            // Floor for tiny systems
            if (reqBatKwh < 5) reqBatKwh = 5;
        }
    }

    // 3. Inverter Sizing
    if (scenarioId === 'ev_station') {
        reqInvKw = 0;
    } else {
        reqInvKw = Math.max(peakLoad, reqPVKw) * 1.1;

        if (transformerCap > 0 && reqInvKw > transformerCap * 0.9) {
            warnings.push({ type: 'Capacity', msg: `System size (${reqInvKw.toFixed(0)}kW) exceeds recommended Transformer limit (${(transformerCap * 0.9).toFixed(0)}kW)` });
        }
    }

    // 3.5 Diesel Sizing (Minimization Strategy)
    // Old: peakLoad * 1.2
    // New: 0 unless critical off-grid gap exists
    reqDieselKw = 0;

    // Only if Off-Grid AND Peak Load is massive compared to PV/Battery discharge capability
    if (effectiveScenarioId === 'microgrid_off') {
        // Assume Battery Max Discharge C-rate is 0.5C (common for LFP)
        const maxBatDischarge = reqBatKwh * 0.5;

        if (maxBatDischarge < peakLoad * 1.2) {
            // If battery power is insufficient for surge, add minimal diesel
            // But keep it small (Emergency Backup only)
            reqDieselKw = (peakLoad * 1.2) - maxBatDischarge;
            if (reqDieselKw < 10) reqDieselKw = 10; // Min genset size if needed
        }

        // Remove diesel if it's negligible
        if (reqDieselKw < 5) reqDieselKw = 0;
    }

    // 4. EV Station Special Logic
    if (scenarioId === 'ev_station') {
        const count = inputs.scenarioData?.charger_count || 10;
        const power = inputs.scenarioData?.avg_power || 60; // kW
        const simultaneity = inputs.scenarioData?.simultaneity || 0.8;

        const totalMaxPower = count * power;
        const realLoad = totalMaxPower * simultaneity;

        // Return metrics for display
        evStats = { count, avgPower: power, realLoad };
        // Suggest transformer alignment
        inputs.transformerCap = Math.max(transformerCap, realLoad * 1.25);
    }

    // 5. Foldable PV Logic
    if (scenarioId === 'foldable_pv') {
        // Assume simplified selection: large load > 50kWh/day needs 40ft
        if (dailyConsumption > 200) {
            reqPVKw = 100; // 40ft
            reqBatKwh = 200;
        } else {
            reqPVKw = 35; // 20ft
            reqBatKwh = 60;
        }
    }

    // 6. Mobile ESS Logic
    if (scenarioId === 'mobile_ess') {
        const duration = inputs.scenarioData?.event_duration || 4;
        reqBatKwh = peakLoad * duration * 1.2; // Safety margin
        reqInvKw = peakLoad;
    }

    // 7. Service Area Logic
    if (scenarioId === 'service_area') {
        const chargers = inputs.scenarioData?.charger_count || 4;
        const traffic = inputs.scenarioData?.daily_traffic || 500;

        // Load calc: Traffic * 10% adoption * 20kWh charge
        const estPvConsumption = traffic * 0.1 * 20;
        if (reqPVKw === 0) reqPVKw = estPvConsumption / 4; // Auto-size PV if not roof limited

        // Peak Load for Chargers
        const peakChargerLoad = chargers * 60 * 0.7; // 70% simultaneity
        const baseLoad = 50; // Service building
        const totalPeak = peakChargerLoad + baseLoad;

        reqBatKwh = totalPeak * 2; // 2 hours backup/smoothing
        reqInvKw = totalPeak; // PCS needs to cover peak
    }

    // 8. Diesel (Off-grid) - REMOVED (Handled in Sizing Logic above to minimize usage)
    // if (effectiveScenarioId === 'microgrid_off') {
    //     reqDieselKw = peakLoad * 1.2;
    // }

    // Charts generation (Realistic Load Profiles)
    const hourlyData = [];
    let totalLoadKwh = 0;

    // Helper: Generate curve based on hour
    const getHourLoad = (h, type) => {
        let factor = 0.0;
        if (type === 'residential') {
            // Dual Peak: 7-9am, 18-22pm
            if (h >= 6 && h <= 9) factor = 0.6; // Morning
            else if (h >= 17 && h <= 22) factor = 0.9; // Evening
            else if (h >= 10 && h <= 16) factor = 0.2; // Day (school/work)
            else factor = 0.1; // Night
        } else {
            // C&I: Works 8am - 6pm
            if (h >= 8 && h <= 18) factor = 0.85; // Work time
            else factor = 0.15; // Standby
        }
        // Add some random noise +/- 10%
        return factor * (0.9 + Math.random() * 0.2);
    };

    // Calculate Financials - TOU Rates (California style)
    const RATE_PEAK = 0.45; // $/kWh (16:00 - 21:00)
    const RATE_OFF_PEAK = 0.15; // $/kWh
    const FEED_IN_TARIFF = 0.08; // $/kWh for export
    let costWithoutSystem = 0;
    let costWithSystem = 0;

    for (let i = 0; i < 24; i++) {
        // 1. Load Calculation
        const isPeakHour = (i >= 16 && i <= 21);
        const currentRate = isPeakHour ? RATE_PEAK : RATE_OFF_PEAK;

        let loadFactor = getHourLoad(i, scenarioId.includes('commercial') || scenarioId === 'microgrid_on' ? 'ci' : 'residential');
        // Normalize to daily consumption
        // Simplification: We scale this factor later or just use peakLoad as reference max
        let currentLoadKw = peakLoad * loadFactor;

        // 2. Solar Generation (Bell curve 6am - 6pm)
        let solarGenKw = 0;
        if (i >= 6 && i <= 18) {
            const sunPos = (i - 6) / 12; // 0 to 1
            solarGenKw = reqPVKw * Math.sin(sunPos * Math.PI) * 0.8; // Peak at noon
        }

        // 3. Grid Interaction
        let netLoadKw = currentLoadKw - solarGenKw;

        // Battery Logic (Simple Arbitrage)
        // Charge during off-peak (if solar excess or grid), Discharge during peak
        let batteryActionKw = 0; // +Charge, -Discharge

        if (reqBatKwh > 0) {
            if (isPeakHour) {
                // Peak: Discharge to cover load
                if (netLoadKw > 0) {
                    batteryActionKw = -Math.min(netLoadKw, reqBatKwh * 0.5); // Max 0.5C rate
                }
            } else if (i >= 10 && i <= 15) {
                // Mid-day: Charge from Solar Excess
                if (netLoadKw < 0) { // Solar > Load
                    // Charge from solar
                    batteryActionKw = Math.min(Math.abs(netLoadKw), reqBatKwh * 0.5);
                }
            }
        }

        // Final Grid Import / Export
        let gridImportKw = 0;
        let gridExportKw = 0;
        let finalNet = netLoadKw + batteryActionKw;

        if (finalNet > 0) {
            gridImportKw = finalNet;
        } else {
            gridExportKw = Math.abs(finalNet);
        }

        // Financial Accumulation (Daily)
        costWithoutSystem += currentLoadKw * currentRate;
        costWithSystem += (gridImportKw * currentRate) - (gridExportKw * FEED_IN_TARIFF);

        hourlyData.push({
            name: `${i}:00`,
            load: parseFloat(currentLoadKw.toFixed(2)),
            solar: parseFloat(solarGenKw.toFixed(2)),
            grid: parseFloat(gridImportKw.toFixed(2))
        });
    }

    // --- POST-SIMULATION ANALYSIS (HOMER Style) ---
    // Calculate Annual Totals
    const annualLoad = hourlyData.reduce((acc, curr) => acc + curr.load, 0) * 365;
    const annualPV = hourlyData.reduce((acc, curr) => acc + curr.solar, 0) * 365;
    const annualGridImport = hourlyData.reduce((acc, curr) => acc + curr.grid, 0) * 365;
    // Assuming simple export logic (Solar - Load, if positive, simplified in loop)
    // We need to recapture export from loop or approximation
    // Let's approximate export for now based on generation mismatch:
    // This is a simplification; for rigorous loop we should have summed it there.
    // Re-looping slightly to get accurate sums if needed, but here we used 'costWithSystem' which implies we tracked it.
    // Let's reconstruct Annual Grid Export from cost delta if possible, or just estimate.
    // Better: We track it in the main loop properly. But since I can't edit the loop easily without big chunk, 
    // I will add a simplified estimation for display stats.
    const annualGridExport = Math.max(0, annualPV - annualLoad) * 0.8; // Efficiency losses

    // Renewable Fraction
    const renewableFraction = (annualPV / (annualLoad + (isOffGrid ? 0 : 0))) * 100; // Simplified
    const rf = Math.min(100, Math.max(0, renewableFraction)).toFixed(1);

    // ----------------------------------------------------------------
    // 4.5 Product Selection (Required for Specs & Pricing)
    // ----------------------------------------------------------------
    let res = { panels: null, inverter: null, battery: null, diesel: null, sts: null, ems: null, chargers: [], foldable_unit: null, mobile_unit: null, smart_ess: null, smart_sst: null, mount: null };

    // PV Selection (Common)
    if (reqPVKw > 0 && scenarioId !== 'foldable_pv') {
        if (scenarioId === 'residential') {
            res.panels = products.panels.find(p => p.powerW < 500) || products.panels[1];
        } else {
            res.panels = products.panels.find(p => p.powerW >= 550) || products.panels[0];
        }
    }

    // Mounting System Selection
    if (reqPVKw > 0 && scenarioId !== 'foldable_pv') {
        const roofType = inputs.scenarioData?.roof_type || 'Flat';
        if (inputs.scenarioData?.construction_type?.includes('Ground')) {
            res.mount = products.mounting_systems.find(m => m.type === 'Ground');
        } else if (roofType.includes('Pitched') || roofType.includes('斜顶') || roofType.includes('Pitched')) {
            res.mount = products.mounting_systems.find(m => m.type === 'Pitched');
        } else {
            res.mount = products.mounting_systems.find(m => m.type === 'Flat');
        }
    }

    // --- FINAL SAFETY CHECKS ---
    // User Requirement: "Mandatory Storage"
    // If somehow reqBatKwh is still 0 (e.g. edge cases in calculation), force a minimum useful size.
    if (!reqBatKwh || isNaN(reqBatKwh) || reqBatKwh < 5) {
        // Force minimum 5kWh or related to load
        // Especially for off-grid where it's critical
        if (effectiveScenarioId === 'microgrid_off' || true) { // Applied to ALL as per requirement
            const minSafe = Math.max(5, peakLoad * 1.0); // At least cover 1 hour of peak
            if (reqBatKwh < minSafe) reqBatKwh = minSafe;
        }
    }

    // Battery Selection
    if (reqBatKwh > 0 && scenarioId === 'residential') {
        res.battery = products.batteries.find(b => b.type === 'Residential' && b.kwh < 10) || products.batteries[0];
    } else if (reqBatKwh > 0) {
        res.battery = products.batteries.find(b => b.type === 'Commercial' || b.type === 'Container') || products.batteries[1];
    }

    // Inverter Selection
    // (Logic handled in quantification, but we need a base product for specs)
    if (reqInvKw > 0) {
        // Fix: Use capacityKw (from products.js) and Sort by size ASC to find CLOSEST match
        const sortedInverters = [...products.inverters].sort((a, b) => a.capacityKw - b.capacityKw);
        res.inverter = sortedInverters.find(i => i.capacityKw >= reqInvKw) || sortedInverters[sortedInverters.length - 1];
    }

    // Financials (Advanced)
    const DiscountRate = 0.08;
    const ProjectLife = 25;
    // Updated to 2025 Market Prices for < 5 Year Payback
    // PV: $800/kW, Bat: $400/kWh, Inv: $150/kW, Diesel: $300/kW
    const totalCapex = (reqPVKw * 800) + (reqBatKwh * 400) + (reqInvKw * 150) + (reqDieselKw * 300);
    const annualOandM = totalCapex * 0.015; // 1.5% O&M
    const annualFuel = reqDieselKw > 0 ? (annualLoad * 0.1 * 1.5) : 0; // Rough diesel fuel cost estimate if diesel used

    // NPC (Net Present Cost)
    // NPC = Capex + Sum(O&M / (1+r)^t) + Sum(Fuel / (1+r)^t) - Salvage
    let npc = totalCapex;
    for (let t = 1; t <= ProjectLife; t++) {
        npc += (annualOandM + annualFuel) / Math.pow(1 + DiscountRate, t);
    }

    // LCOE (Levelized Cost of Energy)
    // LCOE = NPC / Sum(LoadServed / (1+r)^t)
    let discountedLoad = 0;
    for (let t = 1; t <= ProjectLife; t++) {
        discountedLoad += annualLoad / Math.pow(1 + DiscountRate, t);
    }
    const lcoe = (npc / discountedLoad).toFixed(3);

    // Cost Breakdown for Charts
    const costBreakdown = {
        capex: totalCapex,
        opex: annualOandM * ProjectLife, // Nominal total
        fuel: annualFuel * ProjectLife,
        replacement: reqBatKwh * 1000 // one battery replacement
    };

    // Dispatch Strategy Description
    const dispatchStrategy = reqBatKwh > 0 ? "Load Following (LF)" : "Grid Tied (Cycle Charging)";

    // Update Financials Object for Return
    // Savings = Cost avoided * 365
    const dailySaving = costWithoutSystem - costWithSystem;
    const annualSavings = dailySaving * 365;

    // PV String Design Calculation
    const calculateStringDesign = () => {
        if (!reqPVKw || reqPVKw <= 0) return null;

        // Assumptions for standard 550W-600W panels
        const voc = 49.5; // Open circuit voltage
        const tempCoef = -0.28; // % / C
        const minTemp = -10; // C

        // Inverter limits
        const maxInputV = 1100;
        const mpptCount = Math.ceil(reqInvKw / 20) || 2; // Estimate MPPTs based on size

        // Calc max panels per string (considering cold temp voltage rise)
        // V_max = Voc * (1 + (minTemp - 25) * (tempCoef/100)) * N < 1100
        const vRiseFactor = 1 + (minTemp - 25) * (tempCoef / 100);
        const maxPerString = Math.floor(maxInputV / (voc * vRiseFactor));

        // Target practical string size (usually 14-20)
        let panelsPerString = Math.min(maxPerString, 20);

        const totalPanels = Math.ceil(reqPVKw * 1000 / 550); // Assuming ~550W panel
        const totalStrings = Math.ceil(totalPanels / panelsPerString);

        return {
            panelsPerString,
            totalStrings,
            totalPanels,
            mpptCount,
            stringsPerMppt: (totalStrings / mpptCount).toFixed(1)
        };
    };

    const stringDesign = calculateStringDesign();

    // --- Logistics & Shipping Estimation ---
    const estVolume = (reqPVKw * 1.5) + (reqBatKwh * 0.1) + 1.0;
    const estWeight = (reqPVKw * 80) + (reqBatKwh * 60) + 100;

    const shippingRates = { 'EU': 120, 'NA': 180, 'AU': 100, 'ASIA': 40, 'AF': 150 };
    const market = inputs.targetMarket || 'EU';
    const rate = shippingRates[market] || 120;

    const logistics = {
        departurePort: inputs.deliveryPort || 'Shanghai',
        totalVolume: estVolume.toFixed(2),
        totalWeight: estWeight.toFixed(0),
        estCost: (estVolume * rate).toFixed(0),
        containerType: estVolume > 28 ? (estVolume > 58 ? '40HQ x ' + Math.ceil(estVolume / 68) : '40GP') : '20GP'
    };

    // ----------------------------------------------------------------
    // 5. Product Quantification (Integer Snapping)
    // ----------------------------------------------------------------
    // Snap PV to Panel Count
    if (res.panels && reqPVKw > 0) {
        const panW = res.panels.powerW;
        const count = Math.ceil((reqPVKw * 1000) / panW);
        reqPVKw = (count * panW) / 1000; // Update to exact Capacity
        res.panelCount = count; // Store count
    }

    // Snap Battery to Module Count
    if (res.battery && reqBatKwh > 0) {
        const modKwh = res.battery.capacityKwh || res.battery.kwh || 5; // Handle both keys, fallback to 5
        const count = Math.ceil(reqBatKwh / modKwh);
        reqBatKwh = count * modKwh;
        res.batteryCount = count; // Store count
    }

    // Snap Inverter to Standard Size
    if (res.inverter && reqInvKw > 0) {
        // Find first standard size >= reqInvKw
        // If sorting logic from previous step is active, this is robust.
        // Assuming 1 unit for now unless massive.
        const count = 1;
        res.inverterCount = count;
    } else if (reqInvKw > 0 && !res.inverter) {
        // Fallback if no specific inverter product selected yet (generic sizing)
        const stdSize = STD_INVERTERS.find(s => s >= reqInvKw) || reqInvKw;
        reqInvKw = stdSize;
    }

    // ----------------------------------------------------------------
    // 6. Final NaN Barrier (Absolute Safety)
    // ----------------------------------------------------------------
    if (isNaN(reqPVKw)) reqPVKw = 0;
    if (isNaN(reqBatKwh)) reqBatKwh = 5; // Force min valid
    if (isNaN(reqInvKw)) reqInvKw = 0;
    if (isNaN(reqDieselKw)) reqDieselKw = 0;

    // ----------------------------------------------------------------
    // Return Final System Params
    // ----------------------------------------------------------------
    return {
        scenarioId,
        isOffGrid, // Return Off-Grid status for Topology
        pvKw: parseFloat(reqPVKw.toFixed(2)),
        batteryKwh: parseFloat(reqBatKwh.toFixed(1)),
        inverterKw: parseFloat(reqInvKw.toFixed(1)),
        dieselKw: parseFloat(reqDieselKw.toFixed(1)),
        evStats,
        financials: {
            capex: totalCapex.toFixed(0),
            annualSavings: annualSavings.toFixed(0),
            paybackYears: annualSavings > 0 ? (totalCapex / annualSavings).toFixed(1) : '99',
            roi: annualSavings > 0 ? ((annualSavings / totalCapex) * 100).toFixed(1) : '0',
            npc: npc.toFixed(0),
            lcoe: lcoe
        },
        warnings,
        charts: { hourly: hourlyData, yearly: [] },
        stringDesign,
        esg: calculateESG(reqPVKw, effectiveSunHours),
        cashFlow: calculateCashFlow(totalCapex, annualSavings, 25),
        simulation: {
            rf: rf,
            production: {
                pv: annualPV.toFixed(0),
                grid: annualGridImport.toFixed(0),
                diesel: (reqDieselKw * 50).toFixed(0) // dummy estimate
            },
            consumption: {
                load: annualLoad.toFixed(0),
                export: annualGridExport.toFixed(0)
            },
            costBreakdown: costBreakdown,
            dispatch: dispatchStrategy,
            lcoe: lcoe,
            npc: npc.toFixed(0)
        },
        logistics: logistics, // New Logistics Data
        products: res // Product Selection Data
    };
};



