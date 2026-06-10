import { ApportsParams, ApportsResult } from '../engine/calcApports'

interface Props {
  params: ApportsParams
  result: ApportsResult
  onChange: (p: ApportsParams) => void
}

function Row({ label, value, unit = 'kW', highlight = false }: {
  label: string; value: number | string; unit?: string; highlight?: boolean
}) {
  return (
    <tr className={`border-b border-gray-100 ${highlight ? 'bg-ingerop-blue/5 font-bold' : ''}`}>
      <td className="py-2 pr-4 text-gray-700 text-sm">{label}</td>
      <td className={`py-2 text-right font-mono text-sm ${highlight ? 'text-ingerop-blue font-bold' : 'text-gray-800'}`}>
        {typeof value === 'number' ? value.toLocaleString('fr-FR', { maximumFractionDigits: 4 }) : value}
      </td>
      <td className="py-2 pl-2 text-xs text-gray-400">{unit}</td>
    </tr>
  )
}

function InputRow({ label, value, min, max, step = 1, unit = '', onChange }: {
  label: string; value: number; min: number; max: number; step?: number; unit?: string
  onChange: (v: number) => void
}) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-100">
      <span className="text-sm text-gray-700">{label}</span>
      <div className="flex items-center gap-2">
        <input
          type="number" value={value} min={min} max={max} step={step}
          onChange={e => onChange(parseFloat(e.target.value) || 0)}
          className="w-28 text-right border border-gray-300 rounded-lg px-2 py-1 text-sm font-mono focus:ring-2 focus:ring-ingerop-blue focus:outline-none"
        />
        <span className="text-xs text-gray-400 w-8">{unit}</span>
      </div>
    </div>
  )
}


export default function ApportsDep({ params: p, result: r, onChange }: Props) {
  const set = (key: keyof ApportsParams, val: number | null) =>
    onChange({ ...p, [key]: val })

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      {/* Paramètres de base */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <h2 className="text-xs font-bold uppercase tracking-wider text-ingerop-blue mb-4">Paramètres de base</h2>
        <InputRow label="Tamb — Température intérieure" value={p.tamb} min={18} max={30} unit="°C" onChange={v => set('tamb', v)} />
        <InputRow label="Text — Température extérieure" value={p.text} min={25} max={45} unit="°C" onChange={v => set('text', v)} />
        <InputRow label="Surface utile" value={p.surfaceUtile} min={100} max={100000} step={100} unit="m²" onChange={v => set('surfaceUtile', v)} />
      </div>

      {/* Calcul des puissances */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <h2 className="text-xs font-bold uppercase tracking-wider text-ingerop-blue mb-4">Calcul des puissances</h2>
        <table className="w-full">
          <tbody>
            <Row label="Puissances estimées" value={r.puissanceEstimee} highlight />
          </tbody>
        </table>

        <div className="mt-4 border-t border-gray-100 pt-4">
          {/* VDI — choix ratio ou valeur connue */}
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-sm text-gray-700">Part locaux élec/VDI</span>
            <div className="flex items-center gap-2">
              <input
                type="number" value={Math.round(p.ratioVDI * 100)} min={0} max={100} step={5}
                onChange={e => set('ratioVDI', (parseFloat(e.target.value) || 0) / 100)}
                disabled={p.puissanceVDIManuelle !== null}
                className="w-20 text-right border border-gray-300 rounded-lg px-2 py-1 text-sm font-mono disabled:opacity-40"
              />
              <span className="text-xs text-gray-400">%</span>
            </div>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">Puissance VDI (valeur connue)</span>
              <input
                type="checkbox"
                checked={p.puissanceVDIManuelle !== null}
                onChange={e => set('puissanceVDIManuelle', e.target.checked ? r.puissanceVDI : null)}
                className="accent-ingerop-blue"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number" value={p.puissanceVDIManuelle ?? r.puissanceVDI} min={0} max={9999} step={1}
                disabled={p.puissanceVDIManuelle === null}
                onChange={e => set('puissanceVDIManuelle', parseFloat(e.target.value) || 0)}
                className="w-28 text-right border border-gray-300 rounded-lg px-2 py-1 text-sm font-mono disabled:opacity-40"
              />
              <span className="text-xs text-gray-400">kW</span>
            </div>
          </div>

          <InputRow label="Puissance ECS" value={p.puissanceECS} min={0} max={500} step={5} unit="kW" onChange={v => set('puissanceECS', v)} />
        </div>

        <table className="w-full mt-4">
          <tbody>
            <Row label="Puissances totales" value={r.puissanceTotale} />
            <Row label="Foisonnement" value={p.foisonnement} unit="" />
            <Row label="Puissances après foisonnement" value={r.puissanceApresF} highlight />
            <Row label="Taux surpuissance" value={p.surpuissance} unit="kW" />
            <Row label="Puissances totales finales" value={r.puissanceFinale} highlight />
          </tbody>
        </table>

        <div className="mt-3 flex items-center gap-3">
          <span className="text-sm text-gray-600">Foisonnement</span>
          <input type="range" min={0.5} max={1} step={0.05} value={p.foisonnement}
            onChange={e => set('foisonnement', parseFloat(e.target.value))}
            className="flex-1 accent-ingerop-blue" />
          <span className="text-sm font-mono text-ingerop-blue w-8">{p.foisonnement}</span>
        </div>
        <div className="mt-2 flex items-center gap-3">
          <span className="text-sm text-gray-600">Taux surpuissance</span>
          <input type="number" value={p.surpuissance} min={0} max={500} step={5}
            onChange={e => set('surpuissance', parseFloat(e.target.value) || 0)}
            className="w-28 ml-auto border border-gray-300 rounded-lg px-2 py-1 text-sm font-mono" />
          <span className="text-xs text-gray-400">kW</span>
        </div>
      </div>

    </div>
  )
}
