/*
 * custom hook to fetch the map data from fortnite-api.com
 * returns the mapData, loading status and any errors.
*/
import { useEffect, useState } from "react";

export function useMapData() {
    // setting states
    const [mapData, setMapData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchMapData() {
            setLoading(true);
            try {
                const response = await fetch('https://fortnite-api.com/v1/map');
                const json = await response.json();
                setMapData(json?.data || null);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }
        fetchMapData();
    }, []);

    return { mapData, loading, error }
}