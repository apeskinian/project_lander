import { render, screen, act, fireEvent } from '@testing-library/react';
import { expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import Map from './Map';

// mocking the font awesome icon
vi.mock('@fortawesome/react-fontawesome', () => ({
    FontAwesomeIcon: () => <span data-testid="icon" />,
}));
vi.mock('@fortawesome/free-solid-svg-icons', () => ({ faBullseye: {} }));

// mocking the usePOI hook
const resetTimestamp = vi.fn();
let showFullPOISValue = true;
vi.mock('../context/usePOIS', () => ({
    usePOI: () => ({ showFullPOIS: showFullPOISValue, resetTimestamp }),
}));

// mocking the useMapData hook
let mapDataValue = {
    images: { blank: 'test-image-url' },
    pois: [
        { id: 'Athena.Location.POI.Test1', name: 'Test POI', location: { x: 10, y: 20 } },
        { id: 'Test2', name: 'And Another POI', location: { x: 40, y: 50 } },
    ]
};
let loading = null;
let error = null;
vi.mock('../hooks/useMapData', () => ({
    useMapData: () => ({ mapData: mapDataValue, loading, error }),
}));

// mocking the gameToImage util
vi.mock('../util/pixelMap', () => ({
    gameToImage: () => ({ left: 100, top: 100 }),
}));

//mocking the resize observer
let resizeCallback;
class ResizeObserver {
    constructor(callback) {
        resizeCallback = callback;
    }
    observe() { }
    unobserve() { }
    disconnect() { }
}
globalThis.ResizeObserver = ResizeObserver;

describe('Map component', () => {
    beforeEach(() => {
        mapDataValue = {
            images: { blank: 'test-image-url' },
            pois: [
                { id: 'Athena.Location.POI.Test1', name: 'Test POI', location: { x: 10, y: 20 } },
                { id: 'Test2', name: 'And Another POI', location: { x: 40, y: 50 } },
            ]
        };
        loading = null;
        error = null;
        showFullPOISValue = true;
    });
    it('renders a main element', () => {
        // arrange
        render(<Map />);
        // assert
        const mainElement = screen.getByRole('main');
        expect(mainElement).toBeInTheDocument();
    });
    it('renders a loading message while data is loading', () => {
        // arrange
        loading = true;
        mapDataValue = null;
        render(<Map />);
        // assert
        const loadingMessage = screen.getByText('Loading map data...');
        expect(loadingMessage).toBeInTheDocument();
    });
    it('renders an error message if an error occurred while fetching data', () => {
        // arrange
        error = 'ERROR';
        render(<Map />);
        // assert
        const errorMessage = screen.getByText('Error loading map:');
        const reloadMessage = screen.getByText(/please try reloading the page/i);
        expect(errorMessage).toBeInTheDocument();
        expect(reloadMessage).toBeInTheDocument();
    });
    it('renders a no map data message if no map data is found', () => {
        // arrange
        mapDataValue = null;
        loading = false;
        error = null;
        render(<Map />);
        // assert
        const mapMessage = screen.getByText('No map data available.');
        const reloadMessage = screen.getByText(/please try reloading the page/i);
        expect(mapMessage).toBeInTheDocument();
        expect(reloadMessage).toBeInTheDocument();
    });
    it('renders the map image when map data is loaded successfully', () => {
        // arrange
        render(<Map />);
        // assert
        const mapElement = screen.getByAltText('Fortnite POIs map');
        expect(mapElement).toBeInTheDocument();
    });
    it('filters POIs when showFullPOIS is false', async () => {
        // arrange
        showFullPOISValue = false;
        render(<Map />);
        // act
        userEvent.click(screen.getByRole('main'));
        // assert
        const label = screen.findByText(/TEST POI/i);
        await expect(label).resolves.toBeInTheDocument();
    });
    it('does not filter POIs when showFullPOIS is true', async () => {
        // arrange
        mapDataValue = {
            images: { blank: 'test-image-url' },
            pois: [
                { id: 'Test2', name: 'And Another POI', location: { x: 40, y: 50 } },
            ]
        };
        render(<Map />);
        // act
        userEvent.click(screen.getByRole('main'));
        // assert
        const label = screen.findByText(/AND ANOTHER POI/i);
        await expect(label).resolves.toBeInTheDocument();
    });
    it('clears POI marker and label on image resize', async () => {
        // arrange
        render(<Map />);
        // act
        const main = screen.getByRole('main');
        await userEvent.click(main);
        const marker = await screen.findByTestId('poi-marker');
        expect(marker).toBeInTheDocument();
        // simulate a resize event
        act(() => {
            resizeCallback([{ contentRect: { width: 82, height: 2010 } }]);
        });
        // assert
        expect(screen.queryByTestId('poi-marker')).not.toBeInTheDocument();
        expect(screen.queryByTestId('poi-label')).not.toBeInTheDocument();
    });
    it('zooms in to the POI and shows label after clicking the map', async () => {
        // arrange
        vi.useFakeTimers();
        render(<Map />);
        const main = screen.getByRole('main');
        const mapElement = screen.getByTestId('map');
        // act
        fireEvent.click(main);
        await vi.runAllTimersAsync();
        // assert
        const labelElement = screen.getByTestId('poi-label');
        expect(mapElement).toHaveAttribute('data-zoom', '5');
        expect(labelElement).toBeInTheDocument();
        vi.useRealTimers();
    });
    it('zooms out before zooming back for a new POIs', async () => {
        // arrange
        vi.useFakeTimers();
        render(<Map />);
        const main = screen.getByRole('main');
        const mapElement = screen.getByTestId('map');
        // act (click first to select first POI)
        await act(async () => {
            fireEvent.click(main);
            vi.advanceTimersByTime(2200);
        });
        // assert (first POI is shown)
        const markerElement = screen.getByTestId('poi-marker');
        expect(markerElement).toBeInTheDocument();
        expect(mapElement).toHaveAttribute('data-zoom', '5');
        // act (click again to get second POI)
        await act(async () => {
            fireEvent.click(main);
            vi.advanceTimersByTime(200);
        });
        // assert (map zooms out)
        expect(mapElement).toHaveAttribute('data-zoom', '1');
        // wait for map to zoom in again
        await act(async () => {
            vi.advanceTimersByTime(4500);
        });
        expect(mapElement).toHaveAttribute('data-zoom', '5');
        // act (click again to get third POI)
        await act(async () => {
            fireEvent.click(main);
            vi.advanceTimersByTime(200);
        });
        // assert (map zooms out)
        expect(mapElement).toHaveAttribute('data-zoom', '1');
        // wait for map to zoom in again 
        await act(async () => {
            vi.advanceTimersByTime(4500);
        });
        expect(mapElement).toHaveAttribute('data-zoom', '5');
        vi.useRealTimers();
    });
    it('prevents default zoom behaviour on double click', async () => {
        // arrange
        render(<Map />);
        // act
        const main = screen.getByRole('main');
        const dblClickHandler = vi.fn();
        main.addEventListener('dblclick', dblClickHandler);
        await userEvent.dblClick(main);
        expect(dblClickHandler).toHaveBeenCalled();
        // assert
        const event = dblClickHandler.mock.calls[0][0];
        expect(event.defaultPrevented).toBe(true);
    });
    it('load modal when modalState is true', () => {
        // arrange
        const modalRoot = document.createElement('div');
        modalRoot.setAttribute('id', 'modal');
        document.body.appendChild(modalRoot);
        HTMLDialogElement.prototype.showModal = vi.fn();
        HTMLDialogElement.prototype.close = vi.fn();
        render(<Map modalState={true} />);
        // assert
        const modalElement = screen.getByTestId('modal');
        expect(modalElement).toBeInTheDocument();
        // act
        modalRoot.remove();
    });
});