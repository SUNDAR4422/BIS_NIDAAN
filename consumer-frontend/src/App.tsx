import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { VerificationDashboard } from './pages/VerificationDashboard';
import { ProductResult } from './pages/ProductResult';
import { Grievances } from './pages/Grievances';
import { Chatbot } from './pages/Chatbot';
import { LabFinder } from './pages/LabFinder';

const App = () => {
  return (
    <Router basename="/consumer">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<VerificationDashboard />} />
          <Route path="verify/:batchId" element={<ProductResult />} />
          <Route path="grievances" element={<Grievances />} />
          <Route path="chatbot" element={<Chatbot />} />
          <Route path="labs" element={<LabFinder />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
