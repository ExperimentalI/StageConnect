import { useEffect } from 'react';
import { useInternshipStore } from '../store';
import { useAuth } from './useAuth';

export const useInternship = () => {
  const { user, isAuthenticated } = useAuth();
  const {
    internships,
    featuredInternships,
    currentInternship,
    isLoading,
    error,
    pagination,
    filters,
    getInternships,
    getFeaturedInternships,
    searchInternships,
    getInternshipById,
    createInternship,
    updateInternship,
    deleteInternship,
    updateInternshipStatus,
    clearError,
    setLoading,
    setFilters,
    resetStore,
  } = useInternshipStore();

  // Auto-load featured internships on mount
  useEffect(() => {
    if (featuredInternships.length === 0) {
      getFeaturedInternships();
    }
  }, [featuredInternships.length, getFeaturedInternships]);

  // Auto-load internships for companies
  useEffect(() => {
    if (isAuthenticated && user?.role === 'company' && internships.length === 0) {
      getInternships();
    }
  }, [isAuthenticated, user?.role, internships.length, getInternships]);

  // Reset store when user logs out
  useEffect(() => {
    if (!isAuthenticated) {
      resetStore();
    }
  }, [isAuthenticated, resetStore]);

  return {
    internships,
    featuredInternships,
    currentInternship,
    isLoading,
    error,
    pagination,
    filters,
    getInternships,
    getFeaturedInternships,
    searchInternships,
    getInternshipById,
    createInternship,
    updateInternship,
    deleteInternship,
    updateInternshipStatus,
    clearError,
    setLoading,
    setFilters,
    resetStore,
  };
};
