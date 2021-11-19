// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="@beerjson/beerjson/types/ts/beerjson" />

type Style = Pick<BeerJSON.StyleBase, 'name' | 'category_number' | 'style_letter' | 'style_guide' | 'type'>

export function formatStyle(style: Style): { label: string, value: string } {
  if (style.type !== 'beer' || style.style_guide !== 'BJCP 2015') {
    return { label: 'Unknown', value: '' }
  }

  return {
    label: `🍺 ${style.category_number ?? '??'}${style.style_letter ?? ''} - ${style.name}`,
    value: `${style.category_number ?? ''}~${style.style_letter ?? ''}~${style.name}`
  }
}

export function parseStyle (style: string): Style {
  const [categoryNumber, styleLetter, name] = style.split('~')

  return {
    category_number: categoryNumber === '' ? undefined : Number(categoryNumber),
    name: name,
    style_guide: 'BJCP 2015',
    style_letter: categoryNumber === '' ? undefined : styleLetter,
    type: 'beer'
  }
}

export const styles: Style[] = [
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 1, style_letter: 'A', name: 'American Light Lager' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 1, style_letter: 'B', name: 'American Lager' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 1, style_letter: 'C', name: 'Cream Ale' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 1, style_letter: 'D', name: 'American Wheat Beer' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 2, style_letter: 'A', name: 'International Pale Lager' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 2, style_letter: 'B', name: 'International Amber Lager' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 2, style_letter: 'C', name: 'International Dark Lager' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 3, style_letter: 'A', name: 'Czech Pale Lager' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 3, style_letter: 'B', name: 'Czech Premium Pale Lager' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 3, style_letter: 'C', name: 'Czech Amber Lager' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 3, style_letter: 'D', name: 'Czech Dark Lager' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 4, style_letter: 'A', name: 'Munich Helles' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 4, style_letter: 'B', name: 'Festbier' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 4, style_letter: 'C', name: 'Helles Bock' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 5, style_letter: 'A', name: 'German Leichtbier' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 5, style_letter: 'B', name: 'Kölsch' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 5, style_letter: 'C', name: 'German Helles Exportbier' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 5, style_letter: 'D', name: 'German Pils' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 6, style_letter: 'A', name: 'Märzen' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 6, style_letter: 'B', name: 'Rauchbier' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 6, style_letter: 'C', name: 'Dunkles Bock' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 7, style_letter: 'A', name: 'Vienna Lager' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 7, style_letter: 'B', name: 'Altbier' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 7, style_letter: 'C', name: 'Kellerbier' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 7, style_letter: 'C', name: 'Kellerbier: Pale Kellerbier' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 7, style_letter: 'C', name: 'Kellerbier: Amber Kellerbier' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 8, style_letter: 'A', name: 'Munich Dunkel' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 8, style_letter: 'B', name: 'Schwarzbier' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 9, style_letter: 'A', name: 'Doppelbock' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 9, style_letter: 'B', name: 'Eisbock' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 9, style_letter: 'C', name: 'Baltic Porter' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 10, style_letter: 'A', name: 'Weissbier' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 10, style_letter: 'B', name: 'Dunkles Weissbier' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 10, style_letter: 'C', name: 'Weizenbock' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 11, style_letter: 'A', name: 'Ordinary Bitter' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 11, style_letter: 'B', name: 'Best Bitter' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 11, style_letter: 'C', name: 'Strong Bitter' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 12, style_letter: 'A', name: 'British Golden Ale' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 12, style_letter: 'B', name: 'Australian Sparkling Ale' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 12, style_letter: 'C', name: 'English IPA' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 13, style_letter: 'A', name: 'Dark Mild' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 13, style_letter: 'B', name: 'British Brown Ale' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 13, style_letter: 'C', name: 'English Porter' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 14, style_letter: 'A', name: 'Scottish Light' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 14, style_letter: 'B', name: 'Scottish Heavy' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 14, style_letter: 'C', name: 'Scottish Export' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 15, style_letter: 'A', name: 'Irish Red Ale' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 15, style_letter: 'B', name: 'Irish Stout' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 15, style_letter: 'C', name: 'Irish Extra Stout' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 16, style_letter: 'A', name: 'Sweet Stout' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 16, style_letter: 'B', name: 'Oatmeal Stout' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 16, style_letter: 'C', name: 'Tropical Stout' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 16, style_letter: 'D', name: 'Foreign Extra Stout' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 17, style_letter: 'A', name: 'British Strong Ale' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 17, style_letter: 'B', name: 'Old Ale' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 17, style_letter: 'C', name: 'Wee Heavy' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 17, style_letter: 'D', name: 'English Barleywine' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 18, style_letter: 'A', name: 'Blonde Ale' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 18, style_letter: 'B', name: 'American Pale Ale' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 19, style_letter: 'A', name: 'American Amber Ale' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 19, style_letter: 'B', name: 'California Common' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 19, style_letter: 'C', name: 'American Brown Ale' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 20, style_letter: 'A', name: 'American Porter' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 20, style_letter: 'B', name: 'American Stout' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 20, style_letter: 'C', name: 'Imperial Stout' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 21, style_letter: 'A', name: 'American IPA' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 21, style_letter: 'B', name: 'Specialty IPA' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 21, style_letter: 'B', name: 'Specialty IPA: Belgian IPA' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 21, style_letter: 'B', name: 'Specialty IPA: Black IPA' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 21, style_letter: 'B', name: 'Specialty IPA: Brown IPA' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 21, style_letter: 'B', name: 'Specialty IPA: Red IPA' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 21, style_letter: 'B', name: 'Specialty IPA: Rye IPA' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 21, style_letter: 'B', name: 'Specialty IPA: White IPA' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 22, style_letter: 'A', name: 'Double IPA' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 22, style_letter: 'B', name: 'American Strong Ale' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 22, style_letter: 'C', name: 'American Barleywine' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 22, style_letter: 'D', name: 'Wheatwine' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 23, style_letter: 'A', name: 'Berliner Weisse' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 23, style_letter: 'B', name: 'Flanders Red Ale' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 23, style_letter: 'C', name: 'Oud Bruin' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 23, style_letter: 'D', name: 'Lambic' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 23, style_letter: 'E', name: 'Gueuze' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 23, style_letter: 'F', name: 'Fruit Lambic' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 24, style_letter: 'A', name: 'Witbier' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 24, style_letter: 'B', name: 'Belgian Pale Ale' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 24, style_letter: 'C', name: 'Bière de Garde' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 25, style_letter: 'A', name: 'Belgian Blond Ale' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 25, style_letter: 'B', name: 'Saison' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 25, style_letter: 'C', name: 'Belgian Golden Strong Ale' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 26, style_letter: 'A', name: 'Trappist Single' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 26, style_letter: 'B', name: 'Belgian Dubbel' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 26, style_letter: 'C', name: 'Belgian Tripel' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 26, style_letter: 'D', name: 'Belgian Dark Strong Ale' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 27, name: 'Historical Beer: Gose' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 27, name: 'Historical Beer: Kentucky Common' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 27, name: 'Historical Beer: Lichtenhainer' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 27, name: 'Historical Beer: London Brown Ale' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 27, name: 'Historical Beer: Piwo Grodziskie' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 27, name: 'Historical Beer: Pre-Prohibition Lager' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 27, name: 'Historical Beer: Pre-Prohibition Porter' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 27, name: 'Historical Beer: Roggenbier' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 27, name: 'Historical Beer: Sahti' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 28, style_letter: 'A', name: 'Brett Beer' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 28, style_letter: 'B', name: 'Mixed-Fermentation Sour Beer' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 28, style_letter: 'C', name: 'Wild Specialty Beer' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 29, style_letter: 'A', name: 'Fruit Beer' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 29, style_letter: 'B', name: 'Fruit and Spice Beer' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 29, style_letter: 'C', name: 'Specialty Fruit Beer' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 30, style_letter: 'A', name: 'Spice, Herb, or Vegetable Beer' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 30, style_letter: 'B', name: 'Autumn Seasonal Beer' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 30, style_letter: 'C', name: 'Winter Seasonal Beer' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 31, style_letter: 'A', name: 'Alternative Grain Beer' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 31, style_letter: 'B', name: 'Alternative Sugar Beer' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 32, style_letter: 'A', name: 'Classic Style Smoked Beer' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 32, style_letter: 'B', name: 'Specialty Smoked Beer' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 33, style_letter: 'A', name: 'Wood-Aged Beer' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 33, style_letter: 'B', name: 'Specialty Wood-Aged Beer' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 34, style_letter: 'A', name: 'Clone Beer' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 34, style_letter: 'B', name: 'Mixed-Style Beer' },
  { style_guide: 'BJCP 2015', type: 'beer', category_number: 34, style_letter: 'C', name: 'Experimental Beer' }
]

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
    value: `${input.type}~${input.name}~${input.producer ?? ''}`
  }
}

export function parseFermentable (input: string): Fermentable {
  const [type, name, producer] = input.split('~')
  return { type: type as any, name, producer: producer === '' ? undefined : producer }
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

export function parseHop (input: string): Hop {
  const [name] = input.split('~')
  return { name }
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

export function parseMiscellaneous (input: string): BeerJSON.MiscellaneousBase {
  const [type, name] = input.split('~')
  return { type: type as any, name }
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
    label: `${icon} ${input.name}${input.producer == null ? '' : ` (${input.producer})`}`,
    value: `${input.type}~${input.form}~${input.name}~${input.producer ?? ''}`
  }
}

export function parseCulture (input: string): BeerJSON.CultureBase {
  const [type, form, name, producer] = input.split('~')
  return { type: type as any, name, form: form as any, producer: producer === '' ? undefined : producer }
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
