const rows = [
    { feature: 'AI job matching',              nova: true,  naukri: false, linkedin: false, indeed: false },
    { feature: 'Ghost job detection',          nova: true,  naukri: false, linkedin: false, indeed: false },
    { feature: 'Auto-apply with tailored CV',  nova: true,  naukri: false, linkedin: false, indeed: false },
    { feature: 'ATS resume per application',   nova: true,  naukri: false, linkedin: false, indeed: false },
    { feature: 'Cover letter per job',         nova: true,  naukri: false, linkedin: false, indeed: false },
    { feature: 'WhatsApp job updates',         nova: true,  naukri: false, linkedin: false, indeed: false },
    { feature: 'Verified skill tests',         nova: true,  naukri: false, linkedin: false, indeed: false },
    { feature: 'Recruiter honesty score',      nova: true,  naukri: false, linkedin: false, indeed: false },
    { feature: 'Hindi / regional languages',   nova: true,  naukri: false, linkedin: false, indeed: false },
    { feature: 'Voice interview coach',        nova: true,  naukri: false, linkedin: 'paid',  indeed: false },
    { feature: 'Real salary data (India)',     nova: true,  naukri: 'partial', linkedin: 'partial', indeed: false },
    { feature: 'Free plan available',          nova: true,  naukri: true,  linkedin: true,  indeed: true  },
  ]
  
  function Cell({ val }: { val: boolean | string }) {
    if (val === true)      return <span className="text-emerald-400 text-base">✓</span>
    if (val === false)     return <span className="text-white/15 text-base">✗</span>
    if (val === 'paid')    return <span className="text-amber-400 text-xs">Paid</span>
    if (val === 'partial') return <span className="text-amber-400 text-xs">Partial</span>
    return null
  }
  
  export function CompareSection() {
    return (
      <section className="py-24 px-5 bg-[#050810]">
        <div className="max-w-5xl mx-auto">
  
          <div className="text-center mb-14">
            <p className="text-xs font-medium uppercase tracking-widest text-violet-400 mb-3">
              vs the competition
            </p>
            <h2 className="text-4xl md:text-5xl font-medium text-white tracking-tight">
              No other platform
              <br />
              <span className="gradient-text">does all of this.</span>
            </h2>
          </div>
  
          <div className="overflow-x-auto rounded-2xl border border-white/8">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/8">
                  <th className="text-left py-3.5 px-5 text-white/40 font-normal text-xs w-[40%]">Feature</th>
                  <th className="py-3.5 px-4 text-violet-300 font-medium text-xs bg-violet-500/8 border-x border-violet-500/15">Nova ✦</th>
                  <th className="py-3.5 px-4 text-white/40 font-normal text-xs">Naukri</th>
                  <th className="py-3.5 px-4 text-white/40 font-normal text-xs">LinkedIn</th>
                  <th className="py-3.5 px-4 text-white/40 font-normal text-xs">Indeed</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(({ feature, nova, naukri, linkedin, indeed }) => (
                  <tr key={feature} className="border-b border-white/5 hover:bg-white/[0.015]">
                    <td className="py-3 px-5 text-white/60 text-xs">{feature}</td>
                    <td className="py-3 px-4 text-center bg-violet-500/5 border-x border-violet-500/10"><Cell val={nova}/></td>
                    <td className="py-3 px-4 text-center"><Cell val={naukri}/></td>
                    <td className="py-3 px-4 text-center"><Cell val={linkedin}/></td>
                    <td className="py-3 px-4 text-center"><Cell val={indeed}/></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    )
  }