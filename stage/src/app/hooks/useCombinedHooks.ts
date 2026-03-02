import { useEffect } from 'react';
import { useAuthQuery } from './useReactQuery';
import { useStudentProfileQuery, useStudentApplicationsQuery } from './useReactQuery';
import { useCompanyProfileQuery, useCompanyApplicationsQuery } from './useReactQuery';
import { useFeaturedInternshipsQuery } from './useReactQuery';

// Combined hook that uses both Zustand and React Query
export const useCombinedAuth = () => {
  const zustandAuth = useAuthQuery();
  
  return {
    ...zustandAuth,
    // Additional React Query specific methods
    invalidateUser: () => {
      // This would be implemented with queryClient.invalidateQueries
    },
  };
};

export const useCombinedStudent = () => {
  const { userQuery } = useAuthQuery();
  const profileQuery = useStudentProfileQuery(userQuery.data?.role === 'student');
  const applicationsQuery = useStudentApplicationsQuery();

  return {
    profile: profileQuery.data,
    applications: applicationsQuery.data?.applications || [],
    isLoading: profileQuery.isLoading || applicationsQuery.isLoading,
    error: profileQuery.error || applicationsQuery.error,
    pagination: {
      page: applicationsQuery.data?.total || 0,
      limit: 10,
      total: applicationsQuery.data?.total || 0,
      pages: applicationsQuery.data?.pages || 0,
    },
    refetchProfile: profileQuery.refetch,
    refetchApplications: applicationsQuery.refetch,
  };
};

export const useCombinedCompany = () => {
  const { userQuery } = useAuthQuery();
  const profileQuery = useCompanyProfileQuery(userQuery.data?.role === 'company');
  const applicationsQuery = useCompanyApplicationsQuery();

  return {
    profile: profileQuery.data,
    applications: applicationsQuery.data?.applications || [],
    isLoading: profileQuery.isLoading || applicationsQuery.isLoading,
    error: profileQuery.error || applicationsQuery.error,
    pagination: {
      page: applicationsQuery.data?.total || 0,
      limit: 10,
      total: applicationsQuery.data?.total || 0,
      pages: applicationsQuery.data?.pages || 0,
    },
    refetchProfile: profileQuery.refetch,
    refetchApplications: applicationsQuery.refetch,
  };
};

export const useCombinedInternships = () => {
  const featuredQuery = useFeaturedInternshipsQuery();

  return {
    featuredInternships: featuredQuery.data || [],
    isLoading: featuredQuery.isLoading,
    error: featuredQuery.error,
    refetchFeatured: featuredQuery.refetch,
  };
};
