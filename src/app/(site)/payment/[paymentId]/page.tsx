import ClientPage from './ClientPage';

export function generateStaticParams() {
  return [{ paymentId: 'online-order' }, { paymentId: 'reservation-deposit' }];
}

export default function Page() {
  return <ClientPage />;
}
