'use client';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { clothingApi } from '@/lib/api/clothing';
import { ethnicGroupsApi } from '@/lib/api/ethnicGroups';
import { queryKeys } from '@/lib/queryKeys';
import HeroSection from '@/components/site/HeroSection';
import { EthnicGroup, Clothing } from '@/types';
import ClothingCard from '@/components/site/ClothingCard';
import EthnicGroupCard from '@/components/site/EthnicGroupCard';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useTranslation } from '@/lib/i18n';

const services = [
  ['🛍️', 'فروش آنلاین', 'خرید لباس اصیل، تلفیقی و طرح‌های اختصاصی برنا با اطلاعات ارسال و لینک پیگیری.'],
  ['🤝', 'امانت و اجاره', 'رزرو روز و ساعت، تایید قوانین، بیعانه، محاسبه کرایه، خشکشویی و ارسال.'],
  ['✂️', 'طراحی و بازطراحی', 'زنده‌سازی لباس‌های قدیمی خانوادگی در کمد لباس برنا با عکس قبل و بعد.'],
  ['🎭', 'ایونت و فرهنگ‌سازی', 'برگزاری رویدادهای بعد از سفرها برای معرفی لباس‌های ایرانی و تلفیق با مدرنیته.'],
];

const partners = ['فروشگاه‌های اکسسوری سنتی', 'پارچه‌فروشی‌های سراسر کشور', 'آتلیه‌های عکاسی', 'طلافروشی‌ها', 'میکاپ‌آرتیست‌ها', 'هنرمندان و خیاطان محلی'];

export default function HomePage() {
  const { t } = useTranslation();
  const { data: featured } = useQuery({ queryKey: queryKeys.clothing.list({ is_featured: true, limit: 6 }), queryFn: () => clothingApi.list({ is_featured: true, limit: 6 }) });
  const { data: ethnicGroups } = useQuery({ queryKey: queryKeys.ethnicGroups.list(), queryFn: () => ethnicGroupsApi.list() });
  const ethnicList = Array.isArray(ethnicGroups) ? ethnicGroups : ethnicGroups?.data || [];

  return (
    <>
      <HeroSection />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10"><h2 className="section-title">برای هر لباس، یک روایت جدا</h2><p className="section-subtitle">ترکی، لری، جمی، ترکمن، بندری، کردی، عربی، مدرن، تلفیق و طرح‌های اختصاصی برنا</p></div>
        {!ethnicGroups ? <LoadingSpinner className="h-32" /> : <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">{ethnicList.map((g: EthnicGroup) => <EthnicGroupCard key={g.id} group={g} />)}</div>}
      </section>
      <section className="bg-barna-cream py-16"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="text-center mb-10"><h2 className="section-title">لباس‌های ویژه برای فروش، امانت و اجاره</h2><p className="section-subtitle">داده‌های نمونه برای نسخه mock، آماده اتصال به API و CMS</p></div>{!featured ? <LoadingSpinner className="h-48" /> : <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">{featured.data?.map((c: Clothing) => <ClothingCard key={c.id} clothing={c} compact />)}</div>}<div className="text-center mt-8"><Link href="/clothing" className="btn-primary">{t('home.viewAllClothing')}</Link></div></div></section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"><div className="grid md:grid-cols-4 gap-6">{services.map(([icon,title,desc]) => <div key={title} className="card p-6 hover:-translate-y-1 transition"><div className="text-4xl mb-4">{icon}</div><h3 className="font-bold text-barna-dark mb-3">{title}</h3><p className="text-sm leading-7 text-barna-gray">{desc}</p></div>)}</div></section>
      <section className="bg-barna-dark py-16 text-white"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center"><div><h2 className="text-3xl font-black text-primary-400 mb-5">هدف برنا؛ ماندگاری لباس اقوام ایران</h2><p className="leading-9 text-gray-300">برنا با تحقیقات میدانی، سفرهای هدفمند پیج سفری، همکاری با افراد محلی و طراحی اقتصادی تلاش می‌کند لباس اقوام ایران فراموش نشود و برای همه سلیقه‌ها قابل استفاده باشد.</p></div><div className="grid grid-cols-2 gap-3">{partners.map(p => <span key={p} className="rounded-full bg-white/10 border border-white/10 px-4 py-3 text-center text-sm">{p}</span>)}</div></div></section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"><div className="rounded-[2rem] bg-white border border-primary-100 shadow-sm p-8 md:p-12 text-center"><h2 className="section-title">سه مرجع الهام برای مزون آنلاین</h2><p className="section-subtitle">ساختار از بهترین الگوهای boutique ecommerce، rental wardrobe و editorial storytelling الهام گرفته شده و در قالب مستقل برنا پیاده‌سازی شده است.</p><div className="grid md:grid-cols-3 gap-4 mt-8">{['Rent the Runway: رزرو و اجاره', 'Moda Operandi: تجربه لوکس و editorial', 'Etsy: جامعه هنرمندان و محصولات دست‌ساز'].map(x => <div key={x} className="rounded-2xl bg-barna-cream p-5 font-semibold text-barna-dark">{x}</div>)}</div></div></section>
    </>
  );
}
