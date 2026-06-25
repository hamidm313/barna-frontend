export default function LoadingSpinner({ size = 'md', className = '' }: { size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const s = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' }[size];
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`${s} border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin`} />
    </div>
  );
}