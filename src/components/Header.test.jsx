import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect } from 'vitest';
import Header from './Header';

// factory for mock return values
const triggerReset = vi.fn();
const setShowFullPOIS = vi.fn();
let showFullPOISValue = true;
// mocking the usePOI hook
vi.mock('../context/usePOIS', () => ({
    usePOI: () => ({ showFullPOIS: showFullPOISValue, setShowFullPOIS, triggerReset }),
}));

describe('Header component', () => {
    // reset mock hook values to default before each test
    beforeEach(() => {
        showFullPOISValue = true;
        triggerReset.mockClear();
        setShowFullPOIS.mockClear();
    });
    it('renders link to portfolio site with a| part of title', () => {
        // arrange
        render(<Header />);
        // assert
        const link = screen.getByTestId('header-link');
        expect(link).toHaveAttribute('href', 'https://www.apeskinian.com');
    });
    it('resets the map and refreshes data when the lander part of the title is clicked', async () => {
        // arrange
        render(<Header />);
        // act
        await userEvent.click(screen.getByText('lander'));
        // assert
        expect(triggerReset).toHaveBeenCalled();
    });
    it('shows All POIs for toggle label and checkbox is checked if showFullPOIS is true', () => {
        // arrange
        render(<Header />);
        // assert
        const toggleLabel = screen.getByText('All POIs');
        const checkboxElement = screen.getByRole('checkbox');
        expect(toggleLabel).toBeInTheDocument();
        expect(checkboxElement).toBeChecked();
    });
    it('shows Main POIs for toggle label and checkbox is not checked if showFullPOIS is false', () => {
        // arrange
        showFullPOISValue = false;
        render(<Header />);
        // assert
        const toggleLabel = screen.getByText('Main POIs');
        const checkboxElement = screen.getByRole('checkbox');
        expect(toggleLabel).toBeInTheDocument();
        expect(checkboxElement).not.toBeChecked();
    });
    it('changes changes POI state when the toggle is clicked', async () => {
        //arrange
        render(<Header />);
        // act
        await userEvent.click(screen.getByRole('checkbox'));
        // assert
        expect(setShowFullPOIS).toHaveBeenCalled();
    });
});