import { useEffect } from 'react';
import { useStudentStore } from '../store';
import { useAuth } from './useAuth';

export const useStudent = () => {
  const { user, isAuthenticated } = useAuth();
  const {
    profile,
    applications,
    isLoading,
    error,
    pagination,
    getProfile,
    createProfile,
    updateProfile,
    deleteProfile,
    uploadCV,
    uploadProfilePicture,
    getApplications,
    getApplicationById,
    withdrawApplication,
    clearError,
    setLoading,
    resetStore,
  } = useStudentStore();

  // Auto-load profile when authenticated as student
  useEffect(() => {
    if (isAuthenticated && user?.role === 'student' && !profile) {
      getProfile();
    }
  }, [isAuthenticated, user?.role, profile, getProfile]);

  // Auto-load applications when authenticated as student
  useEffect(() => {
    if (isAuthenticated && user?.role === 'student' && applications.length === 0) {
      getApplications();
    }
  }, [isAuthenticated, user?.role, applications.length, getApplications]);

  // Reset store when user logs out
  useEffect(() => {
    if (!isAuthenticated) {
      resetStore();
    }
  }, [isAuthenticated, resetStore]);

  return {
    profile,
    applications,
    isLoading,
    error,
    pagination,
    getProfile,
    createProfile,
    updateProfile,
    deleteProfile,
    uploadCV,
    uploadProfilePicture,
    getApplications,
    getApplicationById,
    withdrawApplication,
    clearError,
    setLoading,
    resetStore,
  };
};
