'use client'
import { useState } from 'react'
import { cn, formatLPA, matchColor } from '@/lib/utils'
import type { JobCard } from '@/types'

interface Props {
  job:           JobCard
  saved:         boolean
  onToggleSave:  () => void
  onClose:       () => void
}

export function JobDrawer({ job, saved, onToggleSave, onClose }: Props) {
  const [coverOpen, setCoverOpen] = useState(false)
  const [applying, setApplying]   = useState(false)
  const [applied, setApplied]     = useState(job.applied)

  const mc = matchColor(job.matchScore ?? 0)

  const handleApply = async () => {
    setApplying(true)
    // TODO: POST /api/applications { jobId: job.id }
    await new Promise(r => setTimeout(r, 1200))
    setApplying(false)
    setApplied(true)
  }

  const matchPct   = job.matchScore ?? 0
  const matchFill  = `${matchPct}%`
  const matchColor2 = matchPct >= 85 ? '#34d399' : matchPct >= 70 ? '#fbbf24' : '#f87171'

  return (
    <aside className="w-[300px] flex-shrink-0 bg-[#08090f] border-l border-white/8 flex flex-col overflow-hidden">

      {/* Topbar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/8 flex-shrink-0">
        <span className="text-[10px] font-medium uppercase tracking-widest text-white/30">
          Job detail
        </span>
        <button
          onClick={onClose}
          className="w-6 h-6 rounded-lg border border-white/10 flex items-center justify-center text-white/30 hover:text-white/60 hover:border-white/20 transition-all text-xs"
        >
          ✕
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">

          {/* Company + title */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-11 h-11 rounded-xl bg-white/6 border border-white/8 flex items-center justify-center text-sm font-semibold text-white/50 flex-shrink-0">
                {job.initials}
              </div>
              <div>
                <p className="text-xs font-medium text-white">{job.company}</p>
                <p className="text-[10px] text-white/35 mt-0.5">Fintech · 1,000–5,000 employees</p>
              </div>
            </div>
            <h2 className="text-base font-medium text-white leading-snug mb-3">
              {job.title}
            </h2>

            {/* Meta chips */}
            <div className="flex flex-wrap gap-1.5">
              {[
                { icon: '📍', label: job.location },
                { icon: '💰', label: formatLPA(job.salaryMin, job.salaryMax) },
                { icon: '🏠', label: job.workMode.charAt(0) + job.workMode.slice(1).toLowerCase() },
                { icon: '🕐', label: 'Posted ' + (job.postedAt ? new Date(Date.now() - new Date(job.postedAt).getTime()).getHours() + 'h ago' : '—') },
              ].map(({ icon, label }) => (
                <span key={label} className="flex items-center gap-1 text-[10px] px-2 py-1 rounded-lg bg-white/[0.04] border border-white/8 text-white/45">
                  {icon} {label}
                </span>
              ))}
            </div>
          </div>

          {/* Match score band */}
          <div className="bg-emerald-500/6 border border-emerald-500/20 rounded-xl p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-emerald-400">Nova match score</span>
              <span className="text-xl font-medium text-emerald-400">{matchPct}%</span>
            </div>
            <div className="h-1.5 bg-white/8 rounded-full overflow-hidden mb-1.5">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: matchFill, background: matchColor2 }}
              />
            </div>
            <p className="text-[10px] text-emerald-400/70">
              You meet {Math.round(matchPct / 100 * 15)} of 15 requirements
            </p>
          </div>

          {/* Skills match */}
          <div>
            <p className="text-[10px] font-medium uppercase tracking-widest text-white/25 mb-2">
              Skills match
            </p>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {job.skills.map(sk => {
                const missing = job.missingSkills.includes(sk)
                return (
                  <span
                    key={sk}
                    className={cn(
                      'text-[11px] px-2 py-0.5 rounded-md border',
                      missing
                        ? 'bg-amber-500/8 border-amber-500/20 text-amber-400'
                        : 'bg-emerald-500/8 border-emerald-500/20 text-emerald-400'
                    )}
                  >
                    {sk}
                  </span>
                )
              })}
            </div>
            {/* Legend */}
            <div className="flex gap-3">
              <div className="flex items-center gap-1 text-[10px] text-white/25">
                <div className="w-2 h-2 rounded-sm bg-emerald-500/50"/>
                You have it
              </div>
              <div className="flex items-center gap-1 text-[10px] text-white/25">
                <div className="w-2 h-2 rounded-sm bg-amber-500/50"/>
                Missing
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <p className="text-[10px] font-medium uppercase tracking-widest text-white/25 mb-2">
              About the role
            </p>
            <p className="text-xs text-white/45 leading-relaxed">{job.description}</p>
          </div>

          {/* Responsibilities */}
          <div>
            <p className="text-[10px] font-medium uppercase tracking-widest text-white/25 mb-2">
              What you'll do
            </p>
            <div className="bg-white/[0.02] rounded-xl p-3 space-y-1.5">
              {job.responsibilities.map((r, i) => (
                <div key={i} className="flex gap-2 text-xs text-white/45">
                  <span className="text-white/20 flex-shrink-0 mt-0.5">·</span>
                  <span className="leading-relaxed">{r}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cover letter */}
          {job.coverLetter && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-medium uppercase tracking-widest text-white/25">
                  Nova's cover letter
                </p>
                <button
                  onClick={() => setCoverOpen(!coverOpen)}
                  className="text-[10px] text-violet-400 hover:text-violet-300 transition-colors"
                >
                  {coverOpen ? 'Hide' : 'Preview'}
                </button>
              </div>
              {coverOpen && (
                <div className="bg-white/[0.02] border border-white/8 rounded-xl p-3">
                  <p className="text-[11px] text-white/40 leading-relaxed">{job.coverLetter}</p>
                  <button className="mt-2 text-[10px] text-violet-400 hover:text-violet-300 transition-colors">
                    Edit →
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>

      {/* CTAs */}
      <div className="p-4 border-t border-white/8 space-y-2.5 flex-shrink-0">

        {applied ? (
          <div className="w-full py-2.5 bg-emerald-500/10 border border-emerald-500/25 rounded-xl text-xs font-medium text-emerald-400 text-center">
            ✓ Applied — Nova tracking this
          </div>
        ) : (
          <button
            onClick={handleApply}
            disabled={applying}
            className="w-full py-2.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-medium rounded-xl transition-all flex items-center justify-center gap-2"
          >
            {applying ? (
              <>
                <svg className="animate-spin w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                Applying…
              </>
            ) : (
              '✦ Apply with Nova — tailored resume + cover letter'
            )}
          </button>
        )}

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onToggleSave}
            className={cn(
              'py-2 rounded-xl border text-xs transition-all flex items-center justify-center gap-1.5',
              saved
                ? 'border-amber-500/30 bg-amber-500/8 text-amber-400'
                : 'border-white/10 text-white/40 hover:border-white/20 hover:text-white/60'
            )}
          >
            {saved ? '★ Saved' : '☆ Save'}
          </button>
          
            href={job.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2 rounded-xl border border-white/10 text-xs text-white/40 hover:border-white/20 hover:text-white/60 transition-all flex items-center justify-center gap-1.5"
          >
            ↗ View on {job.source}
          </a>
        </div>

      </div>
    </aside>
  )
}