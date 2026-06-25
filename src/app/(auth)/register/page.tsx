'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { authApi } from '@/lib/api/auth';
import { useAuth } from '@/providers/AuthProvider';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' });

  const { mutate, isPending } = useMutation({
    mutationFn: () => authApi.register(form),
    onSuccess: ({ token, user }) => {
      login(token, user);
      toast.success('حساب کاربری ساخته شد');
      router.push('/');
    },
    onError: (e: any) => toast.error(e?.response?.data?.error || 'خطا در ثبت‌نام'),
  });

  return (
    <div className="min-h-screen bg-barna-bg flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-barna-dark">مزون برنا</h1>
          <p className="text-barna-gray mt-2 text-sm">ساخت حساب کاربری جدید</p>
        </div>
        <div className="card p-8">
          <form onSubmit={e => { e.preventDefault(); mutate(); }} className="space-y-4">
            <input className="input-field" placeholder="نام کامل *" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            <input className="input-field" type="email" placeholder="ایمیل *" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
            <input className="input-field" placeholder="شماره موبایل" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
            <input className="input-field" type="password" placeholder="رمز عبور *" required minLength={6} value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
            <button type="submit" disabled={isPending} className="btn-primary w-full">{isPending ? 'در حال ثبت‌نام...' : 'ثبت‌نام'}</button>
          </form>
          <p className="text-center text-sm text-barna-gray mt-6">
            حساب دارید؟{' '}
            <Link href="/login" className="text-primary-600 font-medium hover:underline">ورود</Link>
          </p>
        </div>
      </div>
    </div>
  );
}