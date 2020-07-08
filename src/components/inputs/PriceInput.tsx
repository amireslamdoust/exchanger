import React, { useEffect, useState } from 'react'

type PriceProps = {
  defaultValue?: string
  name: string
  label: string
  currency: any
  prefix: string
  disable?: boolean
  setValue: any
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
  price = price.replace(/\./g, '')
  price = price.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return price
}

const PriceInput = ({
  defaultValue,
  label,
  name,
  prefix,
  disable,
  currency,
  setValue,
}: PriceProps) => {
  const [defaultPrice, setDefaultPrice] = useState<string>()
  useEffect(() => {
    setDefaultPrice(formatter(defaultValue || ''))
  }, [defaultValue])
  const onValueChange = (value: string) => {
    const formatValue = formatter(value)
    if (validationInput(formatValue) || value === '') {
      setValue(formatValue)
      setDefaultPrice(formatValue)
    }
  }

  const handleClick = (event: any) => {
    event.preventDefault()
    if (defaultPrice === formatter('')) {
      setDefaultPrice('')
      setValue('')
    }
  }

  const handleBlur = (event: any) => {
    event.preventDefault()
    if (!defaultPrice) {
      const def = formatter('')
      setValue(def)
      setDefaultPrice(def)
    }
  }

  return (
    <div>
      <label
        htmlFor={`price-input-${name}`}
        className="block text-3xl mb-4 font-medium leading-5 text-gray-700"
      >
        {label}
      </label>
      <div className="mt-1 text-2xl relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-500 text-2xl sm:leading-5">{currency.sign}</span>
          <span className="text-gray-500 text-2xl sm:leading-5 pl-2">{prefix}</span>
        </div>
        <input
          disabled={disable}
          type="text"
          id={`price-input-${name}`}
          aria-label={`price-input-${name}`}
          value={defaultPrice || ''}
          onBlur={handleBlur}
          onClick={handleClick}
          onChange={(event) => onValueChange(event.target.value)}
          className={`shadow appearance-none border rounded py-6 px-16 text-2xl text-gray-700 leading-tight focus:outline-none focus:shadow-outline form-input block w-full sm:leading-5 ${
            disable ? 'text-green-600' : 'text-red-600'
          }`}
          placeholder="0.00"
          aria-describedby="price-currency"
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <span className="text-gray-500 text-2xl sm:leading-5" id="price-currency">
            {currency.text}
          </span>
        </div>
      </div>
    </div>
  )
}

export default PriceInput
