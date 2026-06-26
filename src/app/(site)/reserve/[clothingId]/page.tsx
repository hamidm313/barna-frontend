'use client';
import { useParams, useRouter } from 'next/navigation';
import { useQuery, useMutation } from '@tanstack/react-query';
import { clothingApi } from '@/lib/api/clothing';
import { reservationsApi } from '@/lib/api/reservations';
import { pagesApi } from '@/lib/api/pages';
import { queryKeys } from '@/lib/queryKeys';
import { useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import ReservationRulesModal from '@/components/site/ReservationRulesModal';
import PriceDisplay from '@/components/common/PriceDisplay';
import toast from 'react-hot-toast';

export default function ReservePage() {
  const { clothingId } = useParams<{ clothingId: string }>();
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const [form, setForm] = useState({ start_date: '', end_date: '', guest_name: '', guest_email: '', guest_phone: '', shipping_address: '', notes: '' });
  const [rulesOpen, setRulesOpen] = useState(false);
  const [rulesAccepted, setRulesAccepted] = useState(false);

  const { data: clothing } = useQuery({
    queryKey: queryKeys.clothing.detail(clothingId),
    queryFn: () => clothingApi.getOne(clothingId),
  });
  const { data: rulesPage } = useQuery({
    queryKey: queryKeys.pages.detail('reservation-rules'),
    queryFn: () => pagesApi.getOne('reservation-rules'),
  });

  const days = form.start_date && form.end_date
    ? Math.max(1, Math.ceil((new Date(form.end_date).getTime() - new Date(form.start_date).getTime()) / (1000 * 60 * 60 * 24)))
    : 0;
  const rentalFee = days * (clothing?.rental_price_per_day || 0);

  const { mutate, isPending } = useMutation({
    mutationFn: () => reservationsApi.create({ clothing_id: Number(clothingId), ...form, rules_accepted: rulesAccepted }),
    onSuccess: (data) => {
      toast.success('رزرو با موفقیت ثبت شد!');
      router.push('/');
    },
    onError: (e: any) => toast.error(e?.response?.data?.error || 'خطا در رزرو'),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rulesAccepted) return toast.error('لطفاً قوانین رزرو را بپذیرید');
    mutate();
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-barna-dark mb-6">رزرو امانی لباس</h1>
      {clothing && (
        <div className="bg-barna-cream rounded-barna p-4 mb-6 flex gap-4 items-center">
          <div className="font-semibold text-barna-dark flex-1">{clothing.display_name}</div>
          <div className="text-sm text-barna-gray">کرایه روزانه: <PriceDisplay amount={clothing.rental_price_per_day} /></div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-barna-dark mb-1 block">تاریخ شروع</label>
            <input type="date" className="input-field" required value={form.start_date} onChange={e => setForm(f => ({ ...f, start_date: e.target.value }))} min={new Date().toISOString().split('T')[0]} />
          </div>
          <div>
            <label className="text-sm font-medium text-barna-dark mb-1 block">تاریخ پایان</label>
            <input type="date" className="input-field" required value={form.end_date} onChange={e => setForm(f => ({ ...f, end_date: e.target.value }))} min={form.start_date} />
          </div>
        </div>

        {!isAuthenticated && (
          <>
            <input className="input-field" placeholder="نام کامل *" required value={form.guest_name} onChange={e => setForm(f => ({ ...f, guest_name: e.target.value }))} />
            <div className="grid grid-cols-2 gap-3">
              <input className="input-field" placeholder="ایمیل" type="email" value={form.guest_email} onChange={e => setForm(f => ({ ...f, guest_email: e.target.value }))} />
              <input className="input-field" placeholder="موبایل" value={form.guest_phone} onChange={e => setForm(f => ({ ...f, guest_phone: e.target.value }))} />
            </div>
          </>
        )}

        <textarea className="input-field resize-none" rows={2} placeholder="آدرس ارسال *" required value={form.shipping_address} onChange={e => setForm(f => ({ ...f, shipping_address: e.target.value }))} />
        <textarea className="input-field resize-none" rows={2} placeholder="یادداشت (اختیاری)" value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />

        {days > 0 && clothing && (
          <div className="bg-white border border-primary-100 rounded-barna p-4 space-y-2 text-sm">
            <div className="flex justify-between"><span>تعداد روز</span><span className="font-medium">{days} روز</span></div>
            <div className="flex justify-between"><span>هزینه کرایه</span><PriceDisplay amount={rentalFee} /></div>
            <div className="flex justify-between border-t border-gray-100 pt-2 font-semibold"><span>ودیعه قابل پرداخت</span><PriceDisplay amount={clothing.deposit_amount} className="text-base" /></div>
          </div>
        )}

        <div className="flex items-start gap-3">
          <input type="checkbox" id="rules" checked={rulesAccepted} onChange={e => setRulesAccepted(e.target.checked)} className="mt-1" />
          <label htmlFor="rules" className="text-sm">
            <button type="button" onClick={() => setRulesOpen(true)} className="text-primary-600 underline">قوانین رزرو</button> را خوانده‌ام و می‌پذیرم.
          </label>
        </div>

        <button type="submit" disabled={isPending || !rulesAccepted} className="btn-primary w-full disabled:opacity-50">
          {isPending ? 'در حال ثبت...' : 'تأیید و پرداخت ودیعه'}
        </button>
      </form>

      <ReservationRulesModal isOpen={rulesOpen} onClose={() => setRulesOpen(false)} onAccept={() => { setRulesAccepted(true); setRulesOpen(false); }} rules={rulesPage?.content} />
    </div>
  );
}