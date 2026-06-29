/* Yojika — site chrome: header, mobile menu, footer. */
import React from 'react';
import { Container, Button, Link, Logo } from './ui.jsx';
import { Windows, Menu, Close, ArrowRight, Heart } from './icons.jsx';
import { useSession } from '../lib/useSession.js';

const NAV = [
  { to: '/', label: 'Home' },
  { to: '/features', label: 'Features' },
  { to: '/pricing', label: 'Get licence' },
  { to: '/download', label: 'Download' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

const normPath = (p) => {
  if (!p) return '/';
  return p !== '/' && p.endsWith('/') ? p.slice(0, -1) : p;
};

const Header = ({ pathname = '/' }) => {
  const path = normPath(pathname);
  const { session, loading } = useSession();
  const authed = !loading && !!session;
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    const on = () => setScrolled(window.pageYOffset > 8);
    on(); window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);
  const active = (to) => (to === '/' ? path === '/' : path === to || path.startsWith(to + '/'));

  return (
    <header className={'sticky top-0 z-50 transition-all duration-300 ' +
      (scrolled ? 'bg-canvas/85 backdrop-blur-md border-b border-ink-900/8 shadow-soft' : 'bg-transparent border-b border-transparent')}>
      <Container wide className="flex items-center justify-between h-[64px]">
        <Link to="/" aria-label="Yojika home"><Logo /></Link>

        <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to}
              className={'px-3.5 py-2 rounded-btn text-[14.5px] font-medium transition-colors ' +
                (active(n.to) ? 'text-brand-deep bg-brand-container/60' : 'text-ink-700 hover:text-ink-900 hover:bg-ink-900/5')}>
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2.5">
          <Button to="/download" variant="secondary" size="sm" icon={<Windows size={16} />}>Download</Button>
          {authed ? (
            <Button to="/account" variant="primary" size="sm">Account</Button>
          ) : (
            <>
              <Button to="/login" variant="ghost" size="sm">Log in</Button>
              <Button to="/pricing" variant="primary" size="sm">Get free licence</Button>
            </>
          )}
        </div>

        <button className="lg:hidden grid place-items-center w-10 h-10 rounded-btn text-ink-900 hover:bg-ink-900/5"
          onClick={() => setOpen((v) => !v)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
          {open ? <Close size={22} /> : <Menu size={22} />}
        </button>
      </Container>

      {/* Mobile menu */}
      <div className={'lg:hidden fixed inset-x-0 top-[64px] bottom-0 z-40 bg-canvas transition-all duration-300 ' +
        (open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none')}>
        <Container className="py-6 flex flex-col h-full">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to}
                className={'flex items-center justify-between px-4 py-3.5 rounded-card text-[17px] font-medium transition-colors ' +
                  (active(n.to) ? 'text-brand-deep bg-brand-container/60' : 'text-ink-900 hover:bg-ink-900/5')}>
                {n.label}<ArrowRight size={18} className="text-ink-400" />
              </Link>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-2.5 pt-6">
            <Button to="/download" variant="secondary" size="lg" icon={<Windows size={18} />}>Download for Windows</Button>
            {authed ? (
              <Button to="/account" variant="primary" size="lg">Your account</Button>
            ) : (
              <>
                <Button to="/login" variant="secondary" size="lg">Log in</Button>
                <Button to="/pricing" variant="primary" size="lg">Get free licence</Button>
              </>
            )}
          </div>
        </Container>
      </div>
    </header>
  );
};

const Footer = () => (
  <footer className="bg-night-canvas text-white/80">
    <Container wide className="py-14">
      <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-sm">
          <Logo dark />
          <p className="mt-4 text-[14.5px] leading-relaxed text-white/55">
            Offline-first GST billing for Indian small shops. Fast at the counter, exact on tax, private by design.
          </p>
          <div className="mt-5 flex items-center gap-2 text-[13px] text-white/55">
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-white/5 ring-1 ring-white/10 px-3 py-1.5">
              <Heart size={14} className="text-brand-light" /> Made in India
            </span>
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-white/5 ring-1 ring-white/10 px-3 py-1.5">
              <Windows size={14} className="text-brand-light" /> for Windows
            </span>
          </div>
        </div>
        <div>
          <p className="text-[12px] uppercase tracking-[0.15em] text-white/40 font-mono">Product</p>
          <ul className="mt-4 space-y-2.5 text-[14.5px]">
            {NAV.slice(1).map((n) => (
              <li key={n.to}><Link to={n.to} className="text-white/65 hover:text-white transition-colors">{n.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[12px] uppercase tracking-[0.15em] text-white/40 font-mono">Get in touch</p>
          <ul className="mt-4 space-y-2.5 text-[14.5px]">
            <li><a href="mailto:hello@yojika.in" className="text-white/65 hover:text-white transition-colors font-num">hello@yojika.in</a></li>
            <li><Link to="/contact" className="text-white/65 hover:text-white transition-colors">Support &amp; partnerships</Link></li>
            <li><Link to="/pricing" className="text-white/65 hover:text-white transition-colors">Get your free beta licence</Link></li>
          </ul>
        </div>
      </div>
      <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[13px] text-white/45">
        <p>© 2026 Yojika. All rights reserved.</p>
        <div className="flex items-center gap-5">
          <span className="font-num text-white/55">yojika.com</span>
          <span>Privacy</span>
          <span>Terms</span>
        </div>
      </div>
    </Container>
  </footer>
);

export { NAV, Header, Footer };
