import { usePOI } from "../context/usePOIS"

export default function Header() {
    const { showFullPOIS, setShowFullPOIS, triggerReset } = usePOI();

    return (
        <header className="p-3 flex items-center justify-between">
            <div className="flex items-center">
                <h1 id="header">
                    <a href="http://www.apeskinian.com" target="_blank">a|</a>
                </h1>
                <h2 onClick={triggerReset}>lander</h2>
            </div>
            <div className="flex items-center gap-3">
                <p id="showing-pois">{showFullPOIS ? 'All POIs' : 'Main POIs'}</p>
                <input
                    id="poi-toggle"
                    className="toggle"
                    type="checkbox"
                    checked={showFullPOIS}
                    onChange={() => setShowFullPOIS(prev => !prev)}
                />
            </div>
        </header>
    )
}