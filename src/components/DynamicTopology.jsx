import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Battery, Zap, Factory, Truck, Activity } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const DynamicTopology = ({ data }) => {
    const { t } = useLanguage();
    // data contains: pvKw, batteryKwh, inverterKw, dieselKw, loadKw, eneryFlow, scenarioId, isOffGrid
    const { pvKw, batteryKwh, inverterKw, dieselKw, scenarioId, isOffGrid } = data;

    // Animation states
    const [flowActive, setFlowActive] = useState(true);

    // Node Styles
    const nodeStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(12px)',
        borderRadius: '0.75rem',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        minWidth: '120px'
    };

    const labelStyle = {
        fontSize: '0.875rem',
        color: '#e2e8f0',
        fontWeight: 500
    };

    const valueStyle = {
        fontSize: '0.75rem',
        color: '#94a3b8'
    };

    // Dynamic Connection Lines (SVG)
    const renderConnection = (fromX, fromY, toX, toY, active = true) => (
        <g>
            <path
                d={`M${fromX},${fromY} L${toX},${toY}`}
                stroke="#334155"
                strokeWidth="2"
                fill="none"
            />
            {active && (
                <circle r="4" fill="#22d3ee">
                    <animateMotion
                        dur="2s"
                        repeatCount="indefinite"
                        path={`M${fromX},${fromY} L${toX},${toY}`}
                    />
                </circle>
            )}
        </g>
    );

    return (
        <div className="topology-container" style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            background: 'rgba(15, 23, 42, 0.9)',
            borderRadius: '1rem',
            overflow: 'hidden',
            border: '1px solid #334155'
        }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.2, backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div> {/* Background Grid */}

            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
                {/* Central Bus (Inverter/PCC) is at center: 50% 50% */}
                {/* PV (Top Left) to Center */}
                {pvKw > 0 && renderConnection(100, 80, 400, 200)}
                {/* Grid (Top Right) to Center */}
                {!isOffGrid && renderConnection(700, 80, 400, 200)}
                {/* Battery (Bottom Left) to Center */}
                {batteryKwh > 0 && renderConnection(100, 320, 400, 200)}
                {/* Diesel (Bottom Right) to Center */}
                {dieselKw > 0 && renderConnection(700, 320, 400, 200)}
                {/* Load (Center Bottom) from Center */}
                {renderConnection(400, 200, 400, 350)}
            </svg>

            {/* Nodes Placement */}

            {/* PV Array */}
            {pvKw > 0 && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{ ...nodeStyle, position: 'absolute', top: '40px', left: '40px' }}
                >
                    <Sun size={32} color="#facc15" style={{ marginBottom: '0.5rem' }} />
                    <span style={labelStyle}>{t('results.visuals.nodes.pv')}</span>
                    <span style={valueStyle}>{pvKw} kWp</span>
                </motion.div>
            )}

            {/* Utility Grid */}
            {!isOffGrid && (
                <motion.div
                    style={{ ...nodeStyle, position: 'absolute', top: '40px', right: '40px' }}
                >
                    <Zap size={32} color="#4ade80" style={{ marginBottom: '0.5rem' }} />
                    <span style={labelStyle}>{t('results.visuals.nodes.grid')}</span>
                    <span style={valueStyle}>{t('results.visuals.nodes.connected')}</span>
                </motion.div>
            )}

            {/* Battery Storage */}
            {batteryKwh > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ ...nodeStyle, position: 'absolute', bottom: '40px', left: '40px' }}
                >
                    <Battery size={32} color="#60a5fa" style={{ marginBottom: '0.5rem' }} />
                    <span style={labelStyle}>{t('results.visuals.nodes.ess')}</span>
                    <span style={valueStyle}>{batteryKwh} kWh</span>
                </motion.div>
            )}

            {/* Diesel Gen */}
            {dieselKw > 0 && (
                <motion.div
                    style={{ ...nodeStyle, position: 'absolute', bottom: '40px', right: '40px' }}
                >
                    <Factory size={32} color="#fb923c" style={{ marginBottom: '0.5rem' }} />
                    <span style={labelStyle}>{t('results.visuals.nodes.gen')}</span>
                    <span style={valueStyle}>{dieselKw} kW</span>
                </motion.div>
            )}

            {/* Center: PCS / Inverter */}
            <div
                style={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    padding: '1.5rem', background: '#1e293b', borderRadius: '999px',
                    border: '2px solid #06b6d4', boxShadow: '0 0 20px rgba(34,211,238,0.3)', zIndex: 10
                }}
            >
                <Activity size={24} color="#22d3ee" />
                <span style={{ fontSize: '0.75rem', color: '#cffafe', marginTop: '0.25rem', fontWeight: 'bold' }}>{t('results.visuals.nodes.pcs')}</span>
                <span style={{ fontSize: '0.625rem', color: 'rgba(165, 243, 252, 0.6)' }}>{inverterKw} kW</span>
            </div>

            {/* Load (Bottom Center) */}
            <div
                style={{ ...nodeStyle, position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)' }}
            >
                <Factory size={24} color="#c084fc" style={{ marginBottom: '0.25rem' }} />
                <span style={labelStyle}>{t('results.visuals.nodes.load')}</span>
            </div>
        </div>
    );
};

export default DynamicTopology;
