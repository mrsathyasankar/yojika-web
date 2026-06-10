/* Yojika — Pricing page: model explained honestly + waitlist capture. */
import { Container, Reveal, Eyebrow, SectionHead, Card, WaitlistForm } from '../ui.jsx';
import { FAQ } from '../shared.jsx';
import { Clock, Windows, Receipt, Sparkles, Lock, WifiOff, Tag } from '../icons.jsx';

const PRICE_POINTS = [
  { icon: <Clock size={20} />, title: 'Simple annual subscription', body: 'One predictable yearly price. No surprises, no metering.' },
  { icon: <Windows size={20} />, title: 'One license per PC', body: 'Licensed to the computer at your counter. Add more PCs as you grow.' },
  { icon: <Receipt size={20} />, title: 'No per-invoice fees', body: 'Bill 10 times a day or 500 — the price never changes.' },
  { icon: <Sparkles size={20} />, title: 'All features included', body: 'Every language, every report, every format. No locked tiers.' },
  { icon: <Lock size={20} />, title: 'Your data stays yours', body: 'Local-only storage. Stop renewing and your data is still on your PC.' },
  { icon: <WifiOff size={20} />, title: 'Works 365 days offline', body: 'Activate once a year. 7-day grace window at renewal time.' },
];

const PRICING_FAQ = [
  { q: 'Is there a free trial?', a: 'Yes — a full-featured trial is planned so you can bill real sales before you decide. Join the waitlist and we’ll send it the moment it’s ready.' },
  { q: 'Is it one-time or yearly?', a: 'A simple annual subscription. It keeps Yojika updated for new GST rules and supported — without per-invoice charges or cloud fees.' },
  { q: 'How many PCs does one license cover?', a: 'One license activates one PC. Multi-counter shops can buy additional licenses; we’ll keep that straightforward.' },
  { q: 'What’s your refund policy?', a: 'We’ll publish a clear, fair refund window at launch. We’d rather you trial it first and only pay when you’re sure.' },
  { q: 'What happens if I don’t renew?', a: 'Yojika keeps your data safely on your PC. Billing pauses until you renew (after a 7-day grace), but nothing is lost or held hostage in a cloud.' },
];

const PricingPage = () => (
  <>
    <section className="relative overflow-hidden pt-12 pb-4 sm:pt-16">
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 -z-10 h-[380px] w-[680px] rounded-full bg-brand-light/20 blur-3xl" />
      <Container>
        <Reveal className="text-center mx-auto max-w-2xl">
          <Eyebrow icon={<Tag size={14} />}>Pricing</Eyebrow>
          <h1 className="mt-4 text-[38px] sm:text-[48px] leading-[1.05] font-semibold tracking-tight text-ink-900">
            Pricing is coming soon
          </h1>
          <p className="mt-4 text-[17.5px] leading-relaxed text-ink-500">
            We’re still setting the right number — fair for a small shop, sustainable for us. Here’s exactly how
            it’ll work, with no fine print.
          </p>
        </Reveal>
      </Container>
    </section>

    {/* Waitlist centerpiece */}
    <section className="py-10 sm:py-12">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-panel bg-night-canvas text-white px-6 sm:px-12 py-12 shadow-lift">
            <div className="absolute -bottom-20 -right-10 h-72 w-72 rounded-full bg-brand/35 blur-3xl" />
            <div className="relative grid lg:grid-cols-[1.1fr_1fr] gap-8 items-center">
              <div>
                <Eyebrow tone="light" icon={<Sparkles size={14} />}>Launch list</Eyebrow>
                <h2 className="mt-4 text-[28px] sm:text-[34px] leading-tight font-semibold tracking-tight">
                  Be first to know when we launch — and get launch pricing
                </h2>
                <p className="mt-3.5 text-[16px] text-white/70 max-w-lg">
                  Waitlist members get early access and a special launch price. We’ll send a single email when Yojika is ready.
                </p>
              </div>
              <div className="lg:pl-4">
                <WaitlistForm dark cta="Notify me" placeholder="you@shop.in" />
                <p className="mt-4 font-num text-[12px] text-white/45">Form posts to a backend later · no card, no commitment</p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>

    {/* Model */}
    <section className="py-12 sm:py-16">
      <Container wide>
        <Reveal><SectionHead center eyebrow="The model, honestly" eyebrowIcon={<Receipt size={14} />}
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

    <FAQ items={PRICING_FAQ} eyebrow="Pricing FAQ" title="The questions shop owners ask first" />
  </>
);

export default PricingPage;
