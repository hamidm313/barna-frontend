'use client';
import { useQuery } from '@tanstack/react-query';
import { pagesApi } from '@/lib/api/pages';
import { queryKeys } from '@/lib/queryKeys';

export default function StoryPage() {
  const { data: page } = useQuery({ queryKey: queryKeys.pages.detail('story'), queryFn: () => pagesApi.getOne('story') });
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <span className="text-primary-500 text-sm font-medium">✨ داستان ما</span>
        <h1 className="text-4xl font-bold text-barna-dark mt-2">{page?.display_name || 'داستان برنا'}</h1>
      </div>
      <div className="prose prose-lg max-w-none text-barna-dark leading-9" dangerouslySetInnerHTML={{ __html: page?.content || '<p>از یک سفر شروع شد...</p>' }} />
    </div>
  );
}