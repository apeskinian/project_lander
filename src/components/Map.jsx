import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullseye } from '@fortawesome/free-solid-svg-icons';

import { usePOI } from "../context/POIContext";
import { useMapData } from "../util/useMapData";
import { gameToImage } from "../util/pixelMap";

export default function Map() {
    // context hooks
    const { useFullPOIS, resetTimestamp } = usePOI();
    //custom hooks
    const { mapData, loading, error } = useMapData();
    // refs
    const imageRef = useRef(null);
    const zoomRef = useRef(null);
    // state
    const [chosenPOI, setChosenPOI] = useState()
    const [imageSize, setImageSize] = useState({ width: 2048, height: 2048 });
    const [markerVisible, setMarkerVisible] = useState(true);
    const [markerSize, setMarkerSize] = useState('2rem');
    const [showLabel, setShowLabel] = useState(false);
    const [zoomTransform, setZoomTransform] = useState('scale(1)');

    /*
     * sets an observer on the image and clears the current POI state if the
     * image changes size, so when a window is resized the POI is cleared,
     * the imageSize state is also updated for POI placement
    */
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

    /*
     * zooms the map and resets when either the toggle switch or the 'lander'
     * text in the header is clicked
    */
    useEffect(() => {
        zoomOutReset();
    }, [useFullPOIS, resetTimestamp]);

    // return dynamic message
    if (loading || error || !mapData) return (
        <main>
            {loading && !mapData && (
                <div className="message-block">
                    <p>Loading map data...</p>
                </div>
            )}
            {error && (
                <div className="message-block">
                    <p className="mb-3">Error loading map: <strong>{error.message}</strong></p>
                    <p>Please try reloading the page, if the error persists, please contact me.</p>
                </div>
            )}
            {!mapData && !loading && !error && (
                <div className="message-block">
                    <p className="mb-3">No map data available.</p>
                    <p>Please try reloading the page, if this keeps happening, please contact me.</p>
                </div>
            )}
        </main>
    )

    /* 
     * getting all landing zones from mapData according to current chosen
     * filter set from the toggle in the header
    */
    const options = useFullPOIS ? mapData.pois : mapData.pois.filter(poi => poi.id.startsWith('Athena.Location.POI'));

    // zoom the map out and reset
    function zoomOutReset() {
        setZoomTransform('scale(1) translate(0px, 0px)');
        setShowLabel(false);
        setMarkerVisible(false);
    }

    /*
     * picks a new poi at random from the options and then gets the relative
     * image pixel coords from the gameToImage function, zooms the map centered
     * to the poi, label is then shown
    */
    function pickPOI() {
        // generate random POI
        const pickedPOI = options[Math.floor(Math.random() * options.length)];
        // get x and y pixel coords from game coords
        const { x, y } = gameToImage(pickedPOI.location.x, pickedPOI.location.y);
        const left = x * imageSize.width;
        const top = y * imageSize.height;
        // set state to reflect new POI
        setChosenPOI({ name: pickedPOI.name, left, top });
        setMarkerSize('2rem')
        setMarkerVisible(true);
        // zooms in to chosen POI, marker size is reduced
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
        // label is shown
        setTimeout(() => {
            setShowLabel(true);
        }, 1500);
    }

    // picks new POI when map is clicked
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
            <main onClick={handleChooseLocation}>
                <div id='map' className="relative">
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
            </main >
        </>
    )
}