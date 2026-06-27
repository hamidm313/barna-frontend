'use client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { clothingApi } from '@/lib/api/clothing';
import { ethnicGroupsApi } from '@/lib/api/ethnicGroups';
import { queryKeys } from '@/lib/queryKeys';
import { ClothingFilters, EthnicGroup, Clothing } from '@/types';
import ClothingCard from '@/components/site/ClothingCard';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import Pagination from '@/components/common/Pagination';
import EmptyState from '@/components/common/EmptyState';
import { useTranslation } from '@/lib/i18n';

export default function ClothingPage() {
  const { t } = useTranslation();
  const [filters, setFilters] = useState<ClothingFilters>({ page: 1, limit: 12 });

  const { data, isLoading } = useQuery({
    queryKey: queryKeys.clothing.list(filters),
    queryFn: () => clothingApi.list(filters as Record<string, unknown>),
  });
  const { data: groups } = useQuery({
    queryKey: queryKeys.ethnicGroups.list(),
    queryFn: () => ethnicGroupsApi.list(),
  });

  const categories = [
    ['', t('clothing.catAll')],
    ['traditional', t('clothing.catTraditional')],
    ['modern', t('clothing.catModern')],
    ['fusion', t('clothing.catFusion')],
    ['barna_design', t('clothing.catBarna')],
    ['wardrobe', t('clothing.catWardrobe')],
  ];
  const genders = [
    ['', t('clothing.genderAll')],
    ['female', t('clothing.genderFemale')],
    ['male', t('clothing.genderMale')],
    ['unisex', t('clothing.genderUnisex')],
    ['child', t('clothing.genderChild')],
  ];

  const set = (key: keyof ClothingFilters, val: string) =>
    setFilters(f => ({ ...f, [key]: val || undefined, page: 1 }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="section-title">{t('clothing.title')}</h1>
        <p className="section-subtitle">{t('clothing.subtitle')}</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-barna p-4 shadow-sm mb-8 flex flex-wrap gap-3 items-center">
        <input
          className="input-field flex-1 min-w-[200px]"
          placeholder={t('clothing.searchPlaceholder')}
          onChange={e => set('search', e.target.value)}
        />
        <select className="input-field w-auto" onChange={e => set('ethnic_group', e.target.value)}>
          <option value="">{t('clothing.filterEthnic')}</option>
          {groups?.map((g: EthnicGroup) => <option key={g.slug} value={g.slug}>{g.display_name}</option>)}
        </select>
        <select className="input-field w-auto" onChange={e => set('category', e.target.value as any)}>
          {categories.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
        <select className="input-field w-auto" onChange={e => set('gender', e.target.value as any)}>
          {genders.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
      </div>

      {isLoading ? <LoadingSpinner className="h-64" /> : !data?.data?.length ? (
        <EmptyState title={t('clothing.notFound')} description={t('clothing.changeFilters')} />
      ) : (
        <>
          <p className="text-sm text-barna-gray mb-4">{data.pagination.total} {t('clothing.itemsFound')}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {data.data.map((c: Clothing) => <ClothingCard key={c.id} clothing={c} compact />)}
          </div>
          <Pagination page={filters.page || 1} pages={data.pagination.pages} onPageChange={p => setFilters(f => ({ ...f, page: p }))} />
        </>
      )}
    </div>
  );
}
