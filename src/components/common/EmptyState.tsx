interface EmptyStateProps { title?: string; description?: string; icon?: React.ReactNode; action?: React.ReactNode; }
export default function EmptyState({ title = 'داده‌ای یافت نشد', description, icon, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {icon && <div className="mb-4 text-gray-300 text-6xl">{icon}</div>}
      {!icon && <div className="mb-4 text-5xl">🧣</div>}
      <h3 className="text-lg font-semibold text-barna-dark mb-2">{title}</h3>
      {description && <p className="text-barna-gray text-sm max-w-sm">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}