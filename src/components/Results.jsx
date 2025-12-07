import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, AreaChart, Area } from 'recharts';
import { useLanguage } from '../context/LanguageContext';
import DynamicTopology from './DynamicTopology';
import DocumentView from './DocumentView';
import { Download, RefreshCw, ExternalLink, ChevronRight, Zap, Battery, Sun, Activity, FileText } from 'lucide-react';

const Results = ({ results, onReset }) => {
    const { t, lang } = useLanguage();

    const { reqs, products = {} } = results || {}; // Safe default
    // Construct unified data structure for DocumentView and easy access
    const data = {
        financials: reqs.financials,
        warnings: reqs.warnings || [],
        charts: reqs.charts || { hourly: [], yearly: [] },
        systemParams: {
            ...reqs,
            recProducts: {
                pv: products.panels?.name || 'Standard PV',
                inverter: products.inverter?.name || 'Standard Inverter',
                battery: products.battery?.name || 'Standard Battery',
                generator: products.diesel?.name
            }
        },
        location: reqs.location,
        products
    };

    const { financials, systemParams, charts, warnings } = data;
    const [showDoc, setShowDoc] = useState(false);

    if (showDoc) {
        return <DocumentView data={data} onBack={() => setShowDoc(false)} />;
    }

    return (
        <div className="dashboard-container">
            {/* Header */}
            <div className="dashboard-header">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">{t('results.header')}</h2>
                    <p className="text-slate-500">Project ID: {new Date().getTime().toString().slice(-8)} | {new Date().toLocaleDateString()}</p>
                </div>
                <div className="flex gap-4">
                    <button onClick={onReset} className="btn-outline flex items-center gap-2">
                        <RefreshCw size={18} />
                        {t('results.actions.restart')}
                    </button>
                    <button className="btn-secondary flex items-center gap-2" onClick={() => setShowDoc(true)}>
                        <FileText size={18} />
                        {t('results.export.doc')}
                    </button>
                    <button className="btn-primary flex items-center gap-2" onClick={() => window.print()}>
                        <Download size={18} />
                        {t('results.export.pdf')}
                    </button>
                </div>
            </div>

            {/* Warnings Area */}
            {warnings.length > 0 && (
                <div className="warning-box">
                    <h4 className="text-amber-800 font-semibold flex items-center gap-2">
                        <Activity size={18} />
                        {t('results.visuals.warnings')}
                    </h4>
                    <ul className="list-disc list-inside text-amber-700 mt-2">
                        {warnings.map((w, i) => (
                            <li key={i}>{w.msg}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Bento Grid Layout */}
            <div className="bento-grid">

                {/* 1. Dynamic Topology (Top Left - Large) */}
                <div className="glass-card col-span-8 relative overflow-hidden" style={{ minHeight: '400px' }}>
                    <div className="absolute top-4 left-6 z-10">
                        <h3 className="metric-label text-cyan-700">{t('results.visuals.archTitle')}</h3>
                        <p className="text-sm text-slate-500 max-w-md">{t('results.visuals.archDesc')}</p>
                    </div>

                    <div className="topology-wrapper">
                        <DynamicTopology data={{
                            pvKw: reqs.pvKw,
                            batteryKwh: reqs.batteryKwh,
                            inverterKw: reqs.inverterKw,
                            dieselKw: reqs.dieselKw,
                            scenarioId: reqs.scenarioId,
                            isOffGrid: reqs.isOffGrid // Pass Off-Grid status
                        }} />
                    </div>
                </div>

                {/* 2. Key Financial Metrics (Right Side Column) */}
                <div className="col-span-4 flex flex-col gap-6">
                    {/* ROI Card */}
                    <div className="glass-card flex-1 flex flex-col justify-center relative overflow-hidden">
                        <div className="absolute p-4" style={{ top: 0, right: 0, opacity: 0.1, pointerEvents: 'none' }}>
                            <Activity size={100} />
                        </div>
                        <div className="metric-label">{t('results.roi')}</div>
                        <div className="flex items-baseline">
                            <span className="metric-value text-emerald-600">{financials.roi}</span>
                            <span className="metric-unit text-emerald-600">%</span>
                        </div>
                        <p className="text-sm text-slate-500 mt-2">internal rate of return</p>
                    </div>

                    {/* Payback Card */}
                    <div className="glass-card flex-1 flex flex-col justify-center">
                        <div className="metric-label">{t('results.payback')}</div>
                        <div className="flex items-baseline">
                            <span className="metric-value">{financials.paybackYears}</span>
                            <span className="metric-unit">Years</span>
                        </div>
                        <p className="text-sm text-slate-500 mt-2">Estimated break-even point</p>
                    </div>

                    {/* Savings Card */}
                    <div className="glass-card flex-1 flex flex-col justify-center">
                        <div className="metric-label">{t('results.annualSave')}</div>
                        <div className="flex items-baseline">
                            <span className="metric-value">¥{parseFloat(financials.annualSavings).toLocaleString()}</span>
                        </div>
                        <p className="text-sm text-slate-500 mt-2">vs. Grid-only Power</p>
                    </div>
                </div>

                {/* 3. System Specs Row (4 columns) */}
                {/* PV Spec */}
                <div className="glass-card col-span-3">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-yellow-100 rounded-lg text-yellow-600"><Sun size={20} /></div>
                        <span className="metric-label mb-0">PV Capacity</span>
                    </div>
                    <div className="metric-value">{reqs.pvKw}<span className="metric-unit">kWp</span></div>
                </div>

                {/* BESS Spec */}
                <div className="glass-card col-span-3">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-blue-100 rounded-lg text-blue-600"><Battery size={20} /></div>
                        <span className="metric-label mb-0">Storage</span>
                    </div>
                    <div className="metric-value">{reqs.batteryKwh}<span className="metric-unit">kWh</span></div>
                </div>

                {/* Inverter Spec */}
                <div className="glass-card col-span-3">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-cyan-100 rounded-lg text-cyan-600"><Zap size={20} /></div>
                        <span className="metric-label mb-0">Inverter</span>
                    </div>
                    <div className="metric-value">{reqs.inverterKw}<span className="metric-unit">kW</span></div>
                </div>

                {/* Grid/Load Spec */}
                <div className="glass-card col-span-3">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-purple-100 rounded-lg text-purple-600"><Activity size={20} /></div>
                        <span className="metric-label mb-0">Daily Load</span>
                    </div>
                    <div className="metric-value">{(reqs.pvKw * 4).toFixed(0)}<span className="metric-unit">kWh</span></div>
                </div>

                {/* 4. Main Chart (Hourly Simulation) */}
                <div className="glass-card col-span-12 chart-container-large">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-slate-700">{t('results.charts.daily')}</h3>
                        <div className="flex gap-4 text-sm">
                            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-yellow-400" style={{ display: 'inline-block' }}></span> {t('results.charts.solar')}</span>
                            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-purple-500" style={{ display: 'inline-block' }}></span> {t('results.charts.load')}</span>
                            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-blue-500" style={{ display: 'inline-block' }}></span> Grid</span>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={charts.hourly}>
                            <defs>
                                <linearGradient id="colorSolar" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#facc15" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#facc15" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} axisLine={false} />
                            <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
                            <Tooltip
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <Area type="monotone" dataKey="solar" stroke="#eab308" strokeWidth={2} fillOpacity={1} fill="url(#colorSolar)" />
                            <Area type="monotone" dataKey="load" stroke="#a855f7" strokeWidth={2} fill="transparent" />
                            <Area type="monotone" dataKey="grid" stroke="#3b82f6" strokeWidth={2} fill="transparent" strokeDasharray="5 5" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* 5. Product BOM List (Full Width) */}
                <div className="glass-card col-span-12">
                    <h3 className="font-semibold text-slate-700 mb-4 border-b border-slate-100 pb-2">{t('results.bom.title')}</h3>
                    <div className="product-grid">
                        {/* Iterating over products manually to control layout */}
                        {[
                            { item: products.panels, count: products.panelCount, type: 'PV Modules', icon: Sun, totalSpec: `${reqs.pvKw} kWp` },
                            { item: products.battery, count: products.batteryCount, type: 'BESS', icon: Battery, totalSpec: `${reqs.batteryKwh} kWh` },
                            { item: products.inverter, count: products.inverterCount, type: 'Inverter/PCS', icon: Zap, totalSpec: `${reqs.inverterKw} kW` },
                            { item: products.diesel, count: 1, type: 'Generator', icon: Activity, totalSpec: `${reqs.dieselKw} kW` },
                            { item: products.evCharger, count: reqs.evStats?.count, type: 'EV Charger', icon: Zap, totalSpec: `${reqs.evStats?.count || 0} x ${reqs.evStats?.avgPower || 0}kW` },
                            { item: products.foldable_unit, type: 'Foldable PV', icon: Sun },
                            { item: products.smart_ess, type: 'Integrated ESS', icon: Battery },
                            { item: products.smart_sst, type: 'SST Transformer', icon: Zap }
                        ].map((entry, idx) => entry.item && (
                            <div key={idx} className="product-card group hover:border-emerald-400 transition-colors">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                        {entry.count && entry.count > 1 ? `${entry.count} x ` : ''}{entry.type}
                                    </span>
                                    {entry.item.link && (
                                        <a href={entry.item.link} target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:text-emerald-700">
                                            <ExternalLink size={16} />
                                        </a>
                                    )}
                                </div>
                                <h4 className="font-bold text-slate-800 text-lg mb-1">{entry.item.name || 'Unknown Product'}</h4>
                                <div className="text-emerald-600 font-semibold text-sm mb-3">
                                    {entry.totalSpec || (entry.item.powerKw ? `${entry.item.powerKw} kW` : (entry.item.capacityKwh ? `${entry.item.capacityKwh} kWh` : 'Standard Unit'))}
                                </div>

                                <div className="space-y-1">
                                    {entry.item.specs && Object.entries(entry.item.specs).slice(0, 3).map(([k, v]) => (
                                        <div key={k} className="flex justify-between text-xs">
                                            <span className="text-slate-400 capitalize">{k}:</span>
                                            <span className="font-medium text-slate-600">{v}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Results;
