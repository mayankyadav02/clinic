import Image from 'next/image';
import { Phone, MessageSquare, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { CLINIC_CONFIG, getTelUrl, getWhatsAppUrl } from '@/lib/config/clinic';
import { DemoBadge } from '@/components/common/DemoBadge';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#EEF5F1]/90 via-[#F8FAF8] to-[#F8FAF8] py-12 sm:py-16 lg:py-20 border-b border-[#E3E8E5]">
      {/* Subtle organic background accents */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-[#DDEBE4]/50 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 -mb-20 w-80 h-80 rounded-full bg-[#155E59]/5 blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Headline, Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Tag Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DDEBE4] text-[#155E59] text-xs font-semibold tracking-wide border border-[#B9D5C8]/80">
              <span className="w-2 h-2 rounded-full bg-[#155E59]" />
              <span>Specialized Physical Therapy & Pain Management</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#202A29] tracking-tight leading-[1.18]">
              Restoring Movement. <br />
              <span className="text-[#155E59]">Relieving Persistent Pain.</span> <br />
              Rebuilding Functional Strength.
            </h1>

            <p className="text-base sm:text-lg text-[#546462] leading-relaxed max-w-2xl font-normal">
              Welcome to <strong className="text-[#202A29] font-semibold">{CLINIC_CONFIG.name}</strong>, led by{' '}
              <strong className="text-[#202A29] font-semibold">{CLINIC_CONFIG.doctorName}</strong>.
              We provide individualized physical therapy protocols for joint stiffness, spinal discomfort, sports injuries,
              and post-surgical recovery, designed to help you return to active living safely.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm sm:text-base font-bold text-white bg-[#155E59] hover:bg-[#0F4541] shadow-xs hover:shadow transition-all group"
              >
                <MessageSquare className="w-5 h-5 text-[#DDEBE4]" />
                <span>Enquire via WhatsApp</span>
                <ArrowRight className="w-4 h-4 text-[#DDEBE4] group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href={getTelUrl()}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm sm:text-base font-semibold text-[#202A29] bg-white border border-[#E3E8E5] hover:bg-[#EEF5F1] hover:border-[#B9D5C8] transition-all shadow-xs"
              >
                <Phone className="w-5 h-5 text-[#155E59]" />
                <span>Call {CLINIC_CONFIG.formattedPhone}</span>
              </a>
            </div>

            <p className="text-xs text-[#546462]">
              * Prior enquiry or telephone call is recommended before visiting to confirm consultation slot availability.
            </p>

            {/* Trust Micro-Checkmarks */}
            <div className="pt-4 border-t border-[#E3E8E5] grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex items-center gap-2 text-xs text-[#202A29] font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#155E59] flex-shrink-0" />
                <span>Individualized 1-on-1 Care</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#202A29] font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#155E59] flex-shrink-0" />
                <span>Evidence-Guided Protocols</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#202A29] font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#155E59] flex-shrink-0" />
                <span>Modern Clinical Modalities</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Clinical Photograph */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Image Frame */}
              <div className="relative rounded-3xl overflow-hidden border border-[#DDEBE4] shadow-md bg-white">
                <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full">
                  <Image
                    src="/images/hero/physiotherapy-hero.jpg"
                    alt="Physiotherapist guiding a patient through mobility and joint rehabilitation exercise"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                </div>

                {/* Overlay Card Details */}
                <div className="absolute bottom-0 inset-x-0 p-5 text-white">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/20 backdrop-blur-md border border-white/20 text-white">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                      <span>Clinical Care Setting</span>
                    </span>
                    <DemoBadge
                      label="Demo photo"
                      className="bg-black/50 text-amber-200 border-amber-300/40 text-[10px]"
                    />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    Patient-Centered Functional Recovery
                  </h3>
                  <p className="text-xs text-[#DDEBE4] mt-0.5 line-clamp-2">
                    Supervised physical rehabilitation, joint mobilization, and postural education directed by {CLINIC_CONFIG.doctorName}.
                  </p>
                </div>
              </div>

              {/* Decorative Subtle Accent Badge */}
              <div className="hidden sm:flex items-center gap-3 absolute -bottom-4 -left-4 bg-white px-4 py-2.5 rounded-2xl border border-[#DDEBE4] shadow-sm text-xs font-semibold text-[#202A29]">
                <div className="w-8 h-8 rounded-xl bg-[#155E59] text-white flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-[#DDEBE4]" />
                </div>
                <div>
                  <div className="text-[10px] text-[#546462] uppercase tracking-wider font-bold">Helpline</div>
                  <div className="text-[#155E59] font-bold">{CLINIC_CONFIG.formattedPhone}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
