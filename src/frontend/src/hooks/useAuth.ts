import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginRequest, RegisterRequest, AuthResponse, User } from '@ai-dataset-generator/shared';
import { api } from '../services/api';

interface AuthState {
  user: User | null;
  accessToken: string | null;
}

export const useAuth = () => {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState<AuthState>(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('accessToken');
    return {
      user: storedUser ? JSON.parse(storedUser) : null,
      accessToken: storedToken,
    };
  });

  const setAuth = useCallback((data: AuthResponse) => {
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    setAuthState({
      user: data.user,
      accessToken: data.accessToken,
    });
  }, []);

  const clearAuth = useCallback(() => {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setAuthState({
      user: null,
      accessToken: null,
    });
  }, []);

  const login = useCallback(async (data: LoginRequest) => {
    const response = await api.post<AuthResponse>('/auth/login', data);
    setAuth(response.data);
    navigate('/dashboard');
  }, [navigate, setAuth]);

  const register = useCallback(async (data: RegisterRequest) => {
    const response = await api.post<AuthResponse>('/auth/register', data);
    setAuth(response.data);
    navigate('/dashboard');
  }, [navigate, setAuth]);

  const logout = useCallback(() => {
    clearAuth();
    navigate('/login');
  }, [clearAuth, navigate]);

  const refreshToken = useCallback(async () => {
    const storedRefreshToken = localStorage.getItem('refreshToken');
    if (!storedRefreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const response = await api.post<{ accessToken: string }>('/auth/refresh-token', {
        refreshToken: storedRefreshToken,
      });

      localStorage.setItem('accessToken', response.data.accessToken);
      setAuthState((prev) => ({
        ...prev,
        accessToken: response.data.accessToken,
      }));

      return response.data.accessToken;
    } catch (error) {
      clearAuth();
      throw error;
    }
  }, [clearAuth]);

  return {
    user: authState.user,
    accessToken: authState.accessToken,
    isAuthenticated: !!authState.user,
    login,
    register,
    logout,
    refreshToken,
  };
}; 