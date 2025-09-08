describe('Map', () => {
    beforeEach(() => {
        // act
        cy.visit('http://localhost:5173/');
        cy.get('#close-modal').click();
    });
    it('shows a POI then zooms in with label and marker when clicked', () => {
        // act
        cy.pickPOI();
        // assert
        cy.get('#poi-label').should('exist');
        cy.get('#poi-marker').should('exist');
        cy.assertMapScale(5);
    });
    it('resets map zoom, hides the current POI, and zooms in to display the next one when clicked with POI already being shown', () => {
        // act
        cy.pickPOI();
        // assert
        cy.assertMapScale(5);
        // act
        cy.pickPOI();
        // assert
        cy.get('#poi-label').should('not.be.visible');
        cy.get('#poi-marker').should('not.be.visible');
        cy.assertMapScale(1);
        cy.assertMapScale(5);
        cy.get('#poi-label').should('be.visible');
        cy.get('#poi-marker').should('be.visible');
    });
    it('cancels POI picking and resets map zoom when the "lander link is clicked', () => {
        // act
        cy.pickPOI();
        cy.wait(1000);  // eslint-disable-line
        cy.get('#lander').click();
        // assert
        cy.get('#poi-label').should('not.be.visible');
        cy.get('#poi-marker').should('not.be.visible');
        cy.assertMapScale(1);
    });
    it('cancels POI picking and resets map zoom when the POI toggle is clicked', () => {
        // act
        cy.pickPOI();
        cy.wait(1000);  // eslint-disable-line
        // assert
        cy.get('#showing-pois')
        .invoke('text')
        .then(text => {
            const checkText = text === 'All POIs' ? 'Main POIs' : 'All POIs';
            // act
            cy.get('#poi-toggle').click();
            // assert
            cy.get('#poi-label').should('not.be.visible');
            cy.get('#poi-marker').should('not.be.visible');
            cy.assertMapScale(1);
            cy.get('#showing-pois').should('contain', checkText);
        })  ;
    });
    it('cancels next POI picking and resets map zoom when the "lander link is clicked', () => {
        // act
        cy.pickPOI();
        // assert
        cy.assertMapScale(5);
        // act
        cy.pickPOI();
        cy.wait(1000);  // eslint-disable-line
        cy.get('#lander').click();
        // assert
        cy.get('#poi-label').should('not.be.visible');
        cy.get('#poi-marker').should('not.be.visible');
        cy.assertMapScale(1);
    });
    it('cancels next POI picking and resets map zoom when the POI toggle is clicked', () => {
        // act
        cy.pickPOI();
        // assert
        cy.assertMapScale(5);
        // act
        cy.pickPOI();
        cy.wait(1000);  // eslint-disable-line
        // assert
        cy.get('#showing-pois')
        .invoke('text')
        .then(text => {
            const checkText = text === 'All POIs' ? 'Main POIs' : 'All POIs';
            // act
            cy.get('#poi-toggle').click();
            // assert
            cy.get('#poi-label').should('not.be.visible');
            cy.get('#poi-marker').should('not.be.visible');
            cy.assertMapScale(1);
            cy.get('#showing-pois').should('contain', checkText);
        });
    });
});