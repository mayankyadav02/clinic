import Image from 'next/image';
import Link from 'next/link';
import { UserCheck, Award, GraduationCap, ArrowRight, Phone, MessageSquare } from 'lucide-react';
import { DoctorProfile, CLINIC_CONFIG, getTelUrl, getWhatsAppUrl } from '@/lib/config/clinic';
import { DemoBadge } from '@/components/common/DemoBadge';

interface DoctorIntroProps {
  doctor: DoctorProfile;
}

export function DoctorIntro({ doctor }: DoctorIntroProps) {
  const photoSrc = doctor.photo_url || '/images/doctor/dr-suresh-yadav-consultation.jpg';

  return (
    <section className="py-16 sm:py-20 bg-[#F8FAF8] border-b border-[#E3E8E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#DDEBE4] shadow-xs overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Column: Doctor Portrait & Visual */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#155E59] to-[#0F4541] p-6 sm:p-8 text-white flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs text-[#DDEBE4] border border-white/20">
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Lead Physiotherapist</span>
                  </div>
                  <DemoBadge
                    label="Demo portrait"
                    className="bg-black/40 text-amber-200 border-amber-300/40 text-[10px]"
                  />
                </div>

                {/* Consultation Image */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/20 shadow-inner mb-5">
                  <Image
                    src={photoSrc}
                    alt="Clinical consultation setting — Demonstration placeholder for Dr. Suresh Yadav"
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover object-center"
                  />
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {doctor.name}
                </h2>
                <p className="text-xs sm:text-sm text-[#DDEBE4] mt-0.5 font-medium">
                  {CLINIC_CONFIG.name}
                </p>

                {/* Clinical Focus Badges */}
                <div className="mt-5 space-y-2">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-[#DDEBE4]/70">
                    Key Clinical Disciplines
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {doctor.specializations.slice(0, 4).map((spec, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white/10 text-white border border-white/10"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Verified contact strip */}
              <div className="mt-6 pt-5 border-t border-white/15">
                <div className="text-xs text-[#DDEBE4]/80 mb-2 font-medium">
                  Direct Clinical Inquiries:
                </div>
                <div className="flex flex-wrap gap-2.5">
                  <a
                    href={getTelUrl()}
                    className="inline-flex items-center gap-1.5 text-xs text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-xl border border-white/15 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-300" />
                    <span>{CLINIC_CONFIG.formattedPhone}</span>
                  </a>
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-white bg-[#0F4541] hover:bg-black/20 px-3 py-1.5 rounded-xl border border-white/20 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#DDEBE4]" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Narrative & Credentials */}
            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#155E59]">
                    Doctor Profile
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#202A29] mt-1">
                    Dedicated to Restoring Your Quality of Life
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-[#546462] leading-relaxed">
                  {doctor.biography}
                </p>

                {/* Qualifications & Verification status */}
                <div className="p-5 rounded-2xl bg-[#F8FAF8] border border-[#E3E8E5] space-y-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#202A29] uppercase tracking-wider">
                      <GraduationCap className="w-4 h-4 text-[#155E59]" />
                      <span>Academic & Professional Credentials</span>
                    </div>
                    {doctor.is_demo && (
                      <DemoBadge label="Pending official certificate upload" />
                    )}
                  </div>

                  <ul className="space-y-1.5 text-xs sm:text-sm text-[#546462]">
                    {doctor.qualifications.map((q, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#155E59]" />
                        <span>{q}</span>
                      </li>
                    ))}
                    {doctor.registration_number && (
                      <li className="flex items-center gap-2 text-xs text-[#546462]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#155E59]" />
                        <span>Registration Status: {doctor.registration_number}</span>
                      </li>
                    )}
                  </ul>
                </div>

                <div className="flex items-center gap-3 text-xs text-[#546462]">
                  <Award className="w-4 h-4 text-[#155E59] flex-shrink-0" />
                  <span>
                    Consultations are carried out in a patient-friendly environment using modern therapeutic modalities.
                  </span>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#E3E8E5] flex items-center justify-between">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#155E59] hover:text-[#0F4541] transition-colors"
                >
                  <span>Read full doctor profile & clinic philosophy</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
