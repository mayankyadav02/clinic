import Link from 'next/link';
import { Phone, MapPin, MessageSquare, ShieldCheck, ArrowUpRight, Lock, Eye } from 'lucide-react';
import { CLINIC_CONFIG, getTelUrl, getWhatsAppUrl } from '@/lib/config/clinic';
import { ClinicLogo } from '@/components/common/ClinicLogo';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#202A29] text-[#E3E8E5] border-t border-[#155E59]/40 mt-auto">
      {/* Top Banner / Clinic Assurance */}
      <div className="border-b border-white/10 bg-[#155E59]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#155E59] flex items-center justify-center text-white flex-shrink-0">
                <ShieldCheck className="w-5 h-5 text-[#DDEBE4]" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">
                  Dedicated Physiotherapy & Rehabilitation Care
                </h4>
                <p className="text-xs text-[#DDEBE4]/80">
                  Led by {CLINIC_CONFIG.doctorName} — individualized therapeutic interventions and guided recovery.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={getTelUrl()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-white/10 hover:bg-white/20 transition-colors border border-white/10"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-300" />
                <span>Call {CLINIC_CONFIG.formattedPhone}</span>
              </a>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-[#155E59] hover:bg-[#0F4541] transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#DDEBE4]" />
                <span>WhatsApp Enquiry</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1 & 2: Brand & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <ClinicLogo size="md" theme="dark" />

            <p className="text-sm text-[#E3E8E5]/80 leading-relaxed max-w-sm">
              Providing patient-centered physical therapy, pain management, joint rehabilitation,
              and post-surgical recovery care guided by {CLINIC_CONFIG.doctorName}.
            </p>

            <div className="space-y-2 pt-2 text-xs text-[#E3E8E5]/90">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#DDEBE4] mt-0.5 flex-shrink-0" />
                <span>Verified Contact: <a href={getTelUrl()} className="text-white hover:underline">{CLINIC_CONFIG.phone}</a></span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#DDEBE4] mt-0.5 flex-shrink-0" />
                <div>
                  <span>Location Coordinates: 27.2924909° N, 75.1829705° E</span>
                  <br />
                  <a
                    href={CLINIC_CONFIG.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#DDEBE4] hover:text-white underline inline-flex items-center gap-1 mt-0.5"
                  >
                    <span>Open in Google Maps</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#DDEBE4] mb-4">
              Explore & Learn
            </h4>
            <ul className="space-y-2.5 text-sm text-[#E3E8E5]/80">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Dr. Suresh Yadav
                </Link>
              </li>
              <li>
                <Link href="/what-is-physiotherapy" className="hover:text-white transition-colors">
                  What is Physiotherapy?
                </Link>
              </li>
              <li>
                <Link href="/healthy-living" className="hover:text-white transition-colors">
                  Healthy Living Guide
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-white transition-colors">
                  Reviews & Real Stories
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Clinical Services
                </Link>
              </li>
              <li>
                <Link href="/equipment" className="hover:text-white transition-colors">
                  Equipment & Facilities
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Location & Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Featured Treatments */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#DDEBE4] mb-4">
              Treatments
            </h4>
            <ul className="space-y-2.5 text-sm text-[#E3E8E5]/80">
              <li>
                <Link href="/services/orthopedic-rehabilitation" className="hover:text-white transition-colors">
                  Orthopedic Rehab
                </Link>
              </li>
              <li>
                <Link href="/services/sports-injury-treatment" className="hover:text-white transition-colors">
                  Sports Injury Care
                </Link>
              </li>
              <li>
                <Link href="/services/neurological-rehabilitation" className="hover:text-white transition-colors">
                  Neurological Physical Therapy
                </Link>
              </li>
              <li>
                <Link href="/services/post-surgical-rehabilitation" className="hover:text-white transition-colors">
                  Post-Surgical Recovery
                </Link>
              </li>
              <li>
                <Link href="/services/pediatric-physiotherapy" className="hover:text-white transition-colors">
                  Pediatric Physiotherapy
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Legal & Administrative */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#DDEBE4] mb-4">
              Governance & Policies
            </h4>
            <ul className="space-y-2.5 text-sm text-[#E3E8E5]/80">
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-white transition-colors">
                  Medical Disclaimer
                </Link>
              </li>
              <li className="pt-3 border-t border-white/10 space-y-2">
                <Link
                  href="/admin/login"
                  className="text-xs text-[#DDEBE4]/80 hover:text-white flex items-center gap-1.5 transition-colors font-medium"
                >
                  <Lock className="w-3.5 h-3.5 text-[#DDEBE4]" />
                  <span>Admin Login</span>
                </Link>
                <Link
                  href="/admin?preview=demo"
                  className="text-xs text-[#DDEBE4]/80 hover:text-white flex items-center gap-1.5 transition-colors font-medium"
                >
                  <Eye className="w-3.5 h-3.5 text-emerald-400" />
                  <span>CMS Demo Preview</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Demo Content Transparency Notice */}
        <div className="mt-12 pt-6 border-t border-white/10 text-xs text-[#E3E8E5]/60 bg-white/5 p-4 rounded-xl">
          <p className="font-medium text-[#DDEBE4] mb-1">
            Clinic Information Notice:
          </p>
          <p>
            Shri Krishna Physiotherapy Clinic is operated under the clinical leadership of Dr. Suresh Yadav.
            Verified coordinates (27.2924909°N, 75.1829705°E) and phone number ({CLINIC_CONFIG.phone}) are active for patient enquiries.
            This website provides educational information and does not substitute direct medical consultation. For emergency medical symptoms in India, call <strong>112</strong> immediately.
          </p>
        </div>

        {/* Bottom copyright row */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#E3E8E5]/60 gap-4">
          <p>© {currentYear} Shri Krishna Physiotherapy Clinic. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-white">Privacy</Link>
            <Link href="/disclaimer" className="hover:text-white">Medical Disclaimer</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
