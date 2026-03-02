import { create } from 'zustand';
import { Internship, InternshipForm } from '../../types';
import { internshipService } from '../../services/api';

interface InternshipState {
  internships: Internship[];
  featuredInternships: Internship[];
  currentInternship: Internship | null;
  isLoading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  filters: {
    field?: string;
    workType?: string;
    location?: string;
    duration?: string;
  };
}

interface InternshipActions {
  // Get internships
  getInternships: (page?: number, limit?: number, filters?: any) => Promise<void>;
  getFeaturedInternships: () => Promise<void>;
  searchInternships: (query: string, page?: number, limit?: number, filters?: any) => Promise<void>;
  getInternshipById: (id: string) => Promise<void>;
  
  // Company actions
  createInternship: (internshipData: InternshipForm) => Promise<boolean>;
  updateInternship: (id: string, internshipData: Partial<InternshipForm>) => Promise<boolean>;
  deleteInternship: (id: string) => Promise<boolean>;
  updateInternshipStatus: (id: string, status: string) => Promise<boolean>;
  
  // Utility actions
  clearError: () => void;
  setLoading: (loading: boolean) => void;
  setFilters: (filters: any) => void;
  resetStore: () => void;
}

export const useInternshipStore = create<InternshipState & InternshipActions>((set, get) => ({
  // Initial state
  internships: [],
  featuredInternships: [],
  currentInternship: null,
  isLoading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  },
  filters: {},

  // Get internships
  getInternships: async (page = 1, limit = 10, filters = {}) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await internshipService.getInternships(page, limit, filters);
      
      if (response.success && response.data) {
        set({
          internships: response.data.internships,
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
          error: response.error || 'Failed to fetch internships',
          isLoading: false,
        });
      }
    } catch (error: any) {
      set({
        error: error.message || 'Failed to fetch internships',
        isLoading: false,
      });
    }
  },

  getFeaturedInternships: async () => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await internshipService.getFeaturedInternships();
      
      if (response.success && response.data) {
        set({
          featuredInternships: response.data,
          isLoading: false,
        });
      } else {
        set({
          error: response.error || 'Failed to fetch featured internships',
          isLoading: false,
        });
      }
    } catch (error: any) {
      set({
        error: error.message || 'Failed to fetch featured internships',
        isLoading: false,
      });
    }
  },

  searchInternships: async (query: string, page = 1, limit = 10, filters = {}) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await internshipService.searchInternships(query, page, limit, filters);
      
      if (response.success && response.data) {
        set({
          internships: response.data.internships,
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
          error: response.error || 'Failed to search internships',
          isLoading: false,
        });
      }
    } catch (error: any) {
      set({
        error: error.message || 'Failed to search internships',
        isLoading: false,
      });
    }
  },

  getInternshipById: async (id: string) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await internshipService.getInternshipById(id);
      
      if (response.success && response.data) {
        set({
          currentInternship: response.data,
          isLoading: false,
        });
      } else {
        set({
          error: response.error || 'Failed to fetch internship',
          isLoading: false,
        });
      }
    } catch (error: any) {
      set({
        error: error.message || 'Failed to fetch internship',
        isLoading: false,
      });
    }
  },

  // Company actions
  createInternship: async (internshipData: InternshipForm) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await internshipService.createInternship(internshipData);
      
      if (response.success && response.data) {
        // Refresh internships list
        const { pagination, filters } = get();
        get().getInternships(pagination.page, pagination.limit, filters);
        set({ isLoading: false });
        return true;
      } else {
        set({
          error: response.error || 'Failed to create internship',
          isLoading: false,
        });
        return false;
      }
    } catch (error: any) {
      set({
        error: error.message || 'Failed to create internship',
        isLoading: false,
      });
      return false;
    }
  },

  updateInternship: async (id: string, internshipData: Partial<InternshipForm>) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await internshipService.updateInternship(id, internshipData);
      
      if (response.success && response.data) {
        // Update current internship if it's the one being edited
        const { currentInternship } = get();
        if (currentInternship?._id === id) {
          set({ currentInternship: response.data });
        }
        
        // Refresh internships list
        const { pagination, filters } = get();
        get().getInternships(pagination.page, pagination.limit, filters);
        set({ isLoading: false });
        return true;
      } else {
        set({
          error: response.error || 'Failed to update internship',
          isLoading: false,
        });
        return false;
      }
    } catch (error: any) {
      set({
        error: error.message || 'Failed to update internship',
        isLoading: false,
      });
      return false;
    }
  },

  deleteInternship: async (id: string) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await internshipService.deleteInternship(id);
      
      if (response.success) {
        // Clear current internship if it's the one being deleted
        const { currentInternship } = get();
        if (currentInternship?._id === id) {
          set({ currentInternship: null });
        }
        
        // Refresh internships list
        const { pagination, filters } = get();
        get().getInternships(pagination.page, pagination.limit, filters);
        set({ isLoading: false });
        return true;
      } else {
        set({
          error: response.error || 'Failed to delete internship',
          isLoading: false,
        });
        return false;
      }
    } catch (error: any) {
      set({
        error: error.message || 'Failed to delete internship',
        isLoading: false,
      });
      return false;
    }
  },

  updateInternshipStatus: async (id: string, status: string) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await internshipService.updateInternshipStatus(id, status);
      
      if (response.success && response.data) {
        // Update current internship if it's the one being updated
        const { currentInternship } = get();
        if (currentInternship?._id === id) {
          set({ currentInternship: response.data });
        }
        
        // Refresh internships list
        const { pagination, filters } = get();
        get().getInternships(pagination.page, pagination.limit, filters);
        set({ isLoading: false });
        return true;
      } else {
        set({
          error: response.error || 'Failed to update internship status',
          isLoading: false,
        });
        return false;
      }
    } catch (error: any) {
      set({
        error: error.message || 'Failed to update internship status',
        isLoading: false,
      });
      return false;
    }
  },

  // Utility actions
  clearError: () => set({ error: null }),
  
  setLoading: (loading: boolean) => set({ isLoading: loading }),
  
  setFilters: (filters: any) => set({ filters: { ...get().filters, ...filters } }),
  
  resetStore: () => set({
    internships: [],
    featuredInternships: [],
    currentInternship: null,
    isLoading: false,
    error: null,
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
      pages: 0,
    },
    filters: {},
  }),
}));
