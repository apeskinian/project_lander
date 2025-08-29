import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullseye } from '@fortawesome/free-solid-svg-icons';

import { usePOI } from "../context/usePOIS";
import { useMapData } from "../hooks/useMapData";
import { gameToImage } from "../util/pixelMap";

export default function Map() {
    // context hooks
    const { showFullPOIS, resetTimestamp } = usePOI();
    //custom hooks
    const { mapData, loading, error } = useMapData();
    // refs
    const imageRef = useRef(null);
    const isChoosing = useRef(false);
    const zoomRef = useRef(null);
    // state
    const [chosenPOI, setChosenPOI] = useState()
    const [imageSize, setImageSize] = useState({ width: 2048, height: 2048 });
    const [markerVisible, setMarkerVisible] = useState(true);
    const [markerSize, setMarkerSize] = useState('2rem');
    const [offsetX, setOffsetX] = useState(0);
    const [offsetY, setOffsetY] = useState(0);
    const [showLabel, setShowLabel] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(1);
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
    }, [showFullPOIS, resetTimestamp]);

    // dynamic message for current status
    if (loading || error || !mapData) return (
        <main>
            <div className="message-block">
                {loading && !mapData && (<p>Loading map data...</p>)}
                {error && (<p className="mb-3">Error loading map: <strong>{error.message}</strong></p>)}
                {!mapData && !loading && !error && (<p className="mb-3">No map data available.</p>)}
                {(error || (!mapData && !loading)) && (<p>Please try reloading the page, if this keeps happening, please contact me.</p>)}
            </div>
        </main>
    )

    /* 
     * getting all landing zones from mapData according to current chosen
     * filter set from the toggle in the header
    */
    const options = (
        showFullPOIS ? mapData.pois : mapData.pois.filter(poi => poi.id.startsWith('Athena.Location.POI'))
    );

    // zoom the map out and reset
    function zoomOutReset() {
        setShowLabel(false);
        setMarkerVisible(false);
        setZoomTransform('scale(1) translate(0px, 0px)');
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
        const { left, top } = gameToImage(pickedPOI.location.x, pickedPOI.location.y, imageSize);
        // set chosen POI
        setChosenPOI({ name: pickedPOI.name, left, top });
        setMarkerSize('2rem')
        setMarkerVisible(true);
        // zooms in to chosen POI, marker size is reduced
        setTimeout(() => {
            const zoom = 5;
            const container = zoomRef.current?.parentElement;
            const containerWidth = container?.offsetWidth || 0;
            const containerHeight = container?.offsetHeight || 0;
            const scaledLeft = left * zoom;
            const scaledTop = top * zoom;
            const offsetX = containerWidth / 2 - scaledLeft;
            const offsetY = containerHeight / 2 - scaledTop;
            setZoomLevel(zoom);
            setOffsetX(offsetX);
            setOffsetY(offsetY);
            setMarkerSize('0.8rem');
            setZoomTransform(`translate(${offsetX}px, ${offsetY}px) scale(${zoom})`);
        }, 750);
        // label is shown
        setTimeout(() => {
            setShowLabel(true);
            isChoosing.current = false;
        }, 2100);
    }

    // picks new POI when map is clicked
    function handleChooseLocation() {
        // first check if the map has been clicked recently and is currently
        // picking a new location
        if (isChoosing.current) return;
        // set isChoosing to true, multiple clicks will not queue now
        isChoosing.current = true;
        // check if a POI was currently being shown
        if (showLabel) {
            zoomOutReset();
            setTimeout(() => {
                setChosenPOI(null);
                pickPOI();
            }, 2000);
        } else {
            pickPOI();
        }
    };

    // handles accidental double clicking which will zoom in a bit
    function handleDoubleClick(e) {
        e.preventDefault();
    };

    return (
        <>
            <main onClick={handleChooseLocation} onDoubleClick={handleDoubleClick}>
                <div id="map-container" className="relative">
                    <div id='map' ref={zoomRef} style={{ transform: zoomTransform }}>
                        <img src={mapData.images.blank} alt='Fortnite POIs map' ref={imageRef}/>
                        {chosenPOI && (
                            <div id="poi-marker" style={{ left: `${chosenPOI.left}px`, top: `${chosenPOI.top}px`, opacity: markerVisible ? 1 : 0 }}>
                                <FontAwesomeIcon
                                    className="drop-shadow-[0_0_4px_black] transition-all duration-1000 ease-in-out"
                                    icon={faBullseye} style={{ fontSize: markerSize }} beat
                                />
                            </div>
                        )}
                    </div>
                    {chosenPOI && (
                        <p id="poi-label" style={{ left: `${chosenPOI.left * zoomLevel + offsetX}px`, top: `${chosenPOI.top * zoomLevel + offsetY + 50}px`, opacity: showLabel ? 1 : 0 }}>
                            {chosenPOI.name.toUpperCase()}
                        </p>
                    )}
                </div>
            </main >
        </>
    )
}