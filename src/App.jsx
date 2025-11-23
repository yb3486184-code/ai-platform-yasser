import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import AgentsSection from './components/AgentsSection';
import ToolsSection from './components/ToolsSection';
import TrainingSection from './components/TrainingSection';
import UpdatesSection from './components/UpdatesSection';
import Footer from './components/Footer';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('ar');
  const [agents, setAgents] = useState([]);
  const [tools, setTools] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    // Fetch data from server
    const fetchData = async () => {
      try {
        const [agentsRes, toolsRes, statsRes] = await Promise.all([
          fetch('http://localhost:5000/api/agents'),
          fetch('http://localhost:5000/api/tools'),
          fetch('http://localhost:5000/api/stats')
        ]);

        if (agentsRes.ok) setAgents(await agentsRes.json());
        if (toolsRes.ok) setTools(await toolsRes.json());
        if (statsRes.ok) setStats(await statsRes.json());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Apply dark mode
    if (darkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }, [darkMode]);

  useEffect(() => {
    // Apply language direction
    if (language === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'en';
    }
  }, [language]);

  const translations = {
    ar: {
      home: 'الرئيسية',
      agents: 'الوكلاء',
      tools: 'الأدوات',
      training: 'التدريب',
      updates: 'التحديثات',
      contact: 'اتصل بنا',
      darkMode: 'الوضع الليلي',
      language: 'اللغة',
      welcome: 'مرحباً بك في منصة الحاج ياسر',
      subtitle: 'منصة ذكاء اصطناعي متقدمة مع 50 أداة و25 وكيل متخصص',
      getStarted: 'ابدأ الآن',
      developerCredit: 'من تطوير الحاج ياسر'
    },
    en: {
      home: 'Home',
      agents: 'Agents',
      tools: 'Tools',
      training: 'Training',
      updates: 'Updates',
      contact: 'Contact',
      darkMode: 'Dark Mode',
      language: 'Language',
      welcome: 'Welcome to Al-Hajj Yasser Platform',
      subtitle: 'Advanced AI Platform with 50 Tools and 25 Specialized Agents',
      getStarted: 'Get Started',
      developerCredit: 'Developed by Al-Hajj Yasser'
    }
  };

  const t = translations[language];

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <Header 
        darkMode={darkMode} 
        setDarkMode={setDarkMode}
        language={language}
        setLanguage={setLanguage}
        t={t}
      />
      
      <main>
        <Hero t={t} stats={stats} />
        
        <AgentsSection agents={agents} t={t} language={language} />
        
        <ToolsSection tools={tools} t={t} language={language} />
        
        <TrainingSection t={t} />
        
        <UpdatesSection t={t} />
      </main>

      <Footer t={t} />
    </div>
  );
}

export default App;
