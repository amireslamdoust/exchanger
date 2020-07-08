import React, { useEffect, useState } from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import BalanceView from '../components/stats/BalanceView'
import useBalance from '../hooks/useBalance'
import PriceInput from '../components/inputs/PriceInput'
import ConvertIcon from '../components/utilities/ConvertIcon'
import { openexchangerates as openexchangeratesAPI } from '../services'
import ConvertView from '../components/stats/ConvertView'
import Tabs from '../components/tabs/Tabs'
import ConvertButton from '../components/buttons/ConvertButton'

const Dashboard = () => {
  const { balance, setBalance } = useBalance()
  const [inputPrice, setInputPrice] = useState('')
  const [outputPrice, setOutputPrice] = useState('')

  const [convertRate, setConvertRate] = useState({
    USD: 1,
    EUR: 0.89,
    GBP: 0.8,
  })

  const [firstCallAPI, setFirstCallAPI] = useState(false)
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

  // useEffect(() => {
  //   if (firstCallAPI) {
  //     return
  //   }
  //   openexchangeratesAPI
  //     .getCurrencies()
  //     .then((res) => {
  //       setConvertRate(res)
  //       setFirstCallAPI(true)
  //     })
  //     .catch((err) => console.error(err))
  // }, [firstCallAPI])

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     openexchangeratesAPI
  //       .getCurrencies()
  //       .then((res) => {
  //         setConvertRate(res)
  //       })
  //       .catch((err) => console.error(err))
  //   }, 1000 * 10)
  //   return () => clearInterval(interval)
  // }, [])

  useEffect(() => {
    let price = parseFloat(inputPrice.replace(/\./g, '').replace(',', '.'))
    if (isNaN(price)) {
      return
    }

    const inputRate = Object.values(convertRate)[
      Object.keys(convertRate).findIndex((c) => c === inputLabel.slug)
    ]
    const outputRate = Object.values(convertRate)[
      Object.keys(convertRate).findIndex((c) => c === outputLabel.slug)
    ]

    price = (price * outputRate) / inputRate
    price = Math.round((price + Number.EPSILON) * 100) / 100
    let convertedPrice = price.toString()
    convertedPrice = convertedPrice.replace('.', ',')
    convertedPrice = convertedPrice.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    setOutputPrice(convertedPrice)
  }, [inputPrice, convertRate, inputLabel, outputLabel])

  const handleSubmit = () => {
    const inputBalance = Object.values(balance)[
      Object.keys(balance).findIndex((c) => c === inputLabel.slug)
    ]
    const outputBalance = Object.values(balance)[
      Object.keys(balance).findIndex((c) => c === outputLabel.slug)
    ]
    const inputPriceNumber = parseFloat(inputPrice.replace(/\./g, '').replace(',', '.'))
    const outputPriceNumber = parseFloat(outputPrice.replace(/\./g, '').replace(',', '.'))

    let inputBalanceNumber = parseFloat(inputBalance.replace(/\./g, '').replace(',', '.'))
    let outputBalanceNumber = parseFloat(outputBalance.replace(/\./g, '').replace(',', '.'))
    const f1 = inputBalanceNumber - inputPriceNumber
    const f2 = outputBalanceNumber + outputPriceNumber

    let convertedPrice1 = f1.toString()
    convertedPrice1 = convertedPrice1.replace('.', ',')
    convertedPrice1 = convertedPrice1.replace(/\B(?=(\d{3})+(?!\d))/g, '.')

    let convertedPrice2 = f2.toString()
    convertedPrice2 = convertedPrice2.replace('.', ',')
    convertedPrice2 = convertedPrice2.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    const EURPRICE =
      inputLabel.slug === 'EUR'
        ? convertedPrice1
        : outputLabel.slug === 'EUR'
        ? convertedPrice2
        : balance.EUR
    const GBPPRICE =
      inputLabel.slug === 'GBP'
        ? convertedPrice1
        : outputLabel.slug === 'GBP'
        ? convertedPrice2
        : balance.GBP
    const USDPRICE =
      inputLabel.slug === 'USD'
        ? convertedPrice1
        : outputLabel.slug === 'USD'
        ? convertedPrice2
        : balance.USD
    const payload = {
      EUR: EURPRICE,
      GBP: GBPPRICE,
      USD: USDPRICE,
    }
    setBalance(payload)
    setInputPrice('')
    setOutputPrice('')
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
        <ConvertView convert={convertRate} />
        <div className="flex flex-wrap">
          <div className="w-full lg:w-3/8">
            <Tabs active={inputLabel} setAction={setInputLabel} setInputActive={setOutputLabel} />
            <PriceInput
              name="input_price"
              prefix="-"
              currency={inputLabel}
              setValue={setInputPrice}
              defaultValue={inputPrice}
            />
          </div>
          <div className="w-full lg:w-1/4 mt-0 lg:mt-24">
            <ConvertIcon changeOrdinate={handleChangeConvert} />
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
          <ConvertButton onSubmit={handleSubmit} />
        </div>
      </div>
      <Footer />
    </>
  )
}
export default Dashboard
