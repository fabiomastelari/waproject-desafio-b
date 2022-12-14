import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import Layout from '../../../components/Layout'

describe('Layout', () => {
  it('Should display expected child', () => {
    render(<Layout title="Layout testing title" page={1} lastPage={1} apiToken=''><div>Test</div></Layout>)
    const testDiv = screen.getByText(/Layout testing title/i)
    expect(testDiv).toBeInTheDocument()
  })
})
