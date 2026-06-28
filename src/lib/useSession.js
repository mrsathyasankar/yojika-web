/* Yojika — auth session hook, shared by the header and the account page.
 * Returns { session, loading }. Subscribes to auth changes so the UI flips
 * between "Log in" and "Account" the moment a user signs in or out, without a
 * page reload. */
import React from 'react';
import { supabase } from './supabase.js';

export function useSession() {
  const [session, setSession] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let alive = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!alive) return;
      setSession(data.session);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      if (alive) setSession(s);
    });
    return () => {
      alive = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return { session, loading };
}
