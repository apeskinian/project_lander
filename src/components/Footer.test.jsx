import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect } from 'vitest'
import Footer from './Footer'

// mocking the font awesome icons
vi.mock('@fortawesome/react-fontawesome', () => ({
    FontAwesomeIcon: () => <span data-testid="icon" />,
}))
vi.mock('@fortawesome/free-solid-svg-icons', () => ({ faCircleInfo: {} }))

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
    it('opens the modal when the help icon is clicked', async () => {
        // arrange
        const onOpenMock = vi.fn();
        render(<Footer onOpen={onOpenMock}/>);
        // act
        const helpIcon = screen.getByLabelText('show help')
        await userEvent.click(helpIcon);
        // assert
        expect(onOpenMock).toHaveBeenCalled();
    })
})