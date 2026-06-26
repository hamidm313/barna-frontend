'use client';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { clothingApi } from '@/lib/api/clothing';
import { ethnicGroupsApi } from '@/lib/api/ethnicGroups';
import { queryKeys } from '@/lib/queryKeys';
import HeroSection from '@/components/site/HeroSection';
import { EthnicGroup, Clothing } from '@/types';
import ClothingCard from '@/components/site/ClothingCard';
import EthnicGroupCard from '@/components/site/EthnicGroupCard';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useTranslation } from '@/lib/i18n';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import ContentCutOutlinedIcon from '@mui/icons-material/ContentCutOutlined';
import CelebrationOutlinedIcon from '@mui/icons-material/CelebrationOutlined';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';

export default function HomePage() {
  const { t } = useTranslation();
  const services = [
    [<ShoppingBagOutlinedIcon key="sale" />, t('home.serviceSale'), t('home.serviceSaleDesc')],
    [<HandshakeOutlinedIcon key="rent" />, t('home.serviceRent'), t('home.serviceRentDesc')],
    [<ContentCutOutlinedIcon key="design" />, t('home.serviceDesign'), t('home.serviceDesignDesc')],
    [<CelebrationOutlinedIcon key="events" />, t('home.serviceEvents'), t('home.serviceEventsDesc')],
  ] as const;
  const partners = t('home.partners').split(',').length > 1 ? t('home.partners').split(',') : ['فروشگاه‌های اکسسوری سنتی', 'پارچه‌فروشی‌های سراسر کشور', 'آتلیه‌های عکاسی', 'طلافروشی‌ها', 'میکاپ‌آرتیست‌ها', 'هنرمندان و خیاطان محلی'];
  const inspirations = [t('home.inspiration1'), t('home.inspiration2'), t('home.inspiration3')];
  const { data: featured } = useQuery({ queryKey: queryKeys.clothing.list({ is_featured: true, limit: 6 }), queryFn: () => clothingApi.list({ is_featured: true, limit: 6 }) });
  const { data: ethnicGroups } = useQuery({ queryKey: queryKeys.ethnicGroups.list(), queryFn: () => ethnicGroupsApi.list() });
  const ethnicList = Array.isArray(ethnicGroups) ? ethnicGroups : ethnicGroups?.data || [];

  return (
    <>
      <HeroSection />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10"><h2 className="section-title">{t('home.ethnicStoryTitle')}</h2><p className="section-subtitle">{t('home.ethnicStorySubtitle')}</p></div>
        {!ethnicGroups ? <LoadingSpinner className="h-32" /> : <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">{ethnicList.map((g: EthnicGroup) => <EthnicGroupCard key={g.id} group={g} />)}</div>}
      </section>
      <section className="bg-barna-cream py-16"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="text-center mb-10"><h2 className="section-title">{t('home.featuredSection')}</h2><p className="section-subtitle">{t('home.featuredSubtitle')}</p></div>{!featured ? <LoadingSpinner className="h-48" /> : <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">{featured.data?.map((c: Clothing) => <ClothingCard key={c.id} clothing={c} compact />)}</div>}<div className="text-center mt-8"><Link href="/clothing" className="btn-primary">{t('home.viewAllClothing')}</Link></div></div></section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"><div className="grid md:grid-cols-4 gap-6">{services.map(([icon,title,desc]) => <div key={title} className="card p-6 hover:-translate-y-1 transition"><div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-100 text-primary-700 [&_svg]:text-current">{icon}</div><h3 className="font-bold text-barna-dark mb-3">{title}</h3><p className="text-sm leading-7 text-barna-gray">{desc}</p></div>)}</div></section>
      <section className="bg-barna-dark py-16 text-white"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center"><div><h2 className="text-3xl font-black text-primary-400 mb-5">{t('home.missionTitle')}</h2><p className="leading-9 text-gray-300">{t('home.missionText')}</p></div><div className="grid grid-cols-2 gap-3">{partners.map(p => <span key={p} className="rounded-full bg-white/10 border border-white/10 px-4 py-3 text-center text-sm">{p}</span>)}</div></div></section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"><div className="rounded-[2rem] bg-gradient-to-br from-white to-primary-50 border border-primary-100 shadow-sm p-8 md:p-12"><div className="text-center"><p className="text-sm font-bold text-primary-700 mb-2">{t('common.viewAll')}</p><h2 className="section-title">{t('home.inspirationTitle')}</h2><p className="section-subtitle">{t('home.inspirationSubtitle')}</p></div><div className="grid md:grid-cols-3 gap-4 mt-8">{inspirations.map(x => <div key={x} className="group rounded-2xl bg-white border border-primary-100 p-5 font-semibold text-barna-dark shadow-sm hover:-translate-y-1 hover:shadow-md transition"><div className="flex items-center justify-between gap-3"><span>{x}</span><OpenInNewOutlinedIcon className="text-primary-600" fontSize="small" /></div></div>)}</div></div></section>
    </>
  );
}
