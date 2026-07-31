import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-5 pt-24 pb-16 overflow-hidden">

      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(139,92,246,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.8) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Glow blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-violet-600/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-indigo-600/6 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/8 text-violet-300 text-xs font-medium mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          India's first WhatsApp AI job agent · ₹0 to start
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-[64px] font-medium leading-[1.05] tracking-tight mb-6">
          <span className="text-white">Your next career,</span>
          <br />
          <span className="gradient-text">supercharged.</span>
        </h1>

        {/* Sub */}
        <p className="text-lg md:text-xl text-white/50 leading-relaxed max-w-2xl mx-auto mb-10">
          Nova finds jobs, builds your ATS resume, writes cover letters, and applies for you —
          all on WhatsApp. No app. No login. Just results.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
          <Link
            href="/auth/onboard"
            className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-medium px-7 py-3.5 rounded-xl text-base transition-all shadow-lg shadow-violet-900/40 hover:shadow-violet-800/40"
          >
            Start for free — takes 2 min
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </Link>
          
            href="#how-it-works"
            className="flex items-center gap-2 text-white/60 hover:text-white border border-white/10 hover:border-white/20 px-6 py-3.5 rounded-xl text-base transition-all"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            See how it works
          </a>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-white/35">
          {[
            '✦ No credit card needed',
            '✦ Free forever plan',
            '✦ First matches in 60 seconds',
            '✦ Works on any WhatsApp number',
          ].map(t => (
            <span key={t}>{t}</span>
          ))}
        </div>

        {/* WhatsApp mockup pill */}
        <div className="mt-14 mx-auto max-w-sm">
          <div className="bg-[#0a0f1e] border border-white/8 rounded-2xl p-4 text-left">
            <div className="flex items-center gap-2.5 mb-3 pb-3 border-b border-white/8">
              <div className="w-8 h-8 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-xs font-bold text-violet-400">N</div>
              <div>
                <p className="text-xs font-medium text-white">Nova</p>
                <p className="text-[10px] text-emerald-400">● online</p>
              </div>
            </div>
            <div className="space-y-2">
              {[
                { from: 'nova', text: "Hey! 👋 I found 5 React jobs in Bangalore matching your profile. Top match: Razorpay — 96% match, ₹18–22 LPA. Apply to all 5?" },
                { from: 'user', text: 'Yes apply all!' },
                { from: 'nova', text: '✅ Done! Applied to all 5 with your tailored resume. I\'ll notify you when any recruiter views your profile.' },
              ].map((msg, i) => (
                <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-xl text-xs leading-relaxed ${
                      msg.from === 'user'
                        ? 'bg-violet-600/80 text-white'
                        : 'bg-white/6 text-white/80 border border-white/8'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-center text-[10px] text-white/25 mt-2">This is what Nova looks like on WhatsApp</p>
        </div>

      </div>
    </section>
  )
}