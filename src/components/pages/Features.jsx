/* Yojika — Features page: deep-dive, alternating sections with anchor sub-nav. */
import { Container, Reveal, Eyebrow, scrollToId } from '../ui.jsx';
import { WinChrome, BillingScreen, MultilingualInvoice, ThermalReceipt, DashboardMock } from '../mockups.jsx';
import { ClosingCTA } from '../shared.jsx';
import {
  Sparkles, Keyboard, WifiOff, Receipt, Languages, Box, Users, Wallet,
  Printer, Shield, Check, Download, Database, Lock, Close,
} from '../icons.jsx';

const FEAT_NAV = [
  ['invoicing', 'Invoicing'], ['offline', 'Offline'], ['gst', 'GST & returns'],
  ['languages', '22 languages'], ['inventory', 'Inventory'], ['parties', 'Parties'],
  ['payments', 'Payments'], ['printing', 'Printing'], ['privacy', 'Privacy'],
];

const FeatSubNav = () => (
  <div className="sticky top-[64px] z-30 bg-canvas/85 backdrop-blur-md border-b border-ink-900/8">
    <Container wide>
      <div className="flex gap-1 overflow-x-auto py-2.5 -mx-1 px-1" style={{ scrollbarWidth: 'none' }}>
        {FEAT_NAV.map(([id, label]) => (
          <button key={id} onClick={() => scrollToId(id)}
            className="shrink-0 rounded-full px-3.5 py-1.5 text-[13.5px] font-medium text-ink-700 hover:text-brand-deep hover:bg-brand-container/60 transition-colors whitespace-nowrap">
            {label}
          </button>
        ))}
      </div>
    </Container>
  </div>
);

const AltSection = ({ id, icon, eyebrow, title, lead, points = [], flip = false, dark = false, children }) => (
  <section id={id} className={'scroll-mt-[124px] py-14 sm:py-18 ' + (dark ? 'bg-night-canvas text-white' : '')}>
    <Container wide>
      <div className={'grid lg:grid-cols-2 gap-10 lg:gap-14 items-center'}>
        <Reveal className={flip ? 'lg:order-2' : ''}>
          <Eyebrow icon={icon} tone={dark ? 'light' : 'brand'}>{eyebrow}</Eyebrow>
          <h2 className={'mt-4 text-[27px] sm:text-[32px] leading-[1.13] font-semibold tracking-tight ' + (dark ? 'text-white' : 'text-ink-900')}>{title}</h2>
          <p className={'mt-3.5 text-[16px] leading-relaxed ' + (dark ? 'text-white/70' : 'text-ink-500')}>{lead}</p>
          <ul className="mt-5 space-y-2.5">
            {points.map((p, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <Check size={18} className={'mt-0.5 shrink-0 ' + (dark ? 'text-brand-light' : 'text-ok')} />
                <span className={'text-[15px] leading-relaxed ' + (dark ? 'text-white/80' : 'text-ink-700')}>{p}</span>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={110} className={flip ? 'lg:order-1' : ''}>{children}</Reveal>
      </div>
    </Container>
  </section>
);

/* ---- small mock panels ---- */
const Panel = ({ title, children, className = '' }) => (
  <WinChrome title={title} className={className}><div className="bg-white p-4 sm:p-5">{children}</div></WinChrome>
);

const OfflineMock = () => (
  <Panel title="Yojika — Status">
    <div className="flex items-center justify-between rounded-[10px] bg-canvas/70 ring-1 ring-ink-900/8 p-4">
      <div className="flex items-center gap-3">
        <span className="grid place-items-center w-11 h-11 rounded-btn bg-brand-container/70 text-brand-deep"><WifiOff size={22} /></span>
        <div>
          <p className="text-[14px] font-medium text-ink-900">No internet — fully working</p>
          <p className="text-[12px] text-ink-400">Billing, reports & printing all local</p>
        </div>
      </div>
      <span className="rounded-full bg-ok/12 text-ok text-[11.5px] font-medium px-2.5 py-1">Online not required</span>
    </div>
    <div className="mt-3 grid grid-cols-2 gap-2.5">
      <div className="rounded-[10px] ring-1 ring-ink-900/8 p-3.5">
        <Database size={20} className="text-brand" />
        <p className="text-[13px] font-medium text-ink-900 mt-2">Local database</p>
        <p className="text-[11.5px] text-ink-400 mt-0.5">On this PC only</p>
      </div>
      <div className="rounded-[10px] ring-1 ring-ink-900/8 p-3.5">
        <Lock size={20} className="text-brand" />
        <p className="text-[13px] font-medium text-ink-900 mt-2">License active</p>
        <p className="font-num text-[11.5px] text-ink-400 mt-0.5">312 days left</p>
      </div>
    </div>
  </Panel>
);

const GstMock = () => (
  <Panel title="Yojika — GST Reports">
    <div className="space-y-2">
      {[['GSTR-1', 'Outward supplies', 'June 2026'], ['GSTR-3B', 'Summary return', 'June 2026'], ['HSN Summary', 'Rate-wise totals', 'Q1 FY25-26']].map((r) => (
        <div key={r[0]} className="flex items-center justify-between rounded-[10px] ring-1 ring-ink-900/8 px-3.5 py-3 hover:ring-brand/30 transition">
          <div>
            <p className="text-[13.5px] font-medium text-ink-900">{r[0]} <span className="text-ink-400 font-normal text-[12px]">· {r[1]}</span></p>
            <p className="font-num text-[11px] text-ink-400 mt-0.5">{r[2]}</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-btn bg-brand-container/70 text-brand-deep text-[12px] font-medium px-2.5 py-1.5">
            <Download size={14} /> CSV
          </span>
        </div>
      ))}
    </div>
    <div className="mt-3 rounded-[10px] bg-canvas/70 ring-1 ring-ink-900/8 p-3.5 text-[12.5px]">
      <div className="flex justify-between py-0.5"><span className="text-ink-500">CGST collected</span><span className="font-num text-ink-900">₹18,420</span></div>
      <div className="flex justify-between py-0.5"><span className="text-ink-500">SGST collected</span><span className="font-num text-ink-900">₹18,420</span></div>
      <div className="flex justify-between py-0.5"><span className="text-ink-500">IGST collected</span><span className="font-num text-ink-900">₹6,210</span></div>
    </div>
  </Panel>
);

const InventoryMock = () => (
  <Panel title="Yojika — Items">
    <div className="grid grid-cols-[1fr_56px_56px] gap-x-2 px-2 pb-1.5 text-[10.5px] uppercase tracking-wide text-ink-400 border-b border-ink-900/8">
      <span>Item · HSN</span><span className="text-right">Stock</span><span className="text-right">MRP</span>
    </div>
    <div className="divide-y divide-ink-900/6">
      {[['Aashirvaad Atta 5kg', '1101', '24 Box', '255'], ['Tata Salt 1kg', '2501', '3 Pc', '28'], ['Amul Butter 100g', '0405', '0 Pc', '62'], ['Surf Excel 1kg', '3402', '41 Pc', '210']].map((r, i) => {
        const stock = parseInt(r[2]); const low = stock <= 3;
        return (
          <div key={i} className="grid grid-cols-[1fr_56px_56px] gap-x-2 px-2 py-2.5 items-center text-[12.5px]">
            <div className="min-w-0"><p className="text-ink-900 truncate">{r[0]}</p><p className="font-num text-[10.5px] text-ink-400">HSN {r[1]}</p></div>
            <span className={'font-num text-right ' + (low ? 'text-warn font-medium' : 'text-ink-700')}>{r[2]}</span>
            <span className="font-num text-right text-ink-900">₹{r[3]}</span>
          </div>
        );
      })}
    </div>
    <div className="mt-2.5 flex items-center gap-2 rounded-btn bg-warn/10 text-warn px-3 py-2 text-[12px]">
      <Box size={15} /> 2 items low on stock — Tata Salt, Amul Butter
    </div>
  </Panel>
);

const LedgerMock = () => (
  <Panel title="Yojika — Party Ledger">
    <div className="flex items-center justify-between border-b border-ink-900/8 pb-3">
      <div>
        <p className="text-[14.5px] font-medium text-ink-900">Ramesh Kumar</p>
        <p className="font-num text-[11px] text-ink-400 mt-0.5">GSTIN 29ABCDE1234F1Z5</p>
      </div>
      <div className="text-right">
        <p className="text-[10.5px] uppercase tracking-wide text-ink-400">Balance</p>
        <p className="font-num text-[18px] font-semibold text-amber">₹4,250 Dr</p>
      </div>
    </div>
    <div className="mt-3 space-y-1.5 text-[12.5px]">
      {[['10 Jun', 'INV/0418', '+2,185', false], ['07 Jun', 'Payment · UPI', '−1,000', true], ['02 Jun', 'INV/0392', '+3,065', false]].map((r, i) => (
        <div key={i} className="flex items-center justify-between rounded-[8px] hover:bg-canvas/70 px-2 py-1.5">
          <span className="font-num text-ink-400 w-14">{r[0]}</span>
          <span className="flex-1 text-ink-700">{r[1]}</span>
          <span className={'font-num ' + (r[3] ? 'text-ok' : 'text-ink-900')}>₹{r[2].replace(/[+−]/, '')}</span>
        </div>
      ))}
    </div>
  </Panel>
);

const PrintingMock = () => (
  <div className="flex flex-col items-center gap-4">
    <div className="flex flex-wrap justify-center gap-2">
      {['A4', 'A5', '80mm', '65mm', '58mm'].map((f, i) => (
        <span key={f} className={'rounded-btn px-3.5 py-2 text-[13px] font-medium ' + (i >= 2 ? 'bg-brand text-white' : 'bg-white ring-1 ring-ink-900/12 text-ink-700')}>{f}</span>
      ))}
    </div>
    <ThermalReceipt />
  </div>
);

const PrivacyMock = () => (
  <Panel title="Yojika — Privacy">
    <div className="flex items-center justify-center gap-3 py-3">
      <div className="text-center">
        <span className="grid place-items-center w-14 h-14 rounded-btn bg-brand-container/70 text-brand-deep mx-auto"><Database size={26} /></span>
        <p className="text-[11.5px] text-ink-500 mt-2">Your PC</p>
      </div>
      <div className="flex-1 max-w-[120px] relative">
        <div className="border-t-2 border-dashed border-err/40" />
        <span className="absolute left-1/2 -translate-x-1/2 -top-2.5 bg-white px-1 text-err"><Close size={16} /></span>
        <p className="text-center text-[10.5px] text-err mt-2">No data leaves</p>
      </div>
      <div className="text-center opacity-50">
        <span className="grid place-items-center w-14 h-14 rounded-btn bg-canvas ring-1 ring-ink-900/10 text-ink-400 mx-auto"><WifiOff size={26} /></span>
        <p className="text-[11.5px] text-ink-400 mt-2">Cloud</p>
      </div>
    </div>
    <div className="mt-2 rounded-[10px] bg-brand-container/40 ring-1 ring-brand/15 px-3.5 py-3 flex items-center gap-2.5">
      <Shield size={20} className="text-brand-deep shrink-0" />
      <p className="text-[12.5px] text-brand-deep">Device-bound license. Only activation ever touches the internet.</p>
    </div>
  </Panel>
);

const FeaturesPage = () => (
  <>
    <section className="pt-12 pb-2 sm:pt-16">
      <Container wide>
        <Reveal className="max-w-2xl">
          <Eyebrow icon={<Sparkles size={14} />}>Features</Eyebrow>
          <h1 className="mt-4 text-[36px] sm:text-[46px] leading-[1.06] font-semibold tracking-tight text-ink-900">
            Every tool a counter needs — and nothing it doesn’t
          </h1>
          <p className="mt-4 text-[17px] leading-relaxed text-ink-500">
            From the first keystroke to the printed bill, Yojika is built for speed, exactness and calm. Here’s the whole picture.
          </p>
        </Reveal>
      </Container>
    </section>
    <FeatSubNav />

    <AltSection id="invoicing" icon={<Keyboard size={14} />} eyebrow="Invoicing speed"
      title="Bill in seconds, driven entirely by the keyboard"
      lead="The whole sale lives on one screen. Scan or type, and the line fills itself — rate, HSN and tax included."
      points={['Live tax total always visible as you add items', 'Tax-inclusive (MRP) by default, B2B exclusive toggle', 'Per-line discounts and auto-numbered invoices (INV2025-26/0001) that reset each financial year']}>
      <BillingScreen />
    </AltSection>

    <AltSection id="offline" flip icon={<WifiOff size={14} />} eyebrow="Offline-first"
      title="It just works — with zero internet, every time"
      lead="All your data lives in a local database on the shop’s PC. No login to bill, no sync, no spinning loaders."
      points={['Activate your license once, then work 365 days offline', '7-day grace window when it’s time to renew', 'No network at the counter? Nothing changes.']}>
      <OfflineMock />
    </AltSection>

    <AltSection id="gst" icon={<Receipt size={14} />} eyebrow="GST & returns"
      title="GST done right, so filing day isn’t a scramble"
      lead="Yojika routes tax correctly and keeps every figure ready to export — no spreadsheets at midnight."
      points={['Automatic CGST+SGST vs IGST by state, with GSTIN validation', 'HSN/SAC codes on every line item', 'One-click GSTR-1, GSTR-3B and HSN-summary with CSV export', 'Credit notes for sales returns, handled cleanly']}>
      <GstMock />
    </AltSection>

    <AltSection id="languages" flip dark icon={<Languages size={14} />} eyebrow="22 languages"
      title="Invoices in the customer’s own language"
      lead="Print a customer’s name and items in any of the 22 official Indian languages — fully bundled, fully offline."
      points={['Hindi, Tamil, Telugu, Kannada, Malayalam, Bengali, Gujarati, Punjabi, Odia, Urdu and more', 'Proper script rendering on A4, A5 and thermal', 'No internet, no font downloads — it’s all in the box']}>
      <MultilingualInvoice />
    </AltSection>

    <AltSection id="inventory" icon={<Box size={14} />} eyebrow="Inventory & stock"
      title="Stock that keeps itself honest"
      lead="Track items with HSN and units, and let unit conversion handle the way a shop actually buys and sells."
      points={['Unit conversion: Box ↔ Piece, Kg, Litre', 'Quiet low-stock warnings — never alarming', 'CSV import to get your whole catalogue in fast']}>
      <InventoryMock />
    </AltSection>

    <AltSection id="parties" flip icon={<Users size={14} />} eyebrow="Parties & ledgers"
      title="Customers and vendors, with a ledger you can trust"
      lead="Every party has a GSTIN, a running balance and a clean ledger — so you always know who owes what."
      points={['Customers and vendors in one place', 'Per-party ledger with running balance', 'CSV import for parties, GSTIN stored and validated']}>
      <LedgerMock />
    </AltSection>

    <AltSection id="payments" icon={<Wallet size={14} />} eyebrow="Payments & receivables"
      title="Know today’s sales and outstanding dues at a glance"
      lead="Record payments against invoices and watch the dashboard keep score — without opening a single report."
      points={['Cash, UPI, card, bank or cheque against any invoice', 'Track unpaid, partial and paid statuses', 'Dashboard: today’s sales, this month, and outstanding dues']}>
      <DashboardMock />
    </AltSection>

    <AltSection id="printing" flip icon={<Printer size={14} />} eyebrow="Printing formats"
      title="Print any format, with the ₹ rendered properly"
      lead="From a full A4 tax invoice to an 80mm thermal receipt, every format is print-ready and reads cleanly."
      points={['A4, A5 and thermal (58 / 65 / 80mm)', 'Correct ₹ rendering and tabular figures', 'Same invoice, any format — your choice at print time']}>
      <PrintingMock />
    </AltSection>

    <AltSection id="privacy" icon={<Shield size={14} />} eyebrow="Private by design"
      title="Your business data never leaves your shop"
      lead="Yojika is not a cloud service. The only thing that ever touches the internet is your one-time license activation."
      points={['Device-bound license activation', 'All business data stays on your local PC', 'Local backup & restore you control']}>
      <PrivacyMock />
    </AltSection>

    <ClosingCTA />
  </>
);

export default FeaturesPage;
