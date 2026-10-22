import type { Metadata } from 'next';
import Image from 'next/image';
import {
  Activity,
  Award,
  GraduationCap,
  Stethoscope,
  Phone,
  MessageSquare,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { CLINIC_CONFIG, getTelUrl, getWhatsAppUrl } from '@/lib/config/clinic';
import { getDoctorProfile } from '@/lib/data';
import { DemoBadge } from '@/components/common/DemoBadge';
import { RehabilitationJourney } from '@/components/home/RehabilitationJourney';

export const metadata: Metadata = {
  title: 'About Dr. Suresh Yadav & Shri Krishna Physiotherapy Clinic',
  description:
    'Learn about our clinic philosophy, Dr. Suresh Yadav’s patient-centered rehabilitation approach, and our evidence-guided physical therapy standards.',
};

export default async function AboutPage() {
  const doctor = await getDoctorProfile();
  const doctorPhoto = doctor.photo_url || '/images/doctor/dr-suresh-yadav-consultation.jpg';

  return (
    <div className="flex flex-col w-full bg-[#F8FAF8]">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#EEF5F1] to-[#F8FAF8] py-14 sm:py-18 border-b border-[#E3E8E5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DDEBE4] text-[#155E59] text-xs font-semibold mb-4 border border-[#B9D5C8]/60">
              <Activity className="w-3.5 h-3.5" />
              <span>About Our Practice</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#202A29] tracking-tight leading-tight">
              Patient-First Physical Therapy & Rehabilitation
            </h1>
            <p className="text-base sm:text-lg text-[#546462] mt-4 leading-relaxed">
              At <strong className="text-[#202A29] font-semibold">{CLINIC_CONFIG.name}</strong>, we are committed to helping you
              overcome pain, restore normal movement patterns, and regain daily independence under the direct care of{' '}
              <strong className="text-[#202A29] font-semibold">{CLINIC_CONFIG.doctorName}</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Main Clinic Mission & Values */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#E3E8E5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#155E59]">
                Our Philosophy
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#202A29] tracking-tight">
                Addressing the Root Cause, Not Merely Masking Pain
              </h2>
              <p className="text-sm sm:text-base text-[#546462] leading-relaxed">
                Musculoskeletal discomfort is rarely an isolated symptom. Postural strains, muscle imbalances,
                and mechanical compensation frequently perpetuate joint stiffness and chronic inflammation.
              </p>
              <p className="text-sm sm:text-base text-[#546462] leading-relaxed">
                Dr. Suresh Yadav applies a rigorous clinical evaluation process: assessing joint mobility,
                neuromuscular firing patterns, and lifestyle ergonomics before designing your targeted treatment plan.
              </p>

              <div className="pt-2 space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#155E59] mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-[#202A29]">Comprehensive 1-on-1 Sessions</h4>
                    <p className="text-xs text-[#546462] mt-0.5">
                      Personalized therapeutic attention throughout your assessment and exercise progressions.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#155E59] mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-[#202A29]">Modern Therapeutic Equipment</h4>
                    <p className="text-xs text-[#546462] mt-0.5">
                      Ultrasound therapy, TENS electrotherapy, and traction beds to accelerate natural tissue healing.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#155E59] mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-[#202A29]">Sustainable Long-Term Prevention</h4>
                    <p className="text-xs text-[#546462] mt-0.5">
                      Empowering home exercise regimens that strengthen supporting muscles and prevent injury relapse.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Photo & Clinical Commitment */}
            <div className="lg:col-span-6 space-y-6">
              <div className="relative aspect-[16/11] rounded-3xl overflow-hidden border border-[#E3E8E5] shadow-sm bg-gray-100">
                <Image
                  src={doctorPhoto}
                  alt={`Dr. Suresh Yadav consultation demonstration`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover"
                />
                {doctor.is_demo && (
                  <div className="absolute top-4 right-4">
                    <DemoBadge label="Demo consultation photo" className="bg-black/60 text-amber-200 border-amber-300/40 text-[11px]" />
                  </div>
                )}
              </div>

              <div className="rounded-3xl bg-gradient-to-br from-[#155E59] to-[#0F4541] p-7 sm:p-8 text-white relative overflow-hidden shadow-xs">
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#DDEBE4] uppercase tracking-wider">
                    <Sparkles className="w-4 h-4" />
                    <span>Our Clinical Promise</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#DDEBE4] leading-relaxed italic">
                    &ldquo;Every patient who walks into Shri Krishna Physiotherapy Clinic deserves compassionate,
                    unhurried, and scientifically grounded physical rehabilitation. Our mission is to walk beside you
                    until you reach your fullest mobility and confidence.&rdquo;
                  </p>
                  <div className="pt-3 border-t border-white/15 flex items-center justify-between text-xs">
                    <span className="font-bold text-white">{CLINIC_CONFIG.doctorName}</span>
                    <span className="text-[#DDEBE4]/80">Lead Physiotherapist</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Doctor Profile Section */}
      <section className="py-16 sm:py-20 bg-[#F8FAF8] border-b border-[#E3E8E5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#155E59]">
              Physiotherapist Profile
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#202A29] mt-1 tracking-tight">
              About Dr. Suresh Yadav
            </h2>
            <p className="text-sm sm:text-base text-[#546462] mt-2">
              Dedicated practitioner guiding functional rehabilitation, injury recovery, and pain management.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#E3E8E5] p-8 sm:p-10 shadow-xs space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 space-y-4">
                <h3 className="text-xl font-bold text-[#202A29]">
                  Background & Clinical Experience
                </h3>
                <p className="text-sm sm:text-base text-[#546462] leading-relaxed">
                  {doctor.biography}
                </p>
                <p className="text-sm sm:text-base text-[#546462] leading-relaxed">
                  With focused clinical exposure in rehabilitating sports trauma, post-operative arthroplasties,
                  spinal disc compressions, and neurological deficits, Dr. Suresh Yadav emphasizes safe, progressive
                  functional loading.
                </p>
              </div>

              <div className="lg:col-span-4 bg-[#F8FAF8] rounded-xl p-6 border border-[#E3E8E5] space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase text-[#155E59]">
                    <GraduationCap className="w-4 h-4" />
                    <span>Credentials</span>
                  </div>
                  {doctor.is_demo && (
                    <DemoBadge label="Pending doc upload" />
                  )}
                </div>

                <ul className="space-y-2 text-xs sm:text-sm text-[#546462]">
                  {doctor.qualifications.map((q, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#155E59] mt-1.5 flex-shrink-0" />
                      <span>{q}</span>
                    </li>
                  ))}
                  {doctor.registration_number && (
                    <li className="flex items-start gap-2 text-xs text-[#546462] pt-2 border-t border-[#E3E8E5]">
                      <Award className="w-3.5 h-3.5 text-[#155E59] mt-0.5 flex-shrink-0" />
                      <span>{doctor.registration_number}</span>
                    </li>
                  )}
                </ul>

                <p className="text-xs text-[#546462]/80 italic pt-2 border-t border-[#E3E8E5]">
                  Official medical council registration certificates will be updated directly by the clinic owner.
                </p>
              </div>
            </div>

            {/* Specialization Matrix */}
            <div className="pt-6 border-t border-[#E3E8E5]">
              <h4 className="text-sm font-bold text-[#202A29] mb-4 uppercase tracking-wider text-xs">
                Areas of Focused Expertise
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {doctor.specializations.map((spec, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-[#F8FAF8] border border-[#E3E8E5] text-xs font-medium text-[#202A29] flex items-center gap-2.5"
                  >
                    <Stethoscope className="w-4 h-4 text-[#155E59] flex-shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clinical Rehabilitation Pathway */}
      <RehabilitationJourney />

      {/* Consultation & Directions Bar */}
      <section className="py-14 sm:py-18 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-[#EEF5F1] border border-[#B9D5C8]/80 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <h3 className="text-lg font-bold text-[#202A29]">
                Would you like to consult Dr. Suresh Yadav?
              </h3>
              <p className="text-xs sm:text-sm text-[#546462]">
                Verified telephone enquiry line is available daily: {CLINIC_CONFIG.formattedPhone}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={getWhatsAppUrl('Hello Dr. Suresh Yadav, I am reading about your clinic on the website and would like to consult with you.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#155E59] hover:bg-[#0F4541] transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-[#DDEBE4]" />
                <span>Enquire via WhatsApp</span>
              </a>

              <a
                href={getTelUrl()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-[#202A29] bg-white border border-[#E3E8E5] hover:bg-[#F8FAF8] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#155E59]" />
                <span>Call Clinic</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
