import React from 'react';
import type { Metadata } from 'next';
import {
  Star,
  MessageSquareQuote,
  ShieldCheck,
  HeartHandshake,
  Lock,
  ArrowRight,
  MessageSquare,
  AlertTriangle,
} from 'lucide-react';
import { CLINIC_CONFIG, getWhatsAppUrl } from '@/lib/config/clinic';
import { getTestimonials } from '@/lib/data';

export const metadata: Metadata = {
  title: `Reviews & Real Stories | ${CLINIC_CONFIG.name}`,
  description: `Read genuine patient recovery experiences and clinical rehabilitation stories from Dr. Suresh Yadav's practice at ${CLINIC_CONFIG.name}.`,
};

export default async function ReviewsPage() {
  const reviews = await getTestimonials(true);

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#F8FAF8]">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#EEF5F1] to-[#F8FAF8] border-b border-[#E3E8E5] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DDEBE4] text-[#155E59] text-xs font-semibold mb-4">
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>Transparent Patient Care</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#202A29] tracking-tight">
              Reviews & Real Stories
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#546462] leading-relaxed">
              Read authentic experiences from patients who have completed structured rehabilitation pathways with{' '}
              <strong className="text-[#202A29]">{CLINIC_CONFIG.doctorName}</strong>. Every story shared represents personal clinical progress and is published strictly with patient consent.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 sm:py-16 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {reviews && reviews.length > 0 ? (
            /* Published Reviews Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E3E8E5] shadow-xs flex flex-col justify-between hover:border-[#B9D5C8] transition-all"
                >
                  <div>
                    {/* Rating & Quote */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < (review.rating || 5)
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-gray-200 fill-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                      <MessageSquareQuote className="w-5 h-5 text-[#B9D5C8]" />
                    </div>

                    {/* Condition Tag */}
                    {review.condition_treated && (
                      <span className="inline-block px-2.5 py-1 rounded-md bg-[#EEF5F1] text-[#155E59] text-xs font-semibold mb-3">
                        {review.condition_treated}
                      </span>
                    )}

                    {/* Quote Content */}
                    <p className="text-sm sm:text-base text-[#202A29] leading-relaxed italic">
                      &ldquo;{review.content}&rdquo;
                    </p>
                  </div>

                  {/* Patient Name / Verification */}
                  <div className="mt-6 pt-4 border-t border-[#E3E8E5]/70 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-[#202A29] block">
                        {review.patient_name}
                      </span>
                      <span className="text-[11px] text-[#546462]">
                        Rehabilitation Completed
                      </span>
                    </div>
                    <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Verified Consent</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Tasteful Empty State */
            <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-[#E3E8E5] shadow-xs text-center space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-[#EEF5F1] text-[#155E59] flex items-center justify-center mx-auto">
                <Lock className="w-7 h-7" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold text-[#202A29]">
                  Patient stories will appear here once they have been shared with permission.
                </h3>
                <p className="text-sm sm:text-base text-[#546462] leading-relaxed">
                  At <strong className="text-[#202A29]">{CLINIC_CONFIG.name}</strong>, we adhere strictly to healthcare privacy and medical advertising ethics. We never generate artificial patient testimonials, ratings, or recovery guarantees.
                </p>
              </div>

              <div className="bg-[#F8FAF8] rounded-2xl p-5 border border-[#E3E8E5] text-left text-xs text-[#546462] space-y-2">
                <div className="font-bold text-[#202A29] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#155E59]" />
                  <span>Our Medical Ethics Commitment</span>
                </div>
                <p>
                  • We protect patient privacy and confidential health records at all times.
                </p>
                <p>
                  • Individual therapy outcomes depend on biomechanical factors, medical history, and compliance with prescribed exercise programs.
                </p>
                <p>
                  • Only verified patient reviews submitted with signed consent are published.
                </p>
              </div>

              <div className="pt-2">
                <a
                  href={getWhatsAppUrl(
                    'Hello Dr. Suresh Yadav, I would like to submit my rehabilitation experience for Shri Krishna Physiotherapy Clinic.'
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#155E59] hover:bg-[#0F4541] shadow-xs transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Share Your Experience via WhatsApp</span>
                </a>
              </div>
            </div>
          )}

          {/* Feedback Submission Guidance Card */}
          <div className="mt-14 max-w-4xl mx-auto bg-gradient-to-r from-[#EEF5F1] to-[#F8FAF8] rounded-3xl p-6 sm:p-8 border border-[#B9D5C8]/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <h4 className="text-base sm:text-lg font-bold text-[#202A29]">
                Treated at Shri Krishna Physiotherapy Clinic?
              </h4>
              <p className="text-xs sm:text-sm text-[#546462] leading-relaxed">
                Your feedback helps other individuals in the community understand what to expect during physical therapy and rehabilitation. Let us know how your mobility and recovery progressed.
              </p>
            </div>

            <a
              href={getWhatsAppUrl(
                'Hello Dr. Suresh Yadav, I would like to share my patient feedback after my physiotherapy sessions.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#155E59] hover:bg-[#0F4541] shadow-xs transition-colors flex-shrink-0"
            >
              <MessageSquare className="w-4 h-4 text-[#DDEBE4]" />
              <span>Submit Feedback</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Clinical Disclaimer Notice */}
          <div className="mt-10 max-w-4xl mx-auto p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-amber-700 mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-bold">Medical Disclaimer:</span> Patient stories and reviews reflect individual personal experiences and do not constitute a guarantee of identical clinical outcomes. Physiotherapy evaluation is required to diagnose your specific musculoskeletal condition and formulate an appropriate treatment plan. For medical emergencies, call <strong>112</strong> immediately.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
