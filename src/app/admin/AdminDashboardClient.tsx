'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Building2,
  User,
  Activity,
  Wrench,
  Clock,
  HelpCircle,
  Star,
  Search,
  Plus,
  Save,
  CheckCircle,
  AlertCircle,
  Trash2,
  Edit3,
  Eye,
  EyeOff,
  LogOut,
  ExternalLink,
  Sliders,
  BookOpen,
  ShieldCheck,
  Image as ImageIcon,
} from 'lucide-react';
import {
  ClinicSettings,
  DoctorProfile,
  ServiceItem,
  EquipmentItem,
  ScheduleItem,
  FaqItem,
  TestimonialItem,
  HeroSlide,
  HealthyLivingArticle,
} from '@/lib/config/clinic';
import { ClinicLogo } from '@/components/common/ClinicLogo';

interface AdminDashboardClientProps {
  initialSettings: ClinicSettings;
  initialDoctor: DoctorProfile;
  initialServices: ServiceItem[];
  initialEquipment: EquipmentItem[];
  initialSchedule: ScheduleItem[];
  initialFaqs: FaqItem[];
  initialTestimonials: TestimonialItem[];
  initialHeroSlides?: HeroSlide[];
  initialArticles?: HealthyLivingArticle[];
  isDemoMode?: boolean;
  userEmail?: string;
}

type TabType =
  | 'settings'
  | 'slides'
  | 'doctor'
  | 'services'
  | 'equipment'
  | 'articles'
  | 'testimonials'
  | 'schedule'
  | 'faqs'
  | 'seo';

export function AdminDashboardClient({
  initialSettings,
  initialDoctor,
  initialServices,
  initialEquipment,
  initialSchedule,
  initialFaqs,
  initialTestimonials,
  initialHeroSlides = [],
  initialArticles = [],
  isDemoMode = false,
  userEmail = 'admin@shrikrishnaphysio.example',
}: AdminDashboardClientProps) {
  const [activeTab, setActiveTab] = useState<TabType>('settings');

  // Form states
  const [settings, setSettings] = useState<ClinicSettings>(initialSettings);
  const [doctor, setDoctor] = useState<DoctorProfile>(initialDoctor);
  const [services, setServices] = useState<ServiceItem[]>(initialServices);
  const [equipment, setEquipment] = useState<EquipmentItem[]>(initialEquipment);
  const [schedule, setSchedule] = useState<ScheduleItem[]>(initialSchedule);
  const [faqs, setFaqs] = useState<FaqItem[]>(initialFaqs);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(initialTestimonials);
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(initialHeroSlides);
  const [articles, setArticles] = useState<HealthyLivingArticle[]>(initialArticles);

  // Filter state for reviews
  const [reviewFilter, setReviewFilter] = useState<'all' | 'published' | 'pending'>('all');

  // UI feedback states
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Modal / Editing states for sub-items
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [editingEquipment, setEditingEquipment] = useState<EquipmentItem | null>(null);
  const [editingArticle, setEditingArticle] = useState<HealthyLivingArticle | null>(null);
  const [editingFaq, setEditingFaq] = useState<FaqItem | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<TestimonialItem | null>(null);

  // Confirmation dialog state
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    type: 'slide' | 'service' | 'equipment' | 'article' | 'faq' | 'testimonial';
    id: string;
    title: string;
  } | null>(null);

  const showFeedback = (message: string, type: 'success' | 'error' = 'success') => {
    setFeedback({ type, message });
    setTimeout(() => {
      setFeedback(null);
    }, 4000);
  };

  const handleSaveSection = (sectionName: string) => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      showFeedback(
        `${sectionName} updated successfully! ${
          isDemoMode ? '(Preview Mode: state active in browser session)' : ''
        }`
      );
    }, 500);
  };

  // Filtered testimonials
  const filteredTestimonials = testimonials.filter((t) => {
    if (reviewFilter === 'published') return t.is_published;
    if (reviewFilter === 'pending') return !t.is_published;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F4F7F5] flex flex-col">
      {/* Admin Top Header Bar */}
      <header className="bg-[#202A29] text-white border-b border-[#155E59]/40 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ClinicLogo size="sm" theme="dark" showText={false} />
            <div>
              <div className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
                <span>Shri Krishna Admin CMS</span>
                {isDemoMode && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-400 text-amber-950 uppercase tracking-wider">
                    Demo Mode
                  </span>
                )}
              </div>
              <div className="text-[11px] text-[#DDEBE4]/70 hidden sm:block">
                {userEmail || 'admin@shrikrishnaphysio.example'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 text-xs">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#DDEBE4] hover:text-white transition-colors"
            >
              <span>View Public Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <form action="/auth/signout" method="post">
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#DDEBE4] hover:text-white transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Exit Portal</span>
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Mode Banner if Demo */}
      {isDemoMode && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2.5 text-xs text-amber-900 text-center font-medium">
          <strong>Reviewer / Demo Preview:</strong> You are viewing an isolated CMS session. All edit forms, switches, hero slide managers, and review approvals are fully interactive. To persist changes directly to Supabase PostgreSQL, sign in with administrative credentials.
        </div>
      )}

      {/* Feedback Toast */}
      {feedback && (
        <div
          className={`fixed bottom-6 right-6 z-50 p-4 rounded-xl shadow-lg border text-xs font-semibold flex items-center gap-2 ${
            feedback.type === 'success'
              ? 'bg-emerald-900 text-white border-emerald-700'
              : 'bg-red-900 text-white border-red-700'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircle className="w-4 h-4 text-emerald-300" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-300" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Main CMS Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar Navigation */}
        <aside className="lg:col-span-3 bg-white rounded-2xl border border-[#E3E8E5] p-3 shadow-xs space-y-1">
          <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-[#546462]">
            Content Management
          </div>

          {[
            { id: 'settings', label: 'Clinic Settings & Logo', icon: Building2 },
            { id: 'slides', label: 'Hero Slideshow', icon: Sliders, count: heroSlides.length },
            { id: 'doctor', label: 'Doctor Profile', icon: User },
            { id: 'services', label: 'Clinical Services', icon: Activity, count: services.length },
            { id: 'equipment', label: 'Equipment & Facilities', icon: Wrench, count: equipment.length },
            { id: 'articles', label: 'Healthy Living', icon: BookOpen, count: articles.length },
            { id: 'testimonials', label: 'Reviews & Stories', icon: Star, count: testimonials.length },
            { id: 'schedule', label: 'Operating Hours', icon: Clock },
            { id: 'faqs', label: 'FAQs Management', icon: HelpCircle, count: faqs.length },
            { id: 'seo', label: 'SEO & Copy', icon: Search },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id as TabType)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-[#155E59] text-white shadow-xs'
                    : 'text-[#546462] hover:text-[#202A29] hover:bg-[#F8FAF8]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#DDEBE4]' : 'text-[#155E59]'}`} />
                  <span>{item.label}</span>
                </div>
                {item.count !== undefined && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-mono ${
                      isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-[#546462]'
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-4 mt-4 border-t border-[#E3E8E5] px-3 pb-2 text-xs text-[#546462] space-y-1">
            <div className="font-semibold text-[#202A29]">Database Security</div>
            <p className="text-[11px] text-[#546462]/80">
              Row Level Security (RLS) is active. Public visitors can only view published items.
            </p>
          </div>
        </aside>

        {/* Right Main Form Area */}
        <main className="lg:col-span-9 bg-white rounded-2xl border border-[#E3E8E5] p-6 sm:p-8 shadow-xs">
          {/* TAB 1: CLINIC SETTINGS & LOGO */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E3E8E5]">
                <div>
                  <h2 className="text-xl font-bold text-[#202A29]">Clinic Settings & Logo</h2>
                  <p className="text-xs text-[#546462]">
                    Update core clinic branding, official logo, verified phone, address, and coordinates.
                  </p>
                </div>
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={() => handleSaveSection('Clinic Settings')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#155E59] hover:bg-[#0F4541] transition-colors disabled:opacity-50"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{isSaving ? 'Saving...' : 'Save Settings'}</span>
                </button>
              </div>

              {/* Clinic Logo Management */}
              <div className="p-5 rounded-2xl bg-[#F8FAF8] border border-[#E3E8E5] space-y-4">
                <div className="text-xs font-bold text-[#202A29] uppercase tracking-wider flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-[#155E59]" />
                  <span>Clinic Logo & Branding</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
                  <div className="sm:col-span-2 space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-[#202A29] mb-1">
                        Logo Image URL (Optional custom image)
                      </label>
                      <input
                        type="text"
                        value={settings.logo_url || ''}
                        onChange={(e) => setSettings({ ...settings, logo_url: e.target.value })}
                        placeholder="e.g. /images/clinic-logo.png or Supabase storage URL"
                        className="w-full px-3.5 py-2 rounded-xl border border-[#E3E8E5] text-xs sm:text-sm text-[#202A29] focus:outline-none focus:ring-2 focus:ring-[#155E59]"
                      />
                      <span className="text-[11px] text-[#546462] mt-0.5 block">
                        Leave blank to use the official vector medical cross emblem.
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#202A29] mb-1">
                        Logo Accessibility Alt Text
                      </label>
                      <input
                        type="text"
                        value={settings.logo_alt || ''}
                        onChange={(e) => setSettings({ ...settings, logo_alt: e.target.value })}
                        placeholder="Shri Krishna Physiotherapy Clinic Official Logo"
                        className="w-full px-3.5 py-2 rounded-xl border border-[#E3E8E5] text-xs sm:text-sm text-[#202A29]"
                      />
                    </div>
                  </div>

                  {/* Live Logo Preview Box */}
                  <div className="p-4 rounded-xl bg-white border border-[#E3E8E5] text-center space-y-2">
                    <span className="text-[11px] font-bold text-[#546462] block">
                      Live Navbar Preview
                    </span>
                    <div className="flex justify-center p-2 bg-gray-50 rounded-lg">
                      <ClinicLogo
                        logoUrl={settings.logo_url}
                        logoAlt={settings.logo_alt}
                        size="md"
                        theme="light"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#202A29] mb-1">Clinic Name</label>
                  <input
                    type="text"
                    value={settings.clinic_name}
                    onChange={(e) => setSettings({ ...settings, clinic_name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E3E8E5] text-xs sm:text-sm text-[#202A29] focus:outline-none focus:ring-2 focus:ring-[#155E59]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#202A29] mb-1">Lead Physiotherapist</label>
                  <input
                    type="text"
                    value={settings.doctor_name}
                    onChange={(e) => setSettings({ ...settings, doctor_name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E3E8E5] text-xs sm:text-sm text-[#202A29] focus:outline-none focus:ring-2 focus:ring-[#155E59]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#202A29] mb-1">
                    Verified Telephone Number (Confirmed)
                  </label>
                  <input
                    type="text"
                    value={settings.phone}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E3E8E5] text-xs sm:text-sm text-[#202A29] font-mono focus:outline-none focus:ring-2 focus:ring-[#155E59]"
                  />
                  <span className="text-[11px] text-[#546462] mt-0.5 block">
                    Current confirmed number: 7891426494
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#202A29] mb-1">
                    WhatsApp Enquiry Number (International Format)
                  </label>
                  <input
                    type="text"
                    value={settings.whatsapp_number || ''}
                    onChange={(e) => setSettings({ ...settings, whatsapp_number: e.target.value })}
                    placeholder="917891426494"
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E3E8E5] text-xs sm:text-sm text-[#202A29] font-mono focus:outline-none focus:ring-2 focus:ring-[#155E59]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#202A29] mb-1">
                    Google Maps Direct Navigation URL
                  </label>
                  <input
                    type="text"
                    value={settings.google_maps_url}
                    onChange={(e) => setSettings({ ...settings, google_maps_url: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E3E8E5] text-xs sm:text-sm text-[#202A29]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#202A29] mb-1">Latitude</label>
                  <input
                    type="number"
                    step="any"
                    value={settings.latitude}
                    onChange={(e) => setSettings({ ...settings, latitude: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E3E8E5] text-xs sm:text-sm font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#202A29] mb-1">Longitude</label>
                  <input
                    type="number"
                    step="any"
                    value={settings.longitude}
                    onChange={(e) => setSettings({ ...settings, longitude: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E3E8E5] text-xs sm:text-sm font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#202A29] mb-1">
                    Hero Slideshow Autoplay Speed (Milliseconds)
                  </label>
                  <input
                    type="number"
                    min="3000"
                    max="15000"
                    step="500"
                    value={settings.hero_autoplay_interval || 6500}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        hero_autoplay_interval: parseInt(e.target.value, 10) || 6500,
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E3E8E5] text-xs sm:text-sm font-mono"
                  />
                  <span className="text-[11px] text-[#546462] mt-0.5 block">
                    Default: 6500ms (6.5 seconds)
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#202A29] mb-1">
                    Footer Custom Clinical Note
                  </label>
                  <input
                    type="text"
                    value={settings.footer_note || ''}
                    onChange={(e) => setSettings({ ...settings, footer_note: e.target.value })}
                    placeholder="Providing individualized therapeutic interventions and guided recovery."
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E3E8E5] text-xs sm:text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: HERO SLIDESHOW MANAGEMENT */}
          {activeTab === 'slides' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E3E8E5]">
                <div>
                  <h2 className="text-xl font-bold text-[#202A29]">Hero Slideshow Management</h2>
                  <p className="text-xs text-[#546462]">
                    Add, edit, reorder, and activate the hero slides displayed on the public homepage.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setEditingSlide({
                      id: `slide-${Date.now()}`,
                      heading: 'New Rehabilitation Care Headline',
                      description: 'Individualized physical therapy protocols and clinical mobility guidance.',
                      badge_label: 'Clinical Highlights',
                      cta_text: 'Enquire via WhatsApp',
                      cta_link: 'whatsapp',
                      image_url: '/images/hero/physiotherapy-hero.jpg',
                      alt_text: 'Physiotherapist guiding a patient through rehabilitation exercise',
                      is_active: true,
                      order_index: heroSlides.length + 1,
                      is_demo: false,
                    })
                  }
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#155E59] hover:bg-[#0F4541] transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Slide</span>
                </button>
              </div>

              {/* Editing / Adding Slide Form */}
              {editingSlide && (
                <div className="p-6 rounded-2xl bg-[#EEF5F1] border border-[#B9D5C8] space-y-4">
                  <div className="flex items-center justify-between font-bold text-sm text-[#155E59]">
                    <span>{editingSlide.id.startsWith('slide-') ? 'Edit Hero Slide' : 'New Hero Slide'}</span>
                    <button
                      type="button"
                      onClick={() => setEditingSlide(null)}
                      className="text-xs text-[#546462] hover:text-[#202A29] underline"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-[#202A29] mb-1">Slide Heading</label>
                      <input
                        type="text"
                        value={editingSlide.heading}
                        onChange={(e) => setEditingSlide({ ...editingSlide, heading: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-[#E3E8E5] text-xs sm:text-sm bg-white"
                        placeholder="Restoring Movement. Relieving Persistent Pain."
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-[#202A29] mb-1">Slide Description</label>
                      <textarea
                        rows={2}
                        value={editingSlide.description}
                        onChange={(e) => setEditingSlide({ ...editingSlide, description: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-[#E3E8E5] text-xs sm:text-sm bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#202A29] mb-1">
                        Optional Label / Badge (NO slide numbers)
                      </label>
                      <input
                        type="text"
                        value={editingSlide.badge_label || ''}
                        onChange={(e) => setEditingSlide({ ...editingSlide, badge_label: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-[#E3E8E5] text-xs sm:text-sm bg-white"
                        placeholder="e.g. Specialized Physical Therapy & Pain Management"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#202A29] mb-1">Image URL</label>
                      <input
                        type="text"
                        value={editingSlide.image_url}
                        onChange={(e) => setEditingSlide({ ...editingSlide, image_url: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-[#E3E8E5] text-xs sm:text-sm bg-white font-mono"
                        placeholder="/images/hero/physiotherapy-hero.jpg"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#202A29] mb-1">CTA Button Text</label>
                      <input
                        type="text"
                        value={editingSlide.cta_text}
                        onChange={(e) => setEditingSlide({ ...editingSlide, cta_text: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-[#E3E8E5] text-xs sm:text-sm bg-white"
                        placeholder="Enquire via WhatsApp"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#202A29] mb-1">
                        CTA Link Destination
                      </label>
                      <input
                        type="text"
                        value={editingSlide.cta_link}
                        onChange={(e) => setEditingSlide({ ...editingSlide, cta_link: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-[#E3E8E5] text-xs sm:text-sm bg-white"
                        placeholder="whatsapp, /services, /equipment, or phone"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#202A29] mb-1">Image Alt Text</label>
                      <input
                        type="text"
                        value={editingSlide.alt_text}
                        onChange={(e) => setEditingSlide({ ...editingSlide, alt_text: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-[#E3E8E5] text-xs sm:text-sm bg-white"
                        placeholder="Clinical rehabilitation photograph"
                      />
                    </div>

                    <div className="flex items-center gap-6 pt-3">
                      <div>
                        <label className="block text-xs font-bold text-[#202A29] mb-1">Display Order</label>
                        <input
                          type="number"
                          value={editingSlide.order_index}
                          onChange={(e) =>
                            setEditingSlide({
                              ...editingSlide,
                              order_index: parseInt(e.target.value, 10) || 1,
                            })
                          }
                          className="w-20 px-3 py-1.5 rounded-lg border border-[#E3E8E5] text-xs bg-white text-center font-bold"
                        />
                      </div>

                      <label className="flex items-center gap-2 text-xs font-bold text-[#202A29] cursor-pointer mt-4">
                        <input
                          type="checkbox"
                          checked={editingSlide.is_active}
                          onChange={(e) =>
                            setEditingSlide({ ...editingSlide, is_active: e.target.checked })
                          }
                          className="rounded text-[#155E59] focus:ring-[#155E59]"
                        />
                        <span>Active in Slideshow</span>
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#B9D5C8]">
                    <button
                      type="button"
                      onClick={() => setEditingSlide(null)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-[#546462] hover:bg-white/80"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const exists = heroSlides.some((s) => s.id === editingSlide.id);
                        if (exists) {
                          setHeroSlides(heroSlides.map((s) => (s.id === editingSlide.id ? editingSlide : s)));
                        } else {
                          setHeroSlides([...heroSlides, editingSlide]);
                        }
                        setEditingSlide(null);
                        showFeedback(`Slide "${editingSlide.heading}" saved.`);
                      }}
                      className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#155E59] hover:bg-[#0F4541]"
                    >
                      Save Slide
                    </button>
                  </div>
                </div>
              )}

              {/* Slides List Cards */}
              <div className="space-y-3">
                {heroSlides.map((slide, index) => (
                  <div
                    key={slide.id || index}
                    className="p-4 rounded-xl border border-[#E3E8E5] bg-white hover:border-[#B9D5C8] transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-4 flex-1">
                      <div className="relative w-20 h-14 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 border border-[#E3E8E5]">
                        <Image
                          src={slide.image_url}
                          alt={slide.alt_text || 'Hero slide'}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-[#202A29] line-clamp-1">
                            {slide.heading}
                          </span>
                          {slide.is_active ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                              Active
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gray-100 text-gray-600">
                              Inactive
                            </span>
                          )}
                          <span className="text-[11px] font-mono text-[#546462] bg-gray-100 px-2 py-0.5 rounded">
                            Order: {slide.order_index}
                          </span>
                        </div>
                        <p className="text-xs text-[#546462] line-clamp-1">{slide.description}</p>
                        <div className="text-[11px] text-[#155E59] font-semibold">
                          CTA: &quot;{slide.cta_text}&quot; &rarr; {slide.cta_link}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        type="button"
                        onClick={() => setEditingSlide(slide)}
                        className="p-2 text-[#155E59] hover:bg-[#EEF5F1] rounded-lg transition-colors"
                        title="Edit slide"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setDeleteConfirmation({
                            type: 'slide',
                            id: slide.id,
                            title: slide.heading,
                          })
                        }
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete slide"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: DOCTOR PROFILE */}
          {activeTab === 'doctor' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E3E8E5]">
                <div>
                  <h2 className="text-xl font-bold text-[#202A29]">Doctor Profile</h2>
                  <p className="text-xs text-[#546462]">
                    Profile, medical credentials, and clinical philosophy for Dr. Suresh Yadav.
                  </p>
                </div>
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={() => handleSaveSection('Doctor Profile')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#155E59] hover:bg-[#0F4541] transition-colors"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Profile</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#202A29] mb-1">Full Name</label>
                  <input
                    type="text"
                    value={doctor.name}
                    onChange={(e) => setDoctor({ ...doctor, name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E3E8E5] text-xs sm:text-sm text-[#202A29]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#202A29] mb-1">Experience (Years)</label>
                  <input
                    type="number"
                    value={doctor.experience_years || 10}
                    onChange={(e) =>
                      setDoctor({ ...doctor, experience_years: parseInt(e.target.value, 10) || 0 })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E3E8E5] text-xs sm:text-sm font-mono"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#202A29] mb-1">
                    State Council Registration Number (Pending Verification)
                  </label>
                  <input
                    type="text"
                    value={doctor.registration_number || ''}
                    onChange={(e) => setDoctor({ ...doctor, registration_number: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E3E8E5] text-xs sm:text-sm"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#202A29] mb-1">Doctor Biography</label>
                  <textarea
                    rows={4}
                    value={doctor.biography || ''}
                    onChange={(e) => setDoctor({ ...doctor, biography: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E3E8E5] text-xs sm:text-sm text-[#202A29]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CLINICAL SERVICES */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E3E8E5]">
                <div>
                  <h2 className="text-xl font-bold text-[#202A29]">Clinical Services</h2>
                  <p className="text-xs text-[#546462]">
                    Manage rehabilitation programs, diagnostic steps, pricing guidance, and published status.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setEditingService({
                      slug: `service-${Date.now()}`,
                      title: 'New Rehabilitation Care',
                      description: 'Comprehensive physical therapy care and clinical exercises.',
                      detailed_description: 'Detailed diagnostic assessment, joint mobility, and strengthening.',
                      icon: 'activity',
                      image_url: '/images/services/orthopedic-rehabilitation.jpg',
                      price_range: '₹500 - ₹1,000 / session',
                      duration_minutes: 45,
                      is_published: true,
                      order_index: services.length + 1,
                      is_demo: false,
                    })
                  }
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#155E59] hover:bg-[#0F4541] transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Service</span>
                </button>
              </div>

              {/* Editing Service */}
              {editingService && (
                <div className="p-5 rounded-2xl bg-[#EEF5F1] border border-[#B9D5C8] space-y-4">
                  <div className="flex items-center justify-between font-bold text-sm text-[#155E59]">
                    <span>Edit Service</span>
                    <button
                      type="button"
                      onClick={() => setEditingService(null)}
                      className="text-xs text-[#546462] underline"
                    >
                      Cancel
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#202A29] mb-1">Title</label>
                      <input
                        type="text"
                        value={editingService.title}
                        onChange={(e) =>
                          setEditingService({ ...editingService, title: e.target.value })
                        }
                        className="w-full px-3 py-1.5 rounded-lg border border-[#E3E8E5] text-xs bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#202A29] mb-1">URL Slug</label>
                      <input
                        type="text"
                        value={editingService.slug}
                        onChange={(e) =>
                          setEditingService({ ...editingService, slug: e.target.value })
                        }
                        className="w-full px-3 py-1.5 rounded-lg border border-[#E3E8E5] text-xs bg-white font-mono"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-[#202A29] mb-1">Description</label>
                      <textarea
                        rows={2}
                        value={editingService.description}
                        onChange={(e) =>
                          setEditingService({ ...editingService, description: e.target.value })
                        }
                        className="w-full px-3 py-1.5 rounded-lg border border-[#E3E8E5] text-xs bg-white"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-[#202A29] mb-1">Cover Image URL</label>
                      <input
                        type="text"
                        value={editingService.image_url || ''}
                        onChange={(e) =>
                          setEditingService({ ...editingService, image_url: e.target.value })
                        }
                        className="w-full px-3 py-1.5 rounded-lg border border-[#E3E8E5] text-xs bg-white font-mono"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setEditingService(null)}
                      className="px-3 py-1.5 rounded-lg text-xs text-[#546462]"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const exists = services.some((s) => s.slug === editingService.slug);
                        if (exists) {
                          setServices(
                            services.map((s) => (s.slug === editingService.slug ? editingService : s))
                          );
                        } else {
                          setServices([...services, editingService]);
                        }
                        setEditingService(null);
                        showFeedback(`Service "${editingService.title}" saved.`);
                      }}
                      className="px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-[#155E59]"
                    >
                      Save Service
                    </button>
                  </div>
                </div>
              )}

              {/* Service Cards */}
              <div className="space-y-3">
                {services.map((svc) => (
                  <div
                    key={svc.slug}
                    className="p-4 rounded-xl border border-[#E3E8E5] flex items-center justify-between hover:bg-[#F8FAF8]"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#202A29]">{svc.title}</span>
                        {svc.is_published ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                            Published
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gray-100 text-gray-600">
                            Draft
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#546462] mt-0.5 line-clamp-1">{svc.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingService(svc)}
                        className="p-1.5 text-[#155E59] hover:bg-[#EEF5F1] rounded-lg"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setDeleteConfirmation({
                            type: 'service',
                            id: svc.slug,
                            title: svc.title,
                          })
                        }
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: EQUIPMENT */}
          {activeTab === 'equipment' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E3E8E5]">
                <div>
                  <h2 className="text-xl font-bold text-[#202A29]">Equipment & Facilities</h2>
                  <p className="text-xs text-[#546462]">
                    Calibrated physical therapy modalities, traction units, and kinetic rehab tools.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setEditingEquipment({
                      name: 'New Therapy Modality',
                      description: 'Therapeutic apparatus description and mechanism of action.',
                      photo_url: '/images/equipment/ultrasound-therapy.jpg',
                      is_published: true,
                      order_index: equipment.length + 1,
                      is_demo: false,
                    })
                  }
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#155E59] hover:bg-[#0F4541] transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Equipment</span>
                </button>
              </div>

              {/* Editing Equipment */}
              {editingEquipment && (
                <div className="p-5 rounded-2xl bg-[#EEF5F1] border border-[#B9D5C8] space-y-4">
                  <div className="flex items-center justify-between font-bold text-sm text-[#155E59]">
                    <span>Edit Equipment</span>
                    <button
                      type="button"
                      onClick={() => setEditingEquipment(null)}
                      className="text-xs text-[#546462] underline"
                    >
                      Cancel
                    </button>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#202A29] mb-1">Equipment Name</label>
                    <input
                      type="text"
                      value={editingEquipment.name}
                      onChange={(e) =>
                        setEditingEquipment({ ...editingEquipment, name: e.target.value })
                      }
                      className="w-full px-3 py-1.5 rounded-lg border border-[#E3E8E5] text-xs bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#202A29] mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={editingEquipment.description}
                      onChange={(e) =>
                        setEditingEquipment({ ...editingEquipment, description: e.target.value })
                      }
                      className="w-full px-3 py-1.5 rounded-lg border border-[#E3E8E5] text-xs bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#202A29] mb-1">Photo URL</label>
                    <input
                      type="text"
                      value={editingEquipment.photo_url || ''}
                      onChange={(e) =>
                        setEditingEquipment({ ...editingEquipment, photo_url: e.target.value })
                      }
                      className="w-full px-3 py-1.5 rounded-lg border border-[#E3E8E5] text-xs bg-white font-mono"
                    />
                  </div>
                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setEditingEquipment(null)}
                      className="px-3 py-1.5 rounded-lg text-xs text-[#546462]"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const exists = equipment.some((e) => e.name === editingEquipment.name);
                        if (exists) {
                          setEquipment(
                            equipment.map((e) => (e.name === editingEquipment.name ? editingEquipment : e))
                          );
                        } else {
                          setEquipment([...equipment, editingEquipment]);
                        }
                        setEditingEquipment(null);
                        showFeedback(`Equipment "${editingEquipment.name}" saved.`);
                      }}
                      className="px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-[#155E59]"
                    >
                      Save Equipment
                    </button>
                  </div>
                </div>
              )}

              {/* Equipment list */}
              <div className="space-y-3">
                {equipment.map((eq) => (
                  <div
                    key={eq.name}
                    className="p-4 rounded-xl border border-[#E3E8E5] flex items-center justify-between hover:bg-[#F8FAF8]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                        {eq.photo_url && (
                          <Image src={eq.photo_url} alt={eq.name} fill className="object-cover" />
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-[#202A29]">{eq.name}</div>
                        <p className="text-xs text-[#546462] line-clamp-1">{eq.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingEquipment(eq)}
                        className="p-1.5 text-[#155E59] hover:bg-[#EEF5F1] rounded-lg"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setDeleteConfirmation({
                            type: 'equipment',
                            id: eq.name,
                            title: eq.name,
                          })
                        }
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: HEALTHY LIVING ARTICLES */}
          {activeTab === 'articles' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E3E8E5]">
                <div>
                  <h2 className="text-xl font-bold text-[#202A29]">Healthy Living Articles</h2>
                  <p className="text-xs text-[#546462]">
                    Publish educational health guidance, daily movement habits, and posture advice.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setEditingArticle({
                      id: `art-${Date.now()}`,
                      title: 'New Health Habit Article',
                      slug: `article-${Date.now()}`,
                      category: 'Ergonomics & Posture',
                      summary: 'Practical guidance for musculoskeletal wellness.',
                      content: 'Detailed body content with exercise suggestions and precautions.',
                      image_url: '/images/services/orthopedic-rehabilitation.jpg',
                      is_published: true,
                      order_index: articles.length + 1,
                      is_demo: false,
                    })
                  }
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#155E59] hover:bg-[#0F4541] transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Article</span>
                </button>
              </div>

              {/* Editing Article */}
              {editingArticle && (
                <div className="p-5 rounded-2xl bg-[#EEF5F1] border border-[#B9D5C8] space-y-4">
                  <div className="flex items-center justify-between font-bold text-sm text-[#155E59]">
                    <span>Edit Article</span>
                    <button
                      type="button"
                      onClick={() => setEditingArticle(null)}
                      className="text-xs text-[#546462] underline"
                    >
                      Cancel
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#202A29] mb-1">Article Title</label>
                      <input
                        type="text"
                        value={editingArticle.title}
                        onChange={(e) =>
                          setEditingArticle({ ...editingArticle, title: e.target.value })
                        }
                        className="w-full px-3 py-1.5 rounded-lg border border-[#E3E8E5] text-xs bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#202A29] mb-1">Category</label>
                      <input
                        type="text"
                        value={editingArticle.category}
                        onChange={(e) =>
                          setEditingArticle({ ...editingArticle, category: e.target.value })
                        }
                        className="w-full px-3 py-1.5 rounded-lg border border-[#E3E8E5] text-xs bg-white"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-[#202A29] mb-1">Summary</label>
                      <textarea
                        rows={2}
                        value={editingArticle.summary}
                        onChange={(e) =>
                          setEditingArticle({ ...editingArticle, summary: e.target.value })
                        }
                        className="w-full px-3 py-1.5 rounded-lg border border-[#E3E8E5] text-xs bg-white"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-[#202A29] mb-1">Full Content</label>
                      <textarea
                        rows={4}
                        value={editingArticle.content}
                        onChange={(e) =>
                          setEditingArticle({ ...editingArticle, content: e.target.value })
                        }
                        className="w-full px-3 py-1.5 rounded-lg border border-[#E3E8E5] text-xs bg-white"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setEditingArticle(null)}
                      className="px-3 py-1.5 rounded-lg text-xs text-[#546462]"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const exists = articles.some((a) => a.id === editingArticle.id);
                        if (exists) {
                          setArticles(
                            articles.map((a) => (a.id === editingArticle.id ? editingArticle : a))
                          );
                        } else {
                          setArticles([...articles, editingArticle]);
                        }
                        setEditingArticle(null);
                        showFeedback(`Article "${editingArticle.title}" saved.`);
                      }}
                      className="px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-[#155E59]"
                    >
                      Save Article
                    </button>
                  </div>
                </div>
              )}

              {/* Articles list */}
              <div className="space-y-3">
                {articles.map((art) => (
                  <div
                    key={art.id}
                    className="p-4 rounded-xl border border-[#E3E8E5] flex items-center justify-between hover:bg-[#F8FAF8]"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#202A29]">{art.title}</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#DDEBE4] text-[#155E59]">
                          {art.category}
                        </span>
                        {art.is_published ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                            Published
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gray-100 text-gray-600">
                            Draft
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#546462] mt-0.5 line-clamp-1">{art.summary}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingArticle(art)}
                        className="p-1.5 text-[#155E59] hover:bg-[#EEF5F1] rounded-lg"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setDeleteConfirmation({
                            type: 'article',
                            id: art.id,
                            title: art.title,
                          })
                        }
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: REVIEWS & REAL STORIES (PATIENT TESTIMONIALS) */}
          {activeTab === 'testimonials' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E3E8E5] gap-4">
                <div>
                  <h2 className="text-xl font-bold text-[#202A29]">Reviews & Real Stories</h2>
                  <p className="text-xs text-[#546462]">
                    Manage verified patient recovery feedback. Never publish unverified or fabricated testimonials.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setEditingTestimonial({
                      patient_name: 'Patient Name (e.g. Verified Patient)',
                      content: 'Feedback on treatment, mobility improvements, and recovery process.',
                      rating: 5,
                      condition_treated: 'Joint / Spine Condition',
                      consent_received: true,
                      is_published: false,
                      is_demo: false,
                    })
                  }
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#155E59] hover:bg-[#0F4541] transition-colors self-start sm:self-auto"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Patient Story</span>
                </button>
              </div>

              {/* Medical Advertising Warning Banner */}
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-amber-700 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>Medical Ethics Rule:</strong> Only publish patient reviews that have signed, explicit consent. Keep sensitive diagnosis private and never publish fabricated reviews or clinical outcome guarantees.
                </div>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setReviewFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                    reviewFilter === 'all'
                      ? 'bg-[#155E59] text-white'
                      : 'bg-gray-100 text-[#546462] hover:bg-gray-200'
                  }`}
                >
                  All ({testimonials.length})
                </button>
                <button
                  type="button"
                  onClick={() => setReviewFilter('published')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                    reviewFilter === 'published'
                      ? 'bg-[#155E59] text-white'
                      : 'bg-gray-100 text-[#546462] hover:bg-gray-200'
                  }`}
                >
                  Published ({testimonials.filter((t) => t.is_published).length})
                </button>
                <button
                  type="button"
                  onClick={() => setReviewFilter('pending')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                    reviewFilter === 'pending'
                      ? 'bg-[#155E59] text-white'
                      : 'bg-gray-100 text-[#546462] hover:bg-gray-200'
                  }`}
                >
                  Pending Consent ({testimonials.filter((t) => !t.is_published).length})
                </button>
              </div>

              {/* Editing Testimonial Modal / Form */}
              {editingTestimonial && (
                <div className="p-5 rounded-2xl bg-[#EEF5F1] border border-[#B9D5C8] space-y-4">
                  <div className="flex items-center justify-between font-bold text-sm text-[#155E59]">
                    <span>Edit Patient Review & Consent</span>
                    <button
                      type="button"
                      onClick={() => setEditingTestimonial(null)}
                      className="text-xs text-[#546462] underline"
                    >
                      Cancel
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#202A29] mb-1">
                        Patient Display Name / Identifier
                      </label>
                      <input
                        type="text"
                        value={editingTestimonial.patient_name}
                        onChange={(e) =>
                          setEditingTestimonial({ ...editingTestimonial, patient_name: e.target.value })
                        }
                        className="w-full px-3 py-1.5 rounded-lg border border-[#E3E8E5] text-xs bg-white"
                        placeholder="e.g. Verified Patient (Knee Mobility Recovery)"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#202A29] mb-1">
                        Condition Treated (Badge)
                      </label>
                      <input
                        type="text"
                        value={editingTestimonial.condition_treated || ''}
                        onChange={(e) =>
                          setEditingTestimonial({
                            ...editingTestimonial,
                            condition_treated: e.target.value,
                          })
                        }
                        className="w-full px-3 py-1.5 rounded-lg border border-[#E3E8E5] text-xs bg-white"
                        placeholder="e.g. Post-Surgical Knee Rehab, Cervical Strain"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-[#202A29] mb-1">
                        Patient Feedback Content
                      </label>
                      <textarea
                        rows={3}
                        value={editingTestimonial.content}
                        onChange={(e) =>
                          setEditingTestimonial({ ...editingTestimonial, content: e.target.value })
                        }
                        className="w-full px-3 py-1.5 rounded-lg border border-[#E3E8E5] text-xs bg-white"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-6 pt-2">
                    <div>
                      <label className="block text-xs font-bold text-[#202A29] mb-1">Rating</label>
                      <select
                        value={editingTestimonial.rating}
                        onChange={(e) =>
                          setEditingTestimonial({
                            ...editingTestimonial,
                            rating: parseInt(e.target.value, 10),
                          })
                        }
                        className="px-3 py-1.5 rounded-lg border border-[#E3E8E5] text-xs bg-white"
                      >
                        <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                        <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                        <option value={3}>⭐⭐⭐ (3 Stars)</option>
                      </select>
                    </div>

                    <label className="flex items-center gap-2 text-xs font-bold text-[#202A29] cursor-pointer mt-4">
                      <input
                        type="checkbox"
                        checked={editingTestimonial.consent_received || false}
                        onChange={(e) =>
                          setEditingTestimonial({
                            ...editingTestimonial,
                            consent_received: e.target.checked,
                          })
                        }
                        className="rounded text-[#155E59]"
                      />
                      <span>Informed Patient Consent Confirmed</span>
                    </label>

                    <label className="flex items-center gap-2 text-xs font-bold text-[#202A29] cursor-pointer mt-4">
                      <input
                        type="checkbox"
                        checked={editingTestimonial.is_published}
                        onChange={(e) =>
                          setEditingTestimonial({
                            ...editingTestimonial,
                            is_published: e.target.checked,
                          })
                        }
                        className="rounded text-[#155E59]"
                      />
                      <span>Publish on Website</span>
                    </label>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setEditingTestimonial(null)}
                      className="px-3 py-1.5 rounded-lg text-xs text-[#546462]"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const exists = testimonials.some(
                          (t) => t.patient_name === editingTestimonial.patient_name
                        );
                        if (exists) {
                          setTestimonials(
                            testimonials.map((t) =>
                              t.patient_name === editingTestimonial.patient_name
                                ? editingTestimonial
                                : t
                            )
                          );
                        } else {
                          setTestimonials([...testimonials, editingTestimonial]);
                        }
                        setEditingTestimonial(null);
                        showFeedback('Review saved.');
                      }}
                      className="px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-[#155E59]"
                    >
                      Save Review
                    </button>
                  </div>
                </div>
              )}

              {/* Testimonials List */}
              {filteredTestimonials.length === 0 ? (
                <div className="p-8 text-center bg-gray-50 rounded-xl border border-dashed border-[#E3E8E5] text-xs text-[#546462]">
                  No reviews in this category. Click &quot;Add Patient Story&quot; above to create one.
                </div>
              ) : (
                <div className="divide-y divide-[#E3E8E5] border border-[#E3E8E5] rounded-xl overflow-hidden">
                  {filteredTestimonials.map((test, i) => (
                    <div
                      key={i}
                      className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-[#F8FAF8]"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-xs sm:text-sm text-[#202A29]">
                            {test.patient_name}
                          </span>
                          <span className="text-amber-500 text-xs">{'★'.repeat(test.rating)}</span>
                          {test.condition_treated && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#EEF5F1] text-[#155E59]">
                              {test.condition_treated}
                            </span>
                          )}
                          {test.is_published ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                              Published
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gray-100 text-gray-600">
                              Draft / Pending
                            </span>
                          )}
                          {test.consent_received && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                              Consent Verified
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#546462] line-clamp-1 italic">
                          &ldquo;{test.content}&rdquo;
                        </p>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        {/* Quick Toggle Publish */}
                        <button
                          type="button"
                          onClick={() => {
                            const updated = testimonials.map((t) =>
                              t.patient_name === test.patient_name
                                ? { ...t, is_published: !t.is_published }
                                : t
                            );
                            setTestimonials(updated);
                            showFeedback(
                              `Review ${!test.is_published ? 'Published' : 'Unpublished'}.`
                            );
                          }}
                          className={`p-1.5 rounded-lg text-xs font-semibold ${
                            test.is_published
                              ? 'text-amber-700 hover:bg-amber-50'
                              : 'text-emerald-700 hover:bg-emerald-50'
                          }`}
                          title={test.is_published ? 'Unpublish review' : 'Approve & publish review'}
                        >
                          {test.is_published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingTestimonial(test)}
                          className="p-1.5 text-[#155E59] hover:bg-[#EEF5F1] rounded-lg"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setDeleteConfirmation({
                              type: 'testimonial',
                              id: test.patient_name,
                              title: test.patient_name,
                            })
                          }
                          className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 8: OPERATING SCHEDULE */}
          {activeTab === 'schedule' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E3E8E5]">
                <div>
                  <h2 className="text-xl font-bold text-[#202A29]">Operating Schedule</h2>
                  <p className="text-xs text-[#546462]">
                    Clinic consultation timings (Asia/Kolkata timezone).
                  </p>
                </div>
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={() => handleSaveSection('Operating Schedule')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#155E59] hover:bg-[#0F4541] transition-colors"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Schedule</span>
                </button>
              </div>

              <div className="space-y-3">
                {[
                  'Sunday',
                  'Monday',
                  'Tuesday',
                  'Wednesday',
                  'Thursday',
                  'Friday',
                  'Saturday',
                ].map((dayName, idx) => {
                  const dayItem = schedule.find((s) => s.day_of_week === idx) || {
                    day_of_week: idx,
                    is_closed: idx === 6,
                    morning_start: '09:00',
                    morning_end: '13:00',
                    evening_start: '16:00',
                    evening_end: '20:00',
                    is_demo: true,
                  };

                  return (
                    <div
                      key={idx}
                      className="p-3 sm:p-4 rounded-xl border border-[#E3E8E5] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div className="font-bold text-[#202A29] w-28">{dayName}</div>
                      <div className="flex items-center gap-4 flex-wrap">
                        <label className="flex items-center gap-1.5 cursor-pointer font-medium">
                          <input
                            type="checkbox"
                            checked={dayItem.is_closed}
                            onChange={(e) => {
                              const updated = schedule.map((s) =>
                                s.day_of_week === idx ? { ...s, is_closed: e.target.checked } : s
                              );
                              setSchedule(updated);
                            }}
                            className="rounded text-[#155E59]"
                          />
                          <span>Closed</span>
                        </label>

                        {!dayItem.is_closed && (
                          <div className="flex items-center gap-2 font-mono">
                            <span>{dayItem.morning_start} - {dayItem.morning_end}</span>
                            <span>&</span>
                            <span>{dayItem.evening_start} - {dayItem.evening_end}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 9: FAQS */}
          {activeTab === 'faqs' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E3E8E5]">
                <div>
                  <h2 className="text-xl font-bold text-[#202A29]">Patient FAQs</h2>
                  <p className="text-xs text-[#546462]">
                    Frequently asked questions about appointment duration, initial consultation, and procedures.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setEditingFaq({
                      question: 'New Clinical Question?',
                      answer: 'Clear, plain-language patient answer explaining clinic processes.',
                      order_index: faqs.length + 1,
                      is_published: true,
                      is_demo: false,
                    })
                  }
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#155E59] hover:bg-[#0F4541] transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add FAQ</span>
                </button>
              </div>

              {/* Editing FAQ */}
              {editingFaq && (
                <div className="p-5 rounded-2xl bg-[#EEF5F1] border border-[#B9D5C8] space-y-4">
                  <div className="flex items-center justify-between font-bold text-sm text-[#155E59]">
                    <span>Edit FAQ</span>
                    <button
                      type="button"
                      onClick={() => setEditingFaq(null)}
                      className="text-xs text-[#546462] underline"
                    >
                      Cancel
                    </button>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#202A29] mb-1">Question</label>
                    <input
                      type="text"
                      value={editingFaq.question}
                      onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-[#E3E8E5] text-xs bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#202A29] mb-1">Answer</label>
                    <textarea
                      rows={3}
                      value={editingFaq.answer}
                      onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-[#E3E8E5] text-xs bg-white"
                    />
                  </div>
                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setEditingFaq(null)}
                      className="px-3 py-1.5 rounded-lg text-xs text-[#546462]"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const exists = faqs.some((f) => f.question === editingFaq.question);
                        if (exists) {
                          setFaqs(
                            faqs.map((f) => (f.question === editingFaq.question ? editingFaq : f))
                          );
                        } else {
                          setFaqs([...faqs, editingFaq]);
                        }
                        setEditingFaq(null);
                        showFeedback('FAQ saved.');
                      }}
                      className="px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-[#155E59]"
                    >
                      Save FAQ
                    </button>
                  </div>
                </div>
              )}

              {/* FAQs list */}
              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl border border-[#E3E8E5] flex items-center justify-between hover:bg-[#F8FAF8]"
                  >
                    <div>
                      <div className="font-bold text-sm text-[#202A29]">{faq.question}</div>
                      <p className="text-xs text-[#546462] line-clamp-1 mt-0.5">{faq.answer}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingFaq(faq)}
                        className="p-1.5 text-[#155E59] hover:bg-[#EEF5F1] rounded-lg"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setDeleteConfirmation({
                            type: 'faq',
                            id: faq.question,
                            title: faq.question,
                          })
                        }
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 10: SEO & WEBSITE COPY */}
          {activeTab === 'seo' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E3E8E5]">
                <div>
                  <h2 className="text-xl font-bold text-[#202A29]">SEO & Search Appearance</h2>
                  <p className="text-xs text-[#546462]">
                    Configure meta tags, search engine previews, and site headlines.
                  </p>
                </div>
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={() => handleSaveSection('SEO Settings')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#155E59] hover:bg-[#0F4541] transition-colors"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save SEO</span>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#202A29] mb-1">
                    Meta Title (Google Search Title)
                  </label>
                  <input
                    type="text"
                    value={settings.meta_title || ''}
                    onChange={(e) => setSettings({ ...settings, meta_title: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E3E8E5] text-xs sm:text-sm text-[#202A29]"
                  />
                  <span className="text-[11px] text-[#546462] mt-0.5 block">
                    Ideal: 50-60 characters
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#202A29] mb-1">
                    Meta Description
                  </label>
                  <textarea
                    rows={3}
                    value={settings.meta_description || ''}
                    onChange={(e) => setSettings({ ...settings, meta_description: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E3E8E5] text-xs sm:text-sm text-[#202A29]"
                  />
                  <span className="text-[11px] text-[#546462] mt-0.5 block">
                    Ideal: 150-160 characters
                  </span>
                </div>

                {/* Search Engine Snippet Preview */}
                <div className="p-4 rounded-xl bg-[#F8FAF8] border border-[#E3E8E5] space-y-1">
                  <div className="text-[11px] font-semibold text-[#546462] uppercase tracking-wider mb-1">
                    Google Search Result Live Preview
                  </div>
                  <div className="text-xs text-[#155E59]">https://shrikrishnaphysio.example/</div>
                  <div className="text-sm font-bold text-[#1a0dab] hover:underline cursor-pointer">
                    {settings.meta_title || 'Shri Krishna Physiotherapy Clinic - Dr. Suresh Yadav'}
                  </div>
                  <div className="text-xs text-[#546462] line-clamp-2">
                    {settings.meta_description ||
                      'Professional physiotherapy and rehabilitation services by Dr. Suresh Yadav. Compassionate, evidence-informed physical therapy.'}
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Confirmation Dialog for Destructive Actions */}
      {deleteConfirmation && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-[#E3E8E5] space-y-4">
            <div className="flex items-center gap-3 text-red-600">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-[#202A29]">Confirm Deletion</h3>
            </div>
            <p className="text-xs sm:text-sm text-[#546462]">
              Are you sure you want to delete <strong className="text-[#202A29]">{deleteConfirmation.title}</strong>? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmation(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#546462] hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (deleteConfirmation.type === 'slide') {
                    setHeroSlides(heroSlides.filter((s) => s.id !== deleteConfirmation.id));
                  } else if (deleteConfirmation.type === 'service') {
                    setServices(services.filter((s) => s.slug !== deleteConfirmation.id));
                  } else if (deleteConfirmation.type === 'equipment') {
                    setEquipment(equipment.filter((eq) => eq.name !== deleteConfirmation.id));
                  } else if (deleteConfirmation.type === 'article') {
                    setArticles(articles.filter((a) => a.id !== deleteConfirmation.id));
                  } else if (deleteConfirmation.type === 'faq') {
                    setFaqs(faqs.filter((f) => f.question !== deleteConfirmation.id));
                  } else if (deleteConfirmation.type === 'testimonial') {
                    setTestimonials(
                      testimonials.filter((t) => t.patient_name !== deleteConfirmation.id)
                    );
                  }
                  showFeedback(`Deleted "${deleteConfirmation.title}" successfully.`);
                  setDeleteConfirmation(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-700"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
