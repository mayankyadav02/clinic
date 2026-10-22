import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Activity,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Phone,
  MessageSquare,
  Compass,
} from 'lucide-react';
import { CLINIC_CONFIG, getTelUrl, getWhatsAppUrl } from '@/lib/config/clinic';

export const metadata: Metadata = {
  title: 'What is Physiotherapy? — Clinical Guide & Education',
  description:
    'A comprehensive, plain-language guide explaining how physiotherapy works, clinical assessment protocols, guided exercise, and how therapy restores everyday movement.',
};

export default function WhatIsPhysiotherapyPage() {
  const everydaySituations = [
    {
      title: 'Walking & Step Tolerance',
      example: 'Walking to the local market or neighborhood park without limping or antalgic pain.',
      howItHelps: 'Re-aligns weight-bearing joint mechanics and strengthens hip abductors to stabilize pelvis.',
    },
    {
      title: 'Climbing & Descending Stairs',
      example: 'Stepping up without sharp knee patellofemoral catching or gripping the railing out of fear.',
      howItHelps: 'Builds quadriceps eccentric strength and improves ankle dorsiflexion flexibility.',
    },
    {
      title: 'Sitting at Work or Desk',
      example: 'Working on a computer for hours without persistent mid-back burning or neck stiffness.',
      howItHelps: 'Restores deep neck flexor endurance and thoracic spinal extension mobility.',
    },
    {
      title: 'Lifting & Carrying Groceries',
      example: 'Bending to lift shopping bags or household items without lumbar pinching or fear of spasms.',
      howItHelps: 'Teaches hip-hinge biomechanics and activates core intra-abdominal stabilizing pressure.',
    },
    {
      title: 'Rising from Low Chairs',
      example: 'Standing up smoothly from a low sofa or car seat without pushing with hands or grunting.',
      howItHelps: 'Strengthens gluteal power, knee extensor torque, and balance center-of-gravity transfer.',
    },
    {
      title: 'Returning to Sports & Play',
      example: 'Running, playing badminton, or playing with children without recurring muscle pulls.',
      howItHelps: 'Progressive agility drills, reactive balance retraining, and sports-specific loading.',
    },
  ];

  return (
    <div className="flex flex-col w-full bg-[#F8FAF8]">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#EEF5F1] to-[#F8FAF8] py-14 sm:py-20 border-b border-[#E3E8E5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-[#546462] mb-4">
            <Link href="/" className="hover:text-[#155E59] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#202A29] font-medium">What is Physiotherapy?</span>
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DDEBE4] text-[#155E59] text-xs font-semibold mb-4 border border-[#B9D5C8]/60">
              <Compass className="w-3.5 h-3.5" />
              <span>Comprehensive Health Education Guide</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#202A29] tracking-tight leading-tight">
              Understanding Physiotherapy: How Movement Heals
            </h1>
            <p className="text-base sm:text-lg text-[#546462] mt-4 leading-relaxed">
              Physiotherapy is an evidence-based healthcare profession focused on restoring movement, relieving physical
              discomfort, rebuilding strength, and empowering people to regain everyday independence under qualified clinical guidance.
            </p>
          </div>
        </div>
      </section>

      {/* Section 1: The Core Definition & How It Works */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#E3E8E5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#155E59]">
                The Clinical Foundation
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#202A29] tracking-tight">
                More Than Pain Relief — Restoring Biomechanical Function
              </h2>
              <div className="text-sm sm:text-base text-[#546462] leading-relaxed space-y-4">
                <p>
                  At its heart, <strong>physiotherapy (physical therapy)</strong> is the science of human movement. When an injury, surgery,
                  persistent strain, or neurological condition impairs how your body moves, protective muscle spasms, joint stiffness, and compensatory habits develop.
                </p>
                <p>
                  A qualified physiotherapist does not simply treat the painful spot in isolation. We evaluate the entire kinetic chain: identifying which muscles are inhibited, which joints have restricted glide, and how your daily habits contribute to tissue irritation.
                </p>
                <p>
                  Through scientifically structured exercise therapy, hands-on joint mobilization, and educational guidance, physiotherapy helps your body adapt, heal, and tolerate physical loads safely.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#EEF5F1] border border-[#B9D5C8] text-xs sm:text-sm text-[#155E59] flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="font-semibold block mb-0.5 text-[#202A29]">
                    Individual Variation Principle:
                  </strong>
                  Recovery is not uniform. Healing duration depends on injury severity, how long the condition has been present, overall medical health, and regular adherence to prescribed home exercises.
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-[#E3E8E5] shadow-sm bg-gray-100">
                <Image
                  src="/images/hero/physiotherapy-hero.jpg"
                  alt="Physiotherapist guiding a patient through rehabilitation exercises"
                  fill
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover"
                />
              </div>
              <div className="p-3 text-center text-xs text-[#546462]">
                Supervised rehabilitation on a clinical plinth table
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: What Happens During a Consultation */}
      <section className="py-16 sm:py-20 bg-[#F8FAF8] border-b border-[#E3E8E5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#155E59]">
              The Clinical Assessment
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#202A29] mt-1 tracking-tight">
              What to Expect During Your Evaluation
            </h2>
            <p className="text-sm text-[#546462] mt-2">
              A comprehensive assessment with Dr. Suresh Yadav consists of structured diagnostic steps to accurately pinpoint your problem:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-[#E3E8E5] shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#EEF5F1] text-[#155E59] flex items-center justify-center font-bold text-sm">
                01
              </div>
              <h3 className="text-base font-bold text-[#202A29]">In-Depth History</h3>
              <p className="text-xs sm:text-sm text-[#546462] leading-relaxed">
                Listening to when pain began, what movements trigger it, daily work ergonomic demands, and reviewing any prior X-ray/MRI reports.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#E3E8E5] shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#EEF5F1] text-[#155E59] flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h3 className="text-base font-bold text-[#202A29]">Joint Mobility & Goniometry</h3>
              <p className="text-xs sm:text-sm text-[#546462] leading-relaxed">
                Measuring exact range of motion in degrees. Identifying mechanical end-feels, joint capsule tightness, and movement catches.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#E3E8E5] shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#EEF5F1] text-[#155E59] flex items-center justify-center font-bold text-sm">
                03
              </div>
              <h3 className="text-base font-bold text-[#202A29]">Muscle & Nerve Testing</h3>
              <p className="text-xs sm:text-sm text-[#546462] leading-relaxed">
                Manual muscle testing to grade strength asymmetries and neurodynamic tests to assess sciatic or cervical nerve root tension.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#E3E8E5] shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#EEF5F1] text-[#155E59] flex items-center justify-center font-bold text-sm">
                04
              </div>
              <h3 className="text-base font-bold text-[#202A29]">Functional Movement Analysis</h3>
              <p className="text-xs sm:text-sm text-[#546462] leading-relaxed">
                Observing posture, gait patterns, squat mechanics, and spinal loading to formulate a customized rehabilitation roadmap.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Key Differences — Passive Relief vs. Active Physiotherapy */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#E3E8E5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#155E59]">
              Clarifying Common Misconceptions
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#202A29] mt-1 tracking-tight">
              Physiotherapy is NOT Just a Massage or Machine
            </h2>
            <p className="text-sm sm:text-base text-[#546462] mt-2">
              Patients often ask: &ldquo;How is clinical physiotherapy different from visiting a spa or using a home heating pad?&rdquo;
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-[#F8FAF8] border border-[#E3E8E5] space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold">
                Passive Modalities (Supporting Role Only)
              </div>
              <h3 className="text-lg font-bold text-[#202A29]">
                Ultrasound, Heat, & Electrotherapy
              </h3>
              <p className="text-xs sm:text-sm text-[#546462] leading-relaxed">
                Modalities like TENS or therapeutic ultrasound provide temporary comfort by dampening pain signaling and increasing blood flow.
                However, a machine cannot strengthen a weak stabilizing muscle, correct an abnormal walking limp, or retrain posture.
              </p>
              <div className="text-xs text-[#202A29]/70 pt-2 border-t border-[#E3E8E5]">
                <strong>Clinical reality:</strong> Used solely to open a therapeutic window of reduced pain so active movement can take place.
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-[#EEF5F1] border border-[#B9D5C8] space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#155E59] text-white text-xs font-semibold">
                Active Rehabilitation (The Core Foundation)
              </div>
              <h3 className="text-lg font-bold text-[#202A29]">
                Guided Exercise & Motor-Control Retraining
              </h3>
              <p className="text-xs sm:text-sm text-[#202A29]/80 leading-relaxed">
                Lasting joint and spinal stability requires your own muscles to absorb load. Physiotherapy utilizes progressive resistance,
                balance drills, and joint mobilization to build tissue capacity, preventing pain from returning when you resume active living.
              </p>
              <div className="text-xs text-[#155E59] font-medium pt-2 border-t border-[#B9D5C8]/80">
                <strong>Clinical reality:</strong> Active progressive loading is the only proven method for long-term musculoskeletal health.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Connecting to Everyday Situations */}
      <section className="py-16 sm:py-20 bg-[#F8FAF8] border-b border-[#E3E8E5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#155E59]">
              Everyday Application
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#202A29] mt-1 tracking-tight">
              How Physiotherapy Connects to Real Life
            </h2>
            <p className="text-sm text-[#546462] mt-2">
              Physical therapy exercises are not abstract gym movements—they are designed to make your daily tasks effortless:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {everydaySituations.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-[#E3E8E5] shadow-xs space-y-3 hover:border-[#B9D5C8] transition-colors"
              >
                <div className="flex items-center gap-2 text-xs font-bold text-[#155E59] uppercase tracking-wider">
                  <Activity className="w-4 h-4" />
                  <span>{item.title}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#202A29] font-semibold">
                  &ldquo;{item.example}&rdquo;
                </p>
                <p className="text-xs text-[#546462] leading-relaxed pt-2 border-t border-[#E3E8E5]">
                  <strong className="text-[#202A29]">Clinical focus:</strong> {item.howItHelps}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Benefits in Plain Language */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#E3E8E5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#155E59]">
              Evidence-Informed Outcomes
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#202A29] mt-1 tracking-tight">
              Potential Benefits of Supervised Physiotherapy
            </h2>
            <p className="text-sm sm:text-base text-[#546462] mt-2">
              Outcomes depend upon the initial assessment, tissue health, and individual consistency:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-[#F8FAF8] border border-[#E3E8E5] flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#155E59] mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-[#202A29]">Restoring Joint Mobility</h4>
                <p className="text-xs text-[#546462] mt-0.5">Reducing stiffness and regaining natural reaching and bending range.</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#F8FAF8] border border-[#E3E8E5] flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#155E59] mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-[#202A29]">Rebuilding Muscle Capacity</h4>
                <p className="text-xs text-[#546462] mt-0.5">Strengthening stabilizing muscles around vulnerable joints.</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#F8FAF8] border border-[#E3E8E5] flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#155E59] mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-[#202A29]">Movement Confidence</h4>
                <p className="text-xs text-[#546462] mt-0.5">Overcoming kinesiophobia (fear of movement) through graded exposure.</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#F8FAF8] border border-[#E3E8E5] flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#155E59] mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-[#202A29]">Post-Surgical Re-education</h4>
                <p className="text-xs text-[#546462] mt-0.5">Safely progressing weight-bearing and preventing scar adhesion.</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#F8FAF8] border border-[#E3E8E5] flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#155E59] mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-[#202A29]">Balance & Fall Prevention</h4>
                <p className="text-xs text-[#546462] mt-0.5">Improving proprioception, vestibular response, and coordination.</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#F8FAF8] border border-[#E3E8E5] flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#155E59] mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-[#202A29]">Independent Self-Care</h4>
                <p className="text-xs text-[#546462] mt-0.5">Learning ergonomic strategies so you can stay active without clinic dependence.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: When Physiotherapy is NOT Enough (Medical Referral Boundaries) */}
      <section className="py-16 sm:py-20 bg-[#EEF5F1] border-b border-[#B9D5C8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#155E59]">
              <AlertTriangle className="w-4 h-4" />
              <span>Clinical Boundaries & Medical Referrals</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#202A29] tracking-tight">
              When Physiotherapy Alone is Not Appropriate
            </h2>
            <p className="text-sm text-[#202A29]/80 leading-relaxed">
              Physiotherapy plays an essential role in musculoskeletal and rehabilitation medicine, but it does not replace urgent medical or surgical evaluation.
              If an individual presents with suspected bone fracture, systemic joint infection, malignant pain, or acute nerve compression, immediate medical referral is mandatory.
            </p>
            <div className="pt-2">
              <Link
                href="/healthy-living#warning-signs"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#155E59] hover:underline"
              >
                <span>Read our Emergency & Urgent Warning Signs Guide</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Consultation Desk CTA */}
      <section className="py-14 sm:py-18 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#F8FAF8] rounded-3xl border border-[#E3E8E5] p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#155E59]">
                Consultation Enquiries
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#202A29] mt-1">
                Have questions about your specific condition?
              </h3>
              <p className="text-xs sm:text-sm text-[#546462] mt-1 max-w-xl">
                Consult with Dr. Suresh Yadav for an unhurried, evidence-based physical evaluation.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={getWhatsAppUrl('Hello Dr. Suresh Yadav, I am reading the What is Physiotherapy guide and would like to ask about my symptoms.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-white bg-[#155E59] hover:bg-[#0F4541] shadow-xs transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-[#DDEBE4]" />
                <span>WhatsApp Enquiry</span>
              </a>

              <a
                href={getTelUrl()}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-[#202A29] bg-white border border-[#E3E8E5] hover:bg-[#F8FAF8] transition-colors"
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
