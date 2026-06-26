'use client';
import Link from 'next/link';
import PriceDisplay from '@/components/common/PriceDisplay';
import { useTranslation } from '@/lib/i18n';

export default function MockPaymentPage() {
  const { t } = useTranslation();
  return (
    <div className="max-w-xl mx-auto px-4 py-16">
      <div className="card p-8 text-center space-y-5">
        <div className="mx-auto h-16 w-16 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-2xl">✓</div>
        <h1 className="text-2xl font-black text-barna-dark">{t('order.title')}</h1>
        <p className="text-barna-gray leading-7">{t('order.trackingHint')}</p>
        <div className="rounded-2xl bg-barna-cream p-4 flex justify-between"><span>{t('reservation.deposit')}</span><PriceDisplay amount={1000000} /></div>
        <Link href="/tracking/BRN-TRK-1403" className="btn-primary block">{t('tracking.title')}</Link>
      </div>
    </div>
  );
}
