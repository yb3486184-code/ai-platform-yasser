import React from 'react';
import '../styles/Sections.css';

export default function AgentsSection({ agents, t, language }) {
  return (
    <section className="section agents-section" id="agents">
      <div className="container">
        <h2 className="section-title">👥 {t.agents}</h2>
        <p className="section-subtitle">وكلاء متخصصون في مجالات مختلفة</p>

        <div className="agents-grid">
          {agents.length > 0 ? (
            agents.map((agent) => (
              <div key={agent.id} className="agent-card">
                <div className="agent-icon">{agent.icon}</div>
                <h3 className="agent-name">{agent.name}</h3>
                <p className="agent-category">{agent.category}</p>
                <p className="agent-description">{agent.description}</p>
                
                <div className="agent-capabilities">
                  {agent.capabilities && agent.capabilities.map((cap, idx) => (
                    <span key={idx} className="capability-tag">{cap}</span>
                  ))}
                </div>

                <button className="btn-secondary">اكتشف المزيد</button>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <p>جاري تحميل الوكلاء...</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
