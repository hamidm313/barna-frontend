import apiClient from './client';
import { mockThemeApi } from '@/lib/mock';

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

export async function getTheme() {
  if (USE_MOCK) return mockThemeApi.get();
  const res = await apiClient.get('/theme');
  return res.data;
}

export async function updateTheme(settings: unknown[]) {
  if (USE_MOCK) return mockThemeApi.update(settings);
  const res = await apiClient.put('/theme', { settings });
  return res.data;
}
