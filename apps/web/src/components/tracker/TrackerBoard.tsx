'use client'
import { cn } from '@/lib/utils'
import type { Application, AppStatus } from './TrackerPage'

const COLS: { status: AppStatus; label: string; dot: string }[] = [
  { status: 'APPLIED',   label: 'Applied',   dot: 'bg-violet-500' },
  { status: 'VIEWED',    label: 'Viewed',    dot: 'bg-amber-500'  },
  { status: 'INTERVIEW', label: 'Interview', dot: 'bg-blue-500'   },
  { status: 'OFFER',     label: 'Offer',     dot: 'bg-emerald-500'},
  { status: 'REJECTED',  label: 'Rejected',  dot: 'bg-red-500'    },
]

interface Props {
  apps:           Application[]
  selected:       Application | null
  checked:        string[]
  onSelect:       (a: Application) => void
  onToggleCheck:  (id: string) => void
  onMove:         (id: string, status: AppStatus) => void
}

export function TrackerBoard({
  apps, selected, checked, onSelect, onToggleCheck, onMove,
}: Props) {
  return (
    <div className="flex-1 overflow-x-auto overflow-y-hidden p-4">
      <div className="flex gap-3 h-full min-w-max">
        {COLS.map(({ status, label, dot }) => {
          const colApps = apps.filter(a => a.status === status)
          return (
            <div
              key={status}
              className="w-[210px] flex-shrink-0 bg-[#08090f] border border-white/8 rounded-2xl flex flex-col overflow-hidden"
            >
              {/* Col header */}
              <div className="flex items-center justify-between px-3 py-2.5 border-b border-white/8 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <div className={cn('w-2 h-2 rounded-full', dot)} />
                  <span className="text-xs font-medium text-white">{label}</span>
                </div>
                <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-md bg-white/6 border border-white/8 text-white/40">
                  {colApps.length}
                </span>
              </div>

              {/* Cards */}
              <div className="flex-1 overflow-y-auto p-2 space-y-2">
                {colApps.map(app => (
                  <AppCard
                    key={app.id}
                    app={app}
                    isSelected={selected?.id === app.id}
                    isChecked={checked.includes(app.id)}
                    onSelect={() => onSelect(app)}
                    onToggleCheck={() => onToggleCheck(app.id)}
                    onMove={s => onMove(app.id, s)}
                    status={status}
                  />
                ))}

                {colApps.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-[10px] text-white/15">No applications</p>
                  </div>
                )}
              </div>

              {/* Add manually */}
              <button className="mx-2 mb-2 py-1.5 border border-dashed border-white/10 hover:border-violet-500/30 hover:text-violet-400 text-white/20 text-[10px] rounded-xl transition-all flex-shrink-0">
                + Add
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── App card ────────────────────────────────────────────
function AppCard({
  app, isSelected, isChecked, onSelect, onToggleCheck, onMove, status,
}: {
  app:           Application
  isSelected:    boolean
  isChecked:     boolean
  onSelect:      () => void
  onToggleCheck: () => void
  onMove:        (s: AppStatus) => void
  status:        AppStatus
}) {
  const nextStatus: Partial<Record<AppStatus, AppStatus>> = {
    APPLIED:   'VIEWED',
    VIEWED:    'INTERVIEW',
    INTERVIEW: 'OFFER',
    OFFER:     'REJECTED',
  }

  return (
    <div
      onClick={onSelect}
      className={cn(
        'rounded-xl border p-2.5 cursor-pointer transition-all group',
        isSelected
          ? 'border-violet-500/40 bg-violet-500/8'
          : app.urgent
          ? 'border-amber-500/25 bg-amber-500/5 hover:border-amber-500/40'
          : 'border-white/6 bg-white/[0.015] hover:border-white/12 hover:bg-white/[0.03]',
        status === 'REJECTED' && 'opacity-70'
      )}
    >
      {/* Top */}
      <div className="flex items-start gap-2 mb-2">
        {/* Checkbox */}
        <div
          onClick={e => { e.stopPropagation(); onToggleCheck() }}
          className={cn(
            'w-3.5 h-3.5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 border transition-all text-[9px] cursor-pointer',
            isChecked
              ? 'bg-violet-500 border-violet-500 text-white'
              : 'border-white/15 hover:border-violet-500/50'
          )}
        >
          {isChecked && '✓'}
        </div>

        {/* Logo */}
        <div className="w-6 h-6 rounded-lg bg-white/6 border border-white/8 flex items-center justify-center text-[9px] font-semibold text-white/40 flex-shrink-0">
          {app.initials}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-white truncate">{app.company}</p>
          <p className="text-[10px] text-white/35 truncate">{app.role}</p>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-2">
        <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-white/5 text-white/25 border border-white/8">
          {app.salary}
        </span>
        {app.autoApplied && (
          <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-violet-500/10 text-violet-400 border border-violet-500/15">
            Nova
          </span>
        )}
        {app.interviewAt && (
          <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/15">
            🕐 {app.interviewAt}
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="text-[9px] text-white/20">{app.appliedAt}</span>

        {/* Move button */}
        {nextStatus[status] && (
          <button
            onClick={e => { e.stopPropagation(); onMove(nextStatus[status]!) }}
            className="text-[9px] px-1.5 py-0.5 rounded-md border border-white/10 text-white/25 hover:border-violet-500/30 hover:text-violet-400 transition-all opacity-0 group-hover:opacity-100"
          >
            Move →
          </button>
        )}
        {status === 'REJECTED' && (
          <span className="text-[9px] text-red-400/50">Notified</span>
        )}
        {status === 'OFFER' && (
          <span className="text-[9px] text-emerald-400 font-medium">Respond ⚡</span>
        )}
      </div>
    </div>
  )
}