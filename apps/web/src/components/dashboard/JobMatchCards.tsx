'use client'
import { useState } from 'react'
import Link from 'next/link'
import { cn, formatLPA, matchColor, timeAgo } from '@/lib/utils'

const jobs = [
  {
    id: '1',
    title:    'Senior React Developer',
    company:  'Razorpay',
    initials: 'RZ',
    location: 'Bangalore + Remote',
    salary:   { min: 18, max: 22 },
    skills:   ['React', 'Node.js', 'TypeScript'],
    match:    96,
    source:   'Naukri',
    postedAt: new Date(Date.now() - 6 * 3600000).toISOString(),
    tags:     ['New today', 'Remote ok'],
    ghostScore: 98,
  },
  {
    id: '2',
    title:    'Full Stack Engineer',
    company:  'Zepto',
    initials: 'ZP',
    location: 'Mumbai',
    salary:   { min: 16, max: 20 },
    skills:   ['React', 'MongoDB', 'AWS'],
    match:    91,
    source:   'LinkedIn',
    postedAt: new Date(Date.now() - 9 * 3600000).toISOString(),
    tags:     ['New today'],
    ghostScore: 95,
  },
  {
    id: '3',
    title:    'Frontend Lead',
    company:  'CRED',
    initials: 'CR',
    location: 'Bangalore',
    salary:   { min: 20, max: 24 },
    skills:   ['React', 'TypeScript', 'GraphQL'],
    match:    88,
    source:   'Naukri',
    postedAt: new Date(Date.now() - 24 * 3600000).toISOString(),
    tags:     [],
    ghostScore: 90,
  },
  {
    id: '4',
    title:    'Node.js Developer',
    company:  'PhonePe',
    initials: 'PP',
    location: 'Bangalore',
    salary:   { min: 14, max: 18 },
    skills:   ['Node.js', 'PostgreSQL', 'Redis'],
    match:    79,
    source:   'LinkedIn',
    postedAt: new Date(Date.now() - 48 * 3600000).toISOString(),
    tags:     [],
    ghostScore: 88,
    applied:  true,
  },
  {
    id: '5',
    title:    'MERN Stack Developer',
    company:  'Swiggy',
    initials: 'SW',
    location: 'Bangalore',
    salary:   { min: 12, max: 16 },
    skills:   ['React', 'Express', 'MongoDB'],
    match:    74,
    source:   'Indeed',
    postedAt: new Date(Date.now() - 72 * 3600000).toISOString(),
    tags:     [],
    ghostScore: 72,
  },
]

export function JobMatchCards() {
  const [saved, setSaved] = useState<string[]>([])

  const toggleSave = (id: string) =>
    setSaved(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])

  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-medium text-white">Today's job matches</h3>
          <p className="text-xs text-white/35 mt-0.5">247 jobs matched · 5 new today · ghost jobs filtered</p>
        </div>
        <Link
          href="/dashboard/jobs"
          className="text-xs text-violet-400 hover:text-violet-300 transition-colors"
        >
          View all →
        </Link>
      </div>

      {/* Auto-apply banner */}
      <div className="flex items-center gap-3 bg-emerald-500/6 border border-emerald-500/20 rounded-xl px-3.5 py-2.5 mb-4">
        <span className="text-base">🤖</span>
        <p className="text-xs text-emerald-300 flex-1">
          <strong className="font-medium">Nova found 5 jobs at 90%+ match.</strong> Auto-apply with tailored resumes?
        </p>
        <button className="text-xs font-medium bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg transition-all flex-shrink-0">
          Apply all 5
        </button>
      </div>

      {/* Cards */}
      <div className="space-y-2.5">
        {jobs.map(job => {
          const mc = matchColor(job.match)
          const isSaved = saved.includes(job.id)
          return (
            <div
              key={job.id}
              className="flex items-start gap-3 p-3.5 rounded-xl border border-white/6 bg-white/[0.015] hover:border-white/12 hover:bg-white/[0.03] transition-all group"
            >
              {/* Company logo */}
              <div className="w-9 h-9 rounded-xl bg-white/6 border border-white/8 flex items-center justify-center text-xs font-semibold text-white/50 flex-shrink-0">
                {job.initials}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="text-sm font-medium text-white truncate">{job.title}</p>
                  <span className={cn('text-[10px] font-semibold px-1.5 py-0.5 rounded-md flex-shrink-0', mc)}>
                    {job.match}%
                  </span>
                </div>

                <p className="text-xs text-white/40 mb-2">
                  {job.company} · {job.location} · {formatLPA(job.salary.min, job.salary.max)} · {job.experience}
                </p>

                <div className="flex items-center gap-1.5 flex-wrap">
                  {job.tags.map(tag => (
                    <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded-md bg-violet-500/10 text-violet-400 border border-violet-500/15">
                      {tag}
                    </span>
                  ))}
                  {job.skills.slice(0, 3).map(sk => (
                    <span key={sk} className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/5 text-white/35 border border-white/8">
                      {sk}
                    </span>
                  ))}
                  <span className="text-[10px] text-white/20 ml-auto">{timeAgo(job.postedAt)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => toggleSave(job.id)}
                  className={cn(
                    'w-7 h-7 rounded-lg border flex items-center justify-center text-sm transition-all',
                    isSaved
                      ? 'border-amber-500/30 bg-amber-500/10 text-amber-400'
                      : 'border-white/10 text-white/30 hover:border-white/20 hover:text-white/60'
                  )}
                  title={isSaved ? 'Saved' : 'Save'}
                >
                  {isSaved ? '★' : '☆'}
                </button>
                {job.applied ? (
                  <span className="text-[10px] font-medium px-2.5 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    ✓ Applied
                  </span>
                ) : (
                  <button className="text-[10px] font-medium px-2.5 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white transition-all">
                    Apply
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <Link
        href="/dashboard/jobs"
        className="mt-4 w-full block text-center text-xs text-white/25 hover:text-white/50 py-2 border border-dashed border-white/8 hover:border-white/15 rounded-xl transition-all"
      >
        View all 247 matches →
      </Link>
    </div>
  )
}