// Placeholder services for build compatibility
// These should be implemented with actual API calls

export const authService = {
  login: async (credentials: any) => ({ data: { token: 'mock', user: { id: '1', email: credentials.email } } }),
  register: async (userData: any) => ({ data: { token: 'mock', user: { id: '1', email: userData.email } } }),
  logout: async () => ({ data: undefined }),
  getCurrentUser: async () => ({ data: { id: '1', email: 'user@example.com' } }),
};

export const studentService = {
  getProfile: async () => ({ data: { id: '1', name: 'Student' } }),
  createProfile: async (data: any) => ({ data: { id: '1', ...data } }),
  updateProfile: async (data: any) => ({ data: { id: '1', ...data } }),
  getApplications: async (page: number, limit: number) => ({ data: { applications: [], total: 0, pages: 0 } }),
};

export const companyService = {
  getProfile: async () => ({ data: { id: '1', name: 'Company' } }),
  createProfile: async (data: any) => ({ data: { id: '1', ...data } }),
  updateProfile: async (data: any) => ({ data: { id: '1', ...data } }),
};

export const internshipService = {
  getInternships: async (page: number, limit: number, filters?: any) => ({ data: { internships: [], total: 0, pages: 0 } }),
  getFeaturedInternships: async () => ({ data: [] }),
  getInternshipById: async (id: string) => ({ data: { id, title: 'Internship' } }),
  createInternship: async (data: any) => ({ data: { id: '1', ...data } }),
  updateInternship: async (id: string, data: any) => ({ data: { id, ...data } }),
};

export const applicationService = {
  getApplicationById: async (id: string) => ({ data: { id, status: 'pending' } }),
  createApplication: async (data: any, internshipId: string) => ({ data: { id: '1', ...data, internshipId } }),
  updateApplicationStatus: async (id: string, status: string) => ({ data: { id, status } }),
  getCompanyApplications: async (page: number, limit: number) => ({ data: { applications: [], total: 0, pages: 0 } }),
};
