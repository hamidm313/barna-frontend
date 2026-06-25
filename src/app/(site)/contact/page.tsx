'use client';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { requestsApi } from '@/lib/api/requests';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [form, setForm] = useState({ type: 'information', subject: '', message: '', guest_name: '', guest_email: '', guest_phone: '' });
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: () => requestsApi.create(form),
    onSuccess: () => toast.success('پیام شما ارسال شد'),
    onError: () => toast.error('خطا در ارسال پیام'),
  });

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="section-title text-3xl mb-8">تماس با مزون برنا</h1>
      <div className="grid md:grid-cols-3 gap-4 mb-10">
        {[['📱', '09100000000'], ['📧', 'info@barna.ir'], ['📸', '@barna_mezon']].map(([icon, val]) => (
          <div key={val} className="card p-4 text-center text-sm"><div className="text-2xl mb-1">{icon}</div>{val}</div>
        ))}
      </div>

      {isSuccess ? (
        <div className="bg-green-50 border border-green-200 rounded-barna p-8 text-center">
          <div className="text-4xl mb-3">✅</div>
          <h3 className="font-bold text-green-800">پیام شما ارسال شد!</h3>
          <p className="text-green-600 text-sm mt-2">در اسرع وقت پاسخ می‌دهیم.</p>
        </div>
      ) : (
        <form onSubmit={e => { e.preventDefault(); mutate(); }} className="space-y-4 card p-6">
          <div className="grid grid-cols-2 gap-3">
            <input className="input-field" placeholder="نام *" required value={form.guest_name} onChange={e => setForm(f => ({ ...f, guest_name: e.target.value }))} />
            <input className="input-field" placeholder="ایمیل" type="email" value={form.guest_email} onChange={e => setForm(f => ({ ...f, guest_email: e.target.value }))} />
          </div>
          <input className="input-field" placeholder="موبایل" value={form.guest_phone} onChange={e => setForm(f => ({ ...f, guest_phone: e.target.value }))} />
          <select className="input-field" value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
            <option value="information">اطلاعات</option>
            <option value="custom_design">طراحی سفارشی</option>
            <option value="collaboration">همکاری</option>
            <option value="other">سایر</option>
          </select>
          <input className="input-field" placeholder="موضوع" value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} />
          <textarea className="input-field resize-none" rows={5} placeholder="پیام شما *" required value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
          <button type="submit" disabled={isPending} className="btn-primary w-full">{isPending ? 'در حال ارسال...' : 'ارسال پیام'}</button>
        </form>
      )}
    </div>
  );
}