/* Yojika — customer account dashboard. Shows the licences and payments tied to the
 * logged-in email. All reads run under Supabase RLS (migration 0002): the user only
 * ever gets their own rows, even though this page's HTML is publicly served. */
import React from 'react';
import { Container, Reveal, Eyebrow, Card, Button } from '../ui.jsx';
import { Shield, Wallet, Lock, CheckCircle, Tag } from '../icons.jsx';
import { supabase } from '../../lib/supabase.js';
import { useSession } from '../../lib/useSession.js';
import { rupees, dmy } from '../../lib/format.js';
import BetaLicenceForm from './BetaLicenceForm.jsx';

const STATUS = {
  active: { label: 'Active', cls: 'text-ok bg-ok/12' },
  expired: { label: 'Expired', cls: 'text-amber bg-amber-soft/70' },
  revoked: { label: 'Revoked', cls: 'text-err bg-err/12' },
};

const StatusPill = ({ status }) => {
  const s = STATUS[status] || { label: status || 'Unknown', cls: 'text-ink-500 bg-ink-900/8' };
  return (
    <span className={'inline-flex items-center rounded-full px-2.5 py-0.5 text-[12px] font-mono font-medium uppercase tracking-wide ' + s.cls}>
      {s.label}
    </span>
  );
};

const deviceCount = (lic) => lic?.activations?.[0]?.count ?? 0;

const LicenceCard = ({ lic }) => (
  <Card className="p-5 sm:p-6">
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-[12px] uppercase tracking-[0.13em] text-ink-400 font-mono">Licence key</p>
        <p className="mt-1 font-num text-[18px] font-semibold text-ink-900 break-all">{lic.license_key}</p>
      </div>
      <StatusPill status={lic.status} />
    </div>
    <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-y-4 gap-x-3 text-[14px]">
      <div>
        <p className="text-[12px] text-ink-400">Plan</p>
        <p className="mt-0.5 font-medium text-ink-900 capitalize">{lic.plan}</p>
      </div>
      <div>
        <p className="text-[12px] text-ink-400">Issued</p>
        <p className="mt-0.5 font-num text-ink-900">{dmy(lic.issued_at)}</p>
      </div>
      <div>
        <p className="text-[12px] text-ink-400">Renews / expires</p>
        <p className="mt-0.5 font-num text-ink-900">{dmy(lic.expires_at)}</p>
      </div>
      <div>
        <p className="text-[12px] text-ink-400">Devices</p>
        <p className="mt-0.5 font-num text-ink-900">{deviceCount(lic)} of 1</p>
      </div>
    </div>
  </Card>
);

const AccountPage = () => {
  const { session, loading } = useSession();
  const [licences, setLicences] = React.useState(null);
  const [payments, setPayments] = React.useState(null);
  const [err, setErr] = React.useState('');

  const load = React.useCallback(async () => {
    const [{ data: lic, error: e1 }, { data: pay, error: e2 }] = await Promise.all([
      supabase
        .from('licenses')
        .select('id, license_key, plan, status, issued_at, expires_at, grace_period_until, activations(count)')
        .order('issued_at', { ascending: false }),
      supabase
        .from('payments')
        .select('created_at, amount_paise, currency, status, razorpay_payment_id')
        .order('created_at', { ascending: false }),
    ]);
    if (e1 || e2) setErr('We could not load your account just now. Please refresh.');
    setLicences(lic || []);
    setPayments(pay || []);
  }, []);

  React.useEffect(() => {
    if (loading) return;
    if (!session) { window.location.replace('/login'); return; }
    load();
  }, [loading, session, load]);

  const signOut = async () => {
    await supabase.auth.signOut();
    window.location.replace('/');
  };

  const ready = !loading && session && licences !== null;
  const email = session?.user?.email;
  const hasActive = (licences || []).some((l) => l.status === 'active');

  return (
    <section className="pt-12 pb-16 sm:pt-14">
      <Container wide>
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow icon={<Shield size={14} />}>Your account</Eyebrow>
            <h1 className="mt-4 text-[30px] sm:text-[36px] leading-[1.08] font-semibold tracking-tight text-ink-900">
              Licences &amp; billing
            </h1>
            {email && <p className="mt-2 text-[15px] text-ink-500 font-num">{email}</p>}
          </div>
          <Button onClick={signOut} variant="secondary" size="sm">Sign out</Button>
        </Reveal>

        {!ready ? (
          <div className="mt-10 grid place-items-center py-16 text-ink-400">
            <span className="animate-pulse text-[15px]">Loading your account…</span>
          </div>
        ) : (
          <div className="mt-9 grid lg:grid-cols-[1.5fr_1fr] gap-8">
            {/* Licences */}
            <Reveal className="space-y-4">
              <div className="flex items-center gap-2 text-ink-700">
                <Lock size={18} className="text-brand-deep" />
                <h2 className="text-[15px] font-semibold uppercase tracking-[0.1em] font-mono">Licences</h2>
              </div>
              {err && <p className="text-[14px] text-err">{err}</p>}
              {licences.length === 0 ? (
                <div className="space-y-4">
                  <Card className="p-6 sm:p-7">
                    <div className="flex items-start gap-3.5">
                      <span className="shrink-0 grid place-items-center w-11 h-11 rounded-btn bg-brand-container/70 text-brand-deep">
                        <Tag size={22} />
                      </span>
                      <div>
                        <h3 className="text-[17px] font-semibold text-ink-900">No licence on this account yet</h3>
                        <p className="mt-1 text-[14.5px] text-ink-500">
                          Yojika is in beta — get the full app free for 3 months. Add a few details below and your
                          key is issued instantly (we email it too), then it shows up here.
                        </p>
                      </div>
                    </div>
                  </Card>
                  {/* Email is already verified on this page, so the form goes
                      straight to collecting the shop profile. */}
                  <BetaLicenceForm onIssued={load} />
                </div>
              ) : (
                <>
                  {!hasActive && (
                    <Card className="p-5 sm:p-6 ring-amber/30 bg-amber-soft/20">
                      <p className="text-[15px] font-medium text-ink-900">Your licence isn’t active</p>
                      <p className="mt-1 text-[14px] text-ink-500">During the beta you can get a fresh 3-month licence, free.</p>
                      <div className="mt-4"><Button to="/pricing" variant="primary" size="sm">Get a beta licence</Button></div>
                    </Card>
                  )}
                  {licences.map((lic) => <LicenceCard key={lic.id} lic={lic} />)}
                </>
              )}
            </Reveal>

            {/* Payments */}
            <Reveal delay={90} className="space-y-4">
              <div className="flex items-center gap-2 text-ink-700">
                <Wallet size={18} className="text-brand-deep" />
                <h2 className="text-[15px] font-semibold uppercase tracking-[0.1em] font-mono">Payment history</h2>
              </div>
              {payments.length === 0 ? (
                <Card className="p-6">
                  <p className="text-[14.5px] text-ink-500">No payments recorded yet.</p>
                </Card>
              ) : (
                <Card className="divide-y divide-ink-900/8">
                  {payments.map((p) => (
                    <div key={p.razorpay_payment_id || p.created_at} className="flex items-center justify-between gap-3 px-5 py-3.5">
                      <div>
                        <p className="font-num text-[15px] font-medium text-ink-900">{rupees(p.amount_paise)}</p>
                        <p className="text-[12.5px] text-ink-400 font-num">{dmy(p.created_at)}</p>
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-[12.5px] text-ink-500 capitalize">
                        {(p.status === 'captured' || p.status === 'paid') && <CheckCircle size={15} className="text-ok" />}
                        {p.status}
                      </span>
                    </div>
                  ))}
                </Card>
              )}
            </Reveal>
          </div>
        )}
      </Container>
    </section>
  );
};

export default AccountPage;
