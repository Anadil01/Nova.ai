import Link from 'next/link'
import { cn } from '@/lib/utils'

const plans = [
  {
    name: 'Free',
    price: '₹0',
    cycle: 'forever',
    desc: 'Get started, see results',
    highlight: false,
    features: [
      '5 job matches per week',
      '1 AI resume (generic)',
      '3 applications per month',
      'Application tracker',
      'WhatsApp job digest',
    ],
    missing: ['Tailored resume per job', 'Auto-apply', 'Interview coach', 'Skill tests'],
    cta: 'Start free',
    href: '/auth/onboard',
  },
  {
    name: 'Pro',
    price: '₹299',
    cycle: '/ month',
    desc: 'Serious job seekers',
    highlight: true,
    badge: 'Most popular',
    features: [
      'Unlimited job matches',
      'Tailored resume per application',
      '50 auto-applications / month',
      'Cover letter per job',
      'Voice interview coach',
      'Skill test + trust score',
      'Priority WhatsApp updates',
    ],
    missing: [],
    cta: 'Get Pro',
    href: '/auth/onboard?plan=pro',
  },
  {
    name: 'Power',
    price: '₹699',
    cycle: '/ month',
    desc: 'Maximum velocity',
    highlight: false,
    features: [
      'Everything in Pro',
      'Unlimited applications',
      'Unlimited interview sessions',
      'LinkedIn profile optimiser',
      'Career path AI roadmap',
      'Salary negotiation coach',
      '1 live coaching call / month',
    ],
    missing: [],
    cta: 'Get Power',
    href: '/auth/onboard?plan=power',
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 px-5 bg-[#07090f]">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-14">
          <p className="text-xs font-medium uppercase tracking-widest text-violet-400 mb-3">Pricing</p>
          <h2 className="text-4xl md:text-5xl font-medium text-white tracking-tight mb-4">
            Simple pricing.
            <br />
            <span className="gradient-text">Cancel anytime.</span>
          </h2>
          <p className="text-white/45 text-base">
            Start free. Upgrade when you're ready. Billed monthly via Razorpay.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map(({ name, price, cycle, desc, highlight, badge, features, missing, cta, href }) => (
            <div
              key={name}
              className={cn(
                'rounded-2xl p-6 flex flex-col gap-5 relative',
                highlight
                  ? 'border-2 border-violet-500/60 bg-violet-500/5'
                  : 'border border-white/8 bg-white/[0.02]'
              )}
            >
              {badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-violet-600 text-white text-[10px] font-medium px-3 py-1 rounded-full">
                  {badge}
                </div>
              )}

              <div>
                <p className="text-sm font-medium text-white/60 mb-1">{name}</p>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-medium text-white">{price}</span>
                  <span className="text-sm text-white/35">{cycle}</span>
                </div>
                <p className="text-xs text-white/35">{desc}</p>
              </div>

              <Link
                href={href}
                className={cn(
                  'w-full py-2.5 rounded-xl text-sm font-medium text-center transition-all',
                  highlight
                    ? 'bg-violet-600 hover:bg-violet-500 text-white'
                    : 'border border-white/15 hover:border-white/30 text-white/70 hover:text-white'
                )}
              >
                {cta} →
              </Link>

              <div className="space-y-2">
                {features.map(f => (
                  <div key={f} className="flex items-start gap-2 text-xs text-white/60">
                    <span className="text-emerald-400 mt-0.5 flex-shrink-0">✓</span>
                    {f}
                  </div>
                ))}
                {missing.map(f => (
                  <div key={f} className="flex items-start gap-2 text-xs text-white/20">
                    <span className="flex-shrink-0 mt-0.5">—</span>
                    {f}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-white/25 mt-8">
          All plans · UPI / card / net banking via Razorpay · GST invoice included · cancel anytime
        </p>
      </div>
    </section>
  )
}