import { Clock, Phone, AlertCircle, Calendar } from 'lucide-react';
import { ScheduleItem, CLINIC_CONFIG, getTelUrl } from '@/lib/config/clinic';
import { DemoBadge } from '@/components/common/DemoBadge';

interface ClinicHoursProps {
  schedule: ScheduleItem[];
}

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function ClinicHours({ schedule }: ClinicHoursProps) {
  const isAnyDemo = schedule.some((s) => s.is_demo);

  return (
    <section className="py-16 sm:py-20 bg-[#F8FAF8] border-b border-[#E3E8E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Context & Confirmation Notice */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#155E59]">
                Consultation Timings
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#202A29] mt-1 tracking-tight">
                Clinic Operating Schedule
              </h2>
              <p className="text-sm sm:text-base text-[#546462] mt-2 leading-relaxed">
                We operate morning and evening rehabilitation sessions to accommodate both working professionals
                and seniors.
              </p>
            </div>

            {/* Verification Alert Banner */}
            <div className="bg-amber-50 border border-amber-200/90 rounded-2xl p-5 text-amber-900 space-y-2">
              <div className="flex items-center gap-2 font-semibold text-sm text-amber-950">
                <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0" />
                <span>Contact to Confirm Current Timings</span>
              </div>
              <p className="text-xs leading-relaxed text-amber-800">
                Official clinic operating hours are currently being finalized. Before travelling to the clinic,
                please verify Dr. Suresh Yadav&apos;s daily availability by calling directly.
              </p>
              <div className="pt-2">
                <a
                  href={getTelUrl()}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-950 hover:underline"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call {CLINIC_CONFIG.formattedPhone} to verify</span>
                </a>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#E3E8E5] space-y-3 text-xs text-[#546462]">
              <div className="font-semibold text-[#202A29] flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#155E59]" />
                <span>Session Booking Notice</span>
              </div>
              <p>
                Each therapy session is scheduled with sufficient time for modality application and manual guidance.
                Walk-ins are welcomed subject to doctor availability, but priority is given to pre-booked consultations.
              </p>
            </div>
          </div>

          {/* Right Column: Weekly Schedule Card */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-[#E3E8E5] p-6 sm:p-8 shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-[#E3E8E5] mb-6">
                <div className="flex items-center gap-2 font-bold text-base text-[#202A29]">
                  <Clock className="w-5 h-5 text-[#155E59]" />
                  <span>Weekly Schedule Overview</span>
                </div>
                {isAnyDemo && (
                  <DemoBadge label="Demo schedule — subject to confirmation" />
                )}
              </div>

              <div className="divide-y divide-[#E3E8E5]/70">
                {schedule.map((item) => {
                  const dayName = DAY_NAMES[item.day_of_week] || `Day ${item.day_of_week}`;
                  return (
                    <div
                      key={item.day_of_week}
                      className="py-3 sm:py-3.5 flex items-center justify-between text-xs sm:text-sm"
                    >
                      <span className="font-semibold text-[#202A29] w-28 sm:w-32">
                        {dayName}
                      </span>

                      {item.is_closed ? (
                        <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-gray-100 text-gray-600">
                          Closed / By Urgent Appointment
                        </span>
                      ) : (
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-right sm:text-left text-[#546462]">
                          <span>
                            Morning: <strong className="text-[#202A29] font-medium">{item.morning_start || '09:00'} – {item.morning_end || '13:00'}</strong>
                          </span>
                          <span className="hidden sm:inline text-gray-300">|</span>
                          <span>
                            Evening: <strong className="text-[#202A29] font-medium">{item.evening_start || '16:00'} – {item.evening_end || '20:00'}</strong>
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 pt-4 border-t border-[#E3E8E5] text-xs text-[#546462] text-center">
                <span>Timezone: Asia/Kolkata (IST). Emergency or holiday slots confirmed via phone.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
