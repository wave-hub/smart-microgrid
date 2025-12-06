import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { locations } from '../data/locations';
import { scenarios, scenarioQuestions } from '../data/scenario_questions';

const InputForm = ({ onGenerate }) => {
    const { t, lang } = useLanguage();
    const [selectedScenario, setSelectedScenario] = useState('residential');
    const [formData, setFormData] = useState({
        locationId: 'shanghai',
        dailyConsumption: 5000,
        peakLoad: 800,
        roofArea: 5000,
        scenarioData: {}
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleScenarioDataChange = (fieldId, value) => {
        setFormData(prev => ({
            ...prev,
            scenarioData: { ...prev.scenarioData, [fieldId]: value }
        }));
    };

    const handleSubmit = () => {
        const selectedLoc = locations.find(l => l.id === formData.locationId);
        onGenerate({
            ...formData,
            location: selectedLoc,
            scenarioId: selectedScenario
        });
    };

    // Current Questions
    const activeQuestions = scenarioQuestions[selectedScenario] || [];

    // Preview Image Logic
    const getPreviewImage = () => {
        switch (selectedScenario) {
            case 'residential': return '/img_topology_residential.png';
            case 'ci_pv': return '/img_topology_ci_pv.png';
            case 'ci_ess': return '/img_topology_ci_ess.png';
            case 'ev_station': return '/img_topology_ev_station.png';
            case 'foldable_pv': return '/img_topology_foldable.png';
            case 'mobile_ess': return '/img_topology_mobile.png';
            case 'service_area': return '/img_topology_service_area.png';
            default: return '/city_concept.png';
        }
    };

    return (
        <div style={{ display: 'flex', gap: '2rem' }}>
            <div className="form-container" style={{ flex: 1 }}>

                {/* 1. Scenario Selector */}
                <div className="form-section">
                    <h3>{t('form.projectType')}</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '0.8rem' }}>
                        {scenarios.map(s => (
                            <div
                                key={s.id}
                                onClick={() => setSelectedScenario(s.id)}
                                style={{
                                    padding: '0.8rem',
                                    borderRadius: '8px',
                                    border: selectedScenario === s.id ? '2px solid #0052cc' : '1px solid #ddd',
                                    background: selectedScenario === s.id ? '#e3f2fd' : '#fff',
                                    cursor: 'pointer',
                                    textAlign: 'center',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <div style={{ fontWeight: 'bold', fontSize: '0.9rem', color: selectedScenario === s.id ? '#0052cc' : '#333' }}>
                                    {lang === 'cn' ? s.nameCN : s.nameEN}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 2. Scenario Specific Questions */}
                {activeQuestions.length > 0 && (
                    <div className="form-section highlight-section" style={{ background: '#f8f9fa', border: '1px solid #e1e4e8' }}>
                        <h3>{t('form.dataCollection')} - {lang === 'cn' ? scenarios.find(s => s.id === selectedScenario).nameCN : scenarios.find(s => s.id === selectedScenario).nameEN}</h3>
                        {activeQuestions.map(q => (
                            <div key={q.id} style={{ marginBottom: '1rem' }}>
                                <h4 style={{ margin: '0 0 0.5rem 0', color: '#666', fontSize: '0.9rem' }}>{lang === 'cn' ? q.textCN : q.textEN}</h4>
                                <div className="form-row">
                                    {q.fields.map(f => (
                                        <div key={f.id} className="form-group half">
                                            <label>{lang === 'cn' ? f.labelCN : f.labelEN}</label>
                                            {f.type === 'select' ? (
                                                <select onChange={(e) => handleScenarioDataChange(f.id, e.target.value)}>
                                                    {f.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                                </select>
                                            ) : (
                                                <input
                                                    type={f.type === 'checkbox' ? 'checkbox' : 'number'}
                                                    placeholder={f.unit}
                                                    onChange={(e) => handleScenarioDataChange(f.id, e.target.value)}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* 3. Basic & Location */}
                <div className="form-section">
                    <h3>{t('form.basics')}</h3>
                    <div className="form-row">
                        <div className="form-group half">
                            <label>{t('form.location')}</label>
                            <select name="locationId" value={formData.locationId} onChange={handleChange}>
                                {locations.map(loc => (
                                    <option key={loc.id} value={loc.id}>
                                        {lang === 'cn' ? loc.nameCN : loc.nameEN}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group half">
                            <label>Annual Budget (10k)</label>
                            <input type="number" defaultValue={200} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group half">
                            <label>Daily Load (kWh)</label>
                            <input type="number" name="dailyConsumption" value={formData.dailyConsumption} onChange={handleChange} />
                        </div>
                        <div className="form-group half">
                            <label>Roof Area (m2)</label>
                            <input type="number" name="roofArea" value={formData.roofArea} onChange={handleChange} />
                        </div>
                    </div>
                </div>

                <div className="actions">
                    <button className="btn-primary" onClick={handleSubmit}>{t('generateBtn')}</button>
                </div>
            </div>

            {/* Visual Panel */}
            <div className="visual-panel" style={{ width: '320px' }}>
                <div style={{ position: 'sticky', top: '20px' }}>
                    <h4 style={{ marginBottom: '1rem', color: '#555' }}>Scenario Preview</h4>
                    <img
                        src={getPreviewImage()}
                        alt="Scenario"
                        style={{ width: '100%', borderRadius: '8px', boxShadow: '0 8px 24px rgba(0,0,0,0.08)', border: '1px solid #eee' }}
                        onError={(e) => e.target.src = '/city_concept.png'}
                    />
                    <div style={{ marginTop: '1rem', padding: '1rem', background: '#e3f2fd', borderRadius: '8px', fontSize: '0.9rem', color: '#0052cc' }}>
                        <p><strong>System Config:</strong></p>
                        <p>• {selectedScenario.toUpperCase().replace('_', ' ')} Optimized</p>
                        <p>• {activeQuestions.length} Data Points Required</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InputForm;
