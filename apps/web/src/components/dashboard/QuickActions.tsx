import Link from 'next/link'

const actions = [
  {
    icon:  '🔍',
    label: 'Find jobs now',
    sub:   '5 new matches today',
    href:  '/dashboard/jobs',
    color: 'hover:border-blue-500/30 hover:bg-blue-500/5',
  },
  {
    icon:  '📄',
    label: 'Build resume',
    sub:   'ATS score: 82/100',
    href:  '/dashboard/resume',
    color: 'hover:border-violet-500/30 hover:bg-violet-500/5',
  },
  {
    icon:  '🎤',
    label: 'Practice interview',
    sub:   'Razorpay prep ready',
    href:  '/dashboard/interview',
    color: 'hover:border-amber-500/30 hover:bg-amber-500/5',
  },
  {
    icon:  '📊',
    label: 'View applications',
    sub:   '2 updates pending',
    href:  '/dashboard/tracker',
    color: 'hover:border-emerald-500/30 hover:bg-emerald-500/5',
  },
]

export function QuickActions() {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5 flex flex-col">
      <h3 className="text-sm font-medium text-white mb-4">Quick actions</h3>
      <div className="grid grid-cols-2 gap-2.5 flex-1">
        {actions.map(({ icon, label, sub, href, color }) => (
          <Link
            key={label}
            href={href}
            className={`flex flex-col gap-2 p-3.5 rounded-xl border border-white/8 bg-white/[0.02] transition-all duration-150 cursor-pointer ${color}`}
          >
            <span className="text-xl">{icon}</span>
            <div>
              <p className="text-xs font-medium text-white leading-snug">{label}</p>
              <p className="text-[10px] text-white/35 mt-0.5">{sub}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}