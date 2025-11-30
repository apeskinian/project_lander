import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect } from 'vitest';
import App from './App';

// mocking the font awesome icons
vi.mock('@fortawesome/react-fontawesome', () => ({
    FontAwesomeIcon: () => <span data-testid="icon" />,
}));
vi.mock('@fortawesome/free-brands-svg-icons', () => ({
    faLinkedin: {},
    faGithub: {},
}));

describe('App component', () => {
    it('renders Header, Map and Footer components', () => {
        // arrange
        render(<App />);
        // assert
        const headerLink = screen.getByTestId('header-link');
        expect(headerLink).toHaveAttribute('href', 'https://www.apeskinian.com');
        expect(screen.getByRole('main')).toBeInTheDocument();
        const footerLink = screen.getByTestId('footer-link');
        expect(footerLink).toHaveAttribute('href', 'https://www.apeskinian.com');
    });
    it('has openModel set to true when first launched', () => {
        // arrange
        render(<App testMode={true} />);
        // assert
        const modalState = screen.getByTestId('modal-state');
        expect(modalState.textContent).toBe('Open');
    });
    it('sets openModal to false when handleCloseModal is called and true when handleShowModal is called', async () => {
        // arrange
        render(<App testMode={true} />);
        const modalState = screen.getByTestId('modal-state');
        // act
        await userEvent.click(screen.getByTestId('close-btn'));
        // assert
        expect(modalState.textContent).toBe('Closed');
        // act
        await userEvent.click(screen.getByTestId('open-btn'));
        // assert
        expect(modalState.textContent).toBe('Open');
    });
    it('has dark mode set to dark when first launched', () => {
        // arrange
        localStorage.clear();
        render(<App testMode={true} />);
        // assert
        const modeState = screen.getByTestId('mode-state');
        expect(modeState.textContent).toBe('true');
    });
    it('sets dark mode true when localStorage is "true"', () => {
        // arrange
        localStorage.setItem('darkMode', 'true');
        render(<App testMode={true} />);
        // assert
        const modeState = screen.getByTestId('mode-state');
        expect(modeState.textContent).toBe('true');
    });
    it('sets dark mode false when localStorage is "false"', () => {
        // arrange
        localStorage.setItem('darkMode', 'false');
        render(<App testMode={true} />);
        // assert
        const modeState = screen.getByTestId('mode-state');
        expect(modeState.textContent).toBe('false');
    });
    it('toggles between dark and light mode', async () => {
        // arrange
        render(<App testMode={true} />);
        const modeState = screen.getByTestId('mode-state');
        const initialMode = modeState.textContent;
        // act
        await userEvent.click(screen.getByTestId('mode-btn'));
        if (initialMode === 'true') {
            expect((screen.getByTestId('mode-state')).textContent).toBe('false');
        } else if (initialMode === 'false') {
            expect((screen.getByTestId('mode-state')).textContent).toBe('true');
        }
    });
});