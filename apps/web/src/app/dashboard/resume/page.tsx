import Link from 'next/link'

export const metadata = { title: 'Resume builder — Nova' }

export default function ResumePage() {
  return (
    <div className="p-5">
      <h1 className="text-xl font-medium text-white mb-6">Resume builder</h1>
      <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-8 text-center">
        <p className="text-3xl mb-3">📄</p>
        <p className="text-sm font-medium text-white mb-1">Resume builder — coming next</p>
        <p className="text-xs text-white/35 mb-4">Resume list, PDF preview, ATS score, keyword gaps</p>
        <Link href="/dashboard" className="text-xs text-violet-400 hover:text-violet-300">
          ← Back to dashboard
        </Link>
      </div>
    </div>
  )
}