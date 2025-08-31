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
    const zoomRef = useRef(null);
    const labelAppearance = useRef(null);
    // state
    const [chosenPOI, setChosenPOI] = useState()
    const [poiMarker, setPoiMarker] = useState({ isChoosing: false, targetVisible: false, labelVisible: false, size: '2rem' })
    const [imageSize, setImageSize] = useState({ width: 2048, height: 2048 });
    const [zoomState, setZoomState] = useState({ level: 1, offsetX: 0, offsetY: 0 })

    const transform = `translate(${zoomState.offsetX}px, ${zoomState.offsetY}px) scale(${zoomState.level})`
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
            zoomOutReset()
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
        if (labelAppearance.current) {
            clearTimeout(labelAppearance.current);
            labelAppearance.current = null;
        }
        setPoiMarker(prevState => ({ ...prevState, targetVisible: false, labelVisible: false }));
        setTimeout(() => {
            setZoomState({ level: 1, offsetX: 0, offsetY: 0 })
        }, 200)
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
        // set chosen POI and show marker
        setChosenPOI({ name: pickedPOI.name, left, top });
        setPoiMarker(prevState => ({ ...prevState, targetVisible: true, size: '2rem' }))
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
            setZoomState({ level: zoom, offsetX, offsetY })
            setPoiMarker(prevState => ({ ...prevState, size: '0.8rem' }));
        }, 750);
        // show label
        setTimeout(() => {
            setPoiMarker(prevState => ({ ...prevState, isChoosing: false }))
        }, 2200);
        labelAppearance.current = setTimeout(() => {
            setPoiMarker(prevState => ({ ...prevState, labelVisible: true }))
        }, 2200);
    }

    // picks new POI when map is clicked
    function handleChooseLocation() {
        // check to see if a POI is currently being picked
        if (poiMarker.isChoosing) return;
        // set isChoosing to true to stop queuing
        setPoiMarker(prev => ({ ...prev, isChoosing: true }));
        // check if a POI was currently being shown if so reset map view before picking new POI
        if (poiMarker.targetVisible) {
            zoomOutReset();
            setTimeout(() => {
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
                    <div id='map' ref={zoomRef} style={{ transform }}>
                        <img src={mapData.images.blank} alt='Fortnite POIs map' ref={imageRef} />
                        {chosenPOI && (
                            <div
                                id="poi-marker"
                                style={{
                                    left: `${chosenPOI.left}px`,
                                    top: `${chosenPOI.top}px`,
                                    opacity: poiMarker.targetVisible ? 1 : 0
                                }}>
                                <FontAwesomeIcon
                                    icon={faBullseye} style={{ fontSize: poiMarker.size }} beat
                                    className="drop-shadow-[0_0_4px_black] transition-all duration-1000 ease-in-out"
                                />
                            </div>
                        )}
                    </div>
                    {chosenPOI && (
                        <p
                            id="poi-label"
                            style={{
                                left: `${chosenPOI.left * zoomState.level + zoomState.offsetX}px`,
                                top: `${chosenPOI.top * zoomState.level + zoomState.offsetY}px`,
                                opacity: poiMarker.labelVisible ? 1 : 0
                            }}>
                            {chosenPOI.name.toUpperCase()}
                        </p>
                    )}
                </div>
            </main >
        </>
    )
}