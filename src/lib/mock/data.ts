import type { User, EthnicGroup, Tag, Clothing, Reservation, Order, Comment, MediaItem, Page, ThemeSettings, CommunityPost, Request } from '@/types';

export const mockUsers: User[] = [
  { id: 1, name: 'مدیر سیستم', email: 'admin@barna.ir', phone: '09121234567', role: 'admin', is_active: true, created_at: '2024-01-01T00:00:00Z' },
  { id: 2, name: 'علی محمدی', email: 'user@barna.ir', phone: '09361234567', role: 'user', is_active: true, created_at: '2024-02-15T00:00:00Z' },
  { id: 3, name: 'فاطمه احمدی', email: 'fateme@example.com', phone: '09151234567', role: 'user', is_active: true, created_at: '2024-03-10T00:00:00Z' },
  { id: 4, name: 'رضا کریمی', email: 'reza@example.com', role: 'user', is_active: false, created_at: '2024-04-05T00:00:00Z' },
];

export const mockEthnicGroups: EthnicGroup[] = [
  { id: 1, name: 'آذری', slug: 'azari', description: 'پوشاک سنتی و رنگارنگ مردم آذربایجان با نقوش هندسی زیبا و رنگ‌های شاد', image_url: 'https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=800', clothing_count: 12 },
  { id: 2, name: 'لری', slug: 'lori', description: 'لباس‌های بومی استان‌های لرستان و چهارمحال با پارچه‌های دستباف و رنگ‌های طبیعی', image_url: 'https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=800', clothing_count: 8 },
  { id: 3, name: 'کردی', slug: 'kurdi', description: 'جامه‌های رنگین کردستان و کرمانشاه با گلدوزی‌های دستی بی‌نظیر', image_url: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800', clothing_count: 15 },
  { id: 4, name: 'بوشهری', slug: 'bushehri', description: 'پوشاک گرمسیری استان بوشهر با طرح‌های دریایی و پارچه‌های سبک', image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', clothing_count: 6 },
  { id: 5, name: 'ترکمن', slug: 'turkmen', description: 'لباس‌های جلفا و گرگان با نقوش ابریشمی و رنگ‌های گرم', image_url: 'https://images.unsplash.com/photo-1503174971373-b1f69850bded?w=800', clothing_count: 10 },
  { id: 6, name: 'بندری', slug: 'bandari', description: 'جامه‌های مخصوص بنادر جنوبی با برقع و دامن‌های چین‌دار رنگارنگ', image_url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800', clothing_count: 9 },
  { id: 7, name: 'عربی', slug: 'arabi', description: 'پوشاک سنتی عرب‌های خوزستان و هرمزگان با دشداشه و عبا', image_url: 'https://images.unsplash.com/photo-1563178406-4cdc2923acbc?w=800', clothing_count: 7 },
  { id: 8, name: 'مدرن برنا', slug: 'barna-modern', description: 'طرح‌های ترکیبی مدرن برنا با الهام از سنت ایرانی و نگاه به آینده', image_url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800', clothing_count: 20 },
];

export const mockTags: Tag[] = [
  { id: 1, name: 'دستباف', slug: 'handmade', usage_count: 8 },
  { id: 2, name: 'عروسی', slug: 'wedding', usage_count: 5 },
  { id: 3, name: 'ابریشم', slug: 'silk', usage_count: 6 },
  { id: 4, name: 'گلدوزی', slug: 'embroidery', usage_count: 10 },
  { id: 5, name: 'رنگ طبیعی', slug: 'natural-color', usage_count: 7 },
  { id: 6, name: 'جشن', slug: 'celebration', usage_count: 9 },
  { id: 7, name: 'روزمره', slug: 'daily', usage_count: 4 },
  { id: 8, name: 'کودک', slug: 'kids', usage_count: 3 },
  { id: 9, name: 'مجلسی', slug: 'formal', usage_count: 11 },
  { id: 10, name: 'فیو\u0�98ن', slug: 'fusion', usage_count: 6 },
];

export const mockClothing: Clothing[] = [
  {
    id: 1, title: 'لباس عروس آذری طلایی', ethnic_group_id: 1, ethnic_group_name: 'آذری',
    category: 'لباس عروسی', gender: 'female', size: 'M', color: 'طلایی', fabric: 'ابریشم',
    origin_city: 'تبریز', condition: 'excellent',
    rental_price_per_day: 150000, sale_price: 4500000, deposit_amount: 1000000,
    status: 'available', is_featured: true,
    images: ['https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=800', 'https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=800'],
    description: 'لباس عروس تمام دستباف آذری با گلدوزی طلایی. مناسب برای مراسم عروسی و جشن‌های رسمی.',
    created_at: '2024-01-10T00:00:00Z',
  },
  {
    id: 2, title: 'جامه لری دستباف', ethnic_group_id: 2, ethnic_group_name: 'لری',
    category: 'لباس سنتی', gender: 'female', size: 'L', color: 'قرمز و مشکی', fabric: 'پشم',
    origin_city: 'خرم‌آباد', condition: 'good',
    rental_price_per_day: 80000, deposit_amount: 500000,
    status: 'available', is_featured: true,
    images: ['https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800'],
    description: 'جامه اصیل لری با نقوش قبیله‌ای دستباف از پشم گوسفند محلی.',
    created_at: '2024-01-15T00:00:00Z',
  },
  {
    id: 3, title: 'کرت کردی ابریشمی', ethnic_group_id: 3, ethnic_group_name: 'کردی',
    category: 'لباس مجلسی', gender: 'female', size: 'S', color: 'سبز زمردی', fabric: 'ابریشم',
    origin_city: 'سنندج', condition: 'excellent',
    rental_price_per_day: 120000, sale_price: 3800000, deposit_amount: 800000,
    status: 'available', is_featured: true,
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', 'https://images.unsplash.com/photo-1503174971373-b1f69850bded?w=800'],
    description: 'کرت ابریشمی کردستان با گلدوزی دست و زری‌دوزی. طرح اصیل سنندجی.',
    created_at: '2024-02-01T00:00:00Z',
  },
  {
    id: 4, title: 'لباس بندری رنگارنگ', ethnic_group_id: 6, ethnic_group_name: 'بندری',
    category: 'لباس سنتی', gender: 'female', size: 'M', color: 'چندرنگ', fabric: 'کتان',
    origin_city: 'بندرعباس', condition: 'good',
    rental_price_per_day: 70000, deposit_amount: 400000,
    status: 'rented', is_featured: false,
    images: ['https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800'],
    description: 'لباس سنتی بندری با برقع دستباف و دامن رنگارنگ.',
    created_at: '2024-02-10T00:00:00Z',
  },
  {
    id: 5, title: 'دشداشه عربی اصیل', ethnic_group_id: 7, ethnic_group_name: 'عربی',
    category: 'لباس سنتی', gender: 'male', size: 'XL', color: 'سفید', fabric: 'کتان',
    origin_city: 'اهواز', condition: 'excellent',
    rental_price_per_day: 60000, sale_price: 1800000, deposit_amount: 300000,
    status: 'available', is_featured: false,
    images: ['https://images.unsplash.com/photo-1563178406-4cdc2923acbc?w=800'],
    description: 'دشداشه عربی خوزستانی اصیل با دوخت سنتی.',
    created_at: '2024-02-20T00:00:00Z',
  },
  {
    id: 6, title: 'کلاه و جلیقه ترکمن', ethnic_group_id: 5, ethnic_group_name: 'ترکمن',
    category: 'اکسسوری', gender: 'male', size: 'M', color: 'قرمز و طلایی', fabric: 'ابریشم',
    origin_city: 'گرگان', condition: 'excellent',
    rental_price_per_day: 50000, sale_price: 2500000, deposit_amount: 500000,
    status: 'available', is_featured: false,
    images: ['https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800'],
    description: 'کلاه پوستی و جلیقه ابریشمی ترکمن با نقوش اصیل.',
    created_at: '2024-03-01T00:00:00Z',
  },
  {
    id: 7, title: 'فیوژن برنا - مدل شمال', ethnic_group_id: 8, ethnic_group_name: 'مدرن برنا',
    category: 'فیوژن', gender: 'female', size: 'M', color: 'کرم و طلایی', fabric: 'ابریشم مصنوعی',
    origin_city: 'تهران', condition: 'new',
    rental_price_per_day: 200000, sale_price: 6000000, deposit_amount: 1500000,
    status: 'available', is_featured: true,
    images: ['https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=800', 'https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=800'],
    description: 'طراحی اختصاصی برنا با ترکیب عناصر سنتی ایرانی و خطوط مدرن.',
    created_at: '2024-03-10T00:00:00Z',
  },
  {
    id: 8, title: 'لباس بوشهری دریایی', ethnic_group_id: 4, ethnic_group_name: 'بوشهری',
    category: 'لباس سنتی', gender: 'female', size: 'S', color: 'آبی و سفید', fabric: 'کتان سبک',
    origin_city: 'بوشهر', condition: 'good',
    rental_price_per_day: 65000, deposit_amount: 350000,
    status: 'available', is_featured: false,
    images: ['https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800'],
    description: 'لباس سبک بوشهری با نقوش موج دریا مناسب برای مناطق گرمسیری.',
    created_at: '2024-03-15T00:00:00Z',
  },
  {
    id: 9, title: 'قبا مردانه آذری', ethnic_group_id: 1, ethnic_group_name: 'آذری',
    category: 'لباس رسمی', gender: 'male', size: 'L', color: 'مشکی و نقره‌ای', fabric: 'مخمل',
    origin_city: 'تبریز', condition: 'excellent',
    rental_price_per_day: 100000, sale_price: 3200000, deposit_amount: 700000,
    status: 'available', is_featured: false,
    images: ['https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800'],
    description: 'قبای مخملی مردانه آذری با دوخت سنتی تبریز.',
    created_at: '2024-03-20T00:00:00Z',
  },
  {
    id: 10, title: 'لباس کودک لری', ethnic_group_id: 2, ethnic_group_name: 'لری',
    category: 'لباس روزمره', gender: 'kids', size: '8-10 سال', color: 'رنگارنگ', fabric: 'پنبه',
    origin_city: 'بروجرد', condition: 'new',
    rental_price_per_day: 30000, sale_price: 800000, deposit_amount: 150000,
    status: 'available', is_featured: false,
    images: ['https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800'],
    description: 'لباس رنگارنگ لری مناسب برای کودکان با پارچه پنبه‌ای نرم.',
    created_at: '2024-04-01T00:00:00Z',
  },
  {
    id: 11, title: 'لباس عروس کردی سنندجی', ethnic_group_id: 3, ethnic_group_name: 'کردی',
    category: 'لباس عروسی', gender: 'female', size: 'M', color: 'طلایی و سبز', fabric: 'ابریشم',
    origin_city: 'سنندج', condition: 'excellent',
    rental_price_per_day: 180000, deposit_amount: 1200000,
    status: 'reserved', is_featured: true,
    images: ['https://images.unsplash.com/photo-1571689936114-b05f52b4c3da?w=800'],
    description: 'لباس عروس سنتی کردی با گلدوزی طلایی و تاج مخصوص سنندج.',
    created_at: '2024-04-05T00:00:00Z',
  },
  {
    id: 12, title: 'طرح برنا - فیوژن جنوبی', ethnic_group_id: 8, ethnic_group_name: 'مدرن برنا',
    category: 'فیوژن', gender: 'female', size: 'L', color: 'مرجانی و طلایی', fabric: 'مخلوط',
    origin_city: 'تهران', condition: 'new',
    rental_price_per_day: 220000, sale_price: 7500000, deposit_amount: 2000000,
    status: 'available', is_featured: true,
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800'],
    description: 'طرح فیوژن برنا با الهام از پوشاک جنوب ایران.',
    created_at: '2024-04-10T00:00:00Z',
  },
];

export const mockReservations: Reservation[] = [
  { id: 1, user_id: 2, clothing_id: 1, user_name: 'علی محمدی', clothing_title: 'لباس عروس آذری طلایی', start_date: '2024-06-01', end_date: '2024-06-03', deposit_amount: 1000000, rental_total: 300000, total_amount: 1300000, status: 'approved', rules_accepted: true, created_at: '2024-05-20T00:00:00Z' },
  { id: 2, user_id: 3, clothing_id: 3, user_name: 'فاطمه احمدی', clothing_title: 'کرت کردی ابریشمی', start_date: '2024-06-10', end_date: '2024-06-12', deposit_amount: 800000, rental_total: 240000, total_amount: 1040000, status: 'pending', rules_accepted: true, created_at: '2024-06-01T00:00:00Z' },
  { id: 3, user_id: 2, clothing_id: 2, user_name: 'علی محمدی', clothing_title: 'جامه لری دستباف', start_date: '2024-05-15', end_date: '2024-05-17', deposit_amount: 500000, rental_total: 160000, total_amount: 660000, status: 'returned', rules_accepted: true, created_at: '2024-05-10T00:00:00Z' },
  { id: 4, user_id: 3, clothing_id: 11, user_name: 'فاطمه احمدی', clothing_title: 'لباس عروس کردی سنندجی', start_date: '2024-07-01', end_date: '2024-07-04', deposit_amount: 1200000, rental_total: 540000, total_amount: 1740000, status: 'active', rules_accepted: true, created_at: '2024-06-15T00:00:00Z' },
  { id: 5, user_id: 4, clothing_id: 7, user_name: 'رضا کریمی', clothing_title: 'فیوژن برنا - مدل شمال', start_date: '2024-04-20', end_date: '2024-04-21', deposit_amount: 1500000, rental_total: 200000, total_amount: 1700000, status: 'cancelled', rules_accepted: true, created_at: '2024-04-18T00:00:00Z' },
];

export const mockOrders: Order[] = [
  { id: 1, user_id: 2, clothing_id: 5, user_name: 'علی محمدی', clothing_title: 'دشداشه عربی اصیل', sale_price: 1800000, status: 'delivered', created_at: '2024-04-01T00:00:00Z' },
  { id: 2, user_id: 3, clothing_id: 6, user_name: 'فاطمه احمدی', clothing_title: 'کلاه و جلیقه ترکمن', sale_price: 2500000, status: 'paid', created_at: '2024-05-05T00:00:00Z' },
  { id: 3, user_id: 2, clothing_id: 9, user_name: 'علی محمدی', clothing_title: 'قبا مردانه آذری', sale_price: 3200000, status: 'shipped', created_at: '2024-05-20T00:00:00Z' },
  { id: 4, user_id: 3, clothing_id: 10, user_name: 'فاطمه احمدی', clothing_title: 'لباس کودک لری', sale_price: 800000, status: 'pending', created_at: '2024-06-10T00:00:00Z' },
  { id: 5, user_id: 4, clothing_id: 8, user_name: 'رضا کریمی', clothing_title: 'لباس بوشهری دریایی', sale_price: 0, status: 'cancelled', created_at: '2024-06-12T00:00:00Z' },
];

export const mockComments: Comment[] = [
  { id: 1, user_id: 2, clothing_id: 1, user_name: 'علی محمدی', clothing_title: 'لباس عروس آذری طلایی', author_name: 'علی محمدی', content: 'لباس فوق‌العاده زیبایی بود. کیفیت دوخت عالی و رنگ‌ها واقعاً جذاب. حتماً دوباره اجاره می‌کنم.', status: 'approved', created_at: '2024-06-05T00:00:00Z' },
  { id: 2, user_id: 3, clothing_id: 3, user_name: 'فاطمه احمدی', clothing_title: 'کرت کردی ابریشمی', author_name: 'فاطمه احمدی', content: 'خیلی زیبا و اصیل. پارچه ابریشمی با کیفیت بالا. ارسال سریع بود.', status: 'approved', created_at: '2024-06-08T00:00:00Z' },
  { id: 3, user_id: 3, clothing_id: 2, user_name: 'فاطمه احمدی', clothing_title: 'جامه لری دستباف', author_name: 'فاطمه احمدی', content: 'خوب بود ولی اندازه‌اش کمی بزرگ‌تر از حد معمول بود.', status: 'pending', created_at: '2024-06-12T00:00:00Z' },
  { id: 4, clothing_id: 7, author_name: 'مریم رضایی', content: 'طراحی برنا واقعاً خلاقانه است. ترکیب سنت و مدرن به بهترین شکل.', status: 'approved', created_at: '2024-06-15T00:00:00Z' },
  { id: 5, clothing_id: 1, author_name: 'سارا حسینی', content: 'آیا این لباس در سایز S هم موجود است؟', status: 'pending', created_at: '2024-06-18T00:00:00Z' },
];

export const mockMedia: MediaItem[] = [
  { id: 1, filename: 'azari-1.jpg', original_name: 'لباس آذری.jpg', url: 'https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=800', cdn_provider: 'local', size: 245000, mime_type: 'image/jpeg', tags: ['آذری', 'عروسی'], created_at: '2024-01-10T00:00:00Z' },
  { id: 2, filename: 'lori-1.jpg', original_name: 'جامه لری.jpg', url: 'https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=800', cdn_provider: 'local', size: 312000, mime_type: 'image/jpeg', tags: ['لری'], created_at: '2024-01-15T00:00:00Z' },
  { id: 3, filename: 'kurdi-1.jpg', original_name: 'کرت کردی.jpg', url: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800', cdn_provider: 'local', size: 198000, mime_type: 'image/jpeg', tags: ['کردی', 'ابریشم'], created_at: '2024-02-01T00:00:00Z' },
  { id: 4, filename: 'bandari-1.jpg', original_name: 'لباس بندری.jpg', url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800', cdn_provider: 'local', size: 276000, mime_type: 'image/jpeg', tags: ['بندری'], created_at: '2024-02-10T00:00:00Z' },
  { id: 5, filename: 'turkmen-1.jpg', original_name: 'ترکمن.jpg', url: 'https://images.unsplash.com/photo-1503174971373-b1f69850bded?w=800', cdn_provider: 'local', size: 321000, mime_type: 'image/jpeg', tags: ['ترکمن'], created_at: '2024-03-01T00:00:00Z' },
  { id: 6, filename: 'barna-fusion-1.jpg', original_name: 'فیوژن برنا.jpg', url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800', cdn_provider: 'local', size: 289000, mime_type: 'image/jpeg', tags: ['برنا', 'فیوژن', 'مدرن'], created_at: '2024-03-10T00:00:00Z' },
  { id: 7, filename: 'arabic-1.jpg', original_name: 'دشداشه عربی.jpg', url: 'https://images.unsplash.com/photo-1563178406-4cdc2923acbc?w=800', cdn_provider: 'local', size: 234000, mime_type: 'image/jpeg', tags: ['عربی'], created_at: '2024-03-20T00:00:00Z' },
  { id: 8, filename: 'bushehri-1.jpg', original_name: 'بوشهری.jpg', url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', cdn_provider: 'local', size: 267000, mime_type: 'image/jpeg', tags: ['بوشهری', 'جنوب'], created_at: '2024-04-01T00:00:00Z' },
];

export const mockPages: Page[] = [
  { id: 1, title: 'درباره ما', slug: 'about', content: '<h2>داستان مزون برنا ایران</h2><p>مزون برنا ایران در سال ۱۳۹۸ با هدف حفظ و احیای میراث پوشاک سنتی اقوام ایرانی تأسیس شد.</p><h3>ارزش‌های ما</h3><ul><li>احترام به سنت و میراث فرهنگی</li><li>کیفیت در دوخت و پارچه</li><li>دسترسی آسان به پوشاک اقوام</li><li>حمایت از هنرمندان بومی</li></ul>', meta_description: 'آشنایی با مزون برنا ایران', is_published: true },
  { id: 2, title: 'داستان برنا', slug: 'story', content: '<h2>از ایده تا واقعیت</h2><p>ایده تأسیس برنا از یک سفر به کردستان شروع شد.</p><p>۵۰۰+ طرح ثبت شده | ۸ گروه قومی | ۱۰۰۰+ مشتری راضی | ۵ سال تجربه</p>', meta_description: 'داستان برنا', is_published: true },
  { id: 3, title: 'تماس با ما', slug: 'contact', content: '<p>آدرس: تهران، خیابان ولیعصر، پلاک ۱۲۳</p><p>تلفن: ۰۲۱-۱۲۳۴۵۶۷۸</p><p>ایمیل: info@barna.ir</p>', meta_description: 'تماس با مزون برنا ایران', is_published: true },
  { id: 4, title: 'صفحه اصلی', slug: 'home', content: '<p>خوش آمدید</p>', meta_description: 'مزون برنا ایران', is_published: true },
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
];

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
  { id: 1, user_id: 2, author_name: 'علی محمدی', content: 'تازه لباس عروس آذری رو اجاره کردم برای مراسم. کیفیت فوق‌العاده بود!', image_url: 'https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=400', status: 'approved', created_at: '2024-06-05T00:00:00Z' },
  { id: 2, user_id: 3, author_name: 'فاطمه احمدی', content: 'کرت کردی رو برای جشن خریدم. طراحی برنا واقعاً با سنت تلفیق کرده.', status: 'approved', created_at: '2024-06-10T00:00:00Z' },
  { id: 3, author_name: 'مریم رضایی', content: 'آیا کسی اطلاعاتی درباره لباس ترکمن دارد؟ می‌خوام برای یه پروژه عکاسی استفاده کنم.', status: 'approved', created_at: '2024-06-15T00:00:00Z' },
  { id: 4, author_name: 'سارا حسینی', content: 'عاشق طرح‌های فیوژن برنا شدم. سنت و مدرنیته رو به زیباترین شکل ترکیب کردن.', status: 'pending', created_at: '2024-06-18T00:00:00Z' },
];

export const mockRequests: Request[] = [
  { id: 1, name: 'مهدی صادقی', email: 'mahdi@example.com', phone: '09131234567', ethnic_group: 'آذری', message: 'آیا امکان سفارش لباس اختصاصی برای عروسی با طرح آذری وجود دارد؟', status: 'responded', admin_response: 'بله، امکان طراحی اختصاصی وجود دارد. لطفاً با ما تماس بگیرید.', created_at: '2024-05-10T00:00:00Z' },
  { id: 2, name: 'زهرا کریمی', email: 'zahra@example.com', ethnic_group: 'کردی', message: 'می‌خوام برای مراسم فارغ‌التحصیلیم لباس کردی اجاره کنم.', status: 'read', created_at: '2024-06-01T00:00:00Z' },
  { id: 3, name: 'حسین علوی', email: 'hossein@example.com', phone: '09351234567', ethnic_group: 'بندری', message: 'برای یک پروژه مستندسازی، امکان همکاری با شما وجود دارد؟', status: 'new', created_at: '2024-06-18T00:00:00Z' },
  { id: 4, name: 'نسرین محمودی', email: 'nasrin@example.com', message: 'سایت عالیه. ممنون از تیم برنا', status: 'new', created_at: '2024-06-20T00:00:00Z' },
];
