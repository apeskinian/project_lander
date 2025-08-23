import { useMapData } from "../util/useMapData"
import { gameToImage } from "../util/pixelMap";
import { useEffect, useRef, useState } from "react";
import { faBullseye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePOI } from "../context/POIContext";

export default function Map() {
    const { useFullPOIS, resetTimestamp, triggerReset } = usePOI();
    const imageRef = useRef(null);
    const [chosenPOI, setChosenPOI] = useState()
    const [imageSize, setImageSize] = useState({ width: 2048, height: 2048 });
    const { mapData, loading, error } = useMapData();
    const [showLabel, setShowLabel] = useState(false);
    const [markerVisible, setMarkerVisible] = useState(true);
    const [markerSize, setMarkerSize] = useState('2rem');
    const zoomRef = useRef(null);
    const [zoomTransform, setZoomTransform] = useState('scale(1)');

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

    useEffect(() => {
        zoomOutReset();
        setTimeout(() => {
            setChosenPOI(null);
        }, 2000);
    }, [useFullPOIS, resetTimestamp]);

    if (loading) return <p>Loading map...</p>;
    if (error) return <p>Error loading map: {error.message}</p>;
    if (!mapData) return <p>No map data available.</p>

    const options = useFullPOIS ? mapData.pois : mapData.pois.filter(poi => poi.id.startsWith('Athena.Location.POI'));

    function zoomOutReset() {
        setZoomTransform('scale(1) translate(0px, 0px)');
        setShowLabel(false);
        setMarkerVisible(false);
    }

    function pickPOI() {
        const pickedPOI = options[Math.floor(Math.random() * options.length)];
        const { x, y } = gameToImage(pickedPOI.location.x, pickedPOI.location.y);
        const left = x * imageSize.width;
        const top = y * imageSize.height;

        setChosenPOI({ name: pickedPOI.name, left, top });
        setMarkerSize('2rem')
        setMarkerVisible(true);

        setTimeout(() => {
            const zoomLevel = 5;

            const container = zoomRef.current?.parentElement;
            const containerWidth = container?.offsetWidth || 0;
            const containerHeight = container?.offsetHeight || 0;

            const scaledLeft = left * zoomLevel;
            const scaledTop = top * zoomLevel;

            const offsetX = containerWidth / 2 - scaledLeft;
            const offsetY = containerHeight / 2 - scaledTop;

            setMarkerSize('0.8rem')
            setZoomTransform(`translate(${offsetX}px, ${offsetY}px) scale(${zoomLevel})`);
        }, 500);
        setTimeout(() => {
            setShowLabel(true);
        }, 1500);
    }

    function handleChooseLocation() {
        if (showLabel) {
            zoomOutReset();
            setTimeout(() => {
                setChosenPOI(null);
                pickPOI();
            }, 2000);
        } else {
            pickPOI();
        }
    }

    return (
        <>
            <div id="map-container" className="flex-grow" onClick={handleChooseLocation}>
                <div id='map' className="relative overflow-hidden text-center bg-[#093576]">
                    <div
                        ref={zoomRef}
                        className="transition-transform duration-2000 ease-in-out"
                        style={{ transform: zoomTransform, transformOrigin: 'top left' }}
                    >
                        <img
                            src={mapData.images.blank}
                            alt='Fortnite POIs map'
                            ref={imageRef}
                        />
                        {chosenPOI && (
                            <div
                                key={`${chosenPOI.left}+${chosenPOI.top}`}
                                className="absolute text-amber-300 flex flex-col items-center whitespace-nowrap"
                                style={{
                                    left: `${chosenPOI.left}px`,
                                    top: `${chosenPOI.top}px`,
                                    transform: 'translate(-50%, -50%)',
                                    opacity: markerVisible ? 1 : 0,
                                    transition: 'opacity 0.5s ease-in-out',
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={faBullseye}
                                    style={{ fontSize: markerSize }}
                                    className="drop-shadow-[0_0_4px_black] transition-all duration-1000 ease-in-out"
                                    beat
                                />
                                <p
                                    id="chosen-poi"
                                    className={`bg-gray-800/30 drop-shadow-[0_0_2px_black] text-[0.3rem] absolute mt-4 text-white leading-tight transition-opacity duration-500 ${showLabel ? 'opacity-100' : 'opacity-0'}`}
                                >
                                    {chosenPOI.name.toUpperCase()}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div >
        </>
    )
}