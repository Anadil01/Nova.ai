import Link from 'next/link'

const stats = [
  { label: 'Total applications', value: 142, trend: '+28', icon: '📥', color: 'text-blue-400'    },
  { label: 'Shortlisted',        value: 34,  trend: '+6',  icon: '✅', color: 'text-emerald-400' },
  { label: 'Interviews this week', value: 12, trend: '+3', icon: '📅', color: 'text-amber-400'   },
  { label: 'Offers extended',    value: 3,   trend: '+1',  icon: '🎉', color: 'text-emerald-400' },
  { label: 'Avg. time to hire',  value: '18d', trend: '-2d', icon: '⏱️', color: 'text-violet-400' },
]

const jobs = [
  { initials: 'RZ', title: 'Senior React Developer',  meta: 'Engineering · Bangalore + Remote · ₹18–22 LPA', status: 'live',   apps: 48, closing: ''              },
  { initials: 'BE', title: 'Backend Engineer — Node', meta: 'Engineering · Bangalore · ₹14–18 LPA',          status: 'urgent', apps: 31, closing: 'Closes in 2d'  },
  { initials: 'PD', title: 'Product Designer — UI',  meta: 'Design · Mumbai · ₹12–16 LPA',                  status: 'live',   apps: 24, closing: ''              },
  { initials: 'DO', title: 'DevOps Engineer — AWS',  meta: 'Infrastructure · Remote · ₹16–20 LPA',           status: 'paused', apps: 39, closing: ''              },
]

const funnel = [
  { label: 'Applied',    n: 142, pct: 100, color: 'bg-blue-500'    },
  { label: 'Screened',   n: 86,  pct: 61,  color: 'bg-violet-500'  },
  { label: 'Shortlisted',n: 34,  pct: 24,  color: 'bg-amber-500'   },
  { label: 'Interview',  n: 17,  pct: 12,  color: 'bg-amber-500'   },
  { label: 'Offer sent', n: 3,   pct: 2,   color: 'bg-emerald-500' },
  { label: 'Hired',      n: 1,   pct: 0.7, color: 'bg-emerald-500' },
]

const candidates = [
  { initials: 'AR', name: 'Arjun Rao',   role: 'Frontend Dev · 2 yrs · Bangalore', match: 96, skills: ['React', 'Node.js'], salary: '₹10–20L', isNew: true,  avColor: 'bg-violet-500/20 text-violet-300' },
  { initials: 'PS', name: 'Priya Singh', role: 'React Dev · 3 yrs · Pune',          match: 91, skills: ['React', 'TypeScript'], salary: '₹12–18L', isNew: false, avColor: 'bg-amber-500/20 text-amber-300' },
  { initials: 'RK', name: 'Rahul Kumar', role: 'Full Stack · 4 yrs · Remote',       match: 83, skills: ['React', 'AWS'],     salary: '₹18–24L', isNew: false, avColor: 'bg-emerald-500/20 text-emerald-300' },
]

const activity = [
  { icon: '👤', text: 'Arjun Rao applied to Senior React Dev',   sub: '2 hours ago · 96% match · via Nova', color: 'bg-emerald-500/15 text-emerald-400' },
  { icon: '📅', text: 'Interview confirmed — Priya Singh',        sub: 'Tomorrow · 11 AM · Google Meet',     color: 'bg-blue-500/15 text-blue-400'      },
  { icon: '📤', text: 'Offer letter sent to Karan Mehta',         sub: 'Yesterday · Backend Engineer',       color: 'bg-amber-500/15 text-amber-400'    },
  { icon: '⭐', text: '6 new high-match candidates today',        sub: 'React Dev role · 85–96% scores',     color: 'bg-violet-500/15 text-violet-400'  },
]

const health = [
  { icon: '✅', label: 'Avg. response time',     value: '1.4 days', color: 'text-emerald-400', bg: 'bg-emerald-500/15' },
  { icon: '✅', label: 'Offer acceptance rate',   value: '83%',      color: 'text-emerald-400', bg: 'bg-emerald-500/15' },
  { icon: '⚠️', label: 'Ghost rate',              value: '22%',      color: 'text-amber-400',   bg: 'bg-amber-500/15'   },
  { icon: '⏱️', label: 'Time to first interview', value: '6.2 days', color: 'text-white/60',   bg: 'bg-white/8'         },
  { icon: '⭐', label: 'Candidate satisfaction',  value: '4.7 / 5',  color: 'text-emerald-400', bg: 'bg-emerald-500/15' },
]

export function RecruiterDashboard() {
  return (
    <div className="p-5 space-y-5 max-w-[1400px]">

      {/* Stats */}
      <div className="grid grid-cols-5 gap-3">
        {stats.map(({ label, value, trend, icon, color }) => (
          <div key={label} className="rounded-2xl border border-white/8 bg-white/[0.02] p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/8 border border-emerald-500/15 flex items-center justify-center text-base">{icon}</div>
              <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">{trend}</span>
            </div>
            <p className={`text-2xl font-medium mb-0.5 ${color}`}>{value}</p>
            <p className="text-[10px] text-white/30">{label}</p>
          </div>
        ))}
      </div>

      {/* Mid row */}
      <div className="grid grid-cols-2 gap-5">

        {/* Active jobs */}
        <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-white">Active job posts</p>
            <Link href="/hire/pipeline" className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors">View all →</Link>
          </div>
          <div className="space-y-2.5">
            {jobs.map(({ initials, title, meta, status, apps, closing }) => (
              <div key={title} className={`flex items-start gap-3 p-3 rounded-xl border transition-all ${status === 'urgent' ? 'border-amber-500/20 bg-amber-500/5' : status === 'paused' ? 'border-white/6 bg-white/[0.01] opacity-60' : 'border-white/6 bg-white/[0.015]'}`}>
                <div className="w-8 h-8 rounded-xl bg-white/6 border border-white/8 flex items-center justify-center text-[10px] font-semibold text-white/40 flex-shrink-0">{initials}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-white truncate mb-0.5">{title}</p>
                  <p className="text-[10px] text-white/35 truncate mb-1.5">{meta}</p>
                  <div className="flex items-center gap-1.5">
                    <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded-md border ${status === 'live' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : status === 'urgent' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-white/5 text-white/25 border-white/10'}`}>
                      {status === 'live' ? 'Live' : status === 'urgent' ? closing : 'Paused'}
                    </span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-lg font-medium text-white">{apps}</p>
                  <p className="text-[9px] text-white/25">applicants</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pipeline funnel */}
        <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-white">Hiring pipeline · all roles</p>
            <Link href="/hire/pipeline" className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors">Full pipeline →</Link>
          </div>
          <div className="space-y-2.5 mb-4">
            {funnel.map(({ label, n, pct, color }) => (
              <div key={label} className="flex items-center gap-3">
                <span className="text-xs text-white/40 w-20 flex-shrink-0">{label}</span>
                <div className="flex-1 h-2 bg-white/6 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
                </div>
                <span className="text-xs font-medium text-white/60 w-8 text-right">{n}</span>
                <span className="text-[10px] text-white/25 w-10 text-right">{pct}%</span>
              </div>
            ))}
          </div>
          <div className="bg-emerald-500/6 border border-emerald-500/20 rounded-xl p-3">
            <p className="text-[10px] font-medium text-emerald-400 mb-1">✦ Nova insight</p>
            <p className="text-[11px] text-emerald-400/70 leading-relaxed">
              Shortlist-to-interview rate is 50% — above industry avg of 35%. Consider moving 6 more shortlisted candidates to interview stage.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-[1fr_280px] gap-5">

        {/* Top candidates */}
        <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-white">Top candidates — Senior React Developer</p>
            <Link href="/hire/pipeline" className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors">View all 48 →</Link>
          </div>
          <div className="space-y-3">
            {candidates.map(({ initials, name, role, match, skills, salary, isNew, avColor }) => (
              <div key={name} className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all ${match >= 90 ? 'border-emerald-500/20 bg-emerald-500/5' : 'border-white/6 bg-white/[0.015]'}`}>
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 ${avColor}`}>{initials}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-medium text-white">{name}</p>
                    {isNew && <span className="text-[9px] font-medium px-1.5 py-0.5 rounded-full bg-red-500/15 text-red-400">New</span>}
                    <span className={`ml-auto text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${match >= 85 ? 'text-emerald-400 bg-emerald-500/10' : 'text-amber-400 bg-amber-500/10'}`}>{match}%</span>
                  </div>
                  <p className="text-xs text-white/40 mb-2">{role}</p>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {skills.map(s => <span key={s} className="text-[10px] px-1.5 py-0.5 rounded-md bg-emerald-500/8 text-emerald-400 border border-emerald-500/15">{s}</span>)}
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/5 text-white/30 border border-white/8">{salary} ask</span>
                  </div>
                </div>
                <div className="flex gap-1.5 flex-shrink-0">
                  <button className="text-[10px] px-2 py-1 rounded-lg bg-emerald-600/80 hover:bg-emerald-600 text-white transition-all">Shortlist</button>
                  <button className="text-[10px] px-2 py-1 rounded-lg border border-white/10 text-white/40 hover:border-white/20 transition-all">View</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right col */}
        <div className="space-y-4">

          {/* Quick actions */}
          <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-4">
            <p className="text-xs font-medium text-white mb-3">Quick actions</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { icon: '➕', label: 'Post a job',      sub: 'Go live in 5 min', href: '/hire/post'     },
                { icon: '👥', label: 'Browse candidates', sub: '142 in pipeline', href: '/hire/pipeline'  },
                { icon: '📅', label: 'Interviews',       sub: '6 pending today',  href: '#'              },
                { icon: '💬', label: 'Messages',         sub: '3 unread',         href: '#'              },
              ].map(({ icon, label, sub, href }) => (
                <Link key={label} href={href} className="flex flex-col gap-1.5 p-2.5 rounded-xl border border-white/8 bg-white/[0.02] hover:border-emerald-500/25 hover:bg-emerald-500/5 transition-all cursor-pointer">
                  <span className="text-base">{icon}</span>
                  <div>
                    <p className="text-[11px] font-medium text-white">{label}</p>
                    <p className="text-[10px] text-white/30">{sub}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Activity */}
          <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-4">
            <p className="text-xs font-medium text-white mb-3">Recent activity</p>
            <div className="space-y-0">
              {activity.map(({ icon, text, sub, color }, i) => (
                <div key={i} className={`flex gap-2.5 py-2.5 ${i < activity.length - 1 ? 'border-b border-white/5' : ''}`}>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] flex-shrink-0 mt-0.5 ${color}`}>{icon}</div>
                  <div>
                    <p className="text-[11px] text-white/65 leading-snug">{text}</p>
                    <p className="text-[10px] text-white/25 mt-0.5">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hiring health */}
          <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-4">
            <p className="text-xs font-medium text-white mb-3">Hiring health</p>
            <div className="space-y-2">
              {health.map(({ icon, label, value, color, bg }) => (
                <div key={label} className="flex items-center gap-2.5">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] flex-shrink-0 ${bg}`}>{icon}</div>
                  <span className="text-xs text-white/40 flex-1">{label}</span>
                  <span className={`text-xs font-medium ${color}`}>{value}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}