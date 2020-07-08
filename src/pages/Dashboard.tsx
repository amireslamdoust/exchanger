import React, { useEffect, useState } from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import StatsView from '../components/stats/StatsView'
import useBalance from '../hooks/useBalance'
import PriceInput from '../components/inputs/PriceInput'
import ConvertIcon from '../components/utilities/ConvertIcon'

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

  useEffect(() => {
    setOutputPrice(inputPrice)
  }, [inputPrice])

  return (
    <>
      <Header />
      <div className="container mx-auto ">
        <button onClick={handleClick}>test</button>
        <StatsView balance={balance} />
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
