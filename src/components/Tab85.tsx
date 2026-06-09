import { CVCParams, CVCResult } from '../engine/calcCVC'

interface Props { params: CVCParams; result: CVCResult; onChange: (p: CVCParams) => void }

function ResRow({ label, value, ic, max, onChange, unit }: {
  label: string; value: number; ic: number; max: number; unit: string
  onChange: (v: number) => void
}) {
  return (
    <div className="py-4 border-b border-gray-100 last:border-0">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400">→ <strong className="text-ingerop-blue">{ic.toFixed(1)}</strong> kgCO₂/m²</span>
          <input type="number" value={value} min={0} max={max * 2} step={100}
            onChange={e => onChange(parseFloat(e.target.value) || 0)}
            className="w-24 text-right border border-gray-200 rounded-lg px-2 py-1 text-sm font-mono text-ingerop-blue focus:ring-2 focus:ring-ingerop-blue focus:outline-none" />
          <span className="text-xs text-gray-400 w-4">{unit}</span>
        </div>
      </div>
      <input type="range" min={0} max={max} step={Math.round(max / 100)}
        value={Math.min(value, max)} onChange={e => onChange(parseFloat(e.target.value))}
        className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-ingerop-blue"
        style={{
          background: `linear-gradient(to right, #003A7A 0%, #003A7A ${Math.min(100, value / max * 100)}%, #E5E7EB ${Math.min(100, value / max * 100)}%, #E5E7EB 100%)`
        }} />
      <div className="flex justify-between text-xs text-gray-300 mt-0.5">
        <span>0</span>
        <span>{max.toLocaleString('fr-FR')} {unit} (max)</span>
      </div>
    </div>
  )
}

export default function Tab85({ params: p, result: r, onChange }: Props) {
  const set = <K extends keyof CVCParams>(key: K, val: CVCParams[K]) =>
    onChange({ ...p, [key]: val })

  return (
    <div className="max-w-2xl mx-auto space-y-5">

      {/* Gaines */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <h2 className="text-xs font-bold uppercase tracking-wider text-ingerop-blue mb-1">
          Conduits et gaines aérauliques
        </h2>
        <p className="text-xs text-gray-400 mb-4">
          Ic : gaines rect. 9.62 kgCO₂/kg · gaines circ. 3.37 kgCO₂/m — onglet 19 Excel
        </p>
        <ResRow label="Gaines rectangulaires" value={p.gaineRectPoids} ic={r.lot85_gaineRect}
          max={150000} unit="kg" onChange={v => set('gaineRectPoids', v)} />
        <ResRow label="Gaines circulaires" value={p.gaineCircLongueur} ic={r.lot85_gaineCirc}
          max={3000} unit="m" onChange={v => set('gaineCircLongueur', v)} />
      </div>

      {/* Tuyauteries */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <h2 className="text-xs font-bold uppercase tracking-wider text-ingerop-blue mb-1">
          Tuyauteries acier noir
        </h2>
        <p className="text-xs text-gray-400 mb-4">
          Ic : Tarif 1 (DN15–65) 14.9 kgCO₂/m · Tarif 10 (DN65–300) 17.4 kgCO₂/m — onglet 20 Excel
        </p>
        <ResRow label="Acier noir — Tarif 1 (DN15–65)" value={p.tuyauT1Longueur} ic={r.lot85_tuyauT1}
          max={5000} unit="m" onChange={v => set('tuyauT1Longueur', v)} />
        <ResRow label="Acier noir — Tarif 10 (DN65–300)" value={p.tuyauT10Longueur} ic={r.lot85_tuyauT10}
          max={2000} unit="m" onChange={v => set('tuyauT10Longueur', v)} />
      </div>

      {/* Total 8.5 */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Total 8.5</h3>
        {[
          { label: 'Gaines rectangulaires', val: r.lot85_gaineRect },
          { label: 'Gaines circulaires',    val: r.lot85_gaineCirc },
          { label: 'Tuyaux acier T1',        val: r.lot85_tuyauT1 },
          { label: 'Tuyaux acier T10',       val: r.lot85_tuyauT10 },
        ].map((row, i) => (
          <div key={i} className="flex items-center gap-3 py-1.5 border-b border-gray-50">
            <span className="text-sm text-gray-600 flex-1">{row.label}</span>
            <div className="w-32 bg-gray-100 rounded-full h-1.5 overflow-hidden">
              <div className="h-1.5 bg-ingerop-blue rounded-full"
                style={{ width: `${Math.min(100, row.val / 70 * 100)}%` }} />
            </div>
            <span className="text-sm font-mono font-bold text-ingerop-blue w-12 text-right">
              {row.val}
            </span>
          </div>
        ))}
        <div className="flex justify-between pt-3 font-bold">
          <span className="text-gray-800">TOTAL 8.5</span>
          <span className="text-ingerop-blue font-mono text-lg">{r.lot85} kgCO₂/m²SU</span>
        </div>
      </div>
    </div>
  )
}
