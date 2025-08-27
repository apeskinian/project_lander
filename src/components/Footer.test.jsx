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
        expect(link).toHaveAttribute('href', 'http://www.apeskinian.com')
    })
    it('renders linkedin link', () => {
        // arrange
        render(<Footer />)
        // assert
        const link = screen.getByLabelText('view my linkedin profile')
        expect(link).toHaveAttribute('href', 'https://www.linkedin.com/in/apeskinian/')
    })
    it('renders github link', () => {
        // arrange
        render(<Footer />)
        // assert
        const link = screen.getByLabelText('view my github profile')
        expect(link).toHaveAttribute('href', 'https://github.com/apeskinian')
    })
})