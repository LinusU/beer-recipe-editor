import slugify from '@sindresorhus/slugify'
import React, { ChangeEvent, useState } from 'react'
import { FieldValues, Path, useFieldArray, useForm, UseFormReturn } from 'react-hook-form'
import FancySelect from 'react-select'
import Spacer from 'react-spacer'
import { HStack, Text, VStack } from 'react-stacked'

import { cultureAdditions, fermentableAdditions, formatCulture, formatFermentable, formatHop, formatMiscellaneous, formatStyle, hopAdditions, miscellaneousAdditions, parseCulture, parseFermentable, parseHop, parseMiscellaneous, parseStyle, recipeTemplate, styles } from './data'
import { calculateABV, summarizeFermentables, summarizeHops } from './util'

const accentColor = '#FB8B24'

const concentrationUnitOptions = [{ value: 'ppm' }, { value: 'ppb' }, { value: 'mg/l' }]
const gravityUnitOptions = [{ value: 'sg' }, { value: 'plato' }, { value: 'brix' }]
const massUnitOptions = [{ value: 'mg' }, { value: 'g' }, { value: 'kg' }, { value: 'lb' }, { value: 'oz' }]
const recipeTypeOptions = [{ value: 'cider' }, { value: 'kombucha' }, { value: 'soda' }, { value: 'other' }, { value: 'mead' }, { value: 'wine' }, { value: 'extract' }, { value: 'partial mash' }, { value: 'all grain' }]
const temperatureUnitOptions = [{ value: 'C' }, { value: 'F' }]
const timeUnitOptions = [{ value: 'sec' }, { value: 'min' }, { value: 'hr' }, { value: 'day' }, { value: 'week' }]
const unitUnitOptions = [{ value: '1' }, { value: 'unit' }, { value: 'each' }, { value: 'dimensionless' }, { value: 'pkg' }]
const volumeUnitOptions = [{ value: 'ml' }, { value: 'l' }, { value: 'tsp' }, { value: 'tbsp' }, { value: 'floz' }, { value: 'cup' }, { value: 'pt' }, { value: 'qt' }, { value: 'gal' }, { value: 'bbl' }, { value: 'ifloz' }, { value: 'ipt' }, { value: 'iqt' }, { value: 'igal' }, { value: 'ibbl' }]

const Error: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ padding: 10, borderColor: 'red', borderWidth: 2 }}>{children}</div>
)

interface SingleInputWrapperProps {
  children: React.ReactNode
  title: string
}

const SingleInputWrapper: React.FC<SingleInputWrapperProps> = ({ children, title }) => (
  <HStack alignItems='baseline'>
    <HStack basis={1} justifyContent='end' grow={1}>
      <Text color={accentColor} size={20}>{title}</Text>
    </HStack>

    <Spacer width={12} />

    <HStack basis={1} grow={1}>
      {children}
    </HStack>
  </HStack>
)

interface SelectProps<T extends FieldValues> {
  fontSize?: number
  form: UseFormReturn<T>
  name: Path<T>
  options: ReadonlyArray<{ name?: string, value: string }>
}

function Select<T extends FieldValues> ({ fontSize, form, name, options }: SelectProps<T>): JSX.Element {
  return (
    <select {...form.register(name)} style={{ borderStyle: 'none', borderBottomColor: '#ccc', borderBottomStyle: 'solid', borderBottomWidth: 1, fontSize, flexGrow: 1 }}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>{option.name ?? option.value}</option>
      ))}
    </select>
  )
}

interface TextInputProps<T extends FieldValues> {
  fontSize?: number
  form: UseFormReturn<T>
  multiline?: boolean
  name: Path<T>
}

function TextInput<T extends FieldValues> ({ fontSize, form, multiline, name }: TextInputProps<T>): JSX.Element {
  return (multiline ?? false) ? (
    <textarea {...form.register(name)} rows={5} style={{ borderStyle: 'none', borderBottomColor: '#ccc', borderBottomStyle: 'solid', borderBottomWidth: 1, flexGrow: 1, fontSize, WebkitAppearance: 'none' }} />
  ) : (
    <input {...form.register(name)} style={{ borderStyle: 'none', borderBottomColor: '#ccc', borderBottomStyle: 'solid', borderBottomWidth: 1, flexGrow: 1, fontSize, WebkitAppearance: 'none' }} />
  )
}

interface ConcentrationInputProps<T extends FieldValues> {
  fontSize?: number
  form: UseFormReturn<T>
  name: Path<T>
}

function ConcentrationInput<T extends FieldValues> ({ fontSize, form, name }: ConcentrationInputProps<T>): JSX.Element {
  return (
    <>
      <input {...form.register(`${name}.value` as any, { valueAsNumber: true })} type='number' style={{ borderStyle: 'none', borderBottomColor: '#ccc', borderBottomStyle: 'solid', borderBottomWidth: 1, fontSize, flexGrow: 1, WebkitAppearance: 'none' }} />
      <Select fontSize={fontSize} form={form} name={`${name}.unit` as any} options={concentrationUnitOptions} />
    </>
  )
}

interface GravityInputProps<T extends FieldValues> {
  fontSize?: number
  form: UseFormReturn<T>
  name: Path<T>
}

function GravityInput<T extends FieldValues> ({ fontSize, form, name }: GravityInputProps<T>): JSX.Element {
  return (
    <>
      <input {...form.register(`${name}.value` as any, { valueAsNumber: true })} step={0.001} type='number' style={{ borderStyle: 'none', borderBottomColor: '#ccc', borderBottomStyle: 'solid', borderBottomWidth: 1, fontSize, flexGrow: 1, WebkitAppearance: 'none' }} />
      <Select fontSize={fontSize} form={form} name={`${name}.unit` as any} options={gravityUnitOptions} />
    </>
  )
}

interface TimeInputProps<T extends FieldValues> {
  fontSize?: number
  form: UseFormReturn<T>
  name: Path<T>
}

function TimeInput<T extends FieldValues> ({ fontSize, form, name }: TimeInputProps<T>): JSX.Element {
  return (
    <>
      <input {...form.register(`${name}.value` as any, { valueAsNumber: true })} type='number' style={{ borderStyle: 'none', borderBottomColor: '#ccc', borderBottomStyle: 'solid', borderBottomWidth: 1, fontSize, flexGrow: 1, WebkitAppearance: 'none' }} />
      <Select fontSize={fontSize} form={form} name={`${name}.unit` as any} options={timeUnitOptions} />
    </>
  )
}

interface TemperatureInputProps<T extends FieldValues> {
  fontSize?: number
  form: UseFormReturn<T>
  name: Path<T>
}

function TemperatureInput<T extends FieldValues> ({ fontSize, form, name }: TemperatureInputProps<T>): JSX.Element {
  return (
    <>
      <input {...form.register(`${name}.value` as any, { valueAsNumber: true })} type='number' style={{ borderStyle: 'none', borderBottomColor: '#ccc', borderBottomStyle: 'solid', borderBottomWidth: 1, fontSize, flexGrow: 1, WebkitAppearance: 'none' }} />
      <Select fontSize={fontSize} form={form} name={`${name}.unit` as any} options={temperatureUnitOptions} />
    </>
  )
}

interface UseInputProps<T extends FieldValues> {
  fontSize?: number
  form: UseFormReturn<T>
  name: Path<T>
}

function UseInput<T extends FieldValues> ({ fontSize, form, name }: UseInputProps<T>): JSX.Element {
  return (
    <Select
      fontSize={fontSize}
      form={form}
      name={name}
      options={[
        { name: 'Add to mash', value: 'add_to_mash' },
        { name: 'Add to boil', value: 'add_to_boil' },
        { name: 'Add to fermentation', value: 'add_to_fermentation' },
        { name: 'Add to package', value: 'add_to_package' }
      ]}
    />
  )
}

interface MassOrVolumeInputProps<T extends FieldValues> {
  fontSize?: number
  form: UseFormReturn<T>
  name: Path<T>
}

function MassOrVolumeInput<T extends FieldValues> ({ fontSize, form, name }: MassOrVolumeInputProps<T>): JSX.Element {
  return (
    <>
      <input {...form.register(`${name}.value` as any, { valueAsNumber: true })} type='number' style={{ borderStyle: 'none', borderBottomColor: '#ccc', borderBottomStyle: 'solid', borderBottomWidth: 1, fontSize, flexGrow: 1, WebkitAppearance: 'none' }} />
      <Select fontSize={fontSize} form={form} name={`${name}.unit` as any} options={[...volumeUnitOptions, ...massUnitOptions]} />
    </>
  )
}

interface MassOrUnitOrVolumeInputProps<T extends FieldValues> {
  fontSize?: number
  form: UseFormReturn<T>
  name: Path<T>
}

function MassOrUnitOrVolumeInput<T extends FieldValues> ({ fontSize, form, name }: MassOrUnitOrVolumeInputProps<T>): JSX.Element {
  return (
    <>
      <input {...form.register(`${name}.value` as any, { valueAsNumber: true })} type='number' style={{ borderStyle: 'none', borderBottomColor: '#ccc', borderBottomStyle: 'solid', borderBottomWidth: 1, fontSize, flexGrow: 1, WebkitAppearance: 'none' }} />
      <Select fontSize={fontSize} form={form} name={`${name}.unit` as any} options={[...volumeUnitOptions, ...massUnitOptions, ...unitUnitOptions]} />
    </>
  )
}

interface VolumeInputProps<T extends FieldValues> {
  fontSize?: number
  form: UseFormReturn<T>
  name: Path<T>
}

function VolumeInput<T extends FieldValues> ({ fontSize, form, name }: VolumeInputProps<T>): JSX.Element {
  return (
    <>
      <input {...form.register(`${name}.value` as any, { valueAsNumber: true })} type='number' style={{ borderStyle: 'none', borderBottomColor: '#ccc', borderBottomStyle: 'solid', borderBottomWidth: 1, fontSize, flexGrow: 1, WebkitAppearance: 'none' }} />
      <Select fontSize={fontSize} form={form} name={`${name}.unit` as any} options={volumeUnitOptions} />
    </>
  )
}

const App: React.FC = () => {
  const [data, setData] = useState<BeerJSON.BeerJSON>()

  const handleChange = (ev: ChangeEvent<HTMLInputElement>): void => {
    if (ev.target.files?.[0] == null) return

    const reader = new FileReader()

    reader.onload = (event) => {
      if (event.target?.result != null) setData(JSON.parse(event.target.result as string).beerjson)
    }

    reader.readAsText(ev.target.files[0])
  }

  if (data == null) {
    return (
      <VStack padding={16}>
        <HStack padding={16}>
          Load file:
          <input type='file' onChange={handleChange} />
        </HStack>

        <HStack padding={16}>
          New file: <button onClick={() => setData({ version: 1, recipes: [recipeTemplate as any] })}>Create Recipe</button>
        </HStack>
      </VStack>
    )
  }

  if (data.version !== 1) {
    return <Error>Unsupported BeerJSON version: {data.version}</Error>
  }

  if (data.recipes?.length !== 1) {
    return <Error>File doesn't contain exactly one recipe</Error>
  }

  return <RecipeEditor recipe={data.recipes[0]} />
}

const RecipeEditor: React.FC<{ recipe: BeerJSON.RecipeType }> = ({ recipe }) => {
  const form = useForm<BeerJSON.RecipeType>({ defaultValues: recipe })

  const fermentables = useFieldArray({ control: form.control, name: 'ingredients.fermentable_additions' })
  const hops = useFieldArray({ control: form.control, name: 'ingredients.hop_additions' })
  const miscellaneous = useFieldArray({ control: form.control, name: 'ingredients.miscellaneous_additions' })
  const cultures = useFieldArray({ control: form.control, name: 'ingredients.culture_additions' })
  const mashSteps = useFieldArray({ control: form.control, name: 'mash.mash_steps' })

  const [abvSummary, setAbvSummary] = useState(calculateABV(recipe))
  const [fermentablesSummary, setFermentablesSummary] = useState('')
  const [hopsSummary, setHopsSummary] = useState('')

  form.watch((values, info) => {
    if ((info.name?.startsWith('original_gravity') ?? false) || (info.name?.startsWith('final_gravity') ?? false)) {
      setAbvSummary(calculateABV(values))
    }

    if (info.name?.startsWith('ingredients.fermentable_additions') ?? false) {
      setFermentablesSummary(summarizeFermentables(values?.ingredients?.fermentable_additions as any ?? []))
    }

    if (info.name?.startsWith('ingredients.hop_additions') ?? false) {
      setHopsSummary(summarizeHops(values?.ingredients?.hop_additions as any ?? [], { batchSize: values?.batch_size as any, originalGravity: values?.original_gravity as any }))
    }
  })

  const handleSave = (): void => {
    const recipe = form.getValues()
    let data = JSON.stringify({ beerjson: { version: 1, recipes: [recipe] } }, null, 2) + '\n'

    // 🙈
    data = data.replace(/("unit": "sg",\s+"value": 1.\d\d)(\s)/gm, (_, head: string, tail: string) => `${head}0${tail}`)

    const a = document.createElement('a')

    a.download = `${slugify(recipe.name)}.json`
    a.href = `data:application/json;charset=utf-8,${encodeURIComponent(data)}`
    a.style.display = 'none'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <VStack maxWidth={700} padding={16}>
      <Spacer height={16} />
      <Text size={24}>Info</Text>
      <Spacer height={16} />

      <SingleInputWrapper title='Name'><TextInput fontSize={20} form={form} name='name' /></SingleInputWrapper>
      <SingleInputWrapper title='Type'><Select fontSize={20} form={form} name='type' options={recipeTypeOptions} /></SingleInputWrapper>
      <SingleInputWrapper title='Author'><TextInput fontSize={20} form={form} name='author' /></SingleInputWrapper>
      <SingleInputWrapper title='Created'><TextInput fontSize={20} form={form} name='created' /></SingleInputWrapper>
      <SingleInputWrapper title='Style'>
        <FancySelect
          defaultValue={formatStyle(recipe.style ?? { style_guide: 'BJCP 2015', type: 'beer', name: '' })}
          onChange={(selected) => {
            const parsed = selected == null ? null : parseStyle(selected.value)

            form.setValue('style.category_number', parsed?.category_number ?? undefined)
            form.setValue('style.name', parsed?.name ?? '')
            form.setValue('style.style_guide', parsed?.style_guide ?? '')
            form.setValue('style.style_letter', parsed?.style_letter ?? '')
            form.setValue('style.type', parsed?.type ?? 'beer')
          }}
          options={styles.map(item => formatStyle(item))}
          styles={{ container: base => ({ flexGrow: 1, ...base }) }}
        />
      </SingleInputWrapper>
      <SingleInputWrapper title='Batch Size'><VolumeInput fontSize={20} form={form} name='batch_size' /></SingleInputWrapper>
      <SingleInputWrapper title='Original Gravity'><GravityInput fontSize={20} form={form} name='original_gravity' /></SingleInputWrapper>
      <SingleInputWrapper title='Final Gravity'><GravityInput fontSize={20} form={form} name='final_gravity' /></SingleInputWrapper>
      <SingleInputWrapper title='ABV'><Text size={20}>{abvSummary}</Text></SingleInputWrapper>
      <SingleInputWrapper title='Notes'><TextInput fontSize={20} form={form} multiline name='notes' /></SingleInputWrapper>

      <Spacer height={16} />
      <Text size={24}>Fermentables</Text>
      <Spacer height={16} />

      <table>
        <thead>
          <tr>
            <th>type</th>
            <th>name</th>
            <th>producer</th>
            <th>amount</th>
            <th />
          </tr>
        </thead>

        <tbody>
          {fermentables.fields.map((item, index) => (
            <tr key={item.id}>
              <td colSpan={3}>
                <FancySelect
                  defaultValue={formatFermentable(item)}
                  onChange={(selected) => {
                    const parsed = selected == null ? null : parseFermentable(selected.value)

                    form.setValue(`ingredients.fermentable_additions.${index}.type`, parsed?.type ?? ('' as any))
                    form.setValue(`ingredients.fermentable_additions.${index}.name`, parsed?.name ?? '')
                    form.setValue(`ingredients.fermentable_additions.${index}.producer`, parsed?.producer ?? '')
                  }}
                  options={fermentableAdditions.map(item => formatFermentable(item))}
                />
              </td>
              <td><HStack><MassOrVolumeInput form={form} name={`ingredients.fermentable_additions.${index}.amount`} /></HStack></td>
              <td><button onClick={() => fermentables.remove(index)}>Delete</button></td>
            </tr>
          ))}

          <tr>
            <td colSpan={3} style={{ textAlign: 'center' }}>
              <button onClick={() => fermentables.append({ name: '', amount: { unit: 'g' } } as any)}>Add fermentable</button>
            </td>
            <td colSpan={2}>
              {fermentablesSummary}
            </td>
          </tr>
        </tbody>
      </table>

      <Spacer height={16} />
      <Text size={24}>Hops</Text>
      <Spacer height={16} />

      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>timing - use</th>
            <th>timing - duration</th>
            <th>amount</th>
            <th />
          </tr>
        </thead>

        <tbody>
          {hops.fields.map((item, index) => (
            <tr key={item.id}>
              <td style={{ minWidth: 300 }}>
                <FancySelect
                  defaultValue={formatHop(item)}
                  onChange={(selected) => {
                    const parsed = selected == null ? null : parseHop(selected.value)

                    form.setValue(`ingredients.hop_additions.${index}.name`, parsed?.name ?? '')
                    form.setValue(`ingredients.hop_additions.${index}.form`, parsed?.form ?? ('' as any))
                    form.setValue(`ingredients.hop_additions.${index}.alpha_acid.unit`, parsed?.alpha_acid?.unit ?? '%')
                    form.setValue(`ingredients.hop_additions.${index}.alpha_acid.value`, parsed?.alpha_acid?.value ?? ('' as any))
                    form.setValue(`ingredients.hop_additions.${index}.origin`, parsed?.origin ?? '')
                    form.setValue(`ingredients.hop_additions.${index}.year`, parsed?.year ?? '')
                  }}
                  options={hopAdditions.map(item => formatHop(item))}
                />
              </td>
              <td><UseInput form={form} name={`ingredients.hop_additions.${index}.timing.use`} /></td>
              <td><TimeInput form={form} name={`ingredients.hop_additions.${index}.timing.duration`} /></td>
              <td><MassOrVolumeInput form={form} name={`ingredients.hop_additions.${index}.amount`} /></td>
              <td><button onClick={() => hops.remove(index)}>Delete</button></td>
            </tr>
          ))}

          <tr>
            <td style={{ textAlign: 'center' }}>
              <button onClick={() => hops.append({ name: '', timing: { duration: { unit: 'min' }, use: 'add_to_boil' }, amount: { unit: 'g' } } as any)}>Add hop</button>
            </td>
            <td colSpan={3}>
              {hopsSummary}
            </td>
          </tr>
        </tbody>
      </table>

      <Spacer height={16} />
      <Text size={24}>Miscellaneous</Text>
      <Spacer height={16} />

      <table>
        <thead>
          <tr>
            <th>type</th>
            <th>name</th>
            <th>timing - use</th>
            <th>timing - duration</th>
            <th>amount</th>
            <th />
          </tr>
        </thead>

        <tbody>
          {miscellaneous.fields.map((item, index) => (
            <tr key={item.id}>
              <td colSpan={2} style={{ minWidth: 200 }}>
                <FancySelect
                  defaultValue={formatMiscellaneous(item)}
                  onChange={(selected) => {
                    const parsed = selected == null ? null : parseMiscellaneous(selected.value)

                    form.setValue(`ingredients.miscellaneous_additions.${index}.type`, parsed?.type ?? ('' as any))
                    form.setValue(`ingredients.miscellaneous_additions.${index}.name`, parsed?.name ?? '')
                  }}
                  options={miscellaneousAdditions.map(item => formatMiscellaneous(item))}
                />
              </td>
              <td><UseInput form={form} name={`ingredients.miscellaneous_additions.${index}.timing.use`} /></td>
              <td><TimeInput form={form} name={`ingredients.miscellaneous_additions.${index}.timing.duration`} /></td>
              <td><MassOrUnitOrVolumeInput form={form} name={`ingredients.miscellaneous_additions.${index}.amount`} /></td>
              <td><button onClick={() => miscellaneous.remove(index)}>Delete</button></td>
            </tr>
          ))}

          <tr>
            <td colSpan={5} style={{ textAlign: 'center' }}>
              <button onClick={() => miscellaneous.append({ name: '', timing: { duration: { unit: 'min' }, use: 'add_to_boil' }, amount: { unit: 'ml' } } as any)}>Add miscellaneous</button>
            </td>
          </tr>
        </tbody>
      </table>

      <Spacer height={16} />
      <Text size={24}>Culture</Text>
      <Spacer height={16} />

      <table>
        <thead>
          <tr>
            <th>type</th>
            <th>form</th>
            <th>name</th>
            <th>producer</th>
            <th>amount</th>
            <th />
          </tr>
        </thead>

        <tbody>
          {cultures.fields.map((item, index) => (
            <tr key={item.id}>
              <td colSpan={4}>
                <FancySelect
                  defaultValue={formatCulture(item)}
                  onChange={(selected) => {
                    const parsed = selected == null ? null : parseCulture(selected.value)

                    form.setValue(`ingredients.culture_additions.${index}.type`, parsed?.type ?? ('' as any))
                    form.setValue(`ingredients.culture_additions.${index}.name`, parsed?.name ?? '')
                    form.setValue(`ingredients.culture_additions.${index}.form`, parsed?.form ?? ('' as any))
                    form.setValue(`ingredients.culture_additions.${index}.producer`, parsed?.producer ?? '')
                  }}
                  options={cultureAdditions.map(item => formatCulture(item))}
                />
              </td>
              <td><MassOrUnitOrVolumeInput form={form} name={`ingredients.culture_additions.${index}.amount`} /></td>
              <td><button onClick={() => cultures.remove(index)}>Delete</button></td>
            </tr>
          ))}

          <tr>
            <td colSpan={5} style={{ textAlign: 'center' }}>
              <button onClick={() => cultures.append({ name: '', amount: { unit: 'g' } } as any)}>Add culture</button>
            </td>
          </tr>
        </tbody>
      </table>

      <Spacer height={16} />
      <Text size={24}>Water</Text>
      <Spacer height={16} />

      <table>
        <tbody>
          <tr>
            <td>Name</td>
            <td><TextInput form={form} name='ingredients.water_additions.0.name' /></td>
          </tr>
          <tr>
            <td>Ca<sup>+2</sup></td>
            <td><ConcentrationInput form={form} name='ingredients.water_additions.0.calcium' /></td>
          </tr>
          <tr>
            <td>Mg<sup>+2</sup></td>
            <td><ConcentrationInput form={form} name='ingredients.water_additions.0.magnesium' /></td>
          </tr>
          <tr>
            <td>SO<sub>4</sub><sup>-2</sup></td>
            <td><ConcentrationInput form={form} name='ingredients.water_additions.0.sulfate' /></td>
          </tr>
          <tr>
            <td>Na<sup>+</sup></td>
            <td><ConcentrationInput form={form} name='ingredients.water_additions.0.sodium' /></td>
          </tr>
          <tr>
            <td>Cl<sup>-</sup></td>
            <td><ConcentrationInput form={form} name='ingredients.water_additions.0.chloride' /></td>
          </tr>
          <tr>
            <td>HCO<sub>3</sub><sup>-</sup></td>
            <td><ConcentrationInput form={form} name='ingredients.water_additions.0.bicarbonate' /></td>
          </tr>
        </tbody>
      </table>

      <Spacer height={16} />
      <Text size={24}>Mash, Boil &amp; Fermentation</Text>
      <Spacer height={16} />

      <table>
        <thead>
          <tr>
            <th>type</th>
            <th>amount</th>
            <th>temperature</th>
            <th>time</th>
          </tr>
        </thead>

        <tbody>
          {mashSteps.fields.map((item, index) => (
            <React.Fragment key={item.id}>
              {item.type !== 'sparge' ? null : (
                <tr key='add'>
                  <td colSpan={4} style={{ textAlign: 'center' }}>
                    <button onClick={() => mashSteps.insert(index, { type: 'temperature', step_temperature: { value: '', unit: 'C' }, step_time: { value: '', unit: 'min' } } as any)}>Add mash temperature step</button>
                  </td>
                </tr>
              )}

              <tr>
                <td>{item.type}</td>
                <td>{item.type === 'temperature' ? null : <VolumeInput form={form} name={`mash.mash_steps.${index}.amount`} />}</td>
                <td><TemperatureInput form={form} name={`mash.mash_steps.${index}.step_temperature`} /></td>
                <td><TimeInput form={form} name={`mash.mash_steps.${index}.step_time`} /></td>

                {item.type !== 'temperature' ? null : (
                  <td><button onClick={() => mashSteps.remove(index)}>Delete</button></td>
                )}
              </tr>
            </React.Fragment>
          ))}

          <tr>
            <td>boil</td>
            <td />
            <td />
            <td><TimeInput form={form} name='boil.boil_time' /></td>
          </tr>

          <tr>
            <td>fermentation</td>
            <td />
            <td><TemperatureInput form={form} name='fermentation.fermentation_steps.0.start_temperature' /></td>
            <td />
          </tr>
        </tbody>
      </table>

      <button onClick={handleSave}>Save</button>
    </VStack>
  )
}

export default App
