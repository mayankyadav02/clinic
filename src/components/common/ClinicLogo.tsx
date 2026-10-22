'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { CLINIC_CONFIG } from '@/lib/config/clinic';

interface ClinicLogoProps {
  logoUrl?: string | null;
  logoAlt?: string | null;
  size?: 'sm' | 'md' | 'lg';
  theme?: 'light' | 'dark';
  showText?: boolean;
  className?: string;
}

export function ClinicLogo({
  logoUrl,
  logoAlt,
  size = 'md',
  theme = 'light',
  showText = true,
  className = '',
}: ClinicLogoProps) {
  const [imageError, setImageError] = useState(false);

  // Size variations
  const sizeClasses = {
    sm: {
      emblem: 'w-8 h-8 rounded-lg',
      icon: 'w-4 h-4',
      primaryText: 'text-xs font-bold',
      secondaryText: 'text-[10px]',
    },
    md: {
      emblem: 'w-9 h-9 sm:w-11 sm:h-11 rounded-xl',
      icon: 'w-4 h-4 sm:w-6 sm:h-6',
      primaryText: 'text-xs xs:text-sm sm:text-base font-bold',
      secondaryText: 'text-[10px] xs:text-[11px] sm:text-xs',
    },
    lg: {
      emblem: 'w-12 h-12 sm:w-14 sm:h-14 rounded-2xl',
      icon: 'w-6 h-6 sm:w-7 sm:h-7',
      primaryText: 'text-base sm:text-lg lg:text-xl font-bold',
      secondaryText: 'text-xs sm:text-sm',
    },
  }[size];

  const isDark = theme === 'dark';

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 ${className}`}>
      {/* Emblem / Image */}
      <div
        className={`${sizeClasses.emblem} bg-[#155E59] flex items-center justify-center text-white shadow-xs flex-shrink-0 relative overflow-hidden transition-all`}
      >
        {logoUrl && !imageError ? (
          <Image
            src={logoUrl}
            alt={logoAlt || `${CLINIC_CONFIG.name} Logo`}
            fill
            className="object-contain p-1"
            onError={() => setImageError(true)}
            sizes="(max-width: 768px) 44px, 56px"
          />
        ) : (
          /* Handcrafted Vector Healthcare Emblem: Medical Cross + Spine Mobility Arc */
          <svg
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`${sizeClasses.icon} text-[#DDEBE4]`}
            aria-hidden="true"
          >
            {/* Soft background glow */}
            <circle cx="20" cy="20" r="18" fill="#155E59" />
            {/* Medical cross outline in sage */}
            <rect x="17" y="9" width="6" height="22" rx="3" fill="#DDEBE4" fillOpacity="0.25" />
            <rect x="9" y="17" width="22" height="6" rx="3" fill="#DDEBE4" fillOpacity="0.25" />
            {/* Solid central cross core */}
            <rect x="18" y="11" width="4" height="18" rx="2" fill="#FFFFFF" />
            <rect x="11" y="18" width="18" height="4" rx="2" fill="#FFFFFF" />
            {/* Dynamic S-curve spine mobility wave */}
            <path
              d="M13 28C14.5 24 18 22 20 20C22 18 25.5 16 27 12"
              stroke="#DDEBE4"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Vitality node */}
            <circle cx="27" cy="12" r="2" fill="#DDEBE4" />
          </svg>
        )}
      </div>

      {/* Typography */}
      {showText && (
        <div className="flex flex-col text-left">
          <div
            className={`${sizeClasses.primaryText} tracking-tight leading-tight ${
              isDark ? 'text-white' : 'text-[#202A29]'
            }`}
          >
            Shri Krishna
            <span
              className={`ml-1 font-semibold ${
                isDark ? 'text-[#DDEBE4]' : 'text-[#155E59]'
              }`}
            >
              Physiotherapy
            </span>
          </div>
          <div
            className={`${sizeClasses.secondaryText} flex items-center gap-1.5 font-medium ${
              isDark ? 'text-[#DDEBE4]/80' : 'text-[#546462]'
            }`}
          >
            <span>{CLINIC_CONFIG.doctorName}</span>
            <span
              className={`w-1 h-1 rounded-full ${
                isDark ? 'bg-[#DDEBE4]/50' : 'bg-[#155E59]/40'
              } hidden xs:inline`}
            />
            <span className="hidden xs:inline">Clinic</span>
          </div>
        </div>
      )}
    </div>
  );
}
