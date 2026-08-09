'use client'
import { useState } from 'react'

export function DangerZone() {
  const [confirm, setConfirm] = useState(false)

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-base font-medium text-white mb-0.5">Danger zone</h2>
        <p className="text-xs text-white/35">Irreversible actions — proceed with care</p>
      </div>

      <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5 space-y-4">
        <p className="text-xs text-red-400/70 leading-relaxed">
          These actions are permanent and cannot be undone. Please be absolutely certain before proceeding.
        </p>

        {[
          { label: 'Export all my data',       sub: 'Download everything Nova has stored about you as a JSON file', btn: 'Export data',   danger: false },
          { label: 'Pause my account',          sub: 'Stop all Nova activity temporarily — resume anytime',           btn: 'Pause account', danger: false },
        ].map(({ label, sub, btn, danger }) => (
          <div key={label} className="flex items-start justify-between gap-4 pb-4 border-b border-red-500/10 last:border-b-0 last:pb-0">
            <div>
              <p className="text-sm font-medium text-white mb-0.5">{label}</p>
              <p className="text-xs text-white/35 leading-relaxed">{sub}</p>
            </div>
            <button className={`text-xs px-3 py-1.5 rounded-xl border flex-shrink-0 transition-all ${
              danger
                ? 'border-red-500/40 text-red-400 hover:bg-red-500/10'
                : 'border-red-500/20 text-red-400/70 hover:border-red-500/30 hover:text-red-400'
            }`}>
              {btn}
            </button>
          </div>
        ))}

        {/* Delete — needs confirmation */}
        <div className="border-t border-red-500/15 pt-4">
          <p className="text-sm font-medium text-white mb-0.5">Delete account permanently</p>
          <p className="text-xs text-white/35 mb-3 leading-relaxed">
            All your data, resumes, and application history will be deleted forever. This cannot be reversed.
          </p>
          {!confirm ? (
            <button
              onClick={() => setConfirm(true)}
              className="text-xs bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 px-4 py-2 rounded-xl transition-all"
            >
              Delete my account →
            </button>
          ) : (
            <div className="space-y-2">
              <p className="text-xs text-red-400 font-medium">Are you absolutely sure? This cannot be undone.</p>
              <div className="flex gap-2">
                <button className="flex-1 py-2 bg-red-600 hover:bg-red-500 text-white text-xs rounded-xl transition-all font-medium">
                  Yes, delete permanently
                </button>
                <button
                  onClick={() => setConfirm(false)}
                  className="flex-1 py-2 border border-white/10 text-white/40 text-xs rounded-xl hover:border-white/20 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}