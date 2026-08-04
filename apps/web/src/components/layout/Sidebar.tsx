'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  KanbanSquare,
  Mic,
  TrendingUp,
  DollarSign,
  UserCircle,
  Settings,
  Rocket,
} from 'lucide-react'

const navItems = [
  {
    group: 'Main',
    items: [
      { href: '/dashboard',          icon: LayoutDashboard, label: 'Dashboard'     },
      { href: '/dashboard/jobs',     icon: Briefcase,       label: 'Job matches',  badge: 5 },
      { href: '/dashboard/resume',   icon: FileText,        label: 'Resume builder' },
      { href: '/dashboard/tracker',  icon: KanbanSquare,    label: 'Tracker',      badge: 2 },
    ],
  },
  {
    group: 'Tools',
    items: [
      { href: '/dashboard/interview', icon: Mic,         label: 'Interview coach' },
      { href: '/dashboard/skills',    icon: TrendingUp,  label: 'Skill gap'       },
      { href: '/dashboard/salary',    icon: DollarSign,  label: 'Salary data'     },
    ],
  },
  {
    group: 'Account',
    items: [
      { href: '/dashboard/profile',  icon: UserCircle, label: 'My profile' },
      { href: '/dashboard/settings', icon: Settings,   label: 'Settings'   },
    ],
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-[200px] flex-shrink-0 bg-[#08090f] border-r border-white/8 flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 py-[18px] border-b border-white/8">
        <div className="w-7 h-7 rounded-lg bg-violet-500/20 flex items-center justify-center">
          <span className="text-violet-400 text-xs font-bold">✦</span>
        </div>
        <span className="text-[15px] font-medium text-white">Nova</span>
      </div>

      {/* Nav links */}
      <nav className="flex-1 overflow-y-auto px-2.5 py-3">
        {navItems.map(({ group, items }) => (
          <div key={group} className="mb-5">
            <p className="text-[10px] font-medium uppercase tracking-widest text-white/30 px-2 mb-1.5">
              {group}
            </p>
            {items.map(({ href, icon: Icon, label, badge }) => {
              const active = pathname === href || pathname.startsWith(href + '/')
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'flex items-center gap-2.5 px-2 py-[7px] rounded-xl text-[13px] mb-0.5 transition-all',
                    active
                      ? 'bg-violet-500/15 text-violet-300'
                      : 'text-white/50 hover:text-white/80 hover:bg-white/5'
                  )}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="flex-1">{label}</span>
                  {badge && (
                    <span className="text-[10px] font-medium bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded-full">
                      {badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      {/* Upgrade banner */}
      <div className="mx-2.5 mb-3 p-2.5 bg-violet-500/10 rounded-xl border border-violet-500/20 cursor-pointer hover:bg-violet-500/15 transition-all">
        <div className="flex items-center gap-2">
          <Rocket className="w-4 h-4 text-violet-400 flex-shrink-0" />
          <div>
            <p className="text-xs font-medium text-violet-300">Upgrade to Pro</p>
            <p className="text-[10px] text-violet-400/70 mt-0.5">
              50 auto-applications/mo
            </p>
          </div>
        </div>
      </div>

      {/* User */}
      <div className="p-2.5 border-t border-white/8">
        <div className="flex items-center gap-2.5 p-2 rounded-xl cursor-pointer hover:bg-white/5 transition-all">
          <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center text-xs font-medium text-violet-300">
            AR
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-white truncate">Arjun Rao</p>
            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 rounded-full inline-block mt-0.5">
              Free plan
            </span>
          </div>
        </div>
      </div>
    </aside>
  )
}