// Centralized clinic configuration
// Confirmed values provided by the client:
// Phone: 7891426494
// Coordinates: 27.2924909, 75.1829705
// Google Maps URL: https://www.google.com/maps?q=27.2924909,75.1829705

export const CLINIC_CONFIG = {
  // Confirmed identity information
  name: 'Shri Krishna Physiotherapy Clinic',
  doctorName: 'Dr. Suresh Yadav',
  tagline: 'Restoring Movement, Relieving Pain, Rebuilding Strength',
  
  // Contact information
  // Phone number supplied: 7891426494
  phone: '7891426494',
  formattedPhone: '+91 78914 26494',
  
  // Default WhatsApp international number (pending owner verification in production)
  whatsappNumber: '917891426494',
  
  // Confirmed location coordinates
  coordinates: {
    latitude: 27.2924909,
    longitude: 75.1829705,
  },
  
  // Confirmed Google Maps URL
  mapsUrl: 'https://www.google.com/maps?q=27.2924909,75.1829705',
  
  // Timezone
  timezone: 'Asia/Kolkata',
  
  // Unconfirmed placeholders (clearly marked as demo until verified by owner)
  unconfirmed: {
    email: 'info@shrikrishnaphysio.example',
    address: 'Near Main Market Road',
    city: 'Khatu / Sikar Region',
    state: 'Rajasthan',
    pinCode: '332602',
    hoursNotice: 'Clinic consultation hours are subject to confirmation. Please call or WhatsApp ahead before your visit.',
  },
} as const;

/**
 * Builds a safe WhatsApp URL with an encoded general inquiry message.
 * Never includes sensitive medical information.
 */
export function getWhatsAppUrl(message?: string): string {
  const defaultMessage = `Hello Dr. Suresh Yadav, I would like to enquire about a physiotherapy consultation at Shri Krishna Physiotherapy Clinic.`;
  const text = encodeURIComponent(message || defaultMessage);
  return `https://wa.me/${CLINIC_CONFIG.whatsappNumber}?text=${text}`;
}

/**
 * Builds a telephone dialer URL.
 */
export function getTelUrl(phone = CLINIC_CONFIG.phone): string {
  return `tel:${phone}`;
}

// Types for data models
export type ClinicSettings = {
  id?: string;
  clinic_name: string;
  doctor_name: string;
  phone: string;
  whatsapp_number: string | null;
  email: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  pin_code: string | null;
  google_maps_url: string;
  latitude: number;
  longitude: number;
  meta_title: string | null;
  meta_description: string | null;
  logo_url?: string | null;
  logo_alt?: string | null;
  hero_autoplay_interval?: number | null;
  social_facebook?: string | null;
  social_instagram?: string | null;
  social_youtube?: string | null;
  footer_note?: string | null;
  is_demo: boolean;
};

export type DoctorProfile = {
  id?: string;
  name: string;
  qualifications: string[];
  registration_number: string | null;
  experience_years: number | null;
  specializations: string[];
  biography: string | null;
  photo_url: string | null;
  is_demo: boolean;
};

export type ServiceItem = {
  id?: string;
  slug: string;
  title: string;
  description: string;
  detailed_description: string | null;
  icon: string | null;
  image_url?: string | null;
  price_range: string | null;
  duration_minutes: number | null;
  is_published: boolean;
  order_index: number;
  is_demo: boolean;
};

export type EquipmentItem = {
  id?: string;
  name: string;
  description: string;
  photo_url: string | null;
  is_published: boolean;
  order_index: number;
  is_demo: boolean;
};

export type ScheduleItem = {
  id?: string;
  day_of_week: number;
  is_closed: boolean;
  morning_start: string | null;
  morning_end: string | null;
  evening_start: string | null;
  evening_end: string | null;
  is_demo: boolean;
};

export type FaqItem = {
  id?: string;
  question: string;
  answer: string;
  order_index: number;
  is_published: boolean;
  is_demo: boolean;
};

export type TestimonialItem = {
  id?: string;
  patient_name: string;
  content: string;
  rating: number;
  condition_treated?: string | null;
  consent_received?: boolean;
  order_index?: number;
  is_published: boolean;
  is_demo: boolean;
};

export type HeroSlide = {
  id: string;
  heading: string;
  description: string;
  badge_label?: string | null;
  cta_text: string;
  cta_link: string;
  image_url: string;
  alt_text: string;
  is_active: boolean;
  order_index: number;
  is_demo: boolean;
};

export type HealthyLivingArticle = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: string;
  image_url?: string | null;
  alt_text?: string | null;
  is_published: boolean;
  order_index: number;
  is_demo: boolean;
};
