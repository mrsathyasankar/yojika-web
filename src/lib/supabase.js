/* Yojika — single browser Supabase client for the customer portal.
 *
 * Used only for: passwordless auth (magic link / email OTP) and reading the
 * logged-in customer's own licences/payments under RLS. No writes happen here —
 * purchases go through the `create-order` Edge Function and the Razorpay webhook.
 *
 * Each Astro page is a full document load (this is a multi-page site, not a SPA),
 * so the session must survive navigation: persistSession keeps it in localStorage
 * and every island rehydrates it via supabase.auth.getSession() on mount.
 * detectSessionInUrl is off because we exchange the magic-link code explicitly on
 * /auth/callback.
 */
import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.PUBLIC_SUPABASE_URL;
const anon = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!url || !anon) {
  // Surfaces a clear message during dev/build if the env vars are missing.
  console.error('Missing PUBLIC_SUPABASE_URL / PUBLIC_SUPABASE_ANON_KEY — see .env.example');
}

export const supabase = createClient(url, anon, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
    flowType: 'pkce',
  },
});
