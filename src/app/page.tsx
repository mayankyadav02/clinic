import {
  getClinicSettings,
  getDoctorProfile,
  getServices,
  getEquipment,
  getWeeklySchedule,
  getFaqs,
  getHeroSlides,
  getTestimonials,
} from '@/lib/data';

import { HeroSlideshow } from '@/components/home/HeroSlideshow';
import { TrustHighlights } from '@/components/home/TrustHighlights';
import { DoctorIntro } from '@/components/home/DoctorIntro';
import { ServicesGrid } from '@/components/home/ServicesGrid';
import { EquipmentGallery } from '@/components/home/EquipmentGallery';
import { HowToGetStarted } from '@/components/home/HowToGetStarted';
import { RehabilitationJourney } from '@/components/home/RehabilitationJourney';
import { ReviewsSection } from '@/components/home/ReviewsSection';
import { ClinicHours } from '@/components/home/ClinicHours';
import { LocationSection } from '@/components/home/LocationSection';
import { FaqAccordion } from '@/components/home/FaqAccordion';
import { FinalCta } from '@/components/home/FinalCta';

export default async function HomePage() {
  const [settings, doctor, services, equipment, schedule, faqs, heroSlides, reviews] = await Promise.all([
    getClinicSettings(),
    getDoctorProfile(),
    getServices(true),
    getEquipment(true),
    getWeeklySchedule(),
    getFaqs(true),
    getHeroSlides(true),
    getTestimonials(true),
  ]);

  return (
    <div className="flex flex-col w-full">
      {/* 3. Hero section: CMS-managed slideshow */}
      <HeroSlideshow
        slides={heroSlides}
        autoplayInterval={settings.hero_autoplay_interval || 6500}
      />

      {/* 4. Trust highlights */}
      <TrustHighlights />

      {/* 5. Doctor introduction and profile */}
      <DoctorIntro doctor={doctor} />

      {/* 6. Services grid */}
      <ServicesGrid services={services} />

      {/* 7. Equipment and facilities gallery */}
      <EquipmentGallery equipment={equipment} />

      {/* 8. How to get started */}
      <HowToGetStarted />

      {/* 8b. Educational Rehabilitation Pathway */}
      <RehabilitationJourney />

      {/* 8c. Patient Reviews & Recovery Stories (Only shown when approved reviews exist) */}
      <ReviewsSection reviews={reviews} />

      {/* 9. Clinic opening hours */}
      <ClinicHours schedule={schedule} />

      {/* 10. Location and directions */}
      <LocationSection />

      {/* 11. FAQs */}
      <FaqAccordion faqs={faqs} />

      {/* 12. Strong final contact CTA */}
      <FinalCta />
    </div>
  );
}
