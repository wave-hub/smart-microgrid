export const proposalData = {
    cn: {
        background: {
            title: "项目背景与建设必要性",
            content: [
                "随着全球能源转型的加速和“双碳”目标的提出，构建清洁低碳、安全高效的能源体系已成为必然趋势。分布式光伏与储能技术作为能源转型的核心驱动力，对于降低企业用能成本、提升供电可靠性以及减少碳排放具有重要意义。",
                "本项目旨在利用项目地丰富的太阳能资源，建设一套“自发自用、余电上网”的智能微电网系统。通过配置高效光伏组件与先进储能系统，不仅能有效降低从电网购电的成本，还能在电网故障或限电期间作为应急电源，保障关键负荷的连续运行。",
                "系统的建设将显著提升园区的绿色形象，响应国家绿色能源号召，并在全生命周期内带来可观的经济效益与环境效益。"
            ]
        },
        standards: {
            title: "设计依据与规范",
            list: [
                "GB/T 50797-2012 光伏发电站设计规范",
                "GB 50054-2011 低压配电设计规范",
                "GB/T 36547-2018 电化学储能系统接入电网技术规定",
                "IEC 60364 建筑物电气装置标准",
                "IEEE 1547 分布式资源与电力系统互连标准",
                "当地电网公司分布式电源接入系统技术规范"
            ]
        },
        functions: {
            title: "系统功能与运行策略",
            items: [
                {
                    head: "削峰填谷 (Peak Shaving)",
                    desc: "利用储能系统在电价低谷时段（或光伏大发时）充电，在电价高峰时段放电，通过峰谷价差套利，显著降低综合电费支出。"
                },
                {
                    head: "光伏消纳 (PV Self-Consumption)",
                    desc: "优先利用光伏发电满足本地负荷需求，多余电量存入电池，夜间释放。最大化提升光伏自发自用比例，减少弃光。"
                },
                {
                    head: "应急备用 (Emergency Backup)",
                    desc: "当探测到大电网故障或电压异常时，系统可毫秒级切换至离网模式（Island Mode），由储能和柴发（如有）构建独立微网，保障重要负荷不掉电。"
                },
                {
                    head: "需量管理 (Demand Management)",
                    desc: "实时监测变压器负荷，当接近容量上限时，储能系统自动放电辅助供电，避免产生最大需量罚款或变压器过载。"
                }
            ]
        },

        wiring: {
            title: "电气接线与施工建议",
            items: [
                { component: "直流侧 (DC Side)", cable: "PV1-F 4mm² (红色/黑色)", note: "专用光伏线缆，额定电压 DC1500V，具备抗紫外线、耐老化特性。" },
                { component: "交流侧 (AC Side)", cable: "YJV 五芯电缆 (3P+N+PE)", note: "根据逆变器输出电流选型，确保压降小于 3%。" },
                { component: "通讯 (Comms)", cable: "RS485 双绞屏蔽线", note: "用于逆变器、电表与数据采集器通讯，需手拉手连接。" },
                { component: "接地 (Grounding)", cable: "扁钢 / 黄绿线", note: "组件边框与支架可靠连接，支架需通过扁钢接入地网，接地电阻 < 4Ω。" }
            ]
        },
        om: {
            title: "运维与质保方案",
            content: "为确保系统长期稳定运行，我们提供全生命周期的运维支持服务：",
            schedule: [
                "日常巡检：通过EMS远程监控系统运行状态，实时告警响应。",
                "季度维护：电气连接紧固检查、灰尘清理、热成像扫描。",
                "年度保养：电池一致性校准、逆变器功能测试、系统效率评估。"
            ],
            warranty: "主要设备质保承诺：光伏组件 25年功率质保；逆变器 5年标准质保（可延保）；储能电池 10年或6000次循环质保。"
        }
    },
    en: {
        background: {
            title: "Project Background & Necessity",
            content: [
                "Accelerating global energy transition and carbon neutrality goals drive the need for clean, secure, and efficient energy systems. Distributed PV and ESS technologies are key to reducing energy costs, enhancing reliability, and lowering carbon footprint.",
                "This project aims to build a smart microgrid utilizing local solar resources for 'Self-Generation and Self-Consumption'. High-efficiency PV modules and advanced ESS will reduce grid dependency and serve as emergency power during outages.",
                "Implementation will elevate the facility's green image, align with renewable energy policies, and deliver significant economic and environmental benefits over the system's lifecycle."
            ]
        },
        standards: {
            title: "Design Standards & Codes",
            list: [
                "IEC 60364 Electrical Installations for Buildings",
                "IEC 62619 Safety Requirements for Secondary Lithium Cells",
                "IEEE 1547 Standard for Interconnecting Distributed Resources",
                "UL 9540 Standard for Energy Storage Systems and Equipment",
                "Local Grid Code & Interconnection Requirements",
                "GB/T 50797-2012 Design Code for PV Power Station"
            ]
        },
        functions: {
            title: "System Functions & Strategy",
            items: [
                {
                    head: "Peak Shaving",
                    desc: "Charge ESS during off-peak hours (or excess solar) and discharge during peak hours. Leverages tariff differentials to significantly reduce electricity bills."
                },
                {
                    head: "PV Self-Consumption",
                    desc: "Prioritize solar energy for local loads. Excess energy is stored in batteries for night use, maximizing the self-consumption rate."
                },
                {
                    head: "Emergency Backup (UPS)",
                    desc: "In case of grid failure, the system switches to Island Mode in milliseconds. ESS and Generators (if any) form an independent microgrid to power critical loads."
                },
                {
                    head: "Demand Charge Management",
                    desc: "Monitors transformer load in real-time. ESS discharges automatically when load approaches limits to prevent demand charges or overload."
                }
            ]
        },
        wiring: {
            title: "Wiring & Construction Guide",
            items: [
                { component: "DC Side", cable: "PV1-F 4mm² (Red/Black)", note: "Solar cable, rated DC1500V, UV-resistant." },
                { component: "AC Side", cable: "YJV 5-core cable (3P+N+PE)", note: "Sized for inverter output, ensure voltage drop < 3%." },
                { component: "Comms", cable: "RS485 Shielded Twisted Pair", note: "Daisy-chain connection for Inverters, Meters, and Logger." },
                { component: "Grounding", cable: "Flat Steel / Yellow-Green", note: "Bond frames to racking, connect racking to earth grid, resistance < 4Ω." }
            ]
        },
        om: {
            title: "O&M and Warranty Plan",
            content: "We provide lifecycle O&M support to ensure long-term system stability:",
            schedule: [
                "Daily: Remote monitoring via EMS, real-time alert response.",
                "Quarterly: Electrical connection tightening, cleaning, thermal imaging.",
                "Yearly: Battery formatting, inverter function testing, efficiency audit."
            ],
            warranty: "Warranty Terms: PV Modules - 25 Years Performance; Inverters - 5 Years (Extendable); Batteries - 10 Years or 6000 Cycles."
        }
    }
};
