import { create } from 'zustand';
import { Application, ApplicationForm } from '../../types';
import { applicationService } from '../../services/api';

interface ApplicationState {
  applications: Application[];
  currentApplication: Application | null;
  studentApplications: Application[];
  companyApplications: Application[];
  stats: any;
  isLoading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

interface ApplicationActions {
  // Create application
  createApplication: (applicationData: ApplicationForm, internshipId: string) => Promise<boolean>;
  
  // Get applications
  getStudentApplications: (page?: number, limit?: number) => Promise<void>;
  getCompanyApplications: (page?: number, limit?: number) => Promise<void>;
  getApplicationById: (id: string) => Promise<void>;
  getApplicationStats: () => Promise<void>;
  
  // Company actions
  updateApplicationStatus: (id: string, status: string) => Promise<boolean>;
  scheduleInterview: (id: string, interviewData: any) => Promise<boolean>;
  
  // Student actions
  withdrawApplication: (id: string) => Promise<boolean>;
  
  // Utility actions
  clearError: () => void;
  setLoading: (loading: boolean) => void;
  resetStore: () => void;
}

export const useApplicationStore = create<ApplicationState & ApplicationActions>((set, get) => ({
  // Initial state
  applications: [],
  currentApplication: null,
  studentApplications: [],
  companyApplications: [],
  stats: null,
  isLoading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  },

  // Create application
  createApplication: async (applicationData: ApplicationForm, internshipId: string) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await applicationService.createApplication(applicationData, internshipId);
      
      if (response.success && response.data) {
        // Refresh student applications
        const { pagination } = get();
        get().getStudentApplications(pagination.page, pagination.limit);
        set({ isLoading: false });
        return true;
      } else {
        set({
          error: response.error || 'Failed to create application',
          isLoading: false,
        });
        return false;
      }
    } catch (error: any) {
      set({
        error: error.message || 'Failed to create application',
        isLoading: false,
      });
      return false;
    }
  },

  // Get applications
  getStudentApplications: async (page = 1, limit = 10) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await applicationService.getStudentApplications(page, limit);
      
      if (response.success && response.data) {
        set({
          studentApplications: response.data.applications,
          pagination: {
            page,
            limit,
            total: response.data.total,
            pages: response.data.pages,
          },
          isLoading: false,
        });
      } else {
        set({
          error: response.error || 'Failed to fetch student applications',
          isLoading: false,
        });
      }
    } catch (error: any) {
      set({
        error: error.message || 'Failed to fetch student applications',
        isLoading: false,
      });
    }
  },

  getCompanyApplications: async (page = 1, limit = 10) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await applicationService.getCompanyApplications(page, limit);
      
      if (response.success && response.data) {
        set({
          companyApplications: response.data.applications,
          pagination: {
            page,
            limit,
            total: response.data.total,
            pages: response.data.pages,
          },
          isLoading: false,
        });
      } else {
        set({
          error: response.error || 'Failed to fetch company applications',
          isLoading: false,
        });
      }
    } catch (error: any) {
      set({
        error: error.message || 'Failed to fetch company applications',
        isLoading: false,
      });
    }
  },

  getApplicationById: async (id: string) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await applicationService.getApplicationById(id);
      
      if (response.success && response.data) {
        set({
          currentApplication: response.data,
          isLoading: false,
        });
      } else {
        set({
          error: response.error || 'Failed to fetch application',
          isLoading: false,
        });
      }
    } catch (error: any) {
      set({
        error: error.message || 'Failed to fetch application',
        isLoading: false,
      });
    }
  },

  getApplicationStats: async () => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await applicationService.getApplicationStats();
      
      if (response.success && response.data) {
        set({
          stats: response.data,
          isLoading: false,
        });
      } else {
        set({
          error: response.error || 'Failed to fetch application stats',
          isLoading: false,
        });
      }
    } catch (error: any) {
      set({
        error: error.message || 'Failed to fetch application stats',
        isLoading: false,
      });
    }
  },

  // Company actions
  updateApplicationStatus: async (id: string, status: string) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await applicationService.updateApplicationStatus(id, status);
      
      if (response.success && response.data) {
        // Update current application if it's the one being updated
        const { currentApplication } = get();
        if (currentApplication?._id === id) {
          set({ currentApplication: response.data });
        }
        
        // Refresh company applications
        const { pagination } = get();
        get().getCompanyApplications(pagination.page, pagination.limit);
        set({ isLoading: false });
        return true;
      } else {
        set({
          error: response.error || 'Failed to update application status',
          isLoading: false,
        });
        return false;
      }
    } catch (error: any) {
      set({
        error: error.message || 'Failed to update application status',
        isLoading: false,
      });
      return false;
    }
  },

  scheduleInterview: async (id: string, interviewData: any) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await applicationService.scheduleInterview(id, interviewData);
      
      if (response.success && response.data) {
        // Update current application if it's the one being updated
        const { currentApplication } = get();
        if (currentApplication?._id === id) {
          set({ currentApplication: response.data });
        }
        
        // Refresh company applications
        const { pagination } = get();
        get().getCompanyApplications(pagination.page, pagination.limit);
        set({ isLoading: false });
        return true;
      } else {
        set({
          error: response.error || 'Failed to schedule interview',
          isLoading: false,
        });
        return false;
      }
    } catch (error: any) {
      set({
        error: error.message || 'Failed to schedule interview',
        isLoading: false,
      });
      return false;
    }
  },

  // Student actions
  withdrawApplication: async (id: string) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await applicationService.withdrawApplication(id);
      
      if (response.success) {
        // Remove from current application if it's the one being withdrawn
        const { currentApplication } = get();
        if (currentApplication?._id === id) {
          set({ currentApplication: null });
        }
        
        // Refresh student applications
        const { pagination } = get();
        get().getStudentApplications(pagination.page, pagination.limit);
        set({ isLoading: false });
        return true;
      } else {
        set({
          error: response.error || 'Failed to withdraw application',
          isLoading: false,
        });
        return false;
      }
    } catch (error: any) {
      set({
        error: error.message || 'Failed to withdraw application',
        isLoading: false,
      });
      return false;
    }
  },

  // Utility actions
  clearError: () => set({ error: null }),
  
  setLoading: (loading: boolean) => set({ isLoading: loading }),
  
  resetStore: () => set({
    applications: [],
    currentApplication: null,
    studentApplications: [],
    companyApplications: [],
    stats: null,
    isLoading: false,
    error: null,
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
      pages: 0,
    },
  }),
}));
