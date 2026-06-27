import { Suspense } from 'react';
import ClothingConfigurator from '@/components/site/configurator/ClothingConfigurator';
import LoadingSpinner from '@/components/common/LoadingSpinner';

export default function ConfiguratorPage() {
  return (
    <Suspense fallback={<LoadingSpinner className="h-screen" />}>
      <ClothingConfigurator />
    </Suspense>
  );
}
