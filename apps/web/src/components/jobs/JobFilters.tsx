'use client'
import { cn } from '@/lib/utils'
import type { Filters } from './JobMatchesPage'

const MATCH_CHIPS = [
  { label: 'All',   value: 0  },
  { label: '90%+',  value: 90 },
  { label: '75%+',  value: 75 },
  { label: '60%+',  value: 60 },
]

const WORK_MODES = ['REMOTE', 'HYBRID', 'ONSITE']
const SOURCES    = ['Naukri', 'LinkedIn', 'Indeed']

interface Props {
  filters:    Filters
  setFilters: React.Dispatch<React.SetStateAction<Filters>>
  total:      number
}

export function JobFilters({ filters, setFilters, total }: Props) {
  const toggle = <K extends keyof Filters>(
    key: K,
    val: string
  ) => {
    setFilters(prev => {
      const arr = prev[key] as string[]
      return {
        ...prev,
        [key]: arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val],
      }
    })
  }

  const clear = () => setFilters({
    matchMin: 0, jobType: [], locations: [],
    salaryMin: 0, salaryMax: 50, sources: [], workMode: [],
  })

  const isDirty = filters.matchMin > 0 || filters.workMode.length > 0 || filters.sources.length > 0

  return (
    <aside className="w-[210px] flex-shrink-0 border-r border-white/8 bg-[#08090f] overflow-y-auto flex flex-col">

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-white/8">
        <span className="text-xs font-medium text-white">Filters</span>
        {isDirty && (
          <button onClick={clear} className="text-[10px] text-violet-400 hover:text-violet-300 transition-colors">
            Clear all
          </button>
        )}
      </div>

      <div className="p-3.5 space-y-5 flex-1">

        {/* Match score */}
        <div>
          <p className="text-[10px] font-medium uppercase tracking-widest text-white/30 mb-2.5">
            Match score
          </p>
          <div className="flex flex-wrap gap-1.5">
            {MATCH_CHIPS.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setFilters(p => ({ ...p, matchMin: value }))}
                className={cn(
                  'text-[11px] px-2.5 py-1 rounded-full border transition-all',
                  filters.matchMin === value
                    ? 'bg-violet-500/15 border-violet-500/40 text-violet-300'
                    : 'border-white/10 text-white/35 hover:border-white/20 hover:text-white/60'
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Work mode */}
        <div>
          <p className="text-[10px] font-medium uppercase tracking-widest text-white/30 mb-2.5">
            Work mode
          </p>
          <div className="space-y-1.5">
            {WORK_MODES.map(mode => {
              const on = filters.workMode.includes(mode)
              return (
                <button
                  key={mode}
                  onClick={() => toggle('workMode', mode)}
                  className="w-full flex items-center gap-2.5 group"
                >
                  <div className={cn(
                    'w-3.5 h-3.5 rounded flex items-center justify-center flex-shrink-0 border transition-all text-[9px]',
                    on
                      ? 'bg-violet-500 border-violet-500 text-white'
                      : 'border-white/15 group-hover:border-white/30'
                  )}>
                    {on && '✓'}
                  </div>
                  <span className={cn(
                    'text-xs transition-colors',
                    on ? 'text-white/80' : 'text-white/35 group-hover:text-white/55'
                  )}>
                    {mode.charAt(0) + mode.slice(1).toLowerCase()}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Salary range */}
        <div>
          <p className="text-[10px] font-medium uppercase tracking-widest text-white/30 mb-2.5">
            Salary (LPA)
          </p>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-white/40">
              <span>₹{filters.salaryMin}L</span>
              <span>₹{filters.salaryMax}L</span>
            </div>
            <input
              type="range"
              min={0} max={50} step={2}
              value={filters.salaryMax}
              onChange={e => setFilters(p => ({ ...p, salaryMax: Number(e.target.value) }))}
              className="w-full accent-violet-500 cursor-pointer"
            />
            <p className="text-[10px] text-white/25">
              Max: ₹{filters.salaryMax === 50 ? '50+' : filters.salaryMax} LPA
            </p>
          </div>
        </div>

        {/* Source */}
        <div>
          <p className="text-[10px] font-medium uppercase tracking-widest text-white/30 mb-2.5">
            Job board
          </p>
          <div className="space-y-1.5">
            {SOURCES.map(src => {
              const on = filters.sources.includes(src)
              return (
                <button
                  key={src}
                  onClick={() => toggle('sources', src)}
                  className="w-full flex items-center gap-2.5 group"
                >
                  <div className={cn(
                    'w-3.5 h-3.5 rounded flex items-center justify-center flex-shrink-0 border transition-all text-[9px]',
                    on
                      ? 'bg-violet-500 border-violet-500 text-white'
                      : 'border-white/15 group-hover:border-white/30'
                  )}>
                    {on && '✓'}
                  </div>
                  <span className={cn(
                    'text-xs transition-colors',
                    on ? 'text-white/80' : 'text-white/35 group-hover:text-white/55'
                  )}>
                    {src}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

      </div>

      {/* Footer — result count */}
      <div className="px-3.5 py-3 border-t border-white/8">
        <button
          className="w-full py-2 bg-violet-600 hover:bg-violet-500 text-white text-xs font-medium rounded-xl transition-all"
        >
          Show {total} jobs
        </button>
      </div>
    </aside>
  )
}