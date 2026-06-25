import apiClient from './client';

export const settingsApi = {
  getAll: async (): Promise<Record<string, { value: string; type: string; label: string; group: string }>> => {
    const { data } = await apiClient.get('/settings');
    return data;
  },
  update: async (settings: Record<string, string | number | boolean>) => {
    const { data } = await apiClient.put('/settings', { settings });
    return data;
  },
};
