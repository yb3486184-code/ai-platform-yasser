import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/DetailPages.css';

const ToolDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tool, setTool] = useState(null);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  useEffect(() => {
    fetch(`/api/tools/${id}`)
      .then(res => res.json())
      .then(data => {
        setTool(data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleExecute = async () => {
    try {
      const response = await fetch(`/api/tools/${id}/execute`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input })
      });
      const result = await response.json();
      setOutput(result.output);
    } catch (err) {
      setOutput('حدث خطأ في تنفيذ الأداة');
    }
  };

  if (loading) return <div className="loading">جاري التحميل...</div>;
  if (!tool) return <div className="error">الأداة غير موجودة</div>;

  return (
    <div className="detail-container">
      <button className="back-btn" onClick={() => navigate('/')}>← العودة</button>
      
      <div className="detail-header">
        <div className="detail-icon">{tool.icon}</div>
        <h1>{tool.name}</h1>
        <p className="detail-category">{tool.category}</p>
      </div>

      <div className="detail-content">
        <section className="detail-section">
          <h2>الوصف</h2>
          <p>{tool.description}</p>
        </section>

        <section className="detail-section">
          <h2>المميزات</h2>
          <ul className="features-list">
            {tool.features?.map((feature, idx) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul>
        </section>

        <section className="detail-section">
          <h2>جرب الأداة</h2>
          <div className="tool-tester">
            <textarea
              className="tool-input"
              placeholder="أدخل المدخلات هنا..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className="execute-btn" onClick={handleExecute}>تنفيذ</button>
            {output && (
              <div className="tool-output">
                <h3>النتيجة:</h3>
                <p>{output}</p>
              </div>
            )}
          </div>
        </section>

        <section className="detail-section">
          <h2>الأمثلة</h2>
          <div className="examples">
            {tool.examples?.map((example, idx) => (
              <div key={idx} className="example-card">
                <p><strong>المثال:</strong> {example}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ToolDetail;
