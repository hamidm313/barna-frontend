import { mockPages } from '@/lib/mock/data';
import ClientPage from './ClientPage';

export function generateStaticParams() {
  return mockPages.map((item) => ({ slug: item.slug }));
}

export default function Page() {
  return <ClientPage />;
}
