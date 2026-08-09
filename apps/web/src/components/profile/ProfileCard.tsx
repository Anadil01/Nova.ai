'use client'
import { cn } from '@/lib/utils'
import type { ProfileData } from './ProfilePage'

interface Props {
  profile:  ProfileData
  onUpdate: (p: Partial<ProfileData>) => void
}

export function ProfileCard({ profile }: Props) {
  const initials = profile.name.split(' ').map(n => n[0]).join('').toUpperCase()

  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.02] overflow-hidden">
      {/* Banner */}
      <div
        className="h-14"
        style={{
          background: 'linear-gradient(135deg, rgba(139,92,246,0.3) 0%, rgba(99,102,241,0.15) 100%)',
        }}
      />

      {/* Avatar */}
      <div className="px-4 pb-4">
        <div className="relative -mt-6 mb-3">
          <div className="w-14 h-14 rounded-2xl bg-violet-500/20 border-2 border-[#08090f] flex items-center justify-center text-lg font-medium text-violet-300">
            {initials}
          </div>
          <button className="absolute bottom-0 right-0 translate-x-1 translate-y-1 w-5 h-5 rounded-full bg-[#0d1020] border border-white/10 flex items-center justify-center text-[10px] text-white/40 hover:text-white/70 transition-colors">
            ✎
          </button>
        </div>

        <p className="text-sm font-medium text-white mb-0.5">{profile.name}</p>
        <p className="text-xs text-white/40 mb-3">{profile.role} · {profile.city}</p>

        <div className="space-y-1.5">
          {[
            { icon: '✉', value: profile.email,     missing: false },
            { icon: '📞', value: profile.phone,     missing: false },
            { icon: '🔗', value: profile.linkedin,  missing: !profile.linkedin,  label: '+ Add LinkedIn' },
            { icon: '🌐', value: profile.portfolio, missing: !profile.portfolio, label: '+ Add portfolio' },
          ].map(({ icon, value, missing, label }) => (
            <div key={icon} className="flex items-center gap-2 text-xs">
              <span className="text-white/25 w-4 flex-shrink-0 text-center">{icon}</span>
              <span className={missing ? 'text-amber-400/70 italic cursor-pointer hover:text-amber-400 transition-colors' : 'text-white/45 truncate'}>
                {missing ? label : value}
              </span>
            </div>
          ))}
        </div>

        {/* WhatsApp status */}
        <div className="mt-3 flex items-center gap-2 px-2.5 py-1.5 bg-emerald-500/8 border border-emerald-500/20 rounded-xl">
          <span className="text-emerald-400 text-xs">💬</span>
          <p className="text-[10px] text-emerald-400">WhatsApp connected · {profile.phone}</p>
        </div>
      </div>
    </div>
  )
}