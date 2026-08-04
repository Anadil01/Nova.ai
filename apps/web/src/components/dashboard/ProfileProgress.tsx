import Link from 'next/link'

const items = [
  { label: 'Target role set',       done: true  },
  { label: 'Skills added (6)',      done: true  },
  { label: 'Work experience added', done: true  },
  { label: 'Resume generated',      done: true  },
  { label: 'WhatsApp connected',    done: true  },
  { label: 'LinkedIn URL',          done: false, action: 'Add →' },
  { label: 'Portfolio / GitHub',    done: false, action: 'Add →' },
  { label: '10 skills (have 6)',    done: false, action: 'Add →' },
]

const pct = Math.round((items.filter(i => i.done).length / items.length) * 100)

export function ProfileProgress() {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="text-sm font-medium text-white mb-0.5">Profile strength</h3>
          <p className="text-xs text-white/35">Complete your profile for 3× more matches</p>
        </div>
        <Link
          href="/dashboard/profile"
          className="text-xs text-violet-400 hover:text-violet-300 transition-colors"
        >
          Edit profile →
        </Link>
      </div>

      {/* Ring + label */}
      <div className="flex items-center gap-5 mb-5">
        {/* SVG ring */}
        <div className="relative w-20 h-20 flex-shrink-0">
          <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="7"/>
            <circle
              cx="40" cy="40" r="32" fill="none"
              stroke="#8b5cf6" strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 32}`}
              strokeDashoffset={`${2 * Math.PI * 32 * (1 - pct / 100)}`}
              className="transition-all duration-700"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-lg font-medium text-white">{pct}%</span>
            <span className="text-[9px] text-white/30">done</span>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-white mb-1">
            {pct >= 80 ? 'Great — almost there!' : pct >= 60 ? 'Good — keep going' : 'Just getting started'}
          </p>
          <p className="text-xs text-white/40 leading-relaxed">
            Add {items.filter(i => !i.done).length} more items to unlock better matches and recruiter visibility.
          </p>
        </div>
      </div>

      {/* Checklist */}
      <div className="space-y-2">
        {items.map(({ label, done, action }) => (
          <div key={label} className="flex items-center gap-2.5">
            <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] ${
              done
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
            }`}>
              {done ? '✓' : '!'}
            </div>
            <span className={`text-xs flex-1 ${done ? 'text-white/50' : 'text-white/70'}`}>{label}</span>
            {!done && action && (
              <Link
                href="/dashboard/profile"
                className="text-[10px] text-violet-400 hover:text-violet-300 transition-colors"
              >
                {action}
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}