'use client';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { ethnicGroupsApi } from '@/lib/api/ethnicGroups';
import { clothingApi } from '@/lib/api/clothing';
import { queryKeys } from '@/lib/queryKeys';
import ClothingCard from '@/components/site/ClothingCard';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import Image from 'next/image';

export default function EthnicDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const { data: group } = useQuery({
    queryKey: queryKeys.ethnicGroups.detail(slug),
    queryFn: () => ethnicGroupsApi.getOne(slug),
  });
  const { data: clothing, isLoading } = useQuery({
    queryKey: queryKeys.clothing.list({ ethnic_group: slug }),
    queryFn: () => clothingApi.list({ ethnic_group: slug, limit: 24 }),
  });

  return (
    <div>
      {/* Hero */}
      <div className="relative h-72 bg-barna-cream overflow-hidden">
        {group?.image && <Image src={group.image} alt={group?.display_name || ''} fill className="object-cover opacity-60" sizes="100vw" />}
        <div className="absolute inset-0 bg-gradient-to-t from-barna-dark/80 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 p-8 max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white">{group?.display_name}</h1>
          {group?.description && <p className="text-white/80 mt-2 max-w-xl">{group.description}</p>}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-barna-dark">لباس‌های این قوم</h2>
          <span className="text-sm text-barna-gray">{clothing?.pagination?.total || 0} لباس</span>
        </div>
        {isLoading ? <LoadingSpinner className="h-48" /> : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {clothing?.data?.map(c => <ClothingCard key={c.id} clothing={c} compact />)}
          </div>
        )}
      </div>
    </div>
  );
}