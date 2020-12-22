import { render } from '@redwoodjs/testing'

import Kaledaitis from './Kaledaitis'

describe('Kaledaitis', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Kaledaitis />)
    }).not.toThrow()
  })
})
