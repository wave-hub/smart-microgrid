import React from 'react'
import Wizard from './components/Wizard'
import './App.css'
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import Login from './components/Login';
import { LogOut } from 'lucide-react';

const LanguageToggle = ({ style }) => {
  const { lang, setLang } = useLanguage();
  return (
    <button
      onClick={() => setLang(lang === 'cn' ? 'en' : 'cn')}
      style={{
        padding: '0.5rem 1rem', borderRadius: '20px',
        background: '#fff', border: '1px solid #ddd', cursor: 'pointer',
        fontWeight: 'bold', color: '#0052cc',
        ...style
      }}
    >
      {lang === 'cn' ? 'English' : '中文'}
    </button>
  );
};
// Inner App Component to use the hook
const AppContent = () => {
  const { t } = useLanguage();
  const [isAuthenticated, setIsAuthenticated] = React.useState(
    localStorage.getItem('microgrid_auth') === 'true'
  );

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('microgrid_auth', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('microgrid_auth');
  };

  if (!isAuthenticated) {
    return (
      <div className="app-container">
        <header className="app-header">
          <div style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 10 }}>
            <LanguageToggle />
          </div>
        </header>
        <main className="app-main" style={{ alignItems: 'center' }}>
          <Login onLogin={handleLogin} />
        </main>
        <footer className="app-footer">
          <p>© 2024 wave198796@gmail.com. All rights reserved.</p>
        </footer>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="app-header">

        <div style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', gap: '1rem', zIndex: 10 }}>
          <LanguageToggle />
          <button
            onClick={handleLogout}
            style={{
              padding: '0.5rem', borderRadius: '50%',
              background: '#fff', border: '1px solid #ddd', cursor: 'pointer',
              color: '#666', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
            title="Logout"
          >
            <LogOut size={16} />
          </button>
        </div>

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
