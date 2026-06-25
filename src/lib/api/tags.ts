import apiClient from './client';
import { Tag } from '@/types';

export const tagsApi = {
  list: async (): Promise<Tag[]> => {
    const { data } = await apiClient.get('/tags');
    return data;
  },
  create: async (name: string): Promise<Tag> => {
    const { data } = await apiClient.post('/tags', { name });
    return data;
  },
  update: async (id: number, name: string) => {
    const { data } = await apiClient.put(`/tags/${id}`, { name });
    return data;
  },
  remove: async (id: number) => {
    const { data } = await apiClient.delete(`/tags/${id}`);
    return data;
  },
};
