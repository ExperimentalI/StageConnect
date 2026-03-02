import { create } from 'zustand';
import { CompanyProfile, CompanyProfileForm } from '../../types';
import { companyService } from '../../services/api';

interface CompanyState {
  profile: CompanyProfile | null;
  isLoading: boolean;
  error: string | null;
}

interface CompanyActions {
  // Profile actions
  getProfile: () => Promise<void>;
  createProfile: (profileData: CompanyProfileForm) => Promise<boolean>;
  updateProfile: (profileData: Partial<CompanyProfileForm>) => Promise<boolean>;
  deleteProfile: () => Promise<boolean>;
  
  // File upload actions
  uploadLogo: (file: File) => Promise<boolean>;
  
  // Search actions
  searchCompanies: (query: string, page?: number, limit?: number) => Promise<any>;
  
  // Utility actions
  clearError: () => void;
  setLoading: (loading: boolean) => void;
  resetStore: () => void;
}

export const useCompanyStore = create<CompanyState & CompanyActions>((set, get) => ({
  // Initial state
  profile: null,
  isLoading: false,
  error: null,

  // Profile actions
  getProfile: async () => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await companyService.getProfile();
      
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

  createProfile: async (profileData: CompanyProfileForm) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await companyService.createProfile(profileData);
      
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

  updateProfile: async (profileData: Partial<CompanyProfileForm>) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await companyService.updateProfile(profileData);
      
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
      const response = await companyService.deleteProfile();
      
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
  uploadLogo: async (file: File) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await companyService.uploadLogo(file);
      
      if (response.success) {
        // Refresh profile to get updated logo
        get().getProfile();
        set({ isLoading: false });
        return true;
      } else {
        set({
          error: response.error || 'Failed to upload logo',
          isLoading: false,
        });
        return false;
      }
    } catch (error: any) {
      set({
        error: error.message || 'Failed to upload logo',
        isLoading: false,
      });
      return false;
    }
  },

  // Search actions
  searchCompanies: async (query: string, page = 1, limit = 10) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await companyService.searchCompanies(query, page, limit);
      
      if (response.success && response.data) {
        set({ isLoading: false });
        return response.data;
      } else {
        set({
          error: response.error || 'Failed to search companies',
          isLoading: false,
        });
        return null;
      }
    } catch (error: any) {
      set({
        error: error.message || 'Failed to search companies',
        isLoading: false,
      });
      return null;
    }
  },

  // Utility actions
  clearError: () => set({ error: null }),
  
  setLoading: (loading: boolean) => set({ isLoading: loading }),
  
  resetStore: () => set({
    profile: null,
    isLoading: false,
    error: null,
  }),
}));
