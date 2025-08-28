import { usePOI } from "../context/POIContext"
import { useMapData } from "../util/useMapData";

export default function Header() {
    const { useFullPOIS, setUseFullPOIS, triggerReset } = usePOI();
    const { fetchMapData } = useMapData();

    function handleRefresh() {
        triggerReset();
        fetchMapData();
    }

    return (
        <header className="p-3 flex items-center justify-between">
            <div className="flex items-center">
                <h1 id="header">
                    <a href="http://www.apeskinian.com" target="_blank">a|</a>
                </h1>
                <h2 onClick={handleRefresh}>lander</h2>
            </div>
            <div className="flex items-center gap-3">
                <p id="showing-pois">{useFullPOIS ? 'All POIs' : 'Main POIs'}</p>
                <input
                    id="poi-toggle"
                    className="toggle"
                    type="checkbox"
                    checked={useFullPOIS}
                    onChange={() => setUseFullPOIS(prev => !prev)}
                />
            </div>
        </header>
    )
}