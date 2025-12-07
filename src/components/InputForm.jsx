import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { locations } from '../data/locations';
import { scenarios, scenarioQuestions, commonFields } from '../data/scenario_questions';

const InputForm = ({ onGenerate }) => {
    const { t, lang } = useLanguage();
    const [selectedScenario, setSelectedScenario] = useState('residential');
    const [formData, setFormData] = useState({
        locationId: 'shanghai',
        targetMarket: 'EU',
        deliveryPort: 'shanghai',
        dailyConsumption: 5000,
        roofArea: 5000,
        scenarioData: {}
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'locationId') {
            const loc = locations.find(l => l.id === value);
            setFormData(prev => ({
                ...prev,
                [name]: value,
                targetMarket: loc ? (loc.market || 'EU') : 'EU'
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
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

    // Current Scenario Questions
    const activeQuestions = scenarioQuestions[selectedScenario] || [];

    // Preview Image Logic
    const getPreviewImage = () => {
        switch (selectedScenario) {
            case 'residential': return '/img_topology_residential.png';
            case 'commercial_pv': return '/img_topology_ci_pv.png';
            case 'commercial_ess': return '/img_topology_ci_ess.png';
            case 'ev_station': return '/img_topology_ev_station.png';
            case 'microgrid': return '/img_topology_service_area.png'; // Reuse map for microgrid
            case 'mobile_ess': return '/img_topology_mobile.png';
            default: return '/city_concept.png';
        }
    };

    const renderFields = (questionGroup) => (
        <div key={questionGroup.id} className="form-section" style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', border: '1px solid #e2e8f0' }}>
            <h4 style={{ margin: '0 0 1rem 0', color: '#334155', fontSize: '0.95rem', fontWeight: '600' }}>
                {lang === 'cn' ? questionGroup.textCN : questionGroup.textEN}
            </h4>
            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {questionGroup.fields.filter(f => !(selectedScenario === 'residential' && f.id === 'transformer_cap')).map(f => (
                    <div key={f.id} className="form-group" style={{ marginBottom: 0 }}>
                        <label style={{ display: 'block', fontSize: '0.85rem', color: '#64748b', marginBottom: '0.25rem' }}>
                            {lang === 'cn' ? f.labelCN : f.labelEN}
                        </label>
                        {f.type === 'select' ? (
                            <select
                                onChange={(e) => handleScenarioDataChange(f.id, e.target.value)}
                                style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                            >
                                {f.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                        ) : f.type === 'checkbox' ? (
                            <input type="checkbox" onChange={(e) => handleScenarioDataChange(f.id, e.target.checked)} />
                        ) : f.type === 'text' ? (
                            <input
                                type="text"
                                placeholder={f.placeholder}
                                onChange={(e) => handleScenarioDataChange(f.id, e.target.value)}
                                style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                            />
                        ) : (
                            <div style={{ position: 'relative' }}>
                                <input
                                    type="number"
                                    step="1"
                                    onChange={(e) => handleScenarioDataChange(f.id, e.target.value)}
                                    style={{ width: '100%', padding: '0.5rem', paddingRight: '2.5rem', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                                />
                                <span style={{ position: 'absolute', right: '0.5rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '0.8rem' }}>
                                    {f.unit}
                                </span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div style={{ display: 'flex', gap: '2rem' }}>
            <div className="form-container" style={{ flex: 1 }}>

                {/* 1. Solution Type Selector (Replaced 'Scenario') */}
                <div className="form-section">
                    <h3>{t('form.projectType')}</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.8rem' }}>
                        {scenarios.map(s => (
                            <div
                                key={s.id}
                                onClick={() => setSelectedScenario(s.id)}
                                style={{
                                    padding: '0.8rem',
                                    borderRadius: '8px',
                                    border: selectedScenario === s.id ? '2px solid #0052cc' : '1px solid #e2e8f0',
                                    background: selectedScenario === s.id ? '#eff6ff' : '#fff',
                                    cursor: 'pointer',
                                    textAlign: 'center',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <div style={{ fontSize: '0.85rem', color: selectedScenario === s.id ? '#1e40af' : '#64748b', fontWeight: '600' }}>
                                    {lang === 'cn' ? s.nameCN : s.nameEN}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 2. Basic Project Info (Common Fields) - REMOVED per user request */}
                {/* 2. Basic Project Info (Common Fields) - REMOVED per user request */}
                {/* {commonFields.map(group => renderFields(group))} */}

                {/* 2.5 New: Load Details Section (Added as per user request) */}
                <div className="form-section" style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', border: '1px solid #e2e8f0' }}>
                    <h4 style={{ margin: '0 0 1rem 0', color: '#334155', fontSize: '0.95rem', fontWeight: '600' }}>
                        {lang === 'cn' ? '负荷详情 (Load Profile)' : 'Load Details'}
                    </h4>
                    <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div className="form-group">
                            <label style={{ display: 'block', fontSize: '0.85rem', color: '#64748b', marginBottom: '0.25rem' }}>
                                {lang === 'cn' ? '月均用电量 (kWh)' : 'Monthly Consumption (kWh)'}
                            </label>
                            <input
                                type="number"
                                step="1"
                                value={formData.dailyConsumption ? Math.round(formData.dailyConsumption * 30) : ''}
                                onChange={(e) => setFormData(prev => ({ ...prev, dailyConsumption: e.target.value / 30 }))}
                                placeholder="e.g. 500"
                                style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                            />
                        </div>
                        <div className="form-group">
                            <label style={{ display: 'block', fontSize: '0.85rem', color: '#64748b', marginBottom: '0.25rem' }}>
                                {lang === 'cn' ? '峰值功率 (kW)' : 'Peak Load (kW)'}
                            </label>
                            <input
                                type="number"
                                onChange={(e) => handleScenarioDataChange('peak_load_kw', e.target.value)}
                                placeholder="e.g. 5"
                                style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                            />
                        </div>
                    </div>
                </div>

                {/* 3. Scenario Specific Questions */}
                {activeQuestions.map(group => renderFields(group))}

                {/* 4. Location & Market (Moved to bottom) */}
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
                            <label>{lang === 'cn' ? '目标市场 (自动匹配)' : 'Target Market (Auto)'}</label>
                            <select name="targetMarket" value={formData.targetMarket} onChange={handleChange} disabled style={{ background: '#f1f5f9', cursor: 'not-allowed' }}>
                                <option value="EU">Europe (CE/IEC)</option>
                                <option value="NA">North America (UL/IEEE)</option>
                                <option value="AU">Australia (AS/NZS)</option>
                                <option value="ASIA">Southeast Asia (IEC)</option>
                                <option value="AF">Africa (SONCAP/IEC)</option>
                            </select>
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
                    <h4 style={{ marginBottom: '1rem', color: '#555' }}>Solution Preview</h4>
                    <img
                        src={getPreviewImage()}
                        alt="Scenario"
                        style={{ width: '100%', borderRadius: '8px', boxShadow: '0 8px 24px rgba(0,0,0,0.08)', border: '1px solid #eee' }}
                        onError={(e) => e.target.src = '/city_concept.png'}
                    />
                    <div style={{ marginTop: '1rem', padding: '1rem', background: '#fffbeb', borderRadius: '8px', border: '1px solid #fcd34d' }}>
                        <h5 style={{ margin: '0 0 0.5rem 0', color: '#b45309', fontSize: '0.9rem', fontWeight: 'bold' }}>
                            ⚠️ {lang === 'cn' ? '户用注意事项' : 'Installation Tips'}
                        </h5>
                        <ul style={{ paddingLeft: '1.2rem', margin: 0, fontSize: '0.8rem', color: '#92400e', lineHeight: '1.4' }}>
                            <li>{lang === 'cn' ? '屋顶承重：需确认结构牢固' : 'Roof Load: Ensure stability'}</li>
                            <li>{lang === 'cn' ? '防水检查：避免破坏原有防水层' : 'Waterproof: Protect roof layer'}</li>
                            <li>{lang === 'cn' ? '遮挡分析：避开女儿墙/树木' : 'Shading: Avoid trees/walls'}</li>
                            <li>{lang === 'cn' ? '朝向选择：正南向发电效率最高' : 'Orientation: South is optimal'}</li>
                            <li>{lang === 'cn' ? '电网规范：需当地电力局审批' : 'Permits: Check local grid codes'}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InputForm;
