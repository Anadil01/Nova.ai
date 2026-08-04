import Link from 'next/link'

const upcoming = [
  {
    company:  'Razorpay',
    role:     'Senior React Developer',
    round:    'Round 1 · Technical',
    time:     'Tomorrow · 11:00 AM',
    urgent:   true,
    initials: 'RZ',
  },
  {
    company:  'CRED',
    role:     'Frontend Lead',
    round:    'Round 2 · System Design',
    time:     'In 3 days · 2:00 PM',
    urgent:   false,
    initials: 'CR',
  },
]

export function InterviewWidget() {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-white">Upcoming interviews</h3>
        <Link href="/dashboard/interview" className="text-xs text-violet-400 hover:text-violet-300 transition-colors">
          Prep →
        </Link>
      </div>

      <div className="space-y-2">
        {upcoming.map(({ company, role, round, time, urgent, initials }) => (
          <div
            key={company}
            className={`flex items-start gap-2.5 p-3 rounded-xl border transition-all ${
              urgent
                ? 'border-amber-500/25 bg-amber-500/5'
                : 'border-white/6 bg-white/[0.015]'
            }`}
          >
            <div className="w-7 h-7 rounded-lg bg-white/6 border border-white/8 flex items-center justify-center text-[10px] font-semibold text-white/40 flex-shrink-0">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-white truncate">{company} — {role}</p>
              <p className="text-[10px] text-white/35 mt-0.5">{round}</p>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-md ${
                  urgent
                    ? 'bg-amber-500/15 text-amber-400 border border-amber-500/25'
                    : 'bg-white/6 text-white/35 border border-white/8'
                }`}>
                  🕐 {time}
                </span>
                <Link
                  href="/dashboard/interview"
                  className="text-[10px] text-violet-400 hover:text-violet-300 transition-colors"
                >
                  Prep with Nova →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {upcoming.length === 0 && (
        <div className="text-center py-4">
          <p className="text-xs text-white/25">No interviews scheduled yet</p>
          <Link href="/dashboard/jobs" className="text-xs text-violet-400 mt-1 block">
            Apply to jobs →
          </Link>
        </div>
      )}
    </div>
  )
}