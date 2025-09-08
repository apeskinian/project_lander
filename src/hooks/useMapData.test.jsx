import { renderHook, waitFor } from '@testing-library/react';
import { useMapData } from './useMapData';

describe('useMapData', () => {
    beforeEach(() => {
        globalThis.fetch = vi.fn();
    });
    afterEach(() => {
        vi.resetAllMocks();
    });
    it('should fetch map data successfully', async () => {
        // arrange
        const mockData = { data: { name: 'test' } };
        (fetch).mockResolvedValueOnce({
            json: async () => mockData,
        });
        const { result } = renderHook(() => useMapData());
        // assert
        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });
        expect(result.current.mapData).toEqual(mockData.data);
        expect(result.current.error).toBe(null);
    });
    it('should handle fetch error', async () => {
        // arrange
        (fetch).mockRejectedValueOnce(new Error('error'));
        const { result } = renderHook(() => useMapData());
        //assert
        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });
        expect(result.current.mapData).toBe(null);
        expect(result.current.error).toBeInstanceOf(Error);
    });
    it('should handle no data is found', async () => {
        // arrange
        (fetch).mockResolvedValueOnce({
            json: async () => ({}),
        });
        const { result } = renderHook(() => useMapData());
        // assert
        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });
        expect(result.current.mapData).toBe(null);
    });
});