const testimonials = [
    {
      name:   'Riya Sharma',
      role:   'React Developer · Hired at Razorpay',
      avatar: 'RS',
      color:  'bg-violet-500/20 text-violet-300',
      text:   "I'd been applying on Naukri for 3 months with zero responses. Nova applied to 12 jobs in one day, tailored my resume for each, and I got 4 callbacks in the first week. Got the Razorpay offer in 18 days.",
      metric: '18 days to offer',
    },
    {
      name:   'Karthik Menon',
      role:   'Full Stack Dev · Hired at Zepto',
      avatar: 'KM',
      color:  'bg-blue-500/20 text-blue-300',
      text:   "The ghost job detector is insane. I was wasting hours on jobs that had been filled months ago. Nova only showed me active listings and my application-to-callback rate went from 2% to 28%.",
      metric: '28% callback rate',
    },
    {
      name:   'Priya Singh',
      role:   'Data Analyst · Hired at Groww',
      avatar: 'PS',
      color:  'bg-emerald-500/20 text-emerald-300',
      text:   "I'm from Nagpur and was scared I'd have to move to Bangalore to get a good job. Nova found me a ₹16L remote role at Groww. The WhatsApp flow in Hindi made everything so easy — felt like talking to a friend.",
      metric: '₹16L remote from Nagpur',
    },
  ]
  
  export function TestimonialsSection() {
    return (
      <section className="py-24 px-5 bg-[#07090f]">
        <div className="max-w-6xl mx-auto">
  
          <div className="text-center mb-16">
            <p className="text-xs font-medium uppercase tracking-widest text-violet-400 mb-3">
              Real results
            </p>
            <h2 className="text-4xl md:text-5xl font-medium text-white tracking-tight mb-4">
              People who stopped
              <br />
              <span className="gradient-text">applying alone.</span>
            </h2>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map(({ name, role, avatar, color, text, metric }) => (
              <div
                key={name}
                className="rounded-2xl border border-white/8 bg-white/[0.02] p-6 flex flex-col gap-4"
              >
                {/* Stars */}
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-amber-400 text-sm">★</span>
                  ))}
                </div>
  
                <p className="text-sm text-white/60 leading-relaxed flex-1">"{text}"</p>
  
                {/* Metric */}
                <div className="text-xs font-medium text-emerald-400 bg-emerald-500/8 border border-emerald-500/20 px-2.5 py-1 rounded-full inline-block self-start">
                  ✓ {metric}
                </div>
  
                {/* Author */}
                <div className="flex items-center gap-2.5 pt-2 border-t border-white/8">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${color}`}>
                    {avatar}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white">{name}</p>
                    <p className="text-[10px] text-white/35">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }