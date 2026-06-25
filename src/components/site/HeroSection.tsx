import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-gradient-to-br from-barna-cream via-primary-50 to-barna-bg">
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #C9A84C 0, #C9A84C 1px, transparent 0, transparent 50%)' ,backgroundSize: '20px 20px' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-primary-600 font-semibold text-sm mb-3 tracking-wider">🪡 مزون برنا ایران</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-barna-dark leading-tight mb-6">
            لباس محلی<br />
            <span className="text-primary-500">اقوام ایران</span>
          </h1>
          <p className="text-barna-gray text-lg leading-8 mb-8">
            با سفرهای هدفمند به اقصی نقاط ایران، لباس‌های اصیل اقوام را جمع‌آوری، مستندسازی و احیا می‌کنیم.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/clothing" className="btn-primary">مشاهده لباس‌ها</Link>
            <Link href="/ethnic" className="btn-outline">اقوام ایران</Link>
          </div>

          <div className="flex gap-8 mt-10">
            {[['۱۰+', 'قوم ایرانی'], ['۱۰۰+', 'لباس اصیل'], ['۵۰۰+', 'هنردوست']].map(([n, l]) => (
              <div key={l} className="text-center">
                <div className="text-2xl font-bold text-primary-600">{n}</div>
                <div className="text-xs text-barna-gray mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative hidden md:block">
          <div className="grid grid-cols-2 gap-4">
            {[
              'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
              'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400',
              'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400',
              'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400',
            ].map((src, i) => (
              <div key={i} className={`relative overflow-hidden rounded-barna ${i === 0 ? 'col-span-2 aspect-video' : 'aspect-square'} shadow-md`}>
                <img src={src} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}