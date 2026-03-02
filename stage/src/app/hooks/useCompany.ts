import { useEffect } from 'react';
import { useCompanyStore } from '../store';
import { useAuth } from './useAuth';

export const useCompany = () => {
  const { user, isAuthenticated } = useAuth();
  const {
    profile,
    isLoading,
    error,
    getProfile,
    createProfile,
    updateProfile,
    deleteProfile,
    uploadLogo,
    searchCompanies,
    clearError,
    setLoading,
    resetStore,
  } = useCompanyStore();

  // Auto-load profile when authenticated as company
  useEffect(() => {
    if (isAuthenticated && user?.role === 'company' && !profile) {
      getProfile();
    }
  }, [isAuthenticated, user?.role, profile, getProfile]);

  // Reset store when user logs out
  useEffect(() => {
    if (!isAuthenticated) {
      resetStore();
    }
  }, [isAuthenticated, resetStore]);

  return {
    profile,
    isLoading,
    error,
    getProfile,
    createProfile,
    updateProfile,
    deleteProfile,
    uploadLogo,
    searchCompanies,
    clearError,
    setLoading,
    resetStore,
  };
};
