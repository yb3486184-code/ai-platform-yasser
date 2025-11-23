import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Updates.css';

const Updates = () => {
  const navigate = useNavigate();
  const [updates, setUpdates] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetch('/api/updates')
      .then(res => res.json())
      .then(data => setUpdates(data))
      .catch(err => console.error(err));
  }, []);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'feature': return '#667eea';
      case 'bugfix': return '#e74c3c';
      case 'improvement': return '#2ecc71';
      default: return '#667eea';
    }
  };

  const getTypeLabel = (type) => {
    switch(type) {
      case 'feature': return '✨ ميزة جديدة';
      case 'bugfix': return '🐛 إصلاح خطأ';
      case 'improvement': return '⚡ تحسين';
      default: return '📝 تحديث';
    }
  };

  return (
    <div className="updates-container">
      <button className="back-btn" onClick={() => navigate('/')}>← العودة</button>
      
      <div className="updates-header">
        <h1>📢 التحديثات والإصدارات</h1>
        <p>آخر التحديثات والإصدارات الجديدة للمنصة</p>
      </div>

      <div className="updates-timeline">
        {updates.map((update, index) => (
          <div key={update.id} className="update-item">
            <div className="timeline-dot" style={{ backgroundColor: getTypeColor(update.type) }}></div>
            
            <div className="update-card" onClick={() => toggleExpand(update.id)}>
              <div className="update-header">
                <div>
                  <h3>{update.title}</h3>
                  <span className="version-badge">{update.version}</span>
                </div>
                <span className="type-badge" style={{ backgroundColor: getTypeColor(update.type) }}>
                  {getTypeLabel(update.type)}
                </span>
              </div>

              <p className="update-description">{update.description}</p>

              <div className="update-meta">
                <span className="date">📅 {new Date(update.releaseDate).toLocaleDateString('ar-SA')}</span>
                <span className="expand-icon">{expandedId === update.id ? '▼' : '▶'}</span>
              </div>

              {expandedId === update.id && (
                <div className="update-details">
                  <h4>التغييرات:</h4>
                  <ul>
                    {update.changes.map((change, idx) => (
                      <li key={idx}>{change}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {updates.length === 0 && (
        <div className="no-updates">
          <p>لا توجد تحديثات حالياً</p>
        </div>
      )}
    </div>
  );
};

export default Updates;
