import { CVCParams, CVCResult } from '../engine/calcCVC'

interface Props { params: CVCParams; result: CVCResult; onChange: (p: CVCParams) => void }

function NumInput({ label, value, min, max, step = 0.1, unit, onChange }: {
  label: string; value: number; min: number; max: number; step?: number; unit: string
  onChange: (v: number) => void
}) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-gray-100">
      <span className="text-sm text-gray-700">{label}</span>
      <div className="flex items-center gap-2">
        <input type="number" value={value} min={min} max={max} step={step}
          onChange={e => onChange(parseFloat(e.target.value) || 0)}
          className="w-24 text-right border border-gray-200 rounded-lg px-2 py-1 text-sm font-mono text-ingerop-blue focus:ring-2 focus:ring-ingerop-blue focus:outline-none" />
        <span className="text-xs text-gray-400 w-10">{unit}</span>
      </div>
    </div>
  )
}

export default function Tab83({ params: p, result: r, onChange }: Props) {
  const pct = Math.round(p.ratioPlafond * 100)
  const pctVCV = 100 - pct

  return (
    <div className="max-w-2xl mx-auto space-y-5">

      {/* Curseur principal */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <h2 className="text-xs font-bold uppercase tracking-wider text-ingerop-blue mb-5">
          Répartition des émetteurs
        </h2>

        {/* Slider plafond / VCV */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-gray-700">Plafonds actifs</span>
            <span className="font-bold text-ingerop-blue">{pct}%</span>
          </div>
          <input type="range" min={0} max={1} step={0.05} value={p.ratioPlafond}
            onChange={e => onChange({ ...p, ratioPlafond: parseFloat(e.target.value) })}
            className="w-full h-3 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #003A7A 0%, #003A7A ${pct}%, #0066CC ${pct}%, #0066CC 100%)`,
            }}
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>0% plafonds → 100% VCV</span>
            <span className="font-medium text-blue-600">VCV : {pctVCV}%</span>
          </div>
        </div>

        {/* Résultat visuel répartition */}
        <div className="flex rounded-lg overflow-hidden h-8 mt-4">
          <div
            className="flex items-center justify-center text-white text-xs font-bold transition-all"
            style={{ width: `${pct}%`, backgroundColor: '#003A7A', minWidth: pct > 5 ? undefined : 0 }}>
            {pct > 10 ? `Plafond ${pct}%` : ''}
          </div>
          <div
            className="flex items-center justify-center text-white text-xs font-bold transition-all"
            style={{ width: `${pctVCV}%`, backgroundColor: '#0066CC', minWidth: pctVCV > 5 ? undefined : 0 }}>
            {pctVCV > 10 ? `VCV ${pctVCV}%` : ''}
          </div>
        </div>
      </div>

      {/* Paramètres plafond actif */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
        <h2 className="text-xs font-bold uppercase tracking-wider text-ingerop-blue mb-4">
          Ic plafond actif (référence)
        </h2>
        <p className="text-xs text-gray-400 mb-3">
          Valeur par défaut = BARCOLAIR A11 ilôt Acier 100mm — onglet 12 Excel
        </p>
        <NumInput label="Ic plafond actif" value={p.icPlafondRef} min={5} max={40} unit="kgCO₂/m²SU"
          onChange={v => onChange({ ...p, icPlafondRef: v })} />
        <NumInput label="Ic VCV (100% VCV)" value={p.icVCVRef} min={1} max={20} unit="kgCO₂/m²SU"
          onChange={v => onChange({ ...p, icVCVRef: v })} />
      </div>

      {/* Résultats */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Résultats 8.3</h3>
        <div className="space-y-2">
          {[
            { label: 'Plafonds actifs', val: r.lot83_plafond, pct: pct },
            { label: 'VCV',             val: r.lot83_vcv,     pct: pctVCV },
          ].map((row, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-32 text-sm text-gray-600">{row.label}</div>
              <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                <div className="h-2 rounded-full bg-ingerop-blue transition-all"
                  style={{ width: `${Math.min(100, row.val / 25 * 100)}%` }} />
              </div>
              <div className="text-sm font-mono font-bold text-ingerop-blue w-16 text-right">
                {row.val}
              </div>
              <div className="text-xs text-gray-400 w-16">kgCO₂/m²</div>
            </div>
          ))}
          <div className="flex justify-between pt-2 border-t border-gray-100 font-bold">
            <span className="text-gray-800">Total 8.3</span>
            <span className="text-ingerop-blue font-mono">{r.lot83} kgCO₂/m²SU</span>
          </div>
        </div>
      </div>
    </div>
  )
}
