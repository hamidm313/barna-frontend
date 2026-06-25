import apiClient from './client';
import { User } from '@/types';

export const usersApi = {
  list: async (params?: { search?: string; role?: string; page?: number; limit?: number }): Promise<{ data: User[]; total: number }> => {
    const { data } = await apiClient.get('/users', { params });
    return data;
  },
  updateRole: async (id: number, role: 'admin' | 'user') => {
    const { data } = await apiClient.put(`/users/${id}/role`, { role });
    return data;
  },
  toggleActive: async (id: number) => {
    const { data } = await apiClient.put(`/users/${id}/toggle-active`);
    return data;
  },
};
