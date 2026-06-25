import apiClient from './client';
import { Comment } from '@/types';

export const commentsApi = {
  list: async (params?: { clothing_id?: number; status?: string; page?: number }): Promise<Comment[]> => {
    const { data } = await apiClient.get('/comments', { params });
    return data;
  },
  create: async (payload: { clothing_id: number; content: string; guest_name?: string; guest_email?: string; parent_id?: number }) => {
    const { data } = await apiClient.post('/comments', payload);
    return data;
  },
  updateStatus: async (id: number, status: 'approved' | 'rejected') => {
    const { data } = await apiClient.put(`/comments/${id}/status`, { status });
    return data;
  },
  remove: async (id: number) => {
    const { data } = await apiClient.delete(`/comments/${id}`);
    return data;
  },
};
