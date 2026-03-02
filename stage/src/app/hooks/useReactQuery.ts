import { useQuery, useMutation, useQueryClient, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { authService, studentService, companyService, internshipService, applicationService } from '../services';
import { 
  User, 
  LoginCredentials, 
  RegisterData, 
  AuthResponse,
  StudentProfile,
  StudentProfileForm,
  CompanyProfile,
  CompanyProfileForm,
  Internship,
  InternshipForm,
  Application,
  ApplicationForm,
  ApiResponse
} from '../../types';

// Query keys for React Query
export const queryKeys = {
  auth: ['auth'] as const,
  user: ['user'] as const,
  student: {
    profile: ['student', 'profile'] as const,
    applications: ['student', 'applications'] as const,
    application: (id: string) => ['student', 'application', id] as const,
  },
  company: {
    profile: ['company', 'profile'] as const,
    applications: ['company', 'applications'] as const,
    application: (id: string) => ['company', 'application', id] as const,
    stats: ['company', 'stats'] as const,
  },
  internships: {
    all: ['internships'] as const,
    featured: ['internships', 'featured'] as const,
    search: (query: string) => ['internships', 'search', query] as const,
    detail: (id: string) => ['internships', id] as const,
  },
  applications: {
    all: ['applications'] as const,
    student: ['applications', 'student'] as const,
    company: ['applications', 'company'] as const,
    detail: (id: string) => ['applications', id] as const,
  },
};

// Auth hooks with React Query
export const useAuthQuery = () => {
  const queryClient = useQueryClient();
  
  const loginMutation = useMutation<AuthResponse, Error, LoginCredentials>({
    mutationFn: (credentials) => authService.login(credentials).then((res: ApiResponse<AuthResponse>) => res.data!),
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      queryClient.setQueryData(queryKeys.user, data.user);
    },
  });

  const registerMutation = useMutation<AuthResponse, Error, RegisterData>({
    mutationFn: (userData) => authService.register(userData).then((res: ApiResponse<AuthResponse>) => res.data!),
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      queryClient.setQueryData(queryKeys.user, data.user);
    },
  });

  const logoutMutation = useMutation<void, Error, void>({
    mutationFn: () => authService.logout().then((res: ApiResponse<void>) => res.data!),
    onSuccess: () => {
      localStorage.removeItem('token');
      queryClient.clear();
    },
  });

  const userQuery = useQuery<User, Error>({
    queryKey: queryKeys.user,
    queryFn: () => authService.getCurrentUser().then((res: ApiResponse<User>) => res.data!),
    enabled: !!localStorage.getItem('token'),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    loginMutation,
    registerMutation,
    logoutMutation,
    userQuery,
  };
};

// Student hooks with React Query
export const useStudentProfileQuery = (enabled = true) => {
  return useQuery<StudentProfile, Error>({
    queryKey: queryKeys.student.profile,
    queryFn: () => studentService.getProfile().then((res: ApiResponse<StudentProfile>) => res.data!),
    enabled,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useCreateStudentProfileMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation<StudentProfile, Error, StudentProfileForm>({
    mutationFn: (profileData) => studentService.createProfile(profileData).then((res: ApiResponse<StudentProfile>) => res.data!),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.student.profile, data);
    },
  });
};

export const useUpdateStudentProfileMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation<StudentProfile, Error, Partial<StudentProfileForm>>({
    mutationFn: (profileData) => studentService.updateProfile(profileData).then((res: ApiResponse<StudentProfile>) => res.data!),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.student.profile, data);
    },
  });
};

export const useStudentApplicationsQuery = (page = 1, limit = 10) => {
  return useQuery<{ applications: Application[]; total: number; pages: number }, Error>({
    queryKey: [...queryKeys.student.applications, page, limit],
    queryFn: () => studentService.getApplications(page, limit).then((res: ApiResponse<{ applications: Application[]; total: number; pages: number }>) => res.data!),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Company hooks with React Query
export const useCompanyProfileQuery = (enabled = true) => {
  return useQuery<CompanyProfile, Error>({
    queryKey: queryKeys.company.profile,
    queryFn: () => companyService.getProfile().then((res: ApiResponse<CompanyProfile>) => res.data!),
    enabled,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useCreateCompanyProfileMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation<CompanyProfile, Error, CompanyProfileForm>({
    mutationFn: (profileData) => companyService.createProfile(profileData).then((res: ApiResponse<CompanyProfile>) => res.data!),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.company.profile, data);
    },
  });
};

export const useUpdateCompanyProfileMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation<CompanyProfile, Error, Partial<CompanyProfileForm>>({
    mutationFn: (profileData) => companyService.updateProfile(profileData).then((res: ApiResponse<CompanyProfile>) => res.data!),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.company.profile, data);
    },
  });
};

export const useCompanyApplicationsQuery = (page = 1, limit = 10) => {
  return useQuery<{ applications: Application[]; total: number; pages: number }, Error>({
    queryKey: [...queryKeys.company.applications, page, limit],
    queryFn: () => applicationService.getCompanyApplications(page, limit).then((res: ApiResponse<{ applications: Application[]; total: number; pages: number }>) => res.data!),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Internship hooks with React Query
export const useInternshipsQuery = (page = 1, limit = 10, filters?: any) => {
  return useQuery<{ internships: Internship[]; total: number; pages: number }, Error>({
    queryKey: [...queryKeys.internships.all, page, limit, filters],
    queryFn: () => internshipService.getInternships(page, limit, filters).then((res: ApiResponse<{ internships: Internship[]; total: number; pages: number }>) => res.data!),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useFeaturedInternshipsQuery = () => {
  return useQuery<Internship[], Error>({
    queryKey: queryKeys.internships.featured,
    queryFn: () => internshipService.getFeaturedInternships().then((res: ApiResponse<Internship[]>) => res.data!),
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
};

export const useInternshipQuery = (id: string, enabled = true) => {
  return useQuery<Internship, Error>({
    queryKey: queryKeys.internships.detail(id),
    queryFn: () => internshipService.getInternshipById(id).then((res: ApiResponse<Internship>) => res.data!),
    enabled: enabled && !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useCreateInternshipMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation<Internship, Error, InternshipForm>({
    mutationFn: (internshipData) => internshipService.createInternship(internshipData).then((res: ApiResponse<Internship>) => res.data!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.internships.all });
    },
  });
};

export const useUpdateInternshipMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation<Internship, Error, { id: string; data: Partial<InternshipForm> }>({
    mutationFn: ({ id, data }) => internshipService.updateInternship(id, data).then((res: ApiResponse<Internship>) => res.data!),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(queryKeys.internships.detail(variables.id), data);
      queryClient.invalidateQueries({ queryKey: queryKeys.internships.all });
    },
  });
};

// Application hooks with React Query
export const useApplicationQuery = (id: string, enabled = true) => {
  return useQuery<Application, Error>({
    queryKey: queryKeys.applications.detail(id),
    queryFn: () => applicationService.getApplicationById(id).then((res: ApiResponse<Application>) => res.data!),
    enabled: enabled && !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCreateApplicationMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation<Application, Error, { data: ApplicationForm; internshipId: string }>({
    mutationFn: ({ data, internshipId }) => 
      applicationService.createApplication(data, internshipId).then((res: ApiResponse<Application>) => res.data!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.student.applications });
      queryClient.invalidateQueries({ queryKey: queryKeys.company.applications });
    },
  });
};

export const useUpdateApplicationStatusMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation<Application, Error, { id: string; status: string }>({
    mutationFn: ({ id, status }) => 
      applicationService.updateApplicationStatus(id, status).then((res: ApiResponse<Application>) => res.data!),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(queryKeys.applications.detail(variables.id), data);
      queryClient.invalidateQueries({ queryKey: queryKeys.student.applications });
      queryClient.invalidateQueries({ queryKey: queryKeys.company.applications });
    },
  });
};
