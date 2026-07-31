const steps = [
    {
      num: '01',
      icon: '💬',
      title: 'Tell Nova what you want',
      desc: 'Message Nova on WhatsApp or sign up on the web. Share your target role, experience, skills, and city. Takes 60 seconds.',
      color: 'text-violet-400',
      bg: 'bg-violet-500/10 border-violet-500/20',
    },
    {
      num: '02',
      icon: '🎯',
      title: 'Nova finds verified jobs',
      desc: 'Nova scans Naukri, LinkedIn, and Indeed daily — filtering out ghost jobs and showing only real, active openings that match your profile.',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/20',
    },
    {
      num: '03',
      icon: '📄',
      title: 'Your resume, tailored per job',
      desc: 'Nova generates an ATS-optimised resume for each application — with the right keywords, skills highlighted, and cover letter included.',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
    },
    {
      num: '04',
      icon: '🚀',
      title: 'Applied. You just get callbacks',
      desc: 'Nova submits applications, tracks responses, and sends you WhatsApp updates. Interview scheduled? Nova helps you prep for it too.',
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20',
    },
  ]
  
  export function HowItWorksSection() {
    return (
      <section id="how-it-works" className="py-24 px-5 bg-[#050810]">
        <div className="max-w-6xl mx-auto">
  
          <div className="text-center mb-16">
            <p className="text-xs font-medium uppercase tracking-widest text-violet-400 mb-3">
              How Nova works
            </p>
            <h2 className="text-4xl md:text-5xl font-medium text-white tracking-tight mb-4">
              From zero to callbacks
              <br />
              <span className="gradient-text">in under an hour.</span>
            </h2>
            <p className="text-white/45 text-lg max-w-xl mx-auto">
              Most job seekers spend 4+ hours a day on job boards. Nova does it in the background while you sleep.
            </p>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map(({ num, icon, title, desc, color, bg }) => (
              <div
                key={num}
                className={`relative rounded-2xl border p-6 ${bg} flex flex-col gap-4`}
              >
                <div className="flex items-start justify-between">
                  <span className="text-3xl">{icon}</span>
                  <span className={`text-xs font-mono font-medium ${color} opacity-60`}>{num}</span>
                </div>
                <div>
                  <h3 className="text-base font-medium text-white mb-2">{title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
  
          {/* Flow connector */}
          <div className="hidden lg:flex items-center justify-center mt-8 gap-2 text-white/20 text-xs">
            {steps.map((s, i) => (
              <>
                <span key={s.num}>{s.title.split(' ').slice(0, 2).join(' ')}</span>
                {i < steps.length - 1 && <span key={`arr-${i}`} className="text-white/15">——→</span>}
              </>
            ))}
          </div>
        </div>
      </section>
    )
  }