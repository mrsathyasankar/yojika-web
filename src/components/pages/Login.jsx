/* Yojika — passwordless login. Enter email → we send a magic link + 6-digit code.
 * The user can click the link (lands on /auth/callback) or type the code here.
 * No passwords: owning the inbox is the credential, which matches the product's
 * "email is the customer identity" model. */
import React from 'react';
import { Container, Reveal, Eyebrow, Card, Button } from '../ui.jsx';
import { Mail, Lock, ArrowRight, CheckCircle } from '../icons.jsx';
import { supabase } from '../../lib/supabase.js';
import { useSession } from '../../lib/useSession.js';

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const inputCls =
  'w-full rounded-btn bg-white ring-1 ring-ink-900/15 px-3.5 py-3 text-[15px] text-ink-900 ' +
  'placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-brand transition';

const LoginPage = () => {
  const { session, loading } = useSession();
  const [email, setEmail] = React.useState('');
  const [code, setCode] = React.useState('');
  const [step, setStep] = React.useState('email'); // 'email' | 'sent'
  const [busy, setBusy] = React.useState(false);
  const [err, setErr] = React.useState('');

  // Already signed in → straight to the dashboard.
  React.useEffect(() => {
    if (!loading && session) window.location.replace('/account');
  }, [loading, session]);

  const send = async (e) => {
    e?.preventDefault();
    if (!EMAIL_RE.test(email)) { setErr('Enter a valid email address.'); return; }
    setErr(''); setBusy(true);
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: {
        emailRedirectTo: window.location.origin + '/auth/callback',
        shouldCreateUser: true,
      },
    });
    setBusy(false);
    if (error) { setErr(error.message || 'Could not send the email. Try again in a moment.'); return; }
    setStep('sent');
  };

  const verify = async (e) => {
    e.preventDefault();
    const token = code.replace(/\s+/g, '');
    if (token.length < 6) { setErr('Enter the 6-digit code from your email.'); return; }
    setErr(''); setBusy(true);
    const { error } = await supabase.auth.verifyOtp({
      email: email.trim().toLowerCase(),
      token,
      type: 'email',
    });
    setBusy(false);
    if (error) { setErr('That code is invalid or has expired. Request a new one.'); return; }
    window.location.replace('/account');
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-16 sm:pt-16">
      <div className="absolute -top-24 right-0 -z-10 h-[360px] w-[360px] rounded-full bg-brand-light/20 blur-3xl" />
      <Container>
        <div className="max-w-md mx-auto">
          <Reveal className="text-center">
            <Eyebrow icon={<Lock size={14} />}>Account</Eyebrow>
            <h1 className="mt-4 text-[32px] sm:text-[38px] leading-[1.08] font-semibold tracking-tight text-ink-900">
              Sign in to Yojika
            </h1>
            <p className="mt-3.5 text-[16px] leading-relaxed text-ink-500">
              No password. We email you a secure link and a 6-digit code — use whichever is easier.
            </p>
          </Reveal>

          <Reveal delay={90} className="mt-8">
            <Card className="p-6 sm:p-7">
              {step === 'email' ? (
                <form onSubmit={send} noValidate className="space-y-4">
                  <label className="block">
                    <span className="block text-[13.5px] font-medium text-ink-700 mb-1.5">Email address</span>
                    <input
                      type="email" value={email} autoFocus autoComplete="email"
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@shop.in" aria-label="Email address"
                      className={inputCls + ' font-num'} />
                  </label>
                  {err && <p className="text-[13px] text-err">{err}</p>}
                  <Button type="submit" variant="primary" size="lg" disabled={busy}
                    className="w-full" iconRight={<ArrowRight size={18} />}>
                    {busy ? 'Sending…' : 'Email me a sign-in link'}
                  </Button>
                  <p className="text-[12.5px] text-ink-400 text-center">
                    New here? The same link creates your account.
                  </p>
                </form>
              ) : (
                <form onSubmit={verify} noValidate className="space-y-4">
                  <div className="flex items-center gap-3 rounded-btn bg-brand-container/70 text-brand-deep px-4 py-3">
                    <CheckCircle size={20} className="shrink-0 text-ok" />
                    <p className="text-[14px]">
                      We emailed <span className="font-num font-medium">{email}</span>. Click the link, or enter the code below.
                    </p>
                  </div>
                  <label className="block">
                    <span className="block text-[13.5px] font-medium text-ink-700 mb-1.5">6-digit code</span>
                    <input
                      inputMode="numeric" autoFocus value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="123456" aria-label="6-digit code"
                      maxLength={6}
                      className={inputCls + ' font-num tracking-[0.4em] text-center text-lg'} />
                  </label>
                  {err && <p className="text-[13px] text-err">{err}</p>}
                  <Button type="submit" variant="primary" size="lg" disabled={busy} className="w-full">
                    {busy ? 'Verifying…' : 'Verify & continue'}
                  </Button>
                  <button type="button" onClick={() => { setStep('email'); setCode(''); setErr(''); }}
                    className="block w-full text-center text-[13px] text-ink-500 hover:text-ink-900 transition">
                    Use a different email
                  </button>
                </form>
              )}
            </Card>
            <p className="mt-5 text-center text-[13px] text-ink-400">
              Trouble signing in? <a href="mailto:support@yojika.in" className="text-brand-deep font-num">support@yojika.in</a>
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
};

export default LoginPage;
