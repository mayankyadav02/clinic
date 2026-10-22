import type { Metadata } from 'next';
import {
  Phone,
  MapPin,
  MessageSquare,
  ExternalLink,
  Navigation,
  AlertCircle,
} from 'lucide-react';
import { CLINIC_CONFIG, getTelUrl, getWhatsAppUrl } from '@/lib/config/clinic';
import { ContactForm } from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact & Directions — Shri Krishna Physiotherapy Clinic',
  description:
    'Get in touch with Dr. Suresh Yadav. Verified clinic telephone: 7891426494. Confirmed GPS coordinates: 27.2924909, 75.1829705.',
};

export default function ContactPage() {

  return (
    <div className="flex flex-col w-full bg-[#F8FAF8]">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#EEF5F1] to-[#F8FAF8] py-14 sm:py-18 border-b border-[#E3E8E5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DDEBE4] text-[#155E59] text-xs font-semibold mb-4 border border-[#B9D5C8]/60">
              <Phone className="w-3.5 h-3.5" />
              <span>Patient Communication Desk</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#202A29] tracking-tight leading-tight">
              Contact & Directions
            </h1>
            <p className="text-base sm:text-lg text-[#546462] mt-4 leading-relaxed">
              Have questions regarding physiotherapy treatments or scheduling a consultation? Reach out to{' '}
              <strong className="text-[#202A29] font-semibold">{CLINIC_CONFIG.doctorName}</strong> and the{' '}
              <strong className="text-[#202A29] font-semibold">{CLINIC_CONFIG.name}</strong> team.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid: Channels & Form */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#E3E8E5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Contact Cards */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#155E59]">
                  Reach Us Directly
                </span>
                <h2 className="text-2xl font-bold text-[#202A29] mt-1">
                  Verified Contact Channels
                </h2>
              </div>

              {/* Phone Card */}
              <div className="bg-[#F8FAF8] rounded-2xl p-6 border border-[#E3E8E5] space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#DDEBE4] text-[#155E59] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#202A29]">Telephone Line</h3>
                    <p className="text-xs text-[#546462]">Direct phone inquiries</p>
                  </div>
                </div>
                <div className="text-base font-bold text-[#155E59] pt-1">
                  {CLINIC_CONFIG.formattedPhone}
                </div>
                <p className="text-xs text-[#546462]">
                  Available during morning and evening clinic consultation hours.
                </p>
                <a
                  href={getTelUrl()}
                  className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-[#155E59] hover:bg-[#0F4541] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 mr-1.5" />
                  <span>Call {CLINIC_CONFIG.phone}</span>
                </a>
              </div>

              {/* WhatsApp Card */}
              <div className="bg-[#F8FAF8] rounded-2xl p-6 border border-[#E3E8E5] space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#EEF5F1] text-emerald-700 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#202A29]">WhatsApp Enquiry</h3>
                    <p className="text-xs text-[#546462]">Message the clinic</p>
                  </div>
                </div>
                <p className="text-xs text-[#546462]">
                  Send a generic inquiry regarding doctor availability and session slots.
                </p>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 mr-1.5" />
                  <span>Chat on WhatsApp</span>
                </a>
                <p className="text-xs text-[#546462]/70 italic text-center">
                  * Note: WhatsApp enquiry begins consultation scheduling and does not guarantee automatic slot booking.
                </p>
              </div>

              {/* Verified Location Card */}
              <div className="bg-[#F8FAF8] rounded-2xl p-6 border border-[#E3E8E5] space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#DDEBE4] text-[#155E59] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#202A29]">Clinic Coordinates</h3>
                    <p className="text-xs text-[#546462]">Confirmed GPS Position</p>
                  </div>
                </div>
                <div className="font-mono text-xs text-[#155E59] bg-white p-2.5 rounded-lg border border-[#E3E8E5]">
                  Lat: {CLINIC_CONFIG.coordinates.latitude}° N <br />
                  Lng: {CLINIC_CONFIG.coordinates.longitude}° E
                </div>
                <a
                  href={CLINIC_CONFIG.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-[#155E59] bg-white border border-[#E3E8E5] hover:bg-[#EEF5F1] transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 mr-1.5" />
                  <span>Open Google Maps</span>
                  <ExternalLink className="w-3 h-3 ml-1 opacity-70" />
                </a>
              </div>

              {/* Hours Notice Card */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-amber-900 space-y-2">
                <div className="flex items-center gap-2 font-semibold text-xs">
                  <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0" />
                  <span>Confirm Hours Prior to Visiting</span>
                </div>
                <p className="text-xs leading-relaxed text-amber-800">
                  Doctor timings are subject to clinical schedule adjustments. Please call ahead to confirm
                  same-day availability.
                </p>
              </div>
            </div>

            {/* Right Column: Interactive Consultation Request Form */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Map Embed Section */}
      <section className="py-16 sm:py-20 bg-[#F8FAF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-[#E3E8E5] p-8 sm:p-10 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#E3E8E5]">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#155E59]">
                  GPS Navigation
                </span>
                <h3 className="text-xl font-bold text-[#202A29] mt-0.5">
                  How to Reach Shri Krishna Physiotherapy Clinic
                </h3>
                <p className="text-xs sm:text-sm text-[#546462] mt-1">
                  Navigate directly using Google Maps with our confirmed coordinates: 27.2924909, 75.1829705.
                </p>
              </div>

              <a
                href={CLINIC_CONFIG.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#155E59] hover:bg-[#0F4541] transition-colors flex-shrink-0"
              >
                <Navigation className="w-4 h-4 text-[#DDEBE4]" />
                <span>Launch in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#546462]">
              <div className="p-4 rounded-xl bg-[#F8FAF8] border border-[#E3E8E5]">
                <strong className="text-[#202A29] block mb-1 font-semibold">1. Landmark Recognition:</strong>
                Located in the designated medical and commercial district, accessible via main road transport.
              </div>
              <div className="p-4 rounded-xl bg-[#F8FAF8] border border-[#E3E8E5]">
                <strong className="text-[#202A29] block mb-1 font-semibold">2. Parking & Drop-off:</strong>
                Vehicle drop-off is convenient right outside the clinic entrance for patients with restricted mobility.
              </div>
              <div className="p-4 rounded-xl bg-[#F8FAF8] border border-[#E3E8E5]">
                <strong className="text-[#202A29] block mb-1 font-semibold">3. Stretcher / Wheelchair:</strong>
                Please call our phone line (7891426494) 10 minutes prior to arrival if wheelchair assistance is needed.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
