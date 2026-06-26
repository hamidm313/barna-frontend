'use client';
import Link from 'next/link';

const heroImages = [
  '/images/logo/barna-logo.jpg',
  '/images/hero/travel-report.svg',
  '/images/hero/workshop.svg',
  '/images/hero/accessories.svg',
];

export default function HeroSection() {
  return (
    <section className="relative min-h-[82vh] flex items-center overflow-hidden bg-[radial-gradient(circle_at_top_left,#fff7df,transparent_34%),linear-gradient(135deg,#fffaf0,#f8f2e7_45%,#ffffff)]">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(90deg,#C9A84C 1px,transparent 1px),linear-gradient(#C9A84C 1px,transparent 1px)', backgroundSize: '44px 44px' }} />
      <div className="absolute -top-32 -left-20 h-96 w-96 rounded-full bg-primary-200/40 blur-3xl" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid lg:grid-cols-[1fr_520px] gap-14 items-center">
        <div>
          <p className="inline-flex rounded-full bg-white/80 border border-primary-200 px-4 py-2 text-primary-700 font-semibold text-sm mb-5 shadow-sm">لباس محلی تمام اقوام ایران، از تحقیق میدانی تا طراحی و دوخت</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-barna-dark leading-tight mb-6">
            برنا مزون ایران؛<br />روایت زنده پوشاک <span className="text-primary-600">اقوام</span>
          </h1>
          <p className="text-barna-gray text-lg md:text-xl leading-9 mb-8 max-w-2xl">
            فروش، امانت، اجاره و طراحی لباس‌های اصیل و تلفیقی؛ همراه با گزارش تصویری از سفرهای برنا، بازارهای محلی، پارچه‌ها، اکسسوری‌ها و قصه هنرمندان هر منطقه.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/clothing" className="btn-primary">مشاهده و رزرو لباس‌ها</Link>
            <Link href="/community" className="btn-outline">گپ و عکس‌های محلی</Link>
            <Link href="/about" className="btn-outline">درباره برنا</Link>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-10 max-w-xl">
            {[['۸+', 'قوم و سبک'], ['۳ مسیر', 'فروش، امانت، طراحی'], ['۱۰۰٪', 'داده mock آماده']].map(([n, l]) => (
              <div key={l} className="rounded-2xl bg-white/80 border border-primary-100 p-4 shadow-sm text-center">
                <div className="text-2xl font-black text-primary-700">{n}</div>
                <div className="text-xs text-barna-gray mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-6 rounded-[2.5rem] bg-primary-200/30 rotate-3" />
          <div className="relative grid grid-cols-2 gap-4 rounded-[2rem] bg-white/70 backdrop-blur p-4 shadow-2xl border border-white">
            {heroImages.map((src, i) => (
              <div key={src} className={`group overflow-hidden rounded-[1.4rem] shadow-md ${i === 0 ? 'col-span-2 aspect-[16/9]' : 'aspect-square'}`}>
                <img src={src} alt="Barna Mezon visual" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
