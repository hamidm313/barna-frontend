'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { authApi } from '@/lib/api/auth';
import { useAuth } from '@/providers/AuthProvider';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });

  const { mutate, isPending } = useMutation({
    mutationFn: () => authApi.login(form),
    onSuccess: ({ token, user }) => {
      login(token, user);
      toast.success(`خوش آمدید ${user.name}`);
      router.push(user.role === 'admin' ? '/dashboard' : '/');
    },
    onError: (e: any) => toast.error(e?.response?.data?.error || 'خطا در ورود'),
  });

  return (
    <div className="min-h-screen bg-barna-bg flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-barna-dark">مزون برنا</h1>
          <p className="text-barna-gray mt-2 text-sm">ورود به حساب کاربری</p>
        </div>
        <div className="card p-8">
          <form onSubmit={e => { e.preventDefault(); mutate(); }} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-barna-dark mb-1 block">ایمیل</label>
              <input className="input-field" type="email" required placeholder="example@email.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
            </div>
            <div>
              <label className="text-sm font-medium text-barna-dark mb-1 block">رمز عبور</label>
              <input className="input-field" type="password" required placeholder="••••••••" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
            </div>
            <button type="submit" disabled={isPending} className="btn-primary w-full">{isPending ? 'در حال ورود...' : 'ورود'}</button>
          </form>
          <p className="text-center text-sm text-barna-gray mt-6">
            حساب کاربری ندارید؟{' '}
            <Link href="/register" className="text-primary-600 font-medium hover:underline">ثبت‌نام</Link>
          </p>
          <div className="mt-4 p-3 bg-primary-50 rounded-lg text-xs text-barna-gray text-center">
            <strong>تست:</strong> admin@barna.ir / admin123
          </div>
        </div>
      </div>
    </div>
  );
}