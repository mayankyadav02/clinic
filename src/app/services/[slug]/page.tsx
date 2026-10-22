import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  Clock,
  Tag,
  Phone,
  MessageSquare,
  Activity,
  CheckCircle2,
  Stethoscope,
  AlertCircle,
} from 'lucide-react';
import { CLINIC_CONFIG, getTelUrl, getWhatsAppUrl } from '@/lib/config/clinic';
import { getServiceBySlug, getServices } from '@/lib/data';
import { DemoBadge } from '@/components/common/DemoBadge';

interface ServiceDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  return {
    title: `${service.title} — ${CLINIC_CONFIG.doctorName}`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <Activity className="w-12 h-12 text-[#155E59] mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-[#202A29]">Service Not Found</h1>
        <p className="text-sm text-[#546462] mt-2 mb-6">
          The requested physiotherapy service could not be located in our directory.
        </p>
        <Link
          href="/services"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#155E59]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to All Services</span>
        </Link>
      </div>
    );
  }

  const allServices = await getServices(true);
  const relatedServices = allServices.filter((s) => s.slug !== service.slug).slice(0, 3);
  const imageSrc = service.image_url || '/images/services/orthopedic-rehabilitation.jpg';

  return (
    <div className="flex flex-col w-full bg-[#F8FAF8]">
      {/* Breadcrumb Header */}
      <section className="bg-gradient-to-b from-[#EEF5F1] to-[#F8FAF8] py-10 sm:py-14 border-b border-[#E3E8E5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-[#546462] mb-4">
            <Link href="/" className="hover:text-[#155E59] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/services" className="hover:text-[#155E59] transition-colors">
              Services
            </Link>
            <span>/</span>
            <span className="text-[#202A29] font-medium">{service.title}</span>
          </div>

          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#DDEBE4] text-[#155E59]">
                Clinical Physiotherapy Pathway
              </span>
              {service.is_demo && (
                <DemoBadge label="Demo service details" />
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#202A29] tracking-tight">
              {service.title}
            </h1>

            <p className="text-base sm:text-lg text-[#546462] mt-4 leading-relaxed">
              {service.description}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-6 text-xs sm:text-sm text-[#202A29]">
              {service.duration_minutes && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#155E59]" />
                  <span>Session Length: <strong>Approx. {service.duration_minutes} minutes</strong></span>
                </div>
              )}
              {service.price_range && (
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-[#155E59]" />
                  <span>Estimated Fee: <strong>{service.price_range}</strong></span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Sidebar Grid */}
      <section className="py-14 sm:py-20 bg-white border-b border-[#E3E8E5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Content Area */}
            <div className="lg:col-span-8 space-y-12">
              {/* Dedicated Service Demonstration Photography */}
              <div className="rounded-3xl overflow-hidden border border-[#E3E8E5] bg-[#F8FAF8] shadow-sm">
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src={imageSrc}
                    alt={service.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 750px"
                    className="object-cover"
                  />
                  {service.is_demo && (
                    <div className="absolute top-4 right-4">
                      <DemoBadge label="Demonstration image" className="bg-black/60 text-amber-200 border-amber-300/40 text-[11px]" />
                    </div>
                  )}
                </div>
                <div className="p-4 sm:p-5 text-xs text-[#546462] bg-[#F8FAF8] border-t border-[#E3E8E5] flex items-center justify-between">
                  <span>Rehabilitation therapy environment illustrative preview</span>
                  <span className="font-semibold text-[#155E59]">{service.title}</span>
                </div>
              </div>

              {/* 1. What the Service Means (Plain-Language Explanation) */}
              <div className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-lg bg-[#DDEBE4] text-[#155E59] flex items-center justify-center font-bold text-sm">
                    1
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#202A29]">
                    What is {service.title}?
                  </h2>
                </div>
                <div className="text-sm sm:text-base text-[#546462] leading-relaxed space-y-3 pl-10">
                  <p>
                    {service.detailed_description || service.description}
                  </p>
                  <p>
                    In simple terms, this therapy focuses on identifying why your body is experiencing pain, restricted motion,
                    or muscle weakness, and systematically retraining muscles and joints to move normally again without strain.
                  </p>
                </div>
              </div>

              {/* 2. Common Symptoms & Physical Concerns Assessed */}
              <div className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-lg bg-[#DDEBE4] text-[#155E59] flex items-center justify-center font-bold text-sm">
                    2
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#202A29]">
                    Symptoms & Concerns Evaluated
                  </h2>
                </div>
                <div className="pl-10">
                  <p className="text-sm text-[#546462] mb-4">
                    Patients often consult Dr. Suresh Yadav for {service.title.toLowerCase()} when experiencing:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-xl bg-[#F8FAF8] border border-[#E3E8E5] flex items-start gap-2.5 text-xs sm:text-sm text-[#202A29]">
                      <CheckCircle2 className="w-4 h-4 text-[#155E59] mt-0.5 flex-shrink-0" />
                      <span>Persistent or sharp joint and muscle discomfort</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#F8FAF8] border border-[#E3E8E5] flex items-start gap-2.5 text-xs sm:text-sm text-[#202A29]">
                      <CheckCircle2 className="w-4 h-4 text-[#155E59] mt-0.5 flex-shrink-0" />
                      <span>Stiffness or difficulty bending, reaching, or walking</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#F8FAF8] border border-[#E3E8E5] flex items-start gap-2.5 text-xs sm:text-sm text-[#202A29]">
                      <CheckCircle2 className="w-4 h-4 text-[#155E59] mt-0.5 flex-shrink-0" />
                      <span>Radiating tingling, numbness, or nerve sensitivity</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#F8FAF8] border border-[#E3E8E5] flex items-start gap-2.5 text-xs sm:text-sm text-[#202A29]">
                      <CheckCircle2 className="w-4 h-4 text-[#155E59] mt-0.5 flex-shrink-0" />
                      <span>Post-trauma weakness or compensatory postural guarding</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. What the Doctor Evaluates During Clinical Consultation */}
              <div className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-lg bg-[#DDEBE4] text-[#155E59] flex items-center justify-center font-bold text-sm">
                    3
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#202A29]">
                    What Dr. Suresh Yadav Evaluates
                  </h2>
                </div>
                <div className="pl-10 space-y-3">
                  <p className="text-sm text-[#546462]">
                    During your physical assessment at Shri Krishna Physiotherapy Clinic, Dr. Yadav conducts an extensive hands-on examination:
                  </p>
                  <div className="bg-[#EEF5F1] rounded-2xl p-6 border border-[#B9D5C8]/80 space-y-3 text-xs sm:text-sm text-[#202A29]">
                    <div className="flex items-start gap-2">
                      <Stethoscope className="w-4 h-4 text-[#155E59] mt-0.5 flex-shrink-0" />
                      <span><strong>Range of Motion Testing:</strong> Measuring joint angles and identifying where stiffness begins.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Stethoscope className="w-4 h-4 text-[#155E59] mt-0.5 flex-shrink-0" />
                      <span><strong>Muscle Strength & Symmetry:</strong> Pinpointing motor inhibition or muscle imbalances that overload tissues.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Stethoscope className="w-4 h-4 text-[#155E59] mt-0.5 flex-shrink-0" />
                      <span><strong>Postural & Functional Gait:</strong> Checking how your body distributes load while standing, bending, and walking.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Stethoscope className="w-4 h-4 text-[#155E59] mt-0.5 flex-shrink-0" />
                      <span><strong>Palpation & Provocation:</strong> Safely localizing muscle trigger points and joint end-feels within your comfort limits.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. Rehabilitation Approaches & Modalities Applied */}
              <div className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-lg bg-[#DDEBE4] text-[#155E59] flex items-center justify-center font-bold text-sm">
                    4
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#202A29]">
                    Rehabilitation Approaches & Techniques
                  </h2>
                </div>
                <div className="pl-10 space-y-4">
                  <p className="text-sm text-[#546462]">
                    Depending on your assessment findings, Dr. Yadav combines evidence-informed techniques:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-white border border-[#E3E8E5] shadow-xs space-y-1">
                      <h4 className="text-xs font-bold text-[#155E59] uppercase tracking-wider">Manual Joint Mobilization</h4>
                      <p className="text-xs text-[#546462]">Gentle oscillations to restore joint fluid glide and ease restriction.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white border border-[#E3E8E5] shadow-xs space-y-1">
                      <h4 className="text-xs font-bold text-[#155E59] uppercase tracking-wider">Therapeutic Ultrasound / TENS</h4>
                      <p className="text-xs text-[#546462]">Deep cellular warmth and non-invasive electro-analgesia for symptom calm.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white border border-[#E3E8E5] shadow-xs space-y-1">
                      <h4 className="text-xs font-bold text-[#155E59] uppercase tracking-wider">Kinetic Strengthening Drills</h4>
                      <p className="text-xs text-[#546462]">Progressive resistance band and core work to support stabilizing muscles.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white border border-[#E3E8E5] shadow-xs space-y-1">
                      <h4 className="text-xs font-bold text-[#155E59] uppercase tracking-wider">Ergonomic & Home Strategy</h4>
                      <p className="text-xs text-[#546462]">Actionable movement habits so daily work doesn’t re-trigger your pain.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 5. Why an Individualized Plan Matters */}
              <div className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-lg bg-[#DDEBE4] text-[#155E59] flex items-center justify-center font-bold text-sm">
                    5
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#202A29]">
                    Why an Individualized Plan Matters
                  </h2>
                </div>
                <div className="pl-10 text-sm text-[#546462] leading-relaxed space-y-3">
                  <p>
                    No two bodies respond to injury identically. A routine exercise routine found online may overload an irritable tendon
                    or under-stimulate dormant stabilizer muscles.
                  </p>
                  <p>
                    Dr. Suresh Yadav modifies exercise volume, angle, and load progressively at each clinical follow-up. This customized progression
                    avoids flare-ups and ensures continuous, safe functional gains.
                  </p>
                </div>
              </div>

              {/* 6. Clinical Disclaimer & Recovery Transparency */}
              <div className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-lg bg-[#DDEBE4] text-[#155E59] flex items-center justify-center font-bold text-sm">
                    6
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#202A29]">
                    Clinical Disclaimer & Recovery Transparency
                  </h2>
                </div>
                <div className="pl-10">
                  <div className="p-5 rounded-2xl bg-[#EEF5F1] border border-[#B9D5C8] text-xs sm:text-sm text-[#155E59] space-y-2">
                    <div className="flex items-center gap-2 font-bold text-[#202A29]">
                      <AlertCircle className="w-4 h-4 text-[#155E59] flex-shrink-0" />
                      <span>Important Medical Boundary</span>
                    </div>
                    <p className="leading-relaxed text-[#202A29]/80">
                      The number of sessions required and the rate of recovery depend upon several individual factors, including condition chronicity,
                      underlying tissue damage, personal compliance with home exercises, and overall medical history.
                      This webpage is educational and does not constitute a formal diagnosis. An in-person consultation with Dr. Suresh Yadav is necessary
                      to confirm your rehabilitation plan.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar: Booking & Doctor Box */}
            <div className="lg:col-span-4 sticky top-28 space-y-6">
              <div className="bg-[#F8FAF8] rounded-3xl p-6 sm:p-7 border border-[#E3E8E5] space-y-5 shadow-xs">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#155E59]">
                    Consultation Desk
                  </span>
                  <h3 className="text-lg font-bold text-[#202A29] mt-1">
                    Book {service.title}
                  </h3>
                  <p className="text-xs text-[#546462] mt-1">
                    Dr. Suresh Yadav will assess your symptoms and formulate an active rehabilitation roadmap.
                  </p>
                </div>

                <div className="space-y-3 pt-2 text-xs">
                  <div className="flex items-center justify-between py-2 border-b border-[#E3E8E5]">
                    <span className="text-[#546462]">Physiotherapist</span>
                    <span className="font-bold text-[#202A29]">{CLINIC_CONFIG.doctorName}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-[#E3E8E5]">
                    <span className="text-[#546462]">Est. Duration</span>
                    <span className="font-bold text-[#202A29]">{service.duration_minutes || 45} mins</span>
                  </div>
                  {service.price_range && (
                    <div className="flex items-center justify-between py-2 border-b border-[#E3E8E5]">
                      <span className="text-[#546462]">Session Fee</span>
                      <span className="font-bold text-[#202A29]">{service.price_range}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between py-2 border-b border-[#E3E8E5]">
                    <span className="text-[#546462]">Verified Telephone</span>
                    <a href={getTelUrl()} className="font-bold text-[#155E59] hover:underline">
                      {CLINIC_CONFIG.phone}
                    </a>
                  </div>
                </div>

                <div className="space-y-2.5 pt-2">
                  <a
                    href={getWhatsAppUrl(`Hello Dr. Suresh Yadav, I would like to schedule an enquiry for ${service.title} at Shri Krishna Clinic.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold text-white bg-[#155E59] hover:bg-[#0F4541] shadow-xs transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 text-[#DDEBE4]" />
                    <span>Enquire on WhatsApp</span>
                  </a>

                  <a
                    href={getTelUrl()}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold text-[#202A29] bg-white border border-[#E3E8E5] hover:bg-[#F8FAF8] transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#155E59]" />
                    <span>Call {CLINIC_CONFIG.formattedPhone}</span>
                  </a>
                </div>

                <p className="text-xs text-[#546462]/80 text-center pt-2">
                  Appointments are subject to clinic confirmation.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#E3E8E5] text-xs text-[#546462] flex items-center justify-between">
                <Link
                  href="/services"
                  className="text-[#155E59] font-semibold hover:underline inline-flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to All Services</span>
                </Link>
                <Link
                  href="/contact"
                  className="text-[#546462] hover:text-[#202A29] underline"
                >
                  Clinic Location
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="py-14 sm:py-18 bg-[#F8FAF8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-xl font-bold text-[#202A29] mb-6">
              Other Rehabilitation Treatments
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedServices.map((rel) => (
                <div
                  key={rel.slug}
                  className="bg-white rounded-2xl p-6 border border-[#E3E8E5] flex flex-col justify-between"
                >
                  <div>
                    <h4 className="font-bold text-[#202A29] mb-2">{rel.title}</h4>
                    <p className="text-xs text-[#546462] line-clamp-2 mb-4">{rel.description}</p>
                  </div>
                  <Link
                    href={`/services/${rel.slug}`}
                    className="text-xs font-semibold text-[#155E59] hover:underline inline-flex items-center gap-1"
                  >
                    <span>View Therapy Protocol</span>
                    <span>&rarr;</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
