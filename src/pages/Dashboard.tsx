import React from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import StatsView from '../components/stats/StatsView'
import useBalance from '../hooks/useBalance'
import PriceInput from '../components/inputs/PriceInput'
import useForm from 'react-hook-form'
import ConvertIcon from '../components/utilities/ConvertIcon'

const Dashboard = () => {
  const { balance, setBalance } = useBalance()
  const { register, setValue } = useForm()

  const handleClick = () => {
    setBalance({
      EUR: '15',
      GBP: '0',
      USD: '0',
    })
  }

  return (
    <>
      <Header />
      <div className="container mx-auto ">
        <button onClick={handleClick}>test</button>
        <StatsView balance={balance} />
        <div className="flex flex-wrap">
          <div className="w-full lg:w-3/8">
            <PriceInput
              name="sourcing_price"
              label="price"
              prefix="-"
              currency={{ sign: '$', text: 'USD' }}
              register={register}
              setValue={setValue}
            />
          </div>
          <div className="w-full lg:w-1/4">
            <ConvertIcon />
          </div>
          <div className="w-full lg:w-3/8">
            <PriceInput
              name="sourcing_price"
              label="price"
              prefix="+"
              disable={true}
              currency={{ sign: '€', text: 'EUR' }}
              register={register}
              setValue={setValue}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
export default Dashboard
