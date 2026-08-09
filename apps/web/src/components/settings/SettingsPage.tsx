'use client'
import { useState } from 'react'
import { BillingSection }       from './BillingSection'
import { NotificationsSection } from './NotificationsSection'
import { WhatsAppSection }      from './WhatsAppSection'
import { AgentSection }         from './AgentSection'
import { SecuritySection }      from './SecuritySection'
import { DangerZone }           from './DangerZone'
import { cn } from '@/lib/utils'

type Tab = 'billing' | 'notifications' | 'whatsapp' | 'agent' | 'security' | 'danger'

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: 'billing',       label: 'Billing & plan',    icon: '💳' },
  { id: 'notifications', label: 'Notifications',      icon: '🔔' },
  { id: 'whatsapp',      label: 'WhatsApp',           icon: '💬' },
  { id: 'agent',         label: 'Nova agent',         icon: '🤖' },
  { id: 'security',      label: 'Security',           icon: '🔒' },
  { id: 'danger',        label: 'Danger zone',        icon: '⚠️' },
]

export function SettingsPage() {
  const [active, setActive] = useState<Tab>('billing')

  return (
    <div className="flex h-full overflow-hidden">

      {/* Settings side nav */}
      <aside className="w-[200px] flex-shrink-0 bg-[#08090f] border-r border-white/8 p-3">
        <p className="text-[10px] font-medium uppercase tracking-widest text-white/25 px-2 mb-3">
          Settings
        </p>
        {tabs.map(({ id, label, icon }) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            className={cn(
              'w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs mb-0.5 transition-all text-left',
              active === id
                ? 'bg-violet-500/12 text-violet-300'
                : id === 'danger'
                ? 'text-red-400/60 hover:text-red-400 hover:bg-red-500/6'
                : 'text-white/40 hover:text-white/70 hover:bg-white/5'
            )}
          >
            <span>{icon}</span>
            {label}
          </button>
        ))}
      </aside>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl">
          {active === 'billing'       && <BillingSection />}
          {active === 'notifications' && <NotificationsSection />}
          {active === 'whatsapp'      && <WhatsAppSection />}
          {active === 'agent'         && <AgentSection />}
          {active === 'security'      && <SecuritySection />}
          {active === 'danger'        && <DangerZone />}
        </div>
      </div>
    </div>
  )
}