/* Yojika — components shared across multiple pages: FAQ accordion + closing waitlist CTA. */
import React from 'react';
import { Container, Reveal, SectionHead, WaitlistForm } from './ui.jsx';
import { Plus, Receipt } from './icons.jsx';

/* Reusable accordion FAQ */
const FAQ = ({ items, title = 'Questions, answered plainly', eyebrow = 'FAQ' }) => {
  const [open, setOpen] = React.useState(0);
  return (
    <section className="py-16 sm:py-20 bg-white border-t border-ink-900/8">
      <Container>
        <Reveal><SectionHead center eyebrow={eyebrow} eyebrowIcon={<Receipt size={14} />} title={title} /></Reveal>
        <Reveal className="mt-10 mx-auto max-w-2xl divide-y divide-ink-900/10 rounded-panel ring-1 ring-ink-900/10 bg-surface overflow-hidden">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={i}>
                <button onClick={() => setOpen(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-canvas/60 transition-colors"
                  aria-expanded={isOpen}>
                  <span className="text-[15.5px] font-medium text-ink-900">{it.q}</span>
                  <span className={'shrink-0 grid place-items-center w-7 h-7 rounded-full bg-brand-container/70 text-brand-deep transition-transform duration-300 ' + (isOpen ? 'rotate-45' : '')}>
                    <Plus size={16} />
                  </span>
                </button>
                <div className="grid transition-all duration-300 ease-out" style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}>
                  <div className="overflow-hidden">
                    <p className="px-5 pb-4 text-[14.5px] leading-relaxed text-ink-500">{it.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </Container>
    </section>
  );
};

const ClosingCTA = () => (
  <section className="py-16 sm:py-20">
    <Container>
      <Reveal>
        <div className="relative overflow-hidden rounded-panel bg-brand text-white px-7 sm:px-12 py-12 sm:py-14 shadow-lift">
          <div className="absolute -top-16 -right-10 h-64 w-64 rounded-full bg-brand-light/25 blur-2xl" />
          <div className="absolute inset-0 hatch opacity-[0.15]" />
          <div className="relative max-w-2xl">
            <h2 className="text-[30px] sm:text-[36px] leading-tight font-semibold tracking-tight">
              Be first in line when Yojika launches
            </h2>
            <p className="mt-3.5 text-[16.5px] text-white/75 max-w-xl">
              Join the waitlist for early access and launch pricing. One email, no spam — we'll only write when it's ready.
            </p>
            <div className="mt-7"><WaitlistForm dark cta="Join waitlist" /></div>
          </div>
        </div>
      </Reveal>
    </Container>
  </section>
);

export { FAQ, ClosingCTA };
