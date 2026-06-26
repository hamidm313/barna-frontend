import apiClient from './client';
import { mockClothingApi } from '@/lib/mock';
import type { Clothing } from '@/types';

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

export async function getClothing(params: Record<string, unknown> = {}) {
  if (USE_MOCK) return mockClothingApi.list(params);
  const res = await apiClient.get('/clothing', { params });
  return res.data;
}

export async function getClothingById(id: number) {
  if (USE_MOCK) return mockClothingApi.getOne(id);
  const res = await apiClient.get(`/clothing/${id}`);
  return res.data;
}

export async function createClothing(data: Partial<Clothing>) {
  if (USE_MOCK) return mockClothingApi.create(data);
  const res = await apiClient.post('/clothing', data);
  return res.data;
}

export async function updateClothing(id: number, data: Partial<Clothing>) {
  if (USE_MOCK) return mockClothingApi.update(id, data);
  const res = await apiClient.put(`/clothing/${id}`, data);
  return res.data;
}

export async function deleteClothing(id: number) {
  if (USE_MOCK) return mockClothingApi.remove();
  const res = await apiClient.delete(`/clothing/${id}`);
  return res.data;
}

export const clothingApi = {
  list: getClothing,
  getOne: async (id: string | number) => {
    const res: any = await getClothingById(Number(id));
    return res.data ?? res;
  },
  create: createClothing,
  update: updateClothing,
  remove: deleteClothing,
};
