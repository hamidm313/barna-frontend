import {
  mockUsers, mockEthnicGroups, mockTags, mockClothing,
  mockReservations, mockOrders, mockComments, mockMedia,
  mockPages, mockThemeSettings, mockSettings, mockCommunityPosts, mockRequests,
} from './data';
import type { Clothing, EthnicGroup } from '@/types';

const delay = (ms = 300) => new Promise(r => setTimeout(r, ms));

function paginate<T>(items: T[], page = 1, limit = 10) {
  const total = items.length;
  const pages = Math.ceil(total / limit);
  const offset = (page - 1) * limit;
  return {
    data: items.slice(offset, offset + limit),
    pagination: { total, page, limit, pages },
  };
}

// Auth
export const mockAuth = {
  login: async (email: string) => {
    await delay();
    const user = mockUsers.find(u => u.email === email) || mockUsers[0];
    return { data: { token: 'mock-jwt-token-' + user.id, user } };
  },
  register: async (data: Record<string, string>) => {
    await delay();
    return { data: { token: 'mock-jwt-token-new', user: { id: 99, ...data, role: 'user', is_active: true, created_at: new Date().toISOString() } } };
  },
  me: async () => {
    await delay(100);
    return { data: mockUsers[0] };
  },
  updateProfile: async (data: Record<string, string>) => { await delay(); return { data: { ...mockUsers[1], ...data } }; },
  changePassword: async () => { await delay(); return { message: 'رمز عبور تغییر کرد' }; },
};

// Clothing
export const mockClothingApi = {
  list: async (params: Record<string, unknown> = {}) => {
    await delay();
    let items = [...mockClothing];
    if (params.search) items = items.filter(c => c.title.includes(String(params.search)));
    if (params.ethnic_group_id) items = items.filter(c => c.ethnic_group_id === Number(params.ethnic_group_id));
    if (params.category) items = items.filter(c => c.category === params.category);
    if (params.gender) items = items.filter(c => c.gender === params.gender);
    if (params.status) items = items.filter(c => c.status === params.status);
    if (params.featured) items = items.filter(c => c.is_featured);
    return paginate(items, Number(params.page) || 1, Number(params.limit) || 10);
  },
  getOne: async (id: number) => { await delay(100); return { data: mockClothing.find(c => c.id === id) || mockClothing[0] }; },
  create: async (data: Partial<Clothing>) => { await delay(); return { data: { id: Date.now(), ...data } as Clothing }; },
  update: async (id: number, data: Partial<Clothing>) => { await delay(); return { data: { ...mockClothing.find(c => c.id === id), ...data } as Clothing }; },
  remove: async () => { await delay(); return { message: 'حذف شد' }; },
};

// Ethnic Groups
export const mockEthnicGroupsApi = {
  list: async (params: Record<string, unknown> = {}) => {
    await delay();
    return paginate(mockEthnicGroups, Number(params.page) || 1, Number(params.limit) || 20);
  },
  getOne: async (slug: string) => {
    await delay(100);
    return { data: mockEthnicGroups.find(g => g.slug === slug) || mockEthnicGroups[0] };
  },
  create: async (data: Partial<EthnicGroup>) => { await delay(); return { data: { id: Date.now(), ...data } as EthnicGroup }; },
  update: async (id: number, data: Partial<EthnicGroup>) => { await delay(); return { data: { ...mockEthnicGroups.find(g => g.id === id), ...data } as EthnicGroup }; },
  remove: async () => { await delay(); return { message: 'حذف شد' }; },
};

// Tags
export const mockTagsApi = {
  list: async (params: Record<string, unknown> = {}) => {
    await delay(100);
    return paginate(mockTags, Number(params.page) || 1, Number(params.limit) || 50);
  },
  create: async (data: { name: string }) => { await delay(); return { data: { id: Date.now(), name: data.name, slug: data.name, usage_count: 0 } }; },
  remove: async () => { await delay(); return { message: 'حذف شد' }; },
};

// Reservations
export const mockReservationsApi = {
  list: async (params: Record<string, unknown> = {}) => {
    await delay();
    let items = [...mockReservations];
    if (params.status) items = items.filter(r => r.status === params.status);
    return paginate(items, Number(params.page) || 1, Number(params.limit) || 10);
  },
  getOne: async (id: number) => { await delay(100); return { data: mockReservations.find(r => r.id === id) || mockReservations[0] }; },
  create: async (data: Record<string, unknown>) => { await delay(); return { data: { id: Date.now(), ...data, status: 'pending' } }; },
  updateStatus: async (id: number, status: string) => { await delay(); return { data: { ...mockReservations.find(r => r.id === id), status } }; },
};

// Orders
export const mockOrdersApi = {
  list: async (params: Record<string, unknown> = {}) => {
    await delay();
    let items = [...mockOrders];
    if (params.status) items = items.filter(o => o.status === params.status);
    return paginate(items, Number(params.page) || 1, Number(params.limit) || 10);
  },
  create: async (data: Record<string, unknown>) => { await delay(); return { data: { id: Date.now(), ...data, status: 'pending' } }; },
  updateStatus: async (id: number, status: string) => { await delay(); return { data: { ...mockOrders.find(o => o.id === id), status } }; },
};

// Comments
export const mockCommentsApi = {
  list: async (params: Record<string, unknown> = {}) => {
    await delay();
    let items = [...mockComments];
    if (params.clothing_id) items = items.filter(c => c.clothing_id === Number(params.clothing_id));
    if (params.status) items = items.filter(c => c.status === params.status);
    return paginate(items, Number(params.page) || 1, Number(params.limit) || 10);
  },
  create: async (data: Record<string, unknown>) => { await delay(); return { data: { id: Date.now(), ...data, status: 'pending' } }; },
  updateStatus: async (id: number, status: string) => { await delay(); return { data: { ...mockComments.find(c => c.id === id), status } }; },
  remove: async () => { await delay(); return { message: 'حذف شد' }; },
};

// Media
export const mockMediaApi = {
  list: async (params: Record<string, unknown> = {}) => {
    await delay();
    return paginate(mockMedia, Number(params.page) || 1, Number(params.limit) || 20);
  },
  upload: async () => { await delay(500); return { data: mockMedia[0] }; },
  update: async (id: number, data: Record<string, unknown>) => { await delay(); return { data: { ...mockMedia.find(m => m.id === id), ...data } }; },
  remove: async () => { await delay(); return { message: 'حذف شد' }; },
};

// Pages
export const mockPagesApi = {
  list: async (params: Record<string, unknown> = {}) => {
    await delay(100);
    return paginate(mockPages, Number(params.page) || 1, Number(params.limit) || 20);
  },
  getOne: async (slug: string) => {
    await delay(100);
    return { data: mockPages.find(p => p.slug === slug) || mockPages[0] };
  },
  upsert: async (slug: string, data: Record<string, unknown>) => {
    await delay();
    return { data: { ...mockPages.find(p => p.slug === slug), ...data } };
  },
};

// Settings
export const mockSettingsApi = {
  getAll: async () => { await delay(100); return { data: mockSettings }; },
  update: async (key: string, value: string) => { await delay(); return { data: { key, value } }; },
};

// Theme
export const mockThemeApi = {
  get: async () => { await delay(100); return { data: mockThemeSettings }; },
  update: async (settings: unknown[]) => { await delay(); return { data: settings }; },
};

// Community
export const mockCommunityApi = {
  list: async (params: Record<string, unknown> = {}) => {
    await delay();
    let items = [...mockCommunityPosts];
    if (params.status) items = items.filter(p => p.status === params.status);
    return paginate(items, Number(params.page) || 1, Number(params.limit) || 10);
  },
  create: async (data: Record<string, unknown>) => { await delay(); return { data: { id: Date.now(), ...data, status: 'pending' } }; },
  updateStatus: async (id: number, status: string) => { await delay(); return { data: { ...mockCommunityPosts.find(p => p.id === id), status } }; },
};

// Requests
export const mockRequestsApi = {
  list: async (params: Record<string, unknown> = {}) => {
    await delay();
    let items = [...mockRequests];
    if (params.status) items = items.filter(r => r.status === params.status);
    return paginate(items, Number(params.page) || 1, Number(params.limit) || 10);
  },
  create: async (data: Record<string, unknown>) => { await delay(); return { data: { id: Date.now(), ...data, status: 'new' } }; },
  respond: async (id: number, response: string) => { await delay(); return { data: { ...mockRequests.find(r => r.id === id), status: 'responded', admin_response: response } }; },
};

// Users
export const mockUsersApi = {
  list: async (params: Record<string, unknown> = {}) => {
    await delay();
    return paginate(mockUsers, Number(params.page) || 1, Number(params.limit) || 10);
  },
  updateRole: async (id: number, role: string) => { await delay(); return { data: { ...mockUsers.find(u => u.id === id), role } }; },
  toggleActive: async (id: number) => {
    await delay();
    const u = mockUsers.find(u => u.id === id);
    return { data: { ...u, is_active: !u?.is_active } };
  },
};
