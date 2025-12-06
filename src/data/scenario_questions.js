export const scenarios = [
    { id: 'residential', nameCN: '户用光储系统', nameEN: 'Residential PV & ESS', detailed: false },
    { id: 'ci_pv', nameCN: '工商业光伏系统', nameEN: 'C&I PV Only', detailed: true },
    { id: 'ci_ess', nameCN: '工商业储能系统', nameEN: 'C&I ESS Only', detailed: true },
    { id: 'ci_hybrid', nameCN: '工商业光储系统', nameEN: 'C&I PV & ESS', detailed: true },
    { id: 'microgrid_on', nameCN: '并网微电网', nameEN: 'On-grid Microgrid', detailed: true },
    { id: 'microgrid_off', nameCN: '离网微电网', nameEN: 'Off-grid Microgrid', detailed: true },
    { id: 'ev_station', nameCN: '充电桩系统', nameEN: 'EV Charging Station', detailed: true },
    { id: 'foldable_pv', nameCN: '折叠光伏集装箱', nameEN: 'Foldable PV Container', detailed: true },
    { id: 'mobile_ess', nameCN: '移动储能车', nameEN: 'Mobile ESS Vehicle', detailed: true },
    { id: 'service_area', nameCN: '高速服务区/加油站', nameEN: 'Service Area / Gas Station', detailed: true }
];

export const scenarioQuestions = {
    residential: [
        {
            id: 'res_basics',
            textCN: '住宅基础信息',
            textEN: 'Residential Basics',
            fields: [
                { id: 'roof_type', labelCN: '屋顶类型', labelEN: 'Roof Type', type: 'select', options: ['Flat (平顶)', 'Pitched (斜顶)'] },
                { id: 'phase_type', labelCN: '电网相数', labelEN: 'Grid Phase', type: 'select', options: ['Single-Phase (单相)', 'Three-Phase (三相)'] }
            ]
        }
    ],
    service_area: [
        {
            id: 'service_demand',
            textCN: '服务区需求',
            textEN: 'Service Area Needs',
            fields: [
                { id: 'daily_traffic', labelCN: '日车流量', labelEN: 'Daily Traffic', type: 'number', unit: 'cars' },
                { id: 'charger_count', labelCN: '充电桩数量', labelEN: 'Charger Count', type: 'number', unit: 'units' },
                { id: 'grid_voltage', labelCN: '并网电压等级', labelEN: 'Grid Voltage', type: 'select', options: ['400V', '10kV', '35kV'] }
            ]
        }
    ],
    foldable_pv: [
        {
            id: 'deployment',
            textCN: '部署环境',
            textEN: 'Deployment Env',
            fields: [
                { id: 'terrain', labelCN: '地面情况', labelEN: 'Terrain', type: 'select', options: ['Concete (硬化)', 'Grass/Dirt (土路)', 'Uneven (崎岖)'] },
                { id: 'deploy_time', labelCN: '部署时间限制', labelEN: 'Max Setup Time', type: 'select', options: ['< 30 mins', '< 2 hours', 'No Limit'] }
            ]
        }
    ],
    mobile_ess: [
        {
            id: 'mobility',
            textCN: '移动需求',
            textEN: 'Mobility Needs',
            fields: [
                { id: 'vehicle_type', labelCN: '载具类型', labelEN: 'Vehicle Type', type: 'select', options: ['Integrated Truck (一体车)', 'Trailer (拖车)', 'Skid (撬装)'] },
                { id: 'event_duration', labelCN: '单次任务时长', labelEN: 'Event Duration', type: 'number', unit: 'hours' }
            ]
        }
    ],
    ci_pv: [
        {
            id: 'grid_conn',
            textCN: '并网信息',
            textEN: 'Grid Connection',
            fields: [
                { id: 'transformer_cap', labelCN: '变压器容量', labelEN: 'Transformer Cap', type: 'number', unit: 'kVA' },
                { id: 'self_use_ratio', labelCN: '自发自用比例', labelEN: 'Self-use Ratio', type: 'number', unit: '%' }
            ]
        }
    ],
    ci_ess: [
        {
            id: 'arbitrage',
            textCN: '峰谷套利分析',
            textEN: 'Arbitrage Analysis',
            fields: [
                { id: 'peak_load_time', labelCN: '峰值负荷时段', labelEN: 'Peak Load Time', type: 'select', options: ['Morning', 'Afternoon', 'Evening'] },
                { id: 'discharge_depth', labelCN: '放电深度 (DOD)', labelEN: 'DOD Target', type: 'number', unit: '%' }
            ]
        }
    ],
    ci_hybrid: [
        {
            id: 'hybrid_req',
            textCN: '光储需求',
            textEN: 'Hybrid Requirements',
            fields: [
                { id: 'backup_load', labelCN: '备用负荷', labelEN: 'Backup Load', type: 'number', unit: 'kW' },
                { id: 'autonomy_hours', labelCN: '备电时长', labelEN: 'Autonomy Hours', type: 'number', unit: 'h' }
            ]
        }
    ],
    microgrid_on: [
        {
            id: 'pcc_limits',
            textCN: 'PCC点限制',
            textEN: 'PCC Constraints',
            fields: [
                { id: 'zero_export', labelCN: '防逆流要求', labelEN: 'Zero Export', type: 'checkbox' },
                { id: 'max_grid_import', labelCN: '最大取电功率', labelEN: 'Max Grid Import', type: 'number', unit: 'kW' }
            ]
        }
    ],
    microgrid_off: [
        {
            id: 'genset',
            textCN: '柴发配置',
            textEN: 'Generator Config',
            fields: [
                { id: 'existing_gen', labelCN: '已有柴发容量', labelEN: 'Existing Gen', type: 'number', unit: 'kW' },
                { id: 'fuel_tank', labelCN: '油箱容量', labelEN: 'Fuel Tank', type: 'number', unit: 'L' }
            ]
        }
    ],
    ev_station: [
        {
            id: 'ev_config',
            textCN: '充电站配置',
            textEN: 'Station Config',
            fields: [
                { id: 'charger_count', labelCN: '充电桩数量', labelEN: 'Charger Count', type: 'number', unit: 'units' },
                { id: 'avg_power', labelCN: '单桩平均功率', labelEN: 'Avg Power/Pile', type: 'number', unit: 'kW' },
                { id: 'simultaneity', labelCN: '同时使用系数', labelEN: 'Simultaneity', type: 'number', unit: '0-1' }
            ]
        }
    ]
};
