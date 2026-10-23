'use client';

import { useState, useEffect, useCallback, useRef, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Phone,
  MessageSquare,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  BookOpen,
  Heart,
  Star,
  Wrench,
  ShieldAlert,
  FileText,
  Lock,
  Eye,
  AlertTriangle,
  MapPin,
} from 'lucide-react';
import { CLINIC_CONFIG, getTelUrl, getWhatsAppUrl } from '@/lib/config/clinic';
import { ClinicLogo } from '@/components/common/ClinicLogo';
import { TopContactStrip } from './TopContactStrip';

// Primary navbar links (strictly 5 top-level items)
export const PRIMARY_NAV_ITEMS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  // 'More' dropdown handled separately
  { name: 'Contact', href: '/contact' },
];

// Items inside the 'More ▼' dropdown
export const MORE_DROPDOWN_ITEMS = [
  {
    category: 'Explore & Care',
    items: [
      {
        name: 'What is Physiotherapy?',
        href: '/what-is-physiotherapy',
        description: 'Principles of biomechanics & clinical assessment',
        icon: BookOpen,
      },
      {
        name: 'Healthy Living',
        href: '/healthy-living',
        description: 'Daily habits & self-care recovery guides',
        icon: Heart,
      },
      {
        name: 'Reviews & Real Stories',
        href: '/reviews',
        description: 'Verified patient rehabilitation journeys',
        icon: Star,
      },
      {
        name: 'Equipment',
        href: '/equipment',
        description: 'Calibrated modalities & traction facilities',
        icon: Wrench,
      },
    ],
  },
  {
    category: 'Clinic Policies',
    items: [
      {
        name: 'Privacy Policy',
        href: '/privacy-policy',
        description: 'Patient confidentiality & data privacy',
        icon: FileText,
      },
      {
        name: 'Disclaimer',
        href: '/disclaimer',
        description: 'Clinical scope & medical boundaries',
        icon: ShieldAlert,
      },
    ],
  },
  {
    category: 'Practice Management',
    items: [
      {
        name: 'Admin Login',
        href: '/admin/login',
        description: 'Authorized clinic staff authentication',
        icon: Lock,
      },
      {
        name: 'CMS Demo Preview',
        href: '/admin?preview=demo',
        description: 'Interactive management interface preview',
        icon: Eye,
      },
    ],
  },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const pathname = usePathname();

  // Close menus on route change
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }

  // Check if any dropdown item is active
  const isMoreActive = MORE_DROPDOWN_ITEMS.some((group) =>
    group.items.some((item) => pathname === item.href)
  );

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [dropdownOpen]);

  // Handle Escape key on dropdown
  useEffect(() => {
    if (!dropdownOpen) return;
    const handleDropdownKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleDropdownKeyDown);
    return () => window.removeEventListener('keydown', handleDropdownKeyDown);
  }, [dropdownOpen]);

  // Handle Escape key on mobile drawer
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (mobileMenuOpen) setMobileMenuOpen(false);
      }
    },
    [mobileMenuOpen]
  );

  // Lock/restore body scrolling
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = originalStyle === 'hidden' ? '' : originalStyle;
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [mobileMenuOpen, handleKeyDown]);

  return (
    <>
      <header className="sticky top-0 z-30 bg-white border-b border-[#E3E8E5] shadow-xs">
        <TopContactStrip />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-2 sm:gap-4">
            {/* Brand Logo & Name */}
            <Link
              href="/"
              onClick={() => {
                setMobileMenuOpen(false);
                setDropdownOpen(false);
              }}
              className="flex items-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155E59] rounded-xl p-1 flex-shrink-0 max-w-[calc(100%-60px)] sm:max-w-none"
              aria-label={`${CLINIC_CONFIG.name} - Return to Homepage`}
            >
              <ClinicLogo size="md" theme="light" />
            </Link>

            {/* Desktop Navigation (>= lg: 1024px) */}
            <nav
              className="hidden lg:flex items-center gap-1.5"
              aria-label="Main Navigation"
            >
              {/* Home */}
              <Link
                href="/"
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  pathname === '/'
                    ? 'text-[#155E59] bg-[#EEF5F1]'
                    : 'text-[#546462] hover:text-[#202A29] hover:bg-[#F8FAF8]'
                }`}
              >
                Home
              </Link>

              {/* About */}
              <Link
                href="/about"
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  pathname === '/about'
                    ? 'text-[#155E59] bg-[#EEF5F1]'
                    : 'text-[#546462] hover:text-[#202A29] hover:bg-[#F8FAF8]'
                }`}
              >
                About
              </Link>

              {/* Services */}
              <Link
                href="/services"
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  pathname.startsWith('/services')
                    ? 'text-[#155E59] bg-[#EEF5F1]'
                    : 'text-[#546462] hover:text-[#202A29] hover:bg-[#F8FAF8]'
                }`}
              >
                Services
              </Link>

              {/* More ▼ Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowDown') {
                      setDropdownOpen(true);
                    }
                  }}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors ${
                    isMoreActive || dropdownOpen
                      ? 'text-[#155E59] bg-[#EEF5F1]'
                      : 'text-[#546462] hover:text-[#202A29] hover:bg-[#F8FAF8]'
                  }`}
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                  aria-label="More navigation items"
                >
                  <span>More</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      dropdownOpen ? 'rotate-180 text-[#155E59]' : 'text-[#546462]'
                    }`}
                  />
                </button>

                {/* Dropdown Menu Panel */}
                {dropdownOpen && (
                  <div
                    className="absolute right-0 sm:left-0 sm:right-auto mt-2 w-80 sm:w-96 rounded-2xl bg-white border border-[#E3E8E5] shadow-xl py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                    role="menu"
                    aria-label="More options"
                  >
                    {MORE_DROPDOWN_ITEMS.map((group, groupIdx) => (
                      <div key={group.category} className={groupIdx > 0 ? 'mt-2 pt-2 border-t border-[#E3E8E5]/70' : ''}>
                        <div className="px-4 py-1 text-[11px] font-bold uppercase tracking-wider text-[#546462]/90">
                          {group.category}
                        </div>
                        <div className="mt-1 space-y-0.5">
                          {group.items.map((subItem) => {
                            const IconComponent = subItem.icon;
                            const isActive = pathname === subItem.href;
                            return (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                onClick={() => setDropdownOpen(false)}
                                className={`flex items-start gap-3 px-4 py-2.5 hover:bg-[#EEF5F1]/70 transition-colors rounded-xl mx-1.5 ${
                                  isActive ? 'bg-[#EEF5F1] text-[#155E59]' : 'text-[#202A29]'
                                }`}
                                role="menuitem"
                              >
                                <div
                                  className={`p-2 rounded-lg mt-0.5 flex-shrink-0 ${
                                    isActive
                                      ? 'bg-[#155E59] text-white'
                                      : 'bg-[#F8FAF8] text-[#155E59] border border-[#E3E8E5]'
                                  }`}
                                >
                                  <IconComponent className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="text-sm font-semibold text-[#202A29] flex items-center justify-between">
                                    <span>{subItem.name}</span>
                                    {isActive && (
                                      <span className="w-1.5 h-1.5 rounded-full bg-[#155E59]" />
                                    )}
                                  </div>
                                  <p className="text-xs text-[#546462] line-clamp-1 mt-0.5">
                                    {subItem.description}
                                  </p>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Contact */}
              <Link
                href="/contact"
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  pathname === '/contact'
                    ? 'text-[#155E59] bg-[#EEF5F1]'
                    : 'text-[#546462] hover:text-[#202A29] hover:bg-[#F8FAF8]'
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* Desktop Quick Actions (>= lg: 1024px) */}
            <div className="hidden lg:flex items-center gap-2.5 flex-shrink-0">
              <a
                href={getTelUrl()}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs xl:text-sm font-semibold text-[#202A29] hover:text-[#155E59] hover:bg-[#F8FAF8] border border-[#E3E8E5] transition-colors"
                title="Call clinic telephone"
              >
                <Phone className="w-4 h-4 text-[#155E59]" />
                <span>{CLINIC_CONFIG.formattedPhone}</span>
              </a>

              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs xl:text-sm font-bold text-white bg-[#155E59] hover:bg-[#0F4541] shadow-xs transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-[#DDEBE4]" />
                <span>WhatsApp Enquiry</span>
              </a>
            </div>

            {/* Mobile / Tablet Controls (< lg: < 1024px) */}
            <div className="flex items-center gap-1 sm:gap-2 lg:hidden flex-shrink-0">
              <a
                href={getTelUrl()}
                className="p-2 text-[#155E59] hover:bg-[#EEF5F1] rounded-xl transition-colors hidden xs:flex sm:hidden items-center justify-center min-w-[40px] min-h-[40px]"
                aria-label="Call clinic directly"
              >
                <Phone className="w-5 h-5" />
              </a>

              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-[#155E59] hover:bg-[#0F4541] transition-colors"
                aria-label="Enquire via WhatsApp"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#DDEBE4]" />
                <span>WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 text-[#202A29] hover:text-[#155E59] hover:bg-[#EEF5F1] rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-[#155E59] min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation"
                aria-label="Open navigation menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Portal-Mounted Mobile & Tablet Navigation Drawer */}
      {mounted &&
        mobileMenuOpen &&
        createPortal(
          <div className="fixed inset-0 z-[100] lg:hidden flex justify-end">
            {/* Backdrop Dimmer */}
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer Panel Container */}
            <aside
              id="mobile-navigation"
              role="dialog"
              aria-modal="true"
              aria-label="Site Navigation Menu"
              className="relative w-full max-w-md bg-white h-full max-h-[100dvh] flex flex-col z-[101] shadow-2xl overflow-hidden animate-in slide-in-from-right duration-250"
            >
              {/* Drawer Top Header */}
              <div className="h-20 px-5 border-b border-[#E3E8E5] flex items-center justify-between bg-[#F8FAF8] flex-shrink-0">
                <ClinicLogo size="sm" theme="light" />

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 text-[#546462] hover:text-[#202A29] hover:bg-gray-200/60 rounded-xl transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#155E59]"
                  aria-label="Close navigation menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Scrollable Navigation Body */}
              <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6">
                {/* Primary Nav Links */}
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#546462] mb-2 px-2">
                    Main Pages
                  </div>
                  <nav className="space-y-1" aria-label="Mobile Main Navigation">
                    {[
                      { name: 'Home', href: '/' },
                      { name: 'About', href: '/about' },
                      { name: 'Services', href: '/services' },
                      { name: 'Contact', href: '/contact' },
                    ].map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-all min-h-[48px] ${
                            isActive
                              ? 'bg-[#155E59] text-white shadow-xs'
                              : 'text-[#202A29] hover:bg-[#F8FAF8]'
                          }`}
                        >
                          <span>{item.name}</span>
                          {isActive ? (
                            <span className="w-2 h-2 rounded-full bg-[#DDEBE4]" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                          )}
                        </Link>
                      );
                    })}
                  </nav>
                </div>

                {/* More Dropdown Categories on Mobile */}
                {MORE_DROPDOWN_ITEMS.map((group) => (
                  <div key={group.category}>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#546462] mb-2 px-2">
                      {group.category}
                    </div>
                    <div className="space-y-1">
                      {group.items.map((item) => {
                        const IconComponent = item.icon;
                        const isActive = pathname === item.href;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-all min-h-[46px] ${
                              isActive
                                ? 'bg-[#EEF5F1] text-[#155E59] font-bold border border-[#B9D5C8]'
                                : 'text-[#202A29] hover:bg-[#F8FAF8]'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <IconComponent className="w-4 h-4 text-[#155E59]" />
                              <span>{item.name}</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}

                {/* Emergency Notice */}
                <div className="p-4 rounded-2xl bg-[#EEF5F1] border border-[#B9D5C8] space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#155E59]">
                    <AlertTriangle className="w-4 h-4 text-[#155E59] flex-shrink-0" />
                    <span>Emergency Warning Notice</span>
                  </div>
                  <p className="text-xs text-[#202A29]/80 leading-relaxed">
                    Sudden weakness, chest pain, or severe numbness requires immediate medical attention. For emergencies in India, dial <strong className="text-[#155E59]">112</strong>.
                  </p>
                </div>

                {/* Quick Consultation Actions */}
                <div className="pt-2 space-y-2.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#546462] px-2">
                    Consultation Enquiries
                  </div>

                  <a
                    href={getWhatsAppUrl('Hello Dr. Suresh Yadav, I would like to schedule an enquiry at Shri Krishna Clinic.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-bold text-white bg-[#155E59] hover:bg-[#0F4541] shadow-xs transition-colors min-h-[48px]"
                  >
                    <MessageSquare className="w-4 h-4 text-[#DDEBE4]" />
                    <span>WhatsApp Enquiry</span>
                  </a>

                  <a
                    href={getTelUrl()}
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-[#202A29] bg-[#F8FAF8] border border-[#E3E8E5] hover:bg-[#EEF5F1] transition-colors min-h-[48px]"
                  >
                    <Phone className="w-4 h-4 text-[#155E59]" />
                    <span>Call {CLINIC_CONFIG.formattedPhone}</span>
                  </a>

                  <a
                    href={CLINIC_CONFIG.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full inline-flex items-center justify-center gap-2 py-2 text-xs text-[#546462] hover:text-[#155E59] transition-colors"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#155E59]" />
                    <span>Open in Google Maps (27.292°N, 75.183°E)</span>
                  </a>
                </div>
              </div>

              {/* Drawer Bottom Status */}
              <div className="p-4 border-t border-[#E3E8E5] bg-[#F8FAF8] text-center text-xs text-[#546462] flex-shrink-0">
                <span className="font-semibold text-[#202A29]">{CLINIC_CONFIG.doctorName}</span>
                <span className="mx-1.5">•</span>
                <span>Lead Physiotherapist</span>
              </div>
            </aside>
          </div>,
          document.body
        )}
    </>
  );
}
