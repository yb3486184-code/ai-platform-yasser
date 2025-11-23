import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import AgentDetail from './pages/AgentDetail';
import ToolDetail from './pages/ToolDetail';
import Training from './pages/Training';
import Updates from './pages/Updates';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/agent/:id" element={<AgentDetail />} />
        <Route path="/tool/:id" element={<ToolDetail />} />
        <Route path="/training" element={<Training />} />
        <Route path="/updates" element={<Updates />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
