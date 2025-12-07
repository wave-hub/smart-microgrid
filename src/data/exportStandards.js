export const exportStandards = {
    EU: {
        name: 'Europe (CE)',
        standards: [
            'CE Marking (LVD 2014/35/EU, EMC 2014/30/EU)',
            'IEC 62619 (Battery Safety)',
            'IEC 62109-1/2 (Inverter Safety)',
            'RoHS Directive 2011/65/EU',
            'EN 50549 (Grid Connection)'
        ]
    },
    NA: {
        name: 'North America (UL/IEEE)',
        standards: [
            'UL 9540 (Energy Storage Systems)',
            'UL 1741 SA/SB (Inverters)',
            'IEEE 1547 (Interconnection)',
            'NFPA 855 (Energy Storage Installation)',
            'FCC Part 15 Class B (EMC)'
        ]
    },
    AU: {
        name: 'Australia (AS/NZS)',
        standards: [
            'AS/NZS 4777.2 (Inverter Requirements)',
            'AS/NZS 5033 (PV Installation)',
            'AS/NZS 5139 (Battery Installation)',
            'CEC Approved Equipment List',
            'Clean Energy Council Guidelines'
        ]
    },
    ASIA: {
        name: 'Southeast Asia (IEC/Grid Code)',
        standards: [
            'IEC 62619 (Battery Safety)',
            'IEC 62109 (Inverter Safety)',
            'Local Grid Code Compliance',
            'ISO 9001/14001',
            'TIS (Thailand) / SNI (Indonesia) where applicable'
        ]
    },
    AF: {
        name: 'Africa (IEC/Soncap)',
        standards: [
            'IEC 62619 (Battery Safety)',
            'IEC 62109 (Inverter Safety)',
            'SONCAP (Nigeria) / PVoC (Kenya/Tanzania)',
            'Off-Grid Solar Global LEAP (for SHS)',
            'World Bank/IFC EHS Guidelines'
        ]
    },
    SA: {
        name: 'South America (IEC/UL)',
        standards: [
            'IEC 62109 / UL 1741 (Inverter)',
            'INMETRO (Brazil)',
            'RETIE (Colombia)',
            'IEC 62619 (Battery)',
            'Grid Code (NTSSE, etc.)'
        ]
    }
};
