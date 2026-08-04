'use client'
import { Bell, Search, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function DashboardTopbar() {
  return (
    <header className="h-14 border-b border-white/8 bg-[#08090f] flex items-center justify-between px-5 flex-shrink-0">
      <div>
        <p className="text-base font-medium text-white">
          Good morning, Arjun 👋
        </p>
        <p className="text-xs text-white/40 mt-0.5">
          5 new job matches · 2 application updates
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="secondary" size="sm">
          <MessageCircle className="w-3.5 h-3.5" />
          Open in WhatsApp
        </Button>
        <Button variant="primary" size="sm">
          <Search className="w-3.5 h-3.5" />
          Find jobs
        </Button>
        <button className="relative w-8 h-8 flex items-center justify-center rounded-xl border border-white/10 hover:bg-white/5 transition-all">
          <Bell className="w-4 h-4 text-white/50" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-400" />
        </button>
      </div>
    </header>
  )
}