'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { communityApi } from '@/lib/api/community';
import { ethnicGroupsApi } from '@/lib/api/ethnicGroups';
import { queryKeys } from '@/lib/queryKeys';
import { CommunityPost, EthnicGroup } from '@/types';
import { useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import toast from 'react-hot-toast';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useTranslation } from '@/lib/i18n';

export default function CommunityPage() {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const qc = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ display_name: '', content: '', ethnic_group_id: '' });

  const { data: posts, isLoading } = useQuery({ queryKey: queryKeys.community.list(), queryFn: () => communityApi.list() });
  const { data: groups } = useQuery({ queryKey: queryKeys.ethnicGroups.list(), queryFn: () => ethnicGroupsApi.list() });

  const { mutate, isPending } = useMutation({
    mutationFn: () => communityApi.create({ ...form, ethnic_group_id: form.ethnic_group_id ? Number(form.ethnic_group_id) : undefined }),
    onSuccess: () => { toast.success(t('community.successMsg')); setShowForm(false); setForm({ display_name: '', content: '', ethnic_group_id: '' }); qc.invalidateQueries({ queryKey: ['community'] }); },
    onError: () => toast.error(t('community.errorMsg')),
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="section-title">{t('community.title')}</h1>
          <p className="section-subtitle">{t('community.subtitle')}</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">{t('community.newPost')}</button>
      </div>

      {showForm && (
        <div className="card p-6 mb-8">
          <h3 className="font-bold mb-4">{t('community.newPostTitle')}</h3>
          <input className="input-field mb-3" placeholder={t('community.postTitle')} value={form.display_name} onChange={e => setForm(f => ({ ...f, display_name: e.target.value }))} />
          <textarea className="input-field mb-3 resize-none" rows={4} placeholder={t('community.postContent')} value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} />
          <select className="input-field mb-3" value={form.ethnic_group_id} onChange={e => setForm(f => ({ ...f, ethnic_group_id: e.target.value }))}>
            <option value="">{t('community.selectEthnic')}</option>
            {groups?.map((g: EthnicGroup) => <option key={g.id} value={g.id}>{g.display_name}</option>)}
          </select>
          <div className="flex gap-3">
            <button onClick={() => mutate()} disabled={!form.content || isPending} className="btn-primary">{t('community.submit')}</button>
            <button onClick={() => setShowForm(false)} className="btn-outline">{t('community.cancel')}</button>
          </div>
        </div>
      )}

      {isLoading ? <LoadingSpinner className="h-48" /> : (
        <div className="space-y-4">
          {posts?.map((p: CommunityPost) => (
            <div key={p.id} className="card p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold">{(p.user_display_name || 'م')[0]}</div>
                <div>
                  <p className="font-medium text-sm">{p.user_display_name || t('community.guest')}</p>
                  <p className="text-xs text-barna-gray">{new Date(p.created_at).toLocaleDateString('fa-IR')}{p.ethnic_group_display_name && ` · ${p.ethnic_group_display_name}`}</p>
                </div>
              </div>
              {p.display_name && <h3 className="font-semibold text-barna-dark mb-2">{p.display_name}</h3>}
              {p.content && <p className="text-barna-gray text-sm leading-7">{p.content}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}