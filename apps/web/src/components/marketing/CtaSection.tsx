import Link from 'next/link'

export function CtaSection() {
  return (
    <section className="py-24 px-5 bg-[#050810]">
      <div className="max-w-3xl mx-auto">
        <div className="rounded-3xl border border-violet-500/25 bg-violet-500/5 p-12 text-center">

          <div className="w-12 h-12 rounded-2xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center mx-auto mb-6 text-xl">✦</div>

          <h2 className="text-4xl md:text-5xl font-medium text-white tracking-tight mb-4">
            Your next job is
            <br />
            <span className="gradient-text">one message away.</span>
          </h2>

          <p className="text-white/45 text-base mb-10 max-w-xl mx-auto">
            Join thousands of job seekers who stopped applying alone and started getting callbacks.
            Takes 2 minutes to set up. Free forever.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
            <Link
              href="/auth/onboard"
              className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-medium px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-violet-900/30"
            >
              Start for free — 2 minutes
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </Link>
            <Link
              href="/hire"
              className="text-white/50 hover:text-white border border-white/10 hover:border-white/20 px-6 py-3.5 rounded-xl transition-all text-sm"
            >
              Hiring instead? →
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-5 text-xs text-white/30">
            {['No credit card', 'Cancel anytime', 'Works on WhatsApp', 'Hindi supported'].map(t => (
              <span key={t}>✓ {t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}