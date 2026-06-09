// ─── Catalogue CTA CARRIER 39CP ───────────────────────────────────────────
// Ic dynamiques sur 50 ans extraits de l'onglet NDC Ic CTA
export const CTA_CATALOGUE = [
  { id: 'L600',  nom: '39CP L 600',    type: 'Modulaire', echangeur: 'Roue',   debit: 5800,  icParUnite: 22818.9 },
  { id: 'L450',  nom: '39CP L 450',    type: 'Modulaire', echangeur: 'Roue',   debit: 4100,  icParUnite: 18233.3 },
  { id: 'L300',  nom: '39CP L 300',    type: 'Modulaire', echangeur: 'Plaque', debit: 2800,  icParUnite: 17218.4 },
  { id: 'L150',  nom: '39CP L 150',    type: 'Modulaire', echangeur: 'Plaque', debit: 1500,  icParUnite: 14303.7 },
  { id: 'HC020', nom: '39CP X HC020',  type: 'Compacte',  echangeur: 'Plaque', debit: 2000,  icParUnite: 10444.5 },
  { id: 'HR100', nom: '39CP X HR100',  type: 'Compacte',  echangeur: 'Roue',   debit: 10000, icParUnite: 33297.0 },
] as const
export type CTAModelId = typeof CTA_CATALOGUE[number]['id']

export interface CTALigne { modelId: CTAModelId; quantite: number }

// ─── Ic 8.1 par source (kgCO2eq/m²SU à 100% de couverture, 9000 m²SU réf.) ──
// Valeurs estimées RE2020 — non présentes dans l'Excel (pas de FDES par kW installé)
export const IC_8_1 = {
  chaud: {
    pac:      3.1,   // ~93 kW × 300 kgCO2eq/kW / 9000
    reseau:   2.1,   // ~375 kW × 50 kgCO2eq/kW / 9000
    chaudiere: 0.5,  // faible — chaudière simple
  },
  froid: {
    groupe:  2.6,   // ~155 kW × 150 kgCO2eq/kW / 9000
    reseau:  2.0,   // ~363 kW × 50 kgCO2eq/kW / 9000
  },
}

// ─── Types ─────────────────────────────────────────────────────────────────
export interface CVCParams {
  surfaceUtile: number

  // 8.1 Chauffage — ratios doivent sommer à 1
  chaud: { pac: number; reseau: number; chaudiere: number }
  // 8.1 Froid — ratios doivent sommer à 1
  froid: { groupe: number; reseau: number }

  // 8.3 Émission — ratioPlafond + ratioVCV = 1
  ratioPlafond: number          // 0 à 1
  icPlafondRef: number          // kgCO2eq/m²SU ref. Excel = 14.148
  icVCVRef: number              // kgCO2eq/m²SU ref. Excel = 6.458

  // 8.4 CTA
  ctaLignes: CTALigne[]

  // 8.5 Réseaux (valeurs en unités physiques)
  gaineRectPoids: number        // kg total
  gaineCircLongueur: number     // m total (Ø moyen équivalent)
  tuyauT1Longueur: number       // m total (Tarif 1 DN15-65)
  tuyauT10Longueur: number      // m total (Tarif 10 DN65-300)
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
  // Totaux par lot
  lot81: number
  lot83: number
  lot85: number
  total: number
  seuil: number
  conforme: boolean
}

// ─── Coefficients Ic extraits / calibrés sur l'Excel ──────────────────────
const IC_GAINE_RECT_PAR_KG  = 9.62    // onglet 19 — FDES gaines rectangulaires
const IC_GAINE_CIRC_PAR_M   = 3.367   // calibré : 1212 kgCO2eq / 360 m Ø125 / 9000
const IC_TUYAU_T1_PAR_M     = 14.887  // calibré : 13.998 kgCO2eq/m²SU pour 846 m
const IC_TUYAU_T10_PAR_M    = 17.36   // calibré : 8.998 kgCO2eq/m²SU pour 518 m DN65+

const SEUIL_RE2020 = 150

const r1 = (v: number) => Math.round(v * 10) / 10

export function calculerIcCVC(p: CVCParams): CVCResult {
  const su = p.surfaceUtile

  // 8.1
  const lot81_chaud =
    p.chaud.pac      * IC_8_1.chaud.pac +
    p.chaud.reseau   * IC_8_1.chaud.reseau +
    p.chaud.chaudiere * IC_8_1.chaud.chaudiere

  const lot81_froid =
    p.froid.groupe * IC_8_1.froid.groupe +
    p.froid.reseau * IC_8_1.froid.reseau

  // 8.3
  const lot83_plafond = p.ratioPlafond * p.icPlafondRef
  const lot83_vcv     = (1 - p.ratioPlafond) * p.icVCVRef

  // 8.4 — kgCO2eq par modèle / surface
  const lot84_detail = p.ctaLignes
    .filter(l => l.quantite > 0)
    .map(l => {
      const m = CTA_CATALOGUE.find(c => c.id === l.modelId)!
      return { nom: m.nom, quantite: l.quantite, ic: (m.icParUnite * l.quantite) / su }
    })
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
    lot84: r1(lot84), lot84_detail: lot84_detail.map(d => ({ ...d, ic: Math.round(d.ic * 100) / 100 })),
    lot85_gaineRect: r1(lot85_gaineRect), lot85_gaineCirc: r1(lot85_gaineCirc),
    lot85_tuyauT1: r1(lot85_tuyauT1), lot85_tuyauT10: r1(lot85_tuyauT10),
    lot81: r1(lot81), lot83: r1(lot83), lot85: r1(lot85),
    total: r1(total), seuil: SEUIL_RE2020, conforme: total <= SEUIL_RE2020,
  }
}
