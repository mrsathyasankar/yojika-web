/* Yojika — Home page. */
import { Container, Reveal, Eyebrow, Button, SectionHead, Card } from '../ui.jsx';
import { BillingScreen, MultilingualInvoice } from '../mockups.jsx';
import { FAQ, ClosingCTA } from '../shared.jsx';
import {
  WifiOff, Receipt, Languages, Lock, Keyboard, Box, Users, Wallet,
  Sparkles, Rupee, Printer, Windows, ArrowRight, Bolt, Check, Close, LeafGlyph, ScalesGlyph,
} from '../icons.jsx';

const TRUST = [
  { icon: <WifiOff size={17} />, label: 'Works offline' },
  { icon: <Receipt size={17} />, label: 'GST-ready' },
  { icon: <Languages size={17} />, label: '22 languages' },
  { icon: <Lock size={17} />, label: 'Private by design' },
];

const HOME_FEATURES = [
  { icon: <Keyboard size={22} />, title: 'Keyboard-fast invoicing', body: 'Bill in seconds with a live tax total always on screen. MRP-inclusive by default, B2B exclusive toggle, per-line discounts.' },
  { icon: <WifiOff size={22} />, title: 'Works 100% offline', body: 'All data lives in a local database on your PC. No login to bill, no sync, no internet — ever.' },
  { icon: <Receipt size={22} />, title: 'GST done right', body: 'Automatic CGST+SGST vs IGST by state, GSTIN validation, HSN/SAC codes, one-click GSTR-1 & 3B with CSV.' },
  { icon: <Box size={22} />, title: 'Inventory & stock', body: 'Items with HSN, units and unit conversion (Box↔Piece, Kg, Litre), and quiet low-stock warnings.' },
  { icon: <Users size={22} />, title: 'Parties & ledgers', body: 'Customers and vendors with GSTIN, running balances, and a clean per-party ledger.' },
  { icon: <Wallet size={22} />, title: 'Payments & dues', body: 'Record cash, UPI, card, bank or cheque against invoices. Track unpaid, partial and paid at a glance.' },
];

const STEPS = [
  { n: '1', icon: <Sparkles size={20} />, title: 'Scan or type', body: 'Add items by barcode or name. Rates, HSN and tax fill in automatically.' },
  { n: '2', icon: <Rupee size={20} />, title: 'Tax adds up live', body: 'CGST+SGST or IGST is computed as you go. The grand total is always visible.' },
  { n: '3', icon: <Printer size={20} />, title: 'Save & print', body: 'Press F12. Print A4, A5 or a thermal receipt — in the customer’s own language.' },
];

const HomeHero = () => (
  <section className="relative overflow-hidden">
    <div className="absolute inset-0 -z-10 dotgrid opacity-60" />
    <div className="absolute -top-32 -right-24 -z-10 h-[460px] w-[460px] rounded-full bg-brand-light/25 blur-3xl" />
    <Container wide className="pt-12 pb-16 sm:pt-16 sm:pb-20">
      <div className="grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-10 items-center">
        <Reveal>
          <Eyebrow icon={<Windows size={14} />}>Offline-first · Windows</Eyebrow>
          <h1 className="mt-5 text-[40px] sm:text-[52px] leading-[1.04] font-semibold tracking-tight text-ink-900">
            Bill in seconds. <span className="text-brand">Exact on GST.</span> Works fully offline.
          </h1>
          <p className="mt-5 text-[17px] sm:text-[18px] leading-relaxed text-ink-500 max-w-xl">
            Yojika is GST billing software for Indian small shops — keyboard-fast invoicing, invoices in 22 languages,
            and your business data never leaves your shop’s PC.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button to="/pricing" variant="primary" size="lg" iconRight={<ArrowRight size={18} />}>Get a free 3-month licence</Button>
            <Button to="/download" variant="secondary" size="lg" icon={<Windows size={18} />}>Download for Windows</Button>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2.5">
            {TRUST.map((t) => (
              <li key={t.label} className="flex items-center gap-2 text-[14px] text-ink-700">
                <span className="text-brand">{t.icon}</span>{t.label}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={120} className="lg:pl-4">
          <BillingScreen />
        </Reveal>
      </div>
    </Container>
  </section>
);

const HowItWorks = () => (
  <section className="py-16 sm:py-20 bg-white border-y border-ink-900/8">
    <Container wide>
      <Reveal><SectionHead center eyebrow="How it works" eyebrowIcon={<Bolt size={14} />}
        title="Three steps from customer to printed bill"
        lead="No menus to hunt through. The whole sale happens on one screen, driven by the keyboard." /></Reveal>
      <div className="mt-12 grid md:grid-cols-3 gap-5 relative">
        {STEPS.map((s, i) => (
          <Reveal key={s.n} delay={i * 90}>
            <Card className="p-6 h-full">
              <div className="flex items-center gap-3">
                <span className="grid place-items-center w-10 h-10 rounded-btn bg-brand text-white">{s.icon}</span>
                <span className="font-num text-[13px] text-ink-400">Step {s.n}</span>
              </div>
              <h3 className="mt-4 text-[18px] font-semibold text-ink-900">{s.title}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-ink-500">{s.body}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </Container>
  </section>
);

const FeatureGrid = () => (
  <section className="py-16 sm:py-20">
    <Container wide>
      <Reveal><SectionHead eyebrow="Everything a counter needs" eyebrowIcon={<Sparkles size={14} />}
        title="Built for the way a busy shop actually runs"
        lead="Dense where it matters, calm everywhere else. Each tool is one or two keystrokes away." /></Reveal>
      <div className="mt-11 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {HOME_FEATURES.map((f, i) => (
          <Reveal key={f.title} delay={(i % 3) * 80}>
            <Card hover className="p-6 h-full">
              <span className="grid place-items-center w-11 h-11 rounded-btn bg-brand-container/70 text-brand-deep">{f.icon}</span>
              <h3 className="mt-4 text-[17.5px] font-semibold text-ink-900">{f.title}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-ink-500">{f.body}</p>
            </Card>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-8">
        <Button to="/features" variant="ghost" iconRight={<ArrowRight size={18} />}>See every feature in detail</Button>
      </Reveal>
    </Container>
  </section>
);

const LanguageSection = () => {
  const scripts = [
    { name: 'Hindi', s: 'नमस्ते' }, { name: 'Tamil', s: 'வணக்கம்' }, { name: 'Telugu', s: 'నమస్తే' },
    { name: 'Kannada', s: 'ನಮಸ್ಕಾರ' }, { name: 'Bengali', s: 'নমস্কার' }, { name: 'Gujarati', s: 'નમસ્તે' },
    { name: 'Malayalam', s: 'നമസ്കാരം' }, { name: 'Punjabi', s: 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ' }, { name: 'Odia', s: 'ନମସ୍କାର' }, { name: 'Urdu', s: 'آداب' },
  ];
  return (
    <section className="py-16 sm:py-20 bg-night-canvas text-white relative overflow-hidden">
      <div className="absolute -bottom-24 -left-20 h-[400px] w-[400px] rounded-full bg-brand/30 blur-3xl" />
      <Container wide className="relative">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 items-center">
          <Reveal>
            <Eyebrow tone="light" icon={<Languages size={14} />}>The signature difference</Eyebrow>
            <h2 className="mt-5 text-[30px] sm:text-[38px] leading-[1.1] font-semibold tracking-tight">
              Print invoices in all 22 official Indian languages
            </h2>
            <p className="mt-4 text-[16.5px] leading-relaxed text-white/70 max-w-xl">
              A customer’s name and items, printed in their own script — Hindi, Tamil, Telugu, Kannada, Bengali and more.
              Fully bundled, works offline, no add-ons. It’s respect, printed on every bill.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {scripts.map((sc) => (
                <span key={sc.name} className="rounded-full bg-white/8 ring-1 ring-white/12 px-3.5 py-1.5 text-[14px]">
                  <span className="text-white">{sc.s}</span>
                  <span className="text-white/45 text-[12px] ml-2">{sc.name}</span>
                </span>
              ))}
              <span className="rounded-full bg-brand/30 ring-1 ring-brand-light/30 px-3.5 py-1.5 text-[13px] text-brand-light">+ 12 more</span>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <MultilingualInvoice />
          </Reveal>
        </div>
      </Container>
    </section>
  );
};

const CALM = [
  ['Bill in 3–4 keystrokes', 'Pop-ups, upsells and red alerts mid-sale'],
  ['One quiet running total', 'Flashing banners competing for attention'],
  ['Your data stays on your PC', 'Pushed to someone else’s cloud'],
  ['Works with zero internet', 'Stalls when the network drops'],
  ['Calm greens, exact numbers', 'Loud reds and shouting badges'],
];
const CalmComparison = () => (
  <section className="py-16 sm:py-20">
    <Container wide>
      <Reveal><SectionHead center eyebrow="Calm & exact, not loud & cluttered" eyebrowIcon={<ScalesGlyph size={14} />}
        title="Software shouldn’t shout at the people running a shop"
        lead="Most billing apps fight for your attention. Yojika gets out of the way so you can serve the next customer." /></Reveal>
      <Reveal className="mt-11">
        <div className="mx-auto max-w-3xl overflow-hidden rounded-panel ring-1 ring-ink-900/10 shadow-card bg-white">
          <div className="grid grid-cols-2 text-[13px] font-medium">
            <div className="flex items-center gap-2 px-5 py-3.5 bg-brand text-white">
              <LeafGlyph size={16} /> Yojika — calm &amp; exact
            </div>
            <div className="flex items-center gap-2 px-5 py-3.5 bg-canvas text-ink-500 border-l border-ink-900/8">
              The loud alternatives
            </div>
          </div>
          <div className="divide-y divide-ink-900/8">
            {CALM.map((row, i) => (
              <div key={i} className="grid grid-cols-2">
                <div className="flex items-start gap-2.5 px-5 py-3.5 text-[14.5px] text-ink-900">
                  <Check size={18} className="text-ok mt-0.5 shrink-0" />{row[0]}
                </div>
                <div className="flex items-start gap-2.5 px-5 py-3.5 text-[14.5px] text-ink-400 border-l border-ink-900/8">
                  <Close size={16} className="mt-0.5 shrink-0 text-ink-400" />{row[1]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </Container>
  </section>
);

const HOME_FAQ = [
  { q: 'Does Yojika really work without internet?', a: 'Yes. Billing, inventory, reports and printing all run on your PC with no connection. The internet is only ever used once, to activate your license.' },
  { q: 'Where is my business data stored?', a: 'In a local database on your shop’s computer. Nothing is uploaded to a cloud, and there’s no account to log into just to make a bill.' },
  { q: 'Is it really in my language?', a: 'Invoices print in all 22 official Indian languages — the customer’s name and items in their own script. The fonts are bundled, so it works offline.' },
  { q: 'Which platforms are supported?', a: 'Yojika is a Windows desktop app (Windows 10/11, 64-bit). We’re focused on getting the counter experience right on Windows first.' },
  { q: 'What about GST returns?', a: 'One-click GSTR-1, GSTR-3B and HSN-summary reports, with CSV export you can hand to your accountant or upload to the portal.' },
];

const HomePage = () => (
  <>
    <HomeHero />
    <HowItWorks />
    <FeatureGrid />
    <LanguageSection />
    <CalmComparison />
    <FAQ items={HOME_FAQ} />
    <ClosingCTA />
  </>
);

export default HomePage;
