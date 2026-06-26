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

export default function HomePage() {
  const { data: featured } = useQuery({
    queryKey: queryKeys.clothing.list({ is_featured: true, limit: 6 }),
    queryFn: () => clothingApi.list({ is_featured: true, limit: 6 }),
  });
  const { data: ethnicGroups } = useQuery({
    queryKey: queryKeys.ethnicGroups.list(),
    queryFn: () => ethnicGroupsApi.list(),
  });

  return (
    <>
      <HeroSection />

      {/* Ethnic groups */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="section-title">اقوام ایران</h2>
          <p className="section-subtitle">لباس‌های سنتی از سراسر ایران زمین</p>
        </div>
        {!ethnicGroups ? <LoadingSpinner className="h-32" /> : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {ethnicGroups.map((g: EthnicGroup) => <EthnicGroupCard key={g.id} group={g} />)}
          </div>
        )}
        <div className="text-center mt-8">
          <Link href="/ethnic" className="btn-outline">مشاهده همه اقوام</Link>
        </div>
      </section>

      {/* Featured clothing */}
      <section className="bg-barna-cream py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="section-title">لباس‌های ویژه</h2>
            <p className="section-subtitle">منتخب‌های مزون برنا</p>
          </div>
          {!featured ? <LoadingSpinner className="h-48" /> : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {featured.data?.map((c: Clothing) => <ClothingCard key={c.id} clothing={c} compact />)}
            </div>
          )}
          <div className="text-center mt-8">
            <Link href="/clothing" className="btn-primary">مشاهده همه لباس‌ها</Link>
          </div>
        </div>
      </section>

      {/* About teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-barna-dark rounded-2xl p-10 md:p-16 text-center text-white">
          <h2 className="text-3xl font-bold text-primary-400 mb-4">داستان برنا</h2>
          <p className="text-gray-300 leading-8 max-w-2xl mx-auto text-lg mb-8">
            از سفر به روستاهای کردستان شروع شد. لباسی دیدم که نه فقط پارچه بود — روایتی از نسل‌ها بود. تصمیم گرفتم این روایت‌ها را زنده نگه دارم.
          </p>
          <Link href="/story" className="btn-primary">بیشتر بخوانید</Link>
        </div>
      </section>

      {/* Services */}
      <section className="bg-barna-cream py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="section-title">خدمات مزون برنا</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: '🛍️', title: 'فروش', desc: 'خرید لباس‌های اصیل اقوام' },
              { icon: '🤝', title: 'امانت', desc: 'اجاره لباس برای مراسم و جشن‌ها' },
              { icon: '✂️', title: 'طراحی', desc: 'طراحی لباس سنتی با ایده شما' },
              { icon: '🪡', title: 'بازسازی', desc: 'نوسازی لباس‌های قدیمی خانوادگی' },
            ].map(s => (
              <div key={s.title} className="card p-6 text-center hover:border-primary-200 border border-transparent">
                <div className="text-4xl mb-3">{s.icon}</div>
                <h3 className="font-bold text-barna-dark mb-2">{s.title}</h3>
                <p className="text-barna-gray text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}