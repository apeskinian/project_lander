import React from 'react'
import Header from './Header'
import { POIProvider } from '../context/usePOIS'

describe('<Header />', () => {
  it('renders', () => {
    cy.mount(
      <POIProvider>
        <Header />
      </POIProvider>
  )
    cy.get('header').should('exist')
  })
})