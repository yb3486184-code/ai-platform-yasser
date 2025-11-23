import React from 'react';
import '../styles/Footer.css';

export default function Footer({ t }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>🤖 الحاج ياسر</h3>
            <p>منصة ذكاء اصطناعي متقدمة مفتوحة المصدر ومجانية</p>
          </div>

          <div className="footer-section">
            <h4>الروابط السريعة</h4>
            <ul>
              <li><a href="#home">{t.home}</a></li>
              <li><a href="#agents">{t.agents}</a></li>
              <li><a href="#tools">{t.tools}</a></li>
              <li><a href="#training">{t.training}</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>تابعنا</h4>
            <div className="social-links">
              <a href="#" className="social-link">GitHub</a>
              <a href="#" className="social-link">Twitter</a>
              <a href="#" className="social-link">LinkedIn</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2024 {t.developerCredit}</p>
          <p>منصة مفتوحة المصدر | مجانية بالكامل</p>
        </div>
      </div>
    </footer>
  );
}
