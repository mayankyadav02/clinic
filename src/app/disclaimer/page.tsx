import type { Metadata } from 'next';
import Link from 'next/link';
import { AlertTriangle, ArrowLeft, Phone, HeartPulse } from 'lucide-react';
import { CLINIC_CONFIG, getTelUrl } from '@/lib/config/clinic';
import { DemoBadge } from '@/components/common/DemoBadge';

export const metadata: Metadata = {
  title: 'Medical & Website Disclaimer — Shri Krishna Physiotherapy Clinic',
  description: 'Important medical information disclaimer for Shri Krishna Physiotherapy Clinic and Dr. Suresh Yadav.',
};

export default function DisclaimerPage() {
  return (
    <div className="flex flex-col w-full bg-[#F8FAF8]">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#EEF5F1] to-[#F8FAF8] py-12 sm:py-16 border-b border-[#E3E8E5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#155E59] hover:underline mb-4"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Home</span>
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <span className="w-8 h-8 rounded-lg bg-[#DDEBE4] text-[#155E59] flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#155E59]">
              Important Medical Guidance
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#202A29] tracking-tight">
            Medical & Website Disclaimer
          </h1>
          <p className="text-sm text-[#546462] mt-2">
            Shri Krishna Physiotherapy Clinic • Dr. Suresh Yadav
          </p>
        </div>
      </section>

      {/* Main Disclaimer Content */}
      <section className="py-14 sm:py-18 bg-white border-b border-[#E3E8E5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
            <DemoBadge label="Demo document" />
            <div>
              <strong>Compliance Notice:</strong> This medical disclaimer provides essential patient safeguards
              and outlines the legal boundary between digital educational materials and individualized clinical care.
            </div>
          </div>

          <div className="space-y-8 text-sm sm:text-base text-[#546462] leading-relaxed">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[#202A29] mb-3">
                1. General Educational Purpose Only
              </h2>
              <p>
                The information provided on this website—including articles, service descriptions, exercise descriptions,
                and FAQs—is published strictly for general health education and informational awareness. It does not
                constitute formal medical advice, clinical diagnosis, or an individual treatment prescription.
              </p>
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[#202A29] mb-3">
                2. No Doctor-Patient Relationship Established Online
              </h2>
              <p>
                Browsing this website, submitting an online enquiry, or sending a preliminary WhatsApp message does not
                in itself establish a legal doctor-patient relationship. A therapeutic relationship is only formalized
                following an in-person physical consultation and clinical assessment by Dr. Suresh Yadav at the clinic.
              </p>
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[#202A29] mb-3">
                3. Individual Outcomes & Variations
              </h2>
              <p>
                Physiotherapy and rehabilitation results vary widely based on individual age, tissue healing rates,
                prior surgical history, adherence to prescribed home exercises, and underlying medical comorbidities.
                Shri Krishna Physiotherapy Clinic does not guarantee identical outcomes or specific recovery timelines.
              </p>
            </div>

            {/* Emergency Warning Box */}
            <div className="p-6 rounded-2xl bg-red-50 border border-red-200 text-red-900 space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-red-950">
                <HeartPulse className="w-5 h-5 text-red-600" />
                <span>Emergency Situations & Acute Trauma</span>
              </div>
              <p className="text-xs sm:text-sm text-red-800 leading-relaxed">
                If you are experiencing severe acute trauma, suspected bone fractures, sudden loss of consciousness,
                chest pain, or acute loss of bowel/bladder control, please seek immediate emergency care at the nearest
                hospital emergency department. Do not delay urgent emergency care to seek physical therapy.
              </p>
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[#202A29] mb-3">
                4. Seeking Professional Medical Advice
              </h2>
              <p>
                Never disregard professional medical advice from your physician or delay in seeking medical attention
                because of information published on this website. Always consult with a qualified health provider before
                starting any new rehabilitation or physical exercise program.
              </p>
            </div>

            <div className="pt-4 border-t border-[#E3E8E5]">
              <p className="text-xs text-[#546462]">
                For questions regarding clinical physiotherapy appointments, call our verified telephone line:
              </p>
              <a
                href={getTelUrl()}
                className="inline-flex items-center gap-2 mt-2 text-sm font-bold text-[#155E59] hover:underline"
              >
                <Phone className="w-4 h-4" />
                <span>{CLINIC_CONFIG.formattedPhone}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
