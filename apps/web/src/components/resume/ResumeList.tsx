'use client'
import { cn } from '@/lib/utils'
import type { ResumeVersion } from './ResumeBuilderPage'

interface Props {
  resumes:    ResumeVersion[]
  selected:   ResumeVersion
  onSelect:   (r: ResumeVersion) => void
  onGenerate: () => void
  generating: boolean
}

function AtsScoreBadge({ score }: { score: number }) {
  const color =
    score >= 75 ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' :
    score >= 60 ? 'text-amber-400 bg-amber-500/10 border-amber-500/20' :
                  'text-red-400 bg-red-500/10 border-red-500/20'
  return (
    <span className={cn('text-[10px] font-medium px-1.5 py-0.5 rounded-md border', color)}>
      ATS {score}
    </span>
  )
}

export function ResumeList({ resumes, selected, onSelect, onGenerate, generating }: Props) {
  return (
    <aside className="w-[220px] flex-shrink-0 bg-[#08090f] border-r border-white/8 flex flex-col overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-white/8">
        <span className="text-xs font-medium text-white">My resumes</span>
        <button className="text-[10px] text-violet-400 hover:text-violet-300 border border-violet-500/25 hover:border-violet-500/40 px-2 py-0.5 rounded-lg transition-all">
          + New
        </button>
      </div>

      {/* Resume cards */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {resumes.map(r => (
          <div
            key={r.id}
            onClick={() => onSelect(r)}
            className={cn(
              'rounded-xl border p-3 cursor-pointer transition-all',
              selected.id === r.id
                ? 'border-violet-500/40 bg-violet-500/8'
                : 'border-white/8 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]'
            )}
          >
            {/* Name + version */}
            <div className="flex items-start justify-between gap-1.5 mb-1">
              <p className={cn(
                'text-xs font-medium leading-snug',
                selected.id === r.id ? 'text-white' : 'text-white/70'
              )}>
                {r.name}
              </p>
              <span className="text-[9px] font-medium px-1.5 py-0.5 rounded-md bg-white/8 text-white/40 border border-white/8 whitespace-nowrap flex-shrink-0">
                v{r.version}
              </span>
            </div>

            {/* Target */}
            <p className="text-[10px] text-white/30 mb-2 leading-snug">{r.targetJob}</p>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-white/20">{r.updatedAt}</span>
              <AtsScoreBadge score={r.atsScore} />
            </div>

            {/* Actions — only when selected */}
            {selected.id === r.id && (
              <div className="flex gap-1.5 mt-2.5 pt-2.5 border-t border-white/8">
                {['Duplicate', 'Rename', 'Delete'].map(action => (
                  <button
                    key={action}
                    className={cn(
                      'text-[9px] px-1.5 py-0.5 rounded-md border transition-all',
                      action === 'Delete'
                        ? 'border-red-500/20 text-red-400 hover:bg-red-500/8'
                        : 'border-white/10 text-white/30 hover:text-white/60 hover:border-white/20'
                    )}
                  >
                    {action}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Generate CTA */}
      <div className="p-3 border-t border-white/8">
        <button
          onClick={onGenerate}
          disabled={generating}
          className="w-full py-2.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-medium rounded-xl transition-all flex items-center justify-center gap-2"
        >
          {generating ? (
            <>
              <svg className="animate-spin w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              Generating…
            </>
          ) : (
            <>✦ Generate for new job</>
          )}
        </button>
      </div>
    </aside>
  )
}