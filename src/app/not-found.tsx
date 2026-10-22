import Link from 'next/link';
import { Activity, Phone, Home } from 'lucide-react';
import { CLINIC_CONFIG, getTelUrl } from '@/lib/config/clinic';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#F8FAF8] px-4 py-16">
      <div className="max-w-md w-full bg-white rounded-3xl border border-[#E3E8E5] p-8 sm:p-10 text-center shadow-xs space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-[#EEF5F1] text-[#155E59] flex items-center justify-center mx-auto">
          <Activity className="w-8 h-8" />
        </div>

        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#155E59]">
            Error 404
          </span>
          <h1 className="text-2xl font-bold text-[#202A29] mt-1">Page Not Found</h1>
          <p className="text-xs sm:text-sm text-[#546462] mt-2 leading-relaxed">
            The page you are looking for does not exist or may have been relocated.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#155E59] hover:bg-[#0F4541] transition-colors"
          >
            <Home className="w-4 h-4 text-[#DDEBE4]" />
            <span>Return to Homepage</span>
          </Link>

          <a
            href={getTelUrl()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-[#202A29] bg-[#F8FAF8] border border-[#E3E8E5] hover:bg-[#EEF5F1] transition-colors"
          >
            <Phone className="w-4 h-4 text-[#155E59]" />
            <span>Call Clinic</span>
          </a>
        </div>

        <div className="text-[11px] text-[#546462]">
          {CLINIC_CONFIG.name} • Dr. Suresh Yadav
        </div>
      </div>
    </div>
  );
}
