'use client';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { commentsApi } from '@/lib/api/comments';
import { Comment } from '@/types';
import { useAuth } from '@/providers/AuthProvider';
import toast from 'react-hot-toast';

export default function CommentSection({ clothingId }: { clothingId: number }) {
  const { isAuthenticated, user } = useAuth();
  const qc = useQueryClient();
  const [content, setContent] = useState('');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');

  const { data: comments = [] } = useQuery({
    queryKey: ['comments', { clothing_id: clothingId }],
    queryFn: () => commentsApi.list({ clothing_id: clothingId }),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: () => commentsApi.create({ clothing_id: clothingId, content, guest_name: guestName || undefined, guest_email: guestEmail || undefined }),
    onSuccess: () => {
      toast.success('نظر شما ثبت شد و پس از تأیید نمایش داده می‌شود');
      setContent(''); setGuestName(''); setGuestEmail('');
      qc.invalidateQueries({ queryKey: ['comments'] });
    },
    onError: () => toast.error('خطا در ثبت نظر'),
  });

  return (
    <div className="mt-12">
      <h3 className="section-title text-xl mb-6">نظرات ({comments.length})</h3>

      <div className="space-y-4 mb-8">
        {comments.map((c: Comment) => (
          <div key={c.id} className="bg-white rounded-barna p-4 shadow-sm border border-gray-50">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-sm">
                {(c.user_name || c.guest_name || 'ک')[0]}
              </div>
              <div>
                <p className="font-medium text-sm text-barna-dark">{c.user_name || c.guest_name || 'کاربر مهمان'}</p>
                <p className="text-xs text-barna-gray">{new Date(c.created_at).toLocaleDateString('fa-IR')}</p>
              </div>
            </div>
            <p className="text-sm text-barna-dark leading-7">{c.content}</p>
          </div>
        ))}
        {comments.length === 0 && <p className="text-barna-gray text-sm text-center py-8">هنوز نظری ثبت نشده است.</p>}
      </div>

      <div className="bg-barna-cream rounded-barna p-6">
        <h4 className="font-semibold text-barna-dark mb-4">ثبت نظر</h4>
        {!isAuthenticated && (
          <div className="grid grid-cols-2 gap-3 mb-3">
            <input className="input-field" placeholder="نام شما" value={guestName} onChange={e => setGuestName(e.target.value)} />
            <input className="input-field" placeholder="ایمیل (اختیاری)" value={guestEmail} onChange={e => setGuestEmail(e.target.value)} type="email" />
          </div>
        )}
        <textarea className="input-field mb-3 resize-none" rows={4} placeholder="نظر خود را بنویسید..." value={content} onChange={e => setContent(e.target.value)} />
        <button onClick={() => mutate()} disabled={!content.trim() || isPending} className="btn-primary disabled:opacity-50">{isPending ? 'در حال ارسال...' : 'ثبت نظر'}</button>
      </div>
    </div>
  );
}