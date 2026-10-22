import { createBrowserClient } from '@supabase/ssr';
import { env } from '../env';

export function createClient() {
  // Return a dummy client during build if env vars are not set
  if (!env.NEXT_PUBLIC_SUPABASE_URL || !env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    if (typeof window === 'undefined') {
      // During build, return a minimal client that won't crash
      return createBrowserClient('https://placeholder.supabase.co', 'placeholder-key');
    }
  }
  return createBrowserClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}
