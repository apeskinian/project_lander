import { useMapData } from '../util/useMapData.js'

export default function MapViewer() {
    const { mapData, loading, error } = useMapData();

    if (loading) return <p>Loading map...</p>;
    if (error) return <p>Error loading map: {error.message}</p>;
    if (!mapData) return <p>No map data available.</p>
    
    return (
        <>
            <div>
                <img
                    src={mapData.images.pois}
                    alt='Fortnite POIs map'
                    className='w-full rounded-4xl'
                />
                <h2 className='text-4xl text-center'>Points of Interest</h2>
                <ul>
                    {mapData.pois
                        .filter((poi) => poi.id.startsWith('Athena.Location.POI'))
                        .map((poi, index) => (
                        <li
                            key={index}
                            className='text-center'
                        >
                            {poi.name}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}