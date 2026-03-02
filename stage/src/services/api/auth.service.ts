import { apiClient } from './client';
import { LoginCredentials, RegisterData, AuthResponse, User } from '../../types';

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export const authService = {
  // Authentication
  async login(credentials: LoginCredentials) {
    return apiClient.post<AuthResponse>('/auth/login', credentials);
  },

  async register(userData: RegisterData) {
    return apiClient.post<AuthResponse>('/auth/register', userData);
  },

  async logout(): Promise<ApiResponse<void>> {
    return apiClient.post<void>('/auth/logout');
  },

  // User profile
  async getCurrentUser() {
    return apiClient.get<User>('/auth/me');
  },

  async updateUser(userData: Partial<User>) {
    return apiClient.put<User>('/auth/me', userData);
  },

  async changePassword(oldPassword: string, newPassword: string) {
    return apiClient.post('/auth/change-password', { oldPassword, newPassword });
  },

  async deleteAccount() {
    return apiClient.delete('/auth/account');
  },
};
