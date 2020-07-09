import React, { useEffect, useState } from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import BalanceView from '../components/stats/BalanceView'
import useBalance from '../hooks/useBalance'
import SwapIcon from '../components/utilities/SwapIcon'
import PriceInput from '../components/inputs/PriceInput'
import ConvertView from '../components/stats/ConvertView'
import Tabs from '../components/tabs/Tabs'
import ConvertButton from '../components/buttons/ConvertButton'

import { getCurrencies } from '../services/openexchangerates'
import { convertToFloat, convertToString } from '../services/convertPrice'

const Dashboard = () => {
  const { balance, setBalance } = useBalance()
  const [inputPrice, setInputPrice] = useState('')
  const [outputPrice, setOutputPrice] = useState('')
  const [hasDifferentiationError, setHasDifferentiationError] = useState(false)
  const [convertRate, setConvertRate] = useState({
    USD: 1,
    EUR: 0.89,
    GBP: 0.8,
  })
  const [inputLabel, setInputLabel] = useState({
    slug: 'USD',
    sign: '$',
    name: 'US Dollar',
  })
  const [outputLabel, setOutputLabel] = useState({
    slug: 'EUR',
    sign: '€',
    name: 'Euro',
  })

  useEffect(() => {
    setHasDifferentiationError(false)
    let price = convertToFloat(inputPrice)
    if (isNaN(price)) {
      setOutputPrice('')
      return
    }
    const inputBalance = Object.values(balance)[
      Object.keys(balance).findIndex((c) => c === inputLabel.slug)
    ]
    const inputDifferentiation = convertToFloat(inputBalance) - convertToFloat(inputPrice)
    if (inputDifferentiation < 0) {
      setHasDifferentiationError(true)
    }
    const inputRate = Object.values(convertRate)[
      Object.keys(convertRate).findIndex((c) => c === inputLabel.slug)
    ]
    const outputRate = Object.values(convertRate)[
      Object.keys(convertRate).findIndex((c) => c === outputLabel.slug)
    ]

    price = (price * outputRate) / inputRate
    price = Math.round((price + Number.EPSILON) * 100) / 100
    setOutputPrice(convertToString(price))
  }, [inputPrice, convertRate, inputLabel, outputLabel, balance])

  const handleSubmit = () => {
    if (isNaN(convertToFloat(inputPrice))) {
      return
    }
    const inputBalance = Object.values(balance)[
      Object.keys(balance).findIndex((c) => c === inputLabel.slug)
    ]
    const outputBalance = Object.values(balance)[
      Object.keys(balance).findIndex((c) => c === outputLabel.slug)
    ]

    const convertedInput = convertToString(
      convertToFloat(inputBalance) - convertToFloat(inputPrice),
    )
    const convertedOutput = convertToString(
      convertToFloat(outputBalance) + convertToFloat(outputPrice),
    )

    const payload = {
      EUR: setPricePayload(convertedInput, convertedOutput, 'EUR') || balance.EUR,
      GBP: setPricePayload(convertedInput, convertedOutput, 'GBP') || balance.GBP,
      USD: setPricePayload(convertedInput, convertedOutput, 'USD') || balance.USD,
    }
    setBalance(payload)
    setInputPrice('')
    setOutputPrice('')
  }

  const setPricePayload = (convertedInput: string, convertedOutput: string, slug: string) => {
    return inputLabel.slug === slug
      ? convertedInput
      : outputLabel.slug === slug
      ? convertedOutput
      : null
  }

  const handleChangeConvert = () => {
    const tempLabel = outputLabel
    setOutputLabel(inputLabel)
    setInputLabel(tempLabel)
  }

  return (
    <>
      <Header />
      <div className="container mx-auto my-5 px-4 ">
        <BalanceView balance={balance} />
        <ConvertView convertRate={convertRate} setConvertRate={setConvertRate} />
        <div className="flex flex-wrap">
          <div className="w-full lg:w-3/8">
            <Tabs active={inputLabel} setAction={setInputLabel} setInputActive={setOutputLabel} />
            <PriceInput
              name="input_price"
              prefix="-"
              error={hasDifferentiationError}
              currency={inputLabel}
              setValue={setInputPrice}
              defaultValue={inputPrice}
            />
          </div>
          <div className="w-full lg:w-1/4 mt-0 lg:mt-24">
            <SwapIcon changeOrdinate={handleChangeConvert} />
          </div>
          <div className="w-full lg:w-3/8">
            <Tabs active={outputLabel} inputActive={inputLabel} setAction={setOutputLabel} />
            <PriceInput
              name="output_price"
              prefix="+"
              disable={true}
              currency={outputLabel}
              setValue={setOutputPrice}
              defaultValue={outputPrice}
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center mt-10">
          <ConvertButton onSubmit={handleSubmit} disable={hasDifferentiationError} />
        </div>
      </div>
      <Footer />
    </>
  )
}
export default Dashboard
