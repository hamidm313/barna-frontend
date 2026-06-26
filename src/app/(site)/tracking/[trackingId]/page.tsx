import ClientPage from './ClientPage';

export function generateStaticParams() {
  return [{ trackingId: 'BRN-TRK-1403' }, { trackingId: 'BRN-001' }, { trackingId: 'BRN-002' }, { trackingId: 'BRN-003' }];
}

export default function Page() {
  return <ClientPage />;
}
