import { useState } from 'react'
import ApportsDep from './components/ApportsDep'
import Tab81 from './components/Tab81'
import Tab83 from './components/Tab83'
import Tab84 from './components/Tab84'
import Tab85 from './components/Tab85'
import TabResultats from './components/TabResultats'
import { calculerIcCVC, CVCParams } from './engine/calcCVC'
import { calculerApports, ApportsParams } from './engine/calcApports'
import { DEFAULT_CVC, DEFAULT_APPORTS } from './data/defaultValues'

type Tab = 'apports' | '81' | '83' | '84' | '85' | 'resultats'

const TABS: { id: Tab; label: string }[] = [
  { id: 'apports',   label: 'Apports-Déperditions' },
  { id: '81',        label: '8.1 Production' },
  { id: '83',        label: '8.3 Émission' },
  { id: '84',        label: '8.4 CTA' },
  { id: '85',        label: '8.5 Réseaux' },
  { id: 'resultats', label: 'Résultats' },
]

export default function App() {
  const [tab, setTab]       = useState<Tab>('apports')
  const [cvc, setCvc]       = useState<CVCParams>(DEFAULT_CVC)
  const [apports, setApports] = useState<ApportsParams>(DEFAULT_APPORTS)

  const result        = calculerIcCVC(cvc)
  const apportsResult = calculerApports(apports)

  const handleApportsChange = (p: ApportsParams) => {
    setApports(p)
    if (p.surfaceUtile !== cvc.surfaceUtile) setCvc(prev => ({ ...prev, surfaceUtile: p.surfaceUtile }))
  }
  const handleCvcChange = (p: CVCParams) => {
    setCvc(p)
    if (p.surfaceUtile !== apports.surfaceUtile) setApports(prev => ({ ...prev, surfaceUtile: p.surfaceUtile }))
  }

  const handleReset = () => {
    setCvc(DEFAULT_CVC)
    setApports(DEFAULT_APPORTS)
  }

  const gaugeColor = result.total < 60 ? '#16a34a' : result.total < 120 ? '#f97316' : '#dc2626'

  return (
    <div className="min-h-screen bg-ingerop-gray font-sans flex flex-col">

      {/* Header */}
      <header className="bg-ingerop-blue text-white px-4 py-2.5 flex items-center justify-between shadow-md flex-shrink-0 gap-3">
        <div className="min-w-0">
          <div className="text-xs font-semibold tracking-widest opacity-60 uppercase">INGEROP</div>
          <h1 className="text-sm font-bold leading-tight">Calculateur Indice Carbone CVC — RE2020</h1>
        </div>

        {/* Type de bâtiment */}
        <div className="hidden md:flex items-center gap-1.5 bg-white/10 rounded-xl px-3 py-1.5">
          <span className="text-xs opacity-70 whitespace-nowrap">Bâtiment :</span>
          <button
            onClick={() => handleCvcChange({ ...cvc, typeBatiment: 'bureaux' })}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${cvc.typeBatiment === 'bureaux' ? 'bg-white text-ingerop-blue' : 'opacity-60 hover:opacity-90'}`}>
            Bureaux
          </button>
          <button
            onClick={() => handleCvcChange({ ...cvc, typeBatiment: 'autre' })}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${cvc.typeBatiment === 'autre' ? 'bg-white text-ingerop-blue' : 'opacity-60 hover:opacity-90'}`}>
            Autre
          </button>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="text-right text-xs hidden sm:block">
            <span className="opacity-60">SU : </span>
            <span className="font-bold">{cvc.surfaceUtile.toLocaleString('fr-FR')} m²</span>
          </div>

          {/* Bouton reset */}
          <button
            onClick={handleReset}
            title="Réinitialiser aux valeurs par défaut"
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white/15 hover:bg-white/25 transition-colors border border-white/20">
            Réinitialiser
          </button>

          {/* Badge Ic total */}
          <button
            onClick={() => setTab('resultats')}
            className="px-3 py-1.5 rounded-full text-xs font-bold transition-colors text-white border-2"
            style={{ borderColor: gaugeColor, backgroundColor: gaugeColor + '33' }}>
            Ic CVC : {result.total} kgCO₂/m²SU
            {result.total < 60 ? ' ✓' : result.total < 120 ? ' !' : ' ⚠'}
          </button>
        </div>
      </header>

      {/* Tabs */}
      <nav className="bg-white border-b border-gray-200 flex-shrink-0 overflow-x-auto">
        <div className="flex px-4 min-w-max">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                tab === t.id
                  ? 'border-ingerop-blue text-ingerop-blue'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}>
              {t.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-5 md:p-6">
          {tab === 'apports'   && <ApportsDep params={apports} result={apportsResult} onChange={handleApportsChange} />}
          {tab === '81'        && <Tab81 params={cvc} result={result} onChange={handleCvcChange} />}
          {tab === '83'        && <Tab83 params={cvc} result={result} onChange={handleCvcChange} />}
          {tab === '84'        && <Tab84 params={cvc} result={result} onChange={handleCvcChange} />}
          {tab === '85'        && <Tab85 params={cvc} result={result} onChange={handleCvcChange} />}
          {tab === 'resultats' && <TabResultats result={result} />}
        </div>
      </main>

      <footer className="flex-shrink-0 text-center py-2 text-xs text-gray-400 bg-white border-t border-gray-100">
        v7
      </footer>
    </div>
  )
}
