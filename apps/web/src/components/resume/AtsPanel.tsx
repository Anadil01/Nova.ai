'use client'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { ResumeVersion } from './ResumeBuilderPage'

interface Props {
  resume: ResumeVersion
}

const BREAKDOWN = [
  { label: 'Keyword match',        val: 82, color: 'bg-emerald-500' },
  { label: 'Format compatibility', val: 100, color: 'bg-emerald-500' },
  { label: 'Section completeness', val: 90,  color: 'bg-blue-500'   },
  { label: 'Readability score',    val: 74,  color: 'bg-amber-500'  },
]

const KEYWORDS = [
  {
    word:     'TypeScript',
    severity: 'critical',
    reason:   'Appears 4× in JD · critical for ATS pass',
  },
  {
    word:     'GraphQL',
    severity: 'important',
    reason:   'Appears 2× in JD · preferred skill',
  },
  {
    word:     'AWS',
    severity: 'important',
    reason:   'Listed under preferred skills in JD',
  },
  {
    word:     'CI/CD',
    severity: 'nice',
    reason:   'Nice to have · low weight in scoring',
  },
]

const SUGGESTIONS = [
  { type: 'warn',  text: 'Summary is 4 lines — trim to 2–3 for better ATS scan' },
  { type: 'tip',   text: 'Add a quantified result to bullet point 2 in TechCorp role' },
  { type: 'good',  text: 'No tables or columns — ATS-safe format ✓'               },
  { type: 'good',  text: 'Standard section headings detected ✓'                   },
  { type: 'tip',   text: 'Move Skills section above Education for senior roles'    },
]

export function AtsPanel({ resume }: Props) {
  const [added, setAdded] = useState<string[]>([])
  const [regenerating, setRegenerate] = useState(false)

  const score   = resume.atsScore
  const ringColor = score >= 75 ? '#34d399' : score >= 60 ? '#fbbf24' : '#f87171'
  const verdict   = score >= 75 ? 'Good — almost there' : score >= 60 ? 'Fair — needs work' : 'Weak — fix issues'

  const handleAdd = (word: string) => setAdded(p => [...p, word])

  const handleRegenerate = async () => {
    setRegenerate(true)
    // TODO: POST /api/resumes/[id]/score + re-generate
    await new Promise(r => setTimeout(r, 2000))
    setRegenerate(false)
  }

  return (
    <aside className="w-[260px] flex-shrink-0 bg-[#08090f] flex flex-col overflow-hidden">

      {/* Header */}
      <div className="px-4 py-3.5 border-b border-white/8">
        <span className="text-xs font-medium text-white">ATS analysis</span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-5">

        {/* Score ring */}
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-3">
            <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
              <circle
                cx="40" cy="40" r="32"
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="7"
              />
              <circle
                cx="40" cy="40" r="32"
                fill="none"
                stroke={ringColor}
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 32}`}
                strokeDashoffset={`${2 * Math.PI * 32 * (1 - score / 100)}`}
                className="transition-all duration-700"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-medium text-white">{score}</span>
              <span className="text-[9px] text-white/30">/ 100</span>
            </div>
          </div>
          <p className="text-sm font-medium text-white mb-0.5">{verdict}</p>
          <p className="text-[10px] text-white/35">
            {added.length > 0
              ? `${KEYWORDS.filter(k => !added.includes(k.word)).length} keywords missing · fix to reach 90+`
              : '3 keywords missing · fix to reach 90+'}
          </p>
        </div>

        <hr className="border-white/8" />

        {/* Breakdown bars */}
        <div className="space-y-3">
          {BREAKDOWN.map(({ label, val, color }) => (
            <div key={label}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] text-white/45">{label}</span>
                <span className="text-[11px] font-medium text-white/60">{val}%</span>
              </div>
              <div className="h-1.5 bg-white/6 rounded-full overflow-hidden">
                <div
                  className={cn('h-full rounded-full transition-all duration-500', color)}
                  style={{ width: `${val}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <hr className="border-white/8" />

        {/* Keyword gaps */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-medium text-white">Missing keywords</p>
            <button className="text-[10px] text-violet-400 hover:text-violet-300 transition-colors">
              Fix all →
            </button>
          </div>

          <div className="space-y-2">
            {KEYWORDS.filter(k => !added.includes(k.word)).map(({ word, severity, reason }) => {
              const styles = {
                critical: {
                  dot:    'bg-red-500',
                  border: 'border-red-500/20',
                  bg:     'bg-red-500/5',
                  btn:    'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20',
                },
                important: {
                  dot:    'bg-amber-500',
                  border: 'border-amber-500/20',
                  bg:     'bg-amber-500/5',
                  btn:    'bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20',
                },
                nice: {
                  dot:    'bg-white/25',
                  border: 'border-white/8',
                  bg:     'bg-white/[0.02]',
                  btn:    'bg-white/5 text-white/40 border-white/10 hover:bg-white/10',
                },
              }[severity]

              return (
                <div
                  key={word}
                  className={cn(
                    'flex items-start gap-2.5 p-2.5 rounded-xl border',
                    styles.border, styles.bg
                  )}
                >
                  <div className={cn('w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5', styles.dot)} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-white mb-0.5">{word}</p>
                    <p className="text-[10px] text-white/35 leading-snug">{reason}</p>
                  </div>
                  <button
                    onClick={() => handleAdd(word)}
                    className={cn(
                      'text-[10px] px-2 py-0.5 rounded-lg border transition-all flex-shrink-0',
                      styles.btn
                    )}
                  >
                    Add
                  </button>
                </div>
              )
            })}
            {KEYWORDS.every(k => added.includes(k.word)) && (
              <div className="text-center py-3">
                <p className="text-xs text-emerald-400">✓ All keywords added!</p>
                <p className="text-[10px] text-white/25 mt-0.5">Regenerate to apply changes</p>
              </div>
            )}
          </div>
        </div>

        <hr className="border-white/8" />

        {/* Nova suggestions */}
        <div>
          <p className="text-xs font-medium text-white mb-3">Nova's suggestions</p>
          <div className="space-y-2">
            {SUGGESTIONS.map(({ type, text }) => {
              const styles = {
                warn: { icon: '⚠️', bg: 'bg-amber-500/5 border-amber-500/15' },
                tip:  { icon: '💡', bg: 'bg-blue-500/5 border-blue-500/15'   },
                good: { icon: '✅', bg: 'bg-emerald-500/5 border-emerald-500/15' },
              }[type]

              return (
                <div
                  key={text}
                  className={cn('flex gap-2 p-2.5 rounded-xl border', styles.bg)}
                >
                  <span className="text-sm flex-shrink-0">{styles.icon}</span>
                  <p className="text-[11px] text-white/50 leading-relaxed">{text}</p>
                </div>
              )
            })}
          </div>
        </div>

      </div>

      {/* Regen CTA */}
      <div className="p-4 border-t border-white/8 space-y-2 flex-shrink-0">
        <button
          onClick={handleRegenerate}
          disabled={regenerating}
          className="w-full py-2.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-medium rounded-xl transition-all flex items-center justify-center gap-2"
        >
          {regenerating ? (
            <>
              <svg className="animate-spin w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              Regenerating…
            </>
          ) : (
            '✦ Regenerate with fixes applied'
          )}
        </button>
        <div className="grid grid-cols-2 gap-2">
          <button className="py-2 border border-white/10 hover:border-white/20 text-white/40 hover:text-white/60 text-xs rounded-xl transition-all flex items-center justify-center gap-1">
            ↓ PDF
          </button>
          <button className="py-2 border border-white/10 hover:border-white/20 text-white/40 hover:text-white/60 text-xs rounded-xl transition-all flex items-center justify-center gap-1">
            ⧉ Duplicate
          </button>
        </div>
      </div>
    </aside>
  )
}