import React from 'react';
import Link from 'next/link';
import { Star, MessageSquareQuote, ShieldCheck, ArrowRight } from 'lucide-react';
import { TestimonialItem } from '@/lib/config/clinic';

interface ReviewsSectionProps {
  reviews: TestimonialItem[];
}

export function ReviewsSection({ reviews }: ReviewsSectionProps) {
  // If no published reviews, do not render an empty container on the homepage
  if (!reviews || reviews.length === 0) {
    return null;
  }

  return (
    <section className="py-16 sm:py-20 bg-[#F8FAF8] border-b border-[#E3E8E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DDEBE4] text-[#155E59] text-xs font-semibold mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Experiences</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#202A29] tracking-tight">
              Patient Experiences & Recovery Stories
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#546462]">
              Shared with patient permission following structured rehabilitation and physical therapy care.
            </p>
          </div>

          <Link
            href="/reviews"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#155E59] hover:text-[#0F4541] group self-start md:self-auto"
          >
            <span>View All Stories & Guidelines</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.slice(0, 3).map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl p-6 border border-[#E3E8E5] shadow-xs flex flex-col justify-between hover:border-[#B9D5C8] transition-all"
            >
              <div>
                {/* Rating Stars & Quote Icon */}
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
                  <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#EEF5F1] text-[#155E59] text-[11px] font-semibold mb-3">
                    {review.condition_treated}
                  </span>
                )}

                {/* Review Content */}
                <p className="text-sm text-[#202A29] leading-relaxed italic">
                  &ldquo;{review.content}&rdquo;
                </p>
              </div>

              {/* Patient Identifier */}
              <div className="mt-6 pt-4 border-t border-[#E3E8E5]/60 flex items-center justify-between text-xs">
                <span className="font-bold text-[#202A29]">
                  {review.patient_name}
                </span>
                <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Verified</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
