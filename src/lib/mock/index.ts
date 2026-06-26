import {
  mockUsers, mockEthnicGroups, mockTags, mockClothing,
  mockReservations, mockOrders, mockComments, mockMedia,
  mockPages, mockThemeSettings, mockSettings, mockCommunityPosts, mockRequests,
} from './data';
import type { Clothing, EthnicGroup } from '@/types';


type MockLocale = 'fa' | 'en' | 'fr';
const supportedLocales: MockLocale[] = ['fa', 'en', 'fr'];
function getMockLanguage(params?: Record<string, unknown>): MockLocale {
  const value = String(params?.language || (typeof window !== 'undefined' ? localStorage.getItem('barna_locale') : '') || 'fa');
  return supportedLocales.includes(value as MockLocale) ? value as MockLocale : 'fa';
}
const localText: Record<MockLocale, Record<string, string>> = {
  fa: {},
  en: {
    'مدیر سیستم':'System Manager','علی محمدی':'Ali Mohammadi','فاطمه احمدی':'Fatemeh Ahmadi','رضا کریمی':'Reza Karimi','مریم رضایی':'Maryam Rezaei','سارا حسینی':'Sara Hosseini',
    'آذری':'Azari','لری':'Lori','کردی':'Kurdish','جمی':'Jami','ترکمن':'Turkmen','بندری':'Bandari','عربی':'Arab','مدرن برنا':'Barna Modern','بوشهری':'Bushehri',
    'لباس عروس آذری طلایی':'Golden Azari Bridal Dress','جامه لری دستباف':'Handwoven Lori Dress','کرت کردی ابریشمی':'Silk Kurdish Kert','لباس بندری رنگارنگ':'Colorful Bandari Dress','دشداشه عربی اصیل':'Authentic Arab Dishdasha','کلاه و جلیقه ترکمن':'Turkmen Hat and Vest','فیوژن برنا - مدل شمال':'Barna Fusion - North Model','لباس بوشهری دریایی':'Marine Bushehri Dress','قبا مردانه آذری':'Azari Men Qaba','لباس کودک لری':'Lori Child Dress',
    'طلایی':'gold','قرمز و مشکی':'red and black','سبز زمردی':'emerald green','چندرنگ':'multi-color','سفید':'white','قرمز و طلایی':'red and gold','کرم و طلایی':'cream and gold','آبی و سفید':'blue and white','سرمه‌ای':'navy','زرد و قرمز':'yellow and red',
    'ابریشم':'silk','پشم':'wool','کتان':'cotton','ابریشم مصنوعی':'artificial silk','کتان سبک':'light cotton','مخمل':'velvet',
    'درباره ما':'About us','داستان برنا':'Barna Story','تماس با ما':'Contact us','صفحه اصلی':'Home','رنگ اصلی':'Primary color','رنگ برجسته':'Accent color','رنگ تیره':'Dark color','رنگ پس‌زمینه':'Background color','رنگ متن':'Text color','فونت اصلی (فارسی)':'Primary font','فونت ثانوی (انگلیسی)':'Secondary font','شعاع گوشه‌ها':'Border radius','ارتفاع بنر اصلی':'Hero height','سایه کارت‌ها':'Card shadow',
  },
  fr: {
    'مدیر سیستم':'Gestionnaire système','علی محمدی':'Ali Mohammadi','فاطمه احمدی':'Fatemeh Ahmadi','رضا کریمی':'Reza Karimi','مریم رضایی':'Maryam Rezaei','سارا حسینی':'Sara Hosseini',
    'آذری':'Azéri','لری':'Lori','کردی':'Kurde','جمی':'Jam','ترکمن':'Turkmène','بندری':'Bandari','عربی':'Arabe','مدرن برنا':'Barna Moderne','بوشهری':'Bushehri',
    'لباس عروس آذری طلایی':'Robe de mariée azérie dorée','جامه لری دستباف':'Robe lori tissée main','کرت کردی ابریشمی':'Kert kurde en soie','لباس بندری رنگارنگ':'Robe bandari colorée','دشداشه عربی اصیل':'Dishdasha arabe authentique','کلاه و جلیقه ترکمن':'Chapeau et gilet turkmènes','فیوژن برنا - مدل شمال':'Fusion Barna - modèle nord','لباس بوشهری دریایی':'Robe marine de Bushehr','قبا مردانه آذری':'Qaba azéri homme','لباس کودک لری':'Tenue enfant lori',
    'طلایی':'doré','قرمز و مشکی':'rouge et noir','سبز زمردی':'vert émeraude','چندرنگ':'multicolore','سفید':'blanc','قرمز و طلایی':'rouge et doré','کرم و طلایی':'crème et doré','آبی و سفید':'bleu et blanc','سرمه‌ای':'bleu marine','زرد و قرمز':'jaune et rouge',
    'ابریشم':'soie','پشم':'laine','کتان':'coton','ابریشم مصنوعی':'soie artificielle','کتان سبک':'coton léger','مخمل':'velours',
    'درباره ما':'À propos','داستان برنا':'Histoire de Barna','تماس با ما':'Contact','صفحه اصلی':'Accueil','رنگ اصلی':'Couleur principale','رنگ برجسته':'Couleur accent','رنگ تیره':'Couleur sombre','رنگ پس‌زمینه':'Couleur de fond','رنگ متن':'Couleur du texte','فونت اصلی (فارسی)':'Police principale','فونت ثانوی (انگلیسی)':'Police secondaire','شعاع گوشه‌ها':'Rayon des coins','ارتفاع بنر اصلی':'Hauteur du héros','سایه کارت‌ها':'Ombre des cartes',
  },
};
function trValue(value: unknown, lang: MockLocale): unknown {
  if (lang === 'fa') return value;
  if (typeof value === 'string') return localText[lang][value] || value;
  if (Array.isArray(value)) return value.map(v => trValue(v, lang));
  return value;
}
function localizeItem<T>(item: T, lang: MockLocale): T & { language: MockLocale } {
  if (!item || typeof item !== 'object') return item as T & { language: MockLocale };
  const out: Record<string, unknown> = { ...(item as Record<string, unknown>), language: lang };
  for (const key of ['display_name','ethnic_group_display_name','user_display_name','guest_name','clothing_display_name','color','material','description','content','message','admin_response','original_name','label','value','meta_description']) {
    if (key in out) out[key] = trValue(out[key], lang);
  }
  if ('tags' in out) out.tags = trValue(out.tags, lang);
  return out as T & { language: MockLocale };
}
function localizeArray<T>(items: T[], lang: MockLocale) { return items.map(i => localizeItem(i, lang)); }
function localizePage<T extends {content?: string}>(item: T, lang: MockLocale) {
  const out = localizeItem(item, lang);
  if (lang !== 'fa' && out.content) out.content = String(out.content).replace(/<[^>]+>/g, ' ').slice(0, 240) || out.content;
  return out;
}

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
    if (params.search) items = items.filter(c => c.display_name.includes(String(params.search)));
    if (params.ethnic_group_id) items = items.filter(c => c.ethnic_group_id === Number(params.ethnic_group_id));
    if (params.category) items = items.filter(c => c.category === params.category);
    if (params.gender) items = items.filter(c => c.gender === params.gender);
    if (params.status) items = items.filter(c => c.status === params.status);
    if (params.featured || params.is_featured) items = items.filter(c => c.is_featured);
    return paginate(localizeArray(items, getMockLanguage(params)), Number(params.page) || 1, Number(params.limit) || 10);
  },
  getOne: async (id: number) => { await delay(100); return { data: localizeItem(mockClothing.find(c => c.id === id) || mockClothing[0], getMockLanguage()) }; },
  create: async (data: Partial<Clothing>) => { await delay(); return { data: { id: Date.now(), ...data } as Clothing }; },
  update: async (id: number, data: Partial<Clothing>) => { await delay(); return { data: { ...mockClothing.find(c => c.id === id), ...data } as Clothing }; },
  remove: async () => { await delay(); return { message: 'حذف شد' }; },
};

// Ethnic Groups
export const mockEthnicGroupsApi = {
  list: async (params: Record<string, unknown> = {}) => {
    await delay();
    return { data: localizeArray(mockEthnicGroups, getMockLanguage(params)) };
  },
  getOne: async (slug: string) => {
    await delay(100);
    return { data: localizeItem(mockEthnicGroups.find(g => g.slug === slug) || mockEthnicGroups[0], getMockLanguage()) };
  },
  create: async (data: Partial<EthnicGroup>) => { await delay(); return { data: { id: Date.now(), ...data } as EthnicGroup }; },
  update: async (id: number, data: Partial<EthnicGroup>) => { await delay(); return { data: { ...mockEthnicGroups.find(g => g.id === id), ...data } as EthnicGroup }; },
  remove: async () => { await delay(); return { message: 'حذف شد' }; },
};

// Tags
export const mockTagsApi = {
  list: async (params: Record<string, unknown> = {}) => {
    await delay(100);
    return paginate(localizeArray(mockTags, getMockLanguage(params)), Number(params.page) || 1, Number(params.limit) || 50);
  },
  create: async (data: { display_name: string }) => { await delay(); return { data: { id: Date.now(), display_name: data.display_name, slug: data.display_name, uuid: 'uuid-tag-new', usage_count: 0 } }; },
  remove: async () => { await delay(); return { message: 'حذف شد' }; },
};

// Reservations
export const mockReservationsApi = {
  list: async (params: Record<string, unknown> = {}) => {
    await delay();
    let items = [...mockReservations];
    if (params.status) items = items.filter(r => r.status === params.status);
    return paginate(localizeArray(items, getMockLanguage(params)), Number(params.page) || 1, Number(params.limit) || 10);
  },
  getOne: async (id: number) => { await delay(100); return { data: localizeItem(mockReservations.find(r => r.id === id) || mockReservations[0], getMockLanguage()) }; },
  create: async (data: Record<string, unknown>) => { await delay(); return { data: { id: Date.now(), ...data, status: 'pending' } }; },
  updateStatus: async (id: number, status: string) => { await delay(); return { data: { ...mockReservations.find(r => r.id === id), status } }; },
};

// Orders
export const mockOrdersApi = {
  list: async (params: Record<string, unknown> = {}) => {
    await delay();
    let items = [...mockOrders];
    if (params.status) items = items.filter(o => o.status === params.status);
    return paginate(localizeArray(items, getMockLanguage(params)), Number(params.page) || 1, Number(params.limit) || 10);
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
    return paginate(localizeArray(items, getMockLanguage(params)), Number(params.page) || 1, Number(params.limit) || 10);
  },
  create: async (data: Record<string, unknown>) => { await delay(); return { data: { id: Date.now(), ...data, status: 'pending' } }; },
  updateStatus: async (id: number, status: string) => { await delay(); return { data: { ...mockComments.find(c => c.id === id), status } }; },
  remove: async () => { await delay(); return { message: 'حذف شد' }; },
};

// Media
export const mockMediaApi = {
  list: async (params: Record<string, unknown> = {}) => {
    await delay();
    return paginate(localizeArray(mockMedia, getMockLanguage(params)), Number(params.page) || 1, Number(params.limit) || 20);
  },
  upload: async () => { await delay(500); return { data: mockMedia[0] }; },
  update: async (id: number, data: Record<string, unknown>) => { await delay(); return { data: { ...mockMedia.find(m => m.id === id), ...data } }; },
  remove: async () => { await delay(); return { message: 'حذف شد' }; },
};

// Pages
export const mockPagesApi = {
  list: async (params: Record<string, unknown> = {}) => {
    await delay(100);
    return paginate(mockPages.map(p => localizePage(p, getMockLanguage(params))), Number(params.page) || 1, Number(params.limit) || 20);
  },
  getOne: async (slug: string) => {
    await delay(100);
    return { data: localizePage(mockPages.find(p => p.slug === slug) || mockPages[0], getMockLanguage()) };
  },
  upsert: async (slug: string, data: Record<string, unknown>) => {
    await delay();
    return { data: { ...mockPages.find(p => p.slug === slug), ...data } };
  },
};

// Settings
export const mockSettingsApi = {
  getAll: async () => { await delay(100); return { data: localizeArray(mockSettings, getMockLanguage()) }; },
  update: async (key: string, value: string) => { await delay(); return { data: { key, value } }; },
};

// Theme
export const mockThemeApi = {
  get: async () => { await delay(100); return { data: localizeArray(mockThemeSettings, getMockLanguage()) }; },
  update: async (settings: unknown[]) => { await delay(); return { data: settings }; },
};

// Community
export const mockCommunityApi = {
  list: async (params: Record<string, unknown> = {}) => {
    await delay();
    let items = [...mockCommunityPosts];
    if (params.status) items = items.filter(p => p.status === params.status);
    return paginate(localizeArray(items, getMockLanguage(params)), Number(params.page) || 1, Number(params.limit) || 10);
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
    return paginate(localizeArray(items, getMockLanguage(params)), Number(params.page) || 1, Number(params.limit) || 10);
  },
  create: async (data: Record<string, unknown>) => { await delay(); return { data: { id: Date.now(), ...data, status: 'pending' } }; },
  respond: async (id: number, response: string) => { await delay(); return { data: { ...mockRequests.find(r => r.id === id), status: 'responded', admin_response: response } }; },
};

// Users
export const mockUsersApi = {
  list: async (params: Record<string, unknown> = {}) => {
    await delay();
    return paginate(localizeArray(mockUsers, getMockLanguage(params)), Number(params.page) || 1, Number(params.limit) || 10);
  },
  updateRole: async (id: number, role: string) => { await delay(); return { data: { ...mockUsers.find(u => u.id === id), role } }; },
  toggleActive: async (id: number) => {
    await delay();
    const u = mockUsers.find(u => u.id === id);
    return { data: { ...u, is_active: !u?.is_active } };
  },
};
