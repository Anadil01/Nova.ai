'use client'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { ProfileData } from './ProfilePage'

interface Props {
  profile:  ProfileData
  onUpdate: (p: Partial<ProfileData>) => void
}

export function SkillsSection({ profile, onUpdate }: Props) {
  const [input, setInput]   = useState('')
  const [target, setTarget] = useState<'primary' | 'secondary'>('primary')

  const add = (skill: string, type: 'primary' | 'secondary') => {
    const sk = skill.trim()
    if (!sk) return
    const key = type === 'primary' ? 'primarySkills' : 'secondarySkills'
    if (!profile[key].includes(sk)) {
      onUpdate({ [key]: [...profile[key], sk] })
    }
    setInput('')
  }

  const remove = (skill: string, type: 'primary' | 'secondary') => {
    const key = type === 'primary' ? 'primarySkills' : 'secondarySkills'
    onUpdate({ [key]: profile[key].filter(s => s !== skill) })
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ',') && input.trim()) {
      e.preventDefault()
      add(input, target)
    }
  }

  const atsTip = profile.primarySkills.filter(
    s => !['TypeScript', 'AWS', 'GraphQL'].includes(s)
  ).length < 2

  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-base">⚡</span>
        <p className="text-sm font-medium text-white">Skills</p>
        <span className="ml-auto text-[10px] text-white/25">
          {profile.primarySkills.length + profile.secondarySkills.length} total
        </span>
      </div>

      {/* Input */}
      <div className="mb-4">
        <div className="flex gap-2 mb-2">
          <button
            onClick={() => setTarget('primary')}
            className={cn(
              'text-[11px] px-2.5 py-1 rounded-lg border transition-all',
              target === 'primary'
                ? 'bg-violet-500/15 border-violet-500/30 text-violet-300'
                : 'border-white/10 text-white/35 hover:border-white/20'
            )}
          >
            Primary
          </button>
          <button
            onClick={() => setTarget('secondary')}
            className={cn(
              'text-[11px] px-2.5 py-1 rounded-lg border transition-all',
              target === 'secondary'
                ? 'bg-white/10 border-white/20 text-white/70'
                : 'border-white/10 text-white/35 hover:border-white/20'
            )}
          >
            Secondary
          </button>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type a skill and press Enter…"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            className="flex-1 bg-white/[0.04] border border-white/10 focus:border-violet-500/40 rounded-xl px-3 py-2 text-xs text-white placeholder-white/20 outline-none transition-all"
          />
          <button
            onClick={() => add(input, target)}
            className="px-3 py-2 bg-violet-600 hover:bg-violet-500 text-white text-xs rounded-xl transition-all"
          >
            + Add
          </button>
        </div>
      </div>

      {/* Primary skills */}
      <div className="mb-3">
        <p className="text-[10px] font-medium text-white/30 uppercase tracking-widest mb-2">
          Primary skills · used in resume + matching
        </p>
        <div className="flex flex-wrap gap-1.5">
          {profile.primarySkills.map(sk => (
            <span
              key={sk}
              className="flex items-center gap-1 text-xs bg-violet-500/12 text-violet-300 border border-violet-500/25 px-2.5 py-1 rounded-full"
            >
              {sk}
              <button
                onClick={() => remove(sk, 'primary')}
                className="text-violet-400/50 hover:text-violet-300 transition-colors ml-0.5"
              >
                ×
              </button>
            </span>
          ))}
          {profile.primarySkills.length === 0 && (
            <p className="text-xs text-white/20 italic">No primary skills yet</p>
          )}
        </div>
      </div>

      {/* Secondary skills */}
      <div className="mb-4">
        <p className="text-[10px] font-medium text-white/30 uppercase tracking-widest mb-2">
          Secondary skills · supporting experience
        </p>
        <div className="flex flex-wrap gap-1.5">
          {profile.secondarySkills.map(sk => (
            <span
              key={sk}
              className="flex items-center gap-1 text-xs bg-white/5 text-white/50 border border-white/10 px-2.5 py-1 rounded-full"
            >
              {sk}
              <button
                onClick={() => remove(sk, 'secondary')}
                className="text-white/25 hover:text-white/50 transition-colors ml-0.5"
              >
                ×
              </button>
            </span>
          ))}
          {profile.secondarySkills.length === 0 && (
            <p className="text-xs text-white/20 italic">No secondary skills yet</p>
          )}
        </div>
      </div>

      {/* ATS nudge */}
      {atsTip && (
        <div className="flex items-start gap-2.5 bg-amber-500/6 border border-amber-500/20 rounded-xl p-3">
          <span className="text-sm flex-shrink-0">⚠️</span>
          <p className="text-[11px] text-amber-300/80 leading-relaxed">
            Add <strong className="text-amber-300">TypeScript</strong> and <strong className="text-amber-300">AWS</strong> to boost your ATS score by 12 points on Razorpay JD.{' '}
            <button
              onClick={() => { add('TypeScript', 'primary'); add('AWS', 'secondary') }}
              className="text-violet-400 hover:text-violet-300 transition-colors underline underline-offset-2"
            >
              Add both →
            </button>
          </p>
        </div>
      )}
    </div>
  )
}