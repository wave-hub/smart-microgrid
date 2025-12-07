import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Login = ({ onLogin }) => {
    const { t } = useLanguage();
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simple "frontend" password check
        // In a real app, this would check against a backend
        if (password === 'admin123' || password === 'delta2024') {
            onLogin();
        } else {
            setError(true);
            setTimeout(() => setError(false), 2000);
        }
    };

    return (
        <div className="login-container">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="login-card"
            >
                <div className="login-header">
                    <div className="icon-circle">
                        <Lock size={24} color="#0052cc" />
                    </div>
                    <h1>Delta Microgrid</h1>
                    <p>Sign in to access configurator</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter Access Code"
                            className={error ? 'error' : ''}
                            autoFocus
                        />
                        {error && <span className="error-msg">Access Denied</span>}
                    </div>

                    <button type="submit" className="login-btn">
                        Connect System <ArrowRight size={18} />
                    </button>
                </form>

                <div className="login-footer">
                    <p>Restricted Access System</p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
