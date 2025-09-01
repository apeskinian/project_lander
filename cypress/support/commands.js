// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// command to check map scale after POI selections and map resets
Cypress.Commands.add('assertMapScale', (expectedScale, options = {}) => {
    cy.get('#map', options)
        .should($mapImage => {
            const transform = $mapImage.css('transform');
            const match = transform.match(/matrix\(([^)]+)\)/);
            expect(match).to.not.be.null;

            const [scaleX, , , scaleY] = match[1].split(', ').map(parseFloat);
            expect(scaleX).to.be.closeTo(expectedScale, 0.01);
            expect(scaleY).to.be.closeTo(expectedScale, 0.01);
        });
});

Cypress.Commands.add('pickPOI', () => {
    cy.get('#map').should('exist')
    cy.get('main').click()
})