import { cn } from '@/lib/utils'

const stats = [
  {
    label:   'Applications sent',
    value:   34,
    trend:   '+12 this week',
    up:      true,
    icon:    '📤',
    accent:  'text-blue-400',
    bg:      'bg-blue-500/8 border-blue-500/15',
  },
  {
    label:   'Profile views',
    value:   11,
    trend:   '+3 today',
    up:      true,
    icon:    '👁️',
    accent:  'text-violet-400',
    bg:      'bg-violet-500/8 border-violet-500/15',
  },
  {
    label:   'Callbacks received',
    value:   4,
    trend:   'No change',
    up:      false,
    icon:    '📞',
    accent:  'text-amber-400',
    bg:      'bg-amber-500/8 border-amber-500/15',
  },
  {
    label:   'Interviews',
    value:   2,
    trend:   '+1 scheduled',
    up:      true,
    icon:    '🎤',
    accent:  'text-emerald-400',
    bg:      'bg-emerald-500/8 border-emerald-500/15',
  },
]

export function DashboardStats() {
  return (
    <div className="grid grid-cols-4 gap-3">
      {stats.map(({ label, value, trend, up, icon, accent, bg }) => (
        <div
          key={label}
          className="rounded-2xl border border-white/8 bg-white/[0.02] p-4"
        >
          <div className="flex items-start justify-between mb-3">
            <div className={cn('w-9 h-9 rounded-xl border flex items-center justify-center text-base', bg)}>
              {icon}
            </div>
            <span className={cn(
              'text-[10px] font-medium px-2 py-0.5 rounded-full border',
              up
                ? 'text-emerald-400 bg-emerald-500/8 border-emerald-500/20'
                : 'text-white/25 bg-white/5 border-white/8'
            )}>
              {trend}
            </span>
          </div>
          <div className={cn('text-3xl font-medium mb-0.5', accent)}>{value}</div>
          <div className="text-xs text-white/35">{label}</div>
        </div>
      ))}
    </div>
  )
}