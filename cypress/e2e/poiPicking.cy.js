describe('a|lander', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/')
        cy.wait(1000)
    })
    it('shows a POI with label and marker when clicking the map', () => {
        cy.pickPOI();
        cy.get('#poi-label').should('exist')
        cy.get('#poi-marker').should('exist')
        cy.assertMapScale(5)
    })
    it('when a POI is already active, clicking the map triggers a zoom-out, hides the current POI, and zooms in to display the next one', () => {
        cy.pickPOI();
        cy.assertMapScale(5);
        cy.pickPOI();
        cy.get('#poi-label').should('not.be.visible');
        cy.get('#poi-marker').should('not.be.visible');
        cy.assertMapScale(1);
        cy.assertMapScale(5);
        cy.get('#poi-label').should('be.visible');
        cy.get('#poi-marker').should('be.visible');
    })
    it('clicking the "lander link while POI is being chosen cancels and resets the map"', () => {
        cy.pickPOI();
        cy.wait(1000)
        cy.contains('h2', 'lander').click();
        cy.get('#poi-label').should('not.be.visible');
        cy.get('#poi-marker').should('not.be.visible');
        cy.assertMapScale(1);
    })
    it('clicking the "POI toggle while POI is being chosen cancels, resets the map, and switches POI set"', () => {
        cy.pickPOI();
        cy.wait(1000)
        cy.get('#showing-pois')
            .invoke('text')
            .then(text => {
                const checkText = text === 'All POIs' ? 'Main POIs' : 'All POIs';
                cy.get('#poi-toggle').click()
                cy.get('#poi-label').should('not.be.visible');
                cy.get('#poi-marker').should('not.be.visible');
                cy.assertMapScale(1);
                cy.get('#showing-pois').should('contain', checkText)
            })  
    })
})