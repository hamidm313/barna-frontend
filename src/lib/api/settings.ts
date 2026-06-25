import apiClient from './client';
import { mockSettingsApi } from '@/lib/mock';

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

export async function getSettings() {
  if (USE_MOCK) return mockSettingsApi.getAll();
  const res = await apiClient.get('/settings');
  return res.data;
}

export async function updateSetting(key: string, value: string) {
  if (USE_MOCK) return mockSettingsApi.update(key, value);
  const res = await apiClient.put(`/settings/${key}`, { value });
  return res.data;
}
