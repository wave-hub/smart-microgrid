import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { useLanguage } from '../context/LanguageContext';

const Results = ({ data, results, onReset }) => {
    const { t } = useLanguage();
    // V7 Update: results now contains flat metrics (pvKw, etc) AND nested objects (financials, details)
    // However, Wizard.jsx still passes { reqs, products } structure?
    // Let's check Wizard.jsx. It passes { reqs: sysRequirements, products: productRecs }
    // AND sysRequirements (from calculator.js) contains { pvKw, ..., financials, details, charts }

    const { reqs, products } = results;
    const { financials, charts = { hourly: [], yearly: [] }, details, evStats } = reqs;

    // Check if we have top-level metrics in reqs or results? 
    // calculator returns { pvKw, ... } which becomes `reqs` in Wizard.
    // So we access results.reqs.pvKw etc.

    return (
        <div className="results-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>{t('results.header')}</h2>
                <img src="/bess.png" alt="Energy Storage" style={{ height: '80px', borderRadius: '8px' }} />
            </div>

            {/* 1. Key Metrics Grid */}
            <div className="results-grid">
                {results.pvKw > 0 && (
                    <div className="result-card">
                        <h3>{t('results.pvSystem')}</h3>
                        <div className="big-value">{results.pvKw} <span className="unit">kWp</span></div>
                        <p>{t('results.annualGen')}: {details.annualGen} kWh</p>
                    </div>
                )}

                {results.batteryKwh > 0 && (
                    <div className="result-card">
                        <h3>{t('results.essSystem')}</h3>
                        <div className="big-value">{results.batteryKwh} <span className="unit">kWh</span></div>
                        <p>Autonomy: {results.batteryKwh / 10}h (Est)</p>
                    </div>
                )}

                {/* EV Station Card */}
                {evStats && evStats.count > 0 && (
                    <div className="result-card" style={{ borderLeft: '4px solid #00C853' }}>
                        <h3>EV Charging Station</h3>
                        <div className="big-value">{evStats.count} <span className="unit">Piles</span></div>
                        <p>Total Load: {evStats.realLoad.toFixed(1)} kW</p>
                    </div>
                )}

                <div className="result-card highlight">
                    <h3>{t('results.roi')}</h3>
                    <div className="big-value">{financials.roi} <span className="unit">%</span></div>
                    <p>{t('results.payback')}: {financials.paybackYears} {t('results.years')}</p>
                </div>
            </div>

            {/* 1. System Topology & Project Visualization */}
            <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
                <div className="card" style={{ flex: 1, textAlign: 'center' }}>
                    <h3>{t('results.visuals.topology')}</h3>
                    <img src="/img_topology.png" alt="System Topology" style={{ maxWidth: '100%', borderRadius: '8px', marginTop: '1rem' }} />
                </div>
                <div className="card" style={{ flex: 1, textAlign: 'center' }}>
                    <h3>{t('results.visuals.render')}</h3>
                    <img src="/img_project_render.png" alt="Project Render" style={{ maxWidth: '100%', borderRadius: '8px', marginTop: '1rem' }} />
                </div>
            </div>

            <div className="summary-cards">
                <div className="card">
                    <h3>{t('results.cards.pv')}</h3>
                    {products.panels ? (
                        <>
                            {products.panels.image && <img src={products.panels.image} alt="PV" style={{ width: '100px', height: '100px', objectFit: 'contain', margin: '0 auto', display: 'block' }} />}
                            <div className="value">{reqs.pvKw} kWp</div>
                            <div className="product">{products.panels.quantity}x {products.panels.name}</div>
                            <div className="specs" style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.5rem' }}>
                                {products.panels.specs && Object.entries(products.panels.specs).map(([k, v]) => (
                                    <div key={k}>{k}: {v}</div>
                                ))}
                            </div>
                        </>
                    ) : <p style={{ color: '#999' }}>N/A</p>}
                </div>
                <div className="card">
                    <h3>{t('results.cards.bess')}</h3>
                    {products.battery ? (
                        <>
                            {products.battery.image && <img src={products.battery.image} alt="Battery" style={{ width: '100px', height: '100px', objectFit: 'contain', margin: '0 auto', display: 'block' }} />}
                            <div className="value">{reqs.batteryKwh} kWh</div>
                            <div className="product">{products.battery.name}</div>
                            <div className="specs" style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.5rem' }}>
                                {products.battery.specs && Object.entries(products.battery.specs).map(([k, v]) => (
                                    <div key={k}>{k}: {v}</div>
                                ))}
                            </div>
                        </>
                    ) : <p style={{ color: '#999' }}>N/A</p>}
                </div>
                <div className="card">
                    <h3>{t('results.cards.inv')}</h3>
                    {products.inverter ? (
                        <>
                            {products.inverter.image && <img src={products.inverter.image} alt="Inverter" style={{ width: '100px', height: '100px', objectFit: 'contain', margin: '0 auto', display: 'block' }} />}
                            <div className="value">{reqs.inverterKw} kW</div>
                            <div className="product">{products.inverter.name}</div>
                            <div className="specs" style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.5rem' }}>
                                {products.inverter.specs && Object.entries(products.inverter.specs).map(([k, v]) => (
                                    <div key={k}>{k}: {v}</div>
                                ))}
                            </div>
                        </>
                    ) : <p style={{ color: '#999' }}>N/A</p>}
                </div>
                {products.diesel && (
                    <div className="card">
                        <h3>{t('results.cards.diesel')}</h3>
                        <div className="value">{reqs.dieselKw} kW</div>
                        <div className="product">{products.diesel.name}</div>
                        <div className="specs" style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.5rem' }}>
                            {products.diesel.specs && Object.entries(products.diesel.specs).map(([k, v]) => (
                                <div key={k}>{k}: {v}</div>
                            ))}
                        </div>
                    </div>
                )}
                {products.evCharger && reqs.evStats && (
                    <div className="card">
                        <h3>{t('results.cards.ev')}</h3>
                        {products.evCharger.image && <img src={products.evCharger.image} alt="EV Charger" style={{ width: '100px', height: '100px', objectFit: 'contain', margin: '0 auto', display: 'block' }} />}
                        <div className="value">{(products.evCharger.powerKw * 1).toFixed(0)} kW</div>
                        <div className="product">{products.evCharger.name}</div>
                        <div className="specs" style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.5rem' }}>
                            {products.evCharger.specs && Object.entries(products.evCharger.specs).map(([k, v]) => (
                                <div key={k}>{k}: {v}</div>
                            ))}
                        </div>
                    </div>
                )}
                {/* New V7.5 Cards */}
                {products.foldable_unit && (
                    <div className="card highlight" style={{ border: '2px solid #2196f3', background: '#e3f2fd' }}>
                        <h3>{t('results.cards.foldable')}</h3>
                        {products.foldable_unit.image && <img src={products.foldable_unit.image} alt="Foldable" style={{ width: '120px', height: '80px', objectFit: 'cover', margin: '0 auto', display: 'block' }} />}
                        <div className="value">{products.foldable_unit.powerKw} kWp</div>
                        <div className="product">{products.foldable_unit.name}</div>
                        <div className="specs" style={{ fontSize: '0.8rem', color: '#333', marginTop: '0.5rem' }}>
                            <div>Storage: {products.foldable_unit.storageKwh} kWh</div>
                            <div>Setup: {products.foldable_unit.specs.openTime}</div>
                        </div>
                    </div>
                )}
                {products.mobile_unit && (
                    <div className="card highlight" style={{ border: '2px solid #ff5722', background: '#fbe9e7' }}>
                        <h3>{t('results.cards.mobile')}</h3>
                        {products.mobile_unit.image && <img src={products.mobile_unit.image} alt="Mobile" style={{ width: '120px', height: '80px', objectFit: 'cover', margin: '0 auto', display: 'block' }} />}
                        <div className="value">{products.mobile_unit.capacityKwh} kWh</div>
                        <div className="product">{products.mobile_unit.name}</div>
                        <div className="specs" style={{ fontSize: '0.8rem', color: '#333', marginTop: '0.5rem' }}>
                            <div>Type: {products.mobile_unit.specs.type}</div>
                            <div>Power: {products.mobile_unit.powerKw} kW</div>
                        </div>
                    </div>
                )}
                {/* Delta Microgrid Products */}
                {products.delta_ess && (
                    <div className="card highlight" style={{ border: '2px solid #009688', background: '#e0f2f1' }}>
                        <h3>Delta Integrated ESS</h3>
                        <div className="value">{products.delta_ess.capacityKwh} kWh</div>
                        <div className="product">{products.delta_ess.name}</div>
                        <div className="specs" style={{ fontSize: '0.8rem', color: '#333', marginTop: '0.5rem' }}>
                            <div>Config: {products.delta_ess.specs.config}</div>
                            <div>Smart Optical Storage</div>
                        </div>
                    </div>
                )}
                {products.delta_sst && (
                    <div className="card highlight" style={{ border: '2px solid #673ab7', background: '#ede7f6' }}>
                        <h3>Delta SST Transformer</h3>
                        <div className="value">{products.delta_sst.powerKw} kW</div>
                        <div className="product">{products.delta_sst.name}</div>
                        <div className="specs" style={{ fontSize: '0.8rem', color: '#333', marginTop: '0.5rem' }}>
                            <div>Voltage: {products.delta_sst.specs.voltage}</div>
                            <div>Solid State Technology</div>
                        </div>
                    </div>
                )}
                {/* Microgrid Components */}
                {products.sts && (
                    <div className="card highlight" style={{ border: '1px solid #ff9800', background: '#fff3e0' }}>
                        <h3>STS (静态切换开关)</h3>
                        <div className="value">{products.sts.currentA} A</div>
                        <div className="product">{products.sts.name}</div>
                        <div className="specs" style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.5rem' }}>
                            {products.sts.specs && Object.entries(products.sts.specs).map(([k, v]) => (
                                <div key={k}>{k}: {v}</div>
                            ))}
                        </div>
                    </div>
                )}
                {products.ems && (
                    <div className="card highlight" style={{ border: '1px solid #4caf50', background: '#e8f5e9' }}>
                        <h3>EMS (能量管理系统)</h3>
                        <div className="value">{products.ems.type}</div>
                        <div className="product">{products.ems.name}</div>
                        <div className="specs" style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.5rem' }}>
                            {products.ems.specs && Object.entries(products.ems.specs).map(([k, v]) => (
                                <div key={k}>{k}: {v}</div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="charts-row" style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
                <div className="chart-section" style={{ flex: 1, height: '300px' }}>
                    <h3>{t('results.charts.daily')}</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={charts.hourly}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                            <XAxis dataKey="name" stroke="#666" />
                            <YAxis stroke="#666" />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#fff', border: '1px solid #ddd', color: '#333' }}
                                itemStyle={{ color: '#333' }}
                            />
                            <Legend wrapperStyle={{ color: '#333' }} />
                            <Line type="monotone" dataKey="load" name={t('results.charts.load')} stroke="#ffab00" strokeWidth={2} dot={false} />
                            <Line type="monotone" dataKey="solar" name={t('results.charts.solar')} stroke="#0052cc" strokeWidth={2} dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="chart-section" style={{ flex: 1, height: '300px' }}>
                    <h3>{t('results.charts.yearly')}</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={charts.yearly}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                            <XAxis dataKey="year" stroke="#666" />
                            <YAxis stroke="#666" />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#fff', border: '1px solid #ddd', color: '#333' }}
                                itemStyle={{ color: '#333' }}
                            />
                            <Legend wrapperStyle={{ color: '#333' }} />
                            <ReferenceLine y={0} stroke="#999" />
                            <Line type="monotone" dataKey="netValue" name={t('results.charts.net')} stroke="#0052cc" strokeWidth={3} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="actions">
                <button onClick={onReset} className="btn-outline">{t('results.actions.restart')}</button>
                <button className="btn-primary" onClick={() => window.print()}>{t('results.actions.print')}</button>
            </div>
        </div>
    );
};

export default Results;
