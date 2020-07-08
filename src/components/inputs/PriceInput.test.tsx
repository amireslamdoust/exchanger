import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import PriceInput from './PriceInput'

describe('BasePriceInput', () => {
  const registerMock = jest.fn()
  const setValueMock = jest.fn()

  const setup = () => {
    const utils = render(
      <PriceInput
        setValue={setValueMock}
        register={registerMock}
        defaultValue={'50,23'}
        name="test"
      />,
    )
    const inputText = utils.getByLabelText('price-input-test')
    return {
      inputText,
      ...utils,
    }
  }

  test('render price on loading price ', () => {
    const { inputText } = setup()
    expect(inputText.value).toBe('50,23')
  })

  test('render price on changing price - normal price without comma ', () => {
    const { inputText } = setup()
    fireEvent.change(inputText, { target: { value: '23' } })
    expect(inputText.value).toBe('23')
  })

  test('render price on changing price - normal price with comma ', () => {
    const { inputText } = setup()
    fireEvent.change(inputText, { target: { value: '2,3' } })
    expect(inputText.value).toBe('2,3')

    fireEvent.change(inputText, { target: { value: '6,80' } })
    expect(inputText.value).toBe('6,80')

    fireEvent.change(inputText, { target: { value: '123456' } })
    expect(inputText.value).toBe('123.456')

    fireEvent.change(inputText, { target: { value: '123456789' } })
    expect(inputText.value).toBe('123.456.789')

    fireEvent.change(inputText, { target: { value: '123456,78' } })
    expect(inputText.value).toBe('123.456,78')

    fireEvent.change(inputText, { target: { value: '5123456,78' } })
    expect(inputText.value).toBe('5.123.456,78')
  })
})
