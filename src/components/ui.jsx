/* Yojika — shared UI primitives, links, and layout helpers. */
import React from 'react';
import { LeafGlyph } from './icons.jsx';

/* ---------- Links (real multi-page URLs) ---------- */
function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) { window.scrollTo({ top: 0 }); return; }
  const y = el.getBoundingClientRect().top + window.pageYOffset - 78;
  window.scrollTo({ top: y, behavior: 'smooth' });
}

const Link = ({ to = '/', anchor, className = '', children, ...rest }) => {
  const base = to === '/' ? '' : to;
  const href = anchor ? `${base}#${anchor}` : to;
  return (
    <a href={href} className={className} {...rest}>
      {children}
    </a>
  );
};

/* ---------- Logo ---------- */
const Logo = ({ size = 'md', dark = false, className = '' }) => {
  const dim = size === 'lg' ? 40 : size === 'sm' ? 28 : 34;
  const text = size === 'lg' ? 'text-[26px]' : size === 'sm' ? 'text-lg' : 'text-[21px]';
  return (
    <span className={'inline-flex items-center gap-2.5 select-none ' + className}>
      <span className="grid place-items-center rounded-[9px] bg-brand text-white shadow-soft"
            style={{ width: dim, height: dim }}>
        <LeafGlyph size={dim * 0.62} />
      </span>
      <span className={'font-semibold tracking-tight ' + text + ' ' + (dark ? 'text-white' : 'text-ink-900')}>
        Yojika
      </span>
    </span>
  );
};

/* ---------- Button ---------- */
const Button = ({ as = 'button', variant = 'primary', size = 'md', icon, iconRight, to, anchor, className = '', children, ...rest }) => {
  const base = 'inline-flex items-center justify-center gap-2 font-medium rounded-btn whitespace-nowrap transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2 disabled:opacity-50';
  const sizes = { sm: 'text-sm px-3.5 py-2', md: 'text-[15px] px-5 py-2.5', lg: 'text-base px-6 py-3' };
  const variants = {
    primary: 'bg-brand text-white shadow-soft hover:bg-brand-deep hover:shadow-card active:translate-y-px',
    secondary: 'bg-white text-ink-900 ring-1 ring-ink-900/12 hover:ring-ink-900/25 hover:bg-canvas active:translate-y-px',
    ghost: 'text-brand-deep hover:bg-brand-container/60',
    dark: 'bg-white text-ink-900 hover:bg-brand-container active:translate-y-px',
    amber: 'bg-amber text-white hover:brightness-95 active:translate-y-px shadow-soft',
  };
  const cls = [base, sizes[size], variants[variant], className].join(' ');
  const content = <>{icon}{children}{iconRight}</>;
  if (to !== undefined) {
    return <Link to={to} anchor={anchor} className={cls} {...rest}>{content}</Link>;
  }
  const Tag = as;
  return <Tag className={cls} {...rest}>{content}</Tag>;
};

/* ---------- Layout ---------- */
const Container = ({ wide = false, className = '', children }) => (
  <div className={'mx-auto w-full px-5 sm:px-7 ' + (wide ? 'max-w-[1240px]' : 'max-w-[1140px]') + ' ' + className}>
    {children}
  </div>
);

const Eyebrow = ({ icon, children, tone = 'brand', className = '' }) => {
  const tones = {
    brand: 'text-brand-deep bg-brand-container/70',
    amber: 'text-amber bg-amber-soft/70',
    light: 'text-brand-light bg-white/10',
  };
  return (
    <span className={'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12.5px] font-mono font-medium uppercase tracking-[0.13em] ' + tones[tone] + ' ' + className}>
      {icon}{children}
    </span>
  );
};

/* ---------- Reveal on scroll ---------- */
const Reveal = ({ as = 'div', delay = 0, className = '', children, ...rest }) => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let settle = null;
    // Hard-guarantee the visible end-state even if the transition never ticks.
    const force = () => {
      if (!el) return;
      const op = parseFloat(getComputedStyle(el).opacity);
      if (op < 0.99) { el.style.transition = 'none'; el.style.opacity = '1'; el.style.transform = 'none'; }
    };
    const show = () => {
      el.classList.add('in');
      settle = setTimeout(force, delay + 820);
    };
    const onScreen = () => {
      const r = el.getBoundingClientRect();
      return r.top < (window.innerHeight || 800) * 0.96 && r.bottom > 0;
    };
    if (onScreen()) { show(); return () => clearTimeout(settle); }
    if (typeof IntersectionObserver === 'undefined') { show(); return () => clearTimeout(settle); }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { show(); io.unobserve(el); } });
    }, { threshold: 0.01, rootMargin: '0px 0px -6% 0px' });
    io.observe(el);
    const t = setTimeout(show, 1400);
    return () => { io.disconnect(); clearTimeout(t); clearTimeout(settle); };
  }, []);
  const Tag = as;
  return (
    <Tag ref={ref} className={'reveal ' + className} style={{ transitionDelay: delay + 'ms' }} {...rest}>
      {children}
    </Tag>
  );
};

/* ---------- Section heading ---------- */
const SectionHead = ({ eyebrow, eyebrowIcon, eyebrowTone, title, lead, center = false, dark = false, className = '' }) => (
  <div className={(center ? 'text-center mx-auto max-w-2xl ' : 'max-w-2xl ') + className}>
    {eyebrow && <Eyebrow icon={eyebrowIcon} tone={eyebrowTone || (dark ? 'light' : 'brand')}>{eyebrow}</Eyebrow>}
    <h2 className={'mt-4 text-[28px] sm:text-[34px] leading-[1.12] font-semibold tracking-tight ' + (dark ? 'text-white' : 'text-ink-900')}>
      {title}
    </h2>
    {lead && <p className={'mt-3.5 text-[16.5px] leading-relaxed ' + (dark ? 'text-white/70' : 'text-ink-500')}>{lead}</p>}
  </div>
);

/* ---------- Card ---------- */
const Card = ({ className = '', children, hover = false, ...rest }) => (
  <div className={'rounded-card bg-surface ring-1 ring-ink-900/8 shadow-soft ' +
    (hover ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-card hover:ring-brand/25 ' : '') + className} {...rest}>
    {children}
  </div>
);

/* ---------- Form field ---------- */
const Field = ({ label, hint, type = 'text', as = 'input', children, required = false, ...rest }) => {
  const cls = 'w-full rounded-btn bg-white ring-1 ring-ink-900/15 px-3.5 py-2.5 text-[15px] text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-brand transition';
  return (
    <label className="block">
      {label && <span className="block text-[13.5px] font-medium text-ink-700 mb-1.5">{label}{required && <span className="text-err"> *</span>}</span>}
      {as === 'textarea'
        ? <textarea className={cls + ' resize-y min-h-[120px]'} {...rest} />
        : as === 'select'
          ? <select className={cls} {...rest}>{children}</select>
          : <input type={type} className={cls} {...rest} />}
      {hint && <span className="block text-[12.5px] text-ink-400 mt-1.5">{hint}</span>}
    </label>
  );
};

export {
  scrollToId, Link, Logo, Button, Container,
  Eyebrow, Reveal, SectionHead, Card, Field,
};
