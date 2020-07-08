import React from 'react'
import currencies from '../../config/currencies.json'

type TabsProps = {
  active: any
  setAction: any
  inputActive?: any
  setInputActive?: any
}
const Tabs = ({ active, setAction, inputActive, setInputActive }: TabsProps) => {
  const handleClick = (event: any, slug: any) => {
    event.preventDefault()
    if (!inputActive) {
      setInputActive(active)
    }
    setAction(slug)
  }

  const currenciesData =
    inputActive === undefined ? currencies : currencies.filter((c) => c.slug !== inputActive.slug)

  return (
    <div className="my-5">
      <div className="block">
        <div className="border-b border-gray-200">
          <div className="flex -mb-px">
            {currenciesData.map((currency) => {
              return (
                <div
                  key={currency.slug}
                  className={
                    currency.slug === active.slug
                      ? 'cursor-not-allowed ml-8 group inline-flex items-center py-4 px-1 border-b-2 border-indigo-500 font-medium text-sm leading-5 text-indigo-600 focus:outline-none focus:text-indigo-800 focus:border-indigo-700'
                      : 'cursor-pointer ml-8 group inline-flex items-center py-4 px-1 border-b-2 border-transparent font-medium text-sm leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300'
                  }
                  onClick={(event) => handleClick(event, currency)}
                >
                  <span>
                    {currency.sign} {currency.name}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Tabs
