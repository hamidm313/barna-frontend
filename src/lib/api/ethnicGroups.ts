import apiClient from './client';
import { EthnicGroup } from '@/types';

export const ethnicGroupsApi = {
  list: async (): Promise<EthnicGroup[]> => {
    const { data } = await apiClient.get('/ethnic-groups');
    return data;
  },
  getOne: async (slug: string): Promise<EthnicGroup> => {
    const { data } = await apiClient.get(`/ethnic-groups/${slug}`);
    return data;
  },
  create: async (payload: Partial<EthnicGroup>) => {
    const { data } = await apiClient.post('/ethnic-groups', payload);
    return data;
  },
  update: async (id: number, payload: Partial<EthnicGroup>) => {
    const { data } = await apiClient.put(`/ethnic-groups/${id}`, payload);
    return data;
  },
  remove: async (id: number) => {
    const { data } = await apiClient.delete(`/ethnic-groups/${id}`);
    return data;
  },
};
