export const scenarios = [
    { id: 'residential', nameCN: '户用光储系统', nameEN: 'Residential PV & ESS', type: 'Residential' },
    { id: 'commercial_pv', nameCN: '工商业光伏 (自发自用)', nameEN: 'C&I PV (Self-Consumption)', type: 'C&I' },
    { id: 'commercial_ess', nameCN: '工商业储能 (峰谷套利)', nameEN: 'C&I ESS (Arbitrage)', type: 'C&I' },
    { id: 'microgrid', nameCN: '微电网 (离网/保电)', nameEN: 'Microgrid (Backup/Island)', type: 'Microgrid' },
    { id: 'ev_station', nameCN: '光储充一体化', nameEN: 'PV + Charging Station', type: 'EV' },
    { id: 'mobile_ess', nameCN: '移动储能/应急保电', nameEN: 'Mobile ESS / Emergency', type: 'Mobile' }
];

export const commonFields = [
    {
        id: 'project_info',
        textCN: '项目基础信息',
        textEN: 'Project Basics',
        fields: [
            { id: 'project_phase', labelCN: '项目阶段', labelEN: 'Project Phase', type: 'select', options: ['Feasibility (可研)', 'Concept Design (方案设计)', 'Bidding (招投标)', 'Construction (施工图)', 'Expansion (扩建)'] },
            { id: 'construction_type', labelCN: '建设类型', labelEN: 'Construction Type', type: 'select', options: ['Concrete Roof (混凝土屋顶)', 'Steel Roof (彩钢瓦)', 'Ground/Land (地面)', 'Island (海岛)', 'Remote Area (偏远地区)', 'Data Center (数据中心)', 'Mining Site (矿区)'] }
        ]
    },
    {
        id: 'elec_info',
        textCN: '电气接入信息',
        textEN: 'Electrical Info',
        fields: [
            { id: 'grid_voltage', labelCN: '并网电压等级', labelEN: 'Grid Voltage', type: 'select', options: ['380V/400V (Lv)', '10kV (Hv)', '33kV (Hv)', '35kV (Hv)'] },
            { id: 'transformer_cap', labelCN: '变压器容量', labelEN: 'Transformer Cap', type: 'number', unit: 'kVA' }
        ]
    }
];

export const scenarioQuestions = {
    residential: [
        {
            id: 'res_spec',
            textCN: '户用场景参数',
            textEN: 'Residential Specs',
            fields: [
                { id: 'grid_type', labelCN: '此项目是?', labelEN: 'Grid Connection', type: 'select', options: ['Hybrid (并离网/储能)', 'Grid-Tied (纯并网/无储能)', 'Off-Grid (纯离网)'] },
                { id: 'roof_type', labelCN: '屋顶类型', labelEN: 'Roof Type', type: 'select', options: ['Flat (平顶)', 'Pitched (斜顶)'] },
                { id: 'roof_area', labelCN: '可用屋顶面积', labelEN: 'Roof Area', type: 'number', unit: 'm²' },
                { id: 'phase_type', labelCN: '电网相数', labelEN: 'Grid Phase', type: 'select', options: ['Single-Phase (单相)', 'Three-Phase (三相)'] }
            ]
        }
    ],
    commercial_pv: [
        {
            id: 'pv_spec',
            textCN: '光伏消纳参数',
            textEN: 'PV Specs',
            fields: [
                { id: 'roof_area', labelCN: '可用屋顶面积', labelEN: 'Roof Area', type: 'number', unit: 'm²' },
                { id: 'self_use_ratio', labelCN: '预期自用比例', labelEN: 'Self-use Ratio', type: 'number', unit: '%' }
            ]
        }
    ],
    commercial_ess: [
        {
            id: 'ess_arbitrage',
            textCN: '峰谷套利参数 (ROI)',
            textEN: 'Arbitrage Params',
            fields: [
                { id: 'price_peak', labelCN: '峰段电价', labelEN: 'Peak Price', type: 'number', unit: '$/kWh' },
                { id: 'price_valley', labelCN: '谷段电价', labelEN: 'Valley Price', type: 'number', unit: '$/kWh' },
                { id: 'discharge_cycles', labelCN: '每日循环次数', labelEN: 'Daily Cycles', type: 'select', options: ['1 Cycle', '2 Cycles'] }
            ]
        },
        // Reuse Load Profile for proper sizing
        {
            id: 'micro_load',
            textCN: '负荷详情 (Load Profile)',
            textEN: 'Load Details',
            fields: [
                { id: 'monthly_avg_kwh', labelCN: '月均用电量', labelEN: 'Monthly kWh', type: 'number', unit: 'kWh' },
                { id: 'peak_load_kw', labelCN: '峰值功率', labelEN: 'Peak Load', type: 'number', unit: 'kW' },
                { id: 'transformer_cap', labelCN: '变压器容量', labelEN: 'Transformer Cap', type: 'number', unit: 'kVA' }
            ]
        },
        // Optional: Add Roof Info if they want PV
        {
            id: 'pv_spec',
            textCN: '光伏安装条件 (Optional)',
            textEN: 'PV Specs (Optional)',
            fields: [
                { id: 'roof_area', labelCN: '可用屋顶面积', labelEN: 'Roof Area', type: 'number', unit: 'm²' }
            ]
        }
    ],
    microgrid: [
        {
            id: 'micro_grid_status',
            textCN: '微网现状 (Grid Status)',
            textEN: 'Grid Status',
            fields: [
                { id: 'grid_type', labelCN: '并网类型', labelEN: 'Conn. Type', type: 'select', options: ['Off-grid (无电网)', 'Weak-grid (弱电网)', 'Grid-tied (市电接入)'] },
                { id: 'future_grid', labelCN: '后期接入市电?', labelEN: 'Future Grid?', type: 'select', options: ['No', 'Yes'] }
            ]
        },
        {
            id: 'micro_load',
            textCN: '负荷详情 (Load Profile)',
            textEN: 'Load Details',
            fields: [
                { id: 'monthly_avg_kwh', labelCN: '月均用电量', labelEN: 'Monthly kWh', type: 'number', unit: 'kWh' },
                { id: 'peak_load_kw', labelCN: '峰值功率', labelEN: 'Peak Load', type: 'number', unit: 'kW' },
                { id: 'peak_time', labelCN: '峰值时间段', labelEN: 'Peak Time', type: 'text', placeholder: 'e.g. 12:00-14:00' }
            ]
        },
        {
            id: 'micro_genset',
            textCN: '柴发配置 (Genset)',
            textEN: 'Generator Info',
            fields: [
                { id: 'existing_genset_cap', labelCN: '已有柴发容量', labelEN: 'Existing Gen', type: 'number', unit: 'kVA' },
                { id: 'genset_count', labelCN: '柴发台数', labelEN: 'Gen Count', type: 'number', unit: 'units' }
            ]
        }
    ],
    ev_station: [
        {
            id: 'ev_spec',
            textCN: '充电站参数',
            textEN: 'EV Station Specs',
            fields: [
                { id: 'charger_count', labelCN: '充电桩数量', labelEN: 'Charger Count', type: 'number', unit: 'units' },
                { id: 'daily_cars', labelCN: '日均车流量', labelEN: 'Daily Traffic', type: 'number', unit: 'cars' },
                { id: 'avg_charge_duration', labelCN: '平均充电时长', labelEN: 'Avg Duration', type: 'number', unit: 'h' }
            ]
        }
    ],
    mobile_ess: [
        {
            id: 'mobile_spec',
            textCN: '移动储能参数',
            textEN: 'Mobile Specs',
            fields: [
                { id: 'vehicle_type', labelCN: '载具类型', labelEN: 'Vehicle Type', type: 'select', options: ['Integrated Truck (一体车)', 'Trailer (拖车)', 'Skid (撬装)'] },
                { id: 'application', labelCN: '主要用途', labelEN: 'Application', type: 'select', options: ['Emergency (应急)', 'Event (活动)', 'Construction (施工)'] }
            ]
        }
    ]
};
