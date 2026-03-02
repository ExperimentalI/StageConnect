import { apiClient } from './client';
import { Application, ApplicationForm } from '../../types';

export const applicationService = {
  // Create application
  async createApplication(applicationData: ApplicationForm, internshipId: string) {
    return apiClient.post<Application>('/applications', {
      ...applicationData,
      internshipId,
    });
  },

  // Get applications
  async getStudentApplications(page = 1, limit = 10) {
    return apiClient.get<{ applications: Application[]; total: number; pages: number }>('/applications/student', {
      page,
      limit,
    });
  },

  async getCompanyApplications(page = 1, limit = 10) {
    return apiClient.get<{ applications: Application[]; total: number; pages: number }>('/applications/company', {
      page,
      limit,
    });
  },

  async getApplicationById(id: string) {
    return apiClient.get<Application>(`/applications/${id}`);
  },

  // Application management (company)
  async updateApplicationStatus(id: string, status: string) {
    return apiClient.put<Application>(`/applications/${id}/status`, { status });
  },

  async scheduleInterview(id: string, interviewData: any) {
    return apiClient.post<Application>(`/applications/${id}/interview`, interviewData);
  },

  // Withdraw application (student)
  async withdrawApplication(id: string) {
    return apiClient.delete(`/applications/${id}`);
  },

  // Statistics
  async getApplicationStats() {
    return apiClient.get('/applications/stats');
  },
};
