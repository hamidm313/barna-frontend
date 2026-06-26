import { mockClothing } from '@/lib/mock/data';
import ClientPage from './ClientPage';

export function generateStaticParams() {
  return mockClothing.map((item) => ({ id: String(item.id) }));
}

export default function Page() {
  return <ClientPage />;
}
