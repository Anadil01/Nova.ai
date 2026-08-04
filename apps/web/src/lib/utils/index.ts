import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatLPA(
  min?: number | null,
  max?: number | null
): string {
  if (!min && !max) return 'Salary not disclosed'
  if (min && max) return `₹${min}–${max} LPA`
  if (min) return `₹${min}+ LPA`
  return `Up to ₹${max} LPA`
}

export function timeAgo(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const diff = Date.now() - d.getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  if (days < 7) return `${days}d ago`
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
  })
}

export function matchColor(score: number): string {
  if (score >= 85) return 'text-emerald-400 bg-emerald-400/10'
  if (score >= 70) return 'text-amber-400 bg-amber-400/10'
  return 'text-slate-400 bg-slate-400/10'
}

export function truncate(str: string, n: number): string {
  return str.length > n ? str.slice(0, n - 1) + '…' : str
}