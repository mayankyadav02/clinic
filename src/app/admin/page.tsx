import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { env } from '@/lib/env';
import {
  getClinicSettings,
  getDoctorProfile,
  getServices,
  getEquipment,
  getWeeklySchedule,
  getFaqs,
  getTestimonials,
  getHeroSlides,
  getHealthyLivingArticles,
} from '@/lib/data';
import { AdminDashboardClient } from './AdminDashboardClient';

export const dynamic = 'force-dynamic';

interface AdminDashboardPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function AdminDashboardPage({ searchParams }: AdminDashboardPageProps) {
  const resolvedParams = await searchParams;
  const isDemoPreviewRequested = resolvedParams.preview === 'demo';

  const isSupabaseConfigured =
    Boolean(env.NEXT_PUBLIC_SUPABASE_URL) &&
    !env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder') &&
    Boolean(env.NEXT_PUBLIC_SUPABASE_ANON_KEY) &&
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== 'placeholder-key';

  let authenticatedEmail: string | undefined = undefined;
  let isDemoMode = false;

  // Enforce server-side security: In production, demo preview is disabled unless explicit server env allows it
  const isProduction = process.env.NODE_ENV === 'production';
  const allowDemoInProduction = process.env.ALLOW_DEMO_PREVIEW === 'true';

  if (isSupabaseConfigured) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      // In production, block unauthorized demo access unless explicitly permitted
      if (isProduction && !allowDemoInProduction) {
        redirect('/admin/login?error=auth_required');
      }

      if (!isDemoPreviewRequested) {
        redirect('/admin/login');
      }
      isDemoMode = true;
    } else {
      // Verify user is in admin_users whitelist table
      const { data: adminData } = await supabase
        .from('admin_users')
        .select('id')
        .eq('id', user.id)
        .single();

      if (!adminData) {
        await supabase.auth.signOut();
        redirect('/admin/login?error=unauthorized');
      }

      authenticatedEmail = user.email;
    }
  } else {
    // When Supabase is not configured locally, allow review mode in development with strict banner
    if (isProduction && !allowDemoInProduction) {
      redirect('/admin/login?error=supabase_not_configured');
    }
    isDemoMode = true;
  }

  // Load current datasets for editing (including unpublished drafts for admin management)
  const [
    settings,
    doctor,
    services,
    equipment,
    schedule,
    faqs,
    testimonials,
    heroSlides,
    articles,
  ] = await Promise.all([
    getClinicSettings(),
    getDoctorProfile(),
    getServices(false),
    getEquipment(false),
    getWeeklySchedule(),
    getFaqs(false),
    getTestimonials(false),
    getHeroSlides(false),
    getHealthyLivingArticles(false),
  ]);

  return (
    <AdminDashboardClient
      initialSettings={settings}
      initialDoctor={doctor}
      initialServices={services}
      initialEquipment={equipment}
      initialSchedule={schedule}
      initialFaqs={faqs}
      initialTestimonials={testimonials}
      initialHeroSlides={heroSlides}
      initialArticles={articles}
      isDemoMode={isDemoMode}
      userEmail={authenticatedEmail}
    />
  );
}
