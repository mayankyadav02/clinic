import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { TopContactStrip } from '@/components/layout/TopContactStrip';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileBottomBar } from '@/components/layout/MobileBottomBar';
import { CLINIC_CONFIG } from '@/lib/config/clinic';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#155E59',
};

export const metadata: Metadata = {
  title: {
    default: `${CLINIC_CONFIG.name} — ${CLINIC_CONFIG.doctorName}`,
    template: `%s | ${CLINIC_CONFIG.name}`,
  },
  description: `Professional physiotherapy, sports injury rehabilitation, post-surgical care, and pain management by ${CLINIC_CONFIG.doctorName} at ${CLINIC_CONFIG.name}.`,
  keywords: [
    'Physiotherapy Clinic',
    'Dr. Suresh Yadav',
    'Shri Krishna Physiotherapy Clinic',
    'Sports Injury Rehabilitation',
    'Orthopedic Physiotherapy',
    'Pain Management',
    'Back Pain Therapy',
  ],
  authors: [{ name: CLINIC_CONFIG.doctorName }],
  openGraph: {
    title: `${CLINIC_CONFIG.name} — ${CLINIC_CONFIG.doctorName}`,
    description: `Expert physical therapy and rehabilitation care by ${CLINIC_CONFIG.doctorName}. Restore mobility, relieve pain, and rebuild functional strength.`,
    type: 'website',
    locale: 'en_IN',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F8FAF8] text-[#202A29]">
        <TopContactStrip />
        <Header />
        <main className="flex-1 pb-16 sm:pb-0">{children}</main>
        <Footer />
        <MobileBottomBar />
      </body>
    </html>
  );
}
