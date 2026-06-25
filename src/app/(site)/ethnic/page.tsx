'use client';
import { useQuery } from '@tanstack/react-query';
import { ethnicGroupsApi } from '@/lib/api/ethnicGroups';
import { queryKeys } from '@/lib/queryKeys';
import EthnicGroupCard from '@/components/site/EthnicGroupCard';
import LoadingSpinner from '@/components/common/LoadingSpinner';

export default function EthnicPage() {
  const { data: groups, isLoading } = useQuery({
    queryKey: queryKeys.ethnicGroups.list(),
    queryFn: () => ethnicGroupsApi.list(),
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="section-title text-3xl">اقوام ایران</h1>
        <p className="section-subtitle">کشف لباس‌های سنتی اقوام مختلف ایران زمین</p>
      </div>
      {isLoading ? <LoadingSpinner className="h-64" /> : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {groups?.map(g => <EthnicGroupCard key={g.id} group={g} />)}
        </div>
      )}
    </div>
  );
}