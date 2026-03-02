import { useEffect } from 'react';
import { useAuthStore } from '../store';

export const useAuth = () => {
  const {
    user,
    token,
    isLoading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
    getCurrentUser,
    updateUser,
    changePassword,
    deleteAccount,
    clearError,
    setLoading,
  } = useAuthStore();

  // Check authentication on mount
  useEffect(() => {
    if (token && !user) {
      getCurrentUser();
    }
  }, [token, user, getCurrentUser]);

  return {
    user,
    token,
    isLoading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
    getCurrentUser,
    updateUser,
    changePassword,
    deleteAccount,
    clearError,
    setLoading,
  };
};
