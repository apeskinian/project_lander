import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';
import { POIProvider, usePOI } from './usePOIS';
import userEvent from '@testing-library/user-event';

// create a test function to use the context
function TestComponent() {
    const { showFullPOIS, setShowFullPOIS, resetTimestamp, triggerReset } = usePOI();
    return (
        <div>
            <span data-testid='pois'>{showFullPOIS ? 'all' : 'main'}</span>
            <button onClick={() => setShowFullPOIS(v => !v)}>toggle</button>
            <span data-testid='reset'>{resetTimestamp}</span>
            <button onClick={triggerReset}>reset</button>
        </div>
    );
}

describe('POIContext and usePOI hook', () => {
    it('provides default value of true for showFullPOIS' , () => {
        // arrange
        render(
            <POIProvider>
                <TestComponent />
            </POIProvider>
        );
        // assert
        expect(screen.getByTestId('pois')).toHaveTextContent('all');
    });
    it('toggles POIS correctly', async () => {
        // arrange
        render(
            <POIProvider>
                <TestComponent />
            </POIProvider>
        );
        const spanElement = screen.getByTestId('pois');
        const toggleButton = screen.getByText('toggle');
        // act
        await userEvent.click(toggleButton);
        // assert
        expect(spanElement).toHaveTextContent('main');
        // act
        await userEvent.click(toggleButton);
        // assert
        expect(spanElement).toHaveTextContent('all');
    });
    it('triggerReset updates resetTimestamp', async () => {
        // arrange
        render (
            <POIProvider>
                <TestComponent />
            </POIProvider>
        );
        const beforeStamp = screen.getByTestId('reset').textContent;
        const resetButton = screen.getByText('reset');
        // act
        await userEvent.click(resetButton);
        // assert
        const afterStamp = screen.getByTestId('reset').textContent;
        expect(afterStamp).not.toBe(beforeStamp);
    });
});