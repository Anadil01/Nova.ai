const features = [
    {
      icon: '🛡️',
      title: 'Ghost job detector',
      desc: 'Nova scores every job for authenticity before showing it to you. No more applying into the void.',
      tag: 'Only on Nova',
      tagColor: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
    },
    {
      icon: '✦',
      title: 'Nova Trust Score',
      desc: 'Your verified skill score — built from real tests, GitHub activity, and project proof. Recruiters trust it.',
      tag: 'Only on Nova',
      tagColor: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
    },
    {
      icon: '📄',
      title: 'ATS resume per job',
      desc: 'One resume for all jobs loses. Nova creates a tailored version for each application, hitting every keyword.',
      tag: 'AI-powered',
      tagColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    },
    {
      icon: '💬',
      title: 'WhatsApp-native',
      desc: 'No app to download. Nova works entirely on WhatsApp — the one app every Indian already has.',
      tag: 'Zero friction',
      tagColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    },
    {
      icon: '🎤',
      title: 'Voice interview prep',
      desc: 'Practice with an AI interviewer that knows the exact JD you applied for. In Hindi or English.',
      tag: 'Pro feature',
      tagColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    },
    {
      icon: '₹',
      title: 'Real salary data',
      desc: 'See what Razorpay actually pays React devs in Bangalore — not Glassdoor guesses. Real offer data.',
      tag: 'India-specific',
      tagColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    },
    {
      icon: '🗺️',
      title: 'Hindi + regional languages',
      desc: 'Talk to Nova in Hindi, Tamil, or Telugu. Resume still generates in English for ATS. Tier-2 native.',
      tag: 'Only on Nova',
      tagColor: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
    },
    {
      icon: '📊',
      title: 'Recruiter honesty score',
      desc: 'See how fast a recruiter responds before you apply. Avoid the companies that ghost everyone.',
      tag: 'Only on Nova',
      tagColor: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
    },
  ]
  
  export function FeaturesSection() {
    return (
      <section id="features" className="py-24 px-5 bg-[#07090f]">
        <div className="max-w-6xl mx-auto">
  
          <div className="text-center mb-16">
            <p className="text-xs font-medium uppercase tracking-widest text-violet-400 mb-3">
              Features
            </p>
            <h2 className="text-4xl md:text-5xl font-medium text-white tracking-tight mb-4">
              Built for the broken
              <br />
              <span className="gradient-text">2026 job market.</span>
            </h2>
            <p className="text-white/45 text-lg max-w-xl mx-auto">
              AI resumes flooding inboxes. Ghost jobs everywhere. Recruiters ghosting candidates.
              Nova fixes all three sides of the problem.
            </p>
          </div>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map(({ icon, title, desc, tag, tagColor }) => (
              <div
                key={title}
                className="rounded-2xl border border-white/8 bg-white/[0.02] p-5 flex flex-col gap-3 hover:border-white/15 hover:bg-white/[0.04] transition-all duration-200"
              >
                <div className="text-2xl">{icon}</div>
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h3 className="text-sm font-medium text-white">{title}</h3>
                  </div>
                  <span className={`inline-block text-[10px] font-medium px-1.5 py-0.5 rounded-md border ${tagColor} mb-2`}>
                    {tag}
                  </span>
                  <p className="text-xs text-white/45 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }