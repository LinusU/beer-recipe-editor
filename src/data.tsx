// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="@beerjson/beerjson/types/ts/beerjson" />

type Fermentable = Pick<BeerJSON.FermentableBase, 'type' | 'name' | 'producer'>

export function formatFermentable (input: Fermentable): { label: string, value: string } {
  let icon
  switch (input.type) {
    case 'fruit': icon = '🍓'; break
    case 'grain': icon = '🌾'; break
    case 'honey': icon = '🍯'; break
    case 'juice': icon = '🧃'; break
    case 'sugar': icon = '🍭'; break
    default: icon = '❓'
  }

  return {
    label: `${icon} ${input.name}${input.producer == null ? '' : ` (${input.producer})`}`,
    value: `${input.type}~${input.name}~${input.producer}`
  }
}

export const fermentableAdditions: Fermentable[] = [
  { type: 'fruit', name: 'Blackberries' },
  { type: 'fruit', name: 'Passion fruit purée' },
  { type: 'fruit', name: 'Pineapple puree' },
  { type: 'grain', name: 'Acidulated Malt', producer: 'Weyermann' },
  { type: 'grain', name: 'Aromatic Malt', producer: 'Dingemans' },
  { type: 'grain', name: 'Beech Smoked Barley Malt', producer: 'Weyermann' },
  { type: 'grain', name: 'Biscuit Malt', producer: 'Dingemans' },
  { type: 'grain', name: 'Carabelge', producer: 'Weyermann' },
  { type: 'grain', name: 'Carabohemian', producer: 'Weyermann' },
  { type: 'grain', name: 'Carafa Special 3', producer: 'Weyermann' },
  { type: 'grain', name: 'Carahell', producer: 'Weyermann' },
  { type: 'grain', name: 'Caramünch 1', producer: 'Weyermann' },
  { type: 'grain', name: 'Carapils', producer: 'Weyermann' },
  { type: 'grain', name: 'Carawheat', producer: 'Weyermann' },
  { type: 'grain', name: 'Chocolate Malt', producer: 'Crisp' },
  { type: 'grain', name: 'Crystal 150', producer: 'Crisp' },
  { type: 'grain', name: 'Flaked Barley', producer: 'Stora Hällsta' },
  { type: 'grain', name: 'Flaked Oats', producer: 'AXA' },
  { type: 'grain', name: 'Golden Promise Malt', producer: 'Thomas Fawcett' },
  { type: 'grain', name: 'Maris Otter Ale Malt', producer: 'Crisp' },
  { type: 'grain', name: 'Melanoidinmalt', producer: 'Weyermann' },
  { type: 'grain', name: 'Munic 1 Malt', producer: 'Weyermann' },
  { type: 'grain', name: 'Munic 2 Malt', producer: 'Weyermann' },
  { type: 'grain', name: 'Pale Ale Malt', producer: 'Weyermann' },
  { type: 'grain', name: 'Pilsner Malt', producer: 'Weyermann' },
  { type: 'grain', name: 'Roasted Barley', producer: 'Weyermann' },
  { type: 'grain', name: 'Rye Malt', producer: 'Weyermann' },
  { type: 'grain', name: 'Special B', producer: 'Dingemans' },
  { type: 'grain', name: 'SprayMalt Extra Light' },
  { type: 'grain', name: 'Torrefied Maize', producer: 'Crisp' },
  { type: 'grain', name: 'Torrefied Wheat', producer: 'Crisp' },
  { type: 'grain', name: 'Vienna Malt', producer: 'Weyermann' },
  { type: 'grain', name: 'Wheat Malt', producer: 'Weyermann' },
  { type: 'honey', name: 'Honung från flera sorters blommor', producer: 'ICA' },
  { type: 'honey', name: 'Munkens Honung', producer: 'Munkens' },
  { type: 'sugar', name: 'Bread Syrup', producer: 'Dansukker' },
  { type: 'sugar', name: 'Cane sugar', producer: 'Dansukker' },
  { type: 'sugar', name: 'Caster sugar', producer: 'Dansukker' }
]

type Hop = Pick<BeerJSON.HopVarietyBase, 'name'>

export function formatHop (input: Hop): { label: string, value: string } {
  return {
    label: `🥬 ${input.name}`,
    value: input.name
  }
}

export const hopAdditions: Hop[] = [
  { name: 'Amarillo' },
  { name: 'Azacca' },
  { name: 'Bramling Cross' },
  { name: 'Cascade' },
  { name: 'Centennial' },
  { name: 'Challenger' },
  { name: 'Chinook' },
  { name: 'Citra' },
  { name: 'Columbus' },
  { name: 'East Kent Golding' },
  { name: 'First Gold' },
  { name: 'Fuggle' },
  { name: 'Galaxy' },
  { name: 'Hallertauer Mittelfrüh' },
  { name: 'Hersbrucker' },
  { name: 'Magnum' },
  { name: 'Mosaic' },
  { name: 'Pacifica' },
  { name: 'Perle' },
  { name: 'Saaz' },
  { name: 'Simcoe' },
  { name: 'Styrian Golding Bobek' },
  { name: 'Target' },
  { name: 'Tettnanger' }
]

export function formatMiscellaneous (input: BeerJSON.MiscellaneousBase): { label: string, value: string } {
  let icon
  switch (input.type) {
    case 'fining': icon = '🥽'; break
    case 'herb': icon = '🌿'; break
    case 'spice': icon = '🌶️'; break
    case 'wood': icon = '🪵'; break
    default: icon = '❓'
  }

  return {
    label: `${icon} ${input.name}`,
    value: `${input.type}~${input.name}`
  }
}

export const miscellaneousAdditions: BeerJSON.MiscellaneousBase[] = [
  { type: 'fining', name: 'Gelatin Sheet' },
  { type: 'fining', name: 'Protafloc' },
  { type: 'spice', name: 'Bitter orange peel' },
  { type: 'spice', name: 'Ground coriander seed' }
]

export function formatCulture (input: BeerJSON.CultureBase): { label: string, value: string } {
  let icon
  switch (input.type) {
    case 'ale': icon = '🍺'; break
    case 'champagne': icon = '🍾'; break
    default: icon = '❓'
  }

  switch (input.form) {
    case 'dry': icon += '🧂'; break
    case 'liquid': icon += '🧪'; break
    default: icon += '❓'
  }

  return {
    label: `${icon} ${input.name} (${input.producer})`,
    value: `${input.type}~${input.form}~${input.name}~${input.producer}`
  }
}

export const cultureAdditions: BeerJSON.CultureBase[] = [
  { type: 'ale', form: 'dry', name: 'Bavarian Wheat M20', producer: 'Mangrove Jack\'s' },
  { type: 'ale', form: 'dry', name: 'Belgian Wit M21', producer: 'Mangrove Jack\'s' },
  { type: 'ale', form: 'dry', name: 'Belle Saison', producer: 'Lallemand' },
  { type: 'ale', form: 'dry', name: 'London ESB', producer: 'Lallemand' },
  { type: 'ale', form: 'dry', name: 'Safale BE-134', producer: 'Fermentis' },
  { type: 'ale', form: 'dry', name: 'Safale BE-256', producer: 'Fermentis' },
  { type: 'ale', form: 'dry', name: 'Safale K-97', producer: 'Fermentis' },
  { type: 'ale', form: 'dry', name: 'Safale S-04', producer: 'Fermentis' },
  { type: 'ale', form: 'dry', name: 'Safale S-33', producer: 'Fermentis' },
  { type: 'ale', form: 'dry', name: 'Safale T-58', producer: 'Fermentis' },
  { type: 'ale', form: 'dry', name: 'Safale US-05', producer: 'Fermentis' },
  { type: 'ale', form: 'dry', name: 'Safale WB-06', producer: 'Fermentis' },
  { type: 'champagne', form: 'dry', name: 'EC-1118', producer: 'Lalvin' }
]
