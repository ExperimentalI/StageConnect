import { apiClient } from './client';
import { StudentProfile, StudentProfileForm, Application } from '../../types';

export const studentService = {
  // Profile management
  async getProfile() {
    return apiClient.get<StudentProfile>('/students/profile');
  },

  async createProfile(profileData: StudentProfileForm) {
    return apiClient.post<StudentProfile>('/students/profile', profileData);
  },

  async updateProfile(profileData: Partial<StudentProfileForm>) {
    return apiClient.put<StudentProfile>('/students/profile', profileData);
  },

  async deleteProfile() {
    return apiClient.delete('/students/profile');
  },

  // File uploads
  async uploadCV(file: File) {
    const formData = new FormData();
    formData.append('cv', file);
    return apiClient.upload('/students/upload-cv', formData);
  },

  async uploadProfilePicture(file: File) {
    const formData = new FormData();
    formData.append('profilePicture', file);
    return apiClient.upload('/students/upload-picture', formData);
  },

  // Applications
  async getApplications(page = 1, limit = 10) {
    return apiClient.get<{ applications: Application[]; total: number; pages: number }>('/students/applications', {
      page,
      limit,
    });
  },

  async getApplicationById(id: string) {
    return apiClient.get<Application>(`/students/applications/${id}`);
  },

  async withdrawApplication(id: string) {
    return apiClient.delete(`/students/applications/${id}`);
  },

  // Search profiles (for companies)
  async searchProfiles(query: string, page = 1, limit = 10) {
    return apiClient.get<{ profiles: StudentProfile[]; total: number; pages: number }>('/students/search', {
      q: query,
      page,
      limit,
    });
  },
};
