export const convertToFloat = (price: any) => {
  return parseFloat(price.replace(/\./g, '').replace(',', '.'))
}

export const convertToString = (price: any) => {
  let convertedPrice = price.toString()
  convertedPrice = convertedPrice.replace('.', ',')
  convertedPrice = convertedPrice.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return convertedPrice
}

export default { convertToFloat, convertToString }
