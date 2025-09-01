describe('Map', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/')
    })
    it('shows a POI then zooms in with label and marker when clicked', () => {
        cy.pickPOI();
        cy.get('#poi-label').should('exist')
        cy.get('#poi-marker').should('exist')
        cy.assertMapScale(5)
    })
    it('resets map zoom, hides the current POI, and zooms in to display the next one when clicked with POI already being shown', () => {
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
    it('cancels POI picking and resets map zoom when the "lander link is clicked', () => {
        cy.pickPOI();
        cy.wait(1000)
        cy.contains('h2', 'lander').click();
        cy.get('#poi-label').should('not.be.visible');
        cy.get('#poi-marker').should('not.be.visible');
        cy.assertMapScale(1);
    })
    it('cancels POI picking and resets map zoom when the POI toggle is clicked', () => {
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
    it('cancels next POI picking and resets map zoom when the "lander link is clicked', () => {
        cy.pickPOI();
        cy.assertMapScale(5);
        cy.pickPOI();
        cy.wait(1000)
        cy.contains('h2', 'lander').click();
        cy.get('#poi-label').should('not.be.visible');
        cy.get('#poi-marker').should('not.be.visible');
        cy.assertMapScale(1);
    })
    it('cancels next POI picking and resets map zoom when the POI toggle is clicked', () => {
        cy.pickPOI();
        cy.assertMapScale(5);
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