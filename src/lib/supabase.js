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
 *
 * The client is created LAZILY, on first use. Astro server-renders these React
 * islands during the static build (the header in Base.astro imports this on every
 * page), so a top-level createClient() would run on the server too — and break the
 * build: it throws on missing env, and supabase-js's realtime client needs Node
 * >=22. Deferring construction to first property access keeps importing this module
 * side-effect-free during SSR; the client only ever materialises in the browser
 * (inside effects / event handlers), never at build time.
 */
import { createClient } from '@supabase/supabase-js';

// Public Supabase config. The project URL and the publishable/anon key are PUBLIC
// by design — they ship in the browser bundle and Row-Level Security is what
// protects the data — so we commit them as the source of truth. This avoids the
// Cloudflare Pages footgun where dashboard "Variables and secrets" apply only to
// the Functions runtime, not the static Astro build, leaving PUBLIC_* undefined at
// build time. A build-time import.meta.env.PUBLIC_* still overrides these (e.g. to
// point a fork at a different project).
const url = import.meta.env.PUBLIC_SUPABASE_URL || 'https://izbwcvhpgxzotmorduxo.supabase.co';
const anon = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_rAM1MqAsCFXte4H_GJN8Zg_X7wsepVx';

// Always configured now that the values are committed. Kept as an export so callers
// (useSession, the auth pages) can stay defensive without special-casing.
export const isSupabaseConfigured = Boolean(url && anon);

let _client = null;

function getClient() {
  if (_client) return _client;
  _client = createClient(url, anon, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: false,
      flowType: 'pkce',
    },
  });
  return _client;
}

// Lazy facade: importing `supabase` does nothing until a property is accessed,
// which only happens in browser-side code. Keeps the static build from ever
// constructing the client on the server.
export const supabase = new Proxy({}, {
  get(_target, prop) {
    const client = getClient();
    const value = client[prop];
    return typeof value === 'function' ? value.bind(client) : value;
  },
});
