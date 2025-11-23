import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/DetailPages.css';

const AgentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/agents/${id}`)
      .then(res => res.json())
      .then(data => {
        setAgent(data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, [id]);

  if (loading) return <div className="loading">جاري التحميل...</div>;
  if (!agent) return <div className="error">الوكيل غير موجود</div>;

  return (
    <div className="detail-container">
      <button className="back-btn" onClick={() => navigate('/')}>← العودة</button>
      
      <div className="detail-header">
        <div className="detail-icon">{agent.icon}</div>
        <h1>{agent.name}</h1>
        <p className="detail-category">{agent.category}</p>
      </div>

      <div className="detail-content">
        <section className="detail-section">
          <h2>الوصف</h2>
          <p>{agent.description}</p>
        </section>

        <section className="detail-section">
          <h2>الإمكانيات</h2>
          <div className="capabilities">
            {agent.capabilities.map((cap, idx) => (
              <div key={idx} className="capability-badge">{cap}</div>
            ))}
          </div>
        </section>

        <section className="detail-section">
          <h2>الميزات</h2>
          <ul className="features-list">
            {agent.features?.map((feature, idx) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul>
        </section>

        <section className="detail-section">
          <h2>كيفية الاستخدام</h2>
          <div className="usage-guide">
            {agent.usageGuide?.map((step, idx) => (
              <div key={idx} className="usage-step">
                <span className="step-number">{idx + 1}</span>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="detail-section">
          <h2>الأمثلة</h2>
          <div className="examples">
            {agent.examples?.map((example, idx) => (
              <div key={idx} className="example-card">
                <p><strong>المثال:</strong> {example}</p>
              </div>
            ))}
          </div>
        </section>

        <button className="cta-btn">استخدم الآن</button>
      </div>
    </div>
  );
};

export default AgentDetail;
