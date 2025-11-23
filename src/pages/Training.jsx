import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Training.css';

const Training = () => {
  const navigate = useNavigate();
  const [trainings, setTrainings] = useState([]);
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [progress, setProgress] = useState({});

  useEffect(() => {
    fetch('/api/trainings')
      .then(res => res.json())
      .then(data => setTrainings(data))
      .catch(err => console.error(err));
  }, []);

  const handleStartTraining = (trainingId) => {
    setSelectedTraining(trainingId);
    setProgress(prev => ({
      ...prev,
      [trainingId]: (prev[trainingId] || 0) + 1
    }));
  };

  const handleCompleteTraining = (trainingId) => {
    setProgress(prev => ({
      ...prev,
      [trainingId]: 100
    }));
    setTimeout(() => {
      setSelectedTraining(null);
    }, 1000);
  };

  return (
    <div className="training-container">
      <button className="back-btn" onClick={() => navigate('/')}>← العودة</button>
      
      <div className="training-header">
        <h1>📚 برنامج التدريب الشامل</h1>
        <p>تعلم كيفية استخدام جميع الأدوات والوكلاء بكفاءة</p>
      </div>

      <div className="training-grid">
        {trainings.map(training => (
          <div key={training.id} className="training-card">
            <div className="training-level">{training.level}</div>
            <h3>{training.title}</h3>
            <p>{training.description}</p>
            
            <div className="training-meta">
              <span className="duration">⏱️ {training.duration} دقيقة</span>
              <span className="type">{training.type}</span>
            </div>

            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progress[training.id] || 0}%` }}
              ></div>
            </div>

            <button 
              className="training-btn"
              onClick={() => handleStartTraining(training.id)}
              disabled={selectedTraining === training.id}
            >
              {progress[training.id] === 100 ? '✓ مكتمل' : 'ابدأ التدريب'}
            </button>

            {selectedTraining === training.id && (
              <div className="training-content">
                <div className="content-body">
                  <p>{training.content}</p>
                  {training.videoUrl && (
                    <iframe 
                      src={training.videoUrl}
                      title={training.title}
                      className="training-video"
                      allowFullScreen
                    ></iframe>
                  )}
                </div>
                <button 
                  className="complete-btn"
                  onClick={() => handleCompleteTraining(training.id)}
                >
                  إنهاء الدرس
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Training;
