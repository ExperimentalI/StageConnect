import { create } from 'zustand';
import { StudentProfile, StudentProfileForm, Application } from '../../types';
import { studentService } from '../../services/api';

interface StudentState {
  profile: StudentProfile | null;
  applications: Application[];
  isLoading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

interface StudentActions {
  // Profile actions
  getProfile: () => Promise<void>;
  createProfile: (profileData: StudentProfileForm) => Promise<boolean>;
  updateProfile: (profileData: Partial<StudentProfileForm>) => Promise<boolean>;
  deleteProfile: () => Promise<boolean>;
  
  // File upload actions
  uploadCV: (file: File) => Promise<boolean>;
  uploadProfilePicture: (file: File) => Promise<boolean>;
  
  // Application actions
  getApplications: (page?: number, limit?: number) => Promise<void>;
  getApplicationById: (id: string) => Promise<Application | null>;
  withdrawApplication: (id: string) => Promise<boolean>;
  
  // Utility actions
  clearError: () => void;
  setLoading: (loading: boolean) => void;
  resetStore: () => void;
}

export const useStudentStore = create<StudentState & StudentActions>((set, get) => ({
  // Initial state
  profile: null,
  applications: [],
  isLoading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  },

  // Profile actions
  getProfile: async () => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await studentService.getProfile();
      
      if (response.success && response.data) {
        set({
          profile: response.data,
          isLoading: false,
        });
      } else {
        set({
          error: response.error || 'Failed to fetch profile',
          isLoading: false,
        });
      }
    } catch (error: any) {
      set({
        error: error.message || 'Failed to fetch profile',
        isLoading: false,
      });
    }
  },

  createProfile: async (profileData: StudentProfileForm) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await studentService.createProfile(profileData);
      
      if (response.success && response.data) {
        set({
          profile: response.data,
          isLoading: false,
        });
        return true;
      } else {
        set({
          error: response.error || 'Failed to create profile',
          isLoading: false,
        });
        return false;
      }
    } catch (error: any) {
      set({
        error: error.message || 'Failed to create profile',
        isLoading: false,
      });
      return false;
    }
  },

  updateProfile: async (profileData: Partial<StudentProfileForm>) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await studentService.updateProfile(profileData);
      
      if (response.success && response.data) {
        set({
          profile: response.data,
          isLoading: false,
        });
        return true;
      } else {
        set({
          error: response.error || 'Failed to update profile',
          isLoading: false,
        });
        return false;
      }
    } catch (error: any) {
      set({
        error: error.message || 'Failed to update profile',
        isLoading: false,
      });
      return false;
    }
  },

  deleteProfile: async () => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await studentService.deleteProfile();
      
      if (response.success) {
        set({
          profile: null,
          isLoading: false,
        });
        return true;
      } else {
        set({
          error: response.error || 'Failed to delete profile',
          isLoading: false,
        });
        return false;
      }
    } catch (error: any) {
      set({
        error: error.message || 'Failed to delete profile',
        isLoading: false,
      });
      return false;
    }
  },

  // File upload actions
  uploadCV: async (file: File) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await studentService.uploadCV(file);
      
      if (response.success) {
        // Refresh profile to get updated CV info
        get().getProfile();
        set({ isLoading: false });
        return true;
      } else {
        set({
          error: response.error || 'Failed to upload CV',
          isLoading: false,
        });
        return false;
      }
    } catch (error: any) {
      set({
        error: error.message || 'Failed to upload CV',
        isLoading: false,
      });
      return false;
    }
  },

  uploadProfilePicture: async (file: File) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await studentService.uploadProfilePicture(file);
      
      if (response.success) {
        // Refresh profile to get updated picture
        get().getProfile();
        set({ isLoading: false });
        return true;
      } else {
        set({
          error: response.error || 'Failed to upload profile picture',
          isLoading: false,
        });
        return false;
      }
    } catch (error: any) {
      set({
        error: error.message || 'Failed to upload profile picture',
        isLoading: false,
      });
      return false;
    }
  },

  // Application actions
  getApplications: async (page = 1, limit = 10) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await studentService.getApplications(page, limit);
      
      if (response.success && response.data) {
        set({
          applications: response.data.applications,
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
          error: response.error || 'Failed to fetch applications',
          isLoading: false,
        });
      }
    } catch (error: any) {
      set({
        error: error.message || 'Failed to fetch applications',
        isLoading: false,
      });
    }
  },

  getApplicationById: async (id: string) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await studentService.getApplicationById(id);
      
      if (response.success && response.data) {
        set({ isLoading: false });
        return response.data;
      } else {
        set({
          error: response.error || 'Failed to fetch application',
          isLoading: false,
        });
        return null;
      }
    } catch (error: any) {
      set({
        error: error.message || 'Failed to fetch application',
        isLoading: false,
      });
      return null;
    }
  },

  withdrawApplication: async (id: string) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await studentService.withdrawApplication(id);
      
      if (response.success) {
        // Refresh applications list
        const { pagination } = get();
        get().getApplications(pagination.page, pagination.limit);
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
    profile: null,
    applications: [],
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
