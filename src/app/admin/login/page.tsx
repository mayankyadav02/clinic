'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, ArrowLeft, ShieldCheck, Eye, AlertCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { CLINIC_CONFIG } from '@/lib/config/clinic';
import { ClinicLogo } from '@/components/common/ClinicLogo';

export const dynamic = 'force-dynamic';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
        return;
      }

      if (data.user) {
        const { data: adminData, error: adminError } = await supabase
          .from('admin_users')
          .select('id')
          .eq('id', data.user.id)
          .single();

        if (adminError || !adminData) {
          await supabase.auth.signOut();
          setError('Access restricted. Your account is not authorized as an administrator.');
          return;
        }

        router.push('/admin');
        router.refresh();
      }
    } catch {
      setError('An unexpected error occurred connecting to authentication services.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-[#F8FAF8] py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#155E59] hover:underline mb-6 mx-auto block text-center"
        >
          <ArrowLeft className="w-3.5 h-3.5 inline" />
          <span>Return to public website</span>
        </Link>

        <div className="flex justify-center mb-2">
          <ClinicLogo size="lg" theme="light" showText={false} />
        </div>

        <h2 className="mt-4 text-center text-2xl sm:text-3xl font-extrabold text-[#202A29] tracking-tight">
          Admin Portal Login
        </h2>
        <p className="mt-1 text-center text-xs text-[#546462]">
          {CLINIC_CONFIG.name} • Dr. Suresh Yadav
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-2xl border border-[#E3E8E5] shadow-sm space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-xs font-bold text-[#202A29] mb-1">
                Admin Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@shrikrishnaphysio.example"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3E8E5] text-sm text-[#202A29] focus:outline-none focus:ring-2 focus:ring-[#155E59]"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-bold text-[#202A29] mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3E8E5] text-sm text-[#202A29] focus:outline-none focus:ring-2 focus:ring-[#155E59]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#155E59] hover:bg-[#0F4541] shadow-xs transition-colors disabled:opacity-50"
            >
              <Lock className="w-4 h-4 text-[#DDEBE4]" />
              <span>{loading ? 'Authenticating...' : 'Sign In to Management Portal'}</span>
            </button>
          </form>

          {/* Dev / Reviewer Preview Option */}
          <div className="pt-4 border-t border-[#E3E8E5] space-y-3">
            <div className="text-center">
              <span className="text-xs text-[#546462]">Development / Review Mode:</span>
            </div>
            <Link
              href="/admin?preview=demo"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold text-[#155E59] bg-[#EEF5F1] hover:bg-[#DDEBE4] border border-[#B9D5C8] transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview Admin CMS (Interactive Demo)</span>
            </Link>
          </div>

          <div className="text-center text-[11px] text-[#546462]/80 space-y-1">
            <div className="flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#155E59]" />
              <span>Protected by Supabase Auth & PostgreSQL Row Level Security</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
