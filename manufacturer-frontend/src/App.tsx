import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';

const ComingSoon = ({ title }: { title: string }) => (
  <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
    <h2 className="text-2xl font-bold text-[var(--color-text-ink)] mb-2">{title}</h2>
    <p className="text-[var(--color-text-slate)]">This feature is currently under development.</p>
  </div>
);

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<ComingSoon title="Products Registry" />} />
          <Route path="batches" element={<ComingSoon title="Batch Generation" />} />
          <Route path="certifications" element={<ComingSoon title="Certifications" />} />
          <Route path="recalls" element={<ComingSoon title="Recalls Management" />} />
          <Route path="compliance" element={<ComingSoon title="Compliance Navigator" />} />
          <Route path="analytics" element={<ComingSoon title="Analytics" />} />
          <Route path="feedback" element={<ComingSoon title="Customer Feedback" />} />
          <Route path="team" element={<ComingSoon title="Team Management" />} />
          <Route path="settings" element={<ComingSoon title="Settings" />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
