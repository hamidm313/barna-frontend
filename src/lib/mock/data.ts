import type { User, EthnicGroup, Tag, Clothing, Reservation, Order, Comment, MediaItem, Page, ThemeSettings, CommunityPost, Request } from '@/types';

export const mockUsers: User[] = [
  { id: 1, uuid: 'uuid-user-1', display_name: 'مدیر سیستم', email: 'admin@barna.ir', phone: '09121234567', role: 'admin', is_active: true, created_at: '2024-01-01T00:00:00Z' },
  { id: 2, uuid: 'uuid-user-2', display_name: 'علی محمدی', email: 'user@barna.ir', phone: '09361234567', role: 'user', is_active: true, created_at: '2024-02-15T00:00:00Z' },
  { id: 3, uuid: 'uuid-user-3', display_name: 'فاطمه احمدی', email: 'fateme@example.com', phone: '09151234567', role: 'user', is_active: true, created_at: '2024-03-10T00:00:00Z' },
  { id: 4, uuid: 'uuid-user-4', display_name: 'رضا کریمی', email: 'reza@example.com', role: 'user', is_active: false, created_at: '2024-04-05T00:00:00Z' },
];

export const mockEthnicGroups: EthnicGroup[] = [
  { id: 1, uuid: 'uuid-eg-1', display_name: 'آذری', slug: 'azari', description: 'پوشاک سنتی و رنگارنگ مردم آذربایجان با نقوش هندسی زیبا و رنگ‌های شاد', image: '/images/ethnic/azari.svg', display_order: 1, is_active: true },
  { id: 2, uuid: 'uuid-eg-2', display_name: 'لری', slug: 'lori', description: 'لباس‌های بومی استان‌های لرستان و چهارمحال با پارچه‌های دستباف و رنگ‌های طبیعی', image: '/images/ethnic/lori.svg', display_order: 2, is_active: true },
  { id: 3, uuid: 'uuid-eg-3', display_name: 'کردی', slug: 'kurdi', description: 'جامه‌های رنگین کردستان و کرمانشاه با گلدوزی‌های دستی بی‌نظیر', image: '/images/ethnic/kurdi.svg', display_order: 3, is_active: true },
  { id: 4, uuid: 'uuid-eg-4', display_name: 'بوشهری', slug: 'bushehri', description: 'پوشاک گرمسیری استان بوشهر با طرح‌های دریایی و پارچه‌های سبک', image: '/images/ethnic/bushehri.svg', display_order: 4, is_active: true },
  { id: 5, uuid: 'uuid-eg-5', display_name: 'ترکمن', slug: 'turkmen', description: 'لباس‌های جلفا و گرگان با نقوش ابریشمی و رنگ‌های گرم', image: '/images/ethnic/turkmen.svg', display_order: 5, is_active: true },
  { id: 6, uuid: 'uuid-eg-6', display_name: 'بندری', slug: 'bandari', description: 'جامه‌های مخصوص بنادر جنوبی با برقع و دامن‌های چین‌دار رنگارنگ', image: '/images/ethnic/bandari.svg', display_order: 6, is_active: true },
  { id: 7, uuid: 'uuid-eg-7', display_name: 'عربی', slug: 'arabi', description: 'پوشاک سنتی عرب‌های خوزستان و هرمزگان با دشداشه و عبا', image: '/images/ethnic/arabi.svg', display_order: 7, is_active: true },
  { id: 8, uuid: 'uuid-eg-8', display_name: 'مدرن برنا', slug: 'barna-modern', description: 'طرح‌های ترکیبی مدرن برنا با الهام از سنت ایرانی و نگاه به آینده', image: '/images/ethnic/barna-modern.svg', display_order: 8, is_active: true },
];

export const mockTags: Tag[] = [
  { id: 1, uuid: 'uuid-tag-1', display_name: 'دستباف', slug: 'handmade', usage_count: 8 },
  { id: 2, uuid: 'uuid-tag-2', display_name: 'عروسی', slug: 'wedding', usage_count: 5 },
  { id: 3, uuid: 'uuid-tag-3', display_name: 'ابریشم', slug: 'silk', usage_count: 6 },
  { id: 4, uuid: 'uuid-tag-4', display_name: 'گلدوزی', slug: 'embroidery', usage_count: 10 },
  { id: 5, uuid: 'uuid-tag-5', display_name: 'رنگ طبیعی', slug: 'natural-color', usage_count: 7 },
  { id: 6, uuid: 'uuid-tag-6', display_name: 'جشن', slug: 'celebration', usage_count: 9 },
  { id: 7, uuid: 'uuid-tag-7', display_name: 'روزمره', slug: 'daily', usage_count: 4 },
  { id: 8, uuid: 'uuid-tag-8', display_name: 'کودک', slug: 'kids', usage_count: 3 },
  { id: 9, uuid: 'uuid-tag-9', display_name: 'مجلسی', slug: 'formal', usage_count: 11 },
  { id: 10, uuid: 'uuid-tag-10', display_name: 'فیوژن', slug: 'fusion', usage_count: 6 },
];

export const mockClothing: Clothing[] = [
  {
    id: 1, uuid: 'uuid-clothing-1', display_name: 'لباس عروس آذری طلایی', slug: 'lebas-arus-azari-talai', ethnic_group_id: 1, ethnic_group_display_name: 'آذری',
    category: 'traditional', gender: 'female', size: 'M', color: 'طلایی', material: 'ابریشم',
    condition_status: 'excellent',
    rental_price_per_day: 150000, sale_price: 4500000, deposit_amount: 1000000,
    status: 'available', is_featured: true, is_for_rent: true, is_for_sale: true, view_count: 0,
    images: ['/images/clothing/azari-gold.svg', '/images/ethnic/azari.svg'],
    description: 'لباس عروس تمام دستباف آذری با گلدوزی طلایی. مناسب برای مراسم عروسی و جشن‌های رسمی.',
    created_at: '2024-01-10T00:00:00Z',
  },
  {
    id: 2, uuid: 'uuid-clothing-2', display_name: 'جامه لری دستباف', slug: 'jame-lori-dastbaf', ethnic_group_id: 2, ethnic_group_display_name: 'لری',
    category: 'traditional', gender: 'female', size: 'L', color: 'قرمز و مشکی', material: 'پشم',
    condition_status: 'good',
    rental_price_per_day: 80000, deposit_amount: 500000,
    status: 'available', is_featured: true, is_for_rent: true, is_for_sale: false, view_count: 0,
    images: ['/images/clothing/lori-red.svg'],
    description: 'جامه اصیل لری با نقوش قبیله‌ای دستباف از پشم گوسفند محلی.',
    created_at: '2024-01-15T00:00:00Z',
  },
  {
    id: 3, uuid: 'uuid-clothing-3', display_name: 'کرت کردی ابریشمی', slug: 'kert-kurdi-abrishi', ethnic_group_id: 3, ethnic_group_display_name: 'کردی',
    category: 'traditional', gender: 'female', size: 'S', color: 'سبز زمردی', material: 'ابریشم',
    condition_status: 'excellent',
    rental_price_per_day: 120000, sale_price: 3800000, deposit_amount: 800000,
    status: 'available', is_featured: true, is_for_rent: true, is_for_sale: true, view_count: 0,
    images: ['/images/clothing/kurdi-green.svg', '/images/clothing/placeholder-female.svg'],
    description: 'کرت ابریشمی کردستان با گلدوزی دست و زری‌دوزی. طرح اصیل سنندجی.',
    created_at: '2024-02-01T00:00:00Z',
  },
  {
    id: 4, uuid: 'uuid-clothing-4', display_name: 'لباس بندری رنگارنگ', slug: 'lebas-bandari-rangarang', ethnic_group_id: 6, ethnic_group_display_name: 'بندری',
    category: 'traditional', gender: 'female', size: 'M', color: 'چندرنگ', material: 'کتان',
    condition_status: 'good',
    rental_price_per_day: 70000, deposit_amount: 400000,
    status: 'rented', is_featured: false, is_for_rent: true, is_for_sale: false, view_count: 0,
    images: ['/images/clothing/bandari-purple.svg'],
    description: 'لباس سنتی بندری با برقع دستباف و دامن رنگارنگ.',
    created_at: '2024-02-10T00:00:00Z',
  },
  {
    id: 5, uuid: 'uuid-clothing-5', display_name: 'دشداشه عربی اصیل', slug: 'dashdasha-arabi-asil', ethnic_group_id: 7, ethnic_group_display_name: 'عربی',
    category: 'traditional', gender: 'male', size: 'XL', color: 'سفید', material: 'کتان',
    condition_status: 'excellent',
    rental_price_per_day: 60000, sale_price: 1800000, deposit_amount: 300000,
    status: 'available', is_featured: false, is_for_rent: true, is_for_sale: true, view_count: 0,
    images: ['/images/clothing/arabi-sand.svg'],
    description: 'دشداشه عربی خوزستانی اصیل با دوخت سنتی.',
    created_at: '2024-02-20T00:00:00Z',
  },
  {
    id: 6, uuid: 'uuid-clothing-6', display_name: 'کلاه و جلیقه ترکمن', slug: 'kolah-jelige-torkaman', ethnic_group_id: 5, ethnic_group_display_name: 'ترکمن',
    category: 'traditional', gender: 'male', size: 'M', color: 'قرمز و طلایی', material: 'ابریشم',
    condition_status: 'excellent',
    rental_price_per_day: 50000, sale_price: 2500000, deposit_amount: 500000,
    status: 'available', is_featured: false, is_for_rent: true, is_for_sale: true, view_count: 0,
    images: ['/images/clothing/turkmen-orange.svg'],
    description: 'کلاه پوستی و جلیقه ابریشمی ترکمن با نقوش اصیل.',
    created_at: '2024-03-01T00:00:00Z',
  },
  {
    id: 7, uuid: 'uuid-clothing-7', display_name: 'فیوژن برنا - مدل شمال', slug: 'fusion-barna-model-shomal', ethnic_group_id: 8, ethnic_group_display_name: 'مدرن برنا',
    category: 'fusion', gender: 'female', size: 'M', color: 'کرم و طلایی', material: 'ابریشم مصنوعی',
    condition_status: 'excellent',
    rental_price_per_day: 200000, sale_price: 6000000, deposit_amount: 1500000,
    status: 'available', is_featured: true, is_for_rent: true, is_for_sale: true, view_count: 0,
    images: ['/images/clothing/barna-modern-dark.svg', '/images/clothing/azari-gold.svg'],
    description: 'طراحی اختصاصی برنا با ترکیب عناصر سنتی ایرانی و خطوط مدرن.',
    created_at: '2024-03-10T00:00:00Z',
  },
  {
    id: 8, uuid: 'uuid-clothing-8', display_name: 'لباس بوشهری دریایی', slug: 'lebas-bushehri-daryai', ethnic_group_id: 4, ethnic_group_display_name: 'بوشهری',
    category: 'traditional', gender: 'female', size: 'S', color: 'آبی و سفید', material: 'کتان سبک',
    condition_status: 'good',
    rental_price_per_day: 65000, deposit_amount: 350000,
    status: 'available', is_featured: false, is_for_rent: true, is_for_sale: false, view_count: 0,
    images: ['/images/ethnic/bushehri.svg'],
    description: 'لباس سبک بوشهری با نقوش موج دریا مناسب برای مناطق گرمسیری.',
    created_at: '2024-03-15T00:00:00Z',
  },
  {
    id: 9, uuid: 'uuid-clothing-9', display_name: 'قبا مردانه آذری', slug: 'gaba-mardane-azari', ethnic_group_id: 1, ethnic_group_display_name: 'آذری',
    category: 'traditional', gender: 'male', size: 'L', color: 'مشکی و نقره‌ای', material: 'مخمل',
    condition_status: 'excellent',
    rental_price_per_day: 100000, sale_price: 3200000, deposit_amount: 700000,
    status: 'available', is_featured: false, is_for_rent: true, is_for_sale: true, view_count: 0,
    images: ['/images/clothing/placeholder-male.svg'],
    description: 'قبای مخملی مردانه آذری با دوخت سنتی تبریز.',
    created_at: '2024-03-20T00:00:00Z',
  },
  {
    id: 10, uuid: 'uuid-clothing-10', display_name: 'لباس کودک لری', slug: 'lebas-kodak-lori', ethnic_group_id: 2, ethnic_group_display_name: 'لری',
    category: 'traditional', gender: 'child', size: '8-10 سال', color: 'رنگارنگ', material: 'پنبه',
    condition_status: 'excellent',
    rental_price_per_day: 30000, sale_price: 800000, deposit_amount: 150000,
    status: 'available', is_featured: false, is_for_rent: true, is_for_sale: true, view_count: 0,
    images: ['/images/clothing/lori-red.svg'],
    description: 'لباس رنگارنگ لری مناسب برای کودکان با پارچه پنبه‌ای نرم.',
    created_at: '2024-04-01T00:00:00Z',
  },
  {
    id: 11, uuid: 'uuid-clothing-11', display_name: 'لباس عروس کردی سنندجی', slug: 'lebas-arus-kurdi-sanandaji', ethnic_group_id: 3, ethnic_group_display_name: 'کردی',
    category: 'traditional', gender: 'female', size: 'M', color: 'طلایی و سبز', material: 'ابریشم',
    condition_status: 'excellent',
    rental_price_per_day: 180000, deposit_amount: 1200000,
    status: 'reserved', is_featured: true, is_for_rent: true, is_for_sale: false, view_count: 0,
    images: ['/images/clothing/kurdi-green.svg'],
    description: 'لباس عروس سنتی کردی با گلدوزی طلایی و تاج مخصوص سنندج.',
    created_at: '2024-04-05T00:00:00Z',
  },
  {
    id: 12, uuid: 'uuid-clothing-12', display_name: 'طرح برنا - فیوژن جنوبی', slug: 'tarh-barna-fusion-jonoubi', ethnic_group_id: 8, ethnic_group_display_name: 'مدرن برنا',
    category: 'fusion', gender: 'female', size: 'L', color: 'مرجانی و طلایی', material: 'مخلوط',
    condition_status: 'excellent',
    rental_price_per_day: 220000, sale_price: 7500000, deposit_amount: 2000000,
    status: 'available', is_featured: true, is_for_rent: true, is_for_sale: true, view_count: 0,
    images: ['/images/clothing/bandari-purple.svg'],
    description: 'طرح فیوژن برنا با الهام از پوشاک جنوب ایران.',
    created_at: '2024-04-10T00:00:00Z',
  },
];

export const mockReservations: Reservation[] = [
  { id: 1, user_id: 2, clothing_id: 1, user_display_name: 'علی محمدی', clothing_display_name: 'لباس عروس آذری طلایی', start_date: '2024-06-01', end_date: '2024-06-03', deposit_amount: 1000000, rental_fee: 300000, cleaning_fee: 0, shipping_fee: 0, status: 'confirmed', payment_status: 'deposit_paid', rules_accepted: true, created_at: '2024-05-20T00:00:00Z' },
  { id: 2, user_id: 3, clothing_id: 3, user_display_name: 'فاطمه احمدی', clothing_display_name: 'کرت کردی ابریشمی', start_date: '2024-06-10', end_date: '2024-06-12', deposit_amount: 800000, rental_fee: 240000, cleaning_fee: 0, shipping_fee: 0, status: 'pending', payment_status: 'unpaid', rules_accepted: true, created_at: '2024-06-01T00:00:00Z' },
  { id: 3, user_id: 2, clothing_id: 2, user_display_name: 'علی محمدی', clothing_display_name: 'جامه لری دستباف', start_date: '2024-05-15', end_date: '2024-05-17', deposit_amount: 500000, rental_fee: 160000, cleaning_fee: 0, shipping_fee: 0, status: 'returned', payment_status: 'refunded', rules_accepted: true, created_at: '2024-05-10T00:00:00Z' },
  { id: 4, user_id: 3, clothing_id: 11, user_display_name: 'فاطمه احمدی', clothing_display_name: 'لباس عروس کردی سنندجی', start_date: '2024-07-01', end_date: '2024-07-04', deposit_amount: 1200000, rental_fee: 540000, cleaning_fee: 0, shipping_fee: 0, status: 'active', payment_status: 'deposit_paid', rules_accepted: true, created_at: '2024-06-15T00:00:00Z' },
  { id: 5, user_id: 4, clothing_id: 7, user_display_name: 'رضا کریمی', clothing_display_name: 'فیوژن برنا - مدل شمال', start_date: '2024-04-20', end_date: '2024-04-21', deposit_amount: 1500000, rental_fee: 200000, cleaning_fee: 0, shipping_fee: 0, status: 'cancelled', payment_status: 'unpaid', rules_accepted: true, created_at: '2024-04-18T00:00:00Z' },
];

export const mockOrders: Order[] = [
  { id: 1, order_number: 'BRN-001', user_id: 2, clothing_id: 5, clothing_display_name: 'دشداشه عربی اصیل', amount: 1800000, status: 'delivered', payment_status: 'paid', created_at: '2024-04-01T00:00:00Z' },
  { id: 2, order_number: 'BRN-002', user_id: 3, clothing_id: 6, clothing_display_name: 'کلاه و جلیقه ترکمن', amount: 2500000, status: 'processing', payment_status: 'paid', created_at: '2024-05-05T00:00:00Z' },
  { id: 3, order_number: 'BRN-003', user_id: 2, clothing_id: 9, clothing_display_name: 'قبا مردانه آذری', amount: 3200000, status: 'shipped', payment_status: 'paid', created_at: '2024-05-20T00:00:00Z' },
  { id: 4, order_number: 'BRN-004', user_id: 3, clothing_id: 10, clothing_display_name: 'لباس کودک لری', amount: 800000, status: 'pending', payment_status: 'unpaid', created_at: '2024-06-10T00:00:00Z' },
  { id: 5, order_number: 'BRN-005', user_id: 4, clothing_id: 8, clothing_display_name: 'لباس بوشهری دریایی', amount: 0, status: 'cancelled', payment_status: 'unpaid', created_at: '2024-06-12T00:00:00Z' },
];

export const mockComments: Comment[] = [
  { id: 1, user_id: 2, clothing_id: 1, user_display_name: 'علی محمدی', content: 'لباس فوق‌العاده زیبایی بود. کیفیت دوخت عالی و رنگ‌ها واقعاً جذاب. حتماً دوباره اجاره می‌کنم.', status: 'approved', created_at: '2024-06-05T00:00:00Z' },
  { id: 2, user_id: 3, clothing_id: 3, user_display_name: 'فاطمه احمدی', content: 'خیلی زیبا و اصیل. پارچه ابریشمی با کیفیت بالا. ارسال سریع بود.', status: 'approved', created_at: '2024-06-08T00:00:00Z' },
  { id: 3, user_id: 3, clothing_id: 2, user_display_name: 'فاطمه احمدی', content: 'خوب بود ولی اندازه‌اش کمی بزرگ‌تر از حد معمول بود.', status: 'pending', created_at: '2024-06-12T00:00:00Z' },
  { id: 4, clothing_id: 7, guest_name: 'مریم رضایی', content: 'طراحی برنا واقعاً خلاقانه است. ترکیب سنت و مدرن به بهترین شکل.', status: 'approved', created_at: '2024-06-15T00:00:00Z' },
  { id: 5, clothing_id: 1, guest_name: 'سارا حسینی', content: 'آیا این لباس در سایز S هم موجود است؟', status: 'pending', created_at: '2024-06-18T00:00:00Z' },
];

export const mockMedia: MediaItem[] = [
  { id: 1, filename: 'azari-1.svg', original_name: 'لباس آذری.svg', url: '/images/clothing/azari-gold.svg', cdn_provider: 'local', size: 245000, mime_type: 'image/svg+xml', tags: ['آذری', 'عروسی'], created_at: '2024-01-10T00:00:00Z', type: 'image' },
  { id: 2, filename: 'lori-1.svg', original_name: 'جامه لری.svg', url: '/images/clothing/lori-red.svg', cdn_provider: 'local', size: 312000, mime_type: 'image/svg+xml', tags: ['لری'], created_at: '2024-01-15T00:00:00Z', type: 'image' },
  { id: 3, filename: 'kurdi-1.svg', original_name: 'کرت کردی.svg', url: '/images/clothing/kurdi-green.svg', cdn_provider: 'local', size: 198000, mime_type: 'image/svg+xml', tags: ['کردی', 'ابریشم'], created_at: '2024-02-01T00:00:00Z', type: 'image' },
  { id: 4, filename: 'bandari-1.svg', original_name: 'لباس بندری.svg', url: '/images/clothing/bandari-purple.svg', cdn_provider: 'local', size: 276000, mime_type: 'image/svg+xml', tags: ['بندری'], created_at: '2024-02-10T00:00:00Z', type: 'image' },
  { id: 5, filename: 'turkmen-1.svg', original_name: 'ترکمن.svg', url: '/images/clothing/turkmen-orange.svg', cdn_provider: 'local', size: 321000, mime_type: 'image/svg+xml', tags: ['ترکمن'], created_at: '2024-03-01T00:00:00Z', type: 'image' },
  { id: 6, filename: 'barna-fusion-1.svg', original_name: 'فیوژن برنا.svg', url: '/images/clothing/barna-modern-dark.svg', cdn_provider: 'local', size: 289000, mime_type: 'image/svg+xml', tags: ['برنا', 'فیوژن', 'مدرن'], created_at: '2024-03-10T00:00:00Z', type: 'image' },
  { id: 7, filename: 'arabic-1.svg', original_name: 'دشداشه عربی.svg', url: '/images/clothing/arabi-sand.svg', cdn_provider: 'local', size: 234000, mime_type: 'image/svg+xml', tags: ['عربی'], created_at: '2024-03-20T00:00:00Z', type: 'image' },
  { id: 8, filename: 'bushehri-1.svg', original_name: 'بوشهری.svg', url: '/images/ethnic/bushehri.svg', cdn_provider: 'local', size: 267000, mime_type: 'image/svg+xml', tags: ['بوشهری', 'جنوب'], created_at: '2024-04-01T00:00:00Z', type: 'image' },
];

export const mockPages: Page[] = [
  { id: 1, uuid: 'uuid-page-1', display_name: 'درباره ما', slug: 'about', content: '<h2>داستان مزون برنا ایران</h2><p>مزون برنا ایران در سال ۱۳۹۸ با هدف حفظ و احیای میراث پوشاک سنتی اقوام ایرانی تأسیس شد.</p><h3>ارزش‌های ما</h3><ul><li>احترام به سنت و میراث فرهنگی</li><li>کیفیت در دوخت و پارچه</li><li>دسترسی آسان به پوشاک اقوام</li><li>حمایت از هنرمندان بومی</li></ul>', meta_description: 'آشنایی با مزون برنا ایران', is_published: true, updated_at: '2024-01-01T00:00:00Z' },
  { id: 2, uuid: 'uuid-page-2', display_name: 'داستان برنا', slug: 'story', content: '<h2>از ایده تا واقعیت</h2><p>ایده تأسیس برنا از یک سفر به کردستان شروع شد.</p><p>۵۰۰+ طرح ثبت شده | ۸ گروه قومی | ۱۰۰۰+ مشتری راضی | ۵ سال تجربه</p>', meta_description: 'داستان برنا', is_published: true, updated_at: '2024-01-01T00:00:00Z' },
  { id: 3, uuid: 'uuid-page-3', display_name: 'تماس با ما', slug: 'contact', content: '<p>آدرس: تهران، خیابان ولیعصر، پلاک ۱۲۳</p><p>تلفن: ۰۲۱-۱۲۳۴۵۶۷۸</p><p>ایمیل: info@barna.ir</p>', meta_description: 'تماس با مزون برنا ایران', is_published: true, updated_at: '2024-01-01T00:00:00Z' },
  { id: 4, uuid: 'uuid-page-4', display_name: 'صفحه اصلی', slug: 'home', content: '<p>خوش آمدید</p>', meta_description: 'مزون برنا ایران', is_published: true, updated_at: '2024-01-01T00:00:00Z' },
];

export const mockThemeSettings: ThemeSettings[] = [
  { key: 'primary_color', value: '#C9A84C', label: 'رنگ اصلی', type: 'color' },
  { key: 'accent_color', value: '#8B1A2F', label: 'رنگ برجسته', type: 'color' },
  { key: 'dark_color', value: '#1E2A4A', label: 'رنگ تیره', type: 'color' },
  { key: 'background_color', value: '#FAF7F2', label: 'رنگ پس‌زمینه', type: 'color' },
  { key: 'text_color', value: '#1a1a1a', label: 'رنگ متن', type: 'color' },
  { key: 'primary_font', value: 'Vazirmatn', label: 'فونت اصلی (فارسی)', type: 'font' },
  { key: 'secondary_font', value: 'Playfair Display', label: 'فونت ثانوی (انگلیسی)', type: 'font' },
  { key: 'border_radius', value: '8px', label: 'شعاع گوشه‌ها', type: 'text' },
  { key: 'hero_height', value: '600px', label: 'ارتفاع بنر اصلی', type: 'text' },
  { key: 'card_shadow', value: '0 4px 20px rgba(0,0,0,0.08)', label: 'سایه کارت‌ها', type: 'text' },
] as unknown as ThemeSettings[];

export const mockSettings = [
  { key: 'site_name', value: 'مزون برنا ایران', description: 'نام سایت' },
  { key: 'site_tagline', value: 'پوشاک سنتی اقوام ایران', description: 'شعار سایت' },
  { key: 'contact_email', value: 'info@barna.ir', description: 'ایمیل تماس' },
  { key: 'contact_phone', value: '021-12345678', description: 'تلفن تماس' },
  { key: 'address', value: 'تهران، خیابان ولیعصر، پلاک ۱۲۳', description: 'آدرس' },
  { key: 'instagram', value: '@barna.iran', description: 'اینستاگرام' },
  { key: 'telegram', value: '@barna_iran', description: 'تلگرام' },
  { key: 'working_hours', value: 'شنبه تا پنجشنبه ۱۰ تا ۲۰', description: 'ساعت کاری' },
  { key: 'min_rental_days', value: '1', description: 'حداقل روز اجاره' },
  { key: 'max_rental_days', value: '30', description: 'حداکثر روز اجاره' },
];

export const mockCommunityPosts: CommunityPost[] = [
  { id: 1, user_id: 2, user_display_name: 'علی محمدی', content: 'تازه لباس عروس آذری رو اجاره کردم برای مراسم. کیفیت فوق‌العاده بود!', images: ['/images/clothing/azari-gold.svg'], status: 'approved', created_at: '2024-06-05T00:00:00Z' },
  { id: 2, user_id: 3, user_display_name: 'فاطمه احمدی', content: 'کرت کردی رو برای جشن خریدم. طراحی برنا واقعاً با سنت تلفیق کرده.', status: 'approved', created_at: '2024-06-10T00:00:00Z' },
  { id: 3, user_display_name: 'مریم رضایی', content: 'آیا کسی اطلاعاتی درباره لباس ترکمن دارد؟ می‌خوام برای یه پروژه عکاسی استفاده کنم.', status: 'approved', created_at: '2024-06-15T00:00:00Z' },
  { id: 4, user_display_name: 'سارا حسینی', content: 'عاشق طرح‌های فیوژن برنا شدم. سنت و مدرنیته رو به زیباترین شکل ترکیب کردن.', status: 'pending', created_at: '2024-06-18T00:00:00Z' },
];

export const mockRequests: Request[] = [
  { id: 1, guest_name: 'مهدی صادقی', guest_email: 'mahdi@example.com', guest_phone: '09131234567', type: 'custom_design', message: 'آیا امکان سفارش لباس اختصاصی برای عروسی با طرح آذری وجود دارد؟', status: 'responded', admin_response: 'بله، امکان طراحی اختصاصی وجود دارد. لطفاً با ما تماس بگیرید.', created_at: '2024-05-10T00:00:00Z' },
  { id: 2, guest_name: 'زهرا کریمی', guest_email: 'zahra@example.com', type: 'information', message: 'می‌خوام برای مراسم فارغ‌التحصیلیم لباس کردی اجاره کنم.', status: 'in_review', created_at: '2024-06-01T00:00:00Z' },
  { id: 3, guest_name: 'حسین علوی', guest_email: 'hossein@example.com', guest_phone: '09351234567', type: 'collaboration', message: 'برای یک پروژه مستندسازی، امکان همکاری با شما وجود دارد؟', status: 'pending', created_at: '2024-06-18T00:00:00Z' },
  { id: 4, guest_name: 'نسرین محمودی', guest_email: 'nasrin@example.com', type: 'information', message: 'سایت عالیه. ممنون از تیم برنا', status: 'pending', created_at: '2024-06-20T00:00:00Z' },
];
