'use client'
import { cn, formatLPA, matchColor, timeAgo } from '@/lib/utils'
import type { JobCard } from '@/types'

interface Props {
  jobs:          JobCard[]
  selected:      JobCard | null
  saved:         string[]
  onSelect:      (job: JobCard) => void
  onToggleSave:  (id: string) => void
}

export function JobList({ jobs, selected, saved, onSelect, onToggleSave }: Props) {
  return (
    <div className="flex-1 flex flex-col overflow-hidden border-r border-white/8">

      {/* Toolbar */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/8 bg-[#08090f] flex-shrink-0">
        <p className="text-xs text-white/40 flex-1">
          <span className="text-white font-medium">{jobs.length} jobs</span> matched
        </p>
        <select className="text-xs bg-[#0d1020] border border-white/10 text-white/50 rounded-lg px-2.5 py-1.5 outline-none cursor-pointer">
          <option>Best match</option>
          <option>Newest first</option>
          <option>Salary: high–low</option>
        </select>
      </div>

      {/* Auto-apply bar */}
      <div className="flex items-center gap-3 mx-4 mt-3 px-3.5 py-2.5 bg-emerald-500/6 border border-emerald-500/20 rounded-xl flex-shrink-0">
        <span className="text-base">🤖</span>
        <p className="text-xs text-emerald-300 flex-1">
          <strong className="font-medium">Nova found 3 jobs at 90%+ match.</strong> Auto-apply with tailored resumes?
        </p>
        <button className="text-xs font-medium bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg transition-all whitespace-nowrap flex-shrink-0">
          Apply all 3
        </button>
      </div>

      {/* Cards */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {jobs.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-2xl mb-2">🔍</p>
            <p className="text-sm text-white/40">No jobs match these filters</p>
            <p className="text-xs text-white/25 mt-1">Try removing some filters</p>
          </div>
        ) : (
          jobs.map(job => (
            <JobCard
              key={job.id}
              job={job}
              isSelected={selected?.id === job.id}
              isSaved={saved.includes(job.id)}
              onSelect={() => onSelect(job)}
              onToggleSave={() => onToggleSave(job.id)}
            />
          ))
        )}
      </div>
    </div>
  )
}

// ── Individual job card ──────────────────────────────────
function JobCard({
  job, isSelected, isSaved, onSelect, onToggleSave,
}: {
  job: JobCard
  isSelected: boolean
  isSaved: boolean
  onSelect: () => void
  onToggleSave: () => void
}) {
  const mc = matchColor(job.matchScore ?? 0)

  return (
    <div
      onClick={onSelect}
      className={cn(
        'group flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all',
        isSelected
          ? 'border-violet-500/50 bg-violet-500/5'
          : 'border-white/6 bg-white/[0.015] hover:border-white/12 hover:bg-white/[0.03]'
      )}
    >
      {/* Company logo */}
      <div className="w-9 h-9 rounded-xl bg-white/6 border border-white/8 flex items-center justify-center text-xs font-semibold text-white/50 flex-shrink-0">
        {job.initials}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">

        {/* Top row */}
        <div className="flex items-start justify-between gap-2 mb-1">
          <p className="text-sm font-medium text-white truncate">{job.title}</p>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {/* Ghost score */}
            {job.ghostScore && (
              <span
                className="text-[9px] px-1.5 py-0.5 rounded-md bg-emerald-500/8 text-emerald-400 border border-emerald-500/15"
                title="Job authenticity score — higher is more likely real"
              >
                ✓ real
              </span>
            )}
            {/* Match score */}
            <span className={cn('text-[10px] font-semibold px-1.5 py-0.5 rounded-md', mc)}>
              {job.matchScore}%
            </span>
          </div>
        </div>

        {/* Meta */}
        <p className="text-xs text-white/40 mb-2 truncate">
          {job.company} · {job.location} · {formatLPA(job.salaryMin, job.salaryMax)}
        </p>

        {/* Tags + skills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {job.tags.map(tag => (
            <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded-md bg-violet-500/10 text-violet-400 border border-violet-500/15">
              {tag}
            </span>
          ))}
          {job.skills.slice(0, 3).map(sk => (
            <span key={sk} className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/5 text-white/30 border border-white/8">
              {sk}
            </span>
          ))}
          {job.skills.length > 3 && (
            <span className="text-[10px] text-white/20">+{job.skills.length - 3}</span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-2.5">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-white/20">{job.source}</span>
            <span className="text-[10px] text-white/15">·</span>
            <span className="text-[10px] text-white/20">{timeAgo(job.postedAt ?? '')}</span>
          </div>

          <div
            className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={e => e.stopPropagation()}
          >
            {/* Save */}
            <button
              onClick={onToggleSave}
              className={cn(
                'w-6 h-6 rounded-lg border flex items-center justify-center text-xs transition-all',
                isSaved
                  ? 'border-amber-500/30 bg-amber-500/10 text-amber-400'
                  : 'border-white/10 text-white/25 hover:border-white/20 hover:text-white/50'
              )}
            >
              {isSaved ? '★' : '☆'}
            </button>

            {/* Apply */}
            {job.applied ? (
              <span className="text-[10px] font-medium px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                ✓ Applied
              </span>
            ) : (
              <button className="text-[10px] font-medium px-2.5 py-1 rounded-lg bg-violet-600 hover:bg-violet-500 text-white transition-all">
                Apply
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}