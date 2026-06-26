'use client';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { clothingApi } from '@/lib/api/clothing';
import { createOrder } from '@/lib/api/orders';
import { queryKeys } from '@/lib/queryKeys';
import PriceDisplay from '@/components/common/PriceDisplay';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useTranslation } from '@/lib/i18n';
import toast from 'react-hot-toast';

export default function OrderPage() {
  const { clothingId } = useParams<{ clothingId: string }>();
  const router = useRouter();
  const { t } = useTranslation();
  const [form, setForm] = useState({ guest_name: '', guest_email: '', guest_phone: '', shipping_address: '', notes: '' });
  const { data: clothing, isLoading } = useQuery({ queryKey: queryKeys.clothing.detail(clothingId), queryFn: () => clothingApi.getOne(clothingId) });
  const { mutate, isPending } = useMutation({
    mutationFn: () => createOrder({ clothing_id: Number(clothingId), amount: clothing?.sale_price || 0, ...form }),
    onSuccess: () => { toast.success(t('order.success')); router.push('/payment/online-order'); },
  });
  if (isLoading) return <LoadingSpinner className="h-screen" />;
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-barna-dark mb-6">{t('order.title')}</h1>
      <div className="bg-barna-cream rounded-barna p-4 mb-6 flex justify-between gap-4"><span className="font-semibold">{clothing?.display_name}</span><span>{t('order.salePrice')}: <PriceDisplay amount={clothing?.sale_price || 0} /></span></div>
      <form onSubmit={(e) => { e.preventDefault(); mutate(); }} className="space-y-4">
        <h2 className="font-bold text-barna-dark">{t('order.buyerInfo')}</h2>
        <input className="input-field" required placeholder={t('reservation.fullName')} value={form.guest_name} onChange={e => setForm(f => ({...f, guest_name: e.target.value}))} />
        <div className="grid md:grid-cols-2 gap-3"><input className="input-field" type="email" placeholder={t('reservation.email')} value={form.guest_email} onChange={e => setForm(f => ({...f, guest_email: e.target.value}))} /><input className="input-field" placeholder={t('reservation.phone')} value={form.guest_phone} onChange={e => setForm(f => ({...f, guest_phone: e.target.value}))} /></div>
        <textarea className="input-field resize-none" rows={3} required placeholder={t('reservation.address')} value={form.shipping_address} onChange={e => setForm(f => ({...f, shipping_address: e.target.value}))} />
        <textarea className="input-field resize-none" rows={2} placeholder={t('reservation.note')} value={form.notes} onChange={e => setForm(f => ({...f, notes: e.target.value}))} />
        <p className="text-sm text-barna-gray">{t('order.trackingHint')}</p>
        <button className="btn-primary w-full" disabled={isPending}>{isPending ? t('reservation.submitting') : t('order.pay')}</button>
      </form>
    </div>
  );
}
