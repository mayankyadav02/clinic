'use client';

import React, { useState, useEffect, useRef, useCallback, useSyncExternalStore } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Phone,
  MessageSquare,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Pause,
  Play,
} from 'lucide-react';
import { CLINIC_CONFIG, getTelUrl, getWhatsAppUrl, HeroSlide } from '@/lib/config/clinic';

function subscribeToReducedMotion(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  mediaQuery.addEventListener('change', callback);
  return () => mediaQuery.removeEventListener('change', callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

interface HeroSlideshowProps {
  slides: HeroSlide[];
  autoplayInterval?: number;
}

export function HeroSlideshow({
  slides,
  autoplayInterval = 6500,
}: HeroSlideshowProps) {
  // If no slides passed, return fallback
  const validSlides = slides && slides.length > 0 ? slides : [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Subscribe to prefers-reduced-motion safely without effect setState
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  const totalSlides = validSlides.length;

  const nextSlide = useCallback(() => {
    if (totalSlides <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    if (totalSlides <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Autoplay timer
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (totalSlides <= 1 || isPaused || prefersReducedMotion) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      nextSlide();
    }, autoplayInterval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [totalSlides, isPaused, prefersReducedMotion, autoplayInterval, nextSlide]);

  // Touch gesture handling
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  if (totalSlides === 0) {
    return null;
  }

  const currentSlide = validSlides[currentIndex];

  // Helper to render CTA button
  const renderCtaButton = (slide: HeroSlide) => {
    const isWhatsApp =
      slide.cta_link === 'whatsapp' ||
      slide.cta_link.includes('wa.me') ||
      slide.cta_text.toLowerCase().includes('whatsapp');

    const href = isWhatsApp
      ? getWhatsAppUrl()
      : slide.cta_link.startsWith('tel:')
      ? slide.cta_link
      : slide.cta_link.startsWith('/')
      ? slide.cta_link
      : `/${slide.cta_link}`;

    const isExternal = isWhatsApp || href.startsWith('http') || href.startsWith('tel:');

    if (isExternal) {
      return (
        <a
          href={href}
          target={isWhatsApp ? '_blank' : undefined}
          rel={isWhatsApp ? 'noopener noreferrer' : undefined}
          className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm sm:text-base font-bold text-white bg-[#155E59] hover:bg-[#0F4541] shadow-xs hover:shadow transition-all group"
        >
          {isWhatsApp ? (
            <MessageSquare className="w-5 h-5 text-[#DDEBE4]" />
          ) : (
            <ArrowRight className="w-5 h-5 text-[#DDEBE4]" />
          )}
          <span>{slide.cta_text || 'Enquire via WhatsApp'}</span>
          <ArrowRight className="w-4 h-4 text-[#DDEBE4] group-hover:translate-x-1 transition-transform" />
        </a>
      );
    }

    return (
      <Link
        href={href}
        className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm sm:text-base font-bold text-white bg-[#155E59] hover:bg-[#0F4541] shadow-xs hover:shadow transition-all group"
      >
        <span>{slide.cta_text || 'Learn More'}</span>
        <ArrowRight className="w-4 h-4 text-[#DDEBE4] group-hover:translate-x-1 transition-transform" />
      </Link>
    );
  };

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-[#EEF5F1]/90 via-[#F8FAF8] to-[#F8FAF8] py-10 sm:py-14 lg:py-18 border-b border-[#E3E8E5]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      aria-label="Clinical Highlights Slideshow"
      aria-roledescription="carousel"
    >
      {/* Subtle organic background accents */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-[#DDEBE4]/50 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 -mb-20 w-80 h-80 rounded-full bg-[#155E59]/5 blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[460px] sm:min-h-[500px]">
          {/* Left Column: Dynamic Slide Text, Heading, & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Optional Small Label / Badge (NO NUMERICAL SLIDE LABELS) */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DDEBE4] text-[#155E59] text-xs font-semibold tracking-wide border border-[#B9D5C8]/80 transition-all">
              <span className="w-2 h-2 rounded-full bg-[#155E59] animate-pulse" />
              <span>
                {currentSlide.badge_label || 'Specialized Physical Therapy & Pain Management'}
              </span>
            </div>

            {/* Dynamic Heading with Smooth Opacity Transition */}
            <h1
              key={`heading-${currentIndex}`}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#202A29] tracking-tight leading-[1.18] transition-opacity duration-300"
            >
              {currentSlide.heading}
            </h1>

            {/* Dynamic Description with Smooth Opacity Transition */}
            <p
              key={`desc-${currentIndex}`}
              className="text-base sm:text-lg text-[#546462] leading-relaxed max-w-2xl font-normal transition-opacity duration-300"
            >
              {currentSlide.description}
            </p>

            {/* Dual CTAs: CMS CTA + Direct Phone Call */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              {renderCtaButton(currentSlide)}

              <a
                href={getTelUrl()}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm sm:text-base font-semibold text-[#202A29] bg-white border border-[#E3E8E5] hover:bg-[#EEF5F1] hover:border-[#B9D5C8] transition-all shadow-xs"
              >
                <Phone className="w-5 h-5 text-[#155E59]" />
                <span>Call {CLINIC_CONFIG.formattedPhone}</span>
              </a>
            </div>

            <p className="text-xs text-[#546462]">
              * Prior enquiry or telephone call is recommended before visiting to confirm consultation slot availability.
            </p>

            {/* Trust Micro-Checkmarks */}
            <div className="pt-4 border-t border-[#E3E8E5] grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex items-center gap-2 text-xs text-[#202A29] font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#155E59] flex-shrink-0" />
                <span>Individualized 1-on-1 Care</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#202A29] font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#155E59] flex-shrink-0" />
                <span>Evidence-Guided Protocols</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#202A29] font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#155E59] flex-shrink-0" />
                <span>Modern Clinical Modalities</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Frame with Stacked Images */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Image Frame */}
              <div className="relative rounded-3xl overflow-hidden border border-[#DDEBE4] shadow-md bg-white">
                <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full">
                  {validSlides.map((slide, index) => {
                    const isActive = index === currentIndex;
                    return (
                      <div
                        key={slide.id || index}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                          isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                        }`}
                        aria-hidden={!isActive}
                      >
                        <Image
                          src={slide.image_url}
                          alt={slide.alt_text || 'Physiotherapy rehabilitation care'}
                          fill
                          priority={index === 0}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                          className="object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                      </div>
                    );
                  })}
                </div>

                {/* Subdued Bottom Caption on Active Slide */}
                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 text-white z-20 pointer-events-none">
                  <div className="text-xs sm:text-sm font-bold text-white drop-shadow-xs">
                    {currentSlide.heading}
                  </div>
                  <div className="text-[11px] text-[#DDEBE4] mt-0.5 line-clamp-1 drop-shadow-xs">
                    {CLINIC_CONFIG.name} • {CLINIC_CONFIG.doctorName}
                  </div>
                </div>

                {/* Accessible Prev/Next Controls on Image Frame */}
                {totalSlides > 1 && (
                  <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between z-20 pointer-events-none">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        prevSlide();
                      }}
                      className="p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-xs transition-colors pointer-events-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                      aria-label="Previous slide"
                    >
                      <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        nextSlide();
                      }}
                      className="p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-xs transition-colors pointer-events-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                      aria-label="Next slide"
                    >
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Bottom Carousel Navigation Dots & Pause Toggle */}
              {totalSlides > 1 && (
                <div className="mt-4 flex items-center justify-between px-2">
                  {/* Indicator Dots */}
                  <div className="flex items-center gap-2">
                    {validSlides.map((_, dotIndex) => {
                      const isActive = dotIndex === currentIndex;
                      return (
                        <button
                          key={dotIndex}
                          type="button"
                          onClick={() => goToSlide(dotIndex)}
                          aria-label={`Go to slide ${dotIndex + 1}`}
                          className={`h-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155E59] ${
                            isActive
                              ? 'w-7 bg-[#155E59]'
                              : 'w-2 bg-[#B9D5C8] hover:bg-[#155E59]/50'
                          }`}
                        />
                      );
                    })}
                  </div>

                  {/* Play/Pause Toggle for Accessibility */}
                  <button
                    type="button"
                    onClick={() => setIsPaused(!isPaused)}
                    aria-label={isPaused ? 'Resume slideshow' : 'Pause slideshow'}
                    className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#546462] hover:text-[#155E59] px-2 py-1 rounded-md transition-colors"
                  >
                    {isPaused ? (
                      <>
                        <Play className="w-3 h-3 text-[#155E59]" />
                        <span>Resume</span>
                      </>
                    ) : (
                      <>
                        <Pause className="w-3 h-3 text-[#155E59]" />
                        <span>Pause</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
