import React from 'react'
import Wizard from './components/Wizard'
import './App.css'
import { LanguageProvider, useLanguage } from './context/LanguageContext';

const LanguageToggle = () => {
  const { lang, setLang } = useLanguage();
  return (
    <button
      onClick={() => setLang(lang === 'cn' ? 'en' : 'cn')}
      style={{
        position: 'absolute', top: '1rem', right: '1rem',
        zIndex: 100, padding: '0.5rem 1rem', borderRadius: '20px',
        background: '#fff', border: '1px solid #ddd', cursor: 'pointer',
        fontWeight: 'bold', color: '#0052cc'
      }}
    >
      {lang === 'cn' ? 'English' : '中文'}
    </button>
  );
};

// Inner App Component to use the hook
const AppContent = () => {
  const { t } = useLanguage();

  return (
    <div className="app-container">
      <header className="app-header">
        <LanguageToggle />
        <h1>{t('title')}</h1>
        <p className="subtitle">{t('subtitle')}</p>
      </header>
      <main className="app-main">
        <Wizard />
      </main>
      <footer className="app-footer">
        <p>© 2024 wave198796@gmail.com. All rights reserved.</p>
      </footer>
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
