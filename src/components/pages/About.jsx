/* Yojika — About page. */
import { Container, Reveal, Eyebrow, SectionHead, Card } from '../ui.jsx';
import { ClosingCTA } from '../shared.jsx';
import { Rupee, Heart, Shield, ScalesGlyph, Sparkles } from '../icons.jsx';

const VALUES = [
  { icon: <Rupee size={22} />, title: 'Exactness', body: 'Tax to the rupee, invoice numbers that never collide, totals you can trust without a second glance. Money software has to be exact.' },
  { icon: <Heart size={22} />, title: 'Calm', body: 'No flashing alerts, no upsells mid-sale. The screen stays quiet so the person at the counter can think about the customer, not the software.' },
  { icon: <Shield size={22} />, title: 'Respect', body: 'Respect for a shopkeeper’s time, their language, and their data. It stays on their PC, in their words, under their control.' },
];

const AboutPage = () => (
  <>
    <section className="relative overflow-hidden pt-12 pb-6 sm:pt-16">
      <div className="absolute -top-28 -left-24 -z-10 h-[420px] w-[420px] rounded-full bg-brand-light/20 blur-3xl" />
      <Container>
        <Reveal className="max-w-3xl">
          <Eyebrow icon={<Heart size={14} />}>Our story</Eyebrow>
          <h1 className="mt-4 text-[36px] sm:text-[48px] leading-[1.06] font-semibold tracking-tight text-ink-900">
            Built in India, for the people behind the counter
          </h1>
          <p className="mt-5 text-[18px] leading-relaxed text-ink-500">
            Yojika started with a simple frustration: billing software for small shops had become loud, cloud-dependent,
            and oddly disrespectful of the people using it all day. We thought it should be the opposite — fast, private,
            and calm enough to disappear into the work.
          </p>
        </Reveal>
      </Container>
    </section>

    {/* Belief / pull quote */}
    <section className="py-12 sm:py-16">
      <Container wide>
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-14 items-center">
          <Reveal>
            <h2 className="text-[26px] sm:text-[30px] leading-snug font-semibold tracking-tight text-ink-900">
              We believe billing software should be three things, in this order.
            </h2>
            <div className="mt-6 space-y-4 text-[16px] leading-relaxed text-ink-700">
              <p><span className="font-semibold text-brand-deep">Fast</span>, because a shop bills fifty times a day and every extra click is a customer kept waiting.</p>
              <p><span className="font-semibold text-brand-deep">Private</span>, because a shop’s sales are nobody else’s business — least of all a server in another city.</p>
              <p><span className="font-semibold text-brand-deep">Offline</span>, because the counter can’t stop just because the internet did.</p>
            </div>
          </Reveal>
          <Reveal delay={110}>
            <figure className="relative rounded-panel bg-brand text-white p-8 shadow-lift overflow-hidden">
              <div className="absolute inset-0 hatch opacity-[0.12]" />
              <div className="relative">
                <span className="font-num text-[56px] leading-none text-brand-light/70">“</span>
                <blockquote className="text-[20px] leading-relaxed font-medium -mt-4">
                  We wanted to build the software we’d want our own parents to use at their shop — quick, in their language, and impossible to get wrong.
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="grid place-items-center w-10 h-10 rounded-full bg-white/15 text-white font-semibold">Y</span>
                  <span className="text-[13.5px] text-white/70">The Yojika founding team</span>
                </figcaption>
              </div>
            </figure>
          </Reveal>
        </div>
      </Container>
    </section>

    {/* Mission band */}
    <section className="py-14 bg-white border-y border-ink-900/8">
      <Container>
        <Reveal className="text-center mx-auto max-w-3xl">
          <Eyebrow icon={<ScalesGlyph size={14} />}>Our mission</Eyebrow>
          <p className="mt-5 text-[24px] sm:text-[28px] leading-snug font-medium text-ink-900 text-balance">
            To give every small Indian shop billing software that is <span className="text-brand">fast at the counter, exact on tax, and entirely their own</span> — working perfectly, even with no internet at all.
          </p>
        </Reveal>
      </Container>
    </section>

    {/* Values */}
    <section className="py-14 sm:py-18">
      <Container wide>
        <Reveal><SectionHead center eyebrow="What we value" eyebrowIcon={<Sparkles size={14} />}
          title="Three principles in every screen we ship" /></Reveal>
        <div className="mt-11 grid md:grid-cols-3 gap-5">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 90}>
              <Card className="p-7 h-full">
                <span className="grid place-items-center w-12 h-12 rounded-btn bg-brand-container/70 text-brand-deep">{v.icon}</span>
                <h3 className="mt-4 text-[19px] font-semibold text-ink-900">{v.title}</h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-ink-500">{v.body}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>

    <ClosingCTA />
  </>
);

export default AboutPage;
