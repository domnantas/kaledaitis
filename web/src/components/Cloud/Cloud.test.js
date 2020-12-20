import { render } from '@redwoodjs/testing'

import Cloud from './Cloud'

describe('Cloud', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Cloud />)
    }).not.toThrow()
  })
})
