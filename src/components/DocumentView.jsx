import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import DynamicTopology from './DynamicTopology';
import PVLayoutVisualizer from './PVLayoutVisualizer';
import { FileText, Printer, CheckCircle, BookOpen, Leaf, TreeDeciduous, Factory, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { proposalData } from '../data/proposalData';
import { exportStandards } from '../data/exportStandards';

const DocumentView = ({ data, onBack }) => {
    const { t, lang } = useLanguage();
    const { financials, systemParams, warnings, scenarioId, location } = data;
    const txt = proposalData[lang] || proposalData['en'];

    // Get standards based on target market
    const targetRegion = systemParams.targetMarket || 'EU';
    const regionStandards = exportStandards[targetRegion];

    // A4 Paper Styles
    const a4Style = {
        width: '210mm',
        minHeight: '297mm',
        padding: '20mm',
        margin: '0 auto',
        background: 'white',
        boxShadow: '0 0 15px rgba(0,0,0,0.1)',
        color: '#333',
        fontFamily: 'SimSun, serif', // Songti for formal Chinese docs
        position: 'relative',
        marginBottom: '2rem'
    };

    const sectionTitleStyle = {
        borderBottom: '2px solid #000',
        paddingBottom: '0.5rem',
        marginBottom: '1rem',
        fontSize: '1.25rem',
        fontWeight: 'bold',
        marginTop: '2rem'
    };

    const headerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #eee',
        paddingBottom: '1rem',
        marginBottom: '2rem'
    };

    const logoStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        color: '#0052cc'
    };

    // Helper to format currency
    const fmtMoney = (val) => parseFloat(val).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });

    return (
        <div style={{ background: '#525659', padding: '2rem 0', minHeight: '100vh' }}>
            {/* Toolbar */}
            <div style={{
                width: '210mm', margin: '0 auto 1rem', display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', color: 'white'
            }}>
                <button onClick={onBack} className="flex items-center gap-2 hover:text-gray-300">
                    &larr; {lang === 'cn' ? '返回仪表盘' : 'Back to Dashboard'}
                </button>
                <button
                    onClick={() => window.print()}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white font-bold"
                >
                    <Printer size={18} />
                    {lang === 'cn' ? '打印 / 另存为 PDF' : 'Print / Save as PDF'}
                </button>
            </div>

            {/* PAGE 1: Cover & Executive Summary */}
            <div className="print-page" style={a4Style}>
                {/* Cover Header */}
                <div style={{ textAlign: 'center', marginTop: '40mm', marginBottom: '40mm' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                        {lang === 'cn' ? '微电网系统建设方案' : 'Microgrid Construction Scheme'}
                    </h1>
                    <h2 style={{ fontSize: '1.5rem', color: '#666', fontWeight: 'normal' }}>
                        {lang === 'cn' ? '项目建议书' : 'Project Proposal'}
                    </h2>
                    <div style={{ width: '100px', height: '4px', background: '#e11d48', margin: '2rem auto' }}></div>
                </div>

                {/* Project Info Table */}
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '2rem', fontSize: '1.1rem' }}>
                    <tbody>
                        <tr>
                            <td style={{ padding: '10px', borderBottom: '1px solid #eee', width: '40%', fontWeight: 'bold' }}>
                                {lang === 'cn' ? '项目名称:' : 'Project Name:'}
                            </td>
                            <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
                                Smart Microgrid - {location.id.toUpperCase()}
                            </td>
                        </tr>
                        <tr>
                            <td style={{ padding: '10px', borderBottom: '1px solid #eee', fontWeight: 'bold' }}>
                                {lang === 'cn' ? '项目地址:' : 'Location:'}
                            </td>
                            <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
                                {lang === 'cn' ? location.nameCN : location.nameEN}
                            </td>
                        </tr>
                        <tr>
                            <td style={{ padding: '10px', borderBottom: '1px solid #eee', fontWeight: 'bold' }}>
                                {lang === 'cn' ? '系统容量:' : 'System Capacity:'}
                            </td>
                            <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
                                {systemParams.pvKw}kWp PV / {systemParams.batteryKwh}kWh ESS
                            </td>
                        </tr>
                        <tr>
                            <td style={{ padding: '10px', borderBottom: '1px solid #eee', fontWeight: 'bold' }}>
                                {lang === 'cn' ? '日期:' : 'Date:'}
                            </td>
                            <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
                                {new Date().toLocaleDateString()}
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* Logistics Info */}
                <div style={{ marginTop: '2rem', padding: '1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <h4 style={{ margin: '0 0 1rem 0', color: '#475569' }}>📦 Logistics Estimate (预估由于 {systemParams.logistics?.departurePort} 发运)</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '1rem', fontSize: '0.9rem' }}>
                        <div>
                            <span style={{ color: '#64748b' }}>Total Volume:</span>
                            <div style={{ fontWeight: 'bold' }}>{systemParams.logistics?.totalVolume} m³</div>
                        </div>
                        <div>
                            <span style={{ color: '#64748b' }}>Total Weight:</span>
                            <div style={{ fontWeight: 'bold' }}>{systemParams.logistics?.totalWeight} kg</div>
                        </div>
                        <div>
                            <span style={{ color: '#64748b' }}>Container:</span>
                            <div style={{ fontWeight: 'bold', color: '#0ea5e9' }}>{systemParams.logistics?.containerType}</div>
                        </div>
                        <div>
                            <span style={{ color: '#64748b' }}>Est. Shipping:</span>
                            <div style={{ fontWeight: 'bold', color: '#16a34a' }}>${systemParams.logistics?.estCost}</div>
                        </div>
                    </div>
                    <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#94a3b8' }}>
                        * Shipping cost is estimated based on current rates to {location.nameEN || 'target region'}. Actual freight may vary.
                    </div>
                </div>

                {/* Footer */}
                <div style={{ position: 'absolute', bottom: '20mm', left: '0', width: '100%', textAlign: 'center', color: '#999', fontSize: '0.9rem' }}>
                    Generated by Smart Microgrid Configurator
                </div>
            </div>

            {/* PAGE 2: Project Background & Constraints */}
            <div className="print-page" style={a4Style}>
                <h3 style={sectionTitleStyle}>1. {txt.background.title}</h3>
                {txt.background.content.map((para, i) => (
                    <p key={i} style={{ lineHeight: '1.8', marginBottom: '1rem', textIndent: '2em', textAlign: 'justify' }}>{para}</p>
                ))}

                {/* New Project Constraint Table */}
                <div style={{ margin: '2rem 0', background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <h4 style={{ marginBottom: '1rem', color: '#334155', borderBottom: '1px solid #cbd5e1', paddingBottom: '0.5rem' }}>
                        {lang === 'cn' ? '项目基础条件 & 约束' : 'Project Baseline & Constraints'}
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.9rem' }}>
                        <div><strong>{lang === 'cn' ? '项目阶段' : 'Phase'}:</strong> {systemParams.scenarioData?.project_phase || 'Feasibility'}</div>
                        <div><strong>{lang === 'cn' ? '建设类型' : 'Site Type'}:</strong> {systemParams.scenarioData?.construction_type || 'Standard'}</div>
                        <div><strong>{lang === 'cn' ? '并网电压' : 'Grid Voltage'}:</strong> {systemParams.scenarioData?.grid_voltage || '380V'}</div>
                        <div><strong>{lang === 'cn' ? '变压器容量' : 'Transformer'}:</strong> {systemParams.scenarioData?.transformer_cap ? `${systemParams.scenarioData.transformer_cap} kVA` : 'N/A'}</div>

                        {/* Scenario Specifics Display */}
                        {scenarioId === 'microgrid' && (
                            <>
                                <div><strong>{lang === 'cn' ? '并网类型' : 'Conn Type'}:</strong> {systemParams.scenarioData?.grid_type}</div>
                                <div><strong>{lang === 'cn' ? '月均用电' : 'Monthly kWh'}:</strong> {systemParams.scenarioData?.monthly_avg_kwh} kWh</div>
                                <div><strong>{lang === 'cn' ? '峰值功率' : 'Peak Load'}:</strong> {systemParams.scenarioData?.peak_load_kw} kW</div>
                                <div><strong>{lang === 'cn' ? '峰值时段' : 'Peak Time'}:</strong> {systemParams.scenarioData?.peak_time || 'N/A'}</div>
                                <div style={{ borderTop: '1px dashed #cbd5e1', paddingTop: '0.5rem', marginTop: '0.5rem', gridColumn: 'span 2' }}>
                                    <strong>{lang === 'cn' ? '柴发配置' : 'Genset Info'}:</strong> {systemParams.scenarioData?.existing_genset_cap || 0} kVA x {systemParams.scenarioData?.genset_count || 0}
                                </div>
                            </>
                        )}
                        {scenarioId === 'commercial_ess' && (
                            <>
                                <div><strong>{lang === 'cn' ? '峰谷价差' : 'Price Diff'}:</strong> {systemParams.scenarioData?.price_peak} / {systemParams.scenarioData?.price_valley}</div>
                                <div><strong>{lang === 'cn' ? '循环次数' : 'Cycles'}:</strong> {systemParams.scenarioData?.discharge_cycles}</div>
                            </>
                        )}
                    </div>
                </div>

                <h3 style={sectionTitleStyle}>2. {txt.standards.title}
                    <span style={{ fontSize: '0.9rem', color: '#10b981', marginLeft: '10px' }}>
                        [{regionStandards.name}]
                    </span>
                </h3>
                <ul style={{ listStyle: 'none', paddingLeft: '1rem' }}>
                    {regionStandards.standards.map((std, i) => (
                        <li key={i} style={{ marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <BookOpen size={16} color="#666" />
                            {std}
                        </li>
                    ))}
                </ul>
            </div>

            {/* PAGE 3: System Design & Topology */}
            <div className="print-page" style={a4Style}>
                <h3 style={sectionTitleStyle}>3. {lang === 'cn' ? '系统概述 & 架构' : 'System Overview & Architecture'}</h3>
                <p style={{ lineHeight: '1.6', marginBottom: '2rem', textIndent: '2em' }}>
                    {lang === 'cn'
                        ? `本项目系统总装机容量为 ${systemParams.pvKw}kWp 光伏组件，配备 ${systemParams.batteryKwh}kWh 储能系统。系统设计寿命25年。`
                        : `Total installed capacity is ${systemParams.pvKw}kWp PV with ${systemParams.batteryKwh}kWh ESS. Design life is 25 years.`
                    }
                </p>
                <div style={{ height: '350px', border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden', marginBottom: '2rem', background: '#0f172a' }}>
                    <DynamicTopology data={systemParams} />
                </div>

                <h3 style={{ ...sectionTitleStyle, marginTop: '1rem' }}>{txt.functions.title}</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    {txt.functions.items.map((item, i) => (
                        <div key={i} style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                            <h4 style={{ fontWeight: 'bold', color: '#0f172a', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <CheckCircle size={16} color="#10b981" />
                                {item.head}
                            </h4>
                            <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: '1.5' }}>{item.desc}</p>
                        </div>
                    ))}
                </div>

                {/* 3.3 PV Layout Visuals (Existing) */}
                <PVLayoutVisualizer data={data} />

                {/* 3.4 BESS Installation Visuals (NEW) */}
                {systemParams.batteryKwh > 0 && (
                    <div style={{ marginTop: '2rem', pageBreakInside: 'avoid' }}>
                        <h3 style={sectionTitleStyle}>3.4 {lang === 'cn' ? '储能安装示意图' : 'BESS Installation Concept'}</h3>
                        <div style={{ position: 'relative', width: '100%', borderRadius: '8px', overflow: 'hidden', border: '1px solid #cbd5e1' }}>
                            <img
                                src={
                                    systemParams.scenarioId === 'residential' ? '/bess_residential.png' :
                                        systemParams.scenarioId.includes('commercial') && systemParams.batteryKwh < 500 ? '/bess_cabinet.png' :
                                            '/bess_container.png'
                                }
                                alt="BESS Installation"
                                style={{ width: '100%', display: 'block' }}
                            />
                            <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', padding: '1rem', background: 'linear-gradient(transparent, rgba(0,0,0,0.8))', color: 'white' }}>
                                <div style={{ fontWeight: 'bold' }}>
                                    {systemParams.scenarioId === 'residential' ? (lang === 'cn' ? '户用堆叠式安装' : 'Residential Stack Mounting') :
                                        systemParams.scenarioId.includes('commercial') && systemParams.batteryKwh < 500 ? (lang === 'cn' ? '工商业户外柜部署' : 'C&I Outdoor Cabinet Deployment') :
                                            (lang === 'cn' ? '集装箱式储能站' : 'Utility Scale Containerized ESS')}
                                </div>
                                <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>
                                    {lang === 'cn' ? '推荐安装方式：混凝土地基平整，预留散热通道，配置消防设施。' : 'Recommendation: Concrete pad foundation, proper ventilation clearance, fire suppression integration.'}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <h3 style={{ ...sectionTitleStyle, marginTop: '2rem' }}>3.2 {lang === 'cn' ? '光伏组串与接线设计' : 'PV String Design & Wiring'}</h3>

                {systemParams.stringDesign && (
                    <div style={{ padding: '1.5rem', border: '1px solid #94a3b8', borderRadius: '8px', background: '#fff', marginBottom: '2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', marginBottom: '1.5rem' }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#ea580c' }}>{systemParams.stringDesign.panelsPerString}</div>
                                <div style={{ fontSize: '0.9rem', color: '#64748b' }}>{lang === 'cn' ? '每串组件数' : 'Panels / String'}</div>
                            </div>
                            <div style={{ fontSize: '2rem', color: '#cbd5e1' }}>×</div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#0ea5e9' }}>{systemParams.stringDesign.totalStrings}</div>
                                <div style={{ fontSize: '0.9rem', color: '#64748b' }}>{lang === 'cn' ? '组串总数' : 'Total Strings'}</div>
                            </div>
                        </div>

                        {/* Visual Schematic */}
                        <div style={{ background: '#f1f5f9', padding: '1rem', borderRadius: '6px', fontSize: '0.85rem', color: '#334155' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
                                <div style={{ width: '12px', height: '12px', background: '#facc15', borderRadius: '50%' }}></div>
                                <strong>Topology:</strong> {systemParams.stringDesign.totalPanels} Panels → {systemParams.stringDesign.totalStrings} Strings → {systemParams.stringDesign.mpptCount} MPPTs ({systemParams.stringDesign.stringsPerMppt} strings/MPPT)
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{ width: '12px', height: '12px', background: '#22c55e', borderRadius: '50%' }}></div>
                                <strong>Voltage Check:</strong> {systemParams.stringDesign.panelsPerString} x 49.5V ≈ {(systemParams.stringDesign.panelsPerString * 49.5).toFixed(0)}V ( &lt; 1100V Safe )
                            </div>
                        </div>
                    </div>
                )}

                {/* Wiring Recommendation Table */}
                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <h4 style={{ margin: '0 0 1rem 0', color: '#334155', fontSize: '1rem' }}>{txt.wiring.title}</h4>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                        <tbody>
                            {txt.wiring.items.map((item, i) => (
                                <tr key={i} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                    <td style={{ padding: '8px', color: '#64748b' }}>{item.component}</td>
                                    <td style={{ padding: '8px', color: '#334155', fontWeight: '500' }}>{item.cable}</td>
                                    <td style={{ padding: '8px', color: '#64748b', fontStyle: 'italic' }}>{item.note}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <h3 style={{ ...sectionTitleStyle, marginTop: '2rem' }}>3.3 {lang === 'cn' ? '组件排布模拟' : 'PV Array Layout Simulation'}</h3>
                <PVLayoutVisualizer data={data} />

            </div>

            {/* PAGE 4: Key Equipment Details (NEW) */}
            <div className="doc-page" style={a4Style}>
                <div style={headerStyle}>
                    <div style={logoStyle}>
                        <div style={{ width: '24px', height: '24px', background: 'white', borderRadius: '4px' }}></div>
                        <span>Smart Microgrid Pro</span>
                    </div>
                    <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Equipment Datasheets</div>
                </div>

                <h3 style={sectionTitleStyle}>4. {lang === 'cn' ? '核心设备详解' : 'Key Equipment Details'}</h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {/* PV Module Card */}
                    {systemParams.recProducts.pv && (
                        <div style={{ display: 'flex', gap: '20px', padding: '20px', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#f8fafc' }}>
                            <div style={{ width: '150px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'white', borderRadius: '4px', border: '1px solid #eee' }}>
                                <img src={systemParams.recProducts.pv.image || '/panel_600w.png'} alt="PV" style={{ maxWidth: '100%', maxHeight: '150px' }} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <h4 style={{ margin: '0 0 0.5rem 0', color: '#0f172a', fontWeight: 'bold' }}>{systemParams.recProducts.pv.name}</h4>
                                <p style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '1rem', lineHeight: '1.4' }}>
                                    {systemParams.recProducts.pv.description || 'High-efficiency solar module.'}
                                </p>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', fontSize: '0.8rem', background: '#fff', padding: '10px', borderRadius: '4px', border: '1px solid #e2e8f0' }}>
                                    {systemParams.recProducts.pv.detailedSpecs ?
                                        Object.entries(systemParams.recProducts.pv.detailedSpecs).map(([k, v], i) => (
                                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #eee', paddingBottom: '2px' }}>
                                                <span style={{ color: '#64748b' }}>{k}</span>
                                                <span style={{ fontWeight: '600', color: '#334155' }}>{v}</span>
                                            </div>
                                        )) :
                                        systemParams.recProducts.pv.specs && Object.entries(systemParams.recProducts.pv.specs).map(([k, v], i) => (
                                            <div key={i}><strong style={{ textTransform: 'capitalize' }}>{k}:</strong> {v}</div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Inverter Card */}
                    {systemParams.recProducts.inverter && (
                        <div style={{ display: 'flex', gap: '20px', padding: '20px', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#f8fafc' }}>
                            <div style={{ width: '150px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'white', borderRadius: '4px', border: '1px solid #eee' }}>
                                <img src={systemParams.recProducts.inverter.image || '/inverter_string.png'} alt="Inverter" style={{ maxWidth: '100%', maxHeight: '150px' }} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <h4 style={{ margin: '0 0 0.5rem 0', color: '#0f172a', fontWeight: 'bold' }}>{systemParams.recProducts.inverter.name}</h4>
                                <p style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '1rem', lineHeight: '1.4' }}>
                                    {systemParams.recProducts.inverter.description || 'Smart inverter system.'}
                                </p>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', fontSize: '0.8rem', background: '#fff', padding: '10px', borderRadius: '4px', border: '1px solid #e2e8f0' }}>
                                    {systemParams.recProducts.inverter.detailedSpecs ?
                                        Object.entries(systemParams.recProducts.inverter.detailedSpecs).map(([k, v], i) => (
                                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #eee', paddingBottom: '2px' }}>
                                                <span style={{ color: '#64748b' }}>{k}</span>
                                                <span style={{ fontWeight: '600', color: '#334155' }}>{v}</span>
                                            </div>
                                        )) :
                                        systemParams.recProducts.inverter.specs && Object.entries(systemParams.recProducts.inverter.specs).map(([k, v], i) => (
                                            <div key={i}><strong style={{ textTransform: 'capitalize' }}>{k}:</strong> {v}</div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Battery Card */}
                    {systemParams.recProducts.battery && (
                        <div style={{ display: 'flex', gap: '20px', padding: '20px', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#f8fafc' }}>
                            <div style={{ width: '150px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'white', borderRadius: '4px', border: '1px solid #eee' }}>
                                <img src={systemParams.recProducts.battery.image || '/battery_commercial.png'} alt="Battery" style={{ maxWidth: '100%', maxHeight: '150px' }} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <h4 style={{ margin: '0 0 0.5rem 0', color: '#0f172a', fontWeight: 'bold' }}>{systemParams.recProducts.battery.name}</h4>
                                <p style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '1rem', lineHeight: '1.4' }}>
                                    {systemParams.recProducts.battery.description || 'Advanced energy storage system.'}
                                </p>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', fontSize: '0.8rem', background: '#fff', padding: '10px', borderRadius: '4px', border: '1px solid #e2e8f0' }}>
                                    {systemParams.recProducts.battery.detailedSpecs ?
                                        Object.entries(systemParams.recProducts.battery.detailedSpecs).map(([k, v], i) => (
                                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #eee', paddingBottom: '2px' }}>
                                                <span style={{ color: '#64748b' }}>{k}</span>
                                                <span style={{ fontWeight: '600', color: '#334155' }}>{v}</span>
                                            </div>
                                        )) :
                                        systemParams.recProducts.battery.specs && Object.entries(systemParams.recProducts.battery.specs).map(([k, v], i) => (
                                            <div key={i}><strong style={{ textTransform: 'capitalize' }}>{k}:</strong> {v}</div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* PAGE 5: SIMULATION RESULTS (HOMER Style) & Financials */}
            <div className="doc-page" style={a4Style}>
                <div style={headerStyle}>
                    <div style={logoStyle}>
                        <div style={{ width: '24px', height: '24px', background: 'white', borderRadius: '4px' }}></div>
                        <span>Smart Microgrid Pro</span>
                    </div>
                    <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Simulation & Economics</div>
                </div>

                <h2 style={sectionTitleStyle}>5. {lang === 'cn' ? '仿真运行与经济性分析' : 'Simulation Results & Economics'}</h2>

                {/* 5.1 Key Simulation Indicators */}
                <h3 style={{ ...sectionTitleStyle, fontSize: '1.1rem', marginTop: '1rem', borderBottom: '1px dashed #ccc' }}>
                    5.1 {lang === 'cn' ? '关键仿真指标' : 'Key Simulation Indicators'}
                </h3>

                {systemParams.simulation && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
                        <div style={{ background: '#f0f9ff', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
                            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Renewable Fraction</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0284c7' }}>{systemParams.simulation.rf}%</div>
                        </div>
                        <div style={{ background: '#f0fdf4', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
                            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>LCOE ($/kWh)</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#16a34a' }}>{systemParams.simulation.lcoe}</div>
                        </div>
                        <div style={{ background: '#fffbeb', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
                            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>NPC (Net Present Cost)</div>
                            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#d97706' }}>¥{(systemParams.simulation.npc / 1000).toFixed(0)}k</div>
                        </div>
                        <div style={{ background: '#fdf2f8', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
                            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>ROI</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#db2777' }}>{financials.roi}%</div>
                        </div>
                    </div>
                )}

                {/* --- MOUNTING STRUCTURE DESIGN --- */}
                {systemParams.recProducts.mount && (
                    <div style={{ marginTop: '30px', pageBreakInside: 'avoid' }}>
                        <h4 style={{
                            borderLeft: '4px solid #3b82f6',
                            paddingLeft: '10px',
                            color: '#1e3a8a',
                            marginBottom: '15px',
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            {lang === 'cn' ? '支架系统方案' : 'Mounting Structure Design'}
                        </h4>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '20px',
                            background: '#f8fafc',
                            padding: '20px',
                            borderRadius: '8px',
                            border: '1px solid #e2e8f0'
                        }}>
                            {/* Graphic / Drawing */}
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <div style={{
                                    width: '100%',
                                    height: '200px',
                                    background: '#fff',
                                    border: '1px dashed #cbd5e1',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    overflow: 'hidden'
                                }}>
                                    <img
                                        src={systemParams.recProducts.mount.image}
                                        alt="Mounting Structure"
                                        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://placehold.co/400x300?text=Structure+Diagram';
                                        }}
                                    />
                                </div>
                                <div style={{ marginTop: '10px', fontSize: '0.8rem', color: '#64748b', fontStyle: 'italic' }}>
                                    {lang === 'cn' ? '* 示意图：具体结构以施工图纸为准' : '* Diagram: Subject to final mechanical drawings'}
                                </div>
                            </div>

                            {/* Specs */}
                            <div>
                                <h5 style={{ marginTop: 0, color: '#0f172a' }}>{systemParams.recProducts.mount.name}</h5>
                                <p style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '15px' }}>
                                    {systemParams.recProducts.mount.description}
                                </p>
                                <table style={{ width: '100%', fontSize: '0.85rem', borderCollapse: 'collapse' }}>
                                    <tbody>
                                        {systemParams.recProducts.mount.detailedSpecs && Object.entries(systemParams.recProducts.mount.detailedSpecs).map(([key, val]) => (
                                            <tr key={key} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                                <td style={{ padding: '6px 0', color: '#64748b' }}>{key}</td>
                                                <td style={{ padding: '6px 0', color: '#0f172a', fontWeight: '500', textAlign: 'right' }}>{val}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- 4. BOQ --- */}
                {/* 5.2 Energy Balance Table */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                    <div>
                        <h4 style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#334155' }}>
                            {lang === 'cn' ? '年发电量 (Production)' : 'Annual Production'}
                        </h4>
                        <table style={{ width: '100%', fontSize: '0.85rem', borderCollapse: 'collapse' }}>
                            <tbody>
                                <tr style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '8px' }}>PV Production</td>
                                    <td style={{ padding: '8px', textAlign: 'right', fontWeight: 'bold' }}>{parseInt(systemParams.simulation?.production.pv).toLocaleString()} kWh</td>
                                    <td style={{ padding: '8px', textAlign: 'right', color: '#16a34a' }}>{((parseInt(systemParams.simulation?.production.pv) / (parseInt(systemParams.simulation?.production.pv) + parseInt(systemParams.simulation?.production.grid) + parseInt(systemParams.simulation?.production.diesel))) * 100).toFixed(1)}%</td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '8px' }}>Grid Purchases</td>
                                    <td style={{ padding: '8px', textAlign: 'right', fontWeight: 'bold' }}>{parseInt(systemParams.simulation?.production.grid).toLocaleString()} kWh</td>
                                    <td style={{ padding: '8px', textAlign: 'right', color: '#ea580c' }}>{((parseInt(systemParams.simulation?.production.grid) / (parseInt(systemParams.simulation?.production.pv) + parseInt(systemParams.simulation?.production.grid) + parseInt(systemParams.simulation?.production.diesel))) * 100).toFixed(1)}%</td>
                                </tr>
                                {parseInt(systemParams.simulation?.production.diesel) > 0 && (
                                    <tr style={{ borderBottom: '1px solid #eee' }}>
                                        <td style={{ padding: '8px' }}>Diesel Gen</td>
                                        <td style={{ padding: '8px', textAlign: 'right', fontWeight: 'bold' }}>{parseInt(systemParams.simulation?.production.diesel).toLocaleString()} kWh</td>
                                        <td style={{ padding: '8px', textAlign: 'right', color: '#64748b' }}>-</td>
                                    </tr>
                                )}
                                <tr style={{ background: '#f8fafc', fontWeight: 'bold' }}>
                                    <td style={{ padding: '8px' }}>Total</td>
                                    <td style={{ padding: '8px', textAlign: 'right' }}>{(parseInt(systemParams.simulation?.production.pv) + parseInt(systemParams.simulation?.production.grid) + parseInt(systemParams.simulation?.production.diesel)).toLocaleString()} kWh</td>
                                    <td style={{ padding: '8px', textAlign: 'right' }}>100%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <h4 style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#334155' }}>
                            {lang === 'cn' ? '年消耗量 (Consumption)' : 'Annual Consumption'}
                        </h4>
                        <table style={{ width: '100%', fontSize: '0.85rem', borderCollapse: 'collapse' }}>
                            <tbody>
                                <tr style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '8px' }}>AC Primary Load</td>
                                    <td style={{ padding: '8px', textAlign: 'right', fontWeight: 'bold' }}>{parseInt(systemParams.simulation?.consumption.load).toLocaleString()} kWh</td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '8px' }}>Grid Export</td>
                                    <td style={{ padding: '8px', textAlign: 'right', fontWeight: 'bold' }}>{parseInt(systemParams.simulation?.consumption.export).toLocaleString()} kWh</td>
                                </tr>
                                <tr style={{ background: '#f8fafc', fontWeight: 'bold' }}>
                                    <td style={{ padding: '8px' }}>Total</td>
                                    <td style={{ padding: '8px', textAlign: 'right' }}>{(parseInt(systemParams.simulation?.consumption.load) + parseInt(systemParams.simulation?.consumption.export)).toLocaleString()} kWh</td>
                                </tr>
                            </tbody>
                        </table>
                        <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#64748b', background: '#f1f5f9', padding: '0.5rem', borderRadius: '4px' }}>
                            <strong>Dispatch Strategy:</strong> {systemParams.simulation?.dispatch}
                        </div>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                    {/* CO2 Card */}
                    <div style={{ padding: '1.5rem', background: '#ecfdf5', borderRadius: '12px', border: '1px solid #a7f3d0', textAlign: 'center' }}>
                        <div style={{ margin: '0 auto 1rem', width: '48px', height: '48px', background: '#10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                            <Leaf size={24} />
                        </div>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#065f46' }}>{systemParams.esg?.co2Tons || '-'}</div>
                        <div style={{ fontSize: '0.9rem', color: '#047857' }}>{lang === 'cn' ? '年减排 CO₂ (吨)' : 'Tons CO₂ / Year'}</div>
                    </div>

                    {/* Trees Card */}
                    <div style={{ padding: '1.5rem', background: '#f0fdf4', borderRadius: '12px', border: '1px solid #86efac', textAlign: 'center' }}>
                        <div style={{ margin: '0 auto 1rem', width: '48px', height: '48px', background: '#22c55e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                            <TreeDeciduous size={24} />
                        </div>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#15803d' }}>{systemParams.esg?.trees || '-'}</div>
                        <div style={{ fontSize: '0.9rem', color: '#166534' }}>{lang === 'cn' ? '等效植树 (棵)' : 'Trees Planted'}</div>
                    </div>

                    {/* Coal Card */}
                    <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #cbd5e1', textAlign: 'center' }}>
                        <div style={{ margin: '0 auto 1rem', width: '48px', height: '48px', background: '#64748b', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                            <Factory size={24} />
                        </div>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#334155' }}>{systemParams.esg?.coalTons || '-'}</div>
                        <div style={{ fontSize: '0.9rem', color: '#475569' }}>{lang === 'cn' ? '节约标煤 (吨)' : 'Coal Saved (Tons)'}</div>
                    </div>
                </div>

                {/* 5.3 Financial Cash Flow */}
                <h3 style={{ ...sectionTitleStyle, fontSize: '1.1rem', color: '#3b82f6', borderBottomColor: '#3b82f6' }}>
                    5.3 {lang === 'cn' ? '全生命周期现金流' : 'Cash Flow Analysis'}
                </h3>

                <p style={{ fontSize: '0.9rem', marginBottom: '1rem', color: '#475569' }}>
                    {lang === 'cn' ? '基于25年项目周期，综合考虑通胀率(3%)与电池衰减(0.5%/年)的现金流预测。' : '25-year projection accounting for 3% inflation/degradation.'}
                </p>

                {systemParams.cashFlow && (
                    <div style={{ padding: '1.5rem', background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                        <div style={{ display: 'flex', gap: '2rem', marginBottom: '1.5rem' }}>
                            <div>
                                <div style={{ fontSize: '0.85rem', color: '#64748b' }}>25-Year NPV</div>
                                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0ea5e9' }}>¥ {parseFloat(systemParams.cashFlow.npv).toLocaleString()}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.85rem', color: '#64748b' }}>IRR (Internal Rate of Return)</div>
                                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981' }}>{systemParams.cashFlow.irr}%</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Payback Period</div>
                                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f59e0b' }}>{financials.paybackYears} Years</div>
                            </div>
                        </div>

                        <div style={{ height: '300px', width: '100%' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={systemParams.cashFlow.chartData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="year" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis fontSize={12} tickFormatter={(val) => `¥${val / 1000}k`} tickLine={false} axisLine={false} />
                                    <Tooltip formatter={(val) => `¥${parseInt(val).toLocaleString()}`} />
                                    <Legend />
                                    <Line type="monotone" dataKey="cumulative" name={lang === 'cn' ? '累计收益 (Cumulative)' : 'Cumulative Cash Flow'} stroke="#2563eb" strokeWidth={3} dot={false} />
                                    <Line type="monotone" dataKey="net" name={lang === 'cn' ? '年度净利 (Net)' : 'Annual Net Savings'} stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}
            </div>

            {/* PAGE 5: ESG & FINANCIALS (Renumbered from 4) */}
            <div className="doc-page" style={a4Style}>
                <div style={headerStyle}>
                    <div style={logoStyle}>
                        <div style={{ width: '24px', height: '24px', background: 'white', borderRadius: '4px' }}></div>
                        <span>Smart Microgrid Pro</span>
                    </div>
                    <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>{lang === 'cn' ? '财务与环境分析' : 'Financial & ESG Analysis'}</div>
                </div>

                <h2 style={sectionTitleStyle}>5. {lang === 'cn' ? '投资回报与环境效益' : 'Economic & Environmental Analysis'}</h2>

                {/* 5.1 ESG Impact */}
                <h3 style={{ ...sectionTitleStyle, fontSize: '1.1rem', color: '#10b981', borderBottomColor: '#10b981' }}>
                    5.1 {lang === 'cn' ? '环境效益 (ESG Impact)' : 'Environmental Impact (ESG)'}
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                    {/* CO2 Card */}
                    <div style={{ padding: '1.5rem', background: '#ecfdf5', borderRadius: '12px', border: '1px solid #a7f3d0', textAlign: 'center' }}>
                        <div style={{ margin: '0 auto 1rem', width: '48px', height: '48px', background: '#10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                            <Leaf size={24} />
                        </div>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#065f46' }}>{systemParams.esg?.co2Tons || '-'}</div>
                        <div style={{ fontSize: '0.9rem', color: '#047857' }}>{lang === 'cn' ? '年减排 CO₂ (吨)' : 'Tons CO₂ / Year'}</div>
                    </div>

                    {/* Trees Card */}
                    <div style={{ padding: '1.5rem', background: '#f0fdf4', borderRadius: '12px', border: '1px solid #86efac', textAlign: 'center' }}>
                        <div style={{ margin: '0 auto 1rem', width: '48px', height: '48px', background: '#22c55e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                            <TreeDeciduous size={24} />
                        </div>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#15803d' }}>{systemParams.esg?.trees || '-'}</div>
                        <div style={{ fontSize: '0.9rem', color: '#166534' }}>{lang === 'cn' ? '等效植树 (棵)' : 'Trees Planted'}</div>
                    </div>

                    {/* Coal Card */}
                    <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #cbd5e1', textAlign: 'center' }}>
                        <div style={{ margin: '0 auto 1rem', width: '48px', height: '48px', background: '#64748b', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                            <Factory size={24} />
                        </div>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#334155' }}>{systemParams.esg?.coalTons || '-'}</div>
                        <div style={{ fontSize: '0.9rem', color: '#475569' }}>{lang === 'cn' ? '节约标煤 (吨)' : 'Coal Saved (Tons)'}</div>
                    </div>
                </div>

                {/* 5.3 Financial Cash Flow */}
                <h3 style={{ ...sectionTitleStyle, fontSize: '1.1rem', color: '#3b82f6', borderBottomColor: '#3b82f6' }}>
                    5.3 {lang === 'cn' ? '全生命周期现金流' : 'Cash Flow Analysis'}
                </h3>

                <p style={{ fontSize: '0.9rem', marginBottom: '1rem', color: '#475569' }}>
                    {lang === 'cn' ? '基于25年项目周期，综合考虑通胀率(3%)与电池衰减(0.5%/年)的现金流预测。' : '25-year projection accounting for 3% inflation/degradation.'}
                </p>

                {systemParams.cashFlow && (
                    <div style={{ padding: '1.5rem', background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                        <div style={{ display: 'flex', gap: '2rem', marginBottom: '1.5rem' }}>
                            <div>
                                <div style={{ fontSize: '0.85rem', color: '#64748b' }}>25-Year NPV</div>
                                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0ea5e9' }}>¥ {parseFloat(systemParams.cashFlow.npv).toLocaleString()}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.85rem', color: '#64748b' }}>IRR (Internal Rate of Return)</div>
                                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981' }}>{systemParams.cashFlow.irr}%</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Payback Period</div>
                                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f59e0b' }}>{financials.paybackYears} Years</div>
                            </div>
                        </div>

                        <div style={{ height: '300px', width: '100%' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={systemParams.cashFlow.chartData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="year" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis fontSize={12} tickFormatter={(val) => `¥${val / 1000}k`} tickLine={false} axisLine={false} />
                                    <Tooltip formatter={(val) => `¥${parseInt(val).toLocaleString()}`} />
                                    <Legend />
                                    <Line type="monotone" dataKey="cumulative" name={lang === 'cn' ? '累计收益 (Cumulative)' : 'Cumulative Cash Flow'} stroke="#2563eb" strokeWidth={3} dot={false} />
                                    <Line type="monotone" dataKey="net" name={lang === 'cn' ? '年度净利 (Net)' : 'Annual Net Savings'} stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}
            </div>

            {/* PAGE 6: BOQ / Configuration List (Renumbered) */}
            <div className="doc-page" style={a4Style}>
                <div style={headerStyle}>
                    <div style={logoStyle}>
                        <div style={{ width: '24px', height: '24px', background: 'white', borderRadius: '4px' }}></div>
                        <span>Smart Microgrid Pro</span>
                    </div>
                    <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Bill of Quantities</div>
                </div>

                <h2 style={sectionTitleStyle}>6. {lang === 'cn' ? '设备配置清单 (BOQ)' : 'Bill of Quantities'}</h2>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                        <thead>
                            <tr style={{ background: '#f3f4f6', borderBottom: '2px solid #333' }}>
                                <th style={{ padding: '10px', textAlign: 'left' }}>{lang === 'cn' ? '序号' : 'No.'}</th>
                                <th style={{ padding: '10px', textAlign: 'left' }}>{lang === 'cn' ? '设备名称' : 'Item'}</th>
                                <th style={{ padding: '10px', textAlign: 'left' }}>{lang === 'cn' ? '型号 / 规格' : 'Model / Spec'}</th>
                                <th style={{ padding: '10px', textAlign: 'right' }}>{lang === 'cn' ? '数量' : 'Qty'}</th>
                                <th style={{ padding: '10px', textAlign: 'left' }}>{lang === 'cn' ? '单位' : 'Unit'}</th>
                                <th style={{ padding: '10px', textAlign: 'left' }}>{lang === 'cn' ? '备注' : 'Remarks'}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                // Display Integrated Units if existing (e.g. Mobile ESS)
                                systemParams.recProducts.mobile_unit ?
                                    { name: t('results.cards.mobile'), model: systemParams.recProducts.mobile_unit.name, qty: 1, unit: 'set', remark: 'Integrated PV+ESS' } : null,

                                // Otherwise display separate PV/Inv/Bat
                                !systemParams.recProducts.mobile_unit ? {
                                    name: t('results.cards.pv'),
                                    model: systemParams.recProducts.pv.name,
                                    specs: systemParams.recProducts.pv.specs,
                                    qty: systemParams.recProducts.panelCount || Math.ceil(systemParams.pvKw * 1000 / 550),
                                    unit: 'pcs',
                                    remark: `${systemParams.recProducts.pv.powerW || 550}W Module`
                                } : null,

                                (!systemParams.recProducts.mobile_unit && systemParams.recProducts.inverter) ? {
                                    name: t('results.cards.inv'),
                                    model: systemParams.recProducts.inverter.name,
                                    specs: systemParams.recProducts.inverter.specs,
                                    qty: systemParams.recProducts.inverterCount || 1,
                                    unit: 'set',
                                    remark: `${systemParams.recProducts.inverter.capacityKw}kW Unit`
                                } : null,

                                (!systemParams.recProducts.mobile_unit && systemParams.recProducts.battery) ? {
                                    name: t('results.cards.bess'),
                                    model: systemParams.recProducts.battery.name,
                                    specs: systemParams.recProducts.battery.specs,
                                    qty: systemParams.recProducts.batteryCount || 1,
                                    unit: 'set',
                                    remark: `${systemParams.recProducts.battery.capacityKwh}kWh Module`
                                } : null,

                                // Extra Large System
                                systemParams.recProducts.smart_ess ? { name: 'C&I ESS Container', model: systemParams.recProducts.smart_ess.name, specs: systemParams.recProducts.smart_ess.specs, qty: 1, unit: 'set', remark: 'Liquid Cooled' } : null,

                                systemParams.dieselKw > 0 ? { name: t('results.cards.diesel'), model: systemParams.recProducts.generator?.name || 'Diesel Gen', specs: systemParams.recProducts.generator?.specs, qty: 1, unit: 'set', remark: `${systemParams.dieselKw}kW Backup` } : null,
                                { name: 'Mounting System', model: systemParams.recProducts.mount?.type || 'Aluminum Alloy', qty: 1, unit: 'lot', remark: systemParams.scenarioData?.roof_type || 'Custom' },
                                { name: 'Cables & Accessories', model: 'DC/AC Cables', qty: 1, unit: 'lot', remark: 'Standard' },
                                { name: 'Monitoring System', model: 'Smart Logger', qty: 1, unit: 'set', remark: 'Remote App' }
                            ].filter(Boolean).map((item, idx) => (
                                <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '10px' }}>{idx + 1}</td>
                                    <td style={{ padding: '10px', fontWeight: 'bold' }}>{item.name}</td>
                                    <td style={{ padding: '10px', fontFamily: 'monospace' }}>
                                        <div>{item.model}</div>
                                        {/* Display detailed specs if available */}
                                        {item.specs && (
                                            <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '2px' }}>
                                                {Object.entries(item.specs).map(([k, v]) => `${k}: ${v}`).join(' | ')}
                                            </div>
                                        )}
                                    </td>
                                    <td style={{ padding: '10px', textAlign: 'right' }}>{item.qty}</td>
                                    <td style={{ padding: '10px' }}>{item.unit}</td>
                                    <td style={{ padding: '10px', color: '#666' }}>{item.remark}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* PAGE 7: O&M Standards */}
            <div className="doc-page" style={a4Style}>
                <div style={headerStyle}>
                    <div style={logoStyle}>
                        <div style={{ width: '24px', height: '24px', background: 'white', borderRadius: '4px' }}></div>
                        <span>Smart Microgrid Pro</span>
                    </div>
                    <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>O&M & Warranty</div>
                </div>

                <h3 style={sectionTitleStyle}>7. {txt.om.title}</h3>
                <p style={{ marginBottom: '1rem' }}>{txt.om.content}</p>
                <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
                    {txt.om.schedule.map((task, i) => (
                        <li key={i} style={{ marginBottom: '0.5rem' }}>{task}</li>
                    ))}
                </ul>
                <div style={{ padding: '1rem', background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '6px' }}>
                    <strong>{lang === 'cn' ? '质保' : 'Warranty'}: </strong> {txt.om.warranty}
                </div>
            </div>
        </div>
    );
};

export default DocumentView;
