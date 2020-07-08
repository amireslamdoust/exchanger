import React from 'react'

type ConvertButtonProps = {
  onSubmit: any
  disable: boolean
}

const ConvertButton = ({ onSubmit, disable }: ConvertButtonProps) => {
  const handleClick = (event: any) => {
    event.preventDefault()
    onSubmit()
  }
  return (
    <span className="w-full lg:w-64 inline-flex rounded-md shadow-sm ">
      <button
        onClick={handleClick}
        type="button"
        aria-label="convert-action"
        data-cy="convert-action"
        disabled={disable}
        className={`w-full text-2xl justify-center inline-flex items-center px-6 py-5 border border-transparent text-base leading-6 font-medium rounded-md text-white focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150 ${
          disable
            ? 'cursor-not-allowed bg-gray-600'
            : 'cursor-pointer bg-indigo-600 hover:bg-indigo-500'
        }`}
      >
        <svg
          className="text-2xl scale-150 transform -ml-1 mr-3 h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
        </svg>
        Convert
      </button>
    </span>
  )
}

export default ConvertButton
