import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Zap,
  ShieldCheck,
  CheckCircle2,
  Phone,
  MessageSquare,
  Sparkles,
  HeartHandshake,
} from 'lucide-react';
import { CLINIC_CONFIG, getTelUrl, getWhatsAppUrl } from '@/lib/config/clinic';
import { getEquipment } from '@/lib/data';
import { DemoBadge } from '@/components/common/DemoBadge';

export const metadata: Metadata = {
  title: 'Clinical Equipment & Rehabilitation Facilities',
  description:
    'Modern physiotherapy electro-modalities, spinal decompression traction, and therapeutic exercise equipment at Shri Krishna Physiotherapy Clinic.',
};

export default async function EquipmentPage() {
  const equipment = await getEquipment(true);

  return (
    <div className="flex flex-col w-full bg-[#F8FAF8]">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#EEF5F1] to-[#F8FAF8] py-12 sm:py-16 border-b border-[#E3E8E5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-[#546462] mb-4">
            <Link href="/" className="hover:text-[#155E59] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#202A29] font-medium">Equipment & Modalities</span>
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DDEBE4] text-[#155E59] text-xs font-semibold mb-3 border border-[#B9D5C8]/60">
              <Zap className="w-3.5 h-3.5" />
              <span>Evidence-Guided Modalities & Apparatus</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#202A29] tracking-tight leading-tight">
              Clinical Equipment & Facilities
            </h1>
            <p className="text-base sm:text-lg text-[#546462] mt-4 leading-relaxed">
              At <strong className="text-[#202A29] font-semibold">{CLINIC_CONFIG.name}</strong>, physical therapy modalities
              are utilized systematically to relieve acute discomfort, reduce soft tissue swelling, and create an optimal
              environment for active exercise therapy under the guidance of{' '}
              <strong className="text-[#202A29] font-semibold">{CLINIC_CONFIG.doctorName}</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Modalities Showcase Grid */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#E3E8E5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#155E59]">
              Therapeutic Technology
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#202A29] mt-1 tracking-tight">
              Calibrated Physical Therapy Equipment
            </h2>
            <p className="text-sm text-[#546462] mt-2">
              Every device is calibrated according to strict patient safety parameters and applied only after a physical assessment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {equipment.map((item, index) => {
              const photoSrc = item.photo_url || '/images/equipment/ultrasound-therapy.jpg';

              return (
                <div
                  key={item.id || index}
                  className="bg-[#F8FAF8] rounded-3xl border border-[#E3E8E5] hover:border-[#B9D5C8] hover:shadow-lg transition-all flex flex-col justify-between overflow-hidden group"
                >
                  <div>
                    {/* Visual Photo */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                      <Image
                        src={photoSrc}
                        alt={item.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {item.is_demo && (
                        <div className="absolute top-3 right-3">
                          <DemoBadge label="Demo equipment" className="bg-black/50 text-amber-200 border-amber-300/40 text-[10px]" />
                        </div>
                      )}
                    </div>

                    <div className="p-6 sm:p-7 space-y-3">
                      <h2 className="text-lg font-bold text-[#202A29] group-hover:text-[#155E59] transition-colors">
                        {item.name}
                      </h2>

                      <p className="text-xs sm:text-sm text-[#546462] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-3 border-t border-[#E3E8E5]/80 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-[#155E59] font-medium">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                      <span>Calibrated for safe, comfortable tolerance</span>
                    </div>

                    <a
                      href={getWhatsAppUrl(`Hello Dr. Suresh Yadav, I would like to enquire about ${item.name} therapy at Shri Krishna Clinic.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold text-[#155E59] bg-white border border-[#E3E8E5] hover:bg-[#EEF5F1] transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Enquire About This Modality</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Clinical Understanding Banner: Modalities vs Exercise */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-7 rounded-3xl bg-[#EEF5F1] border border-[#B9D5C8]/80 space-y-3">
              <div className="flex items-center gap-2.5 font-bold text-base text-[#155E59]">
                <Sparkles className="w-5 h-5" />
                <span>How Modalities Support Recovery</span>
              </div>
              <p className="text-xs sm:text-sm text-[#202A29]/80 leading-relaxed">
                Electrotherapy (such as TENS or IFT) and therapeutic ultrasound provide crucial acute pain reduction and cellular warmth.
                By relaxing guarded muscles and downregulating pain signals, modalities open a therapeutic window where you can move and exercise comfortably.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-[#EEF5F1] border border-[#B9D5C8]/80 space-y-3">
              <div className="flex items-center gap-2.5 font-bold text-base text-[#155E59]">
                <HeartHandshake className="w-5 h-5" />
                <span>Why Movement Remains the Foundation</span>
              </div>
              <p className="text-xs sm:text-sm text-[#202A29]/80 leading-relaxed">
                While machines alleviate pain, long-term spinal and joint stability requires active muscle strengthening, posture retraining, and kinetic coordination.
                At our clinic, equipment is used as an aid to empower active, lasting recovery.
              </p>
            </div>
          </div>

          {/* Safety Protocols Note */}
          <div className="mt-8 rounded-2xl bg-[#F8FAF8] border border-[#E3E8E5] p-6 sm:p-8 space-y-3">
            <div className="flex items-center gap-2.5 font-bold text-sm text-[#202A29]">
              <ShieldCheck className="w-5 h-5 text-[#155E59]" />
              <span>Sanitation & Supervision Guarantee</span>
            </div>
            <p className="text-xs sm:text-sm text-[#546462] leading-relaxed">
              All electrotherapy electrodes, ultrasound transducers, and exercise apparatus undergo rigorous sanitization between every patient appointment.
              Treatments are constantly supervised by Dr. Suresh Yadav, ensuring current intensities and traction loads remain well within your comfortable therapeutic window.
            </p>
          </div>
        </div>
      </section>

      {/* Inquiry Banner */}
      <section className="py-14 sm:py-18 bg-[#F8FAF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-[#E3E8E5] p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#155E59]">
                Personalized Care
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#202A29] mt-1">
                Wondering which modality fits your condition?
              </h3>
              <p className="text-xs sm:text-sm text-[#546462] mt-1 max-w-xl">
                Consult with Dr. Suresh Yadav for a comprehensive evaluation of your joints, muscles, and movement patterns.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={getWhatsAppUrl('Hello Dr. Suresh Yadav, I am reading about the equipment at your clinic and would like to understand which modality fits my condition.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-white bg-[#155E59] hover:bg-[#0F4541] shadow-xs transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-[#DDEBE4]" />
                <span>WhatsApp Enquiry</span>
              </a>

              <a
                href={getTelUrl()}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-[#202A29] bg-[#F8FAF8] border border-[#E3E8E5] hover:bg-[#EEF5F1] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#155E59]" />
                <span>Call {CLINIC_CONFIG.formattedPhone}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
