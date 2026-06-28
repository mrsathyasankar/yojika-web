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

const url = import.meta.env.PUBLIC_SUPABASE_URL;
const anon = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

// True only when both public keys are present. When false the portal (login /
// account / checkout) is disabled, but the REST of the static site must still
// render — including the header, which imports this module on every page.
export const isSupabaseConfigured = Boolean(url && anon);

let _client = null;

function getClient() {
  if (_client) return _client;
  if (!isSupabaseConfigured) {
    console.error(
      'Missing PUBLIC_SUPABASE_URL / PUBLIC_SUPABASE_ANON_KEY — login & account are ' +
        'disabled until these are set in the Cloudflare Pages environment. See .env.example',
    );
  }
  // Fall back to a syntactically-valid placeholder so createClient never throws
  // (it rejects empty/invalid URLs, which would crash the header island on every
  // page). With no real backend, getSession() simply resolves to "logged out".
  _client = createClient(
    url || 'https://placeholder.supabase.co',
    anon || 'placeholder-anon-key',
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false,
        flowType: 'pkce',
      },
    },
  );
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
