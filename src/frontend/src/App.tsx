import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginForm } from './components/auth/LoginForm';
import { RegisterForm } from './components/auth/RegisterForm';
import { DatasetList } from './components/dataset/DatasetList';
import { CreateDatasetForm } from './components/dataset/CreateDatasetForm';
import { useAuth } from './hooks/useAuth';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? <>{children}</> : <Navigate to="/dashboard" />;
};

export const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <div className="min-h-screen flex items-center justify-center">
                  <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
                    <h2 className="text-center text-3xl font-extrabold text-gray-900">
                      Sign in to your account
                    </h2>
                    <LoginForm />
                  </div>
                </div>
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <div className="min-h-screen flex items-center justify-center">
                  <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
                    <h2 className="text-center text-3xl font-extrabold text-gray-900">
                      Create your account
                    </h2>
                    <RegisterForm />
                  </div>
                </div>
              </PublicRoute>
            }
          />

          {/* Private Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                  <div className="px-4 py-6 sm:px-0">
                    <h1 className="text-2xl font-semibold text-gray-900">My Datasets</h1>
                    <div className="mt-8">
                      <DatasetList />
                    </div>
                  </div>
                </div>
              </PrivateRoute>
            }
          />
          <Route
            path="/datasets/create"
            element={
              <PrivateRoute>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                  <div className="px-4 py-6 sm:px-0">
                    <h1 className="text-2xl font-semibold text-gray-900">Create Dataset</h1>
                    <div className="mt-8">
                      <CreateDatasetForm />
                    </div>
                  </div>
                </div>
              </PrivateRoute>
            }
          />

          {/* Default Route */}
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </Router>
  );
}; 