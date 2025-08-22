import { useMapData } from '../util/useMapData.js'
import { gameToPixel } from '../util/pixelMap.js';


export default function MapViewer() {
    const { mapData, loading, error } = useMapData();
    
    if (loading) return <p>Loading map...</p>;
    if (error) return <p>Error loading map: {error.message}</p>;
    if (!mapData) return <p>No map data available.</p>
    
    // const options = mapData.pois.filter(poi => poi.id.startsWith('Athena.Location.POI'))
    const options = mapData.pois
    console.log(mapData)

    return (
        <>
            <div>
                <div className="relative w-[2048px] h-[2048px]">
                    <img
                        src={mapData.images.blank}
                        alt='Fortnite POIs map'
                        className='absolute top-0 left-0 w-[2048px] h-[2048px]'
                    />
                    {options.map(poi => {
                        const { x, y } = gameToPixel(poi.location.x, poi.location.y)
                        console.log(poi.name, poi.location.x, poi.location.y)
                        return (
                            <div
                                key={`${poi.location.x}+${poi.location.y}`}
                                className="absolute text-white font-bold drop-shadow-[0_0_10px_black]"
                                style={{
                                    left: `${x}px`,
                                    top: `${y}px`,
                                    transform: 'translate(-50%, -50%)',
                                }}
                            >{poi.name.toUpperCase()}
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}