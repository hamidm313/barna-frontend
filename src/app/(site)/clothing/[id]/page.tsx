'use client';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { clothingApi } from '@/lib/api/clothing';
import { queryKeys } from '@/lib/queryKeys';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import CommentSection from '@/components/site/CommentSection';
import PriceDisplay from '@/components/common/PriceDisplay';
import Image from 'next/image';
import { useState } from 'react';

const statusLabels: Record<string, string> = { available: 'موجود', rented: 'در امانت', sold: 'فروخته شده', reserved: 'رزرو شده', maintenance: 'در تعمیر' };
const categoryLabels: Record<string, string> = { traditional: 'سنتی', modern: 'مدرن', fusion: 'تلفیقی', barna_design: 'طرح برنا', wardrobe: 'کمد لباس' };
const genderLabels: Record<string, string> = { female: 'زنانه', male: 'مردانه', unisex: 'مشترک', child: 'بچگانه' };

export default function ClothingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [activeImg, setActiveImg] = useState(0);

  const { data: clothing, isLoading } = useQuery({
    queryKey: queryKeys.clothing.detail(id),
    queryFn: () => clothingApi.getOne(id),
  });

  if (isLoading) return <LoadingSpinner className="h-screen" />;
  if (!clothing) return <div className="text-center py-20">لباس یافت نشد</div>;

  const images = Array.isArray(clothing.images) ? clothing.images : JSON.parse((clothing.images as any) || '[]');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <button onClick={() => router.back()} className="text-sm text-barna-gray hover:text-primary-600 mb-6 flex items-center gap-1">← بازگشت</button>

      <div className="grid md:grid-cols-2 gap-10 mb-12">
        {/* Images */}
        <div>
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-barna-cream mb-3">
            {images[activeImg] ? (
              <Image src={images[activeImg]} alt={clothing.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            ) : <div className="w-full h-full flex items-center justify-center text-6xl">🪡</div>}
          </div>
          {images.length > 1 && (
            <div className="flex gap-2">
              {images.map((img: string, i: number) => (
                <button key={i} onClick={() => setActiveImg(i)} className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 ${i === activeImg ? 'border-primary-500' : 'border-transparent'}`}>
                  <Image src={img} alt="" fill className="object-cover" sizes="64px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          {clothing.ethnic_group_name && (
            <p className="text-primary-600 font-medium text-sm mb-1">{clothing.ethnic_group_name}</p>
          )}
          <h1 className="text-3xl font-bold text-barna-dark mb-4">{clothing.name}</h1>

          <div className="flex flex-wrap gap-2 mb-6">
            <span className="badge-primary">{categoryLabels[clothing.category]}</span>
            <span className="badge-gray">{genderLabels[clothing.gender]}</span>
            <span className={clothing.status === 'available' ? 'badge-green' : 'badge-gray'}>{statusLabels[clothing.status]}</span>
          </div>

          {clothing.description && <p className="text-barna-gray leading-8 mb-6">{clothing.description}</p>}

          <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
            {clothing.material && <div><span className="text-barna-gray">جنس: </span><span className="font-medium">{clothing.material}</span></div>}
            {clothing.color && <div><span className="text-barna-gray">رنگ: </span><span className="font-medium">{clothing.color}</span></div>}
            {clothing.size && <div><span className="text-barna-gray">سایز: </span><span className="font-medium">{clothing.size}</span></div>}
            {clothing.era && <div><span className="text-barna-gray">دوره: </span><span className="font-medium">{clothing.era}</span></div>}
          </div>

          <div className="bg-barna-cream rounded-barna p-4 mb-6 space-y-2">
            {clothing.is_for_rent && clothing.rental_price_per_day && (
              <div className="flex justify-between"><span className="text-barna-gray text-sm">کرایه روزانه</span><PriceDisplay amount={clothing.rental_price_per_day} /></div>
            )}
            {clothing.is_for_rent && clothing.deposit_amount && (
              <div className="flex justify-between"><span className="text-barna-gray text-sm">ودیعه</span><PriceDisplay amount={clothing.deposit_amount} /></div>
            )}
            {clothing.is_for_sale && clothing.sale_price && (
              <div className="flex justify-between border-t border-gray-200 pt-2"><span className="text-barna-gray text-sm">قیمت فروش</span><PriceDisplay amount={clothing.sale_price} className="text-lg" /></div>
            )}
          </div>

          <div className="flex gap-3">
            {clothing.is_for_rent && clothing.status === 'available' && (
              <button onClick={() => router.push(`/reserve/${clothing.id}`)} className="btn-primary flex-1">رزرو امانی</button>
            )}
            {clothing.is_for_sale && clothing.status === 'available' && (
              <button onClick={() => router.push(`/order/${clothing.id}`)} className="btn-accent flex-1">خرید</button>
            )}
          </div>

          {/* Before/After */}
          {(clothing.before_image || clothing.after_image) && (
            <div className="mt-6">
              <h3 className="font-semibold mb-3">قبل و بعد از بازسازی</h3>
              <div className="grid grid-cols-2 gap-3">
                {clothing.before_image && <div className="relative aspect-square rounded-lg overflow-hidden"><Image src={clothing.before_image} alt="قبل" fill className="object-cover" sizes="200px" /><span className="absolute bottom-2 start-2 badge bg-gray-700/80 text-white text-xs">قبل</span></div>}
                {clothing.after_image && <div className="relative aspect-square rounded-lg overflow-hidden"><Image src={clothing.after_image} alt="بعد" fill className="object-cover" sizes="200px" /><span className="absolute bottom-2 start-2 badge bg-primary-600/90 text-white text-xs">بعد</span></div>}
              </div>
            </div>
          )}
        </div>
      </div>

      <CommentSection clothingId={clothing.id} />
    </div>
  );
}