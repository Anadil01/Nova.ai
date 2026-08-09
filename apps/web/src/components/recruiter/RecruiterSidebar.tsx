'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const nav = [
  { group: 'Hiring', items: [
    { href: '/hire/dashboard', icon: '📊', label: 'Dashboard'        },
    { href: '/hire/post',      icon: '➕', label: 'Post a job'        },
    { href: '/hire/pipeline',  icon: '🎯', label: 'Pipeline',  badge: 28 },
    { href: '#',               icon: '📅', label: 'Interviews'        },
  ]},
  { group: 'Insights', items: [
    { href: '#', icon: '📈', label: 'Analytics'  },
    { href: '#', icon: '💬', label: 'Messages', badge: 3 },
  ]},
  { group: 'Account', items: [
    { href: '#', icon: '🏢', label: 'Company profile' },
    { href: '#', icon: '👥', label: 'Team members'    },
    { href: '#', icon: '💳', label: 'Billing'         },
  ]},
]

export function RecruiterSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-[210px] flex-shrink-0 bg-[#07090e] border-r border-white/8 flex flex-col h-screen sticky top-0">

      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 py-[18px] border-b border-white/8">
        <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-xs font-bold text-emerald-400">✦</div>
        <span className="text-[15px] font-medium text-white">Nova</span>
        <span className="text-[9px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded-full">Hire</span>
      </div>

      {/* Company switcher */}
      <div className="px-3 py-2.5 border-b border-white/8">
        <div className="flex items-center gap-2 px-2.5 py-2 bg-white/[0.03] border border-white/8 rounded-xl cursor-pointer hover:bg-white/[0.05] transition-all">
          <div className="w-6 h-6 rounded-md bg-emerald-500/20 flex items-center justify-center text-[10px] font-bold text-emerald-400 flex-shrink-0">RZ</div>
          <span className="text-xs font-medium text-white flex-1">Razorpay</span>
          <span className="text-white/25 text-xs">⌄</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2.5 py-3">
        {nav.map(({ group, items }) => (
          <div key={group} className="mb-5">
            <p className="text-[10px] font-medium uppercase tracking-widest text-white/25 px-2 mb-1.5">{group}</p>
            {items.map(({ href, icon, label, badge }) => {
              const active = pathname === href
              return (
                <Link key={href} href={href} className={cn(
                  'flex items-center gap-2.5 px-2.5 py-[7px] rounded-xl text-[13px] mb-0.5 transition-all',
                  active
                    ? 'bg-emerald-500/12 text-emerald-300'
                    : 'text-white/45 hover:text-white/75 hover:bg-white/5'
                )}>
                  <span className="text-sm">{icon}</span>
                  <span className="flex-1">{label}</span>
                  {badge && (
                    <span className="text-[10px] font-medium bg-red-500/15 text-red-400 px-1.5 py-0.5 rounded-full">{badge}</span>
                  )}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      {/* Post job CTA */}
      <div className="mx-2.5 mb-3">
        <Link href="/hire/post" className="flex items-center justify-center gap-2 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium rounded-xl transition-all">
          ➕ Post a new job
        </Link>
      </div>

      {/* User */}
      <div className="p-2.5 border-t border-white/8">
        <div className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-white/5 transition-all cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs font-medium text-emerald-300 flex-shrink-0">PR</div>
          <div>
            <p className="text-xs font-medium text-white">Priya Reddy</p>
            <p className="text-[10px] text-white/30">Talent Acquisition</p>
          </div>
        </div>
      </div>
    </aside>
  )
}