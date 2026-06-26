'use client';
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined';
import { useTranslation } from '@/lib/i18n';
interface ReservationRulesModalProps { isOpen: boolean; onClose: () => void; onAccept: () => void; rules?: string; }
export default function ReservationRulesModal({ isOpen, onClose, onAccept, rules }: ReservationRulesModalProps) {
  const { t, locale } = useTranslation();
  if (!isOpen) return null;
  const fallbackRules = locale === 'fa' ? '<ul><li>لباس باید سالم و تمیز بازگردانده شود.</li><li>هزینه خشکشویی از ودیعه کسر می‌شود.</li><li>در صورت آسیب به لباس، هزینه تعمیر از ودیعه کسر خواهد شد.</li><li>مابقی ودیعه ظرف ۷۲ ساعت پس از دریافت لباس بازگردانده می‌شود.</li><li>هزینه ارسال برعهده هنردوست است.</li></ul>' : '<ul><li>The garment must be returned clean and undamaged.</li><li>Dry-cleaning costs are deducted from the deposit.</li><li>Repair costs for damage are deducted from the deposit.</li><li>The remaining deposit is refunded within 72 hours after return.</li><li>Shipping costs are paid by the customer.</li></ul>';
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-100 p-5 flex items-center justify-between">
          <h2 className="text-lg font-bold text-barna-dark flex items-center gap-2"><GavelOutlinedIcon className="text-primary-600" /> {t('reservation.rules')}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
        </div>
        <div className="p-6"><div className="prose prose-sm text-barna-dark leading-8" dangerouslySetInnerHTML={{ __html: rules || fallbackRules }} /></div>
        <div className="sticky bottom-0 bg-white border-t border-gray-100 p-5 flex gap-3">
          <button onClick={onAccept} className="btn-primary flex-1">{t('common.confirm')}</button>
          <button onClick={onClose} className="btn-outline flex-1">{t('common.cancel')}</button>
        </div>
      </div>
    </div>
  );
}
