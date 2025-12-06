import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InputForm from './InputForm';
import Results from './Results';
import { calculateSystem } from '../utils/calculator';
import { recommendProducts } from '../data/products';
import { useLanguage } from '../context/LanguageContext';

const Wizard = () => {
    const { t } = useLanguage();
    const [step, setStep] = useState(0);
    const [results, setResults] = useState(null);

    const nextStep = () => setStep(s => s + 1);

    // New handler: accepts complete formData from InputForm
    const handleGenerate = (formData) => {
        const sysRequirements = calculateSystem(formData);
        // Pass both calculated reqs AND original form data (for isMicrogrid, transformerCap)
        const productRecs = recommendProducts({ ...sysRequirements, ...formData });
        setResults({ reqs: sysRequirements, products: productRecs });
        nextStep();
    };

    return (
        <div className="wizard-container">
            <AnimatePresence mode="wait">
                {step === 0 && (
                    <motion.div
                        key="step0"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="wizard-step"
                        style={{ textAlign: 'center', padding: '3rem' }}
                    >
                        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#0052cc' }}>{t('wizard.step1')}</h2>
                        <p style={{ fontSize: '1.2rem', color: '#5e6c84', marginBottom: '2rem' }}>{t('subtitle')}</p>
                        <button className="btn-primary" onClick={nextStep} style={{ fontSize: '1.2rem', padding: '1rem 3rem' }}>
                            {t('startBtn')}
                        </button>
                    </motion.div>
                )}

                {step === 1 && (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="wizard-step"
                    >
                        <InputForm onGenerate={handleGenerate} />
                    </motion.div>
                )}

                {step === 2 && results && (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="wizard-step"
                    >
                        <Results
                            results={results}
                            onReset={() => setStep(0)}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Wizard;
