'use client';

import { useState } from 'react';
import { MessageSquare, CheckCircle2, Send } from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/config/clinic';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    concern: 'Back or Neck Pain',
    preferredTime: 'Morning (09:00 - 13:00)',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleWhatsAppDirect = () => {
    const text = `Hello Dr. Suresh Yadav, my name is ${formData.name || 'a patient'}. I am enquiring about physiotherapy for ${formData.concern}. Preferred time: ${formData.preferredTime}.`;
    window.open(getWhatsAppUrl(text), '_blank');
  };

  return (
    <div className="bg-[#F8FAF8] rounded-3xl p-7 sm:p-9 border border-[#E3E8E5] shadow-xs">
      <div className="mb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#155E59]">
          Direct Consultation Request
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-[#202A29] mt-1">
          Request an Appointment Slot
        </h3>
        <p className="text-xs sm:text-sm text-[#546462] mt-1">
          Fill in your details below and our team will get in touch with you to confirm Dr. Suresh Yadav&apos;s availability.
        </p>
      </div>

      {submitted ? (
        <div className="bg-white rounded-2xl p-8 border border-[#B9D5C8] text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-[#EEF5F1] text-[#155E59] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h4 className="text-lg font-bold text-[#202A29]">Enquiry Recorded</h4>
          <p className="text-xs sm:text-sm text-[#546462] leading-relaxed max-w-md mx-auto">
            Thank you, <strong className="text-[#202A29]">{formData.name}</strong>. Our clinic team will reach you
            at <strong className="text-[#202A29]">{formData.phone}</strong> to confirm your consultation schedule.
          </p>

          <div className="pt-2">
            <button
              type="button"
              onClick={handleWhatsAppDirect}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-[#DDEBE4]" />
              <span>Continue via WhatsApp for faster reply</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="text-xs text-[#546462] underline block mx-auto pt-2 hover:text-[#202A29]"
          >
            Submit another enquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-xs font-bold text-[#202A29] mb-1.5">
              Your Full Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Ramesh Kumar"
              className="w-full px-4 py-2.5 rounded-xl border border-[#E3E8E5] bg-white text-sm text-[#202A29] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#155E59]"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-xs font-bold text-[#202A29] mb-1.5">
              Contact Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="e.g. 9876543210"
              className="w-full px-4 py-2.5 rounded-xl border border-[#E3E8E5] bg-white text-sm text-[#202A29] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#155E59]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="concern" className="block text-xs font-bold text-[#202A29] mb-1.5">
                Primary Physical Concern
              </label>
              <select
                id="concern"
                value={formData.concern}
                onChange={(e) => setFormData({ ...formData, concern: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-[#E3E8E5] bg-white text-sm text-[#202A29] focus:outline-none focus:ring-2 focus:ring-[#155E59]"
              >
                <option value="Back or Neck Pain">Back or Neck Pain</option>
                <option value="Knee / Shoulder Joint Stiffness">Knee / Shoulder Joint Stiffness</option>
                <option value="Sports Injury & Sprain">Sports Injury & Sprain</option>
                <option value="Post-Surgery Rehabilitation">Post-Surgery Rehabilitation</option>
                <option value="Neurological / Sciatica Care">Neurological / Sciatica Care</option>
                <option value="General Musculoskeletal Check">General Musculoskeletal Check</option>
              </select>
            </div>

            <div>
              <label htmlFor="preferredTime" className="block text-xs font-bold text-[#202A29] mb-1.5">
                Preferred Timing
              </label>
              <select
                id="preferredTime"
                value={formData.preferredTime}
                onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-[#E3E8E5] bg-white text-sm text-[#202A29] focus:outline-none focus:ring-2 focus:ring-[#155E59]"
              >
                <option value="Morning (09:00 - 13:00)">Morning (09:00 - 13:00)</option>
                <option value="Evening (16:00 - 20:00)">Evening (16:00 - 20:00)</option>
                <option value="Any Available Slot">Any Available Slot</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="notes" className="block text-xs font-bold text-[#202A29] mb-1.5">
              Additional Details (Optional)
            </label>
            <textarea
              id="notes"
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Briefly describe your symptoms or how long you have experienced pain..."
              className="w-full px-4 py-2.5 rounded-xl border border-[#E3E8E5] bg-white text-sm text-[#202A29] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#155E59]"
            />
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              type="submit"
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#155E59] hover:bg-[#0F4541] shadow-xs transition-colors"
            >
              <Send className="w-4 h-4 text-[#DDEBE4]" />
              <span>Submit Consultation Request</span>
            </button>

            <button
              type="button"
              onClick={handleWhatsAppDirect}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold text-emerald-800 bg-[#EEF5F1] hover:bg-emerald-100 border border-emerald-200 transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-emerald-700" />
              <span>Send via WhatsApp</span>
            </button>
          </div>

          <p className="text-xs text-[#546462]/80 text-center pt-2">
            * Submitting an enquiry does not constitute an automatically confirmed medical appointment. Our clinic staff will review and confirm.
          </p>
        </form>
      )}
    </div>
  );
}
