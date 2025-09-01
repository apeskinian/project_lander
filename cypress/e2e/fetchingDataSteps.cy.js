describe('While fetching data', () => {
    afterEach(() => {
        cy.wait(2000);
    })
    it('shows loading when the data is being fetched', () => {
        // arrange
        // simulate delay in fetching data
        cy.intercept('GET', 'https://fortnite-api.com/v1/map', (req) => {
            req.on('response', (res) => {
                res.setDelay(1000);
            });
        }).as('getMap');
        //act
        cy.visit('http://localhost:5173/');
        // assert
        cy.get('.message-block').should('be.visible')
            .and('contain', 'Loading map data...')
    })
    it('shows an error when an error is thrown while fetching data', () => {
        // arrange
        // simulate error in fetching data
        cy.intercept('GET', 'https://fortnite-api.com/v1/map', {
            forceNetworkError: true
        }).as('getMap');
        // act
        cy.visit('http://localhost:5173/');
        // assert
        cy.get('.message-block').should('be.visible')
            .and('contain', 'Error loading map:')
    })
    it('shows a message when no data is available', () => {
        // arrange
        // simulate data returned is null
        cy.intercept('GET', 'https://fortnite-api.com/v1/map', {
            statusCode: 200,
            body: { data: null }
        }).as('getMap');
        // act
        cy.visit('http://localhost:5173/');
        // assert
        cy.get('.message-block').should('be.visible')
            .and('contain', 'No map data available.')
    })
})