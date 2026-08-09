'use client'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { ProfileData } from './ProfilePage'

interface Props {
  profile:  ProfileData
  onUpdate: (p: Partial<ProfileData>) => void
}

export function BasicInfoForm({ profile, onUpdate }: Props) {
  const [editing, setEditing] = useState(false)
  const [local, setLocal]     = useState(profile)

  const handleSave = () => {
    onUpdate(local)
    setEditing(false)
  }

  const field = (label: string, key: keyof ProfileData, placeholder?: string, full?: boolean) => (
    <div className={cn('flex flex-col gap-1.5', full && 'col-span-2')}>
      <label className="text-[11px] font-medium text-white/40">{label}</label>
      {editing ? (
        key === 'summary' ? (
          <textarea
            value={local[key] as string}
            onChange={e => setLocal(p => ({ ...p, [key]: e.target.value }))}
            rows={3}
            placeholder={placeholder}
            className="bg-white/[0.04] border border-violet-500/30 rounded-xl px-3 py-2 text-xs text-white placeholder-white/20 outline-none resize-none leading-relaxed"
          />
        ) : (
          <input
            type="text"
            value={local[key] as string}
            onChange={e => setLocal(p => ({ ...p, [key]: e.target.value }))}
            placeholder={placeholder}
            className="bg-white/[0.04] border border-violet-500/30 rounded-xl px-3 py-2 text-xs text-white placeholder-white/20 outline-none"
          />
        )
      ) : (
        <div className={cn(
          'px-3 py-2 rounded-xl border text-xs',
          (local[key] as string)
            ? 'border-white/6 bg-white/[0.02] text-white/60'
            : 'border-amber-500/15 bg-amber-500/5 text-amber-400/60 italic'
        )}>
          {(local[key] as string) || placeholder || `+ Add ${label.toLowerCase()}`}
        </div>
      )}
    </div>
  )

  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-base">👤</span>
          <p className="text-sm font-medium text-white">Basic information</p>
        </div>
        <div className="flex items-center gap-2">
          {editing && (
            <button
              onClick={() => { setLocal(profile); setEditing(false) }}
              className="text-xs text-white/35 hover:text-white/60 transition-colors"
            >
              Cancel
            </button>
          )}
          <button
            onClick={editing ? handleSave : () => setEditing(true)}
            className={cn(
              'text-xs px-3 py-1.5 rounded-lg border transition-all',
              editing
                ? 'bg-violet-600 border-violet-500 text-white hover:bg-violet-500'
                : 'border-white/10 text-white/40 hover:border-white/20 hover:text-white/70'
            )}
          >
            {editing ? '✓ Save' : '✎ Edit'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {field('Full name',      'name',      'Your full name'           )}
        {field('Phone number',   'phone',     '+91 XXXXX XXXXX'          )}
        {field('Email address',  'email',     'you@email.com'            )}
        {field('City',           'city',      'e.g. Bangalore'           )}
        {field('LinkedIn URL',   'linkedin',  '+ Add LinkedIn profile URL')}
        {field('Portfolio / GitHub', 'portfolio', '+ Add link'           )}
        {field('Professional summary', 'summary', 'Write a 2–3 sentence summary…', true)}
      </div>
    </div>
  )
}