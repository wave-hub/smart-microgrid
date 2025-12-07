export const products = {
    panels: [
        {
            id: 'p-jinko-tiger',
            name: 'Jinko Tiger Neo N-type 620W',
            powerW: 620,
            price: 1300,
            specs: { eff: '22.3%', type: 'N-Type Bifacial', dims: '2278x1134mm', warranty: '12/30 Years' },
            detailedSpecs: {
                // Electrical
                'Rated Max Power (Pmax)': '620 W',
                'Open Circuit Voltage (Voc)': '52.3 V',
                'Short Circuit Current (Isc)': '14.5 A',
                'Max Power Voltage (Vmp)': '43.2 V',
                'Max Power Current (Imp)': '14.36 A',
                'Module Efficiency': '22.3%',
                'Power Tolerance': '0~+3%',
                // Temperature
                'Temp Coeff of Pmax': '-0.29 %/°C',
                'Temp Coeff of Voc': '-0.25 %/°C',
                'Temp Coeff of Isc': '0.045 %/°C',
                'NOCT': '45±2 °C',
                // Mechanical
                'Cell Type': 'N-type Monocrystalline',
                'No. of Cells': '144 (6x24)',
                'Dimensions': '2278 x 1134 x 30 mm',
                'Weight': '28.0 kg',
                'Front Glass': '2.0mm, Anti-Reflection Coating',
                'Frame': 'Anodized Aluminum Alloy',
                'Junction Box': 'IP68 Rated',
                'Output Cables': 'TUV 1x4.0mm², (+): 400mm, (-): 200mm'
            },
            description: 'High-efficiency N-type TOPCon technology module. Optimized for C&I projects with lower degradation and better temperature coefficient.',
            image: '/panel_600w.png',
            link: 'https://www.jinkosolar.com/en/site/tigerneo'
        },
        {
            id: 'p-longi-himo6',
            name: 'Longi Hi-MO 6 Explorer 570W',
            powerW: 570,
            price: 1200,
            specs: { eff: '22.5%', type: 'HPBC Mono', dims: '2278x1134mm' },
            detailedSpecs: {
                'Open Circuit Voltage (Voc)': '51.8V',
                'Short Circuit Current (Isc)': '14.2A',
                'Max Power Voltage (Vmp)': '42.9V',
                'Max Power Current (Imp)': '13.3A',
                'Module Efficiency': '22.5%',
                'Technology': 'HPBC Mono',
                'Dimensions': '2278 x 1134 x 35 mm',
                'Weight': '27.5 kg',
                'Load Capacity': '5400Pa (Snow) / 2400Pa (Wind)',
                'Warranty': '15/25 Years'
            },
            description: 'Features HPBC technology for aesthetic appearance and high reliability. Ideal for high-end residential and commercial rooftops.',
            image: '/panel_550w.png',
            link: 'https://www.longi.com/en/products/modules/hi-mo-6/'
        },
        {
            id: 'p-trina-vertex',
            name: 'Trina Vertex S+ 450W',
            powerW: 450,
            price: 950,
            specs: { eff: '21.8%', type: 'N-Type Dual Glass', dims: '1762x1134mm' },
            detailedSpecs: {
                'Open Circuit Voltage (Voc)': '41.5V',
                'Short Circuit Current (Isc)': '10.8A',
                'Max Power Voltage (Vmp)': '34.2V',
                'Max Power Current (Imp)': '10.2A',
                'Efficiency': '21.8%',
                'Cell Type': 'N-Type i-TOPCon',
                'Dimensions': '1762 x 1134 x 30 mm',
                'Weight': '21.0 kg',
                'Fire Rating': 'Class A',
                'Warranty': '25 Years Product'
            },
            description: 'Dual-glass design for enhanced durability and fire resistance. Compact size perfect for complex roof layouts.',
            image: '/panel_450w.png',
            link: 'https://www.trinasolar.com/us/product/Vertex-S-plus'
        }
    ],
    inverters: [
        // String Inverters for C&I
        {
            id: 'inv-sg110cx',
            name: 'Sungrow SG110CX-P2 (110kW)',
            type: 'String',
            capacityKw: 110,
            price: 28000,
            specs: { mppt: 12, eff: '98.5%', voltage: '1000V', ip: 'IP66' },
            detailedSpecs: {
                // Input (DC)
                'Max. PV Input Voltage': '1100 V',
                'Min. PV Input Voltage': '200 V',
                'Nominal Input Voltage': '600 V',
                'Start-up Voltage': '250 V',
                'No. of MPPTs': '12',
                'Max. PV Input Current': '26 A * 12',
                // Output (AC)
                'Rated AC Output Power': '110 kW',
                'Max. AC Output Current': '167 A',
                'Rated Grid Voltage': '380 / 400 / 415 V',
                'Grid Frequency': '50 / 60 Hz',
                'Total Harmonic Distortion': '< 3% (at nominal power)',
                'Power Factor': '> 0.99 / 0.8 leading - 0.8 lagging',
                // Efficiency
                'Max. Efficiency': '98.7%',
                'European Efficiency': '98.3%',
                // General
                'Protection Rating': 'IP66',
                'Cooling Method': 'Smart Forced Air Cooling',
                'Display': 'LED, Bluetooth + App',
                'Communication': 'RS485 / Optional: Wi-Fi, Ethernet'
            },
            description: 'Multi-MPPT string inverter for 1000Vdc systems. Features smart cooling, PID recovery, and integrated arc fault protection.',
            image: '/inverter_string.png',
            compatibility: { battery: 'HV_Cabinet' },
            link: 'https://en.sungrowpower.com/productDetail/2004'
        },
        {
            id: 'inv-huawei-100k',
            name: 'Huawei SUN2000-100KTL-M2',
            type: 'String',
            capacityKw: 100,
            price: 27000,
            specs: { mppt: 10, eff: '98.8%', voltage: '1100V', ip: 'IP66' },
            detailedSpecs: {
                'Max. Input Voltage': '1100 V',
                'MPPT Voltage Range': '200 - 1000 V',
                'Nb. of MPPTs': '10',
                'Max. Efficiency': '98.8%',
                'Rated AC Power': '100 kW',
                'Protection': 'IP66',
                'AFCI': 'AI Powered Arc Detection',
                'PID Recovery': 'Integrated',
                'Communication': 'RS485, WLAN/FE, 4G',
                'Dimensions': '1035 x 700 x 365 mm'
            },
            description: 'Smart string inverter with AI-powered arc detection and fuse-free design. Supports smart I-V curve diagnosis.',
            image: '/inverter_string_small.png',
            compatibility: { battery: 'HV_Cabinet' },
            link: 'https://solar.huawei.com/en/products/commercial-industrial/sun2000-100ktl-m2'
        },
        {
            id: 'inv-sg50cx',
            name: 'Sungrow SG50CX-P2 (50kW)',
            type: 'String',
            capacityKw: 50,
            price: 15000,
            specs: { mppt: 5, eff: '98.4%', voltage: '1000V', ip: 'IP66' },
            detailedSpecs: { 'Max. AC Output': '50 kW', 'MPPTs': '5', 'Protection': 'IP66' },
            description: 'Medium power string inverter for commercial rooftops. Flexible design with 5 MPPTs.',
            image: '/inverter_string.png',
            compatibility: { battery: 'HV_Cabinet' },
            link: 'https://en.sungrowpower.com/productDetail/2004'
        },
        {
            id: 'inv-huawei-20k',
            name: 'Huawei SUN2000-20KTL-M2',
            type: 'String',
            capacityKw: 20,
            price: 4500,
            specs: { mppt: 2, eff: '98.6%', voltage: '800V', ip: 'IP65' },
            detailedSpecs: { 'Max. AC Output': '22 kW', 'MPPTs': '2', 'Protection': 'IP65' },
            description: 'Compact commercial inverter for smaller C&I projects.',
            image: '/inverter_small.png',
            compatibility: { battery: 'HV_Stack' },
            link: 'https://solar.huawei.com/en/products/commercial-industrial'
        },
        // Hybrid Inverters for Residential/ESS
        {
            id: 'inv-sh10rt',
            name: 'Sungrow SH10RT (10kW Hybrid)',
            type: 'Hybrid',
            capacityKw: 10,
            price: 8500,
            specs: { batteryV: '150-600V', phase: '3P', backup: 'Yes', switch: '<20ms' },
            detailedSpecs: {
                'Battery Voltage Range': '150 - 600 V',
                'Max. Charge/Discharge Current': '25 A',
                'Backup Power': '3 Phase, 10 kVA',
                'Switch Time': '< 20 ms',
                'Max. PV Input Power': '15 kW',
                'Max. Efficiency': '98.4%',
                'Communication': 'RS485, CAN, Ethernet',
                'Topology': 'Transformerless'
            },
            description: 'Three-phase hybrid inverter with seamless backup transition. Compatible with high-voltage batteries for efficient storage.',
            image: '/inverter_hybrid.png',
            compatibility: { battery: 'HV_Stack' },
            link: 'https://en.sungrowpower.com/productDetail/1004'
        },
        {
            id: 'inv-huawei-10k',
            name: 'Huawei SUN2000-10KTL-M1',
            type: 'Hybrid',
            capacityKw: 10,
            price: 8200,
            specs: { batteryV: 'High Voltage', phase: '3P', protection: 'AFCI' },
            detailedSpecs: {
                'Compatible Battery': 'Huawei LUNA2000',
                'Battery Voltage': '600 - 980 V',
                'Max. AC Output': '11,000 VA',
                'Noise': '< 29 dB',
                'Protection': 'IP65',
                'Weight': '17 kg',
                'Safety Standard': 'IEC 62109-1 / 2'
            },
            description: 'Versatile hybrid inverter integrating solar and battery inputs. Features compact design and silent operation.',
            image: '/inverter_small.png',
            compatibility: { battery: 'HV_Stack' },
            link: 'https://solar.huawei.com/en/products/residential/sun2000-3-10ktl-m1'
        }
    ],
    batteries: [
        {
            id: 'bat-sbr096',
            name: 'Sungrow SBR096 (9.6kWh)',
            type: 'Stack',
            capacityKwh: 9.6,
            price: 16000,
            specs: { life: '10 Years', tech: 'LFP', voltage: '192V', dod: '100%' },
            detailedSpecs: {
                // Performance
                'Nominal Energy': '9.6 kWh',
                'Usable Energy': '9.6 kWh',
                'Nominal Voltage': '192 V',
                'Operating Voltage range': '150 - 219 V',
                'Rated DC Power': '5.76 kW',
                'Max. Charge/Discharge Power': '6.43 kW',
                // Mechanical
                'Cell Technology': 'Lithium Iron Phosphate (LFP)',
                'Dimensions': '625 x 545 x 330 mm',
                'Weight': '114 kg',
                'Installation Location': 'Indoor / Outdoor',
                'IP Rating': 'IP55',
                // Standard & Warranty
                'Cycle Life': '100% DOD, 6000 cycles',
                'Warranty': '10 Years',
                'Safety Standard': 'IEC 62619, IEC 62040, UN38.3',
                'Transport Standard': 'UN38.3'
            },
            description: 'Modular high-voltage LFP battery system. Stackable design allows flexible capacity expansion from 9.6kWh to 25.6kWh.',
            image: '/battery_residential.png',
            compatibility: { type: 'HV_Stack' },
            link: 'https://en.sungrowpower.com/productDetail/1715'
        },
        {
            id: 'bat-luna2000',
            name: 'Huawei LUNA2000-10-S0',
            type: 'Stack',
            capacityKwh: 10,
            price: 17000,
            specs: { life: '10 Years', tech: 'LFP', depth: '100%', modules: '5kWh x 2' },
            detailedSpecs: {
                'Battery Module': 'LUNA2000-5-E0 (5kWh)',
                'Number of Modules': '2',
                'Usable Energy': '10 kWh',
                'Max. Output Power': '5 kW',
                'Peak Output Power': '7 kW (10s)',
                'Communication': 'RS485 / CAN',
                'Dimensions': '670 x 150 x 960 mm',
                'Weight': '113.8 kg'
            },
            description: 'Smart string energy storage system with 100% depth of discharge. Energy optimizer included in each battery module.',
            image: '/battery_residential.png',
            compatibility: { type: 'HV_Stack' },
            link: 'https://solar.huawei.com/en/products/residential/luna2000-5-10-15-s0'
        },
        {
            id: 'bat-powertitan',
            name: 'Sungrow PowerTitan (Liquid Cooled)',
            type: 'Container',
            capacityKwh: 2200,
            price: 1300000,
            specs: { cooling: 'Liquid', life: '20 Years', ip: 'IP65', safety: 'NFPA855' },
            detailedSpecs: {
                'System Energy': '2752 kWh',
                'Rated Power': 'Up to 1575 kW',
                'Thermal Management': 'Liquid Cooling',
                'Fire Suppression': 'Pack-level + Cabinet-level Aerosol/Water',
                'Anti-Corrosion': 'C5',
                'Operating Temp': '-30 to 50°C',
                'Aux. Loss Reduction': '> 30%',
                'Enclosure': 'IP65 / NEMA 3R'
            },
            description: 'Utility-scale liquid cooled energy storage system. Higher energy density and lower auxiliary power consumption.',
            image: '/battery_container.png',
            compatibility: { type: 'Container' },
            link: 'https://en.sungrowpower.com/productDetail/2005'
        },
        {
            id: 'bat-luna-200k',
            name: 'Huawei LUNA2000-200KWH-2H1',
            type: 'Cabinet',
            capacityKwh: 193.5,
            price: 150000,
            specs: { cooling: 'Smart Air', ip: 'IP55', temp: '-30~55°C' },
            detailedSpecs: {
                'Nominal Capacity': '193.5 kWh',
                'Rated Power': '100 kW',
                'Max. Apparent Power': '110 kVA',
                'Cooling': 'Smart Air Cooling',
                'Dimensions': '2550 x 1200 x 1000 mm',
                'Compliance': 'UL9540A / IEC62619',
                'Operating Altitude': '0 - 4000 m'
            },
            description: 'Smart C&I ESS with integrated PCS and battery. Features pack-level optimization and rack-level battery management.',
            image: '/battery_commercial.png',
            compatibility: { type: 'HV_Cabinet' },
            link: 'https://solar.huawei.com/en/products/commercial-industrial/luna2000-200kwh-2h1'
        },
        // PDF Placeholder Products
        {
            id: 'bat-pdf-home',
            name: 'Home ESS Series (Refer to 20250703 Brochure)',
            type: 'Stack',
            capacityKwh: 10,
            price: 15000,
            specs: { life: '10 Years', tech: 'LFP', note: 'Specs from PDF' },
            detailedSpecs: { 'Note': 'Please verify with attached PDF brochure' },
            description: 'Advanced residential energy storage solution. Please refer to attached technical brochure for detailed performance curves.',
            image: '/battery_residential.png',
            compatibility: { type: 'HV_Stack' }
        },
        {
            id: 'bat-pdf-ci',
            name: 'C&I ESS Cabinet (Refer to 0924 Catalog)',
            type: 'Cabinet',
            capacityKwh: 215,
            price: 140000,
            specs: { cooling: 'Liquid/Air', ip: 'IP55', note: 'Specs from PDF' },
            detailedSpecs: { 'Note': 'Please verify with attached PDF brochure' },
            description: 'Industrial grade energy storage cabinet. See product catalog 0924 for full mechanical and electrical specifications.',
            image: '/battery_commercial.png',
            compatibility: { type: 'HV_Cabinet' }
        }
    ],
    diesel_generators: [
        {
            id: 'dg-cat-50',
            name: 'Caterpillar DE50 GC (50kVA)',
            powerKw: 40,
            price: 28000,
            specs: { fuel: 'Diesel', tank: '219L', hz: '50Hz' },
            detailedSpecs: {
                'Prime Power': '50 kVA / 40 kW',
                'Standby Power': '55 kVA / 44 kW',
                'Engine Model': 'Cat® C3.3',
                'Governor Type': 'Mechanical',
                'Fuel Tank Capacity': '219 Liters',
                'Fuel Consumption': '10.7 L/hr @ 100% Load',
                'Alternator': 'Self-excited, brushless',
                'Control Panel': 'GCCP 1.1'
            },
            description: 'Reliable backup power solution with rugged construction. Designed for standby and prime power applications.',
            image: '/diesel_gen.png',
            link: 'https://www.cat.com/en_US/products/new/power-systems/electric-power/diesel-generator-sets/1000028903.html'
        },
        {
            id: 'dg-cummins-200',
            name: 'Cummins C220 D5 (220kVA)',
            powerKw: 176,
            price: 85000,
            specs: { fuel: 'Diesel', tank: '400L', hz: '50Hz' },
            detailedSpecs: {
                'Prime Power': '200 kVA / 160 kW',
                'Standby Power': '220 kVA / 176 kW',
                'Engine Model': 'QSB7-G5',
                'Controller': 'PowerCommand 1.2',
                'Fuel Tank': '400L Integral',
                'Noise Level': '78 dBA @ 1m',
                'Warranty': '2 Years / 1000 Hours'
            },
            description: 'Heavy-duty commercial generator set. Features advanced digital control and rapid load acceptance.',
            image: '/diesel_gen_large.png',
            link: 'https://www.cummins.com/generators/c220-d5'
        }
    ],
    sts: [
        {
            id: 'sts-1',
            name: 'Atys 100A STS (Static Switch)',
            currentA: 100,
            price: 1500,
            specs: { speed: '<10ms', poles: '3P+N' },
            detailedSpecs: {
                'Rated Current': '100 A',
                'Transfer Time': '< 10 ms (Source 1 to 2)',
                'Poles': '4 Pole (3P+N)',
                'Voltage': '230/400 VAC',
                'Frequency': '50/60 Hz',
                'Operation': 'Automatic / Manual'
            },
            description: 'High-speed Static Transfer Switch for seamless grid/off-grid transition. Ensures continuity for critical loads.'
        }
    ],
    ems: [
        {
            id: 'ems-1',
            name: 'Local EMS Controller (Basic)',
            type: 'Local',
            price: 2000,
            specs: { features: 'Peak Shaving, Zero Export' },
            detailedSpecs: {
                'Control Strategy': 'Self-Consumption, Peak Shaving',
                'Comm. Interface': 'RS485 x 2, ETH x 1',
                'Data Storage': 'Local SD Card (8GB)',
                'Remote Access': 'Cloud + App',
                'Power Supply': '24V DC'
            },
            description: 'Local Energy Management System controller for small-scale microgrids. Optimizes PV self-consumption.'
        },
        {
            id: 'ems-2',
            name: 'Professional Microgrid Controller',
            type: 'Pro',
            price: 15000,
            specs: { features: 'Island Mode, Black Start, DG Control, Weather Forecast' },
            detailedSpecs: {
                'Functions': 'Black Start, DG Sync, Load Shedding',
                'Algorithm': 'AI Prediction + Optimization',
                'Interface': 'RS485/CAN/ETH/4G',
                'Scalability': 'Up to 32 Devices',
                'Standard': 'IEC 61850 / Modbus TCP',
                'Response Time': '< 100ms'
            },
            description: 'Advanced microgrid controller for complex C&I applications. Supports diesel generator coordination and islanding.'
        }
    ],
    ev_chargers: [
        {
            id: 'ev-ac-7',
            name: 'Sungrow 7kW AC Charger',
            powerKw: 7,
            price: 3000,
            specs: { type: 'AC', plug: 'Type 2' },
            detailedSpecs: {
                'Output Power': '7 kW (Single Phase)',
                'Rated Voltage': '230 V AC',
                'Connector Type': 'Type 2 (IEC 62196)',
                'IP Rating': 'IP65',
                'Authentication': 'RFID / App / ISO15118',
                'Connectivity': '4G / Wi-Fi / Ethernet',
                'Cable Length': '5 M',
                'Operating Temp': '-30°C to +50°C'
            },
            description: 'Smart residential AC electric vehicle charger. Compact, stylish, and easy to use.',
            image: '/charger_ac.png'
        },
        {
            id: 'ev-dc-60',
            name: 'Sungrow 60kW DC Fast Charger',
            powerKw: 60,
            price: 45000,
            specs: { type: 'DC', plug: 'CCS2' },
            detailedSpecs: {
                'Max Output Power': '60 kW',
                'Output Voltage Range': '150 - 1000 V DC',
                'Max Output Current': '200 A',
                'Connectors': 'CCS2 x 1 (Optional CCS2 + CHAdeMO)',
                'Efficiency': '> 94%',
                'IP Rating': 'IP54',
                'Noise Level': '< 65 dB',
                'Screen': '10.1 inch Touch Screen'
            },
            description: 'Integrated DC fast charging station for public and commercial use.',
            image: '/charger_dc.png'
        },
        {
            id: 'ev-dc-120',
            name: 'Sungrow 120kW Ultra Fast',
            powerKw: 120,
            price: 90000,
            specs: { type: 'DC', plugs: '2xCCS2' },
            detailedSpecs: {
                'Max Output Power': '120 kW (Dynamic Sharing)',
                'Output Voltage Range': '150 - 1000 V DC',
                'Max Current': '400 A (2 x 200 A)',
                'Connectors': 'Dual CCS2',
                'Cable Cooling': 'Optional',
                'Credit Card Reader': 'Integrated',
                'Safety': 'RCD Type B, Isolation Monitor',
                'Dimensions': '800 x 600 x 1800 mm'
            },
            description: 'High-power charging station for highway service areas and fleets.',
            image: '/charger_ultra.png'
        }
    ],
    foldable_pv_units: [
        {
            id: 'fpv-20',
            name: 'Smart Foldable PV 20ft (35kWp)',
            powerKw: 35,
            storageKwh: 60,
            price: 65000,
            specs: { openTime: '20min', spread: '120m2' },
            detailedSpecs: {
                'PV Capacity': '35 kWp',
                'Unfolded Area': '120 m²',
                'Stowed Dimensions': '6.06 x 2.44 x 2.59 m (20ft ISO)',
                'Deployment Time': '15 - 20 Minutes (2 Persons)',
                'Wind Resistance': 'Force 8 (Deployed) / Force 12 (Stowed)',
                'Energy Storage': 'Optional (Up to 60 kWh internal)',
                'Inverter': 'Integrated Hybrid 30 kW'
            },
            description: 'Rapid deployment mobile solar solution. Prefabricated 20ft container expands into a 35kWp solar farm.',
            image: '/img_topology_foldable.png'
        },
        {
            id: 'fpv-40',
            name: 'Smart Foldable PV Pro 40ft (100kWp)',
            powerKw: 100,
            storageKwh: 200,
            price: 160000,
            specs: { openTime: '45min', spread: '300m2' },
            detailedSpecs: {
                'PV Capacity': '100 kWp',
                'Unfolded Area': '300 m²',
                'Stowed Dimensions': '12.19 x 2.44 x 2.59 m (40ft ISO)',
                'Deployment Time': '45 Minutes (4 Persons)',
                'Wind Load': '120 km/h',
                'Integrated ESS': 'Available (Max 200 kWh)',
                'Mechanism': 'Hydraulic Assist Retraction'
            },
            description: 'Utility-scale relocatable solar power station. Ideal for mining, military, and disaster relief.',
            image: '/img_topology_foldable.png'
        }
    ],
    mobile_ess_units: [
        {
            id: 'hj-mobile-20',
            name: 'HJ Mobile Integrated Box (18kW PV/20kWh)',
            powerKw: 18,
            capacityKwh: 20,
            price: 50000,
            specs: { type: '8ft Container', deploy: '30 mins' },
            detailedSpecs: {
                'Container Size': '8ft Mini Container',
                'PV Power': '18 kWp (Foldable Wings)',
                'Battery Capacity': '20 kWh LFP',
                'Inverter Power': '15 kW',
                'Weight': '3.5 Tons',
                'Transport': 'Standard Truck / Trailer',
                'Outlet': '1 x 63A 3P+N, 4 x 16A 1P'
            },
            description: 'Compact mobile green power unit. 8ft footprint, easily transportable to remote sites.',
            image: '/img_topology_mobile.png'
        },
        {
            id: 'hj-mobile-215',
            name: 'HJ Mobile Integrated Box (60kW PV/215kWh)',
            powerKw: 60,
            capacityKwh: 215,
            price: 180000,
            specs: { type: '20ft Container', deploy: '2 hours' },
            detailedSpecs: {
                'Container Size': '20ft Standard',
                'PV Capacity': '60 kWp (Extensible)',
                'Battery Capacity': '215 kWh Liquid Cooled',
                'Fire Safety': 'Aerosol + Water Sprinkler',
                'Inverter': '100 kW PCS',
                'Application': 'Construction Sites, Festivals'
            },
            description: 'Mid-sized mobile energy station with significant storage. Perfect for temporary event power.',
            image: '/img_topology_mobile.png'
        },
        {
            id: 'hj-mobile-430',
            name: 'HJ Mobile Integrated Box (150kW PV/430kWh)',
            powerKw: 150,
            capacityKwh: 430,
            price: 350000,
            specs: { type: '40ft container', deploy: '4 hours' },
            detailedSpecs: {
                'Container Size': '40ft High Cube',
                'PV Capacity': '150 kWp Max',
                'Battery Capacity': '430 kWh (Expandable to 800)',
                'PCS Power': '250 kW',
                'System Voltage': '800 VDC',
                'Off-grid Capability': 'Yes, Black Start supported'
            },
            description: 'High-capacity mobile power plant. Can support small village electrification or large industrial loads.',
            image: '/img_topology_mobile.png'
        }
    ],
    smart_ess: [
        {
            id: 'hj-container-7mwh',
            name: 'HJ Liquid Cooled Container (7.01MWh)',
            powerKw: 3500,
            capacityKwh: 7010,
            price: 5000000,
            specs: { cooling: 'Liquid', life: '20 Years', ip: 'IP55' },
            detailedSpecs: {
                'Nominal Capacity': '7010 kWh (20ft HC)',
                'Energy Density': 'High Density LFP',
                'Cycle Life': '> 8000 Cycles',
                'Cooling': 'Immersive Liquid Cooling',
                'Integration': 'DC Block (Battery Only)',
                'Voltage Range': '1000 - 1500 V',
                'Weight': '35 Tons'
            },
            description: 'Next-gen ultra-density liquid cooled storage. 7MWh in a single 20ft footprint.'
        },
        {
            id: 'smart-50',
            name: 'Smart Integrated ESS 50',
            powerKw: 40,
            capacityKwh: 50,
            price: 80000,
            specs: { config: '40kW PCS + 50kWh Bat' },
            detailedSpecs: { 'PCS Power': '40 kW', 'Battery': '50 kWh LFP', 'Cooling': 'Air', 'Dimensions': '1.1 x 1.1 x 2.2m', 'IP Rating': 'IP54' },
            description: 'All-in-one C&I storage cabinet.'
        },
        {
            id: 'smart-100',
            name: 'Smart Integrated ESS 100',
            powerKw: 80,
            capacityKwh: 100,
            price: 150000,
            specs: { config: '80kW PCS + 100kWh Bat' },
            detailedSpecs: { 'PCS Power': '80 kW', 'Battery': '100 kWh LFP', 'Cooling': 'Liquid', 'Dimensions': '1.3 x 1.3 x 2.4m', 'IP Rating': 'IP55' },
            description: 'High performance integrated ESS for commercial parks.'
        },
        {
            id: 'smart-150',
            name: 'Smart Integrated ESS 150',
            powerKw: 120,
            capacityKwh: 150,
            price: 210000,
            specs: { config: '120kW PCS + 150kWh Bat' },
            detailedSpecs: { 'PCS Power': '120 kW', 'Battery': '150 kWh', 'Cooling': 'Liquid', 'Screen': 'Included' },
            description: 'Scalable energy storage block.'
        },
        {
            id: 'smart-200',
            name: 'Smart Integrated ESS 200',
            powerKw: 160,
            capacityKwh: 200,
            price: 280000,
            specs: { config: '160kW PCS + 200kWh Bat' },
            detailedSpecs: { 'PCS Power': '160 kW', 'Battery': '200 kWh', 'Certification': 'UL9540, CE' },
            description: 'Standard 200kWh commercial block.'
        },
        {
            id: 'smart-250',
            name: 'Smart Integrated ESS 250',
            powerKw: 200,
            capacityKwh: 250,
            price: 340000,
            specs: { config: '200kW PCS + 250kWh Bat' },
            detailedSpecs: { 'PCS Power': '200 kW', 'Battery': '250 kWh' },
            description: 'Max capacity single cabinet solution.'
        }
    ],
    smart_sst: [
        {
            id: 'sst-400',
            name: 'Smart SST 400kW (AC/DC)',
            powerKw: 400,
            price: 200000,
            specs: { type: 'Solid State Transformer', voltage: '10kV/400V' },
            detailedSpecs: {
                'Input Voltage': '10 kV AC (Medium Voltage)',
                'Output Voltage': '400 V AC / 750 V DC',
                'Rated Power': '400 kW',
                'Frequency': '50/60 Hz',
                'Efficiency': '98% (SiC Technology)',
                'Volume': '50% of Conventional Transformer',
                'Grid Support': 'Reactive Power Compensation'
            },
            description: 'Solid State Transformer (SST) for direct MV grid connection. Integrates transformer and rectifier functions.'
        },
        {
            id: 'sst-700',
            name: 'Smart SST 700kW (AC/DC)',
            powerKw: 700,
            price: 320000,
            specs: { type: 'Solid State Transformer', voltage: '10kV/400V/DC' },
            detailedSpecs: {
                'Input Voltage': '10/35 kV AC',
                'Output Voltage': '400 V AC / ±375 V DC',
                'Rated Power': '700 kW',
                'Efficiency': '98.5%',
                'Isolation': 'High Frequency (20kHz)',
                'Control': 'Bidirectional Power Flow'
            },
            description: 'High-power SST for EV charging hubs and microgrids.'
        }
    ],
    mounting_systems: [
        {
            id: 'mnt-pitched',
            name: 'Pitched Roof Mounting Kit (Rail + Hooks)',
            type: 'Pitched',
            price: 50, // Per kW
            specs: { material: 'AL6005-T5', angle: 'Flush', wind: '60 m/s' },
            detailedSpecs: {
                'Material': 'Anodized Aluminum AL6005-T5',
                'Fasteners': 'Stainless Steel SUS304',
                'Roof Interface': 'Tile Hooks / Hanger Bolts',
                'Wind Load': 'Up to 60 m/s',
                'Snow Load': '1.4 kN/m2',
                'Tilt Angle': 'Flush with Roof',
                'Warranty': '12 Years'
            },
            description: 'Standard rail-based mounting system for sloped tile or metal roofs. Lightweight and easy to install.',
            image: '/mount_pitched.png'
        },
        {
            id: 'mnt-flat',
            name: 'Flat Roof Ballasted System (Triangle)',
            type: 'Flat',
            price: 80, // Per kW
            specs: { material: 'AL6005-T5', angle: '15-30 deg', ballast: 'Concrete Block' },
            detailedSpecs: {
                'Structure': 'Adjustable Triangle Frame',
                'Ballast': 'Pre-cast Concrete Blocks',
                'Tilt Angle': 'Adjustable 15° / 20° / 30°',
                'Wind Resistance': 'Designed to Code',
                'Roof Protection': 'Rubber Mats included',
                'Material': 'Aluminum Alloy',
                'Warranty': '12 Years'
            },
            description: 'Non-penetrating ballasted mounting system for flat concrete roofs. Protects roof waterproofing layer.',
            image: '/mount_flat.png'
        },
        {
            id: 'mnt-ground',
            name: 'Ground Mount System (Carbon Steel)',
            type: 'Ground',
            price: 100, // Per kW
            specs: { material: 'Hot-dip Galvanized Steel', fdn: 'Screw/Concrete' },
            detailedSpecs: {
                'Material': 'HDG Steel Q235B',
                'Coating': 'Zinc Thickness > 65μm',
                'Foundation': 'Ground Screw or Concrete',
                'Span': 'Large Span capability',
                'Wind Load': 'Designed for Typhoon Areas',
                'Warranty': '15 Years'
            },
            description: 'Heavy duty ground mounting structure for open land or carports.',
            image: '/mount_ground.png'
        }
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

    let res = { panels: null, inverter: null, battery: null, diesel: null, sts: null, ems: null, chargers: [], foldable_unit: null, mobile_unit: null, smart_ess: null, smart_sst: null, mount: null };

    // PV Selection (Common)
    if (pvKw > 0 && scenarioId !== 'foldable_pv') { // Foldable has integrated PV
        if (scenarioId === 'residential') {
            res.panels = products.panels.find(p => p.powerW < 500) || products.panels[1];
        } else {
            res.panels = products.panels.find(p => p.powerW >= 550) || products.panels[0];
        }
    }

    // Mounting System Selection
    if (pvKw > 0 && scenarioId !== 'foldable_pv') {
        const roofType = scenarioData?.roof_type || 'Flat';
        if (scenarioData?.construction_type?.includes('Ground')) {
            res.mount = products.mounting_systems.find(m => m.type === 'Ground');
        } else if (roofType.includes('Pitched') || roofType.includes('斜顶')) {
            res.mount = products.mounting_systems.find(m => m.type === 'Pitched');
        } else {
            res.mount = products.mounting_systems.find(m => m.type === 'Flat');
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
                // Prioritize PDF Product for Residential
                res.battery = products.batteries.find(b => b.id === 'bat-pdf-home') || products.batteries[0];
            } else if (batteryKwh > 1000) {
                res.battery = products.batteries.find(b => b.type === 'Container');
            } else {
                // Prioritize PDF Product for C&I
                res.battery = products.batteries.find(b => b.id === 'bat-pdf-ci') || products.batteries[1];
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
            res.mobile_unit = products.mobile_ess_units[2]; // HJ 40ft (430kWh)
        } else if (batteryKwh > 100) {
            res.mobile_unit = products.mobile_ess_units[1]; // HJ 20ft (215kWh)
        } else {
            res.mobile_unit = products.mobile_ess_units[0]; // HJ 8ft (20kWh)
        }
    }

    // Large C&I Container Logic
    if (scenarioId === 'commercial_ess' && batteryKwh > 2000) {
        res.smart_ess = products.smart_ess[0]; // HJ 7MWh
    }

    // Service Area Specifics
    if (scenarioId === 'service_area') {
        // Find closest Smart ESS
        res.smart_ess = products.smart_ess.reduce((prev, curr) =>
            Math.abs(curr.capacityKwh - batteryKwh) < Math.abs(prev.capacityKwh - batteryKwh) ? curr : prev
        );

        // Recommend SST if High Voltage or High Power
        if (gridVoltage === '10kV' || gridVoltage === '35kV' || inverterKw > 300) {
            res.smart_sst = products.smart_sst.find(s => s.powerKw >= inverterKw) || products.smart_sst[1];
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
