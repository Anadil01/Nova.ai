'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

type Step = 1 | 2 | 3 | 4 | 5

interface JobForm {
  title:       string
  department:  string
  jobType:     string
  expLevel:    string
  openings:    string
  location:    string
  workMode:    string
  summary:     string
  responsibilities: string
  requirements:     string
  mustSkills:  string[]
  niceSkills:  string[]
  salaryMin:   string
  salaryMax:   string
  showSalary:  boolean
  perks:       string
  deadline:    string
  boards:      string[]
  autoScreen:  boolean
  waOutreach:  boolean
  autoReject:  boolean
  allowRemote: boolean
}

const INITIAL: JobForm = {
  title: 'Senior React Developer', department: 'Engineering', jobType: 'Full-time',
  expLevel: 'Mid-level (3–5 yrs)', openings: '2', location: 'Bangalore', workMode: 'Hybrid',
  summary: "We're looking for a Senior React Developer to join our payments dashboard team. You'll build high-performance frontend experiences used by 50M+ businesses across India.",
  responsibilities: "• Build and maintain React-based frontend for Razorpay Dashboard\n• Collaborate with backend team on API design and integration\n• Lead code reviews and mentor junior developers\n• Optimise performance for high-traffic payment flows",
  requirements: "• 3–5 years of production React experience\n• Strong understanding of JavaScript / TypeScript\n• Experience with RESTful APIs and state management",
  mustSkills:  ['React.js', 'JavaScript', 'REST APIs', 'Git', 'State management'],
  niceSkills:  ['TypeScript', 'GraphQL', 'AWS'],
  salaryMin: '18', salaryMax: '22', showSalary: true, perks: '',
  deadline: '15 Feb 2025', boards: ['Naukri', 'LinkedIn'],
  autoScreen: true, waOutreach: true, autoReject: false, allowRemote: true,
}

export function PostJobPage() {
  const router = useRouter()
  const [step, setStep]   = useState<Step>(1)
  const [form, setForm]   = useState<JobForm>(INITIAL)
  const [skillInput, setSkillInput] = useState('')
  const [publishing, setPublishing] = useState(false)

  const upd = (patch: Partial<JobForm>) => setForm(p => ({ ...p, ...patch }))

  const addSkill = (type: 'must' | 'nice') => {
    const sk = skillInput.trim()
    if (!sk) return
    if (type === 'must' && !form.mustSkills.includes(sk)) upd({ mustSkills: [...form.mustSkills, sk] })
    if (type === 'nice' && !form.niceSkills.includes(sk)) upd({ niceSkills: [...form.niceSkills, sk] })
    setSkillInput('')
  }

  const removeSkill = (type: 'must' | 'nice', sk: string) => {
    if (type === 'must') upd({ mustSkills: form.mustSkills.filter(s => s !== sk) })
    else upd({ niceSkills: form.niceSkills.filter(s => s !== sk) })
  }

  const toggleBoard = (b: string) => {
    upd({ boards: form.boards.includes(b) ? form.boards.filter(x => x !== b) : [...form.boards, b] })
  }

  const publish = async () => {
    setPublishing(true)
    await new Promise(r => setTimeout(r, 1500))
    setPublishing(false)
    router.push('/hire/pipeline')
  }

  const steps = ['Basics', 'Description', 'Skills', 'Pay & perks', 'Settings']

  const ProgressBar = () => (
    <div className="flex items-center gap-0 px-5 py-3 border-b border-white/8 bg-[#08090f] flex-shrink-0">
      {steps.map((label, i) => {
        const num    = i + 1
        const done   = num < step
        const active = num === step
        return (
          <div key={label} className={cn('flex items-center', i < steps.length - 1 && 'flex-1')}>
            <div className="flex flex-col items-center gap-1">
              <div className={cn('w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-medium border transition-all',
                done   ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400' :
                active ? 'bg-emerald-600 border-emerald-500 text-white' :
                         'border-white/10 text-white/25'
              )}>
                {done ? '✓' : num}
              </div>
              <span className={cn('text-[9px] whitespace-nowrap', active ? 'text-emerald-400 font-medium' : done ? 'text-emerald-400/60' : 'text-white/20')}>
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={cn('flex-1 h-px mx-2 mb-4', done ? 'bg-emerald-500/30' : 'bg-white/8')} />
            )}
          </div>
        )
      })}
    </div>
  )

  const fieldCls = "w-full bg-white/[0.04] border border-white/10 focus:border-emerald-500/40 rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/20 outline-none transition-all"
  const textareaCls = fieldCls + " resize-none leading-relaxed"
  const selectCls = fieldCls + " cursor-pointer"

  const Toggle = ({ on, onToggle }: { on: boolean; onToggle: () => void }) => (
    <button onClick={onToggle} className={`w-9 h-5 rounded-full relative flex-shrink-0 transition-all ${on ? 'bg-emerald-600' : 'bg-white/10'}`}>
      <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all shadow-sm ${on ? 'left-[18px]' : 'left-0.5'}`} />
    </button>
  )

  return (
    <div className="flex h-full overflow-hidden">

      {/* Form */}
      <div className="flex-1 flex flex-col overflow-hidden border-r border-white/8">
        <ProgressBar />
        <div className="flex-1 overflow-y-auto p-5 space-y-4">

          {/* Step 1 — Basics */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5 space-y-4">
                <p className="text-sm font-medium text-white flex items-center gap-2">📝 Job basics</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Job title *',      key: 'title',      type: 'input',  ph: 'e.g. Senior React Developer'    },
                    { label: 'Department',       key: 'department', type: 'input',  ph: 'e.g. Engineering'               },
                    { label: 'Job type *',       key: 'jobType',    type: 'select', opts: ['Full-time', 'Part-time', 'Contract', 'Internship'] },
                    { label: 'Experience level *', key: 'expLevel', type: 'select', opts: ['Fresher (0 yrs)', 'Junior (1–3 yrs)', 'Mid-level (3–5 yrs)', 'Senior (6+ yrs)'] },
                    { label: 'No. of openings',  key: 'openings',   type: 'input',  ph: '1'                              },
                    { label: 'Location *',       key: 'location',   type: 'input',  ph: 'e.g. Bangalore'                 },
                    { label: 'Work mode *',      key: 'workMode',   type: 'select', opts: ['Remote', 'Hybrid', 'On-site'] },
                  ].map(({ label, key, type, ph, opts }) => (
                    <div key={key}>
                      <p className="text-[11px] font-medium text-white/40 mb-1.5">{label}</p>
                      {type === 'select' ? (
                        <select value={(form as Record<string,string>)[key]} onChange={e => upd({ [key]: e.target.value } as Partial<JobForm>)} className={selectCls}>
                          {opts?.map(o => <option key={o}>{o}</option>)}
                        </select>
                      ) : (
                        <input type="text" placeholder={ph} value={(form as Record<string,string>)[key]} onChange={e => upd({ [key]: e.target.value } as Partial<JobForm>)} className={fieldCls} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2 — Description */}
          {step === 2 && (
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5 space-y-4">
              <p className="text-sm font-medium text-white flex items-center gap-2">📄 Job description</p>
              <div className="bg-emerald-500/6 border border-emerald-500/20 rounded-xl p-3 flex items-start gap-2.5">
                <span className="text-base flex-shrink-0">✦</span>
                <div className="flex-1">
                  <p className="text-xs font-medium text-emerald-300 mb-0.5">Nova extracted requirements from your description</p>
                  <p className="text-[11px] text-emerald-400/70">Found 8 skills, experience level (3–5 yrs), and 4 key responsibilities. Accept to auto-fill Skills section.</p>
                </div>
                <button className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg transition-all flex-shrink-0">Accept all</button>
              </div>
              {[
                { label: 'Role summary *', key: 'summary', rows: 3, ph: 'Describe the role in 2–3 sentences…' },
                { label: 'Key responsibilities *', key: 'responsibilities', rows: 5, ph: '• Bullet point responsibilities…' },
                { label: 'What you bring', key: 'requirements', rows: 4, ph: '• Required qualifications…' },
              ].map(({ label, key, rows, ph }) => (
                <div key={key}>
                  <p className="text-[11px] font-medium text-white/40 mb-1.5">{label}</p>
                  <textarea
                    rows={rows}
                    placeholder={ph}
                    value={(form as Record<string,string>)[key]}
                    onChange={e => upd({ [key]: e.target.value } as Partial<JobForm>)}
                    className={textareaCls}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Step 3 — Skills */}
          {step === 3 && (
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5 space-y-5">
              <p className="text-sm font-medium text-white flex items-center gap-2">⚡ Required skills</p>
              {(['must', 'nice'] as const).map(type => (
                <div key={type}>
                  <p className="text-[11px] font-medium text-white/40 mb-2">
                    {type === 'must' ? 'Must-have skills *' : 'Nice-to-have skills'}
                  </p>
                  <div className="flex gap-2 mb-2.5">
                    <input
                      type="text"
                      placeholder={`Add a ${type === 'must' ? 'required' : 'preferred'} skill…`}
                      value={skillInput}
                      onChange={e => setSkillInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && addSkill(type)}
                      className={fieldCls}
                    />
                    <button onClick={() => addSkill(type)} className="px-3.5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs rounded-xl transition-all whitespace-nowrap">+ Add</button>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {(type === 'must' ? form.mustSkills : form.niceSkills).map(sk => (
                      <span key={sk} className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border ${type === 'must' ? 'bg-emerald-500/12 text-emerald-300 border-emerald-500/25' : 'bg-white/5 text-white/50 border-white/10'}`}>
                        {sk}
                        <button onClick={() => removeSkill(type, sk)} className="opacity-50 hover:opacity-100">×</button>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              <div>
                <p className="text-[11px] font-medium text-white/40 mb-2">Suggested based on role</p>
                <div className="flex flex-wrap gap-1.5">
                  {['Node.js', 'Docker', 'Webpack', 'Jest', 'Figma'].filter(s => !form.mustSkills.includes(s) && !form.niceSkills.includes(s)).map(sk => (
                    <button key={sk} onClick={() => { setSkillInput(sk); }} className="text-xs px-2.5 py-1 rounded-full border border-dashed border-white/15 text-white/30 hover:border-emerald-500/30 hover:text-emerald-400 transition-all">
                      + {sk}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4 — Pay */}
          {step === 4 && (
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5 space-y-4">
              <p className="text-sm font-medium text-white flex items-center gap-2">₹ Compensation</p>
              <div>
                <p className="text-[11px] font-medium text-white/40 mb-1.5">Salary range (LPA) *</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <p className="text-[10px] text-white/25 mb-1">Minimum</p>
                    <input type="number" placeholder="18" value={form.salaryMin} onChange={e => upd({ salaryMin: e.target.value })} className={fieldCls} />
                  </div>
                  <span className="text-white/25 mt-4">–</span>
                  <div className="flex-1">
                    <p className="text-[10px] text-white/25 mb-1">Maximum</p>
                    <input type="number" placeholder="22" value={form.salaryMax} onChange={e => upd({ salaryMax: e.target.value })} className={fieldCls} />
                  </div>
                </div>
                <p className="text-[10px] text-emerald-400 mt-2 flex items-center gap-1">
                  ✦ Market range for {form.expLevel} in {form.location}: ₹16–26 LPA. Your range is competitive.
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white mb-0.5">Show salary to candidates</p>
                  <p className="text-xs text-white/35">Jobs with visible salary get 2× more applicants</p>
                </div>
                <Toggle on={form.showSalary} onToggle={() => upd({ showSalary: !form.showSalary })} />
              </div>
              <div>
                <p className="text-[11px] font-medium text-white/40 mb-1.5">Additional perks (optional)</p>
                <input type="text" placeholder="e.g. ESOPs, health insurance, learning budget…" value={form.perks} onChange={e => upd({ perks: e.target.value })} className={fieldCls} />
              </div>
            </div>
          )}

          {/* Step 5 — Settings */}
          {step === 5 && (
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5 space-y-5">
              <p className="text-sm font-medium text-white flex items-center gap-2">⚙️ Job settings</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[11px] font-medium text-white/40 mb-1.5">Application deadline</p>
                  <input type="text" value={form.deadline} onChange={e => upd({ deadline: e.target.value })} className={fieldCls} />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-white/40 mb-1.5">Job boards</p>
                  <div className="flex gap-2">
                    {['Naukri', 'LinkedIn', 'Indeed'].map(b => (
                      <button
                        key={b}
                        onClick={() => toggleBoard(b)}
                        className={cn('text-xs px-3 py-2 rounded-xl border flex-1 transition-all', form.boards.includes(b) ? 'bg-emerald-500/12 border-emerald-500/30 text-emerald-300' : 'border-white/10 text-white/35 hover:border-white/20')}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-0">
                {[
                  { key: 'autoScreen',  label: 'Auto-screen applicants with Nova',          sub: 'Nova ranks every applicant by match score automatically'     },
                  { key: 'waOutreach',  label: 'Send WhatsApp to matching candidates',       sub: 'Nova messages candidates who match 85%+ proactively'         },
                  { key: 'autoReject',  label: 'Auto-reject below 50% match',               sub: 'Candidates below threshold notified automatically'            },
                  { key: 'allowRemote', label: 'Allow remote applications',                 sub: 'Accept candidates outside your city for hybrid role'          },
                ].map(({ key, label, sub }) => (
                  <div key={key} className="flex items-start justify-between gap-4 py-3.5 border-b border-white/6 last:border-b-0">
                    <div>
                      <p className="text-sm font-medium text-white mb-0.5">{label}</p>
                      <p className="text-xs text-white/35">{sub}</p>
                    </div>
                    <Toggle on={(form as Record<string,boolean>)[key]} onToggle={() => upd({ [key]: !(form as Record<string,boolean>)[key] } as Partial<JobForm>)} />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Form footer */}
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-white/8 bg-[#08090f] flex-shrink-0">
          <p className="text-xs text-white/25">All changes auto-saved</p>
          <div className="flex gap-2">
            {step > 1 && (
              <button onClick={() => setStep(s => (s - 1) as Step)} className="text-sm border border-white/10 hover:border-white/20 text-white/45 hover:text-white px-4 py-2 rounded-xl transition-all">
                ← Back
              </button>
            )}
            {step < 5 ? (
              <button onClick={() => setStep(s => (s + 1) as Step)} className="text-sm bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-5 py-2 rounded-xl transition-all">
                Continue →
              </button>
            ) : (
              <button onClick={publish} disabled={publishing} className="text-sm bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 text-white font-medium px-5 py-2 rounded-xl transition-all flex items-center gap-2">
                {publishing ? (
                  <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Publishing…</>
                ) : '⚡ Publish now'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Preview panel */}
      <aside className="w-[280px] flex-shrink-0 bg-[#08090f] flex flex-col overflow-hidden">
        <div className="px-4 py-3.5 border-b border-white/8">
          <p className="text-xs font-medium text-white">Live preview</p>
          <p className="text-[10px] text-emerald-400 mt-0.5 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse"/>&nbsp;Updates as you type</p>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">

          {/* Job card preview */}
          <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-4">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center text-[10px] font-semibold text-white/40">RZ</div>
              <div>
                <p className="text-sm font-medium text-white">{form.title || 'Job title'}</p>
                <p className="text-[10px] text-white/35">Razorpay · {form.location}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {[form.jobType, `₹${form.salaryMin}–${form.salaryMax} LPA`, form.workMode].filter(Boolean).map(chip => (
                <span key={chip} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/8 text-white/40">{chip}</span>
              ))}
            </div>
            {form.mustSkills.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {form.mustSkills.slice(0, 4).map(sk => (
                  <span key={sk} className="text-[9px] px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/15">{sk}</span>
                ))}
              </div>
            )}
          </div>

          {/* Match estimate */}
          <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-4">
            <p className="text-[10px] font-medium uppercase tracking-widest text-white/25 mb-3">Nova match estimate</p>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="text-2xl font-medium text-emerald-400">342</span>
              <p className="text-xs text-white/40 leading-snug">candidates in Nova's database match at 60%+</p>
            </div>
            <div className="h-1.5 bg-white/6 rounded-full overflow-hidden mb-3">
              <div className="h-full rounded-full bg-emerald-500" style={{ width: '72%' }} />
            </div>
            <div className="space-y-1.5">
              {[['90%+ match (top tier)', '48', 'text-emerald-400'], ['75–90% match', '116', 'text-white/60'], ['60–75% match', '178', 'text-white/40']].map(([label, n, color]) => (
                <div key={label} className="flex justify-between text-xs">
                  <span className="text-white/35">{label}</span>
                  <span className={`font-medium ${color}`}>{n}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Publish checklist */}
          <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-4">
            <p className="text-[10px] font-medium uppercase tracking-widest text-white/25 mb-3">Ready to publish?</p>
            {[
              { label: 'Job title and basics complete', done: !!form.title },
              { label: 'Description filled in',         done: !!form.summary },
              { label: 'Skills added',                  done: form.mustSkills.length > 0 },
              { label: 'Salary range set',              done: !!(form.salaryMin && form.salaryMax) },
              { label: 'Job boards selected',           done: form.boards.length > 0 },
            ].map(({ label, done }) => (
              <div key={label} className="flex items-center gap-2 py-1.5">
                <span className={`text-sm flex-shrink-0 ${done ? 'text-emerald-400' : 'text-amber-400'}`}>{done ? '✅' : '⚠️'}</span>
                <span className={`text-xs ${done ? 'text-white/55' : 'text-amber-300/70'}`}>{label}</span>
              </div>
            ))}
          </div>

        </div>

        {/* Publish CTA */}
        <div className="p-4 border-t border-white/8 space-y-2 flex-shrink-0">
          <button onClick={publish} disabled={publishing} className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 text-white text-xs font-medium rounded-xl transition-all flex items-center justify-center gap-2">
            {publishing ? <svg className="animate-spin w-3.5 h-3.5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> : '⚡'}
            {publishing ? 'Publishing…' : 'Publish job — go live now'}
          </button>
          <button className="w-full py-2 border border-white/10 hover:border-white/20 text-white/35 hover:text-white/60 text-xs rounded-xl transition-all">
            Preview full listing →
          </button>
        </div>
      </aside>
    </div>
  )
}