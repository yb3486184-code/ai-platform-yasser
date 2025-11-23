import React from 'react';
import '../styles/Sections.css';

export default function ToolsSection({ tools, t, language }) {
  return (
    <section className="section tools-section" id="tools">
      <div className="container">
        <h2 className="section-title">🛠️ {t.tools}</h2>
        <p className="section-subtitle">أدوات ذكية لحل مشاكلك</p>

        <div className="tools-grid">
          {tools.length > 0 ? (
            tools.map((tool) => (
              <div key={tool.id} className="tool-card">
                <div className="tool-icon">{tool.icon}</div>
                <h3 className="tool-name">{tool.name}</h3>
                <p className="tool-category">{tool.category}</p>
                <p className="tool-description">{tool.description}</p>
                
                {tool.examples && tool.examples.length > 0 && (
                  <div className="tool-examples">
                    <strong>أمثلة:</strong>
                    <ul>
                      {tool.examples.map((ex, idx) => (
                        <li key={idx}>{ex}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <button className="btn-secondary">جرب الأداة</button>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <p>جاري تحميل الأدوات...</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
