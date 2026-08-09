'use client'
import { cn } from '@/lib/utils'

const plans = [
  {
    name: 'Free', price: '₹0', cycle: 'forever',
    current: true,
    feats: ['5 job matches/week', '1 AI resume', '3 applications/month', 'Application tracker'],
    missing: ['Tailored resume per job', 'Auto-apply', 'Interview coach'],
  },
  {
    name: 'Pro', price: '₹299', cycle: '/month',
    current: false, best: true,
    feats: ['Unlimited job matches', 'Tailored resume per job', '50 applications/month', 'Cover letter per job', 'Interview coach', 'Skill tests + trust score'],
    missing: [],
  },
  {
    name: 'Power', price: '₹699', cycle: '/month',
    current: false, best: false,
    feats: ['Everything in Pro', 'Unlimited applications', 'Unlimited interview sessions', 'Career path AI', 'Salary coach', '1 live coaching call/mo'],
    missing: [],
  },
]

const USAGE = [
  { label: 'Auto-applications',  used: 3,  total: 3,  warn: true  },
  { label: 'Job matches/week',   used: 4,  total: 5,  warn: false },
  { label: 'AI resumes',         used: 1,  total: 1,  warn: true  },
]

export function BillingSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-medium text-white mb-0.5">Billing & plan</h2>
        <p className="text-xs text-white/35">Manage your subscription and usage</p>
      </div>

      {/* Current plan */}
      <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400">
                Free plan
              </span>
            </div>
            <p className="text-xl font-medium text-white">Free</p>
            <p className="text-xs text-white/35 mt-0.5">₹0 / month · no expiry</p>
          </div>
          <button className="text-xs bg-violet-600 hover:bg-violet-500 text-white px-3.5 py-2 rounded-xl transition-all">
            Upgrade now →
          </button>
        </div>

        {/* Usage bars */}
        <div className="space-y-3 mb-4">
          {USAGE.map(({ label, used, total, warn }) => {
            const pct = (used / total) * 100
            return (
              <div key={label}>
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-white/45">{label}</span>
                  <span className={cn('text-xs font-medium', warn ? 'text-red-400' : 'text-white/60')}>
                    {used} / {total} used
                  </span>
                </div>
                <div className="h-1.5 bg-white/6 rounded-full overflow-hidden">
                  <div
                    className={cn('h-full rounded-full transition-all', warn ? 'bg-red-500' : pct > 80 ? 'bg-amber-500' : 'bg-emerald-500')}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>

        {/* Upgrade nudge */}
        <div className="flex items-start gap-3 bg-violet-500/8 border border-violet-500/20 rounded-xl p-3">
          <span className="text-lg">🚀</span>
          <div className="flex-1">
            <p className="text-xs font-medium text-violet-300 mb-0.5">You've hit your free limits</p>
            <p className="text-[11px] text-violet-400/70">Upgrade to Pro for 50 auto-applications, unlimited resumes, and interview prep — ₹299/mo</p>
          </div>
          <button className="text-xs bg-violet-600 hover:bg-violet-500 text-white px-3 py-1.5 rounded-lg transition-all whitespace-nowrap flex-shrink-0">
            Upgrade
          </button>
        </div>
      </div>

      {/* Plans comparison */}
      <div>
        <p className="text-xs font-medium text-white/50 mb-3">Compare plans</p>
        <div className="grid grid-cols-3 gap-3">
          {plans.map(({ name, price, cycle, current, best, feats, missing }) => (
            <div
              key={name}
              className={cn(
                'rounded-2xl p-4 border relative',
                current ? 'border-amber-500/25 bg-amber-500/5' :
                best    ? 'border-violet-500/40 bg-violet-500/5' :
                          'border-white/8 bg-white/[0.02]'
              )}
            >
              {best && (
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[10px] font-medium px-2.5 py-0.5 bg-violet-600 text-white rounded-full whitespace-nowrap">
                  Most popular
                </div>
              )}
              {current && (
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[10px] font-medium px-2.5 py-0.5 bg-amber-500/80 text-white rounded-full whitespace-nowrap">
                  Current
                </div>
              )}
              <p className="text-sm font-medium text-white mb-0.5">{name}</p>
              <div className="flex items-baseline gap-0.5 mb-3">
                <span className="text-xl font-medium text-white">{price}</span>
                <span className="text-xs text-white/30">{cycle}</span>
              </div>
              <div className="space-y-1.5 mb-4">
                {feats.map(f => (
                  <div key={f} className="flex items-start gap-1.5 text-[11px] text-white/55">
                    <span className="text-emerald-400 flex-shrink-0 mt-0.5">✓</span>{f}
                  </div>
                ))}
                {missing.map(f => (
                  <div key={f} className="flex items-start gap-1.5 text-[11px] text-white/20">
                    <span className="flex-shrink-0 mt-0.5">—</span>{f}
                  </div>
                ))}
              </div>
              <button className={cn(
                'w-full py-2 rounded-xl text-xs font-medium border transition-all',
                current ? 'border-white/10 text-white/30 cursor-default' :
                best    ? 'bg-violet-600 hover:bg-violet-500 text-white border-violet-500' :
                          'border-white/15 hover:border-white/30 text-white/50 hover:text-white'
              )}>
                {current ? 'Current plan' : `Get ${name} →`}
              </button>
            </div>
          ))}
        </div>
        <p className="text-center text-[10px] text-white/20 mt-3">
          All plans · UPI / card / net banking via Razorpay · cancel anytime
        </p>
      </div>

      {/* Invoice history */}
      <div>
        <p className="text-xs font-medium text-white/50 mb-3">Payment history</p>
        <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-6 text-center">
          <p className="text-2xl mb-2">🧾</p>
          <p className="text-xs text-white/30">No invoices yet · you're on the free plan</p>
          <p className="text-[10px] text-white/20 mt-1">Invoices appear here after your first payment</p>
        </div>
      </div>
    </div>
  )
}