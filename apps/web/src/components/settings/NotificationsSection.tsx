'use client'
import { useState } from 'react'

type Toggle = { label: string; sub: string; on: boolean }

const INITIAL: Toggle[] = [
  { label: 'Daily job digest',          sub: 'Top 5 matches every morning at 8 AM via WhatsApp',           on: true  },
  { label: 'Application status updates', sub: 'Notify when recruiter views profile or status changes',       on: true  },
  { label: 'Interview reminders',        sub: 'Remind 24h and 1h before scheduled interviews',               on: true  },
  { label: 'Follow-up nudges',           sub: 'Remind to follow up on applications with no response in 5d', on: true  },
  { label: 'Weekly performance report',  sub: 'Summary of applications, views, and callbacks every Sunday', on: false },
  { label: 'Product updates & tips',     sub: 'Occasional Nova feature announcements and job search tips',  on: false },
]

function ToggleRow({ item, onToggle }: { item: Toggle; onToggle: () => void }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3.5 border-b border-white/6 last:border-b-0">
      <div className="flex-1">
        <p className="text-sm font-medium text-white mb-0.5">{item.label}</p>
        <p className="text-xs text-white/35 leading-relaxed">{item.sub}</p>
      </div>
      <button
        onClick={onToggle}
        className={`w-9 h-5 rounded-full relative flex-shrink-0 mt-0.5 transition-all ${item.on ? 'bg-violet-600' : 'bg-white/10'}`}
      >
        <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all shadow-sm ${item.on ? 'left-[18px]' : 'left-0.5'}`} />
      </button>
    </div>
  )
}

export function NotificationsSection() {
  const [toggles, setToggles] = useState(INITIAL)
  const toggle = (i: number) =>
    setToggles(prev => prev.map((t, idx) => idx === i ? { ...t, on: !t.on } : t))

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-base font-medium text-white mb-0.5">Notification preferences</h2>
        <p className="text-xs text-white/35">Control what Nova sends and when</p>
      </div>
      <div className="rounded-2xl border border-white/8 bg-white/[0.02] px-5 py-1">
        {toggles.map((t, i) => (
          <ToggleRow key={t.label} item={t} onToggle={() => toggle(i)} />
        ))}
      </div>
      <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-4 space-y-3">
        {[
          { label: 'Digest delivery time', opts: ['7:00 AM', '8:00 AM', '9:00 AM'], def: '8:00 AM' },
          { label: 'Notification channel', opts: ['WhatsApp + Email', 'WhatsApp only', 'Email only'], def: 'WhatsApp + Email' },
        ].map(({ label, opts, def }) => (
          <div key={label} className="flex items-center justify-between gap-4">
            <p className="text-sm text-white/70">{label}</p>
            <select
              defaultValue={def}
              className="bg-white/[0.04] border border-white/10 text-white/60 text-xs rounded-xl px-3 py-2 outline-none cursor-pointer"
            >
              {opts.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}