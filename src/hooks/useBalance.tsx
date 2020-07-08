import { useState, useEffect } from 'react'
import { data } from '../mocks/balance.json'

export default function useBalance() {
  const [balance, setBalance] = useState({
    EUR: '0',
    GBP: '0',
    USD: '0',
  })

  useEffect(() => {
    setBalance(data)
  }, [])

  return { balance, setBalance }
}
