import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import { expect } from 'vitest'
import App from './App'

// mocking the font awesome icons
vi.mock('@fortawesome/react-fontawesome', () => ({
    FontAwesomeIcon: () => <span data-testid="icon" />,
}))
vi.mock('@fortawesome/free-brands-svg-icons', () => ({
    faLinkedin: {},
    faGithub: {},
}))

describe('App component', () => {
    it('renders Header, Map and Footer components', () => {
        // arrange
        render(<App />)
        // assert
        const headerLink = screen.getByTestId('header-link')
        expect(headerLink).toHaveAttribute('href', 'https://www.apeskinian.com')
        expect(screen.getAllByRole('main')).toBeInTheDocument
        const footerLink = screen.getByTestId('footer-link')
        expect(footerLink).toHaveAttribute('href', 'https://www.apeskinian.com')
    })
    it('has openModel set to true when first launched', () => {
        // arrange
        render(<App testMode={true} />)
        // assert
        const modalState = screen.getByTestId('modal-state')
        expect(modalState.textContent).toBe('Open')
    })
    it('sets openModal to false when handleCloseModal is called and true when handleShowModal is called', async () => {
        // arrange
        render(<App testMode={true} />)
        const modalState = screen.getByTestId('modal-state')
        // act
        await userEvent.click(screen.getByTestId('close-btn'))
        // assert
        expect(modalState.textContent).toBe('Closed')
        // act
        await userEvent.click(screen.getByTestId('open-btn'))
        // assert
        expect(modalState.textContent).toBe('Open')
    })
})