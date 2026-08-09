'use client'
import { useState } from 'react'
import { cn, matchColor } from '@/lib/utils'

type Stage = 'APPLIED' | 'SCREENED' | 'INTERVIEW' | 'OFFER' | 'REJECTED'

interface Candidate {
  id:       string
  name:     string
  initials: string
  avColor:  string
  role:     string
  exp:      string
  location: string
  salary:   string
  match:    number
  skills:   string[]
  source:   string
  time:     string
  stage:    Stage
  isNew?:   boolean
  urgent?:  boolean
  note?:    string
}

const CANDIDATES: Candidate[] = [
  { id:'1', name:'Arjun Rao',    initials:'AR', avColor:'bg-violet-500/20 text-violet-300', role:'Frontend Dev · 2 yrs',   exp:'2 yrs',  location:'Bangalore', salary:'₹10–20L', match:96, skills:['React','Node.js','MongoDB'], source:'Nova',     time:'2h ago',  stage:'APPLIED',   isNew:true   },
  { id:'2', name:'Priya Singh',  initials:'PS', avColor:'bg-amber-500/20 text-amber-300',   role:'React Dev · 3 yrs',      exp:'3 yrs',  location:'Pune',       salary:'₹12–18L', match:91, skills:['React','TypeScript'],        source:'LinkedIn', time:'5h ago',  stage:'APPLIED',   isNew:true   },
  { id:'3', name:'Mihir Kulkarni',initials:'MK',avColor:'bg-teal-500/20 text-teal-300',    role:'MERN Dev · 2 yrs',       exp:'2 yrs',  location:'Mumbai',     salary:'₹8–14L',  match:78, skills:['React','MongoDB'],            source:'Nova',     time:'1d ago',  stage:'APPLIED'              },
  { id:'4', name:'Rahul Kumar',  initials:'RK', avColor:'bg-emerald-500/20 text-emerald-300',role:'Full Stack · 4 yrs',   exp:'4 yrs',  location:'Remote',     salary:'₹18–24L', match:88, skills:['React','AWS'],               source:'Naukri',   time:'2d ago',  stage:'SCREENED', note:'Above budget' },
  { id:'5', name:'Divya Gupta',  initials:'DG', avColor:'bg-blue-500/20 text-blue-300',     role:'Frontend Dev · 3 yrs', exp:'3 yrs',  location:'Bangalore',  salary:'₹14–18L', match:82, skills:['React','Redux'],             source:'LinkedIn', time:'3d ago',  stage:'SCREENED'             },
  { id:'6', name:'Vikram Nair',  initials:'VN', avColor:'bg-amber-500/20 text-amber-300',   role:'React Dev · 3 yrs',    exp:'3 yrs',  location:'Bangalore',  salary:'₹16–20L', match:93, skills:['React','TypeScript'],        source:'Nova',     time:'Tomorrow', stage:'INTERVIEW', urgent:true   },
  { id:'7', name:'Sanya Joshi',  initials:'SJ', avColor:'bg-emerald-500/20 text-emerald-300',role:'Frontend Lead · 5 yrs', exp:'5 yrs', location:'Bangalore',  salary:'₹20–26L', match:85, skills:['TypeScript','GraphQL'],      source:'Naukri',   time:'In 3d',   stage:'INTERVIEW'             },
  { id:'8', name:'Karan Mehta',  initials:'KM', avColor:'bg-emerald-500/20 text-emerald-300',role:'React Dev · 3 yrs',    exp:'3 yrs', location:'Bangalore',  salary:'₹18–22L', match:97, skills:['React','Node.js'],           source:'Nova',     time:'Awaiting', stage:'OFFER'                 },
  { id:'9', name:'Amit Nair',    initials:'AN', avColor:'bg-white/10 text-white/40',         role:'JS Dev · 1 yr',        exp:'1 yr',  location:'Hyderabad',  salary:'₹6–10L',  match:54, skills:['JavaScript'],               source:'Indeed',   time:'Notified', stage:'REJECTED'             },
]

const COLS: { stage: Stage; label: string; dot: string }[] = [
  { stage:'APPLIED',   label:'Applied',   dot:'bg-violet-500' },
  { stage:'SCREENED',  label:'Screened',  dot:'bg-blue-500'   },
  { stage:'INTERVIEW', label:'Interview', dot:'bg-amber-500'  },
  { stage:'OFFER',     label:'Offer',     dot:'bg-emerald-500'},
  { stage:'REJECTED',  label:'Rejected',  dot:'bg-red-500'    },
]

export function PipelinePage() {
  const [candidates, setCandidates]   = useState<Candidate[]>(CANDIDATES)
  const [selected, setSelected]       = useState<Candidate | null>(null)
  const [checked, setChecked]         = useState<string[]>([])
  const [jobFilter, setJobFilter]     = useState('Senior React Developer')

  const toggleCheck = (id: string) =>
    setChecked(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id])

  const move = (id: string, stage: Stage) => {
    setCandidates(p => p.map(c => c.id === id ? { ...c, stage } : c))
    if (selected?.id === id) setSelected(p => p ? { ...p, stage } : null)
  }

  const bulkMove = (stage: Stage) => {
    setCandidates(p => p.map(c => checked.includes(c.id) ? { ...c, stage } : c))
    setChecked([])
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">

      {/* Filter bar */}
      <div className="flex items-center gap-3 px-4 py-2.5 border-b border-white/8 bg-[#08090e] flex-shrink-0 flex-wrap">
        <select
          value={jobFilter}
          onChange={e => setJobFilter(e.target.value)}
          className="text-xs bg-white/[0.04] border border-white/10 text-white font-medium rounded-xl px-3 py-2 outline-none cursor-pointer"
        >
          {['Senior React Developer', 'Backend Engineer', 'Product Designer'].map(j => <option key={j}>{j}</option>)}
        </select>
        <div className="w-px h-5 bg-white/8 flex-shrink-0" />
        <div className="flex gap-1.5">
          {['All stages', '90%+ match', 'New today', 'Nova applicants'].map((chip, i) => (
            <button key={chip} className={cn('text-[11px] px-2.5 py-1 rounded-full border transition-all',
              i === 0 ? 'bg-violet-500/12 border-violet-500/30 text-violet-300' : 'border-white/10 text-white/35 hover:border-white/20')}>
              {chip}
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-2 bg-white/[0.04] border border-white/8 rounded-xl px-3 py-1.5">
          <span className="text-[11px] text-white/25">🔍</span>
          <input type="text" placeholder="Search name, skill…" className="bg-transparent text-[11px] text-white placeholder-white/20 outline-none w-28" />
        </div>
      </div>

      {/* Bulk action bar */}
      {checked.length > 0 && (
        <div className="flex items-center gap-3 px-4 py-2 bg-violet-500/8 border-b border-violet-500/20 flex-shrink-0">
          <span className="text-xs font-medium text-violet-300">{checked.length} selected</span>
          <div className="flex gap-2 flex-1">
            <button onClick={() => bulkMove('SCREENED')}  className="text-xs px-2.5 py-1 rounded-lg border border-violet-500/20 text-violet-300 hover:bg-violet-500/10 transition-all">Shortlist</button>
            <button onClick={() => bulkMove('INTERVIEW')} className="text-xs px-2.5 py-1 rounded-lg border border-violet-500/20 text-violet-300 hover:bg-violet-500/10 transition-all">Schedule interview</button>
            <button className="text-xs px-2.5 py-1 rounded-lg border border-violet-500/20 text-violet-300 hover:bg-violet-500/10 transition-all">💬 WhatsApp</button>
            <button onClick={() => bulkMove('REJECTED')}  className="text-xs px-2.5 py-1 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/8 transition-all">Reject</button>
          </div>
          <button onClick={() => setChecked([])} className="text-xs text-white/25 hover:text-white/50 transition-colors">✕ Deselect</button>
        </div>
      )}

      {/* Board + drawer */}
      <div className="flex flex-1 overflow-hidden">

        {/* Kanban */}
        <div className="flex-1 overflow-x-auto overflow-y-hidden p-4">
          <div className="flex gap-3 h-full min-w-max">
            {COLS.map(({ stage, label, dot }) => {
              const col = candidates.filter(c => c.stage === stage)
              return (
                <div key={stage} className="w-[200px] flex-shrink-0 bg-[#08090e] border border-white/8 rounded-2xl flex flex-col overflow-hidden">
                  <div className="flex items-center justify-between px-3 py-2.5 border-b border-white/8 flex-shrink-0">
                    <div className="flex items-center gap-1.5">
                      <div className={cn('w-2 h-2 rounded-full', dot)} />
                      <span className="text-xs font-medium text-white">{label}</span>
                    </div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/6 border border-white/8 text-white/35">{col.length}</span>
                  </div>
                  <div className="flex-1 overflow-y-auto p-2 space-y-2">
                    {col.map(c => (
                      <div
                        key={c.id}
                        onClick={() => setSelected(c)}
                        className={cn(
                          'rounded-xl border p-2.5 cursor-pointer transition-all group',
                          selected?.id === c.id ? 'border-emerald-500/40 bg-emerald-500/8' :
                          c.urgent ? 'border-amber-500/25 bg-amber-500/5 hover:border-amber-500/40' :
                          'border-white/6 bg-white/[0.015] hover:border-white/12 hover:bg-white/[0.03]',
                          stage === 'REJECTED' && 'opacity-65'
                        )}
                      >
                        <div className="flex items-start gap-2 mb-2">
                          <div onClick={e => { e.stopPropagation(); toggleCheck(c.id) }}
                            className={cn('w-3.5 h-3.5 rounded border flex items-center justify-center flex-shrink-0 mt-0.5 text-[9px] cursor-pointer transition-all',
                              checked.includes(c.id) ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-white/15 hover:border-emerald-500/50')}>
                            {checked.includes(c.id) && '✓'}
                          </div>
                          <div className={cn('w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-medium flex-shrink-0', c.avColor)}>{c.initials}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1">
                              <p className="text-[11px] font-medium text-white truncate">{c.name}</p>
                              {c.isNew && <span className="text-[8px] px-1 py-0.5 rounded-full bg-red-500/15 text-red-400">New</span>}
                            </div>
                            <p className="text-[10px] text-white/30 truncate">{c.role}</p>
                          </div>
                          <span className={cn('text-[9px] font-semibold px-1 py-0.5 rounded flex-shrink-0', matchColor(c.match))}>{c.match}%</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-1.5">
                          {c.skills.slice(0, 2).map(s => (
                            <span key={s} className="text-[9px] px-1.5 py-0.5 rounded-md bg-emerald-500/8 text-emerald-400 border border-emerald-500/15">{s}</span>
                          ))}
                          {c.note && <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/15">{c.note}</span>}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] text-white/20">{c.time}</span>
                          <button
                            onClick={e => { e.stopPropagation(); const next: Partial<Record<Stage,Stage>> = { APPLIED:'SCREENED', SCREENED:'INTERVIEW', INTERVIEW:'OFFER' }; if (next[stage]) move(c.id, next[stage]!) }}
                            className="text-[9px] px-1.5 py-0.5 rounded-md border border-white/10 text-white/20 hover:border-emerald-500/30 hover:text-emerald-400 transition-all opacity-0 group-hover:opacity-100"
                          >
                            Move →
                          </button>
                        </div>
                      </div>
                    ))}
                    {col.length === 0 && <p className="text-center text-[10px] text-white/12 py-8">No candidates</p>}
                  </div>
                  <button className="mx-2 mb-2 py-1.5 border border-dashed border-white/8 hover:border-emerald-500/25 text-white/15 hover:text-emerald-400 text-[10px] rounded-xl transition-all flex-shrink-0">
                    + Add
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        {/* Candidate drawer */}
        {selected && (
          <aside className="w-[270px] flex-shrink-0 bg-[#08090e] border-l border-white/8 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/8 flex-shrink-0">
              <span className="text-[10px] font-medium uppercase tracking-widest text-white/25">Candidate detail</span>
              <button onClick={() => setSelected(null)} className="w-6 h-6 rounded-lg border border-white/10 flex items-center justify-center text-white/25 hover:text-white/60 text-xs">✕</button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">

              {/* Profile */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className={cn('w-11 h-11 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0', selected.avColor)}>{selected.initials}</div>
                  <div>
                    <p className="text-sm font-medium text-white">{selected.name}</p>
                    <p className="text-[10px] text-white/35 mt-0.5">{selected.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className={cn('text-xs font-semibold px-2 py-0.5 rounded-md', matchColor(selected.match))}>{selected.match}% match</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 border border-white/8 text-white/35">{selected.source}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Experience', value: selected.exp      },
                    { label: 'Salary ask', value: selected.salary   },
                    { label: 'Location',   value: selected.location },
                    { label: 'Source',     value: selected.source   },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-white/[0.03] border border-white/6 rounded-xl p-2.5">
                      <p className="text-[9px] text-white/25 mb-1">{label}</p>
                      <p className="text-xs font-medium text-white/70">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Match band */}
              <div className="bg-emerald-500/6 border border-emerald-500/20 rounded-xl p-3">
                <div className="flex justify-between mb-2"><span className="text-xs font-medium text-emerald-400">Nova match score</span><span className="text-lg font-medium text-emerald-400">{selected.match}%</span></div>
                <div className="h-1.5 bg-white/8 rounded-full overflow-hidden mb-1">
                  <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${selected.match}%` }} />
                </div>
                <p className="text-[10px] text-emerald-400/70">Meets {Math.round(selected.match / 100 * 15)} of 15 requirements</p>
              </div>

              {/* Skills */}
              <div>
                <p className="text-[10px] font-medium uppercase tracking-widest text-white/25 mb-2">Skills</p>
                <div className="flex flex-wrap gap-1.5">
                  {selected.skills.map(sk => (
                    <span key={sk} className="text-[11px] px-2 py-0.5 rounded-md border bg-emerald-500/8 border-emerald-500/20 text-emerald-400">{sk}</span>
                  ))}
                </div>
              </div>

              {/* Move stage */}
              <div>
                <p className="text-[10px] font-medium uppercase tracking-widest text-white/25 mb-2">Move stage</p>
                <select
                  value={selected.stage}
                  onChange={e => move(selected.id, e.target.value as Stage)}
                  className="w-full bg-white/[0.04] border border-white/10 text-white/60 text-xs rounded-xl px-3 py-2.5 outline-none cursor-pointer"
                >
                  {COLS.map(({ stage, label }) => <option key={stage} value={stage}>{label}</option>)}
                </select>
              </div>

            </div>

            {/* CTAs */}
            <div className="p-4 border-t border-white/8 space-y-2 flex-shrink-0">
              <button className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium rounded-xl transition-all">
                📅 Schedule interview
              </button>
              <div className="grid grid-cols-2 gap-2">
                <button className="py-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 text-xs rounded-xl transition-all">✅ Shortlist</button>
                <button className="py-2 border border-white/10 hover:border-white/20 text-white/35 hover:text-white/60 text-xs rounded-xl transition-all">💬 Message</button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button className="py-2 border border-white/10 hover:border-white/20 text-white/35 text-xs rounded-xl transition-all">📄 Resume</button>
                <button onClick={() => move(selected.id, 'REJECTED')} className="py-2 border border-red-500/15 hover:border-red-500/30 text-red-400/60 hover:text-red-400 text-xs rounded-xl transition-all">Reject</button>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  )
}