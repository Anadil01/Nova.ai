const companies = [
    'Razorpay', 'Zepto', 'CRED', 'PhonePe', 'Swiggy',
    'Meesho', 'Flipkart', 'Ola', 'Zomato', 'Groww',
    'Paytm', 'Navi', 'Slice', 'Jupiter', 'Fi Money',
  ]
  
  export function MarqueeSection() {
    const doubled = [...companies, ...companies]
  
    return (
      <section className="py-10 border-y border-white/6 overflow-hidden bg-[#07090f]">
        <p className="text-center text-xs text-white/25 mb-6 tracking-widest uppercase">
          Jobs from top Indian companies — scraped daily
        </p>
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#07090f] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#07090f] to-transparent z-10 pointer-events-none" />
          {/* Scrolling row */}
          <div
            className="flex gap-6 w-max"
            style={{ animation: 'marquee 30s linear infinite' }}
          >
            {doubled.map((co, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/8 bg-white/3 text-white/40 text-sm whitespace-nowrap"
              >
                <div className="w-5 h-5 rounded bg-white/8 flex items-center justify-center text-[9px] font-bold text-white/50">
                  {co.slice(0, 2).toUpperCase()}
                </div>
                {co}
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @keyframes marquee {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
        `}</style>
      </section>
    )
  }