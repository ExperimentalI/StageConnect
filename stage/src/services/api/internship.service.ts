import { apiClient } from './client';
import { Internship, InternshipForm } from '../../types';

export const internshipService = {
  // Get internships
  async getInternships(page = 1, limit = 10, filters?: any) {
    return apiClient.get<{ internships: Internship[]; total: number; pages: number }>('/internships', {
      page,
      limit,
      ...filters,
    });
  },

  async getFeaturedInternships() {
    return apiClient.get<Internship[]>('/internships/featured');
  },

  async searchInternships(query: string, page = 1, limit = 10, filters?: any) {
    return apiClient.get<{ internships: Internship[]; total: number; pages: number }>('/internships/search', {
      q: query,
      page,
      limit,
      ...filters,
    });
  },

  async getInternshipById(id: string) {
    return apiClient.get<Internship>(`/internships/${id}`);
  },

  // Company operations
  async createInternship(internshipData: InternshipForm) {
    return apiClient.post<Internship>('/internships', internshipData);
  },

  async updateInternship(id: string, internshipData: Partial<InternshipForm>) {
    return apiClient.put<Internship>(`/internships/${id}`, internshipData);
  },

  async deleteInternship(id: string) {
    return apiClient.delete(`/internships/${id}`);
  },

  async updateInternshipStatus(id: string, status: string) {
    return apiClient.patch<Internship>(`/internships/${id}/status`, { status });
  },
};
