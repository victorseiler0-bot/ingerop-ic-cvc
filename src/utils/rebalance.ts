/**
 * Rebalance un groupe de ratios (somme = 1) quand un slider change.
 * Travaille en centièmes (entiers) pour éviter les dérives floating-point.
 * Les autres sliders se réajustent proportionnellement ; le dernier absorbe le reste.
 */
export function rebalance(
  current: Record<string, number>,
  changedKey: string,
  newValue: number
): Record<string, number> {
  // Tout en entiers (centièmes de %)
  const toInt = (v: number) => Math.round(v * 100)
  const toFloat = (p: number) => Math.max(0, Math.round(p)) / 100

  const changed = Math.min(100, Math.max(0, toInt(newValue)))
  const others = Object.keys(current).filter(k => k !== changedKey)
  const remaining = 100 - changed
  const sumOthers = others.reduce((s, k) => s + toInt(current[k]), 0)

  const result: Record<string, number> = { ...current, [changedKey]: toFloat(changed) }

  if (sumOthers === 0) {
    // Tous les autres sont à 0 — répartir équitablement
    const share = Math.floor(remaining / others.length)
    let extra = remaining - share * others.length
    others.forEach(k => {
      result[k] = toFloat(share + (extra-- > 0 ? 1 : 0))
    })
  } else {
    // Réduction proportionnelle — le dernier absorbe le reste d'arrondi
    let assigned = 0
    others.forEach((k, i) => {
      if (i < others.length - 1) {
        const p = Math.round(toInt(current[k]) * remaining / sumOthers)
        result[k] = toFloat(p)
        assigned += p
      } else {
        result[k] = toFloat(Math.max(0, remaining - assigned))
      }
    })
  }

  return result
}
