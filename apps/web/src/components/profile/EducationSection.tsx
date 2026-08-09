'use client'
import { useState } from 'react'
import type { ProfileData } from './ProfilePage'

type Edu = ProfileData['education'][0]

interface Props {
  profile:  ProfileData
  onUpdate: (p: Partial<ProfileData>) => void
}

export function EducationSection({ profile, onUpdate }: Props) {
  const [adding, setAdding] = useState(false)
  const [form, setForm]     = useState<Partial<Edu>>({})

  const save = () => {
    if (!form.degree || !form.school) return
    onUpdate({
      education: [
        ...profile.education,
        { id: `edu${Date.now()}`, degree: form.degree, school: form.school, year: form.year ?? '', cgpa: form.cgpa ?? '' },
      ],
    })
    setAdding(false)
    setForm({})
  }

  const del = (id: string) =>
    onUpdate({ education: profile.education.filter(e => e.id !== id) })

  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-base">🎓</span>
        <p className="text-sm font-medium text-white">Education</p>
        <button
          onClick={() => setAdding(true)}
          className="ml-auto text-[10px] text-violet-400 hover:text-violet-300 border border-violet-500/25 hover:border-violet-500/40 px-2 py-0.5 rounded-lg transition-all"
        >
          + Add
        </button>
      </div>

      {/* Add form */}
      {adding && (
        <div className="border border-violet-500/25 bg-violet-500/5 rounded-xl p-3.5 space-y-2.5 mb-4">
          <div className="grid grid-cols-2 gap-2.5">
            {[
              ['Degree / course', 'degree', 'e.g. B.Tech Computer Science'],
              ['School / college', 'school', 'e.g. VIT University'],
              ['Graduation year',  'year',   'e.g. 2021'],
              ['CGPA / %',         'cgpa',   'e.g. 8.2'],
            ].map(([label, key, ph]) => (
              <div key={key}>
                <p className="text-[10px] text-white/35 mb-1">{label}</p>
                <input
                  type="text"
                  placeholder={ph}
                  value={(form as Record<string, string>)[key] ?? ''}
                  onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                  className="w-full bg-white/[0.04] border border-white/10 focus:border-violet-500/30 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-white/20 outline-none"
                />
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={save} className="flex-1 py-1.5 bg-violet-600 hover:bg-violet-500 text-white text-xs rounded-lg transition-all">Save</button>
            <button onClick={() => { setAdding(false); setForm({}) }} className="flex-1 py-1.5 border border-white/10 text-white/40 text-xs rounded-lg hover:border-white/20 transition-all">Cancel</button>
          </div>
        </div>
      )}

      {/* Education list */}
      <div className="space-y-2.5">
        {profile.education.map(edu => (
          <div key={edu.id} className="flex items-start gap-3 p-3 bg-white/[0.02] border border-white/6 rounded-xl">
            <span className="text-xl flex-shrink-0 mt-0.5">🎓</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white">{edu.degree}</p>
              <p className="text-xs text-white/40 mt-0.5">{edu.school}</p>
              <div className="flex gap-3 mt-1">
                {edu.year && <p className="text-[10px] text-white/25">Graduated {edu.year}</p>}
                {edu.cgpa && <p className="text-[10px] text-white/25">CGPA {edu.cgpa}</p>}
              </div>
            </div>
            <button
              onClick={() => del(edu.id)}
              className="text-[10px] text-red-400/40 hover:text-red-400 transition-colors flex-shrink-0"
            >
              ×
            </button>
          </div>
        ))}
        {profile.education.length === 0 && !adding && (
          <p className="text-xs text-white/20 text-center py-4 italic">No education added yet</p>
        )}
      </div>
    </div>
  )
}