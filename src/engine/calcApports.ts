export interface ApportsParams {
  tamb: number
  text: number
  surfaceUtile: number

  ratioVDI: number
  puissanceVDIManuelle: number | null
  puissanceECS: number

  foisonnement: number
  surpuissance: number
}

export interface ApportsResult {
  puissanceEstimee: number
  puissanceVDI: number
  puissanceECS: number
  puissanceTotale: number
  puissanceApresF: number
  puissanceFinale: number
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

  return {
    puissanceEstimee,
    puissanceVDI,
    puissanceECS: p.puissanceECS,
    puissanceTotale,
    puissanceApresF,
    puissanceFinale,
  }
}
