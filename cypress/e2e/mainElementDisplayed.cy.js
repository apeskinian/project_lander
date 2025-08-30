describe('a|lander', () => {
  it('renders a main element', () => {
    cy.visit('https://lander.apeskinian.com')
    cy.get('main').should('exist')
  })
})