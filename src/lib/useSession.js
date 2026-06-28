/* Yojika — auth session hook, shared by the header and the account page.
 * Returns { session, loading }. Subscribes to auth changes so the UI flips
 * between "Log in" and "Account" the moment a user signs in or out, without a
 * page reload.
 *
 * Resilient by design: the header uses this on EVERY page, so a missing/broken
 * Supabase config must degrade to "logged out" — never throw and take the whole
 * header island down with it. */
import React from 'react';
import { supabase, isSupabaseConfigured } from './supabase.js';

export function useSession() {
  const [session, setSession] = React.useState(null);
  // If auth isn't configured there's nothing to load — start resolved so the
  // header renders its logged-out state immediately, with no flash.
  const [loading, setLoading] = React.useState(isSupabaseConfigured);

  React.useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    let alive = true;
    let subscription;
    try {
      supabase.auth
        .getSession()
        .then(({ data }) => {
          if (!alive) return;
          setSession(data.session);
          setLoading(false);
        })
        .catch(() => {
          if (alive) setLoading(false);
        });
      const { data } = supabase.auth.onAuthStateChange((_event, s) => {
        if (alive) setSession(s);
      });
      subscription = data?.subscription;
    } catch (_) {
      // Client unavailable — degrade to logged-out rather than crash the island.
      if (alive) setLoading(false);
    }

    return () => {
      alive = false;
      try {
        subscription?.unsubscribe();
      } catch (_) {
        /* noop */
      }
    };
  }, []);

  return { session, loading };
}
