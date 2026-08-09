'use client'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { ProfileData } from './ProfilePage'

type Exp = ProfileData['experience'][0]

interface Props {
  profile:  ProfileData
  onUpdate: (p: Partial<ProfileData>) => void
}

export function ExperienceSection({ profile, onUpdate }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [adding, setAdding]       = useState(false)
  const [form, setForm]           = useState<Partial<Exp>>({})

  const startEdit = (exp: Exp) => {
    setForm(exp)
    setEditingId(exp.id)
    setAdding(false)
  }

  const startAdd = () => {
    setForm({ isCurrent: false })
    setAdding(true)
    setEditingId(null)
  }

  const saveEdit = () => {
    if (!form.title || !form.company) return
    onUpdate({
      experience: profile.experience.map(e =>
        e.id === editingId ? { ...e, ...form } as Exp : e
      ),
    })
    setEditingId(null)
  }

  const saveAdd = () => {
    if (!form.title || !form.company) return
    const newExp: Exp = {
      id:          `e${Date.now()}`,
      title:       form.title ?? '',
      company:     form.company ?? '',
      location:    form.location ?? '',
      type:        form.type ?? 'Full-time',
      startDate:   form.startDate ?? '',
      endDate:     form.endDate ?? '',
      isCurrent:   form.isCurrent ?? false,
      description: form.description ?? '',
    }
    onUpdate({ experience: [...profile.experience, newExp] })
    setAdding(false)
    setForm({})
  }

  const del = (id: string) =>
    onUpdate({ experience: profile.experience.filter(e => e.id !== id) })

  const ExpForm = ({ onSave, onCancel }: { onSave: () => void; onCancel: () => void }) => (
    <div className="border border-violet-500/25 bg-violet-500/5 rounded-xl p-3.5 space-y-2.5">
      <div className="grid grid-cols-2 gap-2.5">
        {[
          ['Job title',  'title',    'e.g. Frontend Developer'],
          ['Company',    'company',  'e.g. TechCorp'],
          ['Location',   'location', 'e.g. Bangalore'],
          ['Type',       'type',     'Full-time'],
          ['Start date', 'startDate','e.g. Jan 2022'],
          ['End date',   'endDate',  'e.g. Dec 2022'],
        ].map(([label, key, ph]) => (
          <div key={key}>
            <p className="text-[10px] text-white/35 mb-1">{label}</p>
            <input
              type="text"
              placeholder={ph}
              value={(form as Record<string, string>)[key] ?? ''}
              onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
              className="w-full bg-white/[0.04] border border-white/10 focus:border-violet-500/30 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-white/20 outline-none transition-all"
            />
          </div>
        ))}
      </div>

      <div className="col-span-2">
        <p className="text-[10px] text-white/35 mb-1">Description</p>
        <textarea
          placeholder="Describe your key achievements and responsibilities…"
          value={form.description ?? ''}
          onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
          rows={2}
          className="w-full bg-white/[0.04] border border-white/10 focus:border-violet-500/30 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-white/20 outline-none resize-none transition-all"
        />
      </div>

      <label className="flex items-center gap-2 cursor-pointer">
        <div
          onClick={() => setForm(p => ({ ...p, isCurrent: !p.isCurrent }))}
          className={cn(
            'w-8 h-4 rounded-full relative transition-all',
            form.isCurrent ? 'bg-violet-600' : 'bg-white/10'
          )}
        >
          <div className={cn(
            'absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all',
            form.isCurrent ? 'left-4' : 'left-0.5'
          )} />
        </div>
        <span className="text-[11px] text-white/50">Current position</span>
      </label>

      <div className="flex gap-2 pt-1">
        <button
          onClick={onSave}
          className="flex-1 py-1.5 bg-violet-600 hover:bg-violet-500 text-white text-xs rounded-lg transition-all"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="flex-1 py-1.5 border border-white/10 text-white/40 text-xs rounded-lg hover:border-white/20 hover:text-white/60 transition-all"
        >
          Cancel
        </button>
      </div>
    </div>
  )

  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-base">💼</span>
        <p className="text-sm font-medium text-white">Work experience</p>
        <button
          onClick={startAdd}
          className="ml-auto text-[10px] text-violet-400 hover:text-violet-300 border border-violet-500/25 hover:border-violet-500/40 px-2 py-0.5 rounded-lg transition-all"
        >
          + Add
        </button>
      </div>

      {/* Add form */}
      {adding && (
        <div className="mb-4">
          <ExpForm onSave={saveAdd} onCancel={() => setAdding(false)} />
        </div>
      )}

      {/* Experience list */}
      <div className="space-y-0">
        {profile.experience.map((exp, i) => (
          <div key={exp.id}>
            {editingId === exp.id ? (
              <div className="mb-4">
                <ExpForm onSave={saveEdit} onCancel={() => setEditingId(null)} />
              </div>
            ) : (
              <div className="flex gap-3 pb-5 relative">
                {/* Timeline line */}
                {i < profile.experience.length - 1 && (
                  <div className="absolute left-[15px] top-8 bottom-0 w-px bg-white/8" />
                )}
                {/* Dot */}
                <div className="w-8 h-8 rounded-xl bg-white/6 border border-white/8 flex items-center justify-center text-[10px] font-semibold text-white/35 flex-shrink-0 z-10">
                  {exp.company.slice(0, 2).toUpperCase()}
                </div>
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-0.5">
                    <p className="text-sm font-medium text-white">{exp.title}</p>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <button
                        onClick={() => startEdit(exp)}
                        className="text-[10px] text-violet-400 hover:text-violet-300 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => del(exp.id)}
                        className="text-[10px] text-red-400/50 hover:text-red-400 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-white/40 mb-1">
                    {exp.company} · {exp.location} · {exp.type}
                  </p>
                  <p className="text-[10px] text-white/25 mb-2">
                    {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                  </p>
                  {exp.description && (
                    <p className="text-xs text-white/40 leading-relaxed">{exp.description}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {profile.experience.length === 0 && !adding && (
        <div className="text-center py-6">
          <p className="text-xs text-white/20 mb-2">No experience added yet</p>
          <button
            onClick={startAdd}
            className="text-xs text-violet-400 hover:text-violet-300 transition-colors"
          >
            + Add your first position
          </button>
        </div>
      )}
    </div>
  )
}