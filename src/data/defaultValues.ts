import { CVCParams } from '../engine/calcCVC'
import { ApportsParams } from '../engine/calcApports'

export const DEFAULT_CVC: CVCParams = {
  surfaceUtile: 9000,

  // 8.1 — ratios de référence onglet 2 (Apports)
  chaud:  { pac: 0.20, reseau: 0.80, chaudiere: 0.0 },
  froid:  { groupe: 0.30, reseau: 0.70 },

  // 8.3 — valeurs Excel onglet 12 (plafond actif BARCOLAIR A11 ilôt)
  ratioPlafond: 0.70,
  icPlafondRef: 14.148,   // kgCO2eq/m²SU — onglet 12 Excel
  icVCVRef:     6.458,    // kgCO2eq/m²SU — onglet 6 Excel

  // 8.4 — configuration de référence onglet 6
  ctaLignes: [
    { modelId: 'L600',  quantite: 3 },
    { modelId: 'L450',  quantite: 3 },
    { modelId: 'L150',  quantite: 3 },
    { modelId: 'HC020', quantite: 3 },
    { modelId: 'L300',  quantite: 3 },
    { modelId: 'HR100', quantite: 5 },
  ],

  // 8.5 — longueurs/poids de référence onglet 6 (SharePoint Ingerop, 9000 m²SU)
  gaineRectPoids:    42354,
  gaineCircLongueur: 360,
  tuyauT1Longueur:   846,
  tuyauT10Longueur:  518,
}

export const DEFAULT_APPORTS: ApportsParams = {
  tamb: 26,
  text: 35,
  surfaceUtile: 9000,
  ratioVDI: 0.20,
  puissanceVDIManuelle: null,
  puissanceECS: 90,
  foisonnement: 0.9,
  surpuissance: 0,
  ratioVCV:     0.20,
  ratioPlafond: 0.70,
  ratioArmoire: 0.10,
  ratioCTA:     0.00,
  ratioPAC:     0.20,
  ratioReseau:  0.80,
  ratioChaudiere: 0.00,
  ratioBiomasse:  0.00,
  ratioGroupeFroid: 0.30,
}
