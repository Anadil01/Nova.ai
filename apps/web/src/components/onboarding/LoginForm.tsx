'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

type Step = 'phone' | 'otp'

export function LoginForm() {
  const router = useRouter()
  const [step, setStep]     = useState<Step>('phone')
  const [phone, setPhone]   = useState('')
  const [otp, setOtp]       = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [error, setError]   = useState('')

  /* ── phone submit ──────────────────────────── */
  const sendOtp = async () => {
    const cleaned = phone.replace(/\D/g, '')
    if (cleaned.length < 10) {
      setError('Enter a valid 10-digit mobile number')
      return
    }
    setError('')
    setLoading(true)
    // TODO: POST /api/auth/send-otp
    await new Promise(r => setTimeout(r, 1000))
    setLoading(false)
    setStep('otp')
  }

  /* ── OTP input handling ────────────────────── */
  const handleOtpChange = (idx: number, val: string) => {
    if (!/^\d*$/.test(val)) return
    const next = [...otp]
    next[idx] = val.slice(-1)
    setOtp(next)
    if (val && idx < 5) {
      document.getElementById(`otp-${idx + 1}`)?.focus()
    }
  }

  const handleOtpKeydown = (idx: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      document.getElementById(`otp-${idx - 1}`)?.focus()
    }
  }

  /* ── OTP verify ────────────────────────────── */
  const verifyOtp = async () => {
    const code = otp.join('')
    if (code.length < 6) {
      setError('Enter all 6 digits')
      return
    }
    setError('')
    setLoading(true)
    // TODO: POST /api/auth/verify-otp → returns isNewUser
    await new Promise(r => setTimeout(r, 1000))
    setLoading(false)
    // isNewUser → onboard, else → dashboard
    router.push('/auth/onboard')
  }

  /* ── UI ────────────────────────────────────── */
  return (
    <div className="w-full max-w-sm">
      <div className="bg-[#0a0f1e] border border-white/8 rounded-2xl p-8">

        {step === 'phone' ? (
          <>
            <h1 className="text-xl font-medium text-white mb-1">Welcome to Nova</h1>
            <p className="text-sm text-white/40 mb-8">
              Enter your mobile number — we'll send an OTP
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-white/50 mb-2">
                  Mobile number
                </label>
                <div className="flex items-center gap-2 bg-white/[0.04] border border-white/10 rounded-xl px-3 py-3 focus-within:border-violet-500/50 transition-colors">
                  <span className="text-sm text-white/40 border-r border-white/10 pr-2 flex-shrink-0">🇮🇳 +91</span>
                  <input
                    type="tel"
                    placeholder="98765 43210"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && sendOtp()}
                    className="flex-1 bg-transparent text-sm text-white placeholder-white/20 outline-none"
                    maxLength={10}
                    autoFocus
                  />
                </div>
              </div>

              {error && <p className="text-xs text-red-400">{error}</p>}

              <button
                onClick={sendOtp}
                disabled={loading}
                className="w-full py-3 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                ) : 'Send OTP →'}
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-white/8 text-center">
              <p className="text-xs text-white/30 mb-3">Or continue with</p>
              <button className="w-full py-2.5 border border-white/10 hover:border-white/20 rounded-xl text-sm text-white/50 hover:text-white/80 transition-all flex items-center justify-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>
            </div>
          </>
        ) : (
          <>
            <button
              onClick={() => { setStep('phone'); setOtp(['','','','','','']); setError('') }}
              className="flex items-center gap-1 text-xs text-white/35 hover:text-white/60 mb-6 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
              </svg>
              Change number
            </button>

            <h1 className="text-xl font-medium text-white mb-1">Enter OTP</h1>
            <p className="text-sm text-white/40 mb-8">
              Sent to +91 {phone} · valid for 5 minutes
            </p>

            <div className="space-y-6">
              {/* OTP boxes */}
              <div className="flex gap-2">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-${idx}`}
                    type="tel"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={e => handleOtpChange(idx, e.target.value)}
                    onKeyDown={e => handleOtpKeydown(idx, e)}
                    className={cn(
                      'flex-1 h-12 text-center text-lg font-medium text-white bg-white/[0.04] border rounded-xl outline-none transition-all',
                      digit
                        ? 'border-violet-500/60 bg-violet-500/8'
                        : 'border-white/10 focus:border-violet-500/40'
                    )}
                    autoFocus={idx === 0}
                  />
                ))}
              </div>

              {error && <p className="text-xs text-red-400">{error}</p>}

              <button
                onClick={verifyOtp}
                disabled={loading || otp.join('').length < 6}
                className="w-full py-3 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                ) : 'Verify & continue →'}
              </button>

              <div className="text-center">
                <button
                  onClick={sendOtp}
                  className="text-xs text-violet-400 hover:text-violet-300 transition-colors"
                >
                  Resend OTP
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}