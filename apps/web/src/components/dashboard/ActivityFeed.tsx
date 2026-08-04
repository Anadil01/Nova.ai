import { timeAgo } from '@/lib/utils'

const feed = [
  {
    icon:  '👁️',
    text:  'Razorpay recruiter viewed your profile',
    sub:   'Senior React Developer',
    time:  new Date(Date.now() - 2 * 3600000).toISOString(),
    color: 'bg-blue-500/10 text-blue-400',
  },
  {
    icon:  '📤',
    text:  'Nova applied to Zepto — Full Stack Engineer',
    sub:   'Resume tailored · cover letter sent',
    time:  new Date(Date.now() - 5 * 3600000).toISOString(),
    color: 'bg-violet-500/10 text-violet-400',
  },
  {
    icon:  '🔔',
    text:  'Interview confirmed — Razorpay Round 1',
    sub:   'Tomorrow · 11:00 AM · Google Meet',
    time:  new Date(Date.now() - 18 * 3600000).toISOString(),
    color: 'bg-amber-500/10 text-amber-400',
  },
  {
    icon:  '✓',
    text:  'Application submitted — CRED Frontend Lead',
    sub:   'ATS score 88 · via Naukri',
    time:  new Date(Date.now() - 24 * 3600000).toISOString(),
    color: 'bg-emerald-500/10 text-emerald-400',
  },
  {
    icon:  '❌',
    text:  'Application rejected — Byju\'s',
    sub:   'After resume screening',
    time:  new Date(Date.now() - 48 * 3600000).toISOString(),
    color: 'bg-red-500/10 text-red-400',
  },
]

export function ActivityFeed() {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-4">
      <h3 className="text-sm font-medium text-white mb-3">Recent activity</h3>

      <div className="space-y-0">
        {feed.map(({ icon, text, sub, time, color }, i) => (
          <div
            key={i}
            className={`flex gap-2.5 py-2.5 ${i < feed.length - 1 ? 'border-b border-white/5' : ''}`}
          >
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] flex-shrink-0 mt-0.5 ${color}`}>
              {icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-white/70 leading-snug">{text}</p>
              <div className="flex items-center justify-between mt-0.5">
                <p className="text-[10px] text-white/30 truncate">{sub}</p>
                <p className="text-[10px] text-white/20 flex-shrink-0 ml-2">{timeAgo(time)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}