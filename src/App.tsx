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
  const [tab, setTab] = useState<Tab>('apports')
  const [cvc, setCvc] = useState<CVCParams>(DEFAULT_CVC)
  const [apports, setApports] = useState<ApportsParams>(DEFAULT_APPORTS)

  const result = calculerIcCVC(cvc)
  const apportsResult = calculerApports(apports)

  const handleApportsChange = (p: ApportsParams) => {
    setApports(p)
    if (p.surfaceUtile !== cvc.surfaceUtile) {
      setCvc(prev => ({ ...prev, surfaceUtile: p.surfaceUtile }))
    }
  }
  const handleCvcChange = (p: CVCParams) => {
    setCvc(p)
    if (p.surfaceUtile !== apports.surfaceUtile) {
      setApports(prev => ({ ...prev, surfaceUtile: p.surfaceUtile }))
    }
  }

  return (
    <div className="min-h-screen bg-ingerop-gray font-sans flex flex-col">

      {/* Header */}
      <header className="bg-ingerop-blue text-white px-6 py-3 flex items-center justify-between shadow-md flex-shrink-0">
        <div>
          <div className="text-xs font-semibold tracking-widest opacity-60 uppercase">INGEROP</div>
          <h1 className="text-base font-bold leading-tight">Calculateur Indice Carbone CVC — RE2020</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right text-sm hidden sm:block">
            <span className="opacity-60">Surface : </span>
            <span className="font-bold">{cvc.surfaceUtile.toLocaleString('fr-FR')} m²SU</span>
          </div>
          <button
            onClick={() => setTab('resultats')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
              result.conforme
                ? 'bg-green-400 text-green-900 hover:bg-green-300'
                : 'bg-orange-400 text-orange-900 hover:bg-orange-300'
            }`}>
            Ic CVC : {result.total} kgCO₂/m²SU
            {result.conforme ? ' ✓' : ' ⚠'}
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
          {tab === 'apports' && (
            <ApportsDep params={apports} result={apportsResult} onChange={handleApportsChange} />
          )}
          {tab === '81' && (
            <Tab81 params={cvc} result={result} onChange={handleCvcChange} />
          )}
          {tab === '83' && (
            <Tab83 params={cvc} result={result} onChange={handleCvcChange} />
          )}
          {tab === '84' && (
            <Tab84 params={cvc} result={result} onChange={handleCvcChange} />
          )}
          {tab === '85' && (
            <Tab85 params={cvc} result={result} onChange={handleCvcChange} />
          )}
          {tab === 'resultats' && (
            <TabResultats result={result} />
          )}
        </div>
      </main>

      {/* Footer version */}
      <footer className="flex-shrink-0 text-center py-2 text-xs text-gray-400 bg-white border-t border-gray-100">
        v3
      </footer>
    </div>
  )
}
