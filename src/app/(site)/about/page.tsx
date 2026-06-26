'use client';
import { useQuery } from '@tanstack/react-query';
import { pagesApi } from '@/lib/api/pages';
import { queryKeys } from '@/lib/queryKeys';

export default function AboutPage() {
  const { data: page } = useQuery({ queryKey: queryKeys.pages.detail('about'), queryFn: () => pagesApi.getOne('about') });
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="section-title text-3xl mb-8">{page?.display_name || 'درباره مزون برنا'}</h1>
      <div className="prose prose-lg max-w-none text-barna-dark leading-9" dangerouslySetInnerHTML={{ __html: page?.content || '' }} />
      <div className="mt-12 grid md:grid-cols-3 gap-6">
        {[['🎯', 'هدف', 'حفظ و احیای لباس‌های سنتی اقوام ایران'],['🚗', 'روش', 'سفرهای هدفمند و تحقیق میدانی در سراسر ایران'],['❤️', 'ارزش', 'احترام به فرهنگ و هویت اقوام ایرانی']].map(([icon, title, desc]) => (
          <div key={title} className="card p-6 text-center">
            <div className="text-4xl mb-3">{icon}</div>
            <h3 className="font-bold text-barna-dark mb-2">{title}</h3>
            <p className="text-barna-gray text-sm">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}