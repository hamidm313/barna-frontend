interface PriceDisplayProps { amount: number | undefined | null; className?: string; suffix?: string; }
export default function PriceDisplay({ amount, className = '', suffix = 'تومان' }: PriceDisplayProps) {
  if (!amount) return null;
  return (
    <span className={`price-tag ${className}`}>
      {amount.toLocaleString('fa-IR')} {suffix}
    </span>
  );
}