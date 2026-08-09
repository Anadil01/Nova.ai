'use client'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { Application, AppStatus } from './TrackerPage'

const STATUS_STEPS: AppStatus[] = [
  'APPLIED', 'VIEWED', 'INTERVIEW', 'OFFER',
]

interface Props {
  app:            Application
  onClose:        () => void
  onMove:         (status: AppStatus) => void
  onUpdateNotes:  (notes: string) => void
}

export function AppDrawer({ app, onClose, onMove, onUpdateNotes }: Props) {
  const [notes, setNotes]       = useState(app.notes)
  const [editing, setEditing]   = useState(false)
  const [scheduling, setSchedule] = useState(false)

  const currentIdx = STATUS_STEPS.indexOf(app.status as AppStatus)

  const handleSaveNotes = () => {
    onUpdateNotes(notes)
    setEditing(false)
  }

  const handleSchedule = async () => {
    setSchedule(true)
    await new Promise(r => setTimeout(r, 1000))
    setSchedule(false)
  }

  return (
    <aside className="w-[280px] flex-shrink-0 bg-[#08090f] border-l border-white/8 flex flex-col overflow-hidden">

      {/* Topbar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/8 flex-shrink-0">
        <span className="text-[10px] font-medium uppercase tracking-widest text-white/25">
          Application detail
        </span>
        <button
          onClick={onClose}
          className="w-6 h-6 rounded-lg border border-white/10 flex items-center justify-center text-white/25 hover:text-white/60 hover:border-white/20 transition-all text-xs"
        >
          ✕
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-5">

          {/* Company + role */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-11 h-11 rounded-xl bg-white/6 border border-white/8 flex items-center justify-center text-sm font-semibold text-white/40 flex-shrink-0">
                {app.initials}
              </div>
              <div>
                <p className="text-sm font-medium text-white">{app.company}</p>
                <p className="text-[10px] text-white/35 mt-0.5">{app.location}</p>
              </div>
            </div>
            <h2 className="text-base font-medium text-white mb-3">{app.role}</h2>

            {/* Meta grid */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Salary',      value: app.salary      },
                { label: 'Applied via', value: app.autoApplied ? 'Nova · ' + app.source : 'Manual · ' + app.source },
                { label: 'Applied on',  value: app.appliedAt   },
                { label: 'Status',      value: app.status.charAt(0) + app.status.slice(1).toLowerCase() },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white/[0.03] border border-white/6 rounded-xl p-2.5">
                  <p className="text-[9px] text-white/25 mb-1">{label}</p>
                  <p className="text-xs font-medium text-white/80 truncate">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Status stepper */}
          {app.status !== 'REJECTED' && (
            <div>
              <p className="text-[10px] font-medium uppercase tracking-widest text-white/25 mb-3">
                Application journey
              </p>
              <div className="space-y-0">
                {STATUS_STEPS.map((step, i) => {
                  const done    = i < currentIdx
                  const active  = i === currentIdx
                  const pending = i > currentIdx
                  const isLast  = i === STATUS_STEPS.length - 1

                  return (
                    <div key={step} className="flex gap-3">
                      {/* Left — dot + line */}
                      <div className="flex flex-col items-center w-5">
                        <div className={cn(
                          'w-5 h-5 rounded-full flex items-center justify-center text-[10px] flex-shrink-0 border',
                          done   ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400' :
                          active ? 'bg-violet-500/15 border-violet-500/40 text-violet-400'    :
                                   'bg-white/5 border-white/10 text-white/20'
                        )}>
                          {done ? '✓' : active ? '●' : '○'}
                        </div>
                        {!isLast && (
                          <div className={cn(
                            'w-px flex-1 my-0.5',
                            done ? 'bg-emerald-500/25' : 'bg-white/8'
                          )} style={{ minHeight: 16 }} />
                        )}
                      </div>

                      {/* Right — label */}
                      <div className="pb-3 flex-1">
                        <p className={cn(
                          'text-xs font-medium',
                          done   ? 'text-emerald-400' :
                          active ? 'text-violet-300'  :
                                   'text-white/20'
                        )}>
                          {step.charAt(0) + step.slice(1).toLowerCase()}
                        </p>
                        <p className="text-[10px] text-white/25 mt-0.5">
                          {done   ? 'Completed'    :
                           active ? 'Current stage' :
                                    'Pending'}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Rejected state */}
          {app.status === 'REJECTED' && (
            <div className="bg-red-500/6 border border-red-500/20 rounded-xl p-3">
              <p className="text-xs font-medium text-red-400 mb-1">Application rejected</p>
              <p className="text-[10px] text-red-400/70">
                Candidate was notified automatically via WhatsApp.
              </p>
            </div>
          )}

          {/* Offer state */}
          {app.status === 'OFFER' && (
            <div className="bg-emerald-500/6 border border-emerald-500/20 rounded-xl p-3">
              <p className="text-xs font-medium text-emerald-400 mb-1">🎉 Offer received!</p>
              <p className="text-[10px] text-emerald-400/70">{app.salary} · Respond before deadline</p>
            </div>
          )}

          {/* Timeline */}
          <div>
            <p className="text-[10px] font-medium uppercase tracking-widest text-white/25 mb-3">
              Activity timeline
            </p>
            <div className="space-y-0">
              {app.timeline.map((item, i) => (
                <div key={i} className="flex gap-2.5 pb-3 relative">
                  {i < app.timeline.length - 1 && (
                    <div className="absolute left-[11px] top-5 bottom-0 w-px bg-white/6" />
                  )}
                  <div className={cn(
                    'w-5 h-5 rounded-full flex items-center justify-center text-[11px] flex-shrink-0 z-10',
                    item.color
                  )}>
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-white/70 leading-snug">{item.text}</p>
                    <p className="text-[10px] text-white/25 mt-0.5">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-medium uppercase tracking-widest text-white/25">
                Notes
              </p>
              <button
                onClick={() => setEditing(!editing)}
                className="text-[10px] text-violet-400 hover:text-violet-300 transition-colors"
              >
                {editing ? 'Cancel' : 'Edit'}
              </button>
            </div>
            {editing ? (
              <div className="space-y-2">
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  rows={4}
                  placeholder="Add notes about this application…"
                  className="w-full bg-white/[0.04] border border-violet-500/30 rounded-xl px-3 py-2.5 text-xs text-white placeholder-white/20 outline-none resize-none leading-relaxed"
                  autoFocus
                />
                <button
                  onClick={handleSaveNotes}
                  className="w-full py-1.5 bg-violet-600 hover:bg-violet-500 text-white text-xs rounded-lg transition-all"
                >
                  Save notes
                </button>
              </div>
            ) : (
              <div className="bg-white/[0.02] border border-white/6 rounded-xl p-3">
                {notes ? (
                  <p className="text-xs text-white/50 leading-relaxed">{notes}</p>
                ) : (
                  <p className="text-xs text-white/20 italic">No notes yet. Click Edit to add one.</p>
                )}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* CTAs */}
      <div className="p-4 border-t border-white/8 space-y-2 flex-shrink-0">

        {/* Move stage select */}
        <select
          value={app.status}
          onChange={e => onMove(e.target.value as AppStatus)}
          className="w-full bg-white/[0.04] border border-white/10 text-white/60 text-xs rounded-xl px-3 py-2.5 outline-none cursor-pointer"
        >
          <option value="APPLIED">Move to… Applied</option>
          <option value="VIEWED">Move to… Viewed</option>
          <option value="INTERVIEW">Move to… Interview</option>
          <option value="OFFER">Move to… Offer</option>
          <option value="REJECTED">Move to… Rejected</option>
        </select>

        <div className="grid grid-cols-2 gap-2">
          {/* Schedule interview */}
          <button
            onClick={handleSchedule}
            disabled={scheduling}
            className="py-2 bg-violet-600/80 hover:bg-violet-600 disabled:opacity-50 text-white text-xs rounded-xl transition-all flex items-center justify-center gap-1.5"
          >
            {scheduling ? (
              <svg className="animate-spin w-3 h-3" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
            ) : '🎤 Prep'}
          </button>

          {/* View resume sent */}
          <button className="py-2 border border-white/10 hover:border-white/20 text-white/40 hover:text-white/70 text-xs rounded-xl transition-all">
            📄 Resume
          </button>
        </div>

        {/* Archive */}
        <button
          onClick={() => onMove('REJECTED')}
          className="w-full py-2 border border-red-500/15 hover:border-red-500/30 text-red-400/60 hover:text-red-400 text-xs rounded-xl transition-all"
        >
          Archive application
        </button>
      </div>
    </aside>
  )
}