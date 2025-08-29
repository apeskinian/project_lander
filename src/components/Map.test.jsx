import { render, screen } from '@testing-library/react'
import { expect } from 'vitest'
import userEvent from '@testing-library/user-event';
import Map from './Map';
import { im } from 'mathjs';

// mocking the font awesome icon
vi.mock('@fortawesome/react-fontawesome', () => ({
    FontAwesomeIcon: () => <span data-testid="icon" />,
}))
vi.mock('@fortawesome/free-solid-svg-icons', () => ({ faBullseye: {} }))

// mocking the usePOI hook
const resetTimestamp = vi.fn()
let showFullPOISValue = true
vi.mock('../context/usePOIS', () => ({
    usePOI: () => ({ showFullPOIS: showFullPOISValue, resetTimestamp }),
}))

// mocking the useMapData hook
let mapDataValue = {
    images: { blank: 'test-image-url' },
    pois: [
        { id: 'Athena.Location.POI.Test1', name: 'Test POI', location: { x: 10, y: 20 } },
        { id: 'Athena.Location.POI.Test2', name: 'Another POI', location: { x: 30, y: 40 } },
        { id: 'Test3', name: 'And Another POI', location: { x: 40, y: 50 } },
        { id: 'Test4', name: 'Yet Another POI', location: { x: 50, y: 60 } }
    ]
};
let loading = null
let error = null
vi.mock('../hooks/useMapData', () => ({
    useMapData: () => ({ mapData: mapDataValue, loading, error }),
}))

// mocking the gameToImage util
vi.mock('../util/pixelMap', () => ({
    gameToImage: () => ({ left: 100, top: 100 }),
}))

//mocking the resize observer
class ResizeObserver {
    observe() { }
    unobserve() { }
    disconnect() { }
}
global.ResizeObserver = ResizeObserver;

describe('Map component', () => {
    it('renders a main element', () => {
        // arrange
        render(<Map />);
        // assert
        const mainElement = screen.getByRole('main');
        expect(mainElement).toBeInTheDocument();
    })
    it('renders a loading message while data is loading', () => {
        // arrange
        loading = true
        mapDataValue = null
        render(<Map />);
        // assert
        const loadingMessage = screen.getByText('Loading map data...');
        expect(loadingMessage).toBeInTheDocument();
    })
    it('renders an error message if an error occurred while fetching data', () => {
        // arrange
        error = 'ERROR'
        render(<Map />);
        // assert
        const errorMessage = screen.getByText('Error loading map:');
        const reloadMessage = screen.getByText(/please try reloading the page/i);
        expect(errorMessage).toBeInTheDocument();
        expect(reloadMessage).toBeInTheDocument();
    })
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
    })
    it('renders the map image when map data is loaded successfully', () => {
        // arrange
        mapDataValue = {
            images: { blank: 'test-image-url' },
        };
        loading = false
        error = null
        render(<Map />);
        // assert
        const mapElement = screen.getByAltText('Fortnite POIs map');
        expect(mapElement).toBeInTheDocument();
    })
})