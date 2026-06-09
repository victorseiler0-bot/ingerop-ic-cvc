export interface ApportsParams {
  tamb: number          // °C intérieur
  text: number          // °C extérieur
  surfaceUtile: number  // m²

  ratioVDI: number      // part locaux elec/VDI (ex: 0.2)
  puissanceVDIManuelle: number | null  // si valeur connue, sinon null
  puissanceECS: number  // kW

  foisonnement: number  // ex: 0.9
  surpuissance: number  // kW ajout manuel

  // Traitement thermique (%)
  ratioVCV: number
  ratioPlafond: number
  ratioArmoire: number
  ratioCTA: number

  // Production chauffage (% — somme = 100%)
  ratioPAC: number
  ratioReseau: number       // réseau chaleur urbain
  ratioChaudiere: number
  ratioBiomasse: number

  // Production froid (% — somme = 100%)
  ratioGroupeFroid: number
  ratioReseauFroid: number  // réseau froid urbain
}

export interface ApportsResult {
  puissanceEstimee: number
  puissanceVDI: number
  puissanceECS: number
  puissanceTotale: number
  puissanceApresF: number
  puissanceFinale: number

  // Traitement (kW)
  kWVCV: number
  kWPlafond: number
  kWArmoire: number
  kWCTA: number

  // Production chauffage (kW)
  kWPAC: number
  kWReseau: number
  kWChaudiere: number
  kWBiomasse: number

  // Production froid (kW)
  kWGroupeFroid: number
  kWReseauFroid: number
}

const COEFF_W_M2K = 5.9222  // calibré sur l'exemple Excel (479.7 kW / 9000 m² / 9 °C)

export function calculerApports(p: ApportsParams): ApportsResult {
  const deltaT = Math.max(0, p.text - p.tamb)
  const puissanceEstimee = Math.round((p.surfaceUtile * COEFF_W_M2K * deltaT / 1000) * 10) / 10

  const puissanceVDI = p.puissanceVDIManuelle !== null
    ? p.puissanceVDIManuelle
    : Math.round(puissanceEstimee * p.ratioVDI * 100) / 100

  const puissanceTotale = Math.round((puissanceEstimee + puissanceVDI + p.puissanceECS) * 100) / 100
  const puissanceApresF = Math.round(puissanceTotale * p.foisonnement * 1000) / 1000
  const puissanceFinale = Math.round((puissanceApresF + p.surpuissance) * 1000) / 1000

  const kWVCV = Math.round(puissanceFinale * p.ratioVCV * 10000) / 10000
  const kWPlafond = Math.round(puissanceFinale * p.ratioPlafond * 10000) / 10000
  const kWArmoire = Math.round(puissanceFinale * p.ratioArmoire * 10000) / 10000
  const kWCTA = Math.round(puissanceFinale * p.ratioCTA * 10000) / 10000

  const kWPAC = Math.round(puissanceFinale * p.ratioPAC * 10000) / 10000
  const kWReseau = Math.round(puissanceFinale * p.ratioReseau * 10000) / 10000
  const kWChaudiere = Math.round(puissanceFinale * p.ratioChaudiere * 10000) / 10000
  const kWBiomasse = Math.round(puissanceFinale * p.ratioBiomasse * 10000) / 10000
  const kWGroupeFroid = Math.round(puissanceFinale * p.ratioGroupeFroid * 10000) / 10000
  const kWReseauFroid = Math.round(puissanceFinale * p.ratioReseauFroid * 10000) / 10000

  return {
    puissanceEstimee,
    puissanceVDI,
    puissanceECS: p.puissanceECS,
    puissanceTotale,
    puissanceApresF,
    puissanceFinale,
    kWVCV, kWPlafond, kWArmoire, kWCTA,
    kWPAC, kWReseau, kWChaudiere, kWBiomasse,
    kWGroupeFroid, kWReseauFroid,
  }
}
