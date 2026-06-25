'use client';
interface ReservationRulesModalProps { isOpen: boolean; onClose: () => void; onAccept: () => void; rules?: string; }
export default function ReservationRulesModal({ isOpen, onClose, onAccept, rules }: ReservationRulesModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-100 p-5 flex items-center justify-between">
          <h2 className="text-lg font-bold text-barna-dark">⚖️ قوانین رزرو لباس</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
        </div>
        <div className="p-6">
          <div className="prose prose-sm text-barna-dark leading-8" dangerouslySetInnerHTML={{ __html: rules || `
            <ul>
              <li>لباس باید سالم و تمیز بازگردانده شود.</li>
              <li>هزینه خشکشویی از ودیعه کسر می‌شود.</li>
              <li>در صورت آسیب به لباس، هزینه تعمیر از ودیعه کسر خواهد شد.</li>
              <li>مابقی ودیعه ظرف ۷۲ ساعت پس از دریافت لباس بازگردانده می‌شود.</li>
              <li>هزینه ارسال برعهده هنردوست است.</li>
            </ul>
          ` }} />
        </div>
        <div className="sticky bottom-0 bg-white border-t border-gray-100 p-5 flex gap-3">
          <button onClick={onAccept} className="btn-primary flex-1">قوانین را می‌پذیرم</button>
          <button onClick={onClose} className="btn-outline flex-1">انصراف</button>
        </div>
      </div>
    </div>
  );
}