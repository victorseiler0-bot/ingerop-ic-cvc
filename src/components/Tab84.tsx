import { CVCParams, CVCResult, CTA_CATALOGUE, CTAModelId } from '../engine/calcCVC'

interface Props { params: CVCParams; result: CVCResult; onChange: (p: CVCParams) => void }

export default function Tab84({ params: p, result: r, onChange }: Props) {
  const setQte = (modelId: CTAModelId, qte: number) => {
    const exists = p.ctaLignes.find(l => l.modelId === modelId)
    let lignes = qte === 0
      ? p.ctaLignes.filter(l => l.modelId !== modelId)
      : exists
        ? p.ctaLignes.map(l => l.modelId === modelId ? { ...l, quantite: qte } : l)
        : [...p.ctaLignes, { modelId, quantite: qte }]
    onChange({ ...p, ctaLignes: lignes })
  }

  const totalUnites = p.ctaLignes.reduce((s, l) => s + l.quantite, 0)

  return (
    <div className="max-w-2xl mx-auto space-y-5">

      {/* Table CTA */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-xs font-bold uppercase tracking-wider text-ingerop-blue">
            Catalogue CTA CARRIER 39CP
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Ic dynamiques sur 50 ans — onglet NDC Ic CTA Excel
          </p>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr className="text-xs text-gray-500 font-medium">
              <th className="text-left px-5 py-2.5">Modèle</th>
              <th className="text-center px-3 py-2.5">Type</th>
              <th className="text-center px-3 py-2.5">Éch.</th>
              <th className="text-right px-3 py-2.5">m³/h</th>
              <th className="text-right px-3 py-2.5">Ic/unité</th>
              <th className="text-center px-4 py-2.5">Qté</th>
              <th className="text-right px-5 py-2.5">Ic total</th>
            </tr>
          </thead>
          <tbody>
            {CTA_CATALOGUE.map(modele => {
              const ligne = p.ctaLignes.find(l => l.modelId === modele.id)
              const qte = ligne?.quantite ?? 0
              const icLigne = r.lot84_detail.find(d => d.nom === modele.nom)?.ic ?? 0
              return (
                <tr key={modele.id} className={`border-t border-gray-50 transition-colors ${qte > 0 ? 'bg-blue-50/30' : ''}`}>
                  <td className="px-5 py-3 text-sm font-medium text-gray-800">{modele.nom}</td>
                  <td className="px-3 py-3 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${modele.type === 'Modulaire' ? 'bg-blue-100 text-blue-700' : 'bg-violet-100 text-violet-700'}`}>
                      {modele.type}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-center text-xs text-gray-500">{modele.echangeur}</td>
                  <td className="px-3 py-3 text-right text-xs font-mono text-gray-600">
                    {modele.debit.toLocaleString('fr-FR')}
                  </td>
                  <td className="px-3 py-3 text-right text-xs font-mono text-gray-500">
                    {(modele.icParUnite / 1000).toFixed(1)} t
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button onClick={() => setQte(modele.id, Math.max(0, qte - 1))}
                        className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 text-sm font-bold hover:bg-gray-300 flex items-center justify-center leading-none">
                        −
                      </button>
                      <span className={`w-6 text-center font-bold text-sm ${qte > 0 ? 'text-ingerop-blue' : 'text-gray-400'}`}>
                        {qte}
                      </span>
                      <button onClick={() => setQte(modele.id, qte + 1)}
                        className="w-6 h-6 rounded-full bg-ingerop-blue text-white text-sm font-bold hover:bg-ingerop-lightblue flex items-center justify-center leading-none">
                        +
                      </button>
                    </div>
                  </td>
                  <td className={`px-5 py-3 text-right text-sm font-mono font-bold ${qte > 0 ? 'text-ingerop-blue' : 'text-gray-300'}`}>
                    {qte > 0 ? icLigne.toFixed(2) : '—'}
                  </td>
                </tr>
              )
            })}
          </tbody>
          <tfoot className="bg-ingerop-gray border-t-2 border-gray-200">
            <tr>
              <td colSpan={5} className="px-5 py-3 text-sm font-bold text-gray-700">
                Total — {totalUnites} unités
              </td>
              <td />
              <td className="px-5 py-3 text-right font-mono font-bold text-lg text-ingerop-blue">
                {r.lot84.toFixed(1)}
              </td>
            </tr>
            <tr>
              <td colSpan={6} className="px-5 pb-3 text-xs text-gray-400">kgCO₂eq/m²SU</td>
            </tr>
          </tfoot>
        </table>
      </div>

    </div>
  )
}
