import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const translations = {
    cn: {
        title: "智慧微网配置系统",
        subtitle: "全场景智慧能源解决方案",
        startBtn: "开始配置",
        generating: "正在生成方案...",
        generateBtn: "生成方案",
        wizard: {
            step1: "欢迎页",
            step2: "需求调研",
            step3: "系统配置",
            step4: "方案结果"
        },
        form: {
            projectType: "项目类型",
            typeStandard: "标准光伏储能",
            typeMicrogrid: "专业微电网 (离网/并网)",
            dataCollection: "微电网前期收资",
            clientInfo: "客户基础信息",
            powerInfo: "电力接入信息",
            tariffInfo: "分时电价 (元/kWh)",
            sysInfo: "系统构建需求",
            companyType: "企业类型",
            location: "所在地区",
            voltage: "接入电压等级 (kV)",
            transformer: "变压器容量 (kVA)",
            budget: "年度电费预算 (万元)",
            peakPrice: "尖峰电价",
            highPrice: "高峰电价",
            flatPrice: "平段电价",
            valleyPrice: "低谷电价",
            isOffGrid: "是否离网/备电",
            offGrid: "离网模式",
            onGrid: "并网模式",
            roofArea: "可用屋顶面积 (m²)",
            hasEV: "是否有充电桩需求",
            evLoad: "充电桩总功率 (kW)"
        },
        results: {
            header: "您的光伏储能投资方案",
            payback: "预计回本周期",
            roi: "首年投资回报率 (ROI)",
            annualSave: "年均收益",
            cards: {
                pv: "光伏组件 (PV)",
                bess: "电池储能 (BESS)",
                inv: "逆变器",
                diesel: "柴油发电机 (Diesel)",
                ev: "充电桩 (EV Charger)",
                qty: "数量",
                capacity: "总容量",
                model: "推荐型号"
            },
            charts: {
                daily: "24小时 电力供需曲线 (kW)",
                yearly: "5年 投资回报曲线 (Cumulative ¥)",
                load: "用电负荷",
                solar: "光伏发电",
                net: "累计净收益"
            },
            actions: {
                restart: "重新开始",
                print: "保存完整报告 (PDF)"
            },
            visuals: {
                topology: "系统拓扑图",
                render: "建设效果预览"
            }
        }
    },
    en: {
        title: "Smart Microgrid Configurator",
        subtitle: "All-Scenario Smart Energy Solutions",
        startBtn: "Start Configuration",
        generating: "Generating...",
        generateBtn: "Generate Proposal",
        wizard: {
            step1: "Welcome",
            step2: "Requirements",
            step3: "Configuration",
            step4: "Results"
        },
        form: {
            projectType: "Project Type",
            typeStandard: "Standard PV & ESS",
            typeMicrogrid: "Professional Microgrid",
            dataCollection: "Microgrid Data Collection",
            clientInfo: "Client Information",
            powerInfo: "Power Connection",
            tariffInfo: "TOU Tariff (CNY/kWh)",
            sysInfo: "System Requirements",
            companyType: "Company Type",
            location: "Location",
            voltage: "Voltage Level (kV)",
            transformer: "Transformer Capacity (kVA)",
            budget: "Annual Budget (10k CNY)",
            peakPrice: "Sharp Price",
            highPrice: "Peak Price",
            flatPrice: "Flat Price",
            valleyPrice: "Valley Price",
            isOffGrid: "Off-Grid / Backup",
            offGrid: "Off-Grid",
            onGrid: "On-Grid",
            roofArea: "Roof Area (m²)",
            hasEV: "EV Charging Needs",
            evLoad: "Total EV Power (kW)"
        },
        results: {
            header: "Your Investment Proposal",
            payback: "Payback Period",
            roi: "First Year ROI",
            annualSave: "Annual Savings",
            cards: {
                pv: "PV Modules",
                bess: "Battery Storage",
                inv: "Inverter",
                diesel: "Diesel Gen",
                ev: "EV Charger",
                qty: "Qty",
                capacity: "Total Cap",
                model: "Model"
            },
            charts: {
                daily: "24h Power Supply & Demand (kW)",
                yearly: "5-Year ROI Projection (Cumulative ¥)",
                load: "Load",
                solar: "Solar Gen",
                net: "Net Return"
            },
            actions: {
                restart: "Restart",
                print: "Save Report (PDF)"
            },
            visuals: {
                topology: "System Topology",
                render: "Project Preview"
            }
        }
    }
};

export const LanguageProvider = ({ children }) => {
    const [lang, setLang] = useState('cn');

    const t = (path) => {
        const keys = path.split('.');
        let value = translations[lang];
        for (let key of keys) {
            value = value?.[key];
        }
        return value || path;
    };

    return (
        <LanguageContext.Provider value={{ lang, setLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
