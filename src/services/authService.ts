// services/authService.ts

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'candidate' | 'recruiter';
  createdAt: Date;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Simulation d'authentification - À remplacer par de vraies APIs plus tard
export const authService = {
  // Login utilisateur
  async login(email: string, password: string): Promise<AuthResponse> {
    // Simulation délai API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Validation basique
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    if (!email.includes('@')) {
      throw new Error('Invalid email format');
    }

    // Simulation utilisateur (en production, vérifier contre la base de données)
    const user: User = {
      id: '1',
      email: email,
      name: email.split('@')[0],
      role: 'candidate',
      createdAt: new Date()
    };

    const token = 'mock_jwt_token_' + Date.now();

    // Sauvegarder dans localStorage pour la persistance
    localStorage.setItem('auth_token', token);
    localStorage.setItem('user', JSON.stringify(user));

    return { user, token };
  },

  // Inscription nouvel utilisateur
  async signUp(email: string, password: string, name: string): Promise<AuthResponse> {
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (!email || !password || !name) {
      throw new Error('All fields are required');
    }

    if (!email.includes('@')) {
      throw new Error('Invalid email format');
    }

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }

    const user: User = {
      id: Date.now().toString(),
      email: email,
      name: name,
      role: 'candidate',
      createdAt: new Date()
    };

    const token = 'mock_jwt_token_' + Date.now();

    localStorage.setItem('auth_token', token);
    localStorage.setItem('user', JSON.stringify(user));

    return { user, token };
  },

  // Déconnexion
  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  },

  // Vérifier si l'utilisateur est connecté
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Vérifier le token
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }
};