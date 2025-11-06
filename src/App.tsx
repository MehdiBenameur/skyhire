// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { authService } from './services/authService';
import Dashboard from './pages/Dashboard';
import CVPage from './pages/CVPage';
import InterviewPage from './pages/InterviewPage';
import JobsPage from './pages/JobsPage';
import NetworkPage from './pages/NetworkPage';
import CareerPage from './pages/CareerPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Layout from './components/Layout';

// Composant pour protéger les routes
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const currentUser = authService.getCurrentUser();
  return currentUser ? <Layout>{children}</Layout> : <Navigate to="/login" />;
};

// Composant pour les routes publiques (quand déjà connecté)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const currentUser = authService.getCurrentUser();
  return !currentUser ? <>{children}</> : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes publiques */}
        <Route path="/login" element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        } />
        <Route path="/signup" element={
          <PublicRoute>
            <SignUpPage />
          </PublicRoute>
       } />

        {/* Routes protégées */}
        <Route path="/" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/cv" element={
          <ProtectedRoute>
            <CVPage />
          </ProtectedRoute>
        } />
        <Route path="/interview" element={
          <ProtectedRoute>
            <InterviewPage />
          </ProtectedRoute>
        } />
        <Route path="/jobs" element={
          <ProtectedRoute>
            <JobsPage />
          </ProtectedRoute>
        } />
        <Route path="/network" element={
          <ProtectedRoute>
            <NetworkPage />
          </ProtectedRoute>
        } />
        <Route path="/career" element={
          <ProtectedRoute>
            <CareerPage />
          </ProtectedRoute>
        } />

        {/* Redirection par défaut */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;