import apiClient from './client';
import { MediaItem } from '@/types';

export const mediaApi = {
  list: async (params?: { type?: string; search?: string; tag?: string; page?: number; limit?: number }): Promise<{ data: MediaItem[]; total: number }> => {
    const { data } = await apiClient.get('/media', { params });
    return data;
  },
  upload: async (file: File, altText?: string, tags?: number[]): Promise<{ id: number; url: string }> => {
    const form = new FormData();
    form.append('file', file);
    if (altText) form.append('alt_text', altText);
    if (tags?.length) form.append('tags', JSON.stringify(tags));
    const { data } = await apiClient.post('/media/upload', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },
  update: async (id: number, payload: { alt_text?: string; tags?: number[] }) => {
    const { data } = await apiClient.put(`/media/${id}`, payload);
    return data;
  },
  remove: async (id: number) => {
    const { data } = await apiClient.delete(`/media/${id}`);
    return data;
  },
};
