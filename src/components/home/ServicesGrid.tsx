import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock, Tag, Sparkles, Activity, HeartPulse, Brain, Baby, Bone } from 'lucide-react';
import { ServiceItem } from '@/lib/config/clinic';
import { DemoBadge } from '@/components/common/DemoBadge';

interface ServicesGridProps {
  services: ServiceItem[];
}

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

export function ServicesGrid({ services }: ServicesGridProps) {
  return (
    <section className="py-16 sm:py-20 bg-white border-b border-[#E3E8E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#155E59]">
              Specialized Care
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#202A29] mt-1 tracking-tight">
              Clinical Physiotherapy Services
            </h2>
            <p className="text-sm sm:text-base text-[#546462] mt-2 max-w-2xl">
              Targeted treatments designed to alleviate discomfort, restore functional biomechanics,
              and accelerate your recovery under professional supervision.
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#155E59] hover:text-[#0F4541] group"
          >
            <span>View all services catalog</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service) => {
            const IconComponent = getServiceIcon(service.icon);
            const imageSrc = service.image_url || '/images/services/orthopedic-rehabilitation.jpg';

            return (
              <div
                key={service.id || service.slug}
                className="bg-[#F8FAF8] rounded-3xl border border-[#E3E8E5] hover:border-[#B9D5C8] hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {/* Service Demonstration Image */}
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
                    <h3 className="text-lg font-bold text-[#202A29] mb-2 group-hover:text-[#155E59] transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#546462] leading-relaxed line-clamp-2 mb-4">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-[#E3E8E5]/70 space-y-4">
                  <div className="flex items-center justify-between text-xs text-[#546462]">
                    {service.duration_minutes && (
                      <div className="flex items-center gap-1.5 font-medium">
                        <Clock className="w-3.5 h-3.5 text-[#155E59]" />
                        <span>Approx. {service.duration_minutes} mins</span>
                      </div>
                    )}
                    {service.price_range && (
                      <div className="flex items-center gap-1.5 font-medium">
                        <Tag className="w-3.5 h-3.5 text-[#155E59]" />
                        <span>{service.price_range}</span>
                      </div>
                    )}
                  </div>

                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center justify-between w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-[#155E59] bg-white border border-[#E3E8E5] hover:bg-[#EEF5F1] hover:border-[#B9D5C8] transition-colors"
                  >
                    <span>Read Treatment Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
