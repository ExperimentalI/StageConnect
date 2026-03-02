import { useEffect } from 'react';
import { useApplicationStore } from '../store';
import { useAuth } from './useAuth';

export const useApplication = () => {
  const { user, isAuthenticated } = useAuth();
  const {
    applications,
    currentApplication,
    studentApplications,
    companyApplications,
    stats,
    isLoading,
    error,
    pagination,
    createApplication,
    getStudentApplications,
    getCompanyApplications,
    getApplicationById,
    getApplicationStats,
    updateApplicationStatus,
    scheduleInterview,
    withdrawApplication,
    clearError,
    setLoading,
    resetStore,
  } = useApplicationStore();

  // Auto-load student applications when authenticated as student
  useEffect(() => {
    if (isAuthenticated && user?.role === 'student' && studentApplications.length === 0) {
      getStudentApplications();
    }
  }, [isAuthenticated, user?.role, studentApplications.length, getStudentApplications]);

  // Auto-load company applications when authenticated as company
  useEffect(() => {
    if (isAuthenticated && user?.role === 'company' && companyApplications.length === 0) {
      getCompanyApplications();
    }
  }, [isAuthenticated, user?.role, companyApplications.length, getCompanyApplications]);

  // Auto-load stats for companies
  useEffect(() => {
    if (isAuthenticated && user?.role === 'company' && !stats) {
      getApplicationStats();
    }
  }, [isAuthenticated, user?.role, stats, getApplicationStats]);

  // Reset store when user logs out
  useEffect(() => {
    if (!isAuthenticated) {
      resetStore();
    }
  }, [isAuthenticated, resetStore]);

  return {
    applications,
    currentApplication,
    studentApplications,
    companyApplications,
    stats,
    isLoading,
    error,
    pagination,
    createApplication,
    getStudentApplications,
    getCompanyApplications,
    getApplicationById,
    getApplicationStats,
    updateApplicationStatus,
    scheduleInterview,
    withdrawApplication,
    clearError,
    setLoading,
    resetStore,
  };
};
