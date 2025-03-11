import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
}

export const useAuth = () => {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState<AuthState>(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('accessToken');
    return {
      user: storedUser ? JSON.parse(storedUser) : null,
      accessToken: storedToken,
      isAuthenticated: !!storedToken && !!storedUser
    };
  });

  useEffect(() => {
    // Check if token exists on mount
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setAuthState(prev => ({ ...prev, isAuthenticated: false }));
    }
  }, []);

  const setAuth = useCallback((data: AuthResponse) => {
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    setAuthState({
      user: data.user,
      accessToken: data.accessToken,
      isAuthenticated: true
    });
  }, []);

  const clearAuth = useCallback(() => {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setAuthState({
      user: null,
      accessToken: null,
      isAuthenticated: false
    });
  }, []);

  const login = useCallback(async (credentials: LoginRequest) => {
    try {
      // For demo purposes, we'll use hardcoded credentials
      if (credentials.email === 'admin@aidataset.com' && credentials.password === 'Admin123!') {
        const mockResponse: AuthResponse = {
          user: {
            id: '1',
            email: credentials.email,
            name: 'Admin User'
          },
          accessToken: 'mock-token-' + Date.now(),
          refreshToken: 'mock-refresh-token-' + Date.now()
        };
        setAuth(mockResponse);
        return mockResponse;
      }
      throw new Error('Invalid credentials. Try admin@aidataset.com / Admin123!');
    } catch (error) {
      clearAuth();
      throw error;
    }
  }, [setAuth, clearAuth]);

  const logout = useCallback(() => {
    clearAuth();
    navigate('/login');
  }, [clearAuth, navigate]);

  return {
    user: authState.user,
    accessToken: authState.accessToken,
    isAuthenticated: authState.isAuthenticated,
    login,
    logout
  };
}; 