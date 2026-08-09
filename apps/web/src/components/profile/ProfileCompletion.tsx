import type { ProfileData } from './ProfilePage'

interface Props { profile: ProfileData }

export function ProfileCompletion({ profile }: Props) {
  const items = [
    { label: 'Target role set',       done: !!profile.preferences.targetRole },
    { label: `Skills added (${profile.primarySkills.length})`, done: profile.primarySkills.length >= 3 },
    { label: 'Work experience',       done: profile.experience.length > 0 },
    { label: 'Resume generated',      done: true },
    { label: 'WhatsApp connected',    done: true },
    { label: 'LinkedIn URL',          done: !!profile.linkedin  },
    { label: 'Portfolio / GitHub',    done: !!profile.portfolio },
    { label: '10 skills',             done: (profile.primarySkills.length + profile.secondarySkills.length) >= 10 },
  ]

  const pct = Math.round((items.filter(i => i.done).length / items.length) * 100)
  const r   = 32
  const circ = 2 * Math.PI * r

  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-4">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-medium text-white">Profile strength</p>
        <span className="text-[10px] text-violet-400 cursor-pointer hover:text-violet-300">
          What's missing?
        </span>
      </div>

      {/* Ring + label */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative w-14 h-14 flex-shrink-0">
          <svg className="w-14 h-14 -rotate-90" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="7"/>
            <circle
              cx="40" cy="40" r={r} fill="none"
              stroke="#8b5cf6" strokeWidth="7" strokeLinecap="round"
              strokeDasharray={circ}
              strokeDashoffset={circ * (1 - pct / 100)}
              className="transition-all duration-700"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-sm font-medium text-white">{pct}%</span>
          </div>
        </div>
        <div>
          <p className="text-xs font-medium text-white mb-0.5">
            {pct >= 80 ? 'Almost complete!' : pct >= 60 ? 'Looking good' : 'Keep going'}
          </p>
          <p className="text-[10px] text-white/35 leading-relaxed">
            {items.filter(i => !i.done).length} items remaining for 3× more matches
          </p>
        </div>
      </div>

      {/* Checklist */}
      <div className="space-y-1.5">
        {items.map(({ label, done }) => (
          <div key={label} className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-[9px] border ${
              done
                ? 'bg-emerald-500/15 border-emerald-500/25 text-emerald-400'
                : 'bg-amber-500/8 border-amber-500/20 text-amber-400'
            }`}>
              {done ? '✓' : '!'}
            </div>
            <span className={`text-[11px] ${done ? 'text-white/40' : 'text-white/65'}`}>{label}</span>
            {!done && (
              <span className="ml-auto text-[10px] text-violet-400 cursor-pointer hover:text-violet-300 transition-colors">
                Add →
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}