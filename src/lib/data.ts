import { createClient } from './supabase/server';
import {
  CLINIC_CONFIG,
  ClinicSettings,
  DoctorProfile,
  ServiceItem,
  EquipmentItem,
  ScheduleItem,
  FaqItem,
  TestimonialItem,
  HeroSlide,
  HealthyLivingArticle,
} from './config/clinic';

// Default / fallback dataset aligned with schema and demo data
export const FALLBACK_CLINIC_SETTINGS: ClinicSettings = {
  clinic_name: CLINIC_CONFIG.name,
  doctor_name: CLINIC_CONFIG.doctorName,
  phone: CLINIC_CONFIG.phone,
  whatsapp_number: CLINIC_CONFIG.whatsappNumber,
  email: CLINIC_CONFIG.unconfirmed.email,
  address: CLINIC_CONFIG.unconfirmed.address,
  city: CLINIC_CONFIG.unconfirmed.city,
  state: CLINIC_CONFIG.unconfirmed.state,
  pin_code: CLINIC_CONFIG.unconfirmed.pinCode,
  google_maps_url: CLINIC_CONFIG.mapsUrl,
  latitude: CLINIC_CONFIG.coordinates.latitude,
  longitude: CLINIC_CONFIG.coordinates.longitude,
  meta_title: 'Shri Krishna Physiotherapy Clinic - Dr. Suresh Yadav',
  meta_description: 'Professional physiotherapy and rehabilitation services by Dr. Suresh Yadav. Compassionate, evidence-informed physical therapy.',
  logo_url: null,
  logo_alt: 'Shri Krishna Physiotherapy Clinic Official Logo',
  hero_autoplay_interval: 6500,
  social_facebook: null,
  social_instagram: null,
  social_youtube: null,
  footer_note: 'Dedicated to compassionate, evidence-informed physical therapy and functional rehabilitation.',
  is_demo: true,
};

export const FALLBACK_DOCTOR_PROFILE: DoctorProfile = {
  name: CLINIC_CONFIG.doctorName,
  qualifications: ['BPTh / BPT', 'MPT (Musculoskeletal) - Pending Verification'],
  registration_number: 'Registration number pending owner verification',
  experience_years: 10,
  specializations: [
    'Orthopedic Rehabilitation',
    'Sports Injury Treatment',
    'Post-Surgical Joint Recovery',
    'Spinal Decompression & Ergonomics',
    'Neurological Physical Therapy',
  ],
  biography: `Dr. Suresh Yadav is an experienced physiotherapist dedicated to restoring movement, relieving chronic pain, and helping patients regain independence. Combining hands-on manual therapy with modern clinical electro-modalities and targeted exercise regimens, Dr. Yadav creates individualized rehabilitation pathways tailored to each patient's lifestyle and biomechanics.`,
  photo_url: '/images/doctor/dr-suresh-yadav-consultation.jpg',
  is_demo: true,
};

export const FALLBACK_SERVICES: ServiceItem[] = [
  {
    id: 's-1',
    slug: 'orthopedic-rehabilitation',
    title: 'Orthopedic Rehabilitation',
    description: 'Comprehensive rehabilitation for acute musculoskeletal conditions, joint arthritis, stiffness, and chronic back/neck pain.',
    detailed_description: `Our Orthopedic Rehabilitation program focuses on diagnosing biomechanical faults, reducing inflammation, and rebuilding stability across joints and muscles. Whether you suffer from lumbar disc herniation, frozen shoulder, osteoarthritis, or postural imbalance, we design evidence-backed exercise therapy protocols coupled with manual therapy to restore pain-free movement.`,
    icon: 'bone',
    image_url: '/images/services/orthopedic-rehabilitation.jpg',
    price_range: '₹500 - ₹1,000 / session',
    duration_minutes: 45,
    is_published: true,
    order_index: 1,
    is_demo: true,
  },
  {
    id: 's-2',
    slug: 'sports-injury-treatment',
    title: 'Sports Injury Treatment',
    description: 'Specialized diagnosis and rehabilitation for ligament sprains, muscle strains, tendonitis, and functional athletic return.',
    detailed_description: `From weekend runners to competitive athletes, sports injuries require progressive loading and precise functional reconditioning. We provide early-stage acute injury management, cryo/electro-modalities to curb swelling, dynamic kinetic chain retraining, and sports-specific drill guidance to safely return you to top performance without re-injury.`,
    icon: 'activity',
    image_url: '/images/services/sports-injury-treatment.jpg',
    price_range: '₹600 - ₹1,200 / session',
    duration_minutes: 60,
    is_published: true,
    order_index: 2,
    is_demo: true,
  },
  {
    id: 's-3',
    slug: 'neurological-rehabilitation',
    title: 'Neurological Rehabilitation',
    description: 'Targeted physical therapy for stroke recovery, nerve injuries, Parkinson’s management, and balance/coordination disorders.',
    detailed_description: `Neurological rehabilitation promotes neuroplasticity, restores postural balance, and re-educates neuromuscular patterns. Dr. Suresh Yadav works systematically with stroke survivors, sciatica patients, and peripheral neuropathy cases through gait training, sensory stimulation, and proprioceptive neuromuscular facilitation (PNF).`,
    icon: 'brain',
    image_url: '/images/services/neurological-rehabilitation.jpg',
    price_range: '₹700 - ₹1,500 / session',
    duration_minutes: 60,
    is_published: true,
    order_index: 3,
    is_demo: true,
  },
  {
    id: 's-4',
    slug: 'post-surgical-rehabilitation',
    title: 'Post-Surgical Rehabilitation',
    description: 'Structured phase-wise recovery following knee/hip replacements, ligament reconstructions, fractures, and spinal surgeries.',
    detailed_description: `Safe recovery after orthopedic surgery depends on strictly phased rehabilitation. We coordinate with your surgical guidelines to mobilize joints early, prevent scar adhesions, overcome muscle atrophy, and progress towards full weight-bearing mobility with total safety and confidence.`,
    icon: 'heart-pulse',
    image_url: '/images/services/post-surgical-rehabilitation.jpg',
    price_range: '₹800 - ₹1,500 / session',
    duration_minutes: 45,
    is_published: true,
    order_index: 4,
    is_demo: true,
  },
  {
    id: 's-5',
    slug: 'pediatric-physiotherapy',
    title: 'Pediatric Physiotherapy',
    description: 'Gentle, play-based physical rehabilitation for children facing developmental delays, torticollis, and posture irregularities.',
    detailed_description: `Children have unique musculoskeletal and neuromuscular developmental milestones. Our pediatric physical therapy utilizes engaging, reassuring, and gentle exercise methods to improve core stability, muscle tone, flexibility, and motor coordination in a supportive, friendly atmosphere.`,
    icon: 'baby',
    image_url: '/images/services/pediatric-physiotherapy.jpg',
    price_range: '₹500 - ₹1,000 / session',
    duration_minutes: 30,
    is_published: true,
    order_index: 5,
    is_demo: true,
  },
];

export const FALLBACK_EQUIPMENT: EquipmentItem[] = [
  {
    id: 'eq-1',
    name: 'Therapeutic Ultrasound Machine',
    description: 'Delivers high-frequency deep soundwaves to accelerate soft tissue repair, reduce deep muscle spasms, and resolve chronic tendon inflammation.',
    photo_url: '/images/equipment/ultrasound-therapy.jpg',
    is_published: true,
    order_index: 1,
    is_demo: true,
  },
  {
    id: 'eq-2',
    name: 'Advanced TENS & IFT Electrotherapy Unit',
    description: 'Utilizes controlled electrical stimulation for non-invasive neuro-muscular pain management, edema reduction, and nerve pathway stimulation.',
    photo_url: '/images/equipment/tens-electrotherapy.jpg',
    is_published: true,
    order_index: 2,
    is_demo: true,
  },
  {
    id: 'eq-3',
    name: 'Cervical & Lumbar Traction Bed',
    description: 'Precision mechanical traction designed for gentle spinal decompression, alleviating nerve root compression in disc bulges and sciatica.',
    photo_url: '/images/equipment/traction-bed.jpg',
    is_published: true,
    order_index: 3,
    is_demo: true,
  },
  {
    id: 'eq-4',
    name: 'Medical Swiss Exercise Balls & Balance Discs',
    description: 'Clinical core stabilization, vestibular balance training, and proprioceptive rehabilitation apparatus for dynamic pelvic stability.',
    photo_url: '/images/equipment/exercise-balls.jpg',
    is_published: true,
    order_index: 4,
    is_demo: true,
  },
  {
    id: 'eq-5',
    name: 'Graded Resistance Bands & Kinetic Tubes',
    description: 'Multi-resistance elasticity systems enabling progressive muscle load conditioning, joint stabilization, and functional range-of-motion recovery.',
    photo_url: '/images/equipment/resistance-bands.jpg',
    is_published: true,
    order_index: 5,
    is_demo: true,
  },
];

export const FALLBACK_SCHEDULE: ScheduleItem[] = [
  { id: 'sch-0', day_of_week: 0, is_closed: false, morning_start: '09:00', morning_end: '13:00', evening_start: '16:00', evening_end: '20:00', is_demo: true },
  { id: 'sch-1', day_of_week: 1, is_closed: false, morning_start: '09:00', morning_end: '13:00', evening_start: '16:00', evening_end: '20:00', is_demo: true },
  { id: 'sch-2', day_of_week: 2, is_closed: false, morning_start: '09:00', morning_end: '13:00', evening_start: '16:00', evening_end: '20:00', is_demo: true },
  { id: 'sch-3', day_of_week: 3, is_closed: false, morning_start: '09:00', morning_end: '13:00', evening_start: '16:00', evening_end: '20:00', is_demo: true },
  { id: 'sch-4', day_of_week: 4, is_closed: false, morning_start: '09:00', morning_end: '13:00', evening_start: '16:00', evening_end: '20:00', is_demo: true },
  { id: 'sch-5', day_of_week: 5, is_closed: false, morning_start: '09:00', morning_end: '13:00', evening_start: '16:00', evening_end: '20:00', is_demo: true },
  { id: 'sch-6', day_of_week: 6, is_closed: true, morning_start: null, morning_end: null, evening_start: null, evening_end: null, is_demo: true },
];

export const FALLBACK_FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'What should I bring to my initial physiotherapy consultation?',
    answer: 'Please bring any relevant prior medical prescriptions, X-ray/MRI reports, or surgery discharge summaries if available. Wear comfortable, loose clothing that allows Dr. Suresh Yadav to examine your affected joint or spinal region easily.',
    order_index: 1,
    is_published: true,
    is_demo: true,
  },
  {
    id: 'faq-2',
    question: 'How long does each therapy session take?',
    answer: 'A standard rehabilitation appointment typically lasts between 30 and 60 minutes, depending on the severity of your condition, modality requirements (e.g. ultrasound or traction), and hands-on therapeutic exercise routines.',
    order_index: 2,
    is_published: true,
    is_demo: true,
  },
  {
    id: 'faq-3',
    question: 'How many sessions will I need before feeling pain relief?',
    answer: 'Many patients notice reduced stiffness and initial relief within 2 to 3 sessions. However, lasting musculoskeletal healing and functional strengthening generally require a consistent plan of 5 to 10 sessions combined with home exercises.',
    order_index: 3,
    is_published: true,
    is_demo: true,
  },
  {
    id: 'faq-4',
    question: 'Do I need a doctor’s referral to consult Dr. Suresh Yadav?',
    answer: 'No referral is mandatory to schedule an initial evaluation. Dr. Suresh Yadav conducts a comprehensive physical assessment. However, if your orthopedic surgeon or physician has provided post-operative instructions, we strictly adhere to their protocols.',
    order_index: 4,
    is_published: true,
    is_demo: true,
  },
  {
    id: 'faq-5',
    question: 'How do I confirm clinic timings before visiting?',
    answer: 'Consultation timings are confirmed directly with the clinic team. We recommend calling 7891426494 or sending a quick WhatsApp enquiry so our staff can confirm doctor availability and allocate a comfortable time slot.',
    order_index: 5,
    is_published: true,
    is_demo: true,
  },
];

export const FALLBACK_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    patient_name: 'Patient Story (Pending Consent)',
    content: 'Dr. Suresh Yadav provided clear guidance on knee joint mobility exercises and gradual strength reconditioning.',
    rating: 5,
    condition_treated: 'Post-Surgical Knee Rehabilitation',
    consent_received: false,
    order_index: 1,
    is_published: false, // Inactive until verified permission
    is_demo: true,
  },
  {
    id: 'test-2',
    patient_name: 'Patient Story (Pending Consent)',
    content: 'Cervical mobilization and ergonomic posture exercises reduced persistent neck stiffness caused by computer work.',
    rating: 5,
    condition_treated: 'Cervical Postural Discomfort',
    consent_received: false,
    order_index: 2,
    is_published: false, // Inactive until verified permission
    is_demo: true,
  },
];

export const FALLBACK_HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    heading: 'Restoring Movement. Relieving Persistent Pain.',
    description: `Welcome to ${CLINIC_CONFIG.name}, led by ${CLINIC_CONFIG.doctorName}. We provide individualized physical therapy protocols for joint stiffness, spinal discomfort, and safe post-surgical recovery.`,
    badge_label: 'Specialized Physical Therapy & Pain Management',
    cta_text: 'Enquire via WhatsApp',
    cta_link: 'whatsapp',
    image_url: '/images/hero/physiotherapy-hero.jpg',
    alt_text: 'Physiotherapist guiding a patient through mobility and knee rehabilitation exercise on treatment plinth',
    is_active: true,
    order_index: 1,
    is_demo: true,
  },
  {
    id: 'slide-2',
    heading: 'Targeted Spine & Joint Mobilization',
    description: 'Evidence-informed manual therapy, gentle spinal traction, and progressive rehabilitation for back, neck, and joint arthritis discomfort.',
    badge_label: 'Orthopedic & Joint Care',
    cta_text: 'Explore Services',
    cta_link: '/services',
    image_url: '/images/services/orthopedic-rehabilitation.jpg',
    alt_text: 'Physiotherapist performing gentle shoulder and thoracic joint mobilization on a treatment bed',
    is_active: true,
    order_index: 2,
    is_demo: true,
  },
  {
    id: 'slide-3',
    heading: 'Safe, Guided Return to Active Living',
    description: 'Functional kinetic reconditioning for ligament sprains, muscle strains, and athletic performance recovery with targeted progressive drills.',
    badge_label: 'Sports Injury & Kinetic Conditioning',
    cta_text: 'Sports Injury Care',
    cta_link: '/services/sports-injury-treatment',
    image_url: '/images/services/sports-injury-treatment.jpg',
    alt_text: 'Sports therapist supervising patient single-leg resistance-band knee stability drill',
    is_active: true,
    order_index: 3,
    is_demo: true,
  },
  {
    id: 'slide-4',
    heading: 'Evidence-Backed Modalities & Safe Care',
    description: 'Equipped with calibrated therapeutic ultrasound, gentle spinal traction decompression, and clinical rehabilitation tools.',
    badge_label: 'Modern Rehabilitation Studio',
    cta_text: 'Explore Equipment',
    cta_link: '/equipment',
    image_url: '/images/clinic/rehabilitation-room.jpg',
    alt_text: 'Clean, modern physiotherapy rehabilitation studio with plinths, Swiss balls, and equipment',
    is_active: true,
    order_index: 4,
    is_demo: true,
  },
];

export const FALLBACK_HEALTHY_LIVING_ARTICLES: HealthyLivingArticle[] = [
  {
    id: 'art-1',
    title: 'The 45-Minute Movement Rule for Desk Workers',
    slug: '45-minute-movement-rule',
    summary: 'Why spinal intervertebral discs depend on regular postural changes and how micro-breaks prevent mid-back fatigue.',
    content: 'Prolonged static sitting compresses the lumbar intervertebral discs and reduces blood flow to spinal stabilizing muscles. Every 45 minutes, stand for 60 to 90 seconds, perform gentle scapular retractions, and take a brief 20-step walk to rehydrate your spinal tissues.',
    category: 'Ergonomics & Posture',
    image_url: '/images/services/orthopedic-rehabilitation.jpg',
    alt_text: 'Ergonomic posture and spine care',
    is_published: true,
    order_index: 1,
    is_demo: true,
  },
  {
    id: 'art-2',
    title: 'Safe Walking vs Overload: The 10% Progression Rule',
    slug: 'safe-walking-10-percent-rule',
    summary: 'How to increase your weekly step volume and protect knee cartilage without triggering acute tendonitis or foot pain.',
    content: 'Muscles and tendons adapt to loading gradually. If you currently walk 3,000 steps per day, increase by no more than 10% (300 steps) each week. This protects connective tissue while steadily building cardiovascular endurance and joint lubrication.',
    category: 'Daily Activity',
    image_url: '/images/services/sports-injury-treatment.jpg',
    alt_text: 'Safe walking and load management',
    is_published: true,
    order_index: 2,
    is_demo: true,
  },
  {
    id: 'art-3',
    title: 'Supported Sleep Ergonomics: Spine Alignment at Night',
    slug: 'supported-sleep-ergonomics',
    summary: 'Choosing the right pillow height and knee support to wake up free from morning neck stiffness and lower back ache.',
    content: 'Your spine needs neutral alignment during sleep. Back sleepers benefit from a low-profile cervical pillow and a small pillow under the knees. Side sleepers should place a supportive pillow between their knees to prevent pelvis twisting and lumbar rotation.',
    category: 'Rest & Recovery',
    image_url: '/images/doctor/dr-suresh-yadav-consultation.jpg',
    alt_text: 'Sleep posture and spinal alignment',
    is_published: true,
    order_index: 3,
    is_demo: true,
  },
];

// Helper functions that safely query Supabase or return fallbacks
export async function getClinicSettings(): Promise<ClinicSettings> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('clinic_settings')
      .select('*')
      .limit(1)
      .maybeSingle();

    if (!error && data) {
      return data as ClinicSettings;
    }
  } catch {
    // Supabase unconfigured or offline
  }
  return FALLBACK_CLINIC_SETTINGS;
}

export async function getDoctorProfile(): Promise<DoctorProfile> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('doctor_profiles')
      .select('*')
      .limit(1)
      .maybeSingle();

    if (!error && data) {
      return data as DoctorProfile;
    }
  } catch {
    // Supabase unconfigured or offline
  }
  return FALLBACK_DOCTOR_PROFILE;
}

export async function getServices(onlyPublished = true): Promise<ServiceItem[]> {
  try {
    const supabase = await createClient();
    let query = supabase.from('services').select('*').order('order_index', { ascending: true });
    if (onlyPublished) {
      query = query.eq('is_published', true);
    }
    const { data, error } = await query;
    if (!error && data && data.length > 0) {
      return data as ServiceItem[];
    }
  } catch {
    // Supabase unconfigured or offline
  }
  return onlyPublished ? FALLBACK_SERVICES.filter(s => s.is_published) : FALLBACK_SERVICES;
}

export async function getServiceBySlug(slug: string): Promise<ServiceItem | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (!error && data) {
      return data as ServiceItem;
    }
  } catch {
    // Supabase unconfigured or offline
  }
  const fallback = FALLBACK_SERVICES.find(s => s.slug === slug);
  return fallback || null;
}

export async function getEquipment(onlyPublished = true): Promise<EquipmentItem[]> {
  try {
    const supabase = await createClient();
    let query = supabase.from('equipment').select('*').order('order_index', { ascending: true });
    if (onlyPublished) {
      query = query.eq('is_published', true);
    }
    const { data, error } = await query;
    if (!error && data && data.length > 0) {
      return data as EquipmentItem[];
    }
  } catch {
    // Supabase unconfigured or offline
  }
  return onlyPublished ? FALLBACK_EQUIPMENT.filter(e => e.is_published) : FALLBACK_EQUIPMENT;
}

export async function getWeeklySchedule(): Promise<ScheduleItem[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('weekly_schedule')
      .select('*')
      .order('day_of_week', { ascending: true });

    if (!error && data && data.length > 0) {
      return data as ScheduleItem[];
    }
  } catch {
    // Supabase unconfigured or offline
  }
  return FALLBACK_SCHEDULE;
}

export async function getFaqs(onlyPublished = true): Promise<FaqItem[]> {
  try {
    const supabase = await createClient();
    let query = supabase.from('faqs').select('*').order('order_index', { ascending: true });
    if (onlyPublished) {
      query = query.eq('is_published', true);
    }
    const { data, error } = await query;
    if (!error && data && data.length > 0) {
      return data as FaqItem[];
    }
  } catch {
    // Supabase unconfigured or offline
  }
  return onlyPublished ? FALLBACK_FAQS.filter(f => f.is_published) : FALLBACK_FAQS;
}

export async function getTestimonials(onlyPublished = true): Promise<TestimonialItem[]> {
  try {
    const supabase = await createClient();
    let query = supabase.from('testimonials').select('*');
    if (onlyPublished) {
      query = query.eq('is_published', true);
    }
    const { data, error } = await query;
    if (!error && data && data.length > 0) {
      return data as TestimonialItem[];
    }
  } catch {
    // Supabase unconfigured or offline
  }
  return onlyPublished ? FALLBACK_TESTIMONIALS.filter(t => t.is_published) : FALLBACK_TESTIMONIALS;
}

export async function getHeroSlides(onlyActive = true): Promise<HeroSlide[]> {
  try {
    const supabase = await createClient();
    let query = supabase.from('hero_slides').select('*').order('order_index', { ascending: true });
    if (onlyActive) {
      query = query.eq('is_active', true);
    }
    const { data, error } = await query;
    if (!error && data && data.length > 0) {
      return data as HeroSlide[];
    }
  } catch {
    // Supabase unconfigured or offline
  }
  return onlyActive ? FALLBACK_HERO_SLIDES.filter(s => s.is_active) : FALLBACK_HERO_SLIDES;
}

export async function getHealthyLivingArticles(onlyPublished = true): Promise<HealthyLivingArticle[]> {
  try {
    const supabase = await createClient();
    let query = supabase.from('healthy_living_articles').select('*').order('order_index', { ascending: true });
    if (onlyPublished) {
      query = query.eq('is_published', true);
    }
    const { data, error } = await query;
    if (!error && data && data.length > 0) {
      return data as HealthyLivingArticle[];
    }
  } catch {
    // Supabase unconfigured or offline
  }
  return onlyPublished ? FALLBACK_HEALTHY_LIVING_ARTICLES.filter(a => a.is_published) : FALLBACK_HEALTHY_LIVING_ARTICLES;
}
