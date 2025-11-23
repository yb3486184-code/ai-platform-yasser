import React from 'react';
import '../styles/Sections.css';

export default function TrainingSection({ t }) {
  const trainings = [
    {
      id: 1,
      title: 'مقدمة إلى المنصة',
      level: 'مبتدئ',
      duration: '15 دقيقة',
      description: 'تعرف على أساسيات منصة الحاج ياسر'
    },
    {
      id: 2,
      title: 'استخدام الوكلاء المتقدم',
      level: 'متوسط',
      duration: '30 دقيقة',
      description: 'تعلم كيفية استخدام الوكلاء بكفاءة'
    },
    {
      id: 3,
      title: 'ربط الأدوات والتكامل',
      level: 'متقدم',
      duration: '45 دقيقة',
      description: 'تعلم كيفية ربط الأدوات مع بعضها'
    }
  ];

  return (
    <section className="section training-section" id="training">
      <div className="container">
        <h2 className="section-title">📚 {t.training}</h2>
        <p className="section-subtitle">برامج تدريبية شاملة</p>

        <div className="training-grid">
          {trainings.map((training) => (
            <div key={training.id} className="training-card">
              <div className="training-header">
                <h3>{training.title}</h3>
                <span className="level-badge">{training.level}</span>
              </div>
              
              <p className="training-description">{training.description}</p>
              
              <div className="training-meta">
                <span>⏱️ {training.duration}</span>
              </div>

              <button className="btn-secondary">ابدأ التدريب</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
