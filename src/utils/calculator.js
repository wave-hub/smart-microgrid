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

    // Financials (Simplified for V7 demo)
    const totalCapex = (reqPVKw * 3000) + (reqBatKwh * 1200) + (reqInvKw * 600);
    const savings = reqPVKw * effectiveSunHours * 365 * 0.8;

    // Charts generation (Shared logic, simplified)
    const hourlyData = [];
    for (let i = 0; i < 24; i++) {
        hourlyData.push({ name: `${i}:00`, load: Math.random() * peakLoad, solar: (i > 6 && i < 18) ? reqPVKw * 0.6 : 0 });
    }

    return {
        scenarioId,
        pvKw: parseFloat(reqPVKw.toFixed(1)),
        batteryKwh: parseFloat(reqBatKwh.toFixed(1)),
        inverterKw: parseFloat(reqInvKw.toFixed(1)),
        dieselKw: parseFloat(reqDieselKw.toFixed(1)),
        evStats,
        financials: {
            capex: totalCapex.toFixed(0),
            annualSavings: savings.toFixed(0),
            paybackYears: (totalCapex / (savings + 1)).toFixed(1), // prevent div/0
            roi: '15.5'
        },
        charts: { hourly: hourlyData, yearly: [] }
    };
};
