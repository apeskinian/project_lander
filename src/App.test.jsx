import { render, screen } from '@testing-library/react'
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
})