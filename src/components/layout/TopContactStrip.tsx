import { Phone, MapPin, Clock, MessageSquare } from 'lucide-react';
import { CLINIC_CONFIG, getTelUrl, getWhatsAppUrl } from '@/lib/config/clinic';

export function TopContactStrip() {
  return (
    <div className="bg-[#155E59] text-white text-xs border-b border-[#0F4541] hidden sm:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex flex-wrap items-center justify-between gap-y-1 gap-x-4">
          <div className="flex items-center gap-4 text-[#DDEBE4]">
            <a
              href={getTelUrl()}
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#DDEBE4]" />
              <span className="font-medium text-white">{CLINIC_CONFIG.formattedPhone}</span>
            </a>
            <span className="text-[#0F4541]">|</span>
            <a
              href={CLINIC_CONFIG.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-[#DDEBE4]" />
              <span>Rajasthan (27.292°N, 75.183°E)</span>
            </a>
          </div>

          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-[#DDEBE4]">
              <Clock className="w-3.5 h-3.5" />
              <span>Prior appointment recommended</span>
            </span>
            <span className="text-[#0F4541]">|</span>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#DDEBE4] hover:text-white transition-colors font-medium"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-300" />
              <span>WhatsApp Enquiry</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
