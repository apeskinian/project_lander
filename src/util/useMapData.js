/*
 * custom hook to fetch the map data from fortnite-api.com
 * returns the mapData, loading status and any errors.
*/
import { cache, useCallback, useEffect, useState } from "react";

export function useMapData() {
    // setting states
    const [mapData, setMapData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    const fetchMapData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch('https://fortnite-api.com/v1/map', {
                cache: 'no-store'
            });
            const json = await response.json();
            setMapData(json?.data || null);
            console.log('fetched new map')
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

useEffect(() => {
    fetchMapData();
}, [fetchMapData])

return { mapData, loading, error, fetchMapData }
}