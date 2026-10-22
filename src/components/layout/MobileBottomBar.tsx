import { Phone, MessageSquare } from 'lucide-react';
import { getTelUrl, getWhatsAppUrl } from '@/lib/config/clinic';

export function MobileBottomBar() {
  return (
    <div className="sm:hidden fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#E3E8E5] px-4 py-2.5 shadow-lg safe-area-pb">
      <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
        <a
          href={getTelUrl()}
          className="inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-sm font-semibold text-[#202A29] bg-[#F8FAF8] border border-[#E3E8E5] active:bg-[#EEF5F1] transition-colors"
          aria-label="Call clinic phone"
        >
          <Phone className="w-4 h-4 text-[#155E59]" />
          <span>Call Now</span>
        </a>

        <a
          href={getWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-sm font-semibold text-white bg-[#155E59] active:bg-[#0F4541] shadow-xs transition-colors"
          aria-label="Enquire via WhatsApp"
        >
          <MessageSquare className="w-4 h-4 text-[#DDEBE4]" />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
