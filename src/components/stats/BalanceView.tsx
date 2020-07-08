import React from 'react'

type StatsViewProps = {
  balance: any
}

const BalanceView = ({ balance }: StatsViewProps) => {
  return (
    <div>
      <h3 className="text-lg leading-6 font-medium text-gray-900">Your Balance</h3>
      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div data-cy="USD-balance" className="px-4 py-5 sm:p-6">
            <dl>
              <dt className="text-sm leading-5 font-medium text-gray-500 truncate">US Dollar</dt>
              <dd className="mt-1 text-3xl leading-9 font-semibold text-gray-900">
                $ {balance.USD}
              </dd>
            </dl>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div data-cy="EUR-balance" className="px-4 py-5 sm:p-6">
            <dl>
              <dt className="text-sm leading-5 font-medium text-gray-500 truncate">Euro</dt>
              <dd className="mt-1 text-3xl leading-9 font-semibold text-gray-900">
                € {balance.EUR}
              </dd>
            </dl>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dl>
              <dt className="text-sm leading-5 font-medium text-gray-500 truncate">
                Pound Sterling
              </dt>
              <dd className="mt-1 text-3xl leading-9 font-semibold text-gray-900">
                £ {balance.GBP}
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BalanceView
