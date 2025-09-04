describe('a|lander', () => {
  beforeEach(() => {
    // act
    cy.visit('http://localhost:5173/');
  })
  afterEach(() => {
    cy.wait(500);
  })
  it('renders a header, main, and footer elements', () => {
    // assert
    cy.get('header').should('exist')
    cy.get('main').should('exist')
    cy.get('footer').should('exist')
  })
  it('shows the modal', () => {
    // assert
    cy.get('.help-modal').should('exist')
  })
  it('closes the modal when the "Close" button is clicked', () => {
    // assert
    cy.get('.help-modal').should('exist')
    // act
    cy.get('#close-modal').click()
    // assert
    cy.get('.help-modal').should('not.exist')
  })
})

describe('Header', () => {
  beforeEach(() => {
    // act
    cy.visit('http://localhost:5173')
    cy.get('#close-modal').click()
  })
  it('has an element "a|" that links to the portfolio site', () => {
    // assert
    cy.get('#a')
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
  it('has an element "lander" that resets the map', () => {
    // assert
    cy.get('#lander').should('exist')
    cy.pickPOI();
    cy.assertMapScale(5)
    cy.get('#lander').click()
    cy.assertMapScale(1)
  })
  it('has a toggle element that switches POI sets and resets the map when toggled', () => {
    // assert
    cy.get('#poi-toggle').should('exist')
    cy.get('#showing-pois').should('exist')
    .and('contain', 'All POIs')
    cy.pickPOI();
    cy.assertMapScale(5)
    cy.get('#poi-toggle').click()
    cy.assertMapScale(1)
    cy.get('#showing-pois').should('contain', 'Main POIs')
  })
})

describe('Footer', () => {
  beforeEach(() => {
    // act
    cy.visit('http://localhost:5173')
  })
  afterEach(() => {
    cy.wait(500);
  })
  it('has a link "apeskinian|" to the portfolio site', () => {
    // assert
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
  it('has an "i" icon to show the modal', () => {
    // assert
    cy.get('#help-icon').should('exist')
  })
  it('clicking the "i" icon shows the modal', () => {
    // assert
    cy.get('.help-modal').should('not.exist')
    cy.get('#help-icon').should('exist')
    // act
    .click()
    // assert
    cy.get('.help-modal').should('exist')
  })
})