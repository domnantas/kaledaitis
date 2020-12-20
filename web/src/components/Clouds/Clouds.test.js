import { render } from '@redwoodjs/testing'

import Clouds from './Clouds'

describe('Clouds', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Clouds />)
    }).not.toThrow()
  })
})
