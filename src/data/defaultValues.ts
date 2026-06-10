import { CVCParams } from '../engine/calcCVC'
import { ApportsParams } from '../engine/calcApports'

export const DEFAULT_CVC: CVCParams = {
  surfaceUtile: 9000,
  typeBatiment: 'bureaux',

  chaud:  { pac: 0.20, reseau: 0.80, chaudiere: 0.0 },
  froid:  { groupe: 0.30, reseau: 0.70 },

  ratioPlafond:  0.70,
  plafondModele: 'barcolair_a11_ilot',
  icPlafondRef:  14.148,
  icVCVRef:       6.458,

  ctaMode:   'carrier',
  ctaLignes: [
    { modelId: 'L600',  quantite: 3 },
    { modelId: 'L450',  quantite: 3 },
    { modelId: 'L150',  quantite: 3 },
    { modelId: 'HC020', quantite: 3 },
    { modelId: 'L300',  quantite: 3 },
    { modelId: 'HR100', quantite: 5 },
  ],
  ctaLibre: null,

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
}
