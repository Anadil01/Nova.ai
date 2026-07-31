const stats = [
    { n: '72%',   label: 'of recruiters receive AI fake resumes',  sub: 'Nova verifies real skills'           },
    { n: '47%',   label: 'of job listings are ghost jobs',         sub: 'Nova detects and filters them'       },
    { n: '1,000+', label: 'applications per role on average',      sub: 'Nova makes yours stand out'          },
    { n: '96%',   label: 'top match score on real jobs',           sub: 'For verified Nova candidates'        },
  ]
  
  const trustFeatures = [
    { icon: '🏅', title: 'Nova Trust Score', desc: 'Your verified skill badge — based on real tests and GitHub activity, not self-reported claims. Recruiters filter for it.' },
    { icon: '🔍', title: 'Ghost job filter', desc: 'Every listing is scored for authenticity. If a job was posted 60 days ago and has no company careers page match, we hide it.' },
    { icon: '⚡', title: '5-min skill tests', desc: 'Quick role-specific tests that prove you know your stuff. Results attach to every application you send via Nova.' },
    { icon: '📋', title: 'Recruiter rating', desc: 'See how a recruiter behaves before you apply — response rate, avg reply time, offer acceptance rate. No more surprises.' },
  ]
  
  export function TrustSection() {
    return (
      <section id="trust" className="py-24 px-5 bg-[#050810]">
        <div className="max-w-6xl mx-auto">
  
          <div className="text-center mb-16">
            <p className="text-xs font-medium uppercase tracking-widest text-violet-400 mb-3">
              The trust layer
            </p>
            <h2 className="text-4xl md:text-5xl font-medium text-white tracking-tight mb-4">
              The hiring market is broken.
              <br />
              <span className="gradient-text">Nova fixes both sides.</span>
            </h2>
            <p className="text-white/45 text-lg max-w-2xl mx-auto">
              Candidates fear AI detection. Recruiters fear AI fraud. Nova introduces
              verified trust — so real candidates get seen, and real jobs get filled.
            </p>
          </div>
  
          {/* Crisis stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
            {stats.map(({ n, label, sub }) => (
              <div key={n} className="rounded-2xl border border-white/8 bg-white/[0.02] p-5 text-center">
                <div className="text-3xl font-medium text-white mb-1">{n}</div>
                <div className="text-xs text-white/40 mb-2 leading-snug">{label}</div>
                <div className="text-[10px] font-medium text-violet-400 border border-violet-500/20 bg-violet-500/8 px-2 py-0.5 rounded-full inline-block">
                  {sub}
                </div>
              </div>
            ))}
          </div>
  
          {/* Trust features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trustFeatures.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="flex gap-4 rounded-2xl border border-white/8 bg-white/[0.02] p-5 hover:border-violet-500/30 transition-all"
              >
                <div className="text-2xl flex-shrink-0 mt-0.5">{icon}</div>
                <div>
                  <h3 className="text-sm font-medium text-white mb-1">{title}</h3>
                  <p className="text-xs text-white/45 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }