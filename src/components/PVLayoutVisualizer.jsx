import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const PVLayoutVisualizer = ({ data }) => {
    const { t, lang } = useLanguage();
    const { systemParams } = data;
    const { stringDesign, scenarioData, scenarioId } = systemParams || {};

    // Safety check
    if (!systemParams) return null;

    // Determine Construction Type for Image Selection
    const constructionType = scenarioData?.construction_type || 'Roof';

    // Select Concept Image
    let conceptImage = '/pv_layout_pitched_tile.png'; // Default
    let layoutTitle = lang === 'cn' ? '斜坡屋顶阵列示意图' : 'Pitched Roof Array Concept';

    if (constructionType.toLowerCase().includes('concrete') || constructionType.toLowerCase().includes('steel')) {
        conceptImage = '/pv_layout_flat_concrete.png';
        layoutTitle = lang === 'cn' ? '工商业平顶阵列示意图' : 'C&I Flat Roof Array Concept';
    } else if (constructionType.toLowerCase().includes('ground') || constructionType.toLowerCase().includes('land') || scenarioId.includes('microgrid')) {
        conceptImage = '/pv_layout_ground.png';
        layoutTitle = lang === 'cn' ? '地面电站阵列示意图' : 'Ground Mount Array Concept';
    }

    if (!stringDesign) return null;

    const { panelsPerString, totalStrings, totalPanels } = stringDesign;

    // SCALABLE SVG GRID GENERATION
    // We want to visualize the strings.
    // Let's arrange them in rows. Max width ~20-30 panels.
    const panelsPerRow = panelsPerString; // Draw 1 string per row? Or multiple?
    // Let's try to make it look like a block.
    // If total strings < 10, draw 1 string per row.
    // If total strings > 10, draw 2 strings per row.

    const stringsPerRow = totalStrings > 12 ? 2 : 1;
    const totalRows = Math.ceil(totalStrings / stringsPerRow);

    const panelW = 20;
    const panelH = 35;
    const gapX = 2;
    const gapY = 10; // Gap between strings (rows)

    const svgWidth = (panelsPerRow * panelW) + (panelsPerRow * gapX) + 50;
    const svgHeight = (totalRows * panelH) + (totalRows * gapY) + 20;


    return (
        <div style={{ marginTop: '2rem' }}>
            {/* 1. CONCEPT IMAGE (Effect Diagram) */}
            <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#334155', marginBottom: '1rem' }}>
                    A. {layoutTitle}
                </h4>
                <div style={{
                    width: '100%', height: '300px',
                    borderRadius: '8px', overflow: 'hidden',
                    border: '1px solid #e2e8f0',
                    backgroundImage: `url(${conceptImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative'
                }}>
                    <div style={{
                        position: 'absolute', bottom: '1rem', right: '1rem',
                        background: 'rgba(0,0,0,0.6)', color: 'white',
                        padding: '0.5rem 1rem', borderRadius: '4px', fontSize: '0.8rem'
                    }}>
                        * Concept Rendering based on {constructionType}
                    </div>
                </div>
            </div>

            {/* 2. ENGINEERING SCHEMATIC (Dynamic SVG) */}
            <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#334155', marginBottom: '1rem' }}>
                    B. {lang === 'cn' ? '组件方阵电气拓扑' : 'PV Array Electrical Topology'}
                </h4>
                <div style={{
                    border: '1px solid #cbd5e1', borderRadius: '8px', padding: '1.5rem',
                    background: '#f8fafc', display: 'flex', flexDirection: 'column', alignItems: 'center'
                }}>
                    <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1rem' }}>
                        {lang === 'cn'
                            ? `共 ${totalPanels} 块组件, 分布于 ${totalStrings} 个组串. 每串 ${panelsPerString} 块.`
                            : `Total ${totalPanels} Modules, distributed in ${totalStrings} Strings. ${panelsPerString} modules/string.`
                        }
                    </p>

                    <svg width="100%" height={Math.min(svgHeight, 500)} viewBox={`0 0 ${svgWidth} ${svgHeight}`} style={{ maxWidth: '800px', overflow: 'visible' }}>
                        {Array.from({ length: totalStrings }).map((_, sIdx) => {
                            // Calculate Row and Col position for the String
                            const row = Math.floor(sIdx / stringsPerRow);
                            const colInRow = sIdx % stringsPerRow;

                            // Offset for the string group
                            const startX = colInRow * ((panelsPerString * (panelW + gapX)) + 40);
                            const startY = row * (panelH + gapY);

                            // Color coding for visual separation
                            const stringColor = sIdx % 2 === 0 ? '#3b82f6' : '#2563eb';

                            return (
                                <g key={sIdx} transform={`translate(${startX}, ${startY})`}>
                                    {/* Draw Panels in this String */}
                                    {Array.from({ length: panelsPerString }).map((_, pIdx) => (
                                        <rect
                                            key={pIdx}
                                            x={pIdx * (panelW + gapX)}
                                            y={0}
                                            width={panelW}
                                            height={panelH}
                                            fill={stringColor}
                                            opacity={0.8}
                                            rx={2}
                                        />
                                    ))}
                                    {/* String Label */}
                                    <text x={-20} y={panelH / 1.5} fontSize="10" fill="#64748b" textAnchor="end">S{sIdx + 1}</text>

                                    {/* Connection Line (simplified) */}
                                    <line
                                        x1={0} y1={panelH / 2}
                                        x2={panelsPerString * (panelW + gapX)} y2={panelH / 2}
                                        stroke="white" strokeWidth="1" strokeDasharray="2 2"
                                    />
                                </g>
                            )
                        })}
                    </svg>

                    <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#94a3b8', fontStyle: 'italic' }}>
                        * {lang === 'cn' ? '示意图仅展示电气连接逻辑，实际物理排布需根据现场屋顶障碍物调整。' : 'Schematic shows electrical logic only. Physical layout subject to site obstacles.'}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PVLayoutVisualizer;
