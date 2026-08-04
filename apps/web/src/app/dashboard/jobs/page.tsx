import Link from 'next/link'

export const metadata = { title: 'Job matches — Nova' }

export default function JobsPage() {
  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-medium text-white">Job matches</h1>
          <p className="text-sm text-white/40 mt-0.5">247 jobs matched · 5 new today</p>
        </div>
      </div>
      <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-8 text-center">
        <p className="text-3xl mb-3">🎯</p>
        <p className="text-sm font-medium text-white mb-1">Full job matches page — coming next</p>
        <p className="text-xs text-white/35 mb-4">Filters, match score cards, and job detail drawer</p>
        <Link href="/dashboard" className="text-xs text-violet-400 hover:text-violet-300">
          ← Back to dashboard
        </Link>
      </div>
    </div>
  )
}