import { LoginForm } from '@/components/onboarding/LoginForm'
import Link from 'next/link'

export const metadata = { title: 'Sign in — Nova' }

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#050810] flex flex-col items-center justify-center px-4">
      {/* Back to home */}
      <Link
        href="/marketing"
        className="fixed top-5 left-5 flex items-center gap-1.5 text-xs text-white/30 hover:text-white/60 transition-colors"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
        </svg>
        Back to Nova
      </Link>

      {/* Logo */}
      <div className="flex items-center gap-2 mb-10">
        <div className="w-8 h-8 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
          <span className="text-violet-400 font-bold">✦</span>
        </div>
        <span className="text-white font-medium text-lg">Nova</span>
      </div>

      <LoginForm />

      <p className="mt-6 text-xs text-white/25 text-center max-w-xs">
        By continuing you agree to Nova's{' '}
        <Link href="/terms" className="text-white/40 hover:text-white/60">Terms</Link>
        {' '}and{' '}
        <Link href="/privacy" className="text-white/40 hover:text-white/60">Privacy Policy</Link>
      </p>
    </main>
  )
}