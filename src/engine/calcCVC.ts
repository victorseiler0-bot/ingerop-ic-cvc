// ─── Catalogue CTA — anciens modèles (valeurs dynamiques 50 ans calibrées Excel) ─
const CTA_OLD = [
  { id: 'L600',  nom: '39CP L 600',   type: 'Modulaire', echangeur: 'Roue',   debit: 5800,  icParUnite: 22818.9 },
  { id: 'L450',  nom: '39CP L 450',   type: 'Modulaire', echangeur: 'Roue',   debit: 4100,  icParUnite: 18233.3 },
  { id: 'L300',  nom: '39CP L 300',   type: 'Modulaire', echangeur: 'Plaque', debit: 2800,  icParUnite: 17218.4 },
  { id: 'L150',  nom: '39CP L 150',   type: 'Modulaire', echangeur: 'Plaque', debit: 1500,  icParUnite: 14303.7 },
  { id: 'HC020', nom: '39CP X HC020', type: 'Compacte',  echangeur: 'Plaque', debit: 2000,  icParUnite: 10444.5 },
  { id: 'HR100', nom: '39CP X HR100', type: 'Compacte',  echangeur: 'Roue',   debit: 10000, icParUnite: 33297.0 },
] as const

// ─── Catalogue CTA — catalogue complet fabricant (icParUnite = Ic_fab × débit) ─
const CTA_NEW = [
  // 39CP X — Roue
  { id: 'XHR010M', nom: '39CP X HR010 Monobloc', type: 'Compacte', echangeur: 'Roue', debit: 1000,  icParUnite: 2528 },
  { id: 'XHR010B', nom: '39CP X HR010 Bibloc',   type: 'Compacte', echangeur: 'Roue', debit: 1000,  icParUnite: 2836 },
  { id: 'XHR020M', nom: '39CP X HR020 Monobloc', type: 'Compacte', echangeur: 'Roue', debit: 2000,  icParUnite: 2858 },
  { id: 'XHR020B', nom: '39CP X HR020 Bibloc',   type: 'Compacte', echangeur: 'Roue', debit: 2000,  icParUnite: 3838 },
  { id: 'XHR030M', nom: '39CP X HR030 Monobloc', type: 'Compacte', echangeur: 'Roue', debit: 3000,  icParUnite: 3783 },
  { id: 'XHR030B', nom: '39CP X HR030 Bibloc',   type: 'Compacte', echangeur: 'Roue', debit: 3000,  icParUnite: 4857 },
  { id: 'XHR040M', nom: '39CP X HR040 Monobloc', type: 'Compacte', echangeur: 'Roue', debit: 4000,  icParUnite: 4856 },
  { id: 'XHR040B', nom: '39CP X HR040 Bibloc',   type: 'Compacte', echangeur: 'Roue', debit: 4000,  icParUnite: 5844 },
  { id: 'XHR050M', nom: '39CP X HR050 Monobloc', type: 'Compacte', echangeur: 'Roue', debit: 5000,  icParUnite: 5040 },
  { id: 'XHR050B', nom: '39CP X HR050 Bibloc',   type: 'Compacte', echangeur: 'Roue', debit: 5000,  icParUnite: 6025 },
  { id: 'XHR060S', nom: '39CP X HR060 Bibloc S',  type: 'Compacte', echangeur: 'Roue', debit: 6000,  icParUnite: 6828 },
  { id: 'XHR060L', nom: '39CP X HR060 Bibloc L',  type: 'Compacte', echangeur: 'Roue', debit: 6000,  icParUnite: 8022 },
  { id: 'XHR075S', nom: '39CP X HR075 Bibloc S',  type: 'Compacte', echangeur: 'Roue', debit: 7500,  icParUnite: 7058 },
  { id: 'XHR075L', nom: '39CP X HR075 Bibloc L',  type: 'Compacte', echangeur: 'Roue', debit: 7500,  icParUnite: 8258 },
  { id: 'XHR100',  nom: '39CP X HR100',            type: 'Compacte', echangeur: 'Roue', debit: 10000, icParUnite: 10000 },
  { id: 'XHR150',  nom: '39CP X HR150',            type: 'Compacte', echangeur: 'Roue', debit: 15000, icParUnite: 12180 },
  { id: 'XHR180',  nom: '39CP X HR180',            type: 'Compacte', echangeur: 'Roue', debit: 18000, icParUnite: 14922 },
  { id: 'XHR230',  nom: '39CP X HR230',            type: 'Compacte', echangeur: 'Roue', debit: 23000, icParUnite: 16767 },
  // 39CP X — Plaque
  { id: 'XHC010M', nom: '39CP X HC010 Monobloc', type: 'Compacte', echangeur: 'Plaque', debit: 1000, icParUnite: 2571 },
  { id: 'XHC010B', nom: '39CP X HC010 Bibloc',   type: 'Compacte', echangeur: 'Plaque', debit: 1000, icParUnite: 3039 },
  { id: 'XHC020M', nom: '39CP X HC020 Monobloc', type: 'Compacte', echangeur: 'Plaque', debit: 2000, icParUnite: 3204 },
  { id: 'XHC020B', nom: '39CP X HC020 Bibloc',   type: 'Compacte', echangeur: 'Plaque', debit: 2000, icParUnite: 3790 },
  { id: 'XHC030M', nom: '39CP X HC030 Monobloc', type: 'Compacte', echangeur: 'Plaque', debit: 3000, icParUnite: 4260 },
  { id: 'XHC030B', nom: '39CP X HC030 Bibloc',   type: 'Compacte', echangeur: 'Plaque', debit: 3000, icParUnite: 5088 },
  { id: 'XHC040',  nom: '39CP X HC040',           type: 'Compacte', echangeur: 'Plaque', debit: 4000, icParUnite: 6624 },
  { id: 'XHC060',  nom: '39CP X HC060',           type: 'Compacte', echangeur: 'Plaque', debit: 6000, icParUnite: 8928 },
  { id: 'XHC070',  nom: '39CP X HC070',           type: 'Compacte', echangeur: 'Plaque', debit: 7000, icParUnite: 9079 },
  // 39CP L — Double Flux Roue
  { id: 'L150R',  nom: '39CP L 150 DF Roue',  type: 'Modulaire', echangeur: 'Roue', debit: 1500,  icParUnite: 3888  },
  { id: 'L450R',  nom: '39CP L 450 DF Roue',  type: 'Modulaire', echangeur: 'Roue', debit: 4100,  icParUnite: 5707  },
  { id: 'L600R',  nom: '39CP L 600 DF Roue',  type: 'Modulaire', echangeur: 'Roue', debit: 5800,  icParUnite: 7372  },
  { id: 'L750R',  nom: '39CP L 750 DF Roue',  type: 'Modulaire', echangeur: 'Roue', debit: 7700,  icParUnite: 9479  },
  { id: 'L1050R', nom: '39CP L 1050 DF Roue', type: 'Modulaire', echangeur: 'Roue', debit: 10000, icParUnite: 10190 },
  { id: 'L1350R', nom: '39CP L 1350 DF Roue', type: 'Modulaire', echangeur: 'Roue', debit: 11400, icParUnite: 11674 },
  { id: 'L1800R', nom: '39CP L 1800 DF Roue', type: 'Modulaire', echangeur: 'Roue', debit: 16400, icParUnite: 16449 },
  { id: 'L2100R', nom: '39CP L 2100 DF Roue', type: 'Modulaire', echangeur: 'Roue', debit: 19000, icParUnite: 17936 },
  // 39CP L — Double Flux Plaques
  { id: 'L150P',  nom: '39CP L 150 DF Plaques',  type: 'Modulaire', echangeur: 'Plaque', debit: 1500,  icParUnite: 4584  },
  { id: 'L300P',  nom: '39CP L 300 DF Plaques',  type: 'Modulaire', echangeur: 'Plaque', debit: 2800,  icParUnite: 6280  },
  { id: 'L450P',  nom: '39CP L 450 DF Plaques',  type: 'Modulaire', echangeur: 'Plaque', debit: 4100,  icParUnite: 7064  },
  { id: 'L600P',  nom: '39CP L 600 DF Plaques',  type: 'Modulaire', echangeur: 'Plaque', debit: 5800,  icParUnite: 10144 },
  { id: 'L750P',  nom: '39CP L 750 DF Plaques',  type: 'Modulaire', echangeur: 'Plaque', debit: 7700,  icParUnite: 12613 },
  { id: 'L1050P', nom: '39CP L 1050 DF Plaques', type: 'Modulaire', echangeur: 'Plaque', debit: 10000, icParUnite: 14600 },
  { id: 'L1350P', nom: '39CP L 1350 DF Plaques', type: 'Modulaire', echangeur: 'Plaque', debit: 11400, icParUnite: 15937 },
  { id: 'L1800P', nom: '39CP L 1800 DF Plaques', type: 'Modulaire', echangeur: 'Plaque', debit: 16400, icParUnite: 24108 },
  { id: 'L2100P', nom: '39CP L 2100 DF Plaques', type: 'Modulaire', echangeur: 'Plaque', debit: 19000, icParUnite: 26182 },
] as const

export const CTA_CATALOGUE = [...CTA_OLD, ...CTA_NEW] as const
export type CTAModelId = typeof CTA_CATALOGUE[number]['id']

export interface CTALigne { modelId: CTAModelId; quantite: number }

export type CTAMode = 'carrier' | 'libre'
export interface CTALibre {
  fabricant: string
  modele: string
  debit: number
  quantite: number
  kgCO2Total: number
}

// ─── Catalogue plafonds actifs ──────────────────────────────────────────────
export const PLAFOND_CATALOGUE = [
  { id: 'barcolair_a11_ilot', nom: 'BARCOLAIR A11 ilôt — Acier 100mm (réf. Excel)', icRef: 14.148 },
  { id: 'barcolair_a11_150',  nom: 'BARCOLAIR A11 — Acier 150mm',                   icRef: null   },
  { id: 'barcolair_hybrid',   nom: 'BARCOLAIR Hybrid U46 — Aluminium 100mm',         icRef: null   },
  { id: 'interallu_sapp',     nom: 'INTERALLU SAPP® Ceiling',                        icRef: null   },
  { id: 'interallu_easyklima',nom: 'INTERALLU Easy-Klima Plus®',                     icRef: null   },
  { id: 'libre',              nom: 'Autre fabricant / FDES personnalisée',            icRef: null   },
] as const
export type PlafondModeleId = typeof PLAFOND_CATALOGUE[number]['id']

// ─── Ic 8.1 par source (kgCO2eq/m²SU à 100% couverture) ───────────────────
export const IC_8_1 = {
  chaud: { pac: 3.1, reseau: 2.1, chaudiere: 0.5 },
  froid: { groupe: 2.6, reseau: 2.0 },
}

// ─── Types ─────────────────────────────────────────────────────────────────
export interface CVCParams {
  surfaceUtile: number
  typeBatiment: 'bureaux' | 'autre'

  chaud: { pac: number; reseau: number; chaudiere: number }
  froid: { groupe: number; reseau: number }

  ratioPlafond: number
  plafondModele: PlafondModeleId
  icPlafondRef: number
  icVCVRef: number

  ctaMode: CTAMode
  ctaLignes: CTALigne[]
  ctaLibre: CTALibre | null

  gaineRectPoids: number
  gaineCircLongueur: number
  tuyauT1Longueur: number
  tuyauT10Longueur: number
}

export interface CVCResult {
  lot81_chaud: number
  lot81_froid: number
  lot83_plafond: number
  lot83_vcv: number
  lot84: number
  lot84_detail: { nom: string; quantite: number; ic: number }[]
  lot85_gaineRect: number
  lot85_gaineCirc: number
  lot85_tuyauT1: number
  lot85_tuyauT10: number
  lot81: number
  lot83: number
  lot85: number
  total: number
}

// ─── Coefficients 8.5 ──────────────────────────────────────────────────────
const IC_GAINE_RECT_PAR_KG = 9.62
const IC_GAINE_CIRC_PAR_M  = 3.367
const IC_TUYAU_T1_PAR_M    = 14.887
const IC_TUYAU_T10_PAR_M   = 17.36
const r1 = (v: number) => Math.round(v * 10) / 10

export function calculerIcCVC(p: CVCParams): CVCResult {
  const su = p.surfaceUtile

  // 8.1
  const lot81_chaud =
    p.chaud.pac       * IC_8_1.chaud.pac +
    p.chaud.reseau    * IC_8_1.chaud.reseau +
    p.chaud.chaudiere * IC_8_1.chaud.chaudiere
  const lot81_froid =
    p.froid.groupe * IC_8_1.froid.groupe +
    p.froid.reseau * IC_8_1.froid.reseau

  // 8.3
  const lot83_plafond = p.ratioPlafond * p.icPlafondRef
  const lot83_vcv     = (1 - p.ratioPlafond) * p.icVCVRef

  // 8.4
  let lot84_detail: { nom: string; quantite: number; ic: number }[] = []
  if (p.ctaMode === 'libre' && p.ctaLibre) {
    const ic = (p.ctaLibre.kgCO2Total * p.ctaLibre.quantite) / su
    lot84_detail = [{ nom: `${p.ctaLibre.fabricant} — ${p.ctaLibre.modele}`, quantite: p.ctaLibre.quantite, ic: Math.round(ic * 100) / 100 }]
  } else {
    lot84_detail = p.ctaLignes
      .filter(l => l.quantite > 0)
      .map(l => {
        const m = CTA_CATALOGUE.find(c => c.id === l.modelId)!
        return { nom: m.nom, quantite: l.quantite, ic: Math.round((m.icParUnite * l.quantite / su) * 100) / 100 }
      })
  }
  const lot84 = lot84_detail.reduce((s, d) => s + d.ic, 0)

  // 8.5
  const lot85_gaineRect  = (p.gaineRectPoids    * IC_GAINE_RECT_PAR_KG) / su
  const lot85_gaineCirc  = (p.gaineCircLongueur * IC_GAINE_CIRC_PAR_M)  / su
  const lot85_tuyauT1    = (p.tuyauT1Longueur   * IC_TUYAU_T1_PAR_M)   / su
  const lot85_tuyauT10   = (p.tuyauT10Longueur  * IC_TUYAU_T10_PAR_M)  / su

  const lot81 = lot81_chaud + lot81_froid
  const lot83 = lot83_plafond + lot83_vcv
  const lot85 = lot85_gaineRect + lot85_gaineCirc + lot85_tuyauT1 + lot85_tuyauT10
  const total = lot81 + lot83 + lot84 + lot85

  return {
    lot81_chaud: r1(lot81_chaud), lot81_froid: r1(lot81_froid),
    lot83_plafond: r1(lot83_plafond), lot83_vcv: r1(lot83_vcv),
    lot84: r1(lot84), lot84_detail,
    lot85_gaineRect: r1(lot85_gaineRect), lot85_gaineCirc: r1(lot85_gaineCirc),
    lot85_tuyauT1: r1(lot85_tuyauT1), lot85_tuyauT10: r1(lot85_tuyauT10),
    lot81: r1(lot81), lot83: r1(lot83), lot85: r1(lot85),
    total: r1(total),
  }
}

// ─── Algorithme débit automatique ─────────────────────────────────────────
export function suggestCTA(debitTotal: number, surfaceUtile: number): { modelId: CTAModelId; quantite: number; ic: number; debitCouvert: number }[] {
  const results: { modelId: CTAModelId; quantite: number; ic: number; debitCouvert: number }[] = []
  for (const m of CTA_CATALOGUE) {
    const q = Math.ceil(debitTotal / m.debit)
    if (q > 10) continue
    const ic = r1((m.icParUnite * q) / surfaceUtile)
    results.push({ modelId: m.id, quantite: q, ic, debitCouvert: m.debit * q })
  }
  return results.sort((a, b) => a.ic - b.ic).slice(0, 5)
}
