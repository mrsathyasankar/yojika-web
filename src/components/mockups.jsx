/* Yojika — product UI mockups built from divs (show, don't tell). */
import { LeafGlyph, Close, Sparkles } from './icons.jsx';

const Money = ({ v, className = '', sign = true }) => (
  <span className={'font-num ' + className}>{sign ? '₹' : ''}{v}</span>
);

/* Tiny Windows-style window chrome */
const WinChrome = ({ title, children, accent = false, className = '' }) => (
  <div className={'overflow-hidden rounded-card bg-white ring-1 ring-ink-900/10 shadow-lift ' + className}>
    <div className={'flex items-center justify-between px-3.5 h-9 border-b ' + (accent ? 'bg-brand text-white border-brand-deep/40' : 'bg-canvas border-ink-900/8')}>
      <div className="flex items-center gap-2 min-w-0">
        <span className={'grid place-items-center rounded-[5px] ' + (accent ? 'bg-white/15 text-white' : 'bg-brand text-white')} style={{ width: 18, height: 18 }}>
          <LeafGlyph size={12} />
        </span>
        <span className={'text-[12.5px] font-medium truncate ' + (accent ? 'text-white' : 'text-ink-700')}>{title}</span>
      </div>
      <div className="flex items-center gap-3.5">
        <span className={'h-[2px] w-3 ' + (accent ? 'bg-white/70' : 'bg-ink-400')} />
        <span className={'h-2.5 w-2.5 border ' + (accent ? 'border-white/70' : 'border-ink-400')} />
        <span className={accent ? 'text-white/90' : 'text-ink-500'}><Close size={13} /></span>
      </div>
    </div>
    {children}
  </div>
);

/* ---------- Billing counter screen (hero) ---------- */
const BillingScreen = ({ className = '' }) => {
  const rows = [
    ['1', 'Aashirvaad Atta 5kg', '1101', '2', '255.00', '10.00', '500.00'],
    ['2', 'Tata Salt 1kg', '2501', '4', '28.00', '0.00', '112.00'],
    ['3', 'Amul Butter 100g', '0405', '3', '62.00', '0.00', '186.00'],
    ['4', 'Surf Excel 1kg', '3402', '1', '210.00', '15.00', '195.00'],
    ['5', 'Parle-G ₹10', '1905', '12', '10.00', '0.00', '120.00'],
  ];
  return (
    <WinChrome title="Yojika — New Sale" accent className={className}>
      <div className="bg-white">
        {/* sub toolbar */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 px-4 py-2.5 border-b border-ink-900/8 bg-canvas/60">
          <div className="text-[11px] uppercase tracking-wide text-ink-400">Invoice
            <span className="ml-1.5 font-num text-[12.5px] tracking-normal normal-case text-ink-900 font-medium">INV2025-26/0418</span>
          </div>
          <div className="text-[11px] uppercase tracking-wide text-ink-400">Date
            <span className="ml-1.5 font-num text-[12.5px] tracking-normal normal-case text-ink-700">10-06-2026</span>
          </div>
          <div className="ml-auto flex items-center gap-1 rounded-full bg-brand-container/70 p-0.5 text-[11.5px] font-medium">
            <span className="rounded-full bg-brand text-white px-2.5 py-1">Inclusive · MRP</span>
            <span className="px-2.5 py-1 text-brand-deep">Exclusive</span>
          </div>
        </div>
        {/* item input row */}
        <div className="flex items-center gap-2 px-4 py-2.5">
          <div className="flex-1 flex items-center gap-2 rounded-btn ring-1 ring-brand/40 bg-white px-3 py-2 text-[13px] text-ink-400">
            <Sparkles size={15} className="text-brand" />
            Scan barcode or type item name…
            <span className="ml-auto h-4 w-px bg-brand/40 animate-pulse" />
          </div>
          <span className="hidden sm:inline-flex items-center gap-1 rounded-btn bg-canvas ring-1 ring-ink-900/10 px-2.5 py-2 text-[11px] font-mono text-ink-500">F3</span>
        </div>
        {/* table */}
        <div className="px-4">
          <div className="grid grid-cols-[20px_1fr_46px_30px_64px_56px_70px] gap-x-2 px-2 pb-1.5 text-[10.5px] uppercase tracking-wide text-ink-400 border-b border-ink-900/8">
            <span>#</span><span>Item</span><span>HSN</span><span className="text-right">Qty</span><span className="text-right">Rate</span><span className="text-right">Disc</span><span className="text-right">Amount</span>
          </div>
          <div className="divide-y divide-ink-900/6">
            {rows.map((r, i) => (
              <div key={i} className="grid grid-cols-[20px_1fr_46px_30px_64px_56px_70px] gap-x-2 px-2 py-[7px] items-center text-[12.5px] hover:bg-canvas/70">
                <span className="font-num text-ink-400">{r[0]}</span>
                <span className="text-ink-900 truncate">{r[1]}</span>
                <span className="font-num text-ink-400">{r[2]}</span>
                <span className="font-num text-ink-700 text-right">{r[3]}</span>
                <span className="font-num text-ink-700 text-right">{r[4]}</span>
                <span className="font-num text-amber text-right">{r[5]}</span>
                <span className="font-num text-ink-900 text-right font-medium">{r[6]}</span>
              </div>
            ))}
          </div>
        </div>
        {/* footer split */}
        <div className="grid sm:grid-cols-[1fr_220px] gap-0 mt-1.5 border-t border-ink-900/8">
          <div className="p-4 flex flex-col justify-between gap-3">
            <div className="flex flex-wrap gap-1.5">
              {['Cash', 'UPI', 'Card', 'Credit'].map((p, i) => (
                <span key={p} className={'rounded-btn px-3 py-1.5 text-[12px] font-medium ' + (i === 1 ? 'bg-brand text-white' : 'bg-canvas text-ink-700 ring-1 ring-ink-900/10')}>{p}</span>
              ))}
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10.5px] font-mono text-ink-400">
              <span><span className="text-brand-deep">F2</span> New</span>
              <span><span className="text-brand-deep">F4</span> Customer</span>
              <span><span className="text-brand-deep">F9</span> Discount</span>
              <span><span className="text-brand-deep">F12</span> Save &amp; Print</span>
            </div>
          </div>
          <div className="p-4 bg-canvas/70 border-l border-ink-900/8 text-[12px]">
            <Row k="Subtotal" v="1,113.00" />
            <Row k="Discount" v="25.00" tone="text-amber" />
            <Row k="Taxable" v="1,088.00" />
            <Row k="CGST 2.5%" v="27.20" muted />
            <Row k="SGST 2.5%" v="27.20" muted />
            <div className="mt-2.5 pt-2.5 border-t border-ink-900/12 flex items-end justify-between">
              <span className="text-[11px] uppercase tracking-wide text-ink-500">Total</span>
              <span className="font-num text-[22px] font-semibold text-brand-deep leading-none">₹1,113<span className="text-[14px]">.00</span></span>
            </div>
          </div>
        </div>
      </div>
    </WinChrome>
  );
};
const Row = ({ k, v, muted = false, tone = '' }) => (
  <div className="flex items-center justify-between py-[3px]">
    <span className={muted ? 'text-ink-400' : 'text-ink-500'}>{k}</span>
    <span className={'font-num ' + (tone || (muted ? 'text-ink-500' : 'text-ink-900'))}>₹{v}</span>
  </div>
);

/* ---------- Multilingual invoice ---------- */
const MultilingualInvoice = ({ className = '' }) => {
  const items = [
    { en: 'Rice (Sona Masoori) 25kg', loc: 'सोना मसूरी चावल २५ किग्रा', amt: '1,350.00' },
    { en: 'Toor Dal 5kg', loc: 'తుర్ పప్పు ౫ కిలో', amt: '690.00' },
    { en: 'Sunflower Oil 1L', loc: 'சூரியகாந்தி எண்ணெய் ௧ லி', amt: '145.00' },
  ];
  return (
    <WinChrome title="Print preview — A5" className={className}>
      <div className="bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between border-b border-ink-900/12 pb-3">
          <div>
            <p className="text-[15px] font-semibold text-ink-900">Sri Lakshmi Stores</p>
            <p className="font-num text-[11px] text-ink-400 mt-0.5">GSTIN 29ABCDE1234F1Z5</p>
          </div>
          <div className="text-right">
            <p className="text-[10.5px] uppercase tracking-wide text-ink-400">Tax Invoice</p>
            <p className="font-num text-[12px] text-ink-700 mt-0.5">INV2025-26/0418</p>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between text-[12px]">
          <div>
            <span className="text-ink-400 text-[10.5px] uppercase tracking-wide">Customer</span>
            <p className="text-ink-900 mt-0.5">ರಮೇಶ್ ಕುಮಾರ್ <span className="text-ink-400 text-[11px]">· Ramesh Kumar</span></p>
          </div>
          <span className="rounded-full bg-brand-container/70 text-brand-deep text-[10.5px] font-medium px-2.5 py-1">ಕನ್ನಡ · Kannada</span>
        </div>
        <div className="mt-3 divide-y divide-ink-900/6">
          {items.map((it, i) => (
            <div key={i} className="flex items-start justify-between gap-3 py-2">
              <div className="min-w-0">
                <p className="text-[13px] text-ink-900 leading-snug">{it.loc}</p>
                <p className="text-[11px] text-ink-400">{it.en}</p>
              </div>
              <span className="font-num text-[13px] text-ink-900 shrink-0">₹{it.amt}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-3 border-t border-ink-900/12 flex items-end justify-between">
          <div className="text-[11px] text-ink-400 leading-relaxed">
            CGST 2.5% &nbsp;<span className="font-num text-ink-500">₹54.63</span><br />
            SGST 2.5% &nbsp;<span className="font-num text-ink-500">₹54.63</span>
          </div>
          <div className="text-right">
            <p className="text-[10.5px] uppercase tracking-wide text-ink-400">Grand total</p>
            <p className="font-num text-[20px] font-semibold text-brand-deep">₹2,185.00</p>
          </div>
        </div>
      </div>
    </WinChrome>
  );
};

/* ---------- Thermal receipt ---------- */
const ThermalReceipt = ({ className = '' }) => (
  <div className={'mx-auto bg-white rounded-[4px] shadow-lift ring-1 ring-ink-900/8 px-4 py-4 font-mono text-[11px] text-ink-900 ' + className} style={{ width: 230 }}>
    <p className="text-center font-semibold text-[12.5px] tracking-tight">SRI LAKSHMI STORES</p>
    <p className="text-center text-[9.5px] text-ink-400 mt-0.5">GSTIN 29ABCDE1234F1Z5</p>
    <p className="text-center text-[9.5px] text-ink-400">Bengaluru · 9876543210</p>
    <Dashed />
    <div className="flex justify-between text-[9.5px] text-ink-500">
      <span>INV2025-26/0418</span><span>10-06-26</span>
    </div>
    <Dashed />
    {[['Atta 5kg x2', '500.00'], ['Salt 1kg x4', '112.00'], ['Butter x3', '186.00'], ['Parle-G x12', '120.00']].map((r) => (
      <div key={r[0]} className="flex justify-between py-[1px]">
        <span className="text-ink-700">{r[0]}</span><span>{r[1]}</span>
      </div>
    ))}
    <Dashed />
    <div className="flex justify-between text-ink-500"><span>Taxable</span><span>1,058.74</span></div>
    <div className="flex justify-between text-ink-500"><span>CGST+SGST</span><span>54.26</span></div>
    <div className="flex justify-between text-[14px] font-semibold mt-1 text-brand-deep"><span>TOTAL</span><span>₹1,113</span></div>
    <Dashed />
    <p className="text-center text-[9.5px] text-ink-400">Paid via UPI · Thank you 🙏</p>
  </div>
);
const Dashed = () => <div className="my-1.5 border-t border-dashed border-ink-900/25" />;

/* ---------- Dashboard ---------- */
const DashboardMock = ({ className = '' }) => {
  const bars = [40, 62, 48, 80, 58, 92, 70];
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  return (
    <WinChrome title="Yojika — Dashboard" className={className}>
      <div className="bg-white p-4 sm:p-5">
        <div className="grid grid-cols-3 gap-2.5">
          {[
            { k: "Today's sales", v: '₹14,280', d: '32 bills', tone: 'text-brand-deep' },
            { k: 'This month', v: '₹3.92L', d: '+8% vs last', tone: 'text-ink-900' },
            { k: 'Outstanding', v: '₹47,500', d: '11 parties', tone: 'text-amber' },
          ].map((c) => (
            <div key={c.k} className="rounded-[10px] bg-canvas/70 ring-1 ring-ink-900/8 p-3">
              <p className="text-[10.5px] uppercase tracking-wide text-ink-400">{c.k}</p>
              <p className={'font-num text-[19px] font-semibold mt-1 leading-none ' + c.tone}>{c.v}</p>
              <p className="text-[10.5px] text-ink-400 mt-1.5">{c.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-[10px] bg-canvas/70 ring-1 ring-ink-900/8 p-3.5">
          <div className="flex items-center justify-between">
            <p className="text-[11.5px] font-medium text-ink-700">Sales · last 7 days</p>
            <p className="font-num text-[11px] text-ink-400">₹86,400</p>
          </div>
          <div className="mt-3 flex items-end justify-between gap-2 h-24">
            {bars.map((b, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                <div className="w-full rounded-t-[4px] bg-gradient-to-t from-brand to-brand-light/80 transition-all" style={{ height: b + '%' }} />
                <span className="text-[9.5px] text-ink-400">{days[i]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </WinChrome>
  );
};

export {
  Money, WinChrome, BillingScreen, MultilingualInvoice, ThermalReceipt, DashboardMock,
};
