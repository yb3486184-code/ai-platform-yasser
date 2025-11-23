import React from 'react';
import '../styles/Hero.css';

export default function Hero({ t, stats }) {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">🚀 {t.welcome}</h1>
          <p className="hero-subtitle">{t.subtitle}</p>
          <button className="btn-primary">{t.getStarted}</button>
        </div>

        <div className="hero-stats">
          {stats && (
            <>
              <div className="stat-card">
                <h3>{stats.totalAgents}</h3>
                <p>وكيل متخصص</p>
              </div>
              <div className="stat-card">
                <h3>{stats.totalTools}</h3>
                <p>أداة ذكية</p>
              </div>
              <div className="stat-card">
                <h3>{stats.totalTrainings}</h3>
                <p>برنامج تدريبي</p>
              </div>
              <div className="stat-card">
                <h3>{stats.totalUpdates}</h3>
                <p>تحديث</p>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="hero-background">
        <div className="gradient-blob blob-1"></div>
        <div className="gradient-blob blob-2"></div>
        <div className="gradient-blob blob-3"></div>
      </div>
    </section>
  );
}
