'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const titles: Record<string, { t: string; s: string }> = {
  '/hire/dashboard': { t: 'Recruiter dashboard', s: 'Razorpay · 4 active job posts · 28 new applications this week' },
  '/hire/post':      { t: 'Post a job',          s: 'Fill in the details · Nova extracts requirements automatically'  },
  '/hire/pipeline':  { t: 'Candidate pipeline',  s: '48 candidates · Senior React Developer · updated 2h ago'        },
}

export function RecruiterTopbar() {
  const pathname = usePathname()
  const meta = titles[pathname] ?? { t: 'Nova Hire', s: '' }

  return (
    <header className="h-14 border-b border-white/8 bg-[#07090e] flex items-center justify-between px-5 flex-shrink-0">
      <div>
        <p className="text-base font-medium text-white">{meta.t}</p>
        {meta.s && <p className="text-xs text-white/35 mt-0.5">{meta.s}</p>}
      </div>
      <div className="flex items-center gap-2.5">
        <button className="text-xs border border-white/10 hover:border-white/20 text-white/45 hover:text-white px-3 py-1.5 rounded-xl transition-all">
          📤 Export report
        </button>
        <Link href="/hire/post" className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-3.5 py-1.5 rounded-xl transition-all">
          ➕ Post a job
        </Link>
        <button className="relative w-8 h-8 flex items-center justify-center rounded-xl border border-white/10 hover:bg-white/5 transition-all">
          <span className="text-sm">🔔</span>
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-400" />
        </button>
      </div>
    </header>
  )
}