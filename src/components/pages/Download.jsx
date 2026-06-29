/* Yojika — Download page. */
import { Container, Reveal, Eyebrow, Card, Button } from '../ui.jsx';
import { Windows, Download, Check, Shield, ArrowRight } from '../icons.jsx';

/* The installer lives on Cloudflare R2 (too large for Pages' 25 MB file cap),
   served from a custom domain. Keep this in sync with public/version.json — the
   app's in-app update prompt reads that manifest to know a new build exists. */
const INSTALLER_URL = 'https://dl.yojika.com/yojika-setup.exe';

const INSTALL_STEPS = [
  { n: '1', title: 'Download the installer', body: 'Save Yojika-Setup.exe to your PC. It’s a single file — no extra downloads needed.' },
  { n: '2', title: 'Run it & follow along', body: 'Double-click the file and accept the defaults. Installation takes under a minute.' },
  { n: '3', title: 'Activate once, bill forever', body: 'Enter your license key once to activate. After that, Yojika works fully offline.' },
];

const DownloadPage = () => (
  <>
    <section className="relative overflow-hidden pt-12 pb-6 sm:pt-16">
      <div className="absolute inset-0 -z-10 dotgrid opacity-50" />
      <Container wide>
        <div className="grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-14 items-center">
          <Reveal>
            <Eyebrow icon={<Windows size={14} />}>Yojika for Windows</Eyebrow>
            <h1 className="mt-4 text-[36px] sm:text-[46px] leading-[1.06] font-semibold tracking-tight text-ink-900">
              Download Yojika and start billing today
            </h1>
            <p className="mt-4 text-[17px] leading-relaxed text-ink-500 max-w-xl">
              One installer, no account required to begin. Built for Windows 10 and 11, ready for the counter in minutes.
            </p>
          </Reveal>

          {/* Download card */}
          <Reveal delay={110}>
            <Card className="p-6 sm:p-7">
              <div className="flex items-center gap-3.5">
                <span className="grid place-items-center w-14 h-14 rounded-card bg-brand text-white shadow-soft"><Windows size={30} /></span>
                <div>
                  <p className="text-[18px] font-semibold text-ink-900">Yojika for Windows</p>
                  <p className="font-num text-[12.5px] text-ink-400 mt-0.5">v1.0.1 · 64-bit · ~16 MB · .exe</p>
                </div>
              </div>
              <div className="mt-5">
                <Button as="a" href={INSTALLER_URL} download variant="primary" size="lg" icon={<Download size={19} />} className="w-full">
                  Download for Windows (.exe)
                </Button>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2.5 text-[13px]">
                <div className="flex items-center gap-2 text-ink-700"><Check size={16} className="text-ok" /> Works offline</div>
                <div className="flex items-center gap-2 text-ink-700"><Check size={16} className="text-ok" /> No account to start</div>
                <div className="flex items-center gap-2 text-ink-700"><Check size={16} className="text-ok" /> 22 languages built-in</div>
                <div className="flex items-center gap-2 text-ink-700"><Check size={16} className="text-ok" /> Local backup</div>
              </div>
            </Card>
          </Reveal>
        </div>
      </Container>
    </section>

    {/* System requirements + install */}
    <section className="py-12 sm:py-16">
      <Container wide>
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-8 lg:gap-12">
          <Reveal>
            <h2 className="text-[22px] font-semibold text-ink-900">System requirements</h2>
            <Card className="mt-5 divide-y divide-ink-900/8">
              {[['Operating system', 'Windows 10 / 11'], ['Architecture', '64-bit'], ['Memory', '4 GB RAM or more'], ['Disk space', '~250 MB free'], ['Internet', 'Only for one-time activation'], ['Printer', 'A4 / A5 / thermal (optional)']].map((r) => (
                <div key={r[0]} className="flex items-center justify-between px-4 py-3">
                  <span className="text-[14px] text-ink-500">{r[0]}</span>
                  <span className="font-num text-[13.5px] text-ink-900 text-right">{r[1]}</span>
                </div>
              ))}
            </Card>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="text-[22px] font-semibold text-ink-900">Install in three steps</h2>
            <div className="mt-5 space-y-3">
              {INSTALL_STEPS.map((s) => (
                <div key={s.n} className="flex gap-4 rounded-card bg-surface ring-1 ring-ink-900/8 p-4">
                  <span className="shrink-0 grid place-items-center w-9 h-9 rounded-btn bg-brand-container/70 text-brand-deep font-num font-semibold">{s.n}</span>
                  <div>
                    <p className="text-[15.5px] font-semibold text-ink-900">{s.title}</p>
                    <p className="mt-1 text-[14px] leading-relaxed text-ink-500">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* SmartScreen reassurance */}
            <div className="mt-5 rounded-card bg-amber-soft/50 ring-1 ring-amber/25 p-5">
              <div className="flex items-start gap-3">
                <span className="shrink-0 grid place-items-center w-9 h-9 rounded-btn bg-amber/15 text-amber"><Shield size={20} /></span>
                <div>
                  <p className="text-[15px] font-semibold text-ink-900">A quick note on the Windows warning</p>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-ink-700">
                    Our installer isn’t code-signed yet, so Windows SmartScreen may show a blue
                    “Windows protected your PC” screen the first time. That’s expected for a new, independent app — not a virus.
                    Just click <span className="font-medium text-ink-900">“More info”</span> →
                    <span className="font-medium text-ink-900"> “Run anyway”</span> to continue. A signed installer is on our roadmap.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>

    {/* Beta licence CTA */}
    <section className="pb-16">
      <Container>
        <Reveal>
          <Card className="p-7 sm:p-9 text-center">
            <h2 className="text-[24px] font-semibold text-ink-900">Need a licence to activate?</h2>
            <p className="mt-2.5 text-[15.5px] text-ink-500 max-w-lg mx-auto">
              Yojika is in beta — get the full app free for 3 months. Verify your email, tell us about your shop,
              and your licence key is yours instantly.
            </p>
            <div className="mt-6 flex justify-center">
              <Button to="/pricing" variant="primary" size="lg" iconRight={<ArrowRight size={18} />}>
                Get your free beta licence
              </Button>
            </div>
          </Card>
        </Reveal>
      </Container>
    </section>
  </>
);

export default DownloadPage;
