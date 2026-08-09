import Link from 'next/link'

const features = [
  { icon: '🤖', title: 'AI candidate ranking',      desc: 'Every applicant scored against your JD automatically. See who fits before opening a single resume.',  tag: 'Only on Nova' },
  { icon: '🛡️', title: 'Ghost-free job listings',   desc: 'Nova verifies your listing is active. Candidates trust Nova jobs more — higher quality applicants.',     tag: 'Only on Nova' },
  { icon: '💬', title: 'WhatsApp candidate outreach', desc: '90%+ open rate vs 20% on email. Nova messages shortlisted candidates on WhatsApp automatically.',       tag: 'Only on Nova' },
  { icon: '📅', title: 'Automated scheduling',        desc: 'Nova coordinates interview times, sends reminders, reschedules if needed. Zero back-and-forth emails.',  tag: 'Zero friction' },
  { icon: '📊', title: 'Hiring funnel analytics',     desc: 'Track time-to-hire, source quality, funnel drop-off, and candidate satisfaction in real time.',          tag: 'Pro feature'   },
  { icon: '✦',  title: 'Nova Trust Score candidates', desc: 'Candidates with verified skills, GitHub activity, and passed tests are flagged. No more AI-fake resumes.', tag: 'Industry first' },
]

const steps = [
  { num: '01', icon: '📝', title: 'Post your job',        desc: 'Describe the role in plain English. Nova extracts skills, salary, and requirements. Live in 5 minutes.' },
  { num: '02', icon: '🤖', title: 'Nova screens everyone', desc: 'Every applicant scored against your JD — ranked by match, experience, location, and salary fit.'      },
  { num: '03', icon: '✅', title: 'Review your shortlist', desc: 'See ranked candidates with match scores, skills breakdown, salary ask, and AI-verified resumes.'        },
  { num: '04', icon: '🎤', title: 'Interview and hire',    desc: 'Schedule directly from the dashboard. Nova handles reminders and keeps candidates warm throughout.'    },
]

const testimonials = [
  { name: 'Priya Reddy',  role: 'Talent Lead · Razorpay', av: 'PR', color: 'bg-emerald-500/20 text-emerald-300', text: 'We used to spend 3 hours a day filtering resumes. Nova shows ranked candidates with match scores — we now spend 20 minutes. Hired 3 engineers in 2 weeks.', metric: '3 hires in 2 weeks'     },
  { name: 'Arjun Kapoor', role: 'Head of HR · Zepto',     av: 'AK', color: 'bg-blue-500/20 text-blue-300',       text: 'The WhatsApp outreach feature is incredible. Our candidate response rate went from 18% on email to 82% on WhatsApp. Same-day scheduling now.', metric: '82% response rate' },
  { name: 'Sneha Mehta',  role: 'CEO · FinStart India',   av: 'SM', color: 'bg-amber-500/20 text-amber-300',     text: 'We\'re a 20-person startup with no dedicated recruiter. Nova runs our entire hiring pipeline. Like having a full-time TA for ₹5,000/month.',      metric: 'Full pipeline · ₹5K/mo' },
]

export function RecruiterLanding() {
  return (
    <div className="min-h-screen bg-[#050810]">

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050810]/90 backdrop-blur-xl border-b border-white/8 px-6 py-3.5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-xs font-bold text-emerald-400">✦</div>
          <span className="text-white font-medium">Nova</span>
          <span className="text-[10px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full ml-1">for employers</span>
        </Link>
        <div className="flex items-center gap-5">
          {['How it works', 'Features', 'Pricing'].map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(/ /g, '-')}`} className="text-sm text-white/45 hover:text-white transition-colors">{l}</a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Link href="/hire/signup" className="text-sm text-white/50 hover:text-white transition-colors">Log in</Link>
          <Link href="/" className="text-sm text-white/40 hover:text-white/70 border border-white/10 px-3 py-1.5 rounded-xl transition-all">Looking for a job? →</Link>
          <Link href="/hire/signup" className="text-sm font-medium bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-1.5 rounded-xl transition-all">Post a job free →</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 text-center relative overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-emerald-600/6 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/8 text-emerald-300 text-xs font-medium mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            AI-powered hiring for India · ₹0 to start
          </div>
          <h1 className="text-5xl md:text-[62px] font-medium leading-[1.05] tracking-tight text-white mb-5">
            Hire better candidates,
            <br />
            <span style={{ background: 'linear-gradient(135deg, #34d399, #10b981, #059669)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              10× faster.
            </span>
          </h1>
          <p className="text-lg text-white/45 max-w-2xl mx-auto mb-10 leading-relaxed">
            Nova pre-screens every applicant, ranks them by match score, and fills your pipeline with verified candidates — not AI-generated spam. First shortlist in 24 hours.
          </p>
          <div className="flex items-center justify-center gap-3 mb-10">
            <Link href="/hire/signup" className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-7 py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-900/30">
              Post a job — free
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
            </Link>
            <a href="#how-it-works" className="flex items-center gap-2 border border-white/10 hover:border-white/20 text-white/50 hover:text-white px-6 py-3.5 rounded-xl transition-all text-sm">
              See how it works →
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-5 text-xs text-white/25">
            {['No credit card needed', 'First shortlist in 24h', 'Cancel anytime', 'GST invoice included'].map(t => (
              <span key={t}>✓ {t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Company logos */}
      <section className="py-8 border-y border-white/6 bg-[#07090f] px-6">
        <p className="text-center text-xs text-white/20 mb-5 tracking-widest uppercase">Trusted by hiring teams at</p>
        <div className="flex justify-center flex-wrap gap-4">
          {['Razorpay', 'Zepto', 'CRED', 'PhonePe', 'Swiggy', 'Meesho', 'Flipkart', 'Ola'].map(co => (
            <div key={co} className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-white/6 bg-white/[0.02] text-white/30 text-xs">
              <div className="w-4 h-4 rounded bg-white/6 flex items-center justify-center text-[8px] font-bold text-white/40">
                {co.slice(0, 2).toUpperCase()}
              </div>
              {co}
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-4 border-b border-white/8">
        {[
          { n: '18 days', l: 'Average time to hire' },
          { n: '96%',     l: 'Top candidate match accuracy' },
          { n: '3.2×',    l: 'More qualified applicants vs Naukri' },
          { n: '500+',    l: 'Companies hiring on Nova' },
        ].map(({ n, l }) => (
          <div key={l} className="py-8 text-center border-r border-white/8 last:border-r-0 bg-[#07090f]">
            <p className="text-3xl font-medium text-emerald-400 mb-1">{n}</p>
            <p className="text-xs text-white/35">{l}</p>
          </div>
        ))}
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 px-6 bg-[#050810]">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-medium uppercase tracking-widest text-emerald-400 mb-3 text-center">How Nova hiring works</p>
          <h2 className="text-4xl font-medium text-white text-center mb-12">From job post to shortlist in 24 hours</h2>
          <div className="grid grid-cols-4 gap-4">
            {steps.map(({ num, icon, title, desc }) => (
              <div key={num} className="bg-emerald-500/5 border border-emerald-500/15 rounded-2xl p-5">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-2xl">{icon}</span>
                  <span className="text-xs font-mono text-emerald-400/40">{num}</span>
                </div>
                <h3 className="text-sm font-medium text-white mb-2">{title}</h3>
                <p className="text-xs text-white/40 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6 bg-[#07090f]">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-medium uppercase tracking-widest text-emerald-400 mb-3 text-center">Features</p>
          <h2 className="text-4xl font-medium text-white text-center mb-12">Everything your hiring team needs</h2>
          <div className="grid grid-cols-3 gap-4">
            {features.map(({ icon, title, desc, tag }) => (
              <div key={title} className="rounded-2xl border border-white/8 bg-white/[0.02] p-5 hover:border-emerald-500/25 transition-all">
                <div className="text-2xl mb-3">{icon}</div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-sm font-medium text-white">{title}</h3>
                </div>
                <span className="inline-block text-[10px] font-medium px-1.5 py-0.5 rounded-md border bg-emerald-500/8 text-emerald-400 border-emerald-500/20 mb-2">
                  {tag}
                </span>
                <p className="text-xs text-white/40 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-[#050810]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-medium text-white text-center mb-12">Companies that switched to Nova</h2>
          <div className="grid grid-cols-3 gap-5">
            {testimonials.map(({ name, role, av, color, text, metric }) => (
              <div key={name} className="rounded-2xl border border-white/8 bg-white/[0.02] p-6 flex flex-col gap-4">
                <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <span key={i} className="text-amber-400 text-sm">★</span>)}</div>
                <p className="text-sm text-white/55 leading-relaxed flex-1">"{text}"</p>
                <span className="text-xs font-medium text-emerald-400 bg-emerald-500/8 border border-emerald-500/20 px-2.5 py-1 rounded-full inline-block self-start">✓ {metric}</span>
                <div className="flex items-center gap-2.5 pt-2 border-t border-white/8">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${color}`}>{av}</div>
                  <div><p className="text-xs font-medium text-white">{name}</p><p className="text-[10px] text-white/30">{role}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6 bg-[#07090f]">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-medium uppercase tracking-widest text-emerald-400 mb-3 text-center">Pricing</p>
          <h2 className="text-4xl font-medium text-white text-center mb-3">Transparent pricing</h2>
          <p className="text-white/40 text-center mb-12 text-sm">No per-resume fees. Start free, scale when ready.</p>
          <div className="grid grid-cols-3 gap-5">
            {[
              { name: 'Starter', price: 'Free',    cycle: '',        desc: 'For early-stage startups', best: false, feats: ['1 active job post', 'Up to 30 applicants', 'AI match scoring', 'Basic dashboard'],              btn: 'Post a job free →',    href: '/hire/signup' },
              { name: 'Growth',  price: '₹4,999',  cycle: '/month',  desc: 'For growing teams',       best: true,  feats: ['5 active job posts', 'Unlimited applicants', 'WhatsApp outreach · 100 msgs', 'Auto scheduling', 'Analytics · 3 seats'], btn: 'Start free trial →', href: '/hire/signup?plan=growth' },
              { name: 'Scale',   price: '₹14,999', cycle: '/month',  desc: 'For high-volume hiring',  best: false, feats: ['Unlimited job posts', 'Priority sourcing', 'Unlimited WhatsApp', 'Dedicated account manager', 'Unlimited seats'],  btn: 'Contact sales →',    href: '/hire/signup' },
            ].map(({ name, price, cycle, desc, best, feats, btn, href }) => (
              <div key={name} className={`rounded-2xl p-6 border relative flex flex-col ${best ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-white/8 bg-white/[0.02]'}`}>
                {best && <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-medium px-3 py-1 bg-emerald-600 text-white rounded-full">Most popular</div>}
                <p className="text-sm font-medium text-white/60 mb-1">{name}</p>
                <div className="flex items-baseline gap-0.5 mb-1"><span className="text-2xl font-medium text-white">{price}</span><span className="text-xs text-white/30">{cycle}</span></div>
                <p className="text-xs text-white/30 mb-4">{desc}</p>
                <ul className="space-y-2 mb-5 flex-1">
                  {feats.map(f => <li key={f} className="flex items-start gap-1.5 text-xs text-white/55"><span className="text-emerald-400 flex-shrink-0 mt-0.5">✓</span>{f}</li>)}
                </ul>
                <Link href={href} className={`w-full py-2.5 rounded-xl text-xs font-medium text-center transition-all block ${best ? 'bg-emerald-600 hover:bg-emerald-500 text-white' : 'border border-white/15 hover:border-white/30 text-white/50 hover:text-white'}`}>
                  {btn}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-[#050810]">
        <div className="max-w-2xl mx-auto text-center">
          <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-12">
            <h2 className="text-4xl font-medium text-white mb-3">Your next great hire is<br /><span style={{ color: '#34d399' }}>one job post away.</span></h2>
            <p className="text-white/40 text-sm mb-8">Join 500+ companies that hire faster on Nova.</p>
            <Link href="/hire/signup" className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-8 py-3.5 rounded-xl transition-all">
              Post a job — free
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
            </Link>
            <div className="flex justify-center gap-5 mt-6 text-xs text-white/25">
              {['No credit card', 'First shortlist in 24h', 'Cancel anytime'].map(t => <span key={t}>✓ {t}</span>)}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/8 bg-[#07090f] px-6 py-8">
        <div className="max-w-5xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-[10px] text-emerald-400 font-bold">✦</div>
            <span className="text-sm text-white/60">Nova Hire · Made in India</span>
          </div>
          <Link href="/" className="text-xs text-violet-400 hover:text-violet-300 transition-colors">
            Looking for a job instead? →
          </Link>
          <div className="flex gap-4">
            {['Privacy', 'Terms', 'Contact'].map(l => <a key={l} href="#" className="text-xs text-white/25 hover:text-white/50 transition-colors">{l}</a>)}
          </div>
        </div>
      </footer>
    </div>
  )
}