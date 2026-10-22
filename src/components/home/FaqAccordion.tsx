'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import { FaqItem, getWhatsAppUrl } from '@/lib/config/clinic';
import { DemoBadge } from '@/components/common/DemoBadge';

interface FaqAccordionProps {
  faqs: FaqItem[];
}

export function FaqAccordion({ faqs }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 sm:py-20 bg-[#F8FAF8] border-b border-[#E3E8E5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#155E59]">
            Helpful Information
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#202A29] mt-1 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-[#546462] mt-2">
            Answers to common questions regarding therapy sessions, scheduling, and treatments.
          </p>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.id || index}
                className="bg-white rounded-2xl border border-[#E3E8E5] transition-all overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full py-4 sm:py-5 px-6 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#155E59]"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-[#202A29]">
                    {faq.question}
                  </span>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {faq.is_demo && (
                      <span className="hidden sm:inline">
                        <DemoBadge label="Demo FAQ" />
                      </span>
                    )}
                    <ChevronDown
                      className={`w-5 h-5 text-[#155E59] transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-[#546462] leading-relaxed border-t border-[#E3E8E5]/50">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Additional inquiry note */}
        <div className="mt-10 p-5 rounded-2xl bg-white border border-[#E3E8E5] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EEF5F1] text-[#155E59] flex items-center justify-center flex-shrink-0">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#202A29]">Have a specific clinical question?</h4>
              <p className="text-xs text-[#546462]">Dr. Suresh Yadav is available for consultation inquiries.</p>
            </div>
          </div>

          <a
            href={getWhatsAppUrl('Hello, I have a specific question regarding physiotherapy treatment at Shri Krishna Clinic.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#155E59] hover:bg-[#0F4541] transition-colors flex-shrink-0"
          >
            <MessageSquare className="w-4 h-4 text-[#DDEBE4]" />
            <span>Ask via WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
