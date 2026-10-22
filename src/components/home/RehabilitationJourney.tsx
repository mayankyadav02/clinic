import {
  Stethoscope,
  Activity,
  Dumbbell,
  ShieldCheck,
  CheckCircle2,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import { CLINIC_CONFIG, getWhatsAppUrl } from '@/lib/config/clinic';

export function RehabilitationJourney() {
  const phases = [
    {
      phase: 'Phase 01',
      title: 'Diagnostic Evaluation & Biomechanical Assessment',
      duration: 'Initial Visit (45–60 mins)',
      icon: Stethoscope,
      description:
        'Dr. Suresh Yadav listens to your symptom history, evaluates joint mobility, tests muscle imbalances, and identifies the exact root cause of your discomfort without rushing.',
      highlights: [
        'Postural & gait alignment analysis',
        'Range-of-motion & muscle grading',
        'Clear, plain-language diagnosis explanation',
      ],
    },
    {
      phase: 'Phase 02',
      title: 'Targeted Pain Relief & Tissue Decompression',
      duration: 'Sessions 1 to 3',
      icon: Activity,
      description:
        'We apply gentle hands-on joint mobilization and calibrated modalities (ultrasound, TENS, or spinal traction) to calm inflamed tissues, reduce muscle spasm, and lower acute pain.',
      highlights: [
        'Non-invasive electrotherapy & ultrasound',
        'Manual therapy & trigger point release',
        'Immediate reduction in protective muscle guarding',
      ],
    },
    {
      phase: 'Phase 03',
      title: 'Progressive Loading & Functional Rehabilitation',
      duration: 'Sessions 4 to 8+',
      icon: Dumbbell,
      description:
        'Once acute pain is managed, we systematically rebuild stability. Using kinetic resistance bands, Swiss balls, and motor-control exercises, your muscles learn to support joints correctly.',
      highlights: [
        'Graded resistance band loading',
        'Core & vestibular balance retraining',
        'Movement correction for lifting and sitting',
      ],
    },
    {
      phase: 'Phase 04',
      title: 'Long-Term Ergonomics & Independent Maintenance',
      duration: 'Ongoing Health',
      icon: ShieldCheck,
      description:
        'You receive a tailored home movement routine and workplace ergonomic strategies to prevent future recurrence and maintain lasting physical freedom without reliance on frequent clinical visits.',
      highlights: [
        'Personalized home exercise protocol',
        'Workstation & sleep posture guidelines',
        'Long-term joint health maintenance',
      ],
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-[#E3E8E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DDEBE4] text-[#155E59] text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Structured Clinical Pathway</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#202A29] tracking-tight">
            Your Rehabilitation Journey
          </h2>
          <p className="text-sm sm:text-base text-[#546462] mt-3 leading-relaxed">
            Rehabilitation is not a quick fix—it is a structured, collaborative process designed to safely restore
            your mobility, strength, and confidence under the supervision of {CLINIC_CONFIG.doctorName}.
          </p>
        </div>

        {/* 4 Phases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {phases.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-[#F8FAF8] rounded-3xl p-6 sm:p-7 border border-[#E3E8E5] hover:border-[#B9D5C8] hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-xs font-bold text-[#155E59] uppercase tracking-wider bg-[#DDEBE4] px-2.5 py-1 rounded-lg">
                      {item.phase}
                    </span>
                    <span className="text-[11px] font-medium text-[#546462]">
                      {item.duration}
                    </span>
                  </div>

                  <div className="w-12 h-12 rounded-2xl bg-white border border-[#E3E8E5] text-[#155E59] flex items-center justify-center mb-5 shadow-2xs group-hover:bg-[#155E59] group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-base font-bold text-[#202A29] mb-3 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#546462] leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E3E8E5]/80 space-y-2">
                  {item.highlights.map((point, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2 text-xs text-[#202A29]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#155E59] mt-0.5 flex-shrink-0" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Clinical Integrity & Testimonial Ethics Banner */}
        <div className="mt-12 rounded-3xl bg-[#EEF5F1] border border-[#B9D5C8] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#155E59]">
              <ShieldCheck className="w-4 h-4" />
              <span>Ethical Healthcare Practice Notice</span>
            </div>
            <h4 className="text-sm sm:text-base font-bold text-[#202A29]">
              Committed to Transparent, Evidence-Guided Physiotherapy
            </h4>
            <p className="text-xs text-[#546462] leading-relaxed">
              In accordance with professional healthcare ethics, we do not publish unverified marketing testimonials.
              Every human spine, joint, and nerve injury recovers at an individual pace depending on chronicity and physical conditioning.
            </p>
          </div>

          <a
            href={getWhatsAppUrl('Hello Dr. Suresh Yadav, I would like to schedule an initial consultation to evaluate my physical symptoms.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-white bg-[#155E59] hover:bg-[#0F4541] shadow-xs flex-shrink-0 transition-colors"
          >
            <MessageSquare className="w-4 h-4 text-[#DDEBE4]" />
            <span>Begin Your Evaluation</span>
          </a>
        </div>
      </div>
    </section>
  );
}
