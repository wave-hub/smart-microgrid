export const products = {
    panels: [
        { id: 'p1', name: 'Sungrow 550W Mono', powerW: 550, price: 1100, specs: { eff: '21.5%', type: 'Mono-perc' }, image: '/panel_550w.png' },
        { id: 'p2', name: 'Longi 450W Black', powerW: 450, price: 950, specs: { eff: '20.8%', type: 'All-black' }, image: '/panel_450w.png' },
        { id: 'p3', name: 'Jinko 600W Bifacial', powerW: 600, price: 1300, specs: { eff: '22.0%', type: 'Bifacial' }, image: '/panel_600w.png' }
    ],
    inverters: [
        // String Inverters for C&I
        { id: 'inv-s100', name: 'Sungrow SG110CX (100kW)', type: 'String', capacityKw: 100, price: 25000, specs: { mppt: 9, eff: '98.7%' }, image: '/inverter_string.png', compatibility: { battery: 'HV_Cabinet' } },
        { id: 'inv-s50', name: 'Huawei SUN2000-50KTL', type: 'String', capacityKw: 50, price: 15000, specs: { mppt: 6, eff: '98.5%' }, image: '/inverter_string_small.png', compatibility: { battery: 'HV_Cabinet' } },
        // Hybrid Inverters for Residential/ESS
        { id: 'inv-h10', name: 'Sungrow SH10RT (10kW)', type: 'Hybrid', capacityKw: 10, price: 8000, specs: { batteryV: '150-600V', phase: '3P' }, image: '/inverter_hybrid.png', compatibility: { battery: 'HV_Stack' } },
        { id: 'inv-h5', name: 'GoodWe ET 5kW', type: 'Hybrid', capacityKw: 5, price: 5000, specs: { batteryV: 'High Voltage', phase: '3P' }, image: '/inverter_small.png', compatibility: { battery: 'HV_Stack' } }
    ],
    batteries: [
        { id: 'bat-delta-home', name: 'Delta Home Spirit V2 (Stack)', type: 'Stack', capacityKwh: 10, price: 15000, specs: { life: '10 Years', tech: 'LFP' }, image: '/battery_residential.png', compatibility: { type: 'HV_Stack' } },
        { id: 'bat-delta-ci', name: 'Delta C&I Energy Bank', type: 'Cabinet', capacityKwh: 100, price: 85000, specs: { cooling: 'Liquid', ip: 'IP65' }, image: '/battery_commercial.png', compatibility: { type: 'HV_Cabinet' } },
        { id: 'bat-cnt-2mwh', name: 'EnerGiga 2MWh Container', type: 'Container', capacityKwh: 2000, price: 1200000, specs: { cooling: 'Liquid', life: '15 Years' }, image: '/battery_container.png', compatibility: { type: 'Container' } }
    ],
    diesel_generators: [
        { id: 'dg-50', name: 'Cummins 50kW Silent Gen', powerKw: 50, price: 30000, specs: { fuel: 'Diesel', tank: '200L' } },
        { id: 'dg-200', name: 'Caterpillar 200kW Industrial Gen', powerKw: 200, price: 90000, specs: { fuel: 'Diesel', tank: '500L' } }
    ],
    sts: [
        { id: 'sts-1', name: 'Atys 100A STS (Static Switch)', currentA: 100, price: 1500, specs: { speed: '<10ms', poles: '3P+N' } },
        { id: 'sts-2', name: 'ABB 630A Industrial STS', currentA: 630, price: 8000, specs: { speed: '<4ms', poles: '3P+N' } },
        { id: 'sts-3', name: 'Siemens 2500A Grid STS', currentA: 2500, price: 25000, specs: { speed: '<2ms', poles: '3P+N' } }
    ],
    ems: [
        { id: 'ems-1', name: 'Local EMS Controller (Basic)', type: 'Local', price: 2000, specs: { features: 'Peak Shaving, Zero Export' } },
        { id: 'ems-2', name: 'Professional Microgrid Controller', type: 'Pro', price: 15000, specs: { features: 'Island Mode, Black Start, DG Control, Weather Forecast' } }
    ],
    ev_chargers: [
        { id: 'ev-ac-7', name: 'Sungrow 7kW AC Charger', powerKw: 7, price: 3000, specs: { type: 'AC', plug: 'Type 2' }, image: '/charger_ac.png' },
        { id: 'ev-dc-60', name: 'Sungrow 60kW DC Fast Charger', powerKw: 60, price: 45000, specs: { type: 'DC', plug: 'CCS2' }, image: '/charger_dc.png' },
        { id: 'ev-dc-120', name: 'Sungrow 120kW Ultra Fast', powerKw: 120, price: 90000, specs: { type: 'DC', plugs: '2xCCS2' }, image: '/charger_ultra.png' }
    ],
    foldable_pv_units: [
        { id: 'fpv-20', name: 'Delta Soldier 20ft (35kWp)', powerKw: 35, storageKwh: 60, price: 65000, specs: { openTime: '20min', spread: '120m2', brand: 'Delta' }, image: '/img_topology_foldable.png' },
        { id: 'fpv-40', name: 'Delta Soldier Pro 40ft (100kWp)', powerKw: 100, storageKwh: 200, price: 160000, specs: { openTime: '45min', spread: '300m2', brand: 'Delta' }, image: '/img_topology_foldable.png' }
    ],
    mobile_ess_units: [
        { id: 'mess-truck', name: 'Emergency Power Truck', powerKw: 250, capacityKwh: 500, price: 300000, specs: { type: 'Truck', license: 'B2' }, image: '/img_topology_mobile.png' },
        { id: 'mess-trailer', name: 'Mobile ES Trailer', powerKw: 100, capacityKwh: 200, price: 120000, specs: { type: 'Trailer', hitch: 'Heavy Duty' }, image: '/img_topology_mobile.png' }
    ],
    delta_ess: [
        { id: 'delta-50', name: 'Delta Integrated ESS 50', powerKw: 40, capacityKwh: 50, price: 80000, specs: { config: '40kW PCS + 50kWh Bat' } },
        { id: 'delta-100', name: 'Delta Integrated ESS 100', powerKw: 80, capacityKwh: 100, price: 150000, specs: { config: '80kW PCS + 100kWh Bat' } },
        { id: 'delta-150', name: 'Delta Integrated ESS 150', powerKw: 120, capacityKwh: 150, price: 210000, specs: { config: '120kW PCS + 150kWh Bat' } },
        { id: 'delta-200', name: 'Delta Integrated ESS 200', powerKw: 160, capacityKwh: 200, price: 280000, specs: { config: '160kW PCS + 200kWh Bat' } },
        { id: 'delta-250', name: 'Delta Integrated ESS 250', powerKw: 200, capacityKwh: 250, price: 340000, specs: { config: '200kW PCS + 250kWh Bat' } }
    ],
    delta_sst: [
        { id: 'sst-400', name: 'Delta SST 400kW (AC/DC)', powerKw: 400, price: 200000, specs: { type: 'Solid State Transformer', voltage: '10kV/400V' } },
        { id: 'sst-700', name: 'Delta SST 700kW (AC/DC)', powerKw: 700, price: 320000, specs: { type: 'Solid State Transformer', voltage: '10kV/400V/DC' } }
    ]
};

export const recommendProducts = (inputs) => {
    const {
        scenarioId,
        pvKw,
        batteryKwh,
        inverterKw,
        transformerCap,
        evStats,
        scenarioData
    } = inputs;
    const gridVoltage = scenarioData?.grid_voltage;

    let res = { panels: null, inverter: null, battery: null, diesel: null, sts: null, ems: null, chargers: [], foldable_unit: null, mobile_unit: null, delta_ess: null, delta_sst: null };

    // PV Selection (Common)
    if (pvKw > 0 && scenarioId !== 'foldable_pv') { // Foldable has integrated PV
        if (scenarioId === 'residential') {
            res.panels = products.panels.find(p => p.powerW < 500) || products.panels[1];
        } else {
            res.panels = products.panels.find(p => p.powerW >= 550) || products.panels[0];
        }
    }

    // Inverter Selection
    if (inverterKw > 0 && scenarioId !== 'foldable_pv' && scenarioId !== 'mobile_ess') {
        if (scenarioId === 'ci_pv') {
            // String Inverters
            res.inverter = products.inverters.find(i => i.capacityKw >= 100) || products.inverters[0];
        } else if (scenarioId === 'residential') {
            // Residential Hybrid
            res.inverter = products.inverters.find(i => i.type === 'Hybrid' && i.capacityKw <= 20) || products.inverters[3];
        } else {
            // Default Hybrid/PCS
            res.inverter = products.inverters.find(i => i.type === 'Hybrid' && i.capacityKw >= 50) || products.inverters[0];
        }
    }

    // Battery Selection with Compatibility Check
    if (batteryKwh > 0 && scenarioId !== 'foldable_pv' && scenarioId !== 'mobile_ess') {
        const requiredType = res.inverter?.compatibility?.battery;

        if (requiredType) {
            // Strict matching if inverter has requirements
            res.battery = products.batteries.find(b => b.compatibility?.type === requiredType);
            // Fallback strategy if capacity mismatch (simplified)
            if (!res.battery) {
                // Try find any matching type
                res.battery = products.batteries.find(b => b.compatibility?.type === requiredType);
            }
        }

        // Default Logic if no specific Requirement or fallback
        if (!res.battery) {
            if (scenarioId === 'residential') {
                res.battery = products.batteries.find(b => b.id === 'bat-delta-home') || products.batteries[0];
            } else if (batteryKwh > 1000) {
                res.battery = products.batteries.find(b => b.type === 'Container');
            } else {
                res.battery = products.batteries.find(b => b.id === 'bat-delta-ci') || products.batteries[1];
            }
        }
    }

    // Mobile & Foldable Specifics
    if (scenarioId === 'foldable_pv') {
        if (pvKw > 50) {
            res.foldable_unit = products.foldable_pv_units[1]; // 40ft
        } else {
            res.foldable_unit = products.foldable_pv_units[0]; // 20ft
        }
    }

    if (scenarioId === 'mobile_ess') {
        if (batteryKwh > 300) {
            res.mobile_unit = products.mobile_ess_units[0]; // Truck
        } else {
            res.mobile_unit = products.mobile_ess_units[1]; // Trailer
        }
    }

    // Delta Service Area Specifics
    if (scenarioId === 'service_area') {
        // Find closest Delta ESS
        res.delta_ess = products.delta_ess.reduce((prev, curr) =>
            Math.abs(curr.capacityKwh - batteryKwh) < Math.abs(prev.capacityKwh - batteryKwh) ? curr : prev
        );

        // Recommend SST if High Voltage or High Power
        if (gridVoltage === '10kV' || gridVoltage === '35kV' || inverterKw > 300) {
            res.delta_sst = products.delta_sst.find(s => s.powerKw >= inverterKw) || products.delta_sst[1];
        } else {
            // Default to smaller SST if fit, or STS
            res.sts = products.sts[0];
        }
    }

    // Microgrid Specifics
    if (scenarioId === 'microgrid_on' || scenarioId === 'microgrid_off') {
        const estCurrent = (transformerCap || 1000) * 1.44;
        res.sts = products.sts.find(s => s.currentA >= estCurrent) || products.sts[products.sts.length - 1];
        res.ems = products.ems[1]; // Pro EMS
        if (scenarioId === 'microgrid_off') {
            res.diesel = products.diesel_generators.find(d => d.powerKw >= inverterKw) || products.diesel_generators[1];
        }
    }

    // EV Station Specifics
    if (scenarioId === 'ev_station' && evStats) {
        res.chargers = [];
        const count = evStats.count || 10;
        const avgPower = evStats.avgPower || 60;

        if (avgPower >= 60) {
            res.chargers.push({ ...products.ev_chargers[1], count: count });
        } else {
            res.chargers.push({ ...products.ev_chargers[0], count: count });
        }
    }

    return res;
};
