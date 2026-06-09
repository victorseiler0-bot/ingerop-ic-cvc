import { rebalance } from '../utils/rebalance'

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
  const pctOf = (v: number) => Math.round(v * 100)
  const total = items.reduce((s, item) => s + pctOf(values[item.key] ?? 0), 0)

  const handleChange = (key: string, raw: number) => {
    onChange(rebalance(values, key, raw))
  }

  return (
    <div className="space-y-3">
      {items.map(item => {
        const val = Math.round((values[item.key] ?? 0) * 100) / 100  // snap to 1% step
        const pct = pctOf(val)
        return (
          <div key={item.key}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-700">{item.label}</span>
              <div className="flex items-center gap-3">
                {showIc && (
                  <span className="text-xs text-gray-400">
                    → {(showIc[item.key] * val).toFixed(1)} kg/m²
                  </span>
                )}
                <span className="text-sm font-bold text-ingerop-blue w-10 text-right">{pct}%</span>
              </div>
            </div>
            <input
              type="range" min={0} max={100} step={1} value={pct}
              onChange={e => handleChange(item.key, parseInt(e.target.value) / 100)}
              className="w-full h-2.5 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, ${item.color ?? '#003A7A'} 0%, ${item.color ?? '#003A7A'} ${pct}%, #E5E7EB ${pct}%, #E5E7EB 100%)`,
                accentColor: item.color ?? '#003A7A',
              }}
            />
          </div>
        )
      })}
      <div className={`text-xs text-right font-medium mt-1 ${total === 100 ? 'text-gray-400' : 'text-orange-500 font-bold'}`}>
        Total : {total}% {total === 100 ? '✓' : '⚠'}
      </div>
    </div>
  )
}
