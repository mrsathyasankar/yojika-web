/* Yojika — Beta licence page: get a free 3-month licence + the honest pricing model.
   Pricing isn't published during the beta (ADR 0021); this page registers shop
   owners for a free 3-month licence and explains how paid pricing will work later. */
import { Container, Reveal, Eyebrow, SectionHead, Card } from '../ui.jsx';
import { FAQ } from '../shared.jsx';
import BetaLicenceForm from './BetaLicenceForm.jsx';
import { Clock, Windows, Receipt, Sparkles, Lock, WifiOff, Tag, CheckCircle } from '../icons.jsx';

const PRICE_POINTS = [
  { icon: <Clock size={20} />, title: 'Simple annual subscription', body: 'One predictable yearly price. No surprises, no metering.' },
  { icon: <Windows size={20} />, title: 'One license per PC', body: 'Licensed to the computer at your counter. Add more PCs as you grow.' },
  { icon: <Receipt size={20} />, title: 'No per-invoice fees', body: 'Bill 10 times a day or 500 — the price never changes.' },
  { icon: <Sparkles size={20} />, title: 'All features included', body: 'Every language, every report, every format. No locked tiers.' },
  { icon: <Lock size={20} />, title: 'Your data stays yours', body: 'Local-only storage. Stop renewing and your data is still on your PC.' },
  { icon: <WifiOff size={20} />, title: 'Works 365 days offline', body: 'Activate once, then bill offline. 7-day grace window at renewal time.' },
];

const BETA_PERKS = [
  'Full app — every feature, no locked tiers',
  '3 months free, no card required',
  'Lock in early-supporter pricing when we launch',
  'A direct line to shape what we build next',
];

const PRICING_FAQ = [
  { q: 'How much does the beta cost?', a: 'Nothing. Right now Yojika is in beta and the licence is free for 3 months. We’re still setting the right launch price — fair for a small shop, sustainable for us — and we’ll share it well before your beta ends.' },
  { q: 'What happens when the 3 months end?', a: 'We’ll email you first, with plenty of notice and a special early-supporter price for joining the beta. Your data always stays on your PC — nothing is lost or held hostage if you decide not to continue.' },
  { q: 'Do I need a credit card to start?', a: 'No card, no commitment. Verify your email, tell us a little about your shop, and the licence key is yours — by email and in your account.' },
  { q: 'Is it really the full app?', a: 'Yes — every language, every report, every invoice format. The beta isn’t a cut-down trial; it’s the whole thing, so your feedback is about the real product.' },
  { q: 'How many PCs does one licence cover?', a: 'One licence activates one PC. Running more than one counter? Email us — we’ll sort you out during the beta.' },
  { q: 'What will pricing look like after launch?', a: 'A simple annual subscription — one predictable yearly price, no per-invoice charges and no cloud fees. The cards below spell out exactly what you’ll pay for, and what you never will.' },
];

const PricingPage = () => (
  <>
    <section className="relative overflow-hidden pt-12 pb-4 sm:pt-16">
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 -z-10 h-[380px] w-[680px] rounded-full bg-brand-light/20 blur-3xl" />
      <Container>
        <Reveal className="text-center mx-auto max-w-2xl">
          <Eyebrow icon={<Tag size={14} />}>Beta · free for 3 months</Eyebrow>
          <h1 className="mt-4 text-[38px] sm:text-[48px] leading-[1.05] font-semibold tracking-tight text-ink-900">
            Get your free 3-month licence
          </h1>
          <p className="mt-4 text-[17.5px] leading-relaxed text-ink-500">
            Yojika is in beta. Tell us a little about your shop and we’ll set you up with the full app, free for
            three months — so you can bill real sales while we finalise launch pricing.
          </p>
        </Reveal>
      </Container>
    </section>

    {/* Registration centerpiece */}
    <section className="py-10 sm:py-12">
      <Container>
        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-8 lg:gap-12 items-start">
          <Reveal className="lg:pt-2">
            <Eyebrow icon={<Sparkles size={14} />}>What you get</Eyebrow>
            <h2 className="mt-4 text-[26px] sm:text-[30px] leading-tight font-semibold tracking-tight text-ink-900">
              The whole app, on us, for 3 months
            </h2>
            <p className="mt-3.5 text-[15.5px] leading-relaxed text-ink-500 max-w-lg">
              We’re opening Yojika to a small group of shops to gather real feedback. In return for trying it at your
              counter, your licence is free for three months.
            </p>
            <ul className="mt-6 space-y-3">
              {BETA_PERKS.map((p) => (
                <li key={p} className="flex items-start gap-3 text-[15px] text-ink-700">
                  <CheckCircle size={20} className="shrink-0 text-ok mt-0.5" /> {p}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={110}>
            <BetaLicenceForm />
          </Reveal>
        </div>
      </Container>
    </section>

    {/* Model — how paid pricing will work after the beta */}
    <section className="py-12 sm:py-16">
      <Container wide>
        <Reveal><SectionHead center eyebrow="After the beta, honestly" eyebrowIcon={<Receipt size={14} />}
          title="What you’ll pay for — and what you’ll never be charged for" /></Reveal>
        <div className="mt-11 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PRICE_POINTS.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 80}>
              <Card hover className="p-6 h-full">
                <span className="grid place-items-center w-11 h-11 rounded-btn bg-brand-container/70 text-brand-deep">{p.icon}</span>
                <h3 className="mt-4 text-[17px] font-semibold text-ink-900">{p.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-ink-500">{p.body}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>

    <FAQ items={PRICING_FAQ} eyebrow="Beta FAQ" title="The questions shop owners ask first" />
  </>
);

export default PricingPage;
