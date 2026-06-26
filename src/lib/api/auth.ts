import apiClient from './client';
import { mockAuth } from '@/lib/mock';

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

export async function login(email: string, password: string) {
  if (USE_MOCK) return mockAuth.login(email);
  const res = await apiClient.post('/auth/login', { email, password });
  return res.data;
}

export async function register(data: { name: string; email: string; password: string; phone?: string }) {
  if (USE_MOCK) return mockAuth.register(data as Record<string, string>);
  const res = await apiClient.post('/auth/register', data);
  return res.data;
}

export async function getMe() {
  if (USE_MOCK) return mockAuth.me();
  const res = await apiClient.get('/auth/me');
  return res.data;
}

export async function updateProfile(data: { name?: string; phone?: string }) {
  if (USE_MOCK) return mockAuth.updateProfile(data as Record<string, string>);
  const res = await apiClient.put('/auth/profile', data);
  return res.data;
}

export async function changePassword(data: { current_password: string; new_password: string }) {
  if (USE_MOCK) return mockAuth.changePassword();
  const res = await apiClient.put('/auth/password', data);
  return res.data;
}

export const authApi = {
  login: async (form: { email: string; password: string }) => {
    const res: any = await login(form.email, form.password);
    return res.data ?? res;
  },
  register: async (form: { name: string; email: string; password: string; phone?: string }) => {
    const res: any = await register(form);
    return res.data ?? res;
  },
  me: getMe,
  updateProfile,
  changePassword,
};
