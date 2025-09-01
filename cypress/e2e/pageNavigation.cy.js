describe('a|lander', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/')
  })
  it('renders a header, main, and footer elements', () => {
    cy.get('header').should('exist')
    cy.get('main').should('exist')
    cy.get('footer').should('exist')
  })
})

describe('Header', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173')
  })
  it('has a h1 element "a|" that links to the portfolio site', () => {
    cy.contains('h1', 'a|')
      .should('exist')
      .within(() => {
        cy.get('a')
          .should('have.attr', 'target', '_blank')
          .should('have.attr', 'href')
          .and('match', /^https:\/\/www\.apeskinian\.com$/)
          .then(href => {
            cy.request(href).its('status').should('eq', 200);
          });
      })
  })
  it('has a h2 element "lander" that resets the map', () => {
    cy.contains('h2', 'lander').should('exist')
    cy.get('#map').should('exist')
    cy.get('main').click();
    cy.assertMapScale(5)
    cy.contains('h2', 'lander').click()
    cy.assertMapScale(1)
  })
  it('has a toggle element that switches POI sets and resets the map when toggled', () => {
    cy.get('#poi-toggle').should('exist')
    cy.get('#showing-pois').should('exist')
      .and('contain', 'All POIs')
    cy.get('#map').should('exist')
    cy.get('main').click();
    cy.assertMapScale(5)
    cy.get('#poi-toggle').click()
    cy.assertMapScale(1)
    cy.get('#showing-pois').should('contain', 'Main POIs')
  })
})

describe('Footer', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173')
  })
  it('has a link "apeskinian|" to the portfolio site', () => {
    cy.get('#apeskinian')
      .should('exist')
      .within(() => {
        cy.get('a')
          .should('have.attr', 'target', '_blank')
          .should('have.attr', 'aria-label', 'visit my portfolio site')
          .should('have.attr', 'href')
          .and('match', /^https:\/\/www\.apeskinian\.com$/)
          .then(href => {
            cy.request(href).its('status').should('eq', 200);
          });
      })
  })
  it('has a link to the apeskinian LinkedIn profile', () => {
    cy.get('#socials-links')
      .should('exist')
      .within(() => {
        cy.get('a[aria-label*="linkedin"]')
          .should('have.attr', 'target', '_blank')
          .should('have.attr', 'aria-label', 'view my linkedin profile')
          .should('have.attr', 'href')
          .and('match', /^https:\/\/www\.linkedin\.com\/in\/apeskinian$/)
          // set failOnStatusCode to false and status expectation to 999 for LinkedIn's security
          .then(href => {
            cy.request({url: href, failOnStatusCode: false}).its('status').should('eq', 999);
          });
      })
  })
  it('has a links to the apeskinian GitHub profile', () => {
    cy.get('#socials-links')
      .should('exist')
      .within(() => {
        cy.get('a[aria-label*="github"]')
          .should('have.attr', 'target', '_blank')
          .should('have.attr', 'aria-label', 'view my github profile')
          .should('have.attr', 'href')
          .and('match', /^https:\/\/github\.com\/apeskinian$/)
          .then(href => {
            cy.request(href).its('status').should('eq', 200);
          });
      })
  })
})