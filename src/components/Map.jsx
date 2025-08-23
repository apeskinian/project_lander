import { useMapData } from "../util/useMapData"
import { gameToImage } from "../util/pixelMap";
import { useEffect, useRef, useState } from "react";

export default function Map() {
    const imageRef = useRef(null);
    const [imageSize, setImageSize] = useState({ width: 2048, height: 2048 });
    const { mapData, loading, error } = useMapData();

    useEffect(() => {
        if (!mapData?.images?.blank) return;
        const observer = new ResizeObserver(([entry]) => {
            const { width, height } = entry.contentRect;
            setImageSize({ width, height });
        });
        if (imageRef.current) observer.observe(imageRef.current);
        return () => observer.disconnect();
    }, [mapData]);

    if (loading) return <p>Loading map...</p>;
    if (error) return <p>Error loading map: {error.message}</p>;
    if (!mapData) return <p>No map data available.</p>

    const options = mapData.pois;

    return (
        <>
        <div id="map-container">
            <div id='map' className="relative">
                <img
                    src={mapData.images.blank}
                    alt='Fortnite POIs map'
                    ref={imageRef}
                />
                {options.map(poi => {
                    const { x, y } = gameToImage(poi.location.x, poi.location.y);
                    const left = x * imageSize.width;
                    const top = y * imageSize.height;
                    return (
                        <div
                            key={`${poi.location.x}+${poi.location.y}`}
                            className="absolute text-white font-bold drop-shadow-[0_0_10px_black]"
                            style={{
                                left: `${left}px`,
                                top: `${top}px`,
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