/* Yojika — Contact page. */
import React from 'react';
import { Container, Reveal, Eyebrow, Card, Field, Button } from '../ui.jsx';
import { CheckCircle, ArrowRight, Users, WifiOff, ScalesGlyph, Clock, Mail } from '../icons.jsx';

const ContactForm = () => {
  const [data, setData] = React.useState({ name: '', email: '', topic: 'For shop owners', message: '' });
  const [done, setDone] = React.useState(false);
  const [errs, setErrs] = React.useState({});
  const set = (k) => (e) => setData((d) => ({ ...d, [k]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (!data.name.trim()) next.name = 'Please tell us your name.';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) next.email = 'Enter a valid email.';
    if (data.message.trim().length < 8) next.message = 'A little more detail helps us help you.';
    setErrs(next);
    if (Object.keys(next).length === 0) setDone(true);
    // NOTE: wire to backend later — POST { ...data } to /api/contact
  };
  if (done) {
    return (
      <Card className="p-8 text-center">
        <span className="grid place-items-center w-14 h-14 rounded-full bg-ok/12 text-ok mx-auto"><CheckCircle size={30} /></span>
        <h3 className="mt-4 text-[20px] font-semibold text-ink-900">Message sent</h3>
        <p className="mt-2 text-[15px] text-ink-500">Thanks, {data.name.split(' ')[0]}. We’ll reply to <span className="font-num">{data.email}</span> within one business day.</p>
      </Card>
    );
  }
  return (
    <Card className="p-6 sm:p-7">
      <form onSubmit={submit} noValidate className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Field label="Your name" required value={data.name} onChange={set('name')} placeholder="Ramesh Kumar" />
            {errs.name && <p className="text-[12.5px] text-err mt-1">{errs.name}</p>}
          </div>
          <div>
            <Field label="Email" type="email" required value={data.email} onChange={set('email')} placeholder="you@shop.in" />
            {errs.email && <p className="text-[12.5px] text-err mt-1">{errs.email}</p>}
          </div>
        </div>
        <Field as="select" label="What’s this about?" value={data.topic} onChange={set('topic')}>
          <option>For shop owners</option>
          <option>Support</option>
          <option>Partnerships</option>
        </Field>
        <div>
          <Field as="textarea" label="Message" required value={data.message} onChange={set('message')} placeholder="Tell us a little about your shop and how we can help…" />
          {errs.message && <p className="text-[12.5px] text-err mt-1">{errs.message}</p>}
        </div>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <p className="font-num text-[12px] text-ink-400">Posts to a backend later</p>
          <Button type="submit" variant="primary" size="lg" iconRight={<ArrowRight size={18} />}>Send message</Button>
        </div>
      </form>
    </Card>
  );
};

const CONTACT_SPLIT = [
  { icon: <Users size={20} />, title: 'For shop owners', body: 'Questions before you try Yojika at your counter.', mail: 'hello@yojika.in' },
  { icon: <WifiOff size={20} />, title: 'Support', body: 'Already using Yojika and need a hand.', mail: 'support@yojika.in' },
  { icon: <ScalesGlyph size={20} />, title: 'Partnerships', body: 'Resellers, accountants and integrations.', mail: 'partners@yojika.in' },
];

const ContactPage = () => (
  <>
    <section className="relative overflow-hidden pt-12 pb-6 sm:pt-16">
      <div className="absolute -top-24 right-0 -z-10 h-[360px] w-[360px] rounded-full bg-brand-light/20 blur-3xl" />
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow icon={<Mail size={14} />}>Contact</Eyebrow>
          <h1 className="mt-4 text-[36px] sm:text-[46px] leading-[1.06] font-semibold tracking-tight text-ink-900">
            Talk to a real person
          </h1>
          <p className="mt-4 text-[17px] leading-relaxed text-ink-500">
            Whether you run the shop or you’re sorting out a problem, we read every message and usually reply within one business day.
          </p>
        </Reveal>
      </Container>
    </section>

    <section className="pb-14 sm:pb-18">
      <Container wide>
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-12">
          <Reveal><ContactForm /></Reveal>
          <Reveal delay={110} className="space-y-4">
            <div className="rounded-card bg-brand text-white p-6 shadow-soft">
              <div className="flex items-center gap-2.5">
                <Clock size={20} className="text-brand-light" />
                <p className="text-[15px] font-medium">Typical response time</p>
              </div>
              <p className="font-num text-[34px] font-semibold mt-2 leading-none">~1 business day</p>
              <p className="text-[13.5px] text-white/70 mt-2.5">We’re a small team and we answer our own email.</p>
              <a href="mailto:hello@yojika.in" className="mt-4 inline-flex items-center gap-2 rounded-btn bg-white/12 hover:bg-white/20 transition px-3.5 py-2 text-[14px] font-num">
                <Mail size={16} /> hello@yojika.in
              </a>
            </div>
            <div className="space-y-3">
              {CONTACT_SPLIT.map((c) => (
                <a key={c.title} href={'mailto:' + c.mail}
                  className="flex items-start gap-3.5 rounded-card bg-surface ring-1 ring-ink-900/8 p-4 hover:ring-brand/30 hover:-translate-y-0.5 transition-all">
                  <span className="shrink-0 grid place-items-center w-10 h-10 rounded-btn bg-brand-container/70 text-brand-deep">{c.icon}</span>
                  <div>
                    <p className="text-[15px] font-semibold text-ink-900">{c.title}</p>
                    <p className="text-[13.5px] text-ink-500 mt-0.5">{c.body}</p>
                    <p className="font-num text-[12.5px] text-brand-deep mt-1">{c.mail}</p>
                  </div>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  </>
);

export default ContactPage;
