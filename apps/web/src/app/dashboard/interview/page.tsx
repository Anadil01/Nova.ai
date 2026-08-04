import Link from 'next/link'

export const metadata = { title: 'Interview coach — Nova' }

export default function InterviewPage() {
  return (
    <div className="p-5">
      <h1 className="text-xl font-medium text-white mb-6">Interview coach</h1>
      <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-8 text-center">
        <p className="text-3xl mb-3">🎤</p>
        <p className="text-sm font-medium text-white mb-1">Interview coach — coming next</p>
        <p className="text-xs text-white/35 mb-4">Voice mock interviews · JD-specific · Hindi/English</p>
        <Link href="/dashboard" className="text-xs text-violet-400 hover:text-violet-300">
          ← Back to dashboard
        </Link>
      </div>
    </div>
  )
}