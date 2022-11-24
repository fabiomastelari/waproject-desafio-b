import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import React from 'react'
import Layout from '../../../components/Layout'

describe('Layout', () => {
  it('Should display expected child', () => {
    render(<Layout title="Layout testing title"><div>Test</div></Layout>)
    const testDiv = screen.getByText(/Test/i)
    expect(testDiv).toBeInTheDocument()
  })
})
