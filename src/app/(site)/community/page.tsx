'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { communityApi } from '@/lib/api/community';
import { ethnicGroupsApi } from '@/lib/api/ethnicGroups';
import { queryKeys } from '@/lib/queryKeys';
import { CommunityPost } from '@/types';
import { useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import toast from 'react-hot-toast';
import LoadingSpinner from '@/components/common/LoadingSpinner';

export default function CommunityPage() {
  const { isAuthenticated } = useAuth();
  const qc = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', content: '', ethnic_group_id: '' });

  const { data: posts, isLoading } = useQuery({ queryKey: queryKeys.community.list(), queryFn: () => communityApi.list() });
  const { data: groups } = useQuery({ queryKey: queryKeys.ethnicGroups.list(), queryFn: () => ethnicGroupsApi.list() });

  const { mutate, isPending } = useMutation({
    mutationFn: () => communityApi.create({ ...form, ethnic_group_id: form.ethnic_group_id ? Number(form.ethnic_group_id) : undefined }),
    onSuccess: () => { toast.success('پست شما ثبت شد و پس از تأیید نمایش داده می‌شود'); setShowForm(false); setForm({ title: '', content: '', ethnic_group_id: '' }); qc.invalidateQueries({ queryKey: ['community'] }); },
    onError: () => toast.error('خطا در ثبت'),
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="section-title">جامعه برنا</h1>
          <p className="section-subtitle">اشتراک‌گذاری عکس‌های لباس محلی</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">+ پست جدید</button>
      </div>

      {showForm && (
        <div className="card p-6 mb-8">
          <h3 className="font-bold mb-4">پست جدید</h3>
          <input className="input-field mb-3" placeholder="عنوان" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
          <textarea className="input-field mb-3 resize-none" rows={4} placeholder="توضیحات..." value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} />
          <select className="input-field mb-3" value={form.ethnic_group_id} onChange={e => setForm(f => ({ ...f, ethnic_group_id: e.target.value }))}>
            <option value="">انتخاب قوم (اختیاری)</option>
            {groups?.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
          </select>
          <div className="flex gap-3">
            <button onClick={() => mutate()} disabled={!form.content || isPending} className="btn-primary">ارسال</button>
            <button onClick={() => setShowForm(false)} className="btn-outline">انصراف</button>
          </div>
        </div>
      )}

      {isLoading ? <LoadingSpinner className="h-48" /> : (
        <div className="space-y-4">
          {posts?.map((p: CommunityPost) => (
            <div key={p.id} className="card p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold">{(p.user_name || 'م')[0]}</div>
                <div>
                  <p className="font-medium text-sm">{p.user_name || 'کاربر مهمان'}</p>
                  <p className="text-xs text-barna-gray">{new Date(p.created_at).toLocaleDateString('fa-IR')}{p.ethnic_group_name && ` · ${p.ethnic_group_name}`}</p>
                </div>
              </div>
              {p.title && <h3 className="font-semibold text-barna-dark mb-2">{p.title}</h3>}
              {p.content && <p className="text-barna-gray text-sm leading-7">{p.content}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}