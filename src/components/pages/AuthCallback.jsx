/* Yojika — magic-link landing page. Exchanges the ?code in the URL for a session,
 * then forwards to /account. Only the click-the-link flow reaches here; the
 * type-the-code flow resolves on /login itself. */
import React from 'react';
import { Container, Card, Button } from '../ui.jsx';
import { CheckCircle, Close } from '../icons.jsx';
import { supabase } from '../../lib/supabase.js';

const AuthCallback = () => {
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    let alive = true;
    (async () => {
      const { error } = await supabase.auth.exchangeCodeForSession(window.location.href);
      if (!alive) return;
      if (error) { setFailed(true); return; }
      window.location.replace('/account');
    })();
    return () => { alive = false; };
  }, []);

  return (
    <section className="pt-16 pb-20">
      <Container>
        <div className="max-w-md mx-auto">
          <Card className="p-8 text-center">
            {failed ? (
              <>
                <span className="grid place-items-center w-14 h-14 rounded-full bg-err/12 text-err mx-auto">
                  <Close size={28} />
                </span>
                <h1 className="mt-4 text-[20px] font-semibold text-ink-900">This link has expired</h1>
                <p className="mt-2 text-[15px] text-ink-500">
                  Sign-in links can only be used once and time out quickly. Request a fresh one.
                </p>
                <Button to="/login" variant="primary" size="lg" className="mt-5">Back to sign in</Button>
              </>
            ) : (
              <>
                <span className="grid place-items-center w-14 h-14 rounded-full bg-brand-container/70 text-brand-deep mx-auto animate-pulse">
                  <CheckCircle size={28} />
                </span>
                <h1 className="mt-4 text-[20px] font-semibold text-ink-900">Signing you in…</h1>
                <p className="mt-2 text-[15px] text-ink-500">One moment while we confirm your link.</p>
              </>
            )}
          </Card>
        </div>
      </Container>
    </section>
  );
};

export default AuthCallback;
