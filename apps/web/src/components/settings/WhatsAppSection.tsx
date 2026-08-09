'use client'
import { useState } from 'react'

export function WhatsAppSection() {
  const [autoApply, setAutoApply]   = useState(true)
  const [messaging, setMessaging]   = useState(true)

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-base font-medium text-white mb-0.5">WhatsApp connection</h2>
        <p className="text-xs text-white/35">Nova's primary channel — manage your linked number</p>
      </div>

      {/* Connected status */}
      <div className="flex items-center gap-3 p-4 bg-emerald-500/6 border border-emerald-500/20 rounded-2xl">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center text-xl flex-shrink-0">
          💬
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-emerald-300">Connected · +91 98765 43210</p>
          <p className="text-xs text-emerald-400/60 mt-0.5">Nova is active · receiving job digests daily</p>
        </div>
        <button className="text-xs text-emerald-400/60 hover:text-red-400 transition-colors border border-emerald-500/20 hover:border-red-500/20 px-3 py-1.5 rounded-lg">
          Disconnect
        </button>
      </div>

      {/* Toggles */}
      <div className="rounded-2xl border border-white/8 bg-white/[0.02] px-5 py-1">
        {[
          {
            label:  'Allow Nova to auto-apply via WhatsApp command',
            sub:    'When you reply "apply all" on WhatsApp, Nova submits applications automatically',
            on:     autoApply,
            toggle: () => setAutoApply(!autoApply),
          },
          {
            label:  'Allow Nova to message me on WhatsApp',
            sub:    'Turning this off stops all WhatsApp messages from Nova',
            on:     messaging,
            toggle: () => setMessaging(!messaging),
          },
        ].map(({ label, sub, on, toggle }) => (
          <div key={label} className="flex items-start justify-between gap-4 py-3.5 border-b border-white/6 last:border-b-0">
            <div>
              <p className="text-sm font-medium text-white mb-0.5">{label}</p>
              <p className="text-xs text-white/35 leading-relaxed">{sub}</p>
            </div>
            <button
              onClick={toggle}
              className={`w-9 h-5 rounded-full relative flex-shrink-0 mt-0.5 transition-all ${on ? 'bg-violet-600' : 'bg-white/10'}`}
            >
              <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all shadow-sm ${on ? 'left-[18px]' : 'left-0.5'}`} />
            </button>
          </div>
        ))}
      </div>

      <div className="bg-blue-500/6 border border-blue-500/20 rounded-xl p-4">
        <p className="text-xs font-medium text-blue-300 mb-1">🔄 WhatsApp provider: Mock (dev mode)</p>
        <p className="text-[11px] text-blue-400/70 leading-relaxed">
          Messages are logged to the console in development. Switch to OpenWA or WATI in production by changing <code className="bg-white/8 px-1 rounded text-[10px]">WHATSAPP_PROVIDER</code> in your .env file.
        </p>
      </div>
    </div>
  )
}