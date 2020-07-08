import React, { useEffect, useState } from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import BalanceView from '../components/stats/BalanceView'
import useBalance from '../hooks/useBalance'
import PriceInput from '../components/inputs/PriceInput'
import ConvertIcon from '../components/utilities/ConvertIcon'
import { openexchangerates as openexchangeratesAPI } from '../services'
import ConvertView from '../components/stats/ConvertView'

const Dashboard = () => {
  const { balance, setBalance } = useBalance()
  const [inputPrice, setInputPrice] = useState('')
  const [outputPrice, setOutputPrice] = useState('')

  const handleClick = () => {
    setBalance({
      EUR: '15',
      GBP: '0',
      USD: '0',
    })
  }
  const [convertRate, setConvertRate] = useState({
    EUR: 0.89,
    GBP: 0.8,
  })
  const [firstCallAPI, setFirstCallAPI] = useState(false)

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
    price *= convertRate.EUR
    let convertedPrice = price.toString()
    convertedPrice = convertedPrice.replace('.', ',')
    convertedPrice = convertedPrice.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    setOutputPrice(convertedPrice)
  }, [inputPrice])

  return (
    <>
      <Header />
      <div className="container mx-auto ">
        <button onClick={handleClick}>test</button>

        <BalanceView balance={balance} />
        <ConvertView convert={convertRate} />
        <div className="flex flex-wrap">
          <div className="w-full lg:w-3/8">
            <PriceInput
              name="input_price"
              label="price"
              prefix="-"
              currency={{ sign: '$', text: 'USD' }}
              setValue={setInputPrice}
              defaultValue={inputPrice}
            />
          </div>
          <div className="w-full lg:w-1/4">
            <ConvertIcon />
          </div>
          <div className="w-full lg:w-3/8">
            <PriceInput
              name="output_price"
              label="price"
              prefix="+"
              disable={true}
              currency={{ sign: '€', text: 'EUR' }}
              setValue={setOutputPrice}
              defaultValue={outputPrice}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
export default Dashboard
