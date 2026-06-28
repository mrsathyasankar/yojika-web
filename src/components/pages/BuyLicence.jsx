/* Yojika — buy/renew an annual licence with Razorpay Checkout, from the static site.
 *
 * The order is created server-side by the `create-order` Edge Function (the key
 * secret never reaches the browser) and the licence is minted server-side by the
 * razorpay-webhook on the captured payment — NOT in the success handler, which
 * can't be trusted and may not fire if the user closes the tab. So on success we
 * show a "your key is on the way" state and poll the account until the licence
 * appears (the webhook usually lands within seconds). */
import React from 'react';
import { Button } from '../ui.jsx';
import { CheckCircle, ArrowRight } from '../icons.jsx';
import { supabase } from '../../lib/supabase.js';

const CHECKOUT_SRC = 'https://checkout.razorpay.com/v1/checkout.js';

// Inject Checkout.js once, resolve when window.Razorpay is ready.
function loadCheckout() {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) return resolve();
    const existing = document.querySelector(`script[src="${CHECKOUT_SRC}"]`);
    if (existing) {
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () => reject(new Error('checkout load failed')));
      return;
    }
    const s = document.createElement('script');
    s.src = CHECKOUT_SRC;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('checkout load failed'));
    document.body.appendChild(s);
  });
}

// Poll for a new licence row after payment. Resolves true once one appears.
async function waitForLicence(timeoutMs = 30000, intervalMs = 2500) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const { count } = await supabase
      .from('licenses')
      .select('id', { count: 'exact', head: true });
    if ((count ?? 0) > 0) return true;
    await new Promise((r) => setTimeout(r, intervalMs));
  }
  return false;
}

const BuyLicence = ({ email, label = 'Buy annual licence', onIssued }) => {
  const [stage, setStage] = React.useState('idle'); // idle | starting | pending | error
  const [err, setErr] = React.useState('');

  const buy = async () => {
    setErr(''); setStage('starting');
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { window.location.replace('/login'); return; }

      const resp = await fetch(`${import.meta.env.PUBLIC_SUPABASE_URL}/functions/v1/create-order`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          apikey: import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
          'content-type': 'application/json',
        },
      });
      const order = await resp.json();
      if (!resp.ok) throw new Error(order?.error || 'Could not start checkout.');

      await loadCheckout();

      const rzp = new window.Razorpay({
        key: order.keyId,
        order_id: order.orderId,
        amount: order.amount,
        currency: order.currency,
        name: 'Yojika',
        description: 'Annual subscription',
        prefill: { email: email || session.user?.email },
        theme: { color: '#0F6E5A' },
        handler: async () => {
          setStage('pending');
          const ok = await waitForLicence();
          if (ok && onIssued) onIssued();
          else if (ok) window.location.reload();
          // if not ok, the pending message tells the user it'll show up shortly
        },
        modal: { ondismiss: () => setStage('idle') },
      });
      rzp.on('payment.failed', () => {
        setErr('Payment failed or was cancelled. You have not been charged.');
        setStage('error');
      });
      rzp.open();
      setStage('idle'); // modal is open; reset button state behind it
    } catch (e) {
      setErr(e?.message || 'Something went wrong. Please try again.');
      setStage('error');
    }
  };

  if (stage === 'pending') {
    return (
      <div className="flex items-center gap-3 rounded-btn bg-brand-container/70 text-brand-deep px-4 py-3.5">
        <CheckCircle size={20} className="shrink-0 text-ok" />
        <p className="text-[14.5px]">
          Payment received — we’re issuing your licence and emailing the key. It’ll appear here in a moment.
        </p>
      </div>
    );
  }

  return (
    <div>
      <Button onClick={buy} variant="primary" size="lg" disabled={stage === 'starting'}
        iconRight={<ArrowRight size={18} />}>
        {stage === 'starting' ? 'Starting…' : label}
      </Button>
      {err && <p className="mt-2 text-[13px] text-err">{err}</p>}
    </div>
  );
};

export default BuyLicence;
