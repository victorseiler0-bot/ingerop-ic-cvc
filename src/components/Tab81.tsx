import LockedRatioGroup from './LockedRatioGroup'
import { CVCParams, CVCResult, IC_8_1 } from '../engine/calcCVC'

interface Props { params: CVCParams; result: CVCResult; onChange: (p: CVCParams) => void }

function IcBadge({ label, value, highlight }: { label: string; value: number; highlight?: boolean }) {
  return (
    <div className={`flex justify-between items-center py-2 px-3 rounded-lg ${highlight ? 'bg-ingerop-blue/10' : 'bg-gray-50'}`}>
      <span className="text-sm text-gray-700">{label}</span>
      <span className={`font-mono font-bold text-sm ${highlight ? 'text-ingerop-blue' : 'text-gray-600'}`}>
        {value.toFixed(1)} <span className="text-xs font-normal">kgCO₂/m²</span>
      </span>
    </div>
  )
}

export default function Tab81({ params: p, result: r, onChange }: Props) {
  return (
    <div className="max-w-2xl mx-auto space-y-5">

      {/* Note */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-700">
        ⚠ Les Ic de production (8.1) ne sont pas dans l'Excel source — pas de FDES par kW installé disponibles.
        Les valeurs ci-dessous sont des <strong>estimations RE2020</strong> basées sur les FDES typiques.
      </div>

      <div className="grid grid-cols-2 gap-5">
        {/* Chauffage */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <h2 className="text-xs font-bold uppercase tracking-wider text-ingerop-blue mb-4">
            Production chauffage
          </h2>
          <LockedRatioGroup
            items={[
              { key: 'pac',       label: 'PAC',               color: '#003A7A' },
              { key: 'reseau',    label: 'Réseau chaleur urb.', color: '#0066CC' },
              { key: 'chaudiere', label: 'Chaudière gaz',       color: '#6B9FD4' },
            ]}
            values={p.chaud}
            onChange={vals => onChange({ ...p, chaud: vals as CVCParams['chaud'] })}
            showIc={IC_8_1.chaud}
          />
          <div className="mt-4 space-y-1.5">
            <IcBadge label="PAC"               value={IC_8_1.chaud.pac      * p.chaud.pac} />
            <IcBadge label="Réseau chaleur"    value={IC_8_1.chaud.reseau   * p.chaud.reseau} />
            <IcBadge label="Chaudière"         value={IC_8_1.chaud.chaudiere * p.chaud.chaudiere} />
            <IcBadge label="Total chauffage"   value={r.lot81_chaud} highlight />
          </div>
        </div>

        {/* Froid */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <h2 className="text-xs font-bold uppercase tracking-wider text-ingerop-blue mb-4">
            Production froid
          </h2>
          <LockedRatioGroup
            items={[
              { key: 'groupe', label: 'Groupe froid',     color: '#003A7A' },
              { key: 'reseau', label: 'Réseau froid urb.', color: '#0066CC' },
            ]}
            values={p.froid}
            onChange={vals => onChange({ ...p, froid: vals as CVCParams['froid'] })}
            showIc={IC_8_1.froid}
          />
          <div className="mt-4 space-y-1.5">
            <IcBadge label="Groupe froid"  value={IC_8_1.froid.groupe * p.froid.groupe} />
            <IcBadge label="Réseau froid"  value={IC_8_1.froid.reseau * p.froid.reseau} />
            <IcBadge label="Total froid"   value={r.lot81_froid} highlight />
          </div>
        </div>
      </div>

      {/* Ic de référence */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
          Ic de référence (100% de couverture, 9000 m²SU)
        </h3>
        <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs text-gray-500">
          {Object.entries(IC_8_1.chaud).map(([k, v]) => (
            <div key={k} className="flex justify-between border-b border-gray-50 py-1">
              <span className="capitalize">{k}</span>
              <span className="font-mono">{v} kgCO₂/m²</span>
            </div>
          ))}
          {Object.entries(IC_8_1.froid).map(([k, v]) => (
            <div key={k} className="flex justify-between border-b border-gray-50 py-1">
              <span className="capitalize">{k}</span>
              <span className="font-mono">{v} kgCO₂/m²</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
