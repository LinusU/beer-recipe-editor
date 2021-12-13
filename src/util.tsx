import unreachable from 'ts-unreachable'

/**
 * Normalize mass units to grams, and volume units to milliliters.
 */
function normalizeAmount (amount: BeerJSON.MassType | BeerJSON.VolumeType): BeerJSON.MassType | BeerJSON.VolumeType {
  switch (amount.unit) {
    // Mass
    case 'mg': return { unit: 'g', value: amount.value * 0.001 }
    case 'g': return { unit: 'g', value: amount.value }
    case 'kg': return { unit: 'g', value: amount.value * 1000 }
    case 'lb': return { unit: 'g', value: amount.value * 453.59237 }
    case 'oz': return { unit: 'g', value: amount.value * 28.349523125 }

    // Volume
    case 'ml': return { unit: 'ml', value: amount.value }
    case 'l': return { unit: 'ml', value: amount.value * 1000 }
    case 'tsp': return { unit: 'ml', value: amount.value * 4.92892 }
    case 'tbsp': return { unit: 'ml', value: amount.value * 14.7868 }
    case 'floz': return { unit: 'ml', value: amount.value * 29.5735 }
    case 'cup': return { unit: 'ml', value: amount.value * 236.588 }
    case 'pt': return { unit: 'ml', value: amount.value * 473.176 }
    case 'qt': return { unit: 'ml', value: amount.value * 946.353 }
    case 'gal': return { unit: 'ml', value: amount.value * 3785.41 }
    case 'bbl': return { unit: 'ml', value: amount.value * 158987 }
    case 'ifloz': return { unit: 'ml', value: amount.value * 28.4130625 }
    case 'ipt': return { unit: 'ml', value: amount.value * 568.26125 }
    case 'iqt': return { unit: 'ml', value: amount.value * 1136.5225 }
    case 'igal': return { unit: 'ml', value: amount.value * 4546.09 }
    case 'ibbl': return { unit: 'ml', value: amount.value * 163659.25 }

    default: unreachable(amount)
  }
}

/**
 * Normalize gravity units to specific gravity.
 */
function normalizeGravity (gravity: BeerJSON.GravityType): BeerJSON.GravityType {
  switch (gravity.unit) {
    case 'sg': return { unit: 'sg', value: gravity.value }
    // Ref: https://www.brewersfriend.com/plato-to-sg-conversion-chart/
    case 'plato': return { unit: 'sg', value: 1 + (gravity.value / (258.6 - ((gravity.value / 258.2) * 227.1))) }
    // Ref: https://www.vinolab.hr/calculator/gravity-density-sugar-conversions-en19
    case 'brix': return { unit: 'sg', value: (0.00000005785037196 * Math.pow(gravity.value, 3)) + (0.00001261831344 * Math.pow(gravity.value, 2)) + (0.003873042366 * gravity.value) + 0.9999994636 }
    default: unreachable(gravity.unit)
  }
}

/**
 * Normalize time units to minutes.
 */
function normalizeTime (time: BeerJSON.TimeType): BeerJSON.TimeType {
  switch (time.unit) {
    case 'sec': return { unit: 'min', value: time.value / 60 }
    case 'min': return { unit: 'min', value: time.value }
    case 'hr': return { unit: 'min', value: time.value * 60 }
    case 'day': return { unit: 'min', value: time.value * 1440 }
    case 'week': return { unit: 'min', value: time.value * 10080 }
    default: unreachable(time.unit)
  }
}

/**
 * @returns calculated ABV as string.
 */
export function calculateABV (recipe: { original_gravity?: Partial<BeerJSON.GravityType>, final_gravity?: Partial<BeerJSON.GravityType> }): string {
  if (recipe.original_gravity?.unit == null || recipe.original_gravity.value == null) return ''
  if (recipe.final_gravity?.unit == null || recipe.final_gravity.value == null) return ''

  const og = normalizeGravity({ unit: recipe.original_gravity.unit, value: recipe.original_gravity.value }).value
  const fg = normalizeGravity({ unit: recipe.final_gravity.unit, value: recipe.final_gravity.value }).value

  const abv = (76.08 * (og - fg) / (1.775 - og)) * (fg / 0.794)

  return `${abv.toFixed(2)}%`
}

/**
 * @returns a short string summary of the fermentables.
 */
export function summarizeFermentables (input: BeerJSON.FermentableAdditionType[]): string {
  const summary: Record<string, number> = {}

  for (const fermentable of input) {
    if (!Number.isFinite(fermentable.amount.value)) continue

    const amount = normalizeAmount(fermentable.amount)
    const key = `${amount.unit}~${fermentable.type}`

    summary[key] = (summary[key] ?? 0) + amount.value
  }

  const keys = Object.keys(summary)

  if (keys.length === 0) {
    return ''
  }

  if (keys.length === 1) {
    return `${summary[keys[0]].toFixed(0)}${keys[0].split('~')[0]}`
  }

  const result = []
  for (const key of keys) {
    const amount = summary[key]
    const [unit, type] = key.split('~')

    result.push(`${amount.toFixed(0)}${unit} ${type}`)
  }

  return result.join(', ')
}

interface HopsMetadata {
  batchSize?: BeerJSON.VolumeType
  originalGravity?: BeerJSON.GravityType
}

/**
 * @returns a short string summary of the hops.
 */
export function summarizeHops (input: BeerJSON.HopAdditionType[], { batchSize, originalGravity }: HopsMetadata): string {
  if (batchSize == null || originalGravity == null) return ''

  const batchSizeLiter = normalizeAmount(batchSize).value / 1000
  const originalGravitySG = normalizeGravity(originalGravity).value

  let ibu = 0
  for (const hop of input) {
    if (!Number.isFinite(hop.amount.value)) continue
    if (hop.alpha_acid.unit !== '%') unreachable(hop.alpha_acid.unit)
    if (hop.timing?.duration == null) continue
    if (hop.timing.use !== 'add_to_boil') continue

    const amount = normalizeAmount(hop.amount)
    const duration = normalizeTime(hop.timing.duration)

    // Ref: http://www.realbeer.com/hops/research.html
    const addedAlphaAcids = ((hop.alpha_acid.value / 100) * amount.value * 1000) / batchSizeLiter
    const bignessFactor = 1.65 * Math.pow(0.000125, originalGravitySG - 1)
    const boilTimeFactor = (1 - Math.exp(-0.04 * duration.value)) / 4.15
    const alphaAcidUtilization = bignessFactor * boilTimeFactor * (hop.form === 'pellet' ? 1.1 : 1)

    ibu += alphaAcidUtilization * addedAlphaAcids
  }

  return `Post boil IBU: ${ibu.toFixed(2)}`
}
