// Custom hook to fetch the map data from fortnite-api.com
// Returns the mapData, loading status and any errors.
import { useEffect, useState } from "react";

export function useMapData() {
    const [ mapData, setMapData ] = useState(null);
    const [ loading, setLoading ] = useState(null);
    const [ error, setError ] = useState(null);

    useEffect(() => {
        let isMounted = true;
        setLoading(true);

        async function fetchMapData() {
            try {
                const response = await fetch('https://fortnite-api.com/v1/map');
                const json = await response.json();

                if (isMounted) {
                    setMapData(json?.data || null);
                    setLoading(false);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err);
                    setLoading(false);
                }
            }
        }

        fetchMapData();

        return () => {
            isMounted = false;
        }
    }, [])

    return { mapData, loading, error }
}