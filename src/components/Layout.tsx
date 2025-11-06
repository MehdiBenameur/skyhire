// components/Layout.tsx
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { authService } from '../services/authService';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());

  // Écouter les changements d'authentification
  useEffect(() => {
    const checkAuth = () => {
      setCurrentUser(authService.getCurrentUser());
    };

    // Vérifier périodiquement (pour les onglets multiples)
    const interval = setInterval(checkAuth, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Si l'utilisateur n'est pas connecté, rediriger vers login
  if (!currentUser) {
    return <>{children}</>;
  }

  // Utilisateur connecté - Afficher le layout complet
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;