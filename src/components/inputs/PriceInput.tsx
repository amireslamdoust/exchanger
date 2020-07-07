import React, { RefObject, useEffect, useState } from 'react'

type PriceProps = {
  defaultValue?: string
  setValue: <Name extends string>(
    name: Name,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => void | Promise<boolean>
  register:
    | string
    | ((instance: HTMLInputElement | null) => void)
    | RefObject<HTMLInputElement>
    | null
    | undefined
  name: string
}

const validationInput = (price: string) => {
  return price.toString().match(/(^[0-9]{1,3}(?:[.][0-9]{1,3})*[.,]?([.,][0-9]{1,2})?)+$/) != null
}

const formatter = (price: string) => {
  const regex = /(^[0-9][0-9.]*(,?([0-9]{1,2})?))+$/
  const checkPriceValidate = price.toString().match(regex) != null
  if (!checkPriceValidate) {
    return price
  }

  price = price.toString().replace('.', '')

  const commaSeparator = price.search(',')
  let remainder = ''
  if (commaSeparator > -1) {
    remainder = ','
    const firstDecimalNumber = price[commaSeparator + 1]
    const secondDecimalNumber = price[commaSeparator + 2]
    if (firstDecimalNumber === undefined) {
      remainder += ''
    } else if (secondDecimalNumber === undefined) {
      remainder += `${firstDecimalNumber}`
    } else {
      remainder += `${firstDecimalNumber}${secondDecimalNumber}`
    }
    price = price.slice(0, commaSeparator)
  }

  price = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')

  console.log(price)
  if (remainder) {
    return `${price}${remainder}`
  }
  return price
}

const PriceInput = ({ defaultValue, setValue, register, name, ...rest }: PriceProps) => {
  const [defaultPrice, setDefaultPrice] = useState<string>()
  useEffect(() => {
    setDefaultPrice(formatter(defaultValue || '0'))
  }, [defaultValue])
  const onValueChange = (value: string) => {
    const formatValue = formatter(value)
    if (validationInput(formatValue) || value === '') {
      setValue(name, formatValue, true)
      setDefaultPrice(formatValue)
    }
  }

  const handleClick = (event: any) => {
    event.preventDefault()
    if (defaultPrice === formatter('0')) {
      setDefaultPrice('')
      setValue(name, '', true)
    }
  }

  const handleBlur = (event: any) => {
    event.preventDefault()
    if (!defaultPrice) {
      const def = formatter('0')
      setValue(name, def, true)
      setDefaultPrice(def)
    }
  }

  return (
    <>
      <label htmlFor={`price-input-${name}`}>{name}</label>
      <input
        type="text"
        id={`price-input-${name}`}
        aria-label={`price-input-${name}`}
        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        value={defaultPrice || ''}
        onBlur={handleBlur}
        onClick={handleClick}
        onChange={(event) => onValueChange(event.target.value)}
        {...rest}
      />
    </>
  )
}

export default PriceInput
