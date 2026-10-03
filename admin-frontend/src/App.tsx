import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Products } from './pages/Products';
import { Batches } from './pages/Batches';
import { Recalls } from './pages/Recalls';
import { Complaints } from './pages/Complaints';
import { Manufacturers } from './pages/Manufacturers';
import { Labs } from './pages/Labs';
import { Fraud } from './pages/Fraud';
import { Settings } from './pages/Settings';
import './App.css';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('admin_token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <Router basename="/admin">
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="batches" element={<Batches />} />
          <Route path="recalls" element={<Recalls />} />
          <Route path="complaints" element={<Complaints />} />
          <Route path="manufacturers" element={<Manufacturers />} />
          <Route path="labs" element={<Labs />} />
          <Route path="fraud" element={<Fraud />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
