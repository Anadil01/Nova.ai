import Link from 'next/link'

export const metadata = { title: 'Sign up to hire — Nova' }

export default function HireSignup() {
  return (
    <main className="min-h-screen bg-[#050810] flex flex-col items-center justify-center px-4">
      <Link href="/hire" className="fixed top-5 left-5 flex items-center gap-1.5 text-xs text-white/30 hover:text-white/60 transition-colors">
        ← Back
      </Link>
      <div className="w-full max-w-sm bg-[#0a0f1e] border border-white/8 rounded-2xl p-8 text-center">
        <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto mb-5 text-lg">✦</div>
        <h1 className="text-xl font-medium text-white mb-1">Start hiring on Nova</h1>
        <p className="text-sm text-white/40 mb-8">Create your employer account — free to start</p>
        <div className="space-y-3">
          {['Company name', 'Work email', 'Your name', 'Phone number'].map(ph => (
            <input key={ph} type="text" placeholder={ph} className="w-full bg-white/[0.04] border border-white/10 focus:border-emerald-500/40 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition-all" />
          ))}
          <Link href="/hire/dashboard" className="w-full block py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-xl transition-all text-sm">
            Create account & post first job →
          </Link>
        </div>
        <p className="text-[10px] text-white/20 mt-4">Free to start · no credit card needed</p>
      </div>
    </main>
  )
}