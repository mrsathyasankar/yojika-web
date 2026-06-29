/* Yojika — free 3-month beta licence registration (replaces the old waitlist).
 *
 * During the beta, pricing isn't published. A shop owner verifies their email
 * (the existing passwordless OTP login), then submits a short profile and gets a
 * 3-month licence — the key is emailed and shows up on /account. The licence is
 * bound server-side to the VERIFIED JWT email, so this form never sends the email
 * itself; it only collects the profile the request-beta-licence function stores.
 *
 * Auth-gated like Account.jsx: if the visitor isn't signed in we send them to
 * /login (which returns here after verifying) rather than minting against an
 * unverified address. */
import React from 'react';
import { Card, Field, Button } from '../ui.jsx';
import { CheckCircle, ArrowRight, Lock, Shield } from '../icons.jsx';
import { supabase } from '../../lib/supabase.js';
import { useSession } from '../../lib/useSession.js';

// Kept in lockstep with the server's canonical lists in
// backend/supabase/functions/request-beta-licence/_lib.ts — the function
// re-validates, so these must match exactly. 28 states + 8 union territories.
const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa',
  'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',
  'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
  'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Jammu and Kashmir',
  'Ladakh', 'Lakshadweep', 'Puducherry',
];

const BUSINESS_TYPES = [
  'Kirana / Grocery', 'Pharmacy', 'Restaurant / Cafe', 'Apparel', 'Electronics',
  'Hardware', 'Wholesale / Distributor', 'Services', 'Other',
];

// 10-digit Indian mobile, after stripping spaces/dashes (server normalizes too).
const phoneOk = (v) => /^[6-9]\d{9}$/.test(v.replace(/\D/g, ''));

const BetaLicenceForm = ({ onIssued }) => {
  const { session, loading } = useSession();
  const [data, setData] = React.useState({ name: '', phone: '', state: '', business_type: '' });
  const [errs, setErrs] = React.useState({});
  const [busy, setBusy] = React.useState(false);
  const [issued, setIssued] = React.useState(null); // { license_key, alreadyIssued }
  const set = (k) => (e) => setData((d) => ({ ...d, [k]: e.target.value }));

  const email = session?.user?.email;

  const submit = async (e) => {
    e.preventDefault();
    const next = {};
    if (!data.name.trim()) next.name = 'Please tell us your name.';
    if (!phoneOk(data.phone)) next.phone = 'Enter a valid 10-digit mobile number.';
    if (!data.state) next.state = 'Choose your state.';
    if (!data.business_type) next.business_type = 'Choose your business type.';
    setErrs(next);
    if (Object.keys(next).length) return;

    setBusy(true);
    try {
      const { data: { session: s } } = await supabase.auth.getSession();
      if (!s) { window.location.replace('/login'); return; }
      const resp = await fetch(`${import.meta.env.PUBLIC_SUPABASE_URL}/functions/v1/request-beta-licence`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${s.access_token}`,
          apikey: import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name.trim(),
          phone: data.phone.replace(/\D/g, ''),
          state: data.state,
          business_type: data.business_type,
        }),
      });
      const body = await resp.json();
      if (!resp.ok) throw new Error(body?.error || 'Could not issue your licence. Please try again.');
      setIssued(body);
      // Let an embedding page (e.g. the account dashboard) refresh so the new
      // licence card appears. On the standalone /pricing page there's no callback,
      // so the success card below is shown instead.
      onIssued?.(body);
    } catch (err) {
      setErrs({ form: err?.message || 'Something went wrong. Please try again.' });
    } finally {
      setBusy(false);
    }
  };

  // While the session resolves, hold the layout so we don't flash the form then
  // bounce to login.
  if (loading) {
    return (
      <Card className="p-8 text-center">
        <span className="animate-pulse text-[15px] text-ink-400">Loading…</span>
      </Card>
    );
  }

  // Not signed in → verify email first (same trust model as the account portal).
  if (!session) {
    return (
      <Card className="p-7 sm:p-9 text-center">
        <span className="grid place-items-center w-14 h-14 rounded-full bg-brand-container/70 text-brand-deep mx-auto"><Lock size={26} /></span>
        <h3 className="mt-4 text-[20px] font-semibold text-ink-900">First, verify your email</h3>
        <p className="mt-2 text-[15px] text-ink-500 max-w-md mx-auto">
          We tie your free licence to your email so it’s safe and shows up in your account.
          Sign in with a one-time code — it takes a few seconds — and you’ll come right back here.
        </p>
        <div className="mt-6 flex justify-center">
          <Button to="/login" variant="primary" size="lg" iconRight={<ArrowRight size={18} />}>
            Verify email to continue
          </Button>
        </div>
      </Card>
    );
  }

  // Success — key minted (or already had one).
  if (issued) {
    return (
      <Card className="p-7 sm:p-9 text-center">
        <span className="grid place-items-center w-14 h-14 rounded-full bg-ok/12 text-ok mx-auto"><CheckCircle size={30} /></span>
        <h3 className="mt-4 text-[22px] font-semibold text-ink-900">
          {issued.alreadyIssued ? 'You already have a beta licence' : 'Your beta licence is ready'}
        </h3>
        <p className="mt-2.5 text-[15px] text-ink-500 max-w-md mx-auto">
          It’s free for 3 months. We’ve emailed the key to <span className="font-num">{email}</span> —
          you can also see it any time in your account.
        </p>
        <div className="mt-5 inline-flex items-center gap-2 rounded-btn bg-brand-container/60 text-brand-deep px-4 py-2.5">
          <span className="text-[12px] uppercase tracking-[0.13em] font-mono">Key</span>
          <span className="font-num text-[16px] font-semibold break-all">{issued.license_key}</span>
        </div>
        <div className="mt-6 flex justify-center">
          <Button to="/account" variant="primary" size="lg">View it in your account</Button>
        </div>
      </Card>
    );
  }

  // The form.
  return (
    <Card className="p-6 sm:p-7">
      <div className="flex items-center gap-3 rounded-btn bg-ok/10 text-ink-700 px-4 py-3 mb-5">
        <Shield size={18} className="shrink-0 text-ok" />
        <p className="text-[13.5px]">Signed in as <span className="font-num font-medium">{email}</span> — your licence will be tied to this email.</p>
      </div>
      <form onSubmit={submit} noValidate className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Field label="Your name" required value={data.name} onChange={set('name')} placeholder="Ramesh Kumar" />
            {errs.name && <p className="text-[12.5px] text-err mt-1">{errs.name}</p>}
          </div>
          <div>
            <Field label="Mobile number" type="tel" required value={data.phone} onChange={set('phone')} placeholder="98765 43210" />
            {errs.phone && <p className="text-[12.5px] text-err mt-1">{errs.phone}</p>}
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Field as="select" label="State" required value={data.state} onChange={set('state')}>
              <option value="" disabled>Select your state</option>
              {INDIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
            </Field>
            {errs.state && <p className="text-[12.5px] text-err mt-1">{errs.state}</p>}
          </div>
          <div>
            <Field as="select" label="Type of business" required value={data.business_type} onChange={set('business_type')}>
              <option value="" disabled>Select business type</option>
              {BUSINESS_TYPES.map((b) => <option key={b} value={b}>{b}</option>)}
            </Field>
            {errs.business_type && <p className="text-[12.5px] text-err mt-1">{errs.business_type}</p>}
          </div>
        </div>
        {errs.form && <p className="text-[13px] text-err">{errs.form}</p>}
        <div className="flex items-center justify-between gap-4 flex-wrap pt-1">
          <p className="text-[12.5px] text-ink-400">Free for 3 months · no card required</p>
          <Button type="submit" variant="primary" size="lg" disabled={busy} iconRight={<ArrowRight size={18} />}>
            {busy ? 'Issuing…' : 'Get my free licence'}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default BetaLicenceForm;
