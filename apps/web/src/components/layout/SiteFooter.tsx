import Link from 'next/link'

const cols = [
  {
    title: 'Product',
    links: [
      { label: 'How it works', href: '#how-it-works' },
      { label: 'Features',     href: '#features'     },
      { label: 'Pricing',      href: '#pricing'      },
      { label: 'For employers', href: '/hire'        },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About',    href: '/about'   },
      { label: 'Blog',     href: '/blog'    },
      { label: 'Careers',  href: '/careers' },
      { label: 'Contact',  href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy policy', href: '/privacy' },
      { label: 'Terms of service', href: '/terms' },
      { label: 'Cookie policy',  href: '/cookies' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="bg-[#07090f] border-t border-white/8 px-5 pt-14 pb-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-xs font-bold text-violet-400">✦</div>
              <span className="text-white font-medium">Nova</span>
            </div>
            <p className="text-xs text-white/35 leading-relaxed mb-4 max-w-[200px]">
              India's first WhatsApp AI job agent. Find jobs, build resumes, apply — all on WhatsApp.
            </p>
            <p className="text-[10px] text-white/20">Made with ♥ in India</p>
          </div>

          {cols.map(({ title, links }) => (
            <div key={title}>
              <p className="text-xs font-medium text-white/50 mb-4 uppercase tracking-widest">{title}</p>
              <ul className="space-y-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-xs text-white/35 hover:text-white/70 transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-white/25">© 2026 Nova AI · All rights reserved</p>
          <p className="text-[11px] text-white/25">
            Looking to hire?{' '}
            <Link href="/hire" className="text-violet-400 hover:text-violet-300">
              Post a job on Nova →
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}