'use client';
import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { User, AuthState } from '@/types';

interface AuthContextType extends AuthState {
  login: (token: string, user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null, token: null, isAuthenticated: false, isAdmin: false,
  login: () => {}, logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null, token: null, isAuthenticated: false, isAdmin: false,
  });

  useEffect(() => {
    const token = localStorage.getItem('barna_token');
    const userStr = localStorage.getItem('barna_user');
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr) as User;
        setState({ user, token, isAuthenticated: true, isAdmin: user.role === 'admin' });
      } catch {}
    }
  }, []);

  const login = useCallback((token: string, user: User) => {
    localStorage.setItem('barna_token', token);
    localStorage.setItem('barna_user', JSON.stringify(user));
    setState({ user, token, isAuthenticated: true, isAdmin: user.role === 'admin' });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('barna_token');
    localStorage.removeItem('barna_user');
    setState({ user: null, token: null, isAuthenticated: false, isAdmin: false });
  }, []);

  return <AuthContext.Provider value={{ ...state, login, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
