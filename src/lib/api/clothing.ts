import apiClient from './client';
import { Clothing, ClothingFilters, ClothingListResponse } from '@/types';

export const clothingApi = {
  list: async (filters: ClothingFilters = {}): Promise<ClothingListResponse> => {
    const { data } = await apiClient.get('/clothing', { params: filters });
    return data;
  },
  getOne: async (id: number | string): Promise<Clothing> => {
    const { data } = await apiClient.get(`/clothing/${id}`);
    return data;
  },
  create: async (payload: Partial<Clothing> & { tags?: number[] }) => {
    const { data } = await apiClient.post('/clothing', payload);
    return data;
  },
  update: async (id: number, payload: Partial<Clothing> & { tags?: number[] }) => {
    const { data } = await apiClient.put(`/clothing/${id}`, payload);
    return data;
  },
  remove: async (id: number) => {
    const { data } = await apiClient.delete(`/clothing/${id}`);
    return data;
  },
};
