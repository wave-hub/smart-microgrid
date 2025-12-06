export const microgridQuestions = [
    {
        id: 'grid_reliability',
        textCN: '电网可靠性',
        textEN: 'Grid Reliability',
        fields: [
            { id: 'outage_freq', labelCN: '年均停电次数', labelEN: 'Outages per Year', type: 'number', unit: 'times' },
            { id: 'outage_duration', labelCN: '平均停电时长', labelEN: 'Avg. Duration', type: 'number', unit: 'hours' },
        ]
    },
    {
        id: 'critical_load',
        textCN: '关键负荷分析',
        textEN: 'Critical Load Analysis',
        fields: [
            { id: 'critical_ratio', labelCN: '关键负荷占比', labelEN: 'Critical Load %', type: 'number', unit: '%', hint: 'Percentage of load that MUST maintain power during outages' },
            { id: 'black_start', labelCN: '是否需要黑启动', labelEN: 'Black Start Needed?', type: 'checkbox' },
        ]
    },
    {
        id: 'existing_assets',
        textCN: '现有自备电源',
        textEN: 'Existing Power Assets',
        fields: [
            { id: 'exist_diesel_kw', labelCN: '现有柴发容量', labelEN: 'Existing Diesel (kW)', type: 'number', unit: 'kW' },
            { id: 'exist_pv_kw', labelCN: '现有光伏容量', labelEN: 'Existing PV (kW)', type: 'number', unit: 'kW' },
        ]
    },
    {
        id: 'connection_point',
        textCN: '并网点 (PCC) 限制',
        textEN: 'PCC Constraints',
        fields: [
            { id: 'transformer_kva', labelCN: '变压器容量', labelEN: 'Transformer Cap', type: 'number', unit: 'kVA' },
            { id: 'export_limit', labelCN: '最大防逆流限值', labelEN: 'Export Limit', type: 'number', unit: 'kW', hint: '0 means Zero Export' },
        ]
    }
];
