import Link from 'next/link'
import { cn } from '@/lib/utils'

const score = 82

const bars = [
  { label: 'Keyword match',       val: 82, color: 'bg-emerald-500' },
  { label: 'Format score',        val: 100, color: 'bg-emerald-500' },
  { label: 'Section completeness', val: 90, color: 'bg-blue-500'   },
  { label: 'Readability',         val: 74, color: 'bg-amber-500'   },
]

const missing = ['TypeScript', 'GraphQL', 'AWS']

export function ResumeHealthWidget() {
  const color = score >= 85 ? 'text-emerald-400' : score >= 70 ? 'text-amber-400' : 'text-red-400'
  const ringColor = score >= 85 ? '#34d399' : score >= 70 ? '#fbbf24' : '#f87171'

  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-white">Resume health</h3>
        <Link href="/dashboard/resume" className="text-xs text-violet-400 hover:text-violet-300 transition-colors">
          Edit →
        </Link>
      </div>

      {/* Score + bars */}
      <div className="flex items-center gap-4 mb-4">
        {/* Mini ring */}
        <div className="relative w-14 h-14 flex-shrink-0">
          <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
            <circle cx="28" cy="28" r="22" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="5"/>
            <circle
              cx="28" cy="28" r="22" fill="none"
              stroke={ringColor} strokeWidth="5" strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 22}`}
              strokeDashoffset={`${2 * Math.PI * 22 * (1 - score / 100)}`}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={cn('text-sm font-medium', color)}>{score}</span>
          </div>
        </div>

        <div className="flex-1 space-y-2">
          {bars.map(({ label, val, color: c }) => (
            <div key={label}>
              <div className="flex justify-between mb-0.5">
                <span className="text-[10px] text-white/35">{label}</span>
                <span className="text-[10px] text-white/50">{val}%</span>
              </div>
              <div className="h-1 bg-white/6 rounded-full overflow-hidden">
                <div
                  className={cn('h-full rounded-full transition-all duration-500', c)}
                  style={{ width: `${val}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Missing keywords */}
      {missing.length > 0 && (
        <div className="bg-amber-500/6 border border-amber-500/15 rounded-xl p-2.5">
          <p className="text-[10px] text-amber-400 font-medium mb-1.5">
            Missing keywords — add to reach 90+
          </p>
          <div className="flex flex-wrap gap-1.5">
            {missing.map(kw => (
              <span key={kw} className="text-[10px] px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20 cursor-pointer hover:bg-amber-500/20 transition-all">
                + {kw}
              </span>
            ))}
          </div>
        </div>
      )}

      <Link
        href="/dashboard/resume"
        className="mt-3 w-full block text-center text-xs bg-violet-600/80 hover:bg-violet-600 text-white py-2 rounded-xl transition-all"
      >
        ✦ Regenerate with fixes applied
      </Link>
    </div>
  )
}