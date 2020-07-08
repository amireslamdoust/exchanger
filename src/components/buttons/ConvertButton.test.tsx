import React from 'react'
import { render } from '@testing-library/react'

import ConvertButton from './ConvertButton'

describe('ConvertButtonTest', () => {
  const setup = () => {
    const utils = render(<ConvertButton onSubmit={() => {}} disable={true} />)
    const button = utils.getByLabelText('convert-action')
    return {
      button,
      ...utils,
    }
  }

  test('render price on loading price ', () => {
    const { button } = setup()
    expect(button.className).toContain('cursor-not-allowed bg-gray-600')
  })
})
