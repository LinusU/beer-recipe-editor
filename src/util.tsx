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
 * @returns a short string summary of the fermentables.
 */
export function summarizeFermentables (input: BeerJSON.FermentableAdditionType[]): string {
  const foo: Record<string, number> = {}

  for (const fermentable of input) {
    if (!Number.isFinite(fermentable.amount.value)) continue

    const amount = normalizeAmount(fermentable.amount)
    const key = `${amount.unit}~${fermentable.type}`

    foo[key] = (foo[key] ?? 0) + amount.value
  }

  const keys = Object.keys(foo)

  if (keys.length === 0) {
    return ''
  }

  if (keys.length === 1) {
    return `${foo[keys[0]].toFixed(0)}${keys[0].split('~')[0]}`
  }

  const result = []
  for (const key of keys) {
    const amount = foo[key]
    const [unit, type] = key.split('~')

    result.push(`${amount.toFixed(0)}${unit} ${type}`)
  }

  return result.join(', ')
}
