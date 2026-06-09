export interface RatioItem {
  key: string
  label: string
  color?: string
}

interface Props {
  items: RatioItem[]
  values: Record<string, number>
  onChange: (values: Record<string, number>) => void
  showIc?: Record<string, number>
}

export default function LockedRatioGroup({ items, values, onChange, showIc }: Props) {
  const total = items.reduce((s, item) => s + Math.round((values[item.key] ?? 0) * 100), 0)
  const remaining = Math.max(0, 100 - total)
  const full = total >= 100

  const handleChange = (key: string, newPct: number) => {
    onChange({ ...values, [key]: newPct / 100 })
  }

  return (
    <div className="space-y-3">
      {items.map(item => {
        const pct = Math.round((values[item.key] ?? 0) * 100)
        const maxPct = pct + remaining  // bloqué quand remaining = 0
        return (
          <div key={item.key}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-700">{item.label}</span>
              <div className="flex items-center gap-3">
                {showIc && (
                  <span className="text-xs text-gray-400">
                    → {(showIc[item.key] * (pct / 100)).toFixed(1)} kg/m²
                  </span>
                )}
                <span className="text-sm font-bold text-ingerop-blue w-10 text-right">{pct}%</span>
              </div>
            </div>
            <input
              type="range"
              min={0}
              max={maxPct}
              step={1}
              value={pct}
              onChange={e => handleChange(item.key, parseInt(e.target.value))}
              disabled={full && pct === 0}
              className="w-full h-2.5 rounded-lg appearance-none cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
              style={{
                background: `linear-gradient(to right, ${item.color ?? '#003A7A'} 0%, ${item.color ?? '#003A7A'} ${pct}%, #E5E7EB ${pct}%, #E5E7EB 100%)`,
                accentColor: item.color ?? '#003A7A',
              }}
            />
          </div>
        )
      })}

      {/* Barre de remplissage total */}
      <div className="mt-1">
        <div className="flex justify-between text-xs mb-1">
          <span className={`font-medium ${full ? 'text-green-600' : 'text-gray-400'}`}>
            {full ? '✓ 100% — curseurs bloqués' : `${total}% — encore ${remaining}% disponible`}
          </span>
          <span className="text-gray-400">{total}/100%</span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: `${Math.min(100, total)}%`,
              backgroundColor: full ? '#16a34a' : '#003A7A',
            }}
          />
        </div>
      </div>
    </div>
  )
}
