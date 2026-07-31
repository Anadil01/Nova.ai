'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

const links = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Features',     href: '#features'     },
  { label: 'Trust',        href: '#trust'         },
  { label: 'Pricing',      href: '#pricing'       },
]

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-[#050810]/90 backdrop-blur-xl border-b border-white/8 py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
            <span className="text-violet-400 text-xs font-bold">✦</span>
          </div>
          <span className="text-[15px] font-medium text-white">Nova</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map(({ label, href }) => (
            
              key={href}
              href={href}
              className="text-sm text-white/50 hover:text-white transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/auth/login"
            className="text-sm text-white/60 hover:text-white transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/hire"
            className="text-sm text-white/60 hover:text-white transition-colors border border-white/15 px-3 py-1.5 rounded-xl hover:border-white/30"
          >
            For employers
          </Link>
          <Link
            href="/auth/onboard"
            className="text-sm font-medium bg-violet-600 hover:bg-violet-500 text-white px-4 py-1.5 rounded-xl transition-all"
          >
            Get started free →
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white/60"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12"/>
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16"/>
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#0a0f1e] border-t border-white/8 px-5 py-4 flex flex-col gap-4">
          {links.map(({ label, href }) => (
            <a key={href} href={href} className="text-sm text-white/60" onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <div className="border-t border-white/8 pt-4 flex flex-col gap-3">
            <Link href="/auth/login" className="text-sm text-white/60">Sign in</Link>
            <Link href="/auth/onboard" className="text-sm font-medium bg-violet-600 text-white px-4 py-2 rounded-xl text-center">
              Get started free →
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}