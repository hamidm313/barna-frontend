'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Clothing } from '@/types';
import PriceDisplay from '@/components/common/PriceDisplay';
import { useTranslation } from '@/lib/i18n';

const statusColors: Record<string, string> = {
  available: 'badge-green', rented: 'badge-primary', sold: 'badge-gray', reserved: 'badge-accent', maintenance: 'badge-gray',
};

interface ClothingCardProps { clothing: Clothing; compact?: boolean; }

export default function ClothingCard({ clothing, compact = false }: ClothingCardProps) {
  const { t } = useTranslation();
  const images = Array.isArray(clothing.images) ? clothing.images : (typeof clothing.images === 'string' ? JSON.parse(clothing.images || '[]') : []);
  const mainImage = images[0] || '/images/clothing/placeholder-female.svg';

  const categoryLabels: Record<string, string> = {
    traditional: t('clothing.catTraditional'),
    modern: t('clothing.catModern'),
    fusion: t('clothing.catFusion'),
    barna_design: t('clothing.catBarna'),
    wardrobe: t('clothing.catWardrobe'),
  };
  const statusLabels: Record<string, string> = {
    available: t('status.available'),
    rented: t('status.rented'),
    sold: t('status.sold'),
    reserved: t('status.reserved'),
    maintenance: t('status.maintenance'),
  };

  return (
    <div className="card group">
      <div className="relative overflow-hidden aspect-[3/4] bg-barna-cream">
        <Image src={mainImage} alt={clothing.display_name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" />
        <div className="absolute top-3 end-3 flex flex-col gap-1">
          <span className={statusColors[clothing.status]}>{statusLabels[clothing.status]}</span>
          {clothing.is_featured && <span className="badge bg-primary-500 text-white">{t('clothing.featured')}</span>}
        </div>
        {clothing.category && (
          <div className="absolute bottom-3 start-3">
            <span className="badge bg-black/50 text-white backdrop-blur-sm">{categoryLabels[clothing.category]}</span>
          </div>
        )}
      </div>

      <div className="p-4">
        {clothing.ethnic_group_display_name && (
          <p className="text-xs text-primary-600 font-medium mb-1">{clothing.ethnic_group_display_name}</p>
        )}
        <h3 className="font-semibold text-barna-dark text-sm mb-2 line-clamp-2">{clothing.display_name}</h3>

        {!compact && (
          <div className="flex flex-wrap gap-1 mb-3">
            {clothing.color && <span className="text-xs text-barna-gray">● {clothing.color}</span>}
            {clothing.size && <span className="text-xs text-barna-gray">{t('clothing.size')}: {clothing.size}</span>}
          </div>
        )}

        <div className="flex items-end justify-between mt-3">
          <div>
            {clothing.is_for_rent && clothing.rental_price_per_day && (
              <div className="text-xs text-barna-gray">{t('clothing.forRent')}: <PriceDisplay amount={clothing.rental_price_per_day} className="text-sm" /></div>
            )}
            {clothing.is_for_sale && clothing.sale_price && (
              <div className="text-xs text-barna-gray">{t('clothing.forSale')}: <PriceDisplay amount={clothing.sale_price} className="text-sm" /></div>
            )}
          </div>
          <Link href={`/clothing/${clothing.id}`} className="btn-primary text-xs py-1.5 px-3">{t('clothing.view')}</Link>
        </div>
      </div>
    </div>
  );
}
