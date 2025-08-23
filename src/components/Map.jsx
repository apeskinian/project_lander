import { useMapData } from "../util/useMapData"
import { gameToImage } from "../util/pixelMap";
import { useEffect, useRef, useState } from "react";
import { faBullseye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePOI } from "../context/POIContext";

export default function Map() {
    const { useFullPOIS } = usePOI();
    const imageRef = useRef(null);
    const [chosenPOI, setChosenPOI] = useState()
    const [imageSize, setImageSize] = useState({ width: 2048, height: 2048 });
    const { mapData, loading, error } = useMapData();

    useEffect(() => {
        if (!mapData?.images?.blank) return;
        const observer = new ResizeObserver(([entry]) => {
            const { width, height } = entry.contentRect;
            setImageSize({ width, height });
            setChosenPOI(null)
        });
        if (imageRef.current) observer.observe(imageRef.current);
        return () => observer.disconnect();
    }, [mapData]);

    if (loading) return <p>Loading map...</p>;
    if (error) return <p>Error loading map: {error.message}</p>;
    if (!mapData) return <p>No map data available.</p>

    const options = useFullPOIS ? mapData.pois : mapData.pois.filter(poi => poi.id.startsWith('Athena.Location.POI'));

    function handleChooseLocation() {
        const pickedPOI = options[Math.floor(Math.random() * options.length)];
        const { x, y } = gameToImage(pickedPOI.location.x, pickedPOI.location.y);
        const left = x * imageSize.width;
        const top = y * imageSize.height;
        setChosenPOI({
            name: pickedPOI.name,
            left: left,
            top: top
        })
    }

    return (
        <>
            <div id="map-container" className="flex-grow" onClick={handleChooseLocation}>
                <div id='map' className="relative text-center">
                    <img
                        src={mapData.images.blank}
                        alt='Fortnite POIs map'
                        ref={imageRef}
                    />
                    {chosenPOI && (
                        <>
                            <div
                                key={`${chosenPOI.left}+${chosenPOI.top}`}
                                className="absolute text-amber-300 flex flex-col items-center whitespace-nowrap"
                                style={{
                                    left: `${chosenPOI.left}px`,
                                    top: `${chosenPOI.top}px`,
                                    transform: 'translate(-50%, -50%)',
                                }}
                            >
                                <FontAwesomeIcon
                                    className="text-2xl md:text-3xl lg:text-4xl drop-shadow-[0_0_4px_black]"
                                    icon={faBullseye}
                                    beat
                                />
                            </div>
                        </>
                    )}
                </div>
                {chosenPOI && (
                    <p className="absolute mt-3 text-2xl text-white">
                        {chosenPOI.name.toUpperCase()}
                    </p>
                )}
            </div >
        </>
    )
}