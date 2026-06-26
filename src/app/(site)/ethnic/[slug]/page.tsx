import { mockEthnicGroups } from '@/lib/mock/data';
import ClientPage from './ClientPage';

export function generateStaticParams() {
  return mockEthnicGroups.map((item) => ({ slug: item.slug }));
}

export default function Page() {
  return <ClientPage />;
}
