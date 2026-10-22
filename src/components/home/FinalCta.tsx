import Link from 'next/link';
import { Phone, MessageSquare, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';
import { CLINIC_CONFIG, getTelUrl, getWhatsAppUrl } from '@/lib/config/clinic';

export function FinalCta() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-[#155E59] via-[#12534e] to-[#0F4541] text-white p-8 sm:p-12 lg:p-16 overflow-hidden shadow-sm">
          {/* Subtle background decorative shapes */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-white/5 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-80 h-80 rounded-full bg-[#DDEBE4]/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#DDEBE4] border border-white/15">
              <ShieldCheck className="w-4 h-4 text-[#DDEBE4]" />
              <span>Prioritize Your Mobility & Comfort Today</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Begin Your Pathway to Pain-Free Movement
            </h2>

            <p className="text-sm sm:text-base text-[#DDEBE4] leading-relaxed max-w-2xl mx-auto">
              Whether you are recovering from surgery, suffering from persistent joint pain, or managing a sports injury,
              Dr. Suresh Yadav provides attentive, personalized physical therapy at Shri Krishna Physiotherapy Clinic.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-base font-bold text-[#155E59] bg-white hover:bg-[#EEF5F1] shadow-sm transition-all"
              >
                <MessageSquare className="w-5 h-5 text-[#155E59]" />
                <span>Enquire via WhatsApp</span>
              </a>

              <a
                href={getTelUrl()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-base font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all"
              >
                <Phone className="w-5 h-5 text-emerald-300" />
                <span>Call {CLINIC_CONFIG.formattedPhone}</span>
              </a>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-[#DDEBE4]/80">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#DDEBE4]" />
                <span>GPS: 27.2924909, 75.1829705</span>
              </div>
              <span className="hidden sm:inline text-white/30">•</span>
              <div>
                <Link href="/contact" className="hover:text-white underline inline-flex items-center gap-1">
                  <span>View full directions & clinic hours</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
