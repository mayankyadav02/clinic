import { MessageSquare, CalendarCheck, Activity } from 'lucide-react';
import { getTelUrl, getWhatsAppUrl } from '@/lib/config/clinic';

const STEPS = [
  {
    step: '01',
    icon: MessageSquare,
    title: 'Initial Enquiry',
    description: 'Call us at 7891426494 or send a brief WhatsApp message describing your condition (e.g., knee stiffness, back pain, sports injury).',
  },
  {
    step: '02',
    icon: CalendarCheck,
    title: 'Clinic Confirmation',
    description: "Our clinic team verifies Dr. Suresh Yadav's schedule and confirms your designated consultation date and time slot.",
  },
  {
    step: '03',
    icon: Activity,
    title: 'Evaluation & Care Plan',
    description: 'Visit the clinic for a thorough biomechanical assessment, initial therapeutic treatment, and your customized recovery protocol.',
  },
];

export function HowToGetStarted() {
  return (
    <section className="py-16 sm:py-20 bg-white border-b border-[#E3E8E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#155E59]">
            Simple 3-Step Process
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#202A29] mt-1 tracking-tight">
            How to Begin Your Rehabilitation
          </h2>
          <p className="text-sm sm:text-base text-[#546462] mt-2">
            Clear, transparent steps to schedule your physical therapy consultation with Dr. Suresh Yadav.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-[#F8FAF8] rounded-2xl p-7 border border-[#E3E8E5] relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl font-black text-[#155E59]/30 font-mono">
                      {step.step}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-[#DDEBE4] text-[#155E59] flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-[#202A29] mb-2">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#546462] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#E3E8E5]/60 text-xs text-[#155E59] font-medium flex items-center gap-1">
                  <span>Step {idx + 1} of 3</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action card */}
        <div className="mt-12 bg-gradient-to-r from-[#155E59] to-[#0F4541] rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-lg font-bold text-white">
              Ready to address your pain?
            </h4>
            <p className="text-xs sm:text-sm text-[#DDEBE4] mt-1">
              Inquire today with your preferred morning or evening time slot.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-[#155E59] bg-white hover:bg-[#EEF5F1] transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-[#155E59]" />
              <span>WhatsApp Message</span>
            </a>
            <a
              href={getTelUrl()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-colors"
            >
              <span>Call Clinic</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
