import React from 'react'
import PriceInput from '../components/inputs/PriceInput'
import useForm from 'react-hook-form'

const Dashboard = () => {
  const { register, setValue } = useForm()
  return (
    <div>
      <p>Hello</p>
      <PriceInput
        register={register}
        setValue={setValue}
        name="sourcing_price"
        defaultValue="5022"
      />
    </div>
  )
}
export default Dashboard
