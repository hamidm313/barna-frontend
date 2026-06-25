import apiClient from './client';
import { CommunityPost } from '@/types';

export const communityApi = {
  list: async (params?: { ethnic_group?: string; status?: string; page?: number; limit?: number }): Promise<CommunityPost[]> => {
    const { data } = await apiClient.get('/community', { params });
    return data;
  },
  create: async (payload: { title?: string; content?: string; images?: string[]; ethnic_group_id?: number }) => {
    const { data } = await apiClient.post('/community', payload);
    return data;
  },
  updateStatus: async (id: number, status: 'approved' | 'rejected') => {
    const { data } = await apiClient.put(`/community/${id}/status`, { status });
    return data;
  },
};
