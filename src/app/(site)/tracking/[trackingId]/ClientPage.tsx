'use client';
import { useParams } from 'next/navigation';
import { useTranslation } from '@/lib/i18n';

export default function TrackingPage() {
  const { trackingId } = useParams<{ trackingId: string }>();
  const { t } = useTranslation();
  const steps = [t('tracking.step1'), t('tracking.step2'), t('tracking.step3'), t('tracking.step4')];
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="card p-8">
        <h1 className="text-3xl font-black text-barna-dark mb-2">{t('tracking.title')}</h1>
        <p className="text-barna-gray mb-8">{t('tracking.subtitle')}</p>
        <div className="grid md:grid-cols-2 gap-4 mb-8 text-sm">
          <div className="rounded-2xl bg-barna-cream p-4"><span className="text-barna-gray">{t('tracking.number')}</span><div className="font-bold text-barna-dark mt-1">{trackingId}</div></div>
          <div className="rounded-2xl bg-barna-cream p-4"><span className="text-barna-gray">{t('tracking.status')}</span><div className="font-bold text-primary-700 mt-1">{t('tracking.current')}</div></div>
          <div className="rounded-2xl bg-barna-cream p-4"><span className="text-barna-gray">{t('tracking.carrier')}</span><div className="font-bold text-barna-dark mt-1">Barna Courier</div></div>
          <div className="rounded-2xl bg-barna-cream p-4"><span className="text-barna-gray">{t('tracking.address')}</span><div className="font-bold text-barna-dark mt-1">تهران، ولیعصر، پلاک ۱۲۳</div></div>
        </div>
        <div className="space-y-4">{steps.map((s, i) => <div key={s} className="flex items-center gap-3"><span className="h-8 w-8 rounded-full bg-primary-500 text-white flex items-center justify-center text-sm">{i+1}</span><span className="font-semibold text-barna-dark">{s}</span></div>)}</div>
      </div>
    </div>
  );
}
