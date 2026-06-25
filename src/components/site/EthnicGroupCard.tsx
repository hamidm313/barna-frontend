import Image from 'next/image';
import Link from 'next/link';
import { EthnicGroup } from '@/types';

export default function EthnicGroupCard({ group }: { group: EthnicGroup }) {
  return (
    <Link href={`/ethnic/${group.slug}`} className="group relative overflow-hidden rounded-barna aspect-square bg-barna-cream shadow-sm hover:shadow-lg transition-all duration-300">
      {group.image ? (
        <Image src={group.image} alt={group.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" sizes="(max-width: 768px) 50vw, 25vw" />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200">
          <span className="text-4xl">🪡</span>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 p-4">
        <h3 className="text-white font-bold text-sm md:text-base">{group.name}</h3>
        {group.description && <p className="text-white/70 text-xs mt-1 line-clamp-2">{group.description}</p>}
      </div>
    </Link>
  );
}