import apiClient from './client';
import { ThemeSettings } from '@/types';

export const themeApi = {
  get: async (): Promise<ThemeSettings> => {
    const { data } = await apiClient.get('/theme');
    return data;
  },
  update: async (theme: Partial<ThemeSettings>) => {
    const { data } = await apiClient.put('/theme', { theme });
    return data;
  },
};
