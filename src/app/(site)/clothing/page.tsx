'use client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { clothingApi } from '@/lib/api/clothing';
import { ethnicGroupsApi } from '@/lib/api/ethnicGroups';
import { queryKeys } from '@/lib/queryKeys';
import { ClothingFilters } from '@/types';
import ClothingCard from '@/components/site/ClothingCard';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import Pagination from '@/components/common/Pagination';
import EmptyState from '@/components/common/EmptyState';

const categories = [['', 'همه'], ['traditional', 'سنتی'], ['modern', 'مدرن'], ['fusion', 'تلفیقی'], ['barna_design', 'طرح برنا'], ['wardrobe', 'کمد لباس']];
const genders = [['', 'همه'], ['female', 'زنانه'], ['male', 'مردانه'], ['unisex', 'مشترک'], ['child', 'بچگانه']];

export default function ClothingPage() {
  const [filters, setFilters] = useState<ClothingFilters>({ page: 1, limit: 12 });

  const { data, isLoading } = useQuery({
    queryKey: queryKeys.clothing.list(filters),
    queryFn: () => clothingApi.list(filters),
  });
  const { data: groups } = useQuery({
    queryKey: queryKeys.ethnicGroups.list(),
    queryFn: () => ethnicGroupsApi.list(),
  });

  const set = (key: keyof ClothingFilters, val: string) =>
    setFilters(f => ({ ...f, [key]: val || undefined, page: 1 }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="section-title">لباس‌های مزون برنا</h1>
        <p className="section-subtitle">مجموعه کامل لباس‌های سنتی اقوام ایران</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-barna p-4 shadow-sm mb-8 flex flex-wrap gap-3 items-center">
        <input
          className="input-field flex-1 min-w-[200px]"
          placeholder="🔍 جستجو در لباس‌ها..."
          onChange={e => set('search', e.target.value)}
        />
        <select className="input-field w-auto" onChange={e => set('ethnic_group', e.target.value)}>
          <option value="">همه اقوام</option>
          {groups?.map(g => <option key={g.slug} value={g.slug}>{g.name}</option>)}
        </select>
        <select className="input-field w-auto" onChange={e => set('category', e.target.value as any)}>
          {categories.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
        <select className="input-field w-auto" onChange={e => set('gender', e.target.value as any)}>
          {genders.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
      </div>

      {isLoading ? <LoadingSpinner className="h-64" /> : !data?.data?.length ? (
        <EmptyState title="لباسی یافت نشد" description="فیلترهای جستجو را تغییر دهید" />
      ) : (
        <>
          <p className="text-sm text-barna-gray mb-4">{data.pagination.total} لباس یافت شد</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {data.data.map(c => <ClothingCard key={c.id} clothing={c} compact />)}
          </div>
          <Pagination page={filters.page || 1} pages={data.pagination.pages} onPageChange={p => setFilters(f => ({ ...f, page: p }))} />
        </>
      )}
    </div>
  );
}