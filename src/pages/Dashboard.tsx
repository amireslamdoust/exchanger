import React, { useEffect, useState } from 'react'
import PriceInput from '../components/inputs/PriceInput'
import useForm from 'react-hook-form'
import { openexchangerates as openexchangeratesAPI } from '../services'

const Dashboard = () => {
  const { register, setValue } = useForm()

  const [x, setX] = useState(false)
  useEffect(() => {
    if (x) {
      return
    }
    openexchangeratesAPI.getCurrencies().then((res) => {
      console.log(res)
      setX(true)
    })
  }, [x])

  return (
    <div>
      <p>Hello</p>
      <PriceInput
        register={register}
        setValue={setValue}
        name="sourcing_price"
        defaultValue="123,45"
      />
    </div>
  )
}
export default Dashboard
