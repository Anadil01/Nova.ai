export function SecuritySection() {
    const rows = [
      { label: 'Phone OTP login',          sub: 'You log in with OTP sent to +91 98765 43210',             status: 'Active',    statusColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', action: null             },
      { label: 'Email login',              sub: 'arjun@email.com — not yet verified',                      status: 'Unverified', statusColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',    action: 'Verify email'   },
      { label: 'Two-factor authentication', sub: 'Add an extra layer of security to your account',          status: 'Disabled',  statusColor: 'text-white/25 bg-white/5 border-white/10',              action: 'Enable'         },
      { label: 'Active sessions',          sub: '1 active session · Chrome · Bangalore · last seen now',   status: null,        statusColor: '',                                                      action: 'Manage'         },
      { label: 'Data privacy',             sub: 'Your data is never sold · view our privacy policy',        status: null,        statusColor: '',                                                      action: 'View policy'    },
    ]
  
    return (
      <div className="space-y-5">
        <div>
          <h2 className="text-base font-medium text-white mb-0.5">Security</h2>
          <p className="text-xs text-white/35">Manage your account security and sessions</p>
        </div>
        <div className="rounded-2xl border border-white/8 bg-white/[0.02] px-5 py-1">
          {rows.map(({ label, sub, status, statusColor, action }) => (
            <div key={label} className="flex items-start justify-between gap-4 py-3.5 border-b border-white/6 last:border-b-0">
              <div className="flex-1">
                <p className="text-sm font-medium text-white mb-0.5">{label}</p>
                <p className="text-xs text-white/35 leading-relaxed">{sub}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {status && (
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${statusColor}`}>
                    {status}
                  </span>
                )}
                {action && (
                  <button className="text-xs text-violet-400 hover:text-violet-300 border border-violet-500/20 hover:border-violet-500/40 px-2.5 py-1 rounded-lg transition-all">
                    {action}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }