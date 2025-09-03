import { render, screen } from '@testing-library/react'
import { expect } from 'vitest'
import Footer from './Footer'

// mocking the font awesome icons
vi.mock('@fortawesome/react-fontawesome', () => ({
    FontAwesomeIcon: () => <span data-testid="icon" />,
}))
vi.mock('@fortawesome/free-brands-svg-icons', () => ({
    faLinkedin: {},
    faGithub: {},
}))

describe('Footer component', () => {
    it('renders apeskinian link', () => {
        // arrange
        render(<Footer />)
        // assert
        const link = screen.getByRole('link', { name: 'visit my portfolio site' })
        expect(link).toHaveAttribute('href', 'https://www.apeskinian.com')
    })
    it('renders a help icon', () => {
        // arrange
        render(<Footer />)
        // assert
        const helpIcon = screen.getByLabelText('show help')
        expect(helpIcon).toBeInTheDocument();
    })
})