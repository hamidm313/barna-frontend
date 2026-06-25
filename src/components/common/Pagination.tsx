interface PaginationProps { page: number; pages: number; onPageChange: (p: number) => void; }
export default function Pagination({ page, pages, onPageChange }: PaginationProps) {
  if (pages <= 1) return null;
  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button onClick={() => onPageChange(page - 1)} disabled={page <= 1} className="px-4 py-2 rounded-lg border border-primary-200 text-primary-600 disabled:opacity-40 hover:bg-primary-50 transition-colors text-sm">قبلی</button>
      {Array.from({ length: Math.min(pages, 7) }, (_, i) => {
        const p = pages <= 7 ? i + 1 : i < 3 ? i + 1 : i === 3 ? page : i > 3 ? pages - (6 - i) : page;
        return (
          <button key={p} onClick={() => onPageChange(p)} className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${p === page ? 'bg-primary-500 text-white' : 'border border-gray-200 hover:border-primary-300 hover:text-primary-600'}`}>{p}</button>
        );
      })}
      <button onClick={() => onPageChange(page + 1)} disabled={page >= pages} className="px-4 py-2 rounded-lg border border-primary-200 text-primary-600 disabled:opacity-40 hover:bg-primary-50 transition-colors text-sm">بعدی</button>
    </div>
  );
}