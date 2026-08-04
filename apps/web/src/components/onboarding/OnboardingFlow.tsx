'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import type { OnboardingState } from '@/types'

/* ── Progress bar ──────────────────────────── */
function ProgressBar({ step }: { step: number }) {
  const steps = ['Role', 'Experience', 'Skills', 'Location', 'Done']
  return (
    <div className="w-full max-w-lg mx-auto mb-8">
      <div className="flex items-center gap-0">
        {steps.map((label, i) => {
          const num    = i + 1
          const done   = num < step
          const active = num === step
          return (
            <div key={label} className={cn('flex items-center', i < steps.length - 1 && 'flex-1')}>
              <div className="flex flex-col items-center gap-1">
                <div className={cn(
                  'w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-all',
                  done   ? 'bg-emerald-500 text-white' :
                  active ? 'bg-violet-600 text-white' :
                           'bg-white/10 text-white/30'
                )}>
                  {done ? '✓' : num}
                </div>
                <span className={cn(
                  'text-[10px] whitespace-nowrap',
                  active ? 'text-violet-400' : done ? 'text-emerald-400' : 'text-white/25'
                )}>{label}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={cn(
                  'flex-1 h-px mx-2 mb-4 transition-all',
                  done ? 'bg-emerald-500/50' : 'bg-white/8'
                )}/>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ── Step 1 — Role ─────────────────────────── */
function StepRole({
  state, setState, onNext,
}: {
  state: OnboardingState
  setState: React.Dispatch<React.SetStateAction<OnboardingState>>
  onNext: () => void
}) {
  const suggestions = [
    'Software Engineer', 'React Developer', 'Full Stack Developer',
    'Data Analyst', 'Product Manager', 'UI/UX Designer',
    'DevOps Engineer', 'Backend Developer', 'Data Scientist',
  ]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-xs text-violet-400 font-medium uppercase tracking-widest mb-2">Step 1 of 5</p>
        <h2 className="text-2xl font-medium text-white mb-2">What role are you looking for?</h2>
        <p className="text-sm text-white/40">Nova will tailor every job match and resume to this role.</p>
      </div>

      <div>
        <input
          type="text"
          placeholder="e.g. React Developer, Data Analyst…"
          value={state.role}
          onChange={e => setState(s => ({ ...s, role: e.target.value }))}
          className="w-full bg-white/[0.04] border border-white/10 focus:border-violet-500/50 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/20 outline-none transition-all"
          autoFocus
        />
      </div>

      <div>
        <p className="text-xs text-white/30 mb-3">Popular roles</p>
        <div className="flex flex-wrap gap-2">
          {suggestions.map(s => (
            <button
              key={s}
              onClick={() => setState(st => ({ ...st, role: s }))}
              className={cn(
                'text-xs px-3 py-1.5 rounded-full border transition-all',
                state.role === s
                  ? 'bg-violet-500/15 border-violet-500/40 text-violet-300'
                  : 'border-white/10 text-white/40 hover:border-white/20 hover:text-white/60'
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onNext}
        disabled={!state.role.trim()}
        className="w-full py-3 bg-violet-600 hover:bg-violet-500 disabled:opacity-30 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-all"
      >
        Continue →
      </button>
    </div>
  )
}

/* ── Step 2 — Experience ───────────────────── */
function StepExperience({
  state, setState, onNext, onBack,
}: {
  state: OnboardingState
  setState: React.Dispatch<React.SetStateAction<OnboardingState>>
  onNext: () => void
  onBack: () => void
}) {
  const levels = [
    { label: 'Fresher',   sub: '0 years',   icon: '🌱', value: 0 },
    { label: 'Junior',    sub: '1–3 years',  icon: '⚡', value: 1 },
    { label: 'Mid-level', sub: '3–6 years',  icon: '🚀', value: 3 },
    { label: 'Senior',    sub: '6+ years',   icon: '👑', value: 6 },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-xs text-violet-400 font-medium uppercase tracking-widest mb-2">Step 2 of 5</p>
        <h2 className="text-2xl font-medium text-white mb-2">How much experience do you have?</h2>
        <p className="text-sm text-white/40">Nova uses this to find the right-level roles and write your summary.</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {levels.map(({ label, sub, icon, value }) => (
          <button
            key={label}
            onClick={() => setState(s => ({ ...s, experience: value }))}
            className={cn(
              'flex flex-col items-center gap-2 p-5 rounded-2xl border transition-all',
              state.experience === value
                ? 'border-violet-500/50 bg-violet-500/10'
                : 'border-white/8 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]'
            )}
          >
            <span className="text-2xl">{icon}</span>
            <span className={cn('text-sm font-medium', state.experience === value ? 'text-violet-300' : 'text-white')}>{label}</span>
            <span className="text-xs text-white/35">{sub}</span>
          </button>
        ))}
      </div>

      {state.experience === 0 && (
        <div className="bg-blue-500/8 border border-blue-500/20 rounded-xl p-3 text-xs text-blue-300">
          💡 Fresher? Nova creates a skills-forward resume that highlights your projects and potential — not your lack of work experience.
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <button onClick={onBack} className="py-3 border border-white/10 hover:border-white/20 text-white/50 hover:text-white rounded-xl transition-all text-sm">← Back</button>
        <button
          onClick={onNext}
          className="py-3 bg-violet-600 hover:bg-violet-500 text-white font-medium rounded-xl transition-all text-sm"
        >
          Continue →
        </button>
      </div>
    </div>
  )
}

/* ── Step 3 — Skills ───────────────────────── */
function StepSkills({
  state, setState, onNext, onBack,
}: {
  state: OnboardingState
  setState: React.Dispatch<React.SetStateAction<OnboardingState>>
  onNext: () => void
  onBack: () => void
}) {
  const [input, setInput] = useState('')

  const suggestions: Record<string, string[]> = {
    'React Developer':     ['React.js', 'JavaScript', 'TypeScript', 'Node.js', 'REST APIs', 'Git', 'Redux', 'HTML/CSS'],
    'Data Analyst':        ['Python', 'SQL', 'Excel', 'Power BI', 'Tableau', 'Pandas', 'Statistics'],
    'Product Manager':     ['Product Strategy', 'Agile', 'Figma', 'SQL', 'User Research', 'Roadmapping'],
    'Full Stack Developer': ['React.js', 'Node.js', 'MongoDB', 'PostgreSQL', 'REST APIs', 'Docker'],
    'Software Engineer':   ['Python', 'Java', 'C++', 'Data Structures', 'Algorithms', 'System Design'],
  }

  const suggested = suggestions[state.role] ?? ['JavaScript', 'Python', 'SQL', 'React', 'Node.js', 'Git', 'Docker', 'AWS']

  const addSkill = (skill: string) => {
    if (!state.skills.includes(skill) && skill.trim()) {
      setState(s => ({ ...s, skills: [...s.skills, skill.trim()] }))
    }
    setInput('')
  }

  const removeSkill = (skill: string) => {
    setState(s => ({ ...s, skills: s.skills.filter(sk => sk !== skill) }))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ',') && input.trim()) {
      e.preventDefault()
      addSkill(input)
    }
  }

  return (
    <div className="space-y-5">
      <div className="text-center">
        <p className="text-xs text-violet-400 font-medium uppercase tracking-widest mb-2">Step 3 of 5</p>
        <h2 className="text-2xl font-medium text-white mb-2">What are your top skills?</h2>
        <p className="text-sm text-white/40">Add 5–10 for the best job matches. Press Enter to add each one.</p>
      </div>

      {/* Input */}
      <div className="bg-white/[0.04] border border-white/10 focus-within:border-violet-500/50 rounded-xl px-4 py-3 transition-all">
        <div className="flex flex-wrap gap-1.5 mb-2">
          {state.skills.map(skill => (
            <span
              key={skill}
              className="flex items-center gap-1 text-xs bg-violet-500/15 text-violet-300 border border-violet-500/30 px-2.5 py-1 rounded-full"
            >
              {skill}
              <button onClick={() => removeSkill(skill)} className="text-violet-400/60 hover:text-violet-300 ml-0.5">×</button>
            </span>
          ))}
        </div>
        <input
          type="text"
          placeholder={state.skills.length === 0 ? 'e.g. React.js, Python, SQL…' : 'Add more skills…'}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent text-sm text-white placeholder-white/20 outline-none"
        />
      </div>

      <div className="text-right text-xs text-white/25">
        {state.skills.length} skills added · aim for 8–10
      </div>

      {/* Suggestions */}
      <div>
        <p className="text-xs text-white/30 mb-2">Suggested for {state.role || 'your role'}</p>
        <div className="flex flex-wrap gap-2">
          {suggested.filter(s => !state.skills.includes(s)).map(s => (
            <button
              key={s}
              onClick={() => addSkill(s)}
              className="text-xs px-3 py-1.5 rounded-full border border-dashed border-white/15 text-white/35 hover:border-violet-500/40 hover:text-violet-300 transition-all"
            >
              + {s}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button onClick={onBack} className="py-3 border border-white/10 hover:border-white/20 text-white/50 hover:text-white rounded-xl transition-all text-sm">← Back</button>
        <button
          onClick={onNext}
          disabled={state.skills.length < 1}
          className="py-3 bg-violet-600 hover:bg-violet-500 disabled:opacity-30 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-all text-sm"
        >
          Continue →
        </button>
      </div>
    </div>
  )
}

/* ── Step 4 — Location ─────────────────────── */
function StepLocation({
  state, setState, onNext, onBack,
}: {
  state: OnboardingState
  setState: React.Dispatch<React.SetStateAction<OnboardingState>>
  onNext: () => void
  onBack: () => void
}) {
  const cities = ['Bangalore', 'Mumbai', 'Delhi / NCR', 'Pune', 'Hyderabad', 'Chennai', 'Remote']
  const modes  = [
    { label: 'Hybrid',      value: 'HYBRID'  },
    { label: 'Remote only', value: 'REMOTE'  },
    { label: 'On-site',     value: 'ONSITE'  },
    { label: 'Any',         value: 'ANY'     },
  ]

  return (
    <div className="space-y-5">
      <div className="text-center">
        <p className="text-xs text-violet-400 font-medium uppercase tracking-widest mb-2">Step 4 of 5</p>
        <h2 className="text-2xl font-medium text-white mb-2">Where do you want to work?</h2>
        <p className="text-sm text-white/40">Nova filters jobs by your city and work mode preference.</p>
      </div>

      {/* City picker */}
      <div>
        <p className="text-xs font-medium text-white/40 mb-2.5">Preferred city</p>
        <div className="grid grid-cols-2 gap-2">
          {cities.map(city => (
            <button
              key={city}
              onClick={() => setState(s => ({ ...s, city }))}
              className={cn(
                'py-2.5 px-4 rounded-xl border text-sm transition-all text-left',
                state.city === city
                  ? 'border-violet-500/50 bg-violet-500/10 text-violet-300'
                  : 'border-white/8 text-white/45 hover:border-white/15 hover:text-white/70'
              )}
            >
              {city}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Other city…"
          value={!cities.includes(state.city) ? state.city : ''}
          onChange={e => setState(s => ({ ...s, city: e.target.value }))}
          className="mt-2 w-full bg-white/[0.03] border border-white/8 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 outline-none focus:border-violet-500/40 transition-all"
        />
      </div>

      {/* Work mode */}
      <div>
        <p className="text-xs font-medium text-white/40 mb-2.5">Work mode</p>
        <div className="grid grid-cols-2 gap-2">
          {modes.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setState(s => ({ ...s, workMode: value }))}
              className={cn(
                'py-2.5 px-4 rounded-xl border text-sm transition-all',
                state.workMode === value
                  ? 'border-violet-500/50 bg-violet-500/10 text-violet-300'
                  : 'border-white/8 text-white/45 hover:border-white/15 hover:text-white/70'
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Salary */}
      <div>
        <p className="text-xs font-medium text-white/40 mb-2.5">Expected salary (LPA)</p>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <p className="text-[10px] text-white/25 mb-1">Minimum</p>
            <input
              type="number"
              placeholder="8"
              value={state.salaryMin || ''}
              onChange={e => setState(s => ({ ...s, salaryMin: Number(e.target.value) }))}
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/20 outline-none focus:border-violet-500/40 transition-all"
            />
          </div>
          <span className="text-white/25 mt-4">–</span>
          <div className="flex-1">
            <p className="text-[10px] text-white/25 mb-1">Maximum</p>
            <input
              type="number"
              placeholder="20"
              value={state.salaryMax || ''}
              onChange={e => setState(s => ({ ...s, salaryMax: Number(e.target.value) }))}
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/20 outline-none focus:border-violet-500/40 transition-all"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button onClick={onBack} className="py-3 border border-white/10 hover:border-white/20 text-white/50 hover:text-white rounded-xl transition-all text-sm">← Back</button>
        <button
          onClick={onNext}
          disabled={!state.city}
          className="py-3 bg-violet-600 hover:bg-violet-500 disabled:opacity-30 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-all text-sm"
        >
          Build my profile ✦
        </button>
      </div>
    </div>
  )
}

/* ── Step 5 — Success ──────────────────────── */
function StepSuccess({ state }: { state: OnboardingState }) {
  const router = useRouter()

  return (
    <div className="text-center space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto text-3xl">
        ✨
      </div>

      <div>
        <h2 className="text-2xl font-medium text-white mb-2">You're all set!</h2>
        <p className="text-sm text-white/45">
          Nova is building your profile and finding your first job matches right now.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 text-left">
        {[
          { icon: '📄', label: 'Resume ready', sub: 'ATS-optimised v1' },
          { icon: '🎯', label: 'Matches found', sub: `Top: ${state.role}` },
          { icon: '💬', label: 'Nova is live', sub: 'Via WhatsApp' },
        ].map(({ icon, label, sub }) => (
          <div key={label} className="bg-white/[0.03] border border-white/8 rounded-xl p-3 text-center">
            <div className="text-xl mb-1.5">{icon}</div>
            <p className="text-xs font-medium text-white mb-0.5">{label}</p>
            <p className="text-[10px] text-white/35">{sub}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <button
          onClick={() => router.push('/dashboard')}
          className="w-full py-3 bg-violet-600 hover:bg-violet-500 text-white font-medium rounded-xl transition-all"
        >
          Go to my dashboard →
        </button>
        <button
          className="w-full py-3 bg-emerald-600/15 hover:bg-emerald-600/25 border border-emerald-500/25 text-emerald-400 font-medium rounded-xl transition-all"
        >
          💬 Open Nova on WhatsApp
        </button>
      </div>

      <p className="text-xs text-white/25">
        Nova will send your first job digest tomorrow at 8 AM
      </p>
    </div>
  )
}

/* ── Main orchestrator ─────────────────────── */
const INITIAL: OnboardingState = {
  step: 1, role: '', experience: 0, skills: [],
  city: '', workMode: 'HYBRID', salaryMin: 0, salaryMax: 0,
}

export function OnboardingFlow() {
  const [state, setState] = useState<OnboardingState>(INITIAL)

  const next = () => setState(s => ({ ...s, step: Math.min(5, s.step + 1) as OnboardingState['step'] }))
  const back = () => setState(s => ({ ...s, step: Math.max(1, s.step - 1) as OnboardingState['step'] }))

  const saveAndNext = async () => {
    if (state.step === 4) {
      // TODO: POST /api/users/profile with state
      // await api.post('/users/profile', state)
    }
    next()
  }

  return (
    <div className="w-full max-w-lg">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-8 justify-center">
        <div className="w-7 h-7 rounded-lg bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-xs font-bold text-violet-400">✦</div>
        <span className="text-white font-medium">Nova</span>
      </div>

      <ProgressBar step={state.step} />

      <div className="bg-[#0a0f1e] border border-white/8 rounded-2xl p-7">
        {state.step === 1 && <StepRole     state={state} setState={setState} onNext={next} />}
        {state.step === 2 && <StepExperience state={state} setState={setState} onNext={next} onBack={back} />}
        {state.step === 3 && <StepSkills   state={state} setState={setState} onNext={next} onBack={back} />}
        {state.step === 4 && <StepLocation state={state} setState={setState} onNext={saveAndNext} onBack={back} />}
        {state.step === 5 && <StepSuccess  state={state} />}
      </div>
    </div>
  )
}