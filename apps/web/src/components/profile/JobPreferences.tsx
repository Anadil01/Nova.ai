'use client'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { ProfileData } from './ProfilePage'

interface Props {
  profile:  ProfileData
  onUpdate: (p: Partial<ProfileData>) => void
}

const CITIES     = ['Bangalore', 'Mumbai', 'Delhi / NCR', 'Pune', 'Hyderabad', 'Chennai', 'Remote']
const WORK_MODES = ['Remote', 'Hybrid', 'On-site']
const INDUSTRIES = ['Technology', 'Fintech', 'E-commerce', 'EdTech', 'Healthcare', 'Any']
const EXP_LEVELS = ['Fresher (0 yrs)', 'Junior (1–3 yrs)', 'Mid-level (3–6 yrs)', 'Senior (6+ yrs)']

export function JobPreferences({ profile, onUpdate }: Props) {
  const [editing, setEditing] = useState(false)
  const prefs = profile.preferences

  const toggleArr = (key: 'cities' | 'workMode' | 'industries', val: string) => {
    const arr = prefs[key] as string[]
    onUpdate({
      preferences: {
        ...prefs,
        [key]: arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val],
      },
    })
  }

  const Chip = ({
    label, on, onClick,
  }: { label: string; on: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      className={cn(
        'text-[11px] px-2.5 py-1 rounded-full border transition-all',
        on
          ? 'bg-violet-500/15 border-violet-500/35 text-violet-300'
          : 'border-white/10 text-white/35 hover:border-white/20 hover:text-white/60'
      )}
    >
      {label}
    </button>
  )

  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
      <div className="flex items-center gap-2 mb-5">
        <span className="text-base">🎯</span>
        <p className="text-sm font-medium text-white">Job preferences</p>
        <button
          onClick={() => setEditing(!editing)}
          className={cn(
            'ml-auto text-xs px-3 py-1.5 rounded-lg border transition-all',
            editing
              ? 'bg-violet-600 border-violet-500 text-white hover:bg-violet-500'
              : 'border-white/10 text-white/40 hover:border-white/20 hover:text-white/70'
          )}
        >
          {editing ? '✓ Done' : '✎ Edit'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-5">

        {/* Target role */}
        <div>
          <p className="text-[10px] font-medium text-white/30 uppercase tracking-widest mb-2">Target role</p>
          {editing ? (
            <input
              type="text"
              value={prefs.targetRole}
              onChange={e => onUpdate({ preferences: { ...prefs, targetRole: e.target.value } })}
              className="w-full bg-white/[0.04] border border-violet-500/30 rounded-xl px-3 py-2 text-xs text-white outline-none"
            />
          ) : (
            <p className="text-sm font-medium text-white">{prefs.targetRole}</p>
          )}
        </div>

        {/* Experience level */}
        <div>
          <p className="text-[10px] font-medium text-white/30 uppercase tracking-widest mb-2">Experience level</p>
          {editing ? (
            <div className="flex flex-wrap gap-1.5">
              {EXP_LEVELS.map(l => (
                <Chip
                  key={l}
                  label={l}
                  on={prefs.expLevel === l}
                  onClick={() => onUpdate({ preferences: { ...prefs, expLevel: l } })}
                />
              ))}
            </div>
          ) : (
            <p className="text-sm font-medium text-white">{prefs.expLevel}</p>
          )}
        </div>

        {/* Cities */}
        <div className="col-span-2">
          <p className="text-[10px] font-medium text-white/30 uppercase tracking-widest mb-2">Preferred cities</p>
          {editing ? (
            <div className="flex flex-wrap gap-1.5">
              {CITIES.map(c => (
                <Chip
                  key={c}
                  label={c}
                  on={prefs.cities.includes(c)}
                  onClick={() => toggleArr('cities', c)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {prefs.cities.map(c => (
                <span key={c} className="text-xs px-2.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300">
                  {c}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Work mode */}
        <div>
          <p className="text-[10px] font-medium text-white/30 uppercase tracking-widest mb-2">Work mode</p>
          {editing ? (
            <div className="flex flex-wrap gap-1.5">
              {WORK_MODES.map(m => (
                <Chip
                  key={m}
                  label={m}
                  on={prefs.workMode.includes(m)}
                  onClick={() => toggleArr('workMode', m)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {prefs.workMode.map(m => (
                <span key={m} className="text-xs px-2.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300">
                  {m}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Salary */}
        <div>
          <p className="text-[10px] font-medium text-white/30 uppercase tracking-widest mb-2">Expected salary</p>
          {editing ? (
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={prefs.salaryMin}
                onChange={e => onUpdate({ preferences: { ...prefs, salaryMin: Number(e.target.value) } })}
                className="w-16 bg-white/[0.04] border border-white/10 rounded-lg px-2 py-1.5 text-xs text-white outline-none text-center"
              />
              <span className="text-white/25 text-xs">–</span>
              <input
                type="number"
                value={prefs.salaryMax}
                onChange={e => onUpdate({ preferences: { ...prefs, salaryMax: Number(e.target.value) } })}
                className="w-16 bg-white/[0.04] border border-white/10 rounded-lg px-2 py-1.5 text-xs text-white outline-none text-center"
              />
              <span className="text-xs text-white/30">LPA</span>
            </div>
          ) : (
            <p className="text-sm font-medium text-white">₹{prefs.salaryMin}–{prefs.salaryMax} LPA</p>
          )}
        </div>

        {/* Industries */}
        <div className="col-span-2">
          <p className="text-[10px] font-medium text-white/30 uppercase tracking-widest mb-2">Industries</p>
          {editing ? (
            <div className="flex flex-wrap gap-1.5">
              {INDUSTRIES.map(ind => (
                <Chip
                  key={ind}
                  label={ind}
                  on={prefs.industries.includes(ind)}
                  onClick={() => toggleArr('industries', ind)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {prefs.industries.map(ind => (
                <span key={ind} className="text-xs px-2.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300">
                  {ind}
                </span>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}