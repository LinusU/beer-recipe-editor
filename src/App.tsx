// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="@beerjson/beerjson/types/ts/beerjson" />

import dotProp from 'dot-prop-immutable'
import React, { ChangeEvent, useState } from 'react'
import FancySelect from 'react-select'
import Spacer from 'react-spacer'
import { HStack, Text, VStack } from 'react-stacked'
import weakKey from 'weak-key'

import { cultureAdditions, fermentableAdditions, formatCulture, formatFermentable, formatHop, formatMiscellaneous, hopAdditions, miscellaneousAdditions } from './data'

const accentColor = '#FB8B24'

const gravityUnitOptions = [{ value: 'sg' }, { value: 'plato' }, { value: 'brix' }]
const massUnitOptions = [{ value: 'mg' }, { value: 'g' }, { value: 'kg' }, { value: 'lb' }, { value: 'oz' }]
const recipeTypeOptions = [{ value: 'cider' }, { value: 'kombucha' }, { value: 'soda' }, { value: 'other' }, { value: 'mead' }, { value: 'wine' }, { value: 'extract' }, { value: 'partial mash' }, { value: 'all grain' }]
const temperatureUnitOptions = [{ value: 'C' }, { value: 'F' }]
const timeUnitOptions = [{ value: 'sec' }, { value: 'min' }, { value: 'hr' }, { value: 'day' }, { value: 'week' }]
const unitUnitOptions = [{ value: '1' }, { value: 'unit' }, { value: 'each' }, { value: 'dimensionless' }, { value: 'pkg' }]
const volumeUnitOptions = [{ value: 'ml' }, { value: 'l' }, { value: 'tsp' }, { value: 'tbsp' }, { value: 'floz' }, { value: 'cup' }, { value: 'pt' }, { value: 'qt' }, { value: 'gal' }, { value: 'bbl' }, { value: 'ifloz' }, { value: 'ipt' }, { value: 'iqt' }, { value: 'igal' }, { value: 'ibbl' }]

const Error: React.FC = ({ children }) => (
  <div style={{ padding: 10, borderColor: 'red', borderWidth: 2 }}>{children}</div>
)

interface SingleInputWrapperProps {
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

interface SelectProps {
  fontSize?: number
  options: ReadonlyArray<{ name?: string, value: string }>
  selected?: string
}

const Select: React.FC<SelectProps> = ({ fontSize, options, selected }) => (
  <select style={{ borderStyle: 'none', borderBottomColor: '#ccc', borderBottomStyle: 'solid', borderBottomWidth: 1, fontSize, flexGrow: 1 }}>
    {options.map((option) => (
      <option key={option.value} selected={option.value === selected}>{option.name ?? option.value}</option>
    ))}
  </select>
)

interface TextInputProps {
  fontSize?: number
  multiline?: boolean
  value?: string
}

const TextInput: React.FC<TextInputProps> = ({ fontSize, multiline, value }) => (
  (multiline ?? false) ? (
    <textarea rows={5} style={{ borderStyle: 'none', borderBottomColor: '#ccc', borderBottomStyle: 'solid', borderBottomWidth: 1, flexGrow: 1, fontSize, WebkitAppearance: 'none' }}>{value}</textarea>
  ) : (
    <input style={{ borderStyle: 'none', borderBottomColor: '#ccc', borderBottomStyle: 'solid', borderBottomWidth: 1, flexGrow: 1, fontSize, WebkitAppearance: 'none' }} value={value} />
  )
)

interface GravityInputProps {
  fontSize?: number
  value?: BeerJSON.GravityType
}

const GravityInput: React.FC<GravityInputProps> = ({ fontSize, value }) => (
  <>
    <input type='number' style={{ borderStyle: 'none', borderBottomColor: '#ccc', borderBottomStyle: 'solid', borderBottomWidth: 1, fontSize, flexGrow: 1, WebkitAppearance: 'none' }} value={value?.value} />
    <Select fontSize={fontSize} options={gravityUnitOptions} selected={value?.unit} />
  </>
)

interface PercentInputProps {
  fontSize?: number
  value?: BeerJSON.PercentType
}

const PercentInput: React.FC<PercentInputProps> = ({ fontSize, value }) => (
  <>
    <input type='number' style={{ borderStyle: 'none', borderBottomColor: '#ccc', borderBottomStyle: 'solid', borderBottomWidth: 1, fontSize, flexGrow: 1, WebkitAppearance: 'none' }} value={value?.value} />
    <Select fontSize={fontSize} options={[{ value: '%' }]} selected={value?.unit} />
  </>
)

interface TimeInputProps {
  fontSize?: number
  value?: BeerJSON.TimeType
}

const TimeInput: React.FC<TimeInputProps> = ({ fontSize, value }) => (
  <>
    <input type='number' style={{ borderStyle: 'none', borderBottomColor: '#ccc', borderBottomStyle: 'solid', borderBottomWidth: 1, fontSize, flexGrow: 1, WebkitAppearance: 'none' }} value={value?.value} />
    <Select fontSize={fontSize} options={timeUnitOptions} selected={value?.unit} />
  </>
)

interface TemperatureInputProps {
  fontSize?: number
  value?: BeerJSON.TemperatureType
}

const TemperatureInput: React.FC<TemperatureInputProps> = ({ fontSize, value }) => (
  <>
    <input type='number' style={{ borderStyle: 'none', borderBottomColor: '#ccc', borderBottomStyle: 'solid', borderBottomWidth: 1, fontSize, flexGrow: 1, WebkitAppearance: 'none' }} value={value?.value} />
    <Select fontSize={fontSize} options={temperatureUnitOptions} selected={value?.unit} />
  </>
)

interface UseInputProps {
  fontSize?: number
  value?: BeerJSON.UseType
}

const UseInput: React.FC<UseInputProps> = ({ fontSize, value }) => (
  <Select
    fontSize={fontSize}
    options={[
      { name: 'Add to mash', value: 'add_to_mash' },
      { name: 'Add to boil', value: 'add_to_boil' },
      { name: 'Add to fermentation', value: 'add_to_fermentation' },
      { name: 'Add to package', value: 'add_to_package' }
    ]}
    selected={value}
  />
)

interface MassOrVolumeInputProps {
  fontSize?: number
  value?: BeerJSON.MassType | BeerJSON.VolumeType
}

const MassOrVolumeInput: React.FC<MassOrVolumeInputProps> = ({ fontSize, value }) => (
  <>
    <input type='number' style={{ borderStyle: 'none', borderBottomColor: '#ccc', borderBottomStyle: 'solid', borderBottomWidth: 1, fontSize, flexGrow: 1, WebkitAppearance: 'none' }} value={value?.value} />
    <Select fontSize={fontSize} options={[...volumeUnitOptions, ...massUnitOptions]} selected={value?.unit} />
  </>
)

interface MassOrUnitOrVolumeInputProps {
  fontSize?: number
  value?: BeerJSON.MassType | BeerJSON.UnitType | BeerJSON.VolumeType
}

const MassOrUnitOrVolumeInput: React.FC<MassOrUnitOrVolumeInputProps> = ({ fontSize, value }) => (
  <>
    <input type='number' style={{ borderStyle: 'none', borderBottomColor: '#ccc', borderBottomStyle: 'solid', borderBottomWidth: 1, fontSize, flexGrow: 1, WebkitAppearance: 'none' }} value={value?.value} />
    <Select fontSize={fontSize} options={[...volumeUnitOptions, ...massUnitOptions, ...unitUnitOptions]} selected={value?.unit} />
  </>
)

interface VolumeInputProps {
  fontSize?: number
  value?: BeerJSON.VolumeType
}

const VolumeInput: React.FC<VolumeInputProps> = ({ fontSize, value }) => (
  <>
    <input type='number' style={{ borderStyle: 'none', borderBottomColor: '#ccc', borderBottomStyle: 'solid', borderBottomWidth: 1, fontSize, flexGrow: 1, WebkitAppearance: 'none' }} value={value?.value} />
    <Select fontSize={fontSize} options={volumeUnitOptions} selected={value?.unit} />
  </>
)

function addCulture (input: BeerJSON.BeerJSON | undefined): BeerJSON.BeerJSON | undefined {
  if (input?.recipes?.[0].ingredients?.culture_additions == null) return input

  const list = [...input.recipes[0].ingredients.culture_additions]
  list.push({ name: '', amount: { unit: 'g' } } as any)

  return dotProp.set(input, 'recipes.0.ingredients.culture_additions', list)
}

function deleteCulture (input: BeerJSON.BeerJSON | undefined, index: number): BeerJSON.BeerJSON | undefined {
  if (input?.recipes?.[0].ingredients?.culture_additions == null) return input

  const list = [...input.recipes[0].ingredients.culture_additions]
  list.splice(index, 1)

  return dotProp.set(input, 'recipes.0.ingredients.culture_additions', list)
}

function addFermentable (input: BeerJSON.BeerJSON | undefined): BeerJSON.BeerJSON | undefined {
  if (input?.recipes?.[0].ingredients?.fermentable_additions == null) return input

  const list = [...input.recipes[0].ingredients.fermentable_additions]
  list.push({ name: '', amount: { unit: 'g' } } as any)

  return dotProp.set(input, 'recipes.0.ingredients.fermentable_additions', list)
}

function deleteFermentable (input: BeerJSON.BeerJSON | undefined, index: number): BeerJSON.BeerJSON | undefined {
  if (input?.recipes?.[0].ingredients?.fermentable_additions == null) return input

  const list = [...input.recipes[0].ingredients.fermentable_additions]
  list.splice(index, 1)

  return dotProp.set(input, 'recipes.0.ingredients.fermentable_additions', list)
}

function addHop (input: BeerJSON.BeerJSON | undefined): BeerJSON.BeerJSON | undefined {
  if (input?.recipes?.[0].ingredients?.hop_additions == null) return input

  const list = [...input.recipes[0].ingredients.hop_additions]
  list.push({ name: '', timing: { duration: { unit: 'min' }, use: 'add_to_boil' }, amount: { unit: 'g' } } as any)

  return dotProp.set(input, 'recipes.0.ingredients.hop_additions', list)
}

function deleteHop (input: BeerJSON.BeerJSON | undefined, index: number): BeerJSON.BeerJSON | undefined {
  if (input?.recipes?.[0].ingredients?.hop_additions == null) return input

  const list = [...input.recipes[0].ingredients.hop_additions]
  list.splice(index, 1)

  return dotProp.set(input, 'recipes.0.ingredients.hop_additions', list)
}

function addMashStep (input: BeerJSON.BeerJSON | undefined): BeerJSON.BeerJSON | undefined {
  if (input?.recipes?.[0].mash?.mash_steps == null) return input

  const spargeIndex = input.recipes[0].mash.mash_steps.findIndex(item => item.type === 'sparge')
  if (spargeIndex == null) return input

  const list = [...input.recipes[0].mash.mash_steps]
  list.splice(spargeIndex, 0, { type: 'temperature', step_temperature: { unit: 'C' }, step_time: { unit: 'min' } } as any)

  return dotProp.set(input, 'recipes.0.mash.mash_steps', list)
}

function deleteMashStep (input: BeerJSON.BeerJSON | undefined, index: number): BeerJSON.BeerJSON | undefined {
  if (input?.recipes?.[0].mash?.mash_steps == null) return input

  const list = [...input.recipes[0].mash.mash_steps]
  list.splice(index, 1)

  return dotProp.set(input, 'recipes.0.mash.mash_steps', list)
}

function addMiscellaneous (input: BeerJSON.BeerJSON | undefined): BeerJSON.BeerJSON | undefined {
  if (input?.recipes?.[0].ingredients?.miscellaneous_additions == null) return input

  const list = [...input.recipes[0].ingredients.miscellaneous_additions]
  list.push({ name: '', timing: { duration: { unit: 'min' }, use: 'add_to_boil' }, amount: { unit: 'ml' } } as any)

  return dotProp.set(input, 'recipes.0.ingredients.miscellaneous_additions', list)
}

function deleteMiscellaneous (input: BeerJSON.BeerJSON | undefined, index: number): BeerJSON.BeerJSON | undefined {
  if (input?.recipes?.[0].ingredients?.miscellaneous_additions == null) return input

  const list = [...input.recipes[0].ingredients.miscellaneous_additions]
  list.splice(index, 1)

  return dotProp.set(input, 'recipes.0.ingredients.miscellaneous_additions', list)
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
      <div>
        Load file:
        <input type='file' onChange={handleChange} />
      </div>
    )
  }

  if (data.version !== 1) {
    return <Error>Unsupported BeerJSON version: {data.version}</Error>
  }

  if (data.recipes?.length !== 1) {
    return <Error>File doesn't contain exactly one recipe</Error>
  }

  const recipe = data.recipes[0]

  return (
    <VStack maxWidth={700} padding={16}>
      <Spacer height={16} />
      <Text size={24}>Info</Text>
      <Spacer height={16} />

      <SingleInputWrapper title='Name'><TextInput fontSize={20} value={recipe.name} /></SingleInputWrapper>
      <SingleInputWrapper title='Type'><Select fontSize={20} options={recipeTypeOptions} selected={recipe.type} /></SingleInputWrapper>
      <SingleInputWrapper title='Author'><TextInput fontSize={20} value={recipe.author} /></SingleInputWrapper>
      <SingleInputWrapper title='Created'><TextInput fontSize={20} value={recipe.created} /></SingleInputWrapper>
      <SingleInputWrapper title='Style'><TextInput fontSize={20} value={recipe.style?.name} /></SingleInputWrapper>
      <SingleInputWrapper title='Batch Size'><VolumeInput fontSize={20} value={recipe.batch_size} /></SingleInputWrapper>
      <SingleInputWrapper title='Original Gravity'><GravityInput fontSize={20} value={recipe.original_gravity} /></SingleInputWrapper>
      <SingleInputWrapper title='Final Gravity'><GravityInput fontSize={20} value={recipe.final_gravity} /></SingleInputWrapper>
      <SingleInputWrapper title='Notes'><TextInput fontSize={20} multiline value={recipe.notes} /></SingleInputWrapper>

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
          {recipe.ingredients.fermentable_additions.map((item, index) => (
            <tr key={weakKey(item)}>
              <td colSpan={3}>
                <FancySelect
                  options={fermentableAdditions.map(item => formatFermentable(item))}
                  value={formatFermentable(item)}
                />
              </td>
              <td><HStack><MassOrVolumeInput value={item.amount} /></HStack></td>
              <td><button onClick={() => setData(data => deleteFermentable(data, index))}>Delete</button></td>
            </tr>
          ))}

          <tr>
            <td colSpan={4} style={{ textAlign: 'center' }}>
              <button onClick={() => setData(addFermentable)}>Add fermentable</button>
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
            <th>alpha acid</th>
            <th>year</th>
            <th>origin</th>
            <th />
          </tr>
        </thead>

        <tbody>
          {recipe.ingredients.hop_additions?.map((item, index) => (
            <tr key={weakKey(item)}>
              <td style={{ minWidth: 200 }}>
                <FancySelect
                  options={hopAdditions.map(item => formatHop(item))}
                  value={formatHop(item)}
                />
              </td>
              <td><UseInput value={item.timing?.use} /></td>
              <td><TimeInput value={item.timing?.duration} /></td>
              <td><MassOrVolumeInput value={item.amount} /></td>
              <td><PercentInput value={item.alpha_acid} /></td>
              <td><TextInput value={item.year} /></td>
              <td><TextInput value={item.origin} /></td>
              <td><button onClick={() => setData(data => deleteHop(data, index))}>Delete</button></td>
            </tr>
          ))}

          <tr>
            <td colSpan={7} style={{ textAlign: 'center' }}>
              <button onClick={() => setData(addHop)}>Add hop</button>
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
          {recipe.ingredients.miscellaneous_additions?.map((item, index) => (
            <tr key={weakKey(item)}>
              <td colSpan={2} style={{ minWidth: 200 }}>
                <FancySelect
                  options={miscellaneousAdditions.map(item => formatMiscellaneous(item))}
                  value={formatMiscellaneous(item)}
                />
              </td>
              <td><UseInput value={item.timing?.use} /></td>
              <td><TimeInput value={item.timing?.duration} /></td>
              <td><MassOrUnitOrVolumeInput value={item.amount} /></td>
              <td><button onClick={() => setData(data => deleteMiscellaneous(data, index))}>Delete</button></td>
            </tr>
          ))}

          <tr>
            <td colSpan={5} style={{ textAlign: 'center' }}>
              <button onClick={() => setData(addMiscellaneous)}>Add miscellaneous</button>
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
          {recipe.ingredients.culture_additions?.map((item, index) => (
            <tr key={weakKey(item)}>
              <td colSpan={4}>
                <FancySelect
                  options={cultureAdditions.map(item => formatCulture(item))}
                  value={formatCulture(item)}
                />
              </td>
              <td><MassOrUnitOrVolumeInput value={item.amount} /></td>
              <td><button onClick={() => setData(data => deleteCulture(data, index))}>Delete</button></td>
            </tr>
          ))}

          <tr>
            <td colSpan={5} style={{ textAlign: 'center' }}>
              <button onClick={() => setData(addCulture)}>Add culture</button>
            </td>
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
          {recipe.mash?.mash_steps?.map((item, index) => (
            <>
              {item.type !== 'sparge' ? null : (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center' }}>
                    <button onClick={() => setData(addMashStep)}>Add mash temperature step</button>
                  </td>
                </tr>
              )}

              <tr key={weakKey(item)}>
                <td>{item.type}</td>
                <td><VolumeInput value={item.amount} /></td>
                <td><TemperatureInput value={item.step_temperature} /></td>
                <td><TimeInput value={item.step_time} /></td>

                {item.type !== 'temperature' ? null : (
                  <td><button onClick={() => setData(data => deleteMashStep(data, index))}>Delete</button></td>
                )}
              </tr>
            </>
          ))}

          <tr>
            <td>boil</td>
            <td />
            <td />
            <td><TimeInput value={recipe.boil?.boil_time} /></td>
          </tr>

          <tr>
            <td>fermentation</td>
            <td />
            <td><TemperatureInput value={recipe.fermentation?.fermentation_steps?.[0].start_temperature} /></td>
            <td />
          </tr>
        </tbody>
      </table>
    </VStack>
  )
}

export default App
