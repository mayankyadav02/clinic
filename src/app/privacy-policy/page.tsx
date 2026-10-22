import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { CLINIC_CONFIG, getTelUrl } from '@/lib/config/clinic';
import { DemoBadge } from '@/components/common/DemoBadge';

export const metadata: Metadata = {
  title: 'Privacy Policy — Shri Krishna Physiotherapy Clinic',
  description: 'Privacy policy and patient health data protection standards for Shri Krishna Physiotherapy Clinic.',
};

export default function PrivacyPolicyPage() {
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
              <ShieldCheck className="w-4 h-4" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#155E59]">
              Legal & Patient Rights
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#202A29] tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-sm text-[#546462] mt-2">
            Last Updated: October 2026 • Shri Krishna Physiotherapy Clinic
          </p>
        </div>
      </section>

      {/* Main Policy Content */}
      <section className="py-14 sm:py-18 bg-white border-b border-[#E3E8E5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
            <DemoBadge label="Demo document" />
            <div>
              <strong>Legal Notice:</strong> This privacy policy template is provided for initial website
              architecture and must be reviewed and formally signed off by the clinic owner before live commercial deployment.
            </div>
          </div>

          <div className="space-y-8 text-sm sm:text-base text-[#546462] leading-relaxed">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[#202A29] mb-3">
                1. Commitment to Patient Privacy
              </h2>
              <p>
                Shri Krishna Physiotherapy Clinic (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;the clinic&rdquo;),
                directed by Dr. Suresh Yadav, is dedicated to upholding ethical healthcare practices and protecting the
                personal and clinical health data of our patients and site visitors.
              </p>
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[#202A29] mb-3">
                2. Information We Collect
              </h2>
              <p className="mb-2">We collect information provided directly by you when arranging physiotherapy services:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                <li><strong>Contact details:</strong> Name, telephone number, and optional messaging handles.</li>
                <li><strong>Clinical assessment context:</strong> Primary musculoskeletal complaint, treatment history, surgical discharge summaries, or imaging reports shared voluntarily for rehabilitation planning.</li>
                <li><strong>Scheduling records:</strong> Appointment timestamps, therapy session notes, and attendance frequency.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[#202A29] mb-3">
                3. Purpose of Processing
              </h2>
              <p>
                Information gathered is utilized exclusively to provide high-quality physical therapy evaluation,
                coordinate consultation schedules, monitor rehabilitation progress, and comply with clinical documentation requirements under applicable Indian healthcare regulations. We do not sell or trade patient information.
              </p>
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[#202A29] mb-3">
                4. Confidentiality of Health Records
              </h2>
              <p>
                Patient physical therapy records and diagnostic observations are treated with strict professional confidentiality.
                Access is restricted strictly to authorized clinical personnel directly involved in your therapy plan.
              </p>
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[#202A29] mb-3">
                5. Contact Regarding Privacy Queries
              </h2>
              <p>
                If you have questions concerning your records or wish to update your contact details, please contact our
                clinic desk directly at:
              </p>
              <div className="mt-3 p-4 rounded-xl bg-[#F8FAF8] border border-[#E3E8E5] text-xs space-y-1">
                <div><strong>Clinic:</strong> Shri Krishna Physiotherapy Clinic</div>
                <div><strong>Practitioner:</strong> Dr. Suresh Yadav</div>
                <div><strong>Telephone:</strong> <a href={getTelUrl()} className="text-[#155E59] font-semibold hover:underline">{CLINIC_CONFIG.formattedPhone}</a></div>
                <div><strong>Coordinates:</strong> 27.2924909, 75.1829705</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
