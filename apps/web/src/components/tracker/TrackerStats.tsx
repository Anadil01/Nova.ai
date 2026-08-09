import type { Application } from './TrackerPage'

interface Props { apps: Application[] }

export function TrackerStats({ apps }: Props) {
  const total     = apps.length
  const viewed    = apps.filter(a => a.status === 'VIEWED'    || ['INTERVIEW','OFFER'].includes(a.status)).length
  const callbacks = apps.filter(a => ['INTERVIEW','OFFER'].includes(a.status)).length
  const interviews= apps.filter(a => a.status === 'INTERVIEW').length
  const offers    = apps.filter(a => a.status === 'OFFER').length
  const rejected  = apps.filter(a => a.status === 'REJECTED').length

  const stats = [
    { label: 'Total applied',      value: total,     color: 'text-blue-400'    },
    { label: 'Viewed by recruiter', value: viewed,   color: 'text-violet-400'  },
    { label: 'Callbacks',          value: callbacks,  color: 'text-emerald-400' },
    { label: 'Interviews',         value: interviews, color: 'text-amber-400'   },
    { label: 'Offers 🎉',          value: offers,     color: 'text-emerald-400' },
    { label: 'Rejected',           value: rejected,   color: 'text-red-400'     },
  ]

  return (
    <div className="grid grid-cols-6 border-b border-white/8 flex-shrink-0">
      {stats.map(({ label, value, color }) => (
        <div
          key={label}
          className="px-5 py-4 text-center border-r border-white/8 last:border-r-0 bg-[#08090f]"
        >
          <p className={`text-2xl font-medium mb-0.5 ${color}`}>{value}</p>
          <p className="text-[10px] text-white/30">{label}</p>
        </div>
      ))}
    </div>
  )
}