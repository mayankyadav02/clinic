import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, CheckCircle2, ArrowRight, Zap } from 'lucide-react';
import { EquipmentItem } from '@/lib/config/clinic';
import { DemoBadge } from '@/components/common/DemoBadge';

interface EquipmentGalleryProps {
  equipment: EquipmentItem[];
}

export function EquipmentGallery({ equipment }: EquipmentGalleryProps) {
  return (
    <section className="py-16 sm:py-20 bg-[#F8FAF8] border-b border-[#E3E8E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DDEBE4] text-[#155E59] text-xs font-semibold mb-3">
              <Zap className="w-3.5 h-3.5" />
              <span>Modern Clinical Modalities</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#202A29] tracking-tight">
              Clinical Equipment & Apparatus
            </h2>
            <p className="text-sm sm:text-base text-[#546462] mt-2 max-w-2xl">
              Equipped with modern electrotherapy, spinal decompression, and active movement
              apparatus to complement manual physical therapy and accelerate natural tissue healing.
            </p>
          </div>

          <Link
            href="/equipment"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#155E59] hover:text-[#0F4541] group"
          >
            <span>Explore all modalities & safety specs</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {equipment.slice(0, 6).map((item) => {
            const photoSrc = item.photo_url || '/images/equipment/ultrasound-therapy.jpg';

            return (
              <div
                key={item.id || item.name}
                className="bg-white rounded-3xl border border-[#E3E8E5] hover:border-[#B9D5C8] hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {/* Equipment Demonstration Photo */}
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

                  <div className="p-6">
                    <h3 className="text-base sm:text-lg font-bold text-[#202A29] mb-2 group-hover:text-[#155E59] transition-colors">
                      {item.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#546462] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-3 border-t border-[#E3E8E5]/70 flex items-center justify-between text-xs text-[#155E59] font-medium">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>Calibrated & sanitized</span>
                  </div>
                  <Link
                    href="/equipment"
                    className="text-xs font-semibold text-[#155E59] hover:underline"
                  >
                    View Details &rarr;
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 p-4 rounded-2xl bg-white border border-[#E3E8E5] text-xs text-[#546462] flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-[#155E59] mt-0.5 flex-shrink-0" />
          <div>
            <strong className="text-[#202A29] font-semibold">Supervised Clinical Operation:</strong> All
            electrotherapy and mechanical traction equipment are operated strictly within patient comfort boundaries
            under the direct supervision of Dr. Suresh Yadav. Modality intensity is calibrated to individual tolerance.
          </div>
        </div>
      </div>
    </section>
  );
}
