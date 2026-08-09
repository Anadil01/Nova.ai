'use client'
import { useState } from 'react'

export function AgentSection() {
  const [settings, setSettings] = useState({
    autoApply:     false,
    tailorResume:  true,
    coverLetter:   true,
    minMatch:      75,
    language:      'English',
  })

  const toggle = (key: 'autoApply' | 'tailorResume' | 'coverLetter') =>
    setSettings(s => ({ ...s, [key]: !s[key] }))

  const toggles = [
    {
      key:   'autoApply' as const,
      label: 'Auto-apply to 90%+ match jobs daily',
      sub:   'Nova automatically applies to your top matches without asking each time',
    },
    {
      key:   'tailorResume' as const,
      label: 'Tailor resume per application',
      sub:   'Nova rewrites resume bullets to match each job\'s keywords before applying',
    },
    {
      key:   'coverLetter' as const,
      label: 'Generate cover letter per job',
      sub:   'Nova writes a 200-word personalised cover letter for every application',
    },
  ]

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-base font-medium text-white mb-0.5">Nova agent behaviour</h2>
        <p className="text-xs text-white/35">Control how Nova acts on your behalf</p>
      </div>

      <div className="rounded-2xl border border-white/8 bg-white/[0.02] px-5 py-1">
        {toggles.map(({ key, label, sub }) => (
          <div key={key} className="flex items-start justify-between gap-4 py-3.5 border-b border-white/6 last:border-b-0">
            <div>
              <p className="text-sm font-medium text-white mb-0.5">{label}</p>
              <p className="text-xs text-white/35 leading-relaxed">{sub}</p>
            </div>
            <button
              onClick={() => toggle(key)}
              className={`w-9 h-5 rounded-full relative flex-shrink-0 mt-0.5 transition-all ${settings[key] ? 'bg-violet-600' : 'bg-white/10'}`}
            >
              <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all shadow-sm ${settings[key] ? 'left-[18px]' : 'left-0.5'}`} />
            </button>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-4 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-white mb-0.5">Minimum match score to apply</p>
            <p className="text-xs text-white/35">Nova won't apply to jobs below this threshold</p>
          </div>
          <select
            value={settings.minMatch}
            onChange={e => setSettings(s => ({ ...s, minMatch: Number(e.target.value) }))}
            className="bg-white/[0.04] border border-white/10 text-white/60 text-xs rounded-xl px-3 py-2 outline-none cursor-pointer"
          >
            <option value={60}>60% and above</option>
            <option value={75}>75% and above</option>
            <option value={90}>90% and above</option>
          </select>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-white mb-0.5">Language preference</p>
            <p className="text-xs text-white/35">Language Nova uses for WhatsApp messages</p>
          </div>
          <select
            value={settings.language}
            onChange={e => setSettings(s => ({ ...s, language: e.target.value }))}
            className="bg-white/[0.04] border border-white/10 text-white/60 text-xs rounded-xl px-3 py-2 outline-none cursor-pointer"
          >
            <option>English</option>
            <option>Hindi</option>
            <option>English + Hindi</option>
          </select>
        </div>
      </div>
    </div>
  )
}