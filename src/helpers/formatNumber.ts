const formatNumber = (value: number) => {
  const valueToString = value.toString()
  const valueModule = valueToString.length % 3
  const valueSlice = valueToString.slice(0, valueModule === 0 ? 4 : valueModule + 1)

  if (value < 1000) return valueSlice
  if (value < 1_000_000) return valueSlice.slice(0, valueModule === 0 ? 3 : valueModule) + 'K'

  let measure = 'NN'

  if (value < 1_000_000_000) measure = 'M'
  else measure = 'B'

  const lastNumber = valueSlice.slice(-1)
  let theValue = valueSlice.slice(0, valueSlice.length - 1)

  if (lastNumber !== '0') theValue += `.${lastNumber}`

  return theValue + measure
}

export default formatNumber