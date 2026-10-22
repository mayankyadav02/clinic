import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Heart,
  ShieldAlert,
  ShieldCheck,
  AlertOctagon,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Phone,
  MessageSquare,
  Sparkles,
  Laptop,
  Footprints,
  Moon,
  Flame,
  ArrowRight,
  Stethoscope,
} from 'lucide-react';
import { CLINIC_CONFIG, getTelUrl, getWhatsAppUrl } from '@/lib/config/clinic';
import { getHealthyLivingArticles } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Healthy Life & Daily Care Guide — Physical Health & Self-Care',
  description:
    'Evidence-based health education for daily posture, movement breaks, common pain self-care cards, and emergency medical warning signs.',
};

export default async function HealthyLivingPage() {
  const cmsArticles = await getHealthyLivingArticles(true);
  const commonConditions = [
    {
      id: 'neck-screen-use',
      title: 'Neck Discomfort After Screen Use',
      subtitle: 'Commonly known as "Tech Neck" or postural cervical strain',
      whatYouNotice:
        'A dull ache at the base of the skull, tight shoulder blades, or stiffness when turning your head to check your blind spot after long hours on a laptop or smartphone.',
      lowRiskSteps: [
        'Take a 60-second micro-break every 30–45 minutes: look away at the horizon and perform gentle chin tucks.',
        'Elevate your laptop screen with books or a laptop stand so the top third of the monitor is at eye level.',
        'Support your forearms on the desk or armrests to remove downward gravitational pull on your neck muscles.',
      ],
      whatToAvoid: [
        'Do NOT aggressively crack or twist your neck to hear a popping sound.',
        'Do NOT force deep, painful stretches when muscles are in protective spasm.',
        'Avoid prolonged downward tilting of the head without back support.',
      ],
      whenToConsult:
        'If neck stiffness persists for more than 7–10 days, causes recurring tension headaches, or limits your ability to work comfortably.',
      warningSigns:
        'Tingling, numbness, or shooting electrical pain down the arm into your fingers; or sudden loss of grip strength. (Requires formal medical assessment).',
    },
    {
      id: 'back-sitting-discomfort',
      title: 'Mild Back Discomfort After Prolonged Sitting',
      subtitle: 'Postural lumbar strain and disc compression from static seating',
      whatYouNotice:
        'A heavy, tired ache across your lower back or stiffness when standing up straight after driving, commuting, or sitting through long meetings.',
      lowRiskSteps: [
        'Stand up every 45 minutes and do 5 gentle standing back extensions (hands on hips, arching backward gently).',
        'Place a small lumbar roll or rolled hand towel in the curve of your lower back to maintain natural lordosis.',
        'Take a brisk 10-minute walk after meals or work intervals to promote spinal disc hydration.',
      ],
      whatToAvoid: [
        'Do NOT stay seated in a slumped, rounded C-curve posture for hours without changing position.',
        'Do NOT perform heavy deadlifts or forward toe touches when your back feels locked or inflamed.',
        'Avoid prolonged bed rest; gentle walking is generally far superior to staying in bed.',
      ],
      whenToConsult:
        'If lower back stiffness recurs weekly, prevents normal walking, or makes bending to tie shoes difficult.',
      warningSigns:
        'Loss of bowel/bladder control, numbness around the groin/saddle area, or progressive leg weakness. (Seek IMMEDIATE emergency care).',
    },
    {
      id: 'delayed-muscle-soreness',
      title: 'Muscle Soreness After Unfamiliar Workout (DOMS)',
      subtitle: 'Delayed Onset Muscle Soreness following new physical loading',
      whatYouNotice:
        'Tender, achy muscles that feel stiff 24 to 48 hours after trying a new sport, hiking, or lifting unfamiliar weights. Usually symmetrical on both sides.',
      lowRiskSteps: [
        'Light, active movement: easy walking, gentle cycling, or swimming to increase muscular blood flow.',
        'Adequate hydration, balanced nutrition with protein, and 7–9 hours of quality sleep to fuel tissue repair.',
        'Gentle, pain-free active range of motion without ballistic bouncing.',
      ],
      whatToAvoid: [
        'Do NOT repeat the exact same high-intensity exercise that caused severe soreness until tissues settle.',
        'Do NOT take excessive over-the-counter painkillers without speaking with a doctor.',
        'Avoid aggressive deep-tissue bruising massage over acutely tender muscle bellies.',
      ],
      whenToConsult:
        'If severe soreness does not diminish after 5–7 days, or if you suspect a true muscle tear rather than normal soreness.',
      warningSigns:
        'Dark, cola-colored urine (potential rhabdomyolysis indicator) or localized extreme swelling with throbbing heat. (Requires immediate medical evaluation).',
    },
    {
      id: 'mild-muscle-strain',
      title: 'Mild Muscle Strain or Overstretch',
      subtitle: 'Grade 1 micro-fiber stretching from sudden exertion',
      whatYouNotice:
        'A sudden pinch, cramp, or localized tightness in the calf, hamstring, or groin during running, lifting, or hurried physical movement.',
      lowRiskSteps: [
        'Relative rest for the first 24–48 hours: reduce painful movements while keeping surrounding joints moving gently.',
        'Gentle compression bandage if comfortable to support the muscle and limit swelling.',
        'Gradual return to gentle walking once the sharp catch subsides.',
      ],
      whatToAvoid: [
        'Do NOT vigorously stretch an acutely strained muscle in the first 48 hours—this can widen torn fibers.',
        'Do NOT sprint, jump, or play sports until single-leg strength is fully verified without pain.',
        'Avoid applying direct high heat in the first 24 hours if acute inflammatory swelling is present.',
      ],
      whenToConsult:
        'If walking with normal stride is painful after 3 days, or if you feel a palpable knot or indentation in the muscle.',
      warningSigns:
        'Inability to bear any weight on the leg, sudden large black-and-blue hematoma, or an audible pop at the moment of injury.',
    },
    {
      id: 'knee-ordinary-movement',
      title: 'Knee Discomfort During Ordinary Movement',
      subtitle: 'Patellofemoral irritation or early joint stiffness',
      whatYouNotice:
        'A dull ache around or behind the kneecap when descending stairs, squatting to the floor, or getting up after sitting for a movie or car ride.',
      lowRiskSteps: [
        'Check your footwear: wear supportive, cushioned shoes rather than worn-out flat flip-flops for long walks.',
        'Strengthen your quadriceps and hip gluteal muscles with low-impact straight-leg raises and bridging.',
        'Step down stairs leading with your non-painful leg to reduce eccentric shear load on the sensitive knee.',
      ],
      whatToAvoid: [
        'Do NOT force deep squats with knees projecting far beyond your toes if it triggers sharp joint pain.',
        'Do NOT run on hard concrete surfaces while the knee is actively tender.',
        'Avoid sitting with knees bent tightly under your chair for prolonged intervals.',
      ],
      whenToConsult:
        'If knee discomfort persists for more than 2 weeks, prevents you from climbing stairs, or clicks with sharp pain.',
      warningSigns:
        'A hot, red, puffy swollen knee with fever (septic joint danger); or sudden knee locking where the leg cannot straighten. (Seek urgent medical evaluation).',
    },
    {
      id: 'shoulder-stiffness-reaching',
      title: 'Shoulder Stiffness & Reduced Reaching Range',
      subtitle: 'Subacromial impingement, rotator cuff strain, or early adhesive capsulitis',
      whatYouNotice:
        'Difficulty reaching behind your back to tuck in a shirt, pain when reaching into an overhead cupboard, or discomfort sleeping on that shoulder.',
      lowRiskSteps: [
        'Perform gentle pendulum swings: lean forward over a table and let your arm dangle relaxed, making small gentle circles.',
        'Use your opposite healthy arm to gently guide the stiff arm forward (passive assisted elevation).',
        'Place a pillow under your elbow when sleeping on your side to prevent the shoulder from sagging into compression.',
      ],
      whatToAvoid: [
        'Do NOT force overhead heavy lifting or throwing while the shoulder joint is pinching.',
        'Do NOT aggressively yank the arm upward through sharp shooting pain.',
        'Avoid completely immobilizing the arm in a sling unless specifically ordered by an orthopedic surgeon.',
      ],
      whenToConsult:
        'If shoulder stiffness makes dressing, combing hair, or sleeping difficult for more than 10–14 days.',
      warningSigns:
        'Sudden severe shoulder pain with chest tightness, shortness of breath, or sweating (can indicate cardiac emergency—call 112 immediately).',
    },
    {
      id: 'posture-alignment-awareness',
      title: 'General Posture & Daily Movement Awareness',
      subtitle: 'Preventing cumulative ergonomic strain across daily routines',
      whatYouNotice:
        'Feeling stiff, fatigued, or rounded by late afternoon. A tendency to slump forward with shoulders rolled in and head protruding.',
      lowRiskSteps: [
        'Adopt the &ldquo;Best Posture is the Next Posture&rdquo; rule: changing positions regularly is far better than freezing in one rigid pose.',
        'Perform the &ldquo;W-to-Y&rdquo; scapular squeeze twice a day: gently drawing shoulder blades down and back.',
        'Align your chair height so your hips are slightly higher than your knees and feet rest flat on the floor.',
      ],
      whatToAvoid: [
        'Do NOT rigidly brace yourself with extreme tension trying to maintain &ldquo;military posture&rdquo;—this causes secondary muscle spasms.',
        'Avoid looking down at mobile phones resting in your lap for hours; hold the phone closer to eye level.',
        'Do NOT sleep on an excessively high, stiff pillow that bends your neck sharply forward or sideways.',
      ],
      whenToConsult:
        'If postural fatigue turns into daily spinal aching, headaches, or tingling in the hands.',
      warningSigns:
        'Rapidly developing visible curve in the spine, difficulty breathing, or progressive loss of height with acute back pain.',
    },
  ];

  return (
    <div className="flex flex-col w-full bg-[#F8FAF8]">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#EEF5F1] to-[#F8FAF8] py-14 sm:py-20 border-b border-[#E3E8E5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-[#546462] mb-4">
            <Link href="/" className="hover:text-[#155E59] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#202A29] font-medium">Healthy Life & Daily Care</span>
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DDEBE4] text-[#155E59] text-xs font-semibold mb-4 border border-[#B9D5C8]/60">
              <Heart className="w-3.5 h-3.5" />
              <span>Evidence-Guided Patient Health Education</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#202A29] tracking-tight leading-tight">
              Healthy Living & Everyday Body Care
            </h1>
            <p className="text-base sm:text-lg text-[#546462] mt-4 leading-relaxed">
              Practical habits, low-risk self-care steps for common aches, and a clear guide on when to consult a
              physiotherapist versus when to seek immediate medical emergency care.
            </p>
          </div>
        </div>
      </section>

      {/* Part A: Healthy Daily Habits */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#E3E8E5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#155E59]">
              Everyday Wellness
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#202A29] mt-1 tracking-tight">
              Practical Habits for a Healthier, Pain-Free Body
            </h2>
            <p className="text-sm text-[#546462] mt-2">
              Small, consistent daily movement choices prevent cumulative musculoskeletal overload far better than occasional strenuous workouts:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="p-7 rounded-3xl bg-[#F8FAF8] border border-[#E3E8E5] shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#EEF5F1] text-[#155E59] flex items-center justify-center">
                <Laptop className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#202A29]">
                The 45-Minute Movement Rule
              </h3>
              <p className="text-xs sm:text-sm text-[#546462] leading-relaxed">
                Human spinal discs lack direct blood supply; they rely on gentle movement to absorb nutrients and stay hydrated. Set a quiet timer: stand up, roll your shoulders, and walk for 60 seconds every 45 minutes of desk work.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-[#F8FAF8] border border-[#E3E8E5] shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#EEF5F1] text-[#155E59] flex items-center justify-center">
                <Footprints className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#202A29]">
                Sustainable Daily Walking
              </h3>
              <p className="text-xs sm:text-sm text-[#546462] leading-relaxed">
                Walking is one of the most natural, joint-friendly activities. Aim for 20–30 minutes of comfortable brisk walking daily. It lubricates knee and hip cartilage, promotes pelvic stability, and eases lower back tension without harsh impact.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-[#F8FAF8] border border-[#E3E8E5] shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#EEF5F1] text-[#155E59] flex items-center justify-center">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#202A29]">
                Gradual Loading vs. Overload
              </h3>
              <p className="text-xs sm:text-sm text-[#546462] leading-relaxed">
                Tendons and ligaments adapt slower than muscles. Avoid &ldquo;weekend warrior syndrome&rdquo;—where you do nothing all week and play 3 hours of intense sports on Sunday. Progress exercise volume gradually by no more than 10% per week.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-[#F8FAF8] border border-[#E3E8E5] shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#EEF5F1] text-[#155E59] flex items-center justify-center">
                <Moon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#202A29]">
                Supported Sleep Posture
              </h3>
              <p className="text-xs sm:text-sm text-[#546462] leading-relaxed">
                If sleeping on your back, place a small pillow under your knees to ease lumbar tension. If sleeping on your side, place a pillow between your knees to keep your hips and spine neutrally aligned. Use a pillow that keeps your neck level.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-[#F8FAF8] border border-[#E3E8E5] shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#EEF5F1] text-[#155E59] flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#202A29]">
                Dynamic Pre-Activity Warm-Up
              </h3>
              <p className="text-xs sm:text-sm text-[#546462] leading-relaxed">
                Before gardening, heavy lifting, or exercising, spend 5 minutes doing active leg swings, arm circles, and gentle bodyweight squats. Warming up raises muscle temperature and reduces risk of sudden acute strains.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-[#F8FAF8] border border-[#E3E8E5] shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#EEF5F1] text-[#155E59] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#202A29]">
                Individualized Tolerance
              </h3>
              <p className="text-xs sm:text-sm text-[#546462] leading-relaxed">
                What is healthy movement for a 22-year-old athlete is different from a 65-year-old managing knee arthritis. Never compare your recovery or exercise capacity to others; work systematically within your comfortable therapeutic baseline.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Part B: Common Pain & Basic Self-Care Cards */}
      <section className="py-16 sm:py-20 bg-[#F8FAF8] border-b border-[#E3E8E5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#155E59]">
              Self-Care Guidelines
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#202A29] mt-1 tracking-tight">
              Common Pain & Discomfort: Practical Guidance
            </h2>
            <p className="text-sm sm:text-base text-[#546462] mt-2">
              Everyday aches often resolve with gentle, sensible management. Below are clear, structured guides for 7 common physical concerns:
            </p>
          </div>

          <div className="space-y-8">
            {commonConditions.map((item, idx) => (
              <div
                key={item.id}
                id={item.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E3E8E5] shadow-xs space-y-6 scroll-mt-24"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E3E8E5] pb-4">
                  <div>
                    <span className="text-xs font-bold text-[#155E59] uppercase tracking-wider">
                      Case Guide {idx + 1}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#202A29] mt-0.5">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#546462] mt-0.5">{item.subtitle}</p>
                  </div>

                  <a
                    href={getWhatsAppUrl(`Hello Dr. Suresh Yadav, I am reading about ${item.title} and would like to understand if an in-person assessment is recommended.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#155E59] hover:underline self-start sm:self-auto"
                  >
                    <span>Ask about this symptom</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* What you notice & Low risk steps */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs font-bold text-[#202A29] uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                        <HelpCircle className="w-4 h-4 text-[#155E59]" />
                        <span>What You Commonly Notice</span>
                      </h4>
                      <p className="text-xs sm:text-sm text-[#546462] leading-relaxed">
                        {item.whatYouNotice}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#F8FAF8] border border-[#E3E8E5] space-y-2">
                      <h4 className="text-xs font-bold text-[#155E59] uppercase tracking-wider flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-[#155E59]" />
                        <span>Low-Risk Steps That May Help</span>
                      </h4>
                      <ul className="space-y-2 text-xs text-[#202A29]">
                        {item.lowRiskSteps.map((step, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#155E59] mt-1.5 flex-shrink-0" />
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* What to avoid, when to consult & warning signs */}
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2">
                      <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                        <XCircle className="w-4 h-4 text-amber-700" />
                        <span>What to Avoid (Do Not Make Worse)</span>
                      </h4>
                      <ul className="space-y-1.5 text-xs text-amber-950/80">
                        {item.whatToAvoid.map((avoid, aIdx) => (
                          <li key={aIdx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 flex-shrink-0" />
                            <span>{avoid}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div>
                        <strong className="text-[#202A29]">When to Seek Assessment:</strong>{' '}
                        <span className="text-[#546462]">{item.whenToConsult}</span>
                      </div>
                      <div className="pt-2 border-t border-[#E3E8E5] text-red-800">
                        <strong className="font-bold">Medical Red Flag:</strong> {item.warningSigns}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Part B.2: Featured CMS Health Articles */}
      {cmsArticles && cmsArticles.length > 0 && (
        <section className="py-14 sm:py-18 bg-[#F8FAF8] border-b border-[#E3E8E5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#155E59]">
                Clinical Insights & Articles
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#202A29] mt-1 tracking-tight">
                Educational Health Articles
              </h2>
              <p className="text-sm text-[#546462] mt-2">
                Evidence-informed articles curated by our physiotherapy team on posture, loading progression, and ergonomic recovery.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cmsArticles.map((article) => (
                <div
                  key={article.id}
                  className="bg-white rounded-2xl p-6 border border-[#E3E8E5] shadow-xs hover:border-[#B9D5C8] transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#EEF5F1] text-[#155E59] text-xs font-semibold">
                      {article.category}
                    </span>
                    <h3 className="text-lg font-bold text-[#202A29] leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#546462] leading-relaxed">
                      {article.summary}
                    </p>
                    <div className="p-3.5 rounded-xl bg-[#F8FAF8] border border-[#E3E8E5]/70 text-xs text-[#202A29] leading-relaxed">
                      {article.content}
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-[#E3E8E5] flex items-center justify-between text-xs text-[#546462]">
                    <span>Dr. Suresh Yadav Guidance</span>
                    <span className="text-[#155E59] font-semibold">Evidence-Based</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Part C: Emergency Warning Signs Guide (Priority 5) */}
      <section id="warning-signs" className="py-16 sm:py-24 bg-white border-b border-[#E3E8E5] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100 text-red-800 text-xs font-bold mb-3">
              <ShieldAlert className="w-4 h-4" />
              <span>Crucial Patient Safety Standard</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#202A29] tracking-tight">
              Warning Signs: When to Get Medical Help Immediately
            </h2>
            <p className="text-sm sm:text-base text-[#546462] mt-3 leading-relaxed">
              Physiotherapy is designed for musculoskeletal, joint, and functional rehabilitation.
              It is <strong>NOT</strong> an alternative to emergency medical care. If you or a loved one experience any of the warning signs below, do not wait for a therapy appointment.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Box 1: Immediate Emergency (Call 112) */}
            <div className="p-8 rounded-3xl bg-red-50 border-2 border-red-200 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center flex-shrink-0">
                  <AlertOctagon className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-red-900">
                    Seek Emergency Care Immediately (Call 112)
                  </h3>
                  <p className="text-xs text-red-700">
                    Go to the nearest hospital emergency room or dial emergency services immediately for:
                  </p>
                </div>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-red-950">
                <li className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-red-600 mt-1.5 flex-shrink-0" />
                  <span><strong>Possible Stroke (FAST):</strong> Sudden facial drooping, arm weakness or numbness on one side, difficulty speaking, confusion, or sudden loss of vision.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-red-600 mt-1.5 flex-shrink-0" />
                  <span><strong>Suspected Heart Attack:</strong> Heavy chest pressure, tight squeezing pain spreading to the left arm, jaw, shoulder, or back, accompanied by breathlessness, sweating, or cold clamminess.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-red-600 mt-1.5 flex-shrink-0" />
                  <span><strong>Cauda Equina Syndrome:</strong> New loss of bladder or bowel control, difficulty passing urine, or numbness around the saddle/groin/inner thighs, particularly with acute back pain.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-red-600 mt-1.5 flex-shrink-0" />
                  <span><strong>Major Traumatic Injury:</strong> Severe trauma, uncontrolled bleeding, visible bone deformity, or suspected high-impact spinal fracture.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-red-600 mt-1.5 flex-shrink-0" />
                  <span><strong>Severe Respiratory Distress:</strong> Severe shortness of breath, collapse, fainting, or sudden loss of consciousness.</span>
                </li>
              </ul>

              <div className="p-4 rounded-xl bg-red-100/80 text-xs text-red-900 font-medium">
                National Emergency Number in India: <strong className="text-base text-red-700 font-bold ml-1">112</strong>
              </div>
            </div>

            {/* Box 2: Urgent Same-Day Doctor Assessment */}
            <div className="p-8 rounded-3xl bg-amber-50 border-2 border-amber-200 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center flex-shrink-0">
                  <Stethoscope className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-amber-950">
                    Get Urgent Same-Day Medical Assessment
                  </h3>
                  <p className="text-xs text-amber-800">
                    Consult a qualified physician or orthopedic surgeon promptly for:
                  </p>
                </div>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-amber-950">
                <li className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-amber-600 mt-1.5 flex-shrink-0" />
                  <span><strong>Hot, Red, Infected Joint:</strong> A joint that suddenly becomes hot to the touch, bright red, rapidly swollen, accompanied by fever, chills, or feeling physically unwell (suspected septic arthritis).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-amber-600 mt-1.5 flex-shrink-0" />
                  <span><strong>Inability to Bear Any Weight:</strong> Complete inability to take 4 steps on the injured leg after an acute twist, fall, or impact (suspected ligament tear or fracture).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-amber-600 mt-1.5 flex-shrink-0" />
                  <span><strong>Progressive Neurological Deficits:</strong> Rapidly worsening muscle weakness, foot drop (foot catching on carpet while walking), or spreading loss of sensation in legs/arms.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-amber-600 mt-1.5 flex-shrink-0" />
                  <span><strong>Unexplained Severe Pain:</strong> Constant deep throbbing pain that does not change with position, wakes you up sweating every night, accompanied by unexplained rapid weight loss.</span>
                </li>
              </ul>

              <div className="p-4 rounded-xl bg-amber-100/80 text-xs text-amber-900 font-medium">
                <strong>Crucial Clinical Rule:</strong> Never tell someone with potential emergency symptoms to wait for a physiotherapy session, perform stretches, massage the area, or use heat packs.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Part D: Consultation Banner */}
      <section className="py-14 sm:py-18 bg-[#F8FAF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-[#E3E8E5] p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#155E59]">
                Consultation Enquiries
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#202A29] mt-1">
                Need guidance on a non-emergency ache or recovery?
              </h3>
              <p className="text-xs sm:text-sm text-[#546462] mt-1 max-w-xl">
                Dr. Suresh Yadav provides thorough, unhurried physical evaluations at Shri Krishna Physiotherapy Clinic.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={getWhatsAppUrl('Hello Dr. Suresh Yadav, I am reading the Healthy Living guide and would like to ask about my symptoms.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-white bg-[#155E59] hover:bg-[#0F4541] shadow-xs transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-[#DDEBE4]" />
                <span>WhatsApp Enquiry</span>
              </a>

              <a
                href={getTelUrl()}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-[#202A29] bg-[#F8FAF8] border border-[#E3E8E5] hover:bg-[#EEF5F1] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#155E59]" />
                <span>Call {CLINIC_CONFIG.formattedPhone}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
