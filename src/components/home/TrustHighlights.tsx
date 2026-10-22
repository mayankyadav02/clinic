import { Stethoscope, Activity, Sparkles, HeartHandshake } from 'lucide-react';
import { CLINIC_CONFIG } from '@/lib/config/clinic';

const TRUST_PILLARS = [
  {
    icon: Stethoscope,
    title: 'Individualized Clinical Assessment',
    description: `Each patient receives focused 1-on-1 evaluation by ${CLINIC_CONFIG.doctorName} to diagnose the specific biomechanical cause of pain.`,
  },
  {
    icon: Activity,
    title: 'Phased Rehabilitation Protocols',
    description: 'Structured recovery plans that advance safely from acute pain relief into progressive joint mobilization and muscle strengthening.',
  },
  {
    icon: Sparkles,
    title: 'Modern Electro & Manual Modalities',
    description: 'Access to proven therapeutic equipment including ultrasound therapy, TENS electro-stimulation, and precision spinal traction.',
  },
  {
    icon: HeartHandshake,
    title: 'Postural & Home Guidance',
    description: 'Long-term healing supported by personalized home exercise regimens, ergonomic advice, and lifestyle modifications to prevent relapse.',
  },
];

export function TrustHighlights() {
  return (
    <section className="py-14 sm:py-18 bg-white border-b border-[#E3E8E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#155E59]">
            Why Choose Our Clinic
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#202A29] mt-1.5 tracking-tight">
            Evidence-Informed, Compassionate Care
          </h2>
          <p className="text-sm sm:text-base text-[#546462] mt-2">
            Our approach prioritizes patient safety, measurable functional improvement, and respectful, personalized attention.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_PILLARS.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={index}
                className="bg-[#F8FAF8] rounded-xl p-6 border border-[#E3E8E5] hover:border-[#B9D5C8] transition-all hover:shadow-xs group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#DDEBE4] text-[#155E59] flex items-center justify-center mb-4 group-hover:bg-[#155E59] group-hover:text-white transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-[#202A29] mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#546462] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
