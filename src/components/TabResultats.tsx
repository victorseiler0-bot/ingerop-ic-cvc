import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { CVCResult } from '../engine/calcCVC'

interface Props { result: CVCResult }

const COLORS: Record<string, string> = {
  '8.1 Chaud':   '#1E3A5F',
  '8.1 Froid':   '#2563EB',
  '8.3 Plafond': '#0891B2',
  '8.3 VCV':     '#06B6D4',
  '8.4 CTA':     '#7C3AED',
  '8.5 Gaines':  '#059669',
  '8.5 Tuyaux':  '#10B981',
}

const SEUIL_ORANGE = 60
const SEUIL_ROUGE  = 120
const MAX_GAUGE    = 200

function gaugeColor(total: number) {
  if (total < SEUIL_ORANGE) return '#16a34a'
  if (total < SEUIL_ROUGE)  return '#f97316'
  return '#dc2626'
}

function gaugeZone(total: number): { text: string; cls: string } {
  if (total < SEUIL_ORANGE) return { text: 'Ic CVC faible', cls: 'bg-green-100 text-green-700' }
  if (total < SEUIL_ROUGE)  return { text: 'Ic CVC moyen', cls: 'bg-orange-100 text-orange-700' }
  return { text: 'Ic CVC élevé', cls: 'bg-red-100 text-red-700' }
}

export default function TabResultats({ result: r }: Props) {
  const bars = [
    { name: '8.1 Chaud',   value: r.lot81_chaud },
    { name: '8.1 Froid',   value: r.lot81_froid },
    { name: '8.3 Plafond', value: r.lot83_plafond },
    { name: '8.3 VCV',     value: r.lot83_vcv },
    { name: '8.4 CTA',     value: r.lot84 },
    { name: '8.5 Gaines',  value: r.lot85_gaineRect + r.lot85_gaineCirc },
    { name: '8.5 Tuyaux',  value: r.lot85_tuyauT1 + r.lot85_tuyauT10 },
  ]

  const rows = [
    { label: '8.1 — Production chauffage', val: r.lot81_chaud },
    { label: '8.1 — Production froid',     val: r.lot81_froid },
    { label: '8.1 TOTAL',                  val: r.lot81, bold: true },
    { label: '8.3 — Plafonds actifs',      val: r.lot83_plafond },
    { label: '8.3 — VCV',                  val: r.lot83_vcv },
    { label: '8.3 TOTAL',                  val: r.lot83, bold: true },
    { label: '8.4 TOTAL — CTA',            val: r.lot84, bold: true },
    { label: '8.5 — Gaines rect.',         val: r.lot85_gaineRect },
    { label: '8.5 — Gaines circ.',         val: r.lot85_gaineCirc },
    { label: '8.5 — Tuyaux acier T1',      val: r.lot85_tuyauT1 },
    { label: '8.5 — Tuyaux acier T10',     val: r.lot85_tuyauT10 },
    { label: '8.5 TOTAL',                  val: r.lot85, bold: true },
  ]

  const pct       = Math.min(100, Math.round(r.total / MAX_GAUGE * 100))
  const pctOrange = Math.round(SEUIL_ORANGE / MAX_GAUGE * 100)
  const pctRouge  = Math.round(SEUIL_ROUGE  / MAX_GAUGE * 100)
  const zone      = gaugeZone(r.total)
  const color     = gaugeColor(r.total)

  return (
    <div className="max-w-3xl mx-auto space-y-5">

      {/* Jauge principale */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500">
            Ic Construction CVC Total
          </h2>
          <div className={`px-4 py-1.5 rounded-full text-sm font-bold ${zone.cls}`}>
            {zone.text}
          </div>
        </div>

        <div className="flex items-end gap-4 mb-5">
          <div className="font-bold leading-none" style={{ fontSize: '3.5rem', color }}>{r.total}</div>
          <div className="text-sm text-gray-500 pb-1">kgCO₂eq/m²SU</div>
        </div>

        {/* Barre 3 zones */}
        <div>
          <div className="relative h-6 rounded-full overflow-hidden flex">
            <div style={{ width: `${pctOrange}%`, background: '#dcfce7' }} />
            <div style={{ width: `${pctRouge - pctOrange}%`, background: '#ffedd5' }} />
            <div style={{ flex: 1, background: '#fee2e2' }} />
            <div className="absolute top-0 left-0 h-full rounded-full transition-all"
              style={{ width: `${pct}%`, backgroundColor: color, opacity: 0.75 }} />
            <div className="absolute top-0 bottom-0 w-0.5 bg-green-600/60"
              style={{ left: `${pctOrange}%` }} />
            <div className="absolute top-0 bottom-0 w-0.5 bg-red-500/60"
              style={{ left: `${pctRouge}%` }} />
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-1 relative">
            <span>0</span>
            <span style={{ position: 'absolute', left: `${pctOrange}%`, transform: 'translateX(-50%)' }} className="text-green-700 font-medium">{SEUIL_ORANGE}</span>
            <span style={{ position: 'absolute', left: `${pctRouge}%`, transform: 'translateX(-50%)' }} className="text-red-600 font-medium">{SEUIL_ROUGE}</span>
            <span>{MAX_GAUGE}</span>
          </div>
        </div>
      </div>

      {/* Bar chart */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">
          Décomposition par composant
        </h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={bars} margin={{ top: 0, right: 10, left: -15, bottom: 30 }}>
            <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#6B7280' }} angle={-35} textAnchor="end" />
            <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} />
            <Tooltip formatter={(v: number) => [`${v} kgCO₂/m²SU`, '']}
              contentStyle={{ fontSize: 12, borderRadius: 8 }} />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {bars.map(b => <Cell key={b.name} fill={COLORS[b.name] ?? '#003A7A'} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tableau détaillé */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-5 py-3 text-gray-500 font-medium">Sous-lot</th>
              <th className="text-right px-5 py-3 text-gray-500 font-medium">kgCO₂eq/m²SU</th>
              <th className="text-right px-5 py-3 text-gray-500 font-medium">%</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className={`border-b border-gray-50 ${row.bold ? 'bg-ingerop-gray' : 'hover:bg-gray-50'}`}>
                <td className={`px-5 py-2.5 ${row.bold ? 'font-bold text-gray-800' : 'text-gray-600 pl-8'}`}>
                  {row.label}
                </td>
                <td className={`px-5 py-2.5 text-right font-mono ${row.bold ? 'font-bold text-ingerop-blue text-base' : 'text-gray-700'}`}>
                  {row.val}
                </td>
                <td className="px-5 py-2.5 text-right text-gray-400">
                  {r.total > 0 ? Math.round(row.val / r.total * 100) : 0}%
                </td>
              </tr>
            ))}
            <tr className="bg-ingerop-blue text-white">
              <td className="px-5 py-3 font-bold text-base">TOTAL LOT 8 CVC</td>
              <td className="px-5 py-3 text-right font-mono font-bold text-xl">{r.total}</td>
              <td className="px-5 py-3 text-right opacity-70">100%</td>
            </tr>
          </tbody>
        </table>
        {r.lot84_detail.length > 0 && (
          <div className="border-t border-gray-100 px-5 py-3">
            <div className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Détail CTA</div>
            <div className="grid grid-cols-2 gap-1">
              {r.lot84_detail.map((d, i) => (
                <div key={i} className="flex justify-between text-xs text-gray-500 py-0.5">
                  <span>{d.nom} × {d.quantite}</span>
                  <span className="font-mono">{d.ic.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
