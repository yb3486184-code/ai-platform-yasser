import React from 'react';
import '../styles/Header.css';

export default function Header({ darkMode, setDarkMode, language, setLanguage, t }) {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo-section">
            <img src="/logo.png" alt="YASSER AI" className="logo-image" />
            <div className="logo-text">
              <h1 className="logo">YASSER AI</h1>
              <p className="tagline">منصة الذكاء الاصطناعي</p>
            </div>
          </div>

          <nav className="nav">
            <a href="#home" className="nav-link">{t.home}</a>
            <a href="#agents" className="nav-link">{t.agents}</a>
            <a href="#tools" className="nav-link">{t.tools}</a>
            <a href="#training" className="nav-link">{t.training}</a>
            <a href="#updates" className="nav-link">{t.updates}</a>
          </nav>

          <div className="controls">
            <button 
              className="btn-control"
              onClick={() => setDarkMode(!darkMode)}
              title={t.darkMode}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
            
            <select 
              className="language-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="ar">العربية</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}
