const stats = [
    { label: 'Applications',  value: '34',  color: 'text-blue-400'    },
    { label: 'Callbacks',     value: '4',   color: 'text-emerald-400' },
    { label: 'Interviews',    value: '2',   color: 'text-amber-400'   },
    { label: 'ATS score',     value: '82',  color: 'text-violet-400'  },
  ]
  
  export function ProfileStats() {
    return (
      <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-4">
        <p className="text-xs font-medium text-white mb-3">Activity overview</p>
        <div className="grid grid-cols-2 gap-2">
          {stats.map(({ label, value, color }) => (
            <div key={label} className="bg-white/[0.03] border border-white/6 rounded-xl p-2.5 text-center">
              <p className={`text-xl font-medium mb-0.5 ${color}`}>{value}</p>
              <p className="text-[10px] text-white/30">{label}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }