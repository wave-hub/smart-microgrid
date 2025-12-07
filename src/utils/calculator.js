export const calculateSystem = (inputs) => {
    const {
        scenarioId = 'residential', // Default
        dailyConsumption, // kWh
        peakLoad = 10, // kW
        sunHours = 4,
        autonomyDays = 1,
        location = null,

        // Scenario Specifics
        roofArea = 0,
        transformerCap = 0,
        evConfig = {}, // From EV Station inputs
        microgridConfig = {}
    } = inputs;

    // Constants
    const PERFORMANCE_RATIO = 0.82;
    const effectiveSunHours = location ? location.sunHours : sunHours;

    let reqPVKw = 0;
    let reqBatKwh = 0;
    let reqInvKw = 0;
    let reqDieselKw = 0;
    let evStats = {};

    // --- LOGIC BRANCHING ---

    // 1. PV Sizing (Residential, C&I PV, C&I Hybrid, Microgrids)
    if (['residential', 'ci_pv', 'ci_hybrid', 'microgrid_on', 'microgrid_off'].includes(scenarioId)) {
        if (roofArea > 0) {
            // Capacity limited by roof
            reqPVKw = roofArea * 0.15; // 150W per m2
        } else {
            // Demand driven
            reqPVKw = dailyConsumption / (effectiveSunHours * PERFORMANCE_RATIO);
        }
    }

    // 2. Battery Sizing (Residential, C&I ESS, C&I Hybrid, Microgrids)
    if (['residential', 'ci_ess', 'ci_hybrid', 'microgrid_on', 'microgrid_off'].includes(scenarioId)) {
        if (scenarioId === 'microgrid_off') {
            reqBatKwh = (dailyConsumption * autonomyDays) / 0.9;
        } else if (scenarioId === 'ci_ess') {
            // Arbitrage focus: sized to peak load * 2-4 hours usually, simplified here
            reqBatKwh = peakLoad * 2;
        } else {
            // Standard self-consumption
            reqBatKwh = dailyConsumption * 0.4;
        }
    }

    // 3. Inverter Sizing
    if (scenarioId === 'ev_station') {
        reqInvKw = 0; // EV stations usually AC coupled or DC direct, simple calc
    } else {
        reqInvKw = Math.max(peakLoad, reqPVKw) * 1.1;
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

    // 7. Service Area Logic (Delta)
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

    // 8. Diesel (Off-grid)
    if (scenarioId === 'microgrid_off') {
        reqDieselKw = peakLoad * 1.2;
    }

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
    let costWithoutSystem = 0;
    let costWithSystem = 0;

    for (let i = 0; i < 24; i++) {
        // 1. Load Calculation
        const isPeakHour = (i >= 16 && i <= 21);
        const currentRate = isPeakHour ? RATE_PEAK : RATE_OFF_PEAK;

        let loadFactor = getHourLoad(i, scenarioId.includes('ci') || scenarioId === 'microgrid_on' ? 'ci' : 'residential');
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
                    batteryActionKw = Math.min(Math.abs(netLoadKw), reqBatKwh * 0.5);
                }
            }
        }

        // Final Grid Import
        let gridImportKw = Math.max(0, netLoadKw + batteryActionKw);

        // Financial Accumulation (Daily)
        costWithoutSystem += currentLoadKw * currentRate;
        costWithSystem += gridImportKw * currentRate;

        hourlyData.push({
            name: `${i}:00`,
            load: parseFloat(currentLoadKw.toFixed(2)),
            solar: parseFloat(solarGenKw.toFixed(2)),
            grid: parseFloat(gridImportKw.toFixed(2))
        });
    }

    // Financials (Simplified for V7 demo)
    const totalCapex = (reqPVKw * 3000) + (reqBatKwh * 1200) + (reqInvKw * 600);
    // Savings = Cost avoided * 365
    // Note: This replaces the old simple savings formula
    const dailySaving = costWithoutSystem - costWithSystem;
    const annualSavings = dailySaving * 365;

    return {
        scenarioId,
        pvKw: parseFloat(reqPVKw.toFixed(1)),
        batteryKwh: parseFloat(reqBatKwh.toFixed(1)),
        inverterKw: parseFloat(reqInvKw.toFixed(1)),
        dieselKw: parseFloat(reqDieselKw.toFixed(1)),
        evStats,
        financials: {
            capex: totalCapex.toFixed(0),
            annualSavings: annualSavings.toFixed(0),
            paybackYears: annualSavings > 0 ? (totalCapex / annualSavings).toFixed(1) : '99',
            roi: annualSavings > 0 ? ((annualSavings / totalCapex) * 100).toFixed(1) : '0'
        },
        charts: { hourly: hourlyData, yearly: [] }
    };
};
