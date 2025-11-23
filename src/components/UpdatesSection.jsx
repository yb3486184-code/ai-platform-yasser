import React from 'react';
import '../styles/Sections.css';

export default function UpdatesSection({ t }) {
  const updates = [
    {
      id: 1,
      version: '1.0.0',
      title: 'الإصدار الأول',
      date: '2024-01-01',
      changes: ['إطلاق المنصة', 'إضافة 25 وكيل', 'إضافة 50 أداة']
    },
    {
      id: 2,
      version: '1.1.0',
      title: 'تحديث الميزات',
      date: '2024-01-15',
      changes: ['تحسين الأداء', 'إضافة وكلاء جدد', 'تحسين الواجهة']
    }
  ];

  return (
    <section className="section updates-section" id="updates">
      <div className="container">
        <h2 className="section-title">🔄 {t.updates}</h2>
        <p className="section-subtitle">آخر التحديثات والإصدارات</p>

        <div className="updates-list">
          {updates.map((update) => (
            <div key={update.id} className="update-card">
              <div className="update-header">
                <h3>{update.title}</h3>
                <span className="version-badge">v{update.version}</span>
              </div>
              
              <p className="update-date">📅 {new Date(update.date).toLocaleDateString('ar-SA')}</p>
              
              <div className="update-changes">
                <strong>التغييرات:</strong>
                <ul>
                  {update.changes.map((change, idx) => (
                    <li key={idx}>{change}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
