import { apiClient } from './client';
import { CompanyProfile, CompanyProfileForm } from '../../types';

export const companyService = {
  // Profile management
  async getProfile() {
    return apiClient.get<CompanyProfile>('/companies/profile');
  },

  async createProfile(profileData: CompanyProfileForm) {
    return apiClient.post<CompanyProfile>('/companies/profile', profileData);
  },

  async updateProfile(profileData: Partial<CompanyProfileForm>) {
    return apiClient.put<CompanyProfile>('/companies/profile', profileData);
  },

  async deleteProfile() {
    return apiClient.delete('/companies/profile');
  },

  // File uploads
  async uploadLogo(file: File) {
    const formData = new FormData();
    formData.append('logo', file);
    return apiClient.upload('/companies/upload-logo', formData);
  },

  // Search companies (for students)
  async searchCompanies(query: string, page = 1, limit = 10) {
    return apiClient.get<{ companies: CompanyProfile[]; total: number; pages: number }>('/companies/search', {
      q: query,
      page,
      limit,
    });
  },
};
