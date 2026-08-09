'use client'
import { useState } from 'react'
import { TrackerStats }  from './TrackerStats'
import { TrackerBoard }  from './TrackerBoard'
import { AppDrawer }     from './AppDrawer'

export type AppStatus =
  | 'APPLIED'
  | 'VIEWED'
  | 'INTERVIEW'
  | 'OFFER'
  | 'REJECTED'

export interface Application {
  id:          string
  company:     string
  initials:    string
  role:        string
  location:    string
  salary:      string
  source:      string
  status:      AppStatus
  appliedAt:   string
  autoApplied: boolean
  urgent?:     boolean
  interviewAt?: string
  notes:       string
  timeline: {
    icon:  string
    text:  string
    sub:   string
    color: string
  }[]
}

export const MOCK_APPS: Application[] = [
  {
    id: '1',
    company:     'Razorpay',
    initials:    'RZ',
    role:        'Senior React Developer',
    location:    'Bangalore + Remote',
    salary:      '₹18–22 LPA',
    source:      'Naukri',
    status:      'APPLIED',
    appliedAt:   '12 Jan 2025',
    autoApplied: true,
    urgent:      true,
    notes:       'Strong match. Ask about TypeScript experience. Review Razorpay product launches before interview.',
    timeline: [
      { icon: '📤', text: 'Applied via Nova',             sub: '12 Jan · Naukri · resume v3',   color: 'bg-violet-500/15 text-violet-400' },
      { icon: '👁️', text: 'Profile viewed by recruiter',  sub: '13 Jan · 2:40 PM',              color: 'bg-blue-500/15 text-blue-400'    },
      { icon: '🔔', text: 'Follow-up reminder set',       sub: '14 Jan · auto-scheduled',       color: 'bg-amber-500/15 text-amber-400'  },
    ],
  },
  {
    id: '2',
    company:     'Zepto',
    initials:    'ZP',
    role:        'Full Stack Engineer',
    location:    'Mumbai',
    salary:      '₹16–20 LPA',
    source:      'LinkedIn',
    status:      'APPLIED',
    appliedAt:   '11 Jan 2025',
    autoApplied: true,
    notes:       '',
    timeline: [
      { icon: '📤', text: 'Applied via Nova', sub: '11 Jan · LinkedIn', color: 'bg-violet-500/15 text-violet-400' },
    ],
  },
  {
    id: '3',
    company:     'Meesho',
    initials:    'MS',
    role:        'React Developer',
    location:    'Bangalore',
    salary:      '₹12–16 LPA',
    source:      'Indeed',
    status:      'APPLIED',
    appliedAt:   '10 Jan 2025',
    autoApplied: false,
    urgent:      true,
    notes:       'Deadline today — follow up immediately.',
    timeline: [
      { icon: '📤', text: 'Applied manually', sub: '10 Jan · Indeed', color: 'bg-white/10 text-white/40' },
    ],
  },
  {
    id: '4',
    company:     'Swiggy',
    initials:    'SW',
    role:        'Backend Engineer',
    location:    'Bangalore',
    salary:      '₹14–18 LPA',
    source:      'Naukri',
    status:      'VIEWED',
    appliedAt:   '9 Jan 2025',
    autoApplied: true,
    notes:       '',
    timeline: [
      { icon: '📤', text: 'Applied via Nova',             sub: '9 Jan · Naukri',   color: 'bg-violet-500/15 text-violet-400' },
      { icon: '👁️', text: 'Resume viewed by recruiter',   sub: 'Today · 9:15 AM',  color: 'bg-blue-500/15 text-blue-400'    },
    ],
  },
  {
    id: '5',
    company:     'Ola',
    initials:    'OL',
    role:        'Frontend Developer',
    location:    'Bangalore',
    salary:      '₹12–16 LPA',
    source:      'LinkedIn',
    status:      'VIEWED',
    appliedAt:   '8 Jan 2025',
    autoApplied: false,
    notes:       '',
    timeline: [
      { icon: '📤', text: 'Applied manually',           sub: '8 Jan · LinkedIn',   color: 'bg-white/10 text-white/40'       },
      { icon: '👁️', text: 'Profile viewed',             sub: '11 Jan · 3 PM',      color: 'bg-blue-500/15 text-blue-400'   },
    ],
  },
  {
    id: '6',
    company:     'Flipkart',
    initials:    'FK',
    role:        'SDE — Round 1',
    location:    'Bangalore',
    salary:      '₹18–24 LPA',
    source:      'Naukri',
    status:      'INTERVIEW',
    appliedAt:   '5 Jan 2025',
    autoApplied: true,
    urgent:      true,
    interviewAt: 'Tomorrow · 11:00 AM',
    notes:       'Prepare: DSA round. Focus on arrays, trees. Use STAR format for behavioural questions.',
    timeline: [
      { icon: '📤', text: 'Applied via Nova',            sub: '5 Jan · Naukri',            color: 'bg-violet-500/15 text-violet-400'  },
      { icon: '👁️', text: 'Resume viewed',               sub: '6 Jan',                     color: 'bg-blue-500/15 text-blue-400'     },
      { icon: '📞', text: 'Callback received',           sub: '7 Jan · HR screening done', color: 'bg-emerald-500/15 text-emerald-400'},
      { icon: '🎤', text: 'Interview scheduled',         sub: 'Tomorrow · 11 AM · Meet',   color: 'bg-amber-500/15 text-amber-400'   },
    ],
  },
  {
    id: '7',
    company:     'CRED',
    initials:    'CR',
    role:        'Frontend Lead',
    location:    'Bangalore',
    salary:      '₹20–24 LPA',
    source:      'Naukri',
    status:      'INTERVIEW',
    appliedAt:   '3 Jan 2025',
    autoApplied: false,
    interviewAt: 'In 3 days · 2:00 PM',
    notes:       'Round 2 — system design. Prepare: component architecture, performance optimisation.',
    timeline: [
      { icon: '📤', text: 'Applied manually',            sub: '3 Jan · Naukri',    color: 'bg-white/10 text-white/40'        },
      { icon: '👁️', text: 'Resume viewed',               sub: '4 Jan',             color: 'bg-blue-500/15 text-blue-400'    },
      { icon: '🎤', text: 'Round 1 completed',           sub: '8 Jan · Technical', color: 'bg-violet-500/15 text-violet-400' },
      { icon: '🎤', text: 'Round 2 scheduled',           sub: 'In 3 days · 2 PM',  color: 'bg-amber-500/15 text-amber-400'  },
    ],
  },
  {
    id: '8',
    company:     'PhonePe',
    initials:    'PP',
    role:        'Node.js Developer',
    location:    'Bangalore',
    salary:      '₹16 LPA (offered)',
    source:      'LinkedIn',
    status:      'OFFER',
    appliedAt:   '28 Dec 2024',
    autoApplied: true,
    urgent:      true,
    notes:       'Offer deadline in 3 days. Compare with Flipkart before deciding.',
    timeline: [
      { icon: '📤', text: 'Applied via Nova',            sub: '28 Dec · LinkedIn', color: 'bg-violet-500/15 text-violet-400'  },
      { icon: '👁️', text: 'Profile viewed',              sub: '29 Dec',            color: 'bg-blue-500/15 text-blue-400'     },
      { icon: '🎤', text: 'Interview completed',         sub: '2 Jan · 2 rounds',  color: 'bg-emerald-500/15 text-emerald-400'},
      { icon: '🎉', text: 'Offer received!',             sub: 'Today · ₹16 LPA',   color: 'bg-emerald-500/15 text-emerald-400'},
    ],
  },
  {
    id: '9',
    company:     "Byju's",
    initials:    'BY',
    role:        'Frontend Developer',
    location:    'Bangalore',
    salary:      '₹10–14 LPA',
    source:      'Naukri',
    status:      'REJECTED',
    appliedAt:   '20 Dec 2024',
    autoApplied: true,
    notes:       '',
    timeline: [
      { icon: '📤', text: 'Applied via Nova',   sub: '20 Dec · Naukri',  color: 'bg-violet-500/15 text-violet-400' },
      { icon: '❌', text: 'Rejected',            sub: 'No feedback given', color: 'bg-red-500/15 text-red-400'      },
    ],
  },
  {
    id: '10',
    company:     'Infosys',
    initials:    'IN',
    role:        'React Developer',
    location:    'Pune',
    salary:      '₹8–12 LPA',
    source:      'Naukri',
    status:      'REJECTED',
    appliedAt:   '15 Dec 2024',
    autoApplied: false,
    notes:       '',
    timeline: [
      { icon: '📤', text: 'Applied manually',   sub: '15 Dec · Naukri',       color: 'bg-white/10 text-white/40'   },
      { icon: '❌', text: 'Rejected',            sub: 'After resume screening', color: 'bg-red-500/15 text-red-400' },
    ],
  },
]

export function TrackerPage() {
  const [apps, setApps]             = useState<Application[]>(MOCK_APPS)
  const [selected, setSelected]     = useState<Application | null>(null)
  const [checked, setChecked]       = useState<string[]>([])

  const toggleCheck = (id: string) =>
    setChecked(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )

  const moveApp = (id: string, status: AppStatus) => {
    setApps(prev => prev.map(a => a.id === id ? { ...a, status } : a))
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, status } : null)
  }

  const bulkMove = (status: AppStatus) => {
    setApps(prev => prev.map(a => checked.includes(a.id) ? { ...a, status } : a))
    setChecked([])
  }

  const bulkReject = () => {
    bulkMove('REJECTED')
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Stats */}
      <TrackerStats apps={apps} />

      {/* Bulk action bar */}
      {checked.length > 0 && (
        <div className="flex items-center gap-3 px-5 py-2.5 bg-violet-500/8 border-b border-violet-500/20 flex-shrink-0">
          <span className="text-xs font-medium text-violet-300">
            {checked.length} selected
          </span>
          <div className="flex items-center gap-2 flex-1">
            {(['VIEWED', 'INTERVIEW', 'OFFER'] as AppStatus[]).map(s => (
              <button
                key={s}
                onClick={() => bulkMove(s)}
                className="text-xs px-2.5 py-1 rounded-lg border border-violet-500/25 text-violet-300 hover:bg-violet-500/15 transition-all"
              >
                Move to {s.charAt(0) + s.slice(1).toLowerCase()}
              </button>
            ))}
            <button
              onClick={bulkReject}
              className="text-xs px-2.5 py-1 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/8 transition-all"
            >
              Reject all
            </button>
          </div>
          <button
            onClick={() => setChecked([])}
            className="text-xs text-white/30 hover:text-white/60 transition-colors"
          >
            ✕ Deselect
          </button>
        </div>
      )}

      {/* Board + drawer */}
      <div className="flex flex-1 overflow-hidden">
        <TrackerBoard
          apps={apps}
          selected={selected}
          checked={checked}
          onSelect={setSelected}
          onToggleCheck={toggleCheck}
          onMove={moveApp}
        />

        {/* Drawer */}
        {selected && (
          <AppDrawer
            app={selected}
            onClose={() => setSelected(null)}
            onMove={status => moveApp(selected.id, status)}
            onUpdateNotes={notes =>
              setApps(prev => prev.map(a => a.id === selected.id ? { ...a, notes } : a))
            }
          />
        )}
      </div>
    </div>
  )
}