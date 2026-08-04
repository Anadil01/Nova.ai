import { Send, Eye, MessageCircle, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'

const stats = [
  {
    label: 'Applications sent',
    value: '34',
    trend: '+12',
    icon: Send,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    trendUp: true,
  },
  {
    label: 'Profile views',
    value: '11',
    trend: '+3',
    icon: Eye,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    trendUp: true,
  },
  {
    label: 'Callbacks received',
    value: '4',
    trend: '0',
    icon: MessageCircle,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    trendUp: false,
  },
  {
    label: 'Interviews',
    value: '2',
    trend: '+1',
    icon: Calendar,
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
    trendUp: true,
  },
]

export function DashboardStats() {
  return (
    <div className="grid grid-cols-4 gap-3">
      {stats.map(({ label, value, trend, icon: Icon, color, bg, trendUp }) => (
        <div
          key={label}
          className="rounded-2xl border border-white/8 bg-white/[0.02] p-4 flex flex-col gap-2.5"
        >
          <div className="flex items-start justify-between">
            <div className={cn('w-8 h-8 rounded-xl flex items-center justify-center', bg)}>
              <Icon className={cn('w-4 h-4', color)} />
            </div>
            <span
              className={cn(
                'text-[10px] font-medium px-1.5 py-0.5 rounded-full',
                trend === '0'
                  ? 'bg-red-500/10 text-red-400'
                  : 'bg-emerald-500/10 text-emerald-400'
              )}
            >
              {trend === '0' ? '—' : trend}
            </span>
          </div>
          <div>
            <p className="text-2xl font-medium text-white">{value}</p>
            <p className="text-xs text-white/40 mt-0.5">{label}</p>
          </div>
        </div>
      ))}
    </div>
  )
}