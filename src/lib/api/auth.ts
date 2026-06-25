import apiClient from './client';
import { User } from '@/types';

export interface LoginPayload { email: string; password: string; }
export interface RegisterPayload { name: string; email: string; password: string; phone?: string; }
export interface AuthResponse { token: string; user: User; }

export const authApi = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const { data } = await apiClient.post('/auth/login', payload);
    return data;
  },
  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    const { data } = await apiClient.post('/auth/register', payload);
    return data;
  },
  me: async (): Promise<User> => {
    const { data } = await apiClient.get('/auth/me');
    return data;
  },
  updateProfile: async (payload: { name: string; phone?: string }) => {
    const { data } = await apiClient.put('/auth/profile', payload);
    return data;
  },
  changePassword: async (payload: { oldPassword: string; newPassword: string }) => {
    const { data } = await apiClient.put('/auth/change-password', payload);
    return data;
  },
};
