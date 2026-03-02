import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, LoginCredentials, RegisterData, AuthResponse } from '../../types';
import { authService } from '../../services/api';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

interface AuthActions {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  getCurrentUser: () => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<boolean>;
  changePassword: (oldPassword: string, newPassword: string) => Promise<boolean>;
  deleteAccount: () => Promise<boolean>;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      token: null,
      isLoading: false,
      error: null,
      isAuthenticated: false,

      // Actions
      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await authService.login(credentials);
          
          if (response.success && response.data) {
            const { user, token } = response.data;
            
            set({
              user,
              token,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
            
            localStorage.setItem('token', token);
            return true;
          } else {
            set({
              error: response.error || 'Login failed',
              isLoading: false,
            });
            return false;
          }
        } catch (error: any) {
          set({
            error: error.message || 'Login failed',
            isLoading: false,
          });
          return false;
        }
      },

      register: async (userData: RegisterData) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await authService.register(userData);
          
          if (response.success && response.data) {
            const { user, token } = response.data;
            
            set({
              user,
              token,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
            
            localStorage.setItem('token', token);
            return true;
          } else {
            set({
              error: response.error || 'Registration failed',
              isLoading: false,
            });
            return false;
          }
        } catch (error: any) {
          set({
            error: error.message || 'Registration failed',
            isLoading: false,
          });
          return false;
        }
      },

      logout: () => {
        authService.logout().catch(console.error);
        
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
        
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      },

      getCurrentUser: async () => {
        const { token } = get();
        if (!token) return;
        
        set({ isLoading: true });
        
        try {
          const response = await authService.getCurrentUser();
          
          if (response.success && response.data) {
            set({
              user: response.data,
              isAuthenticated: true,
              isLoading: false,
            });
          } else {
            set({
              user: null,
              token: null,
              isAuthenticated: false,
              isLoading: false,
            });
            localStorage.removeItem('token');
          }
        } catch (error: any) {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            error: error.message,
            isLoading: false,
          });
          localStorage.removeItem('token');
        }
      },

      updateUser: async (userData: Partial<User>) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await authService.updateUser(userData);
          
          if (response.success && response.data) {
            set({
              user: response.data,
              isLoading: false,
            });
            return true;
          } else {
            set({
              error: response.error || 'Update failed',
              isLoading: false,
            });
            return false;
          }
        } catch (error: any) {
          set({
            error: error.message || 'Update failed',
            isLoading: false,
          });
          return false;
        }
      },

      changePassword: async (oldPassword: string, newPassword: string) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await authService.changePassword(oldPassword, newPassword);
          
          if (response.success) {
            set({ isLoading: false });
            return true;
          } else {
            set({
              error: response.error || 'Password change failed',
              isLoading: false,
            });
            return false;
          }
        } catch (error: any) {
          set({
            error: error.message || 'Password change failed',
            isLoading: false,
          });
          return false;
        }
      },

      deleteAccount: async () => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await authService.deleteAccount();
          
          if (response.success) {
            get().logout();
            return true;
          } else {
            set({
              error: response.error || 'Account deletion failed',
              isLoading: false,
            });
            return false;
          }
        } catch (error: any) {
          set({
            error: error.message || 'Account deletion failed',
            isLoading: false,
          });
          return false;
        }
      },

      clearError: () => set({ error: null }),
      
      setLoading: (loading: boolean) => set({ isLoading: loading }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
