import apiClient from './client';
import { Page } from '@/types';

export const pagesApi = {
  list: async (): Promise<Page[]> => {
    const { data } = await apiClient.get('/pages');
    return data;
  },
  getOne: async (slug: string): Promise<Page> => {
    const { data } = await apiClient.get(`/pages/${slug}`);
    return data;
  },
  upsert: async (slug: string, payload: Partial<Page>) => {
    const { data } = await apiClient.put(`/pages/${slug}`, payload);
    return data;
  },
};
