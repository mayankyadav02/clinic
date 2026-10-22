import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Activity,
  ArrowRight,
  Clock,
  Tag,
  Bone,
  Brain,
  HeartPulse,
  Baby,
  Sparkles,
  CheckCircle2,
  Phone,
  MessageSquare,
} from 'lucide-react';
import { CLINIC_CONFIG, getTelUrl, getWhatsAppUrl } from '@/lib/config/clinic';
import { getServices } from '@/lib/data';
import { DemoBadge } from '@/components/common/DemoBadge';

export const metadata: Metadata = {
  title: 'Clinical Physiotherapy Services',
  description:
    'Comprehensive physiotherapy treatments: orthopedic rehabilitation, sports injury care, post-surgical recovery, and neurological physical therapy.',
};

function getServiceIcon(iconName: string | null) {
  switch (iconName) {
    case 'bone':
      return Bone;
    case 'activity':
      return Activity;
    case 'brain':
      return Brain;
    case 'heart-pulse':
      return HeartPulse;
    case 'baby':
      return Baby;
    default:
      return Sparkles;
  }
}

export default async function ServicesPage() {
  const services = await getServices(true);

  return (
    <div className="flex flex-col w-full bg-[#F8FAF8]">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#EEF5F1] to-[#F8FAF8] py-14 sm:py-18 border-b border-[#E3E8E5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DDEBE4] text-[#155E59] text-xs font-semibold mb-4 border border-[#B9D5C8]/60">
              <Activity className="w-3.5 h-3.5" />
              <span>Evidence-Informed Treatments</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#202A29] tracking-tight leading-tight">
              Clinical Physiotherapy Services
            </h1>
            <p className="text-base sm:text-lg text-[#546462] mt-4 leading-relaxed">
              Explore specialized rehabilitation therapies designed and directed by{' '}
              <strong className="text-[#202A29] font-semibold">{CLINIC_CONFIG.doctorName}</strong>.
              From acute sports injuries to post-operative recovery, our focus is safe, structured return to pain-free movement.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#E3E8E5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {services.length === 0 ? (
            <div className="text-center py-16 bg-[#F8FAF8] rounded-3xl border border-[#E3E8E5] p-8 max-w-lg mx-auto">
              <Activity className="w-12 h-12 text-[#155E59] mx-auto mb-3" />
              <h3 className="text-lg font-bold text-[#202A29]">Services Updating</h3>
              <p className="text-xs text-[#546462] mt-1">
                The clinic services directory is currently being refreshed. Please contact us directly for specific therapy inquiries.
              </p>
              <div className="mt-4">
                <a
                  href={getTelUrl()}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#155E59]"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call {CLINIC_CONFIG.formattedPhone}</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => {
                const IconComponent = getServiceIcon(service.icon);
                const imageSrc = service.image_url || '/images/services/orthopedic-rehabilitation.jpg';

                return (
                  <div
                    key={service.slug}
                    className="bg-[#F8FAF8] rounded-3xl border border-[#E3E8E5] hover:border-[#B9D5C8] hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
                  >
                    <div>
                      {/* Image Preview */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                        <Image
                          src={imageSrc}
                          alt={service.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-white/90 backdrop-blur-xs text-[#155E59] flex items-center justify-center shadow-xs">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        {service.is_demo && (
                          <div className="absolute top-3 right-3">
                            <DemoBadge label="Demo service" className="bg-black/50 text-amber-200 border-amber-300/40 text-[10px]" />
                          </div>
                        )}
                      </div>

                      <div className="p-6">
                        <h2 className="text-xl font-bold text-[#202A29] mb-2.5 group-hover:text-[#155E59] transition-colors">
                          {service.title}
                        </h2>

                        <p className="text-xs sm:text-sm text-[#546462] leading-relaxed line-clamp-3 mb-4">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-2 border-t border-[#E3E8E5]/70 space-y-4">
                      <div className="flex items-center justify-between text-xs text-[#546462]">
                        {service.duration_minutes && (
                          <div className="flex items-center gap-1.5 font-medium">
                            <Clock className="w-3.5 h-3.5 text-[#155E59]" />
                            <span>{service.duration_minutes} Mins / Session</span>
                          </div>
                        )}
                        {service.price_range && (
                          <div className="flex items-center gap-1.5 font-medium">
                            <Tag className="w-3.5 h-3.5 text-[#155E59]" />
                            <span>{service.price_range}</span>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          href={`/services/${service.slug}`}
                          className="inline-flex items-center justify-center gap-1 py-2.5 px-3 rounded-xl text-xs font-semibold text-[#155E59] bg-white border border-[#E3E8E5] hover:bg-[#EEF5F1] hover:border-[#B9D5C8] transition-colors"
                        >
                          <span>Full Details</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>

                        <a
                          href={getWhatsAppUrl(`Hello Dr. Suresh Yadav, I am interested in inquiring about ${service.title} at Shri Krishna Clinic.`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold text-white bg-[#155E59] hover:bg-[#0F4541] transition-colors"
                        >
                          <MessageSquare className="w-3.5 h-3.5 text-[#DDEBE4]" />
                          <span>Enquire</span>
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pricing Transparency Disclaimer */}
          <div className="mt-12 p-5 rounded-2xl bg-[#EEF5F1] border border-[#B9D5C8]/70 text-xs text-[#155E59] flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <div>
              <strong className="font-semibold text-[#202A29] block mb-0.5">
                Consultation & Fee Notice:
              </strong>
              Listed fees and session durations represent approximate clinical ranges. Exact therapy plans,
              frequency, and modality combinations are determined following in-person examination by Dr. Suresh Yadav.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
