import { usePOI } from "../context/usePOIS"

export default function Header() {
    const { showFullPOIS, setShowFullPOIS, triggerReset } = usePOI();

    return (
        <header className="p-3 flex items-center justify-between">
            <div className="flex items-center">
                <h1 id="a">
                    <a href="https://www.apeskinian.com" data-testId="header-link" target="_blank" aria-label='visit my portfolio site'>a|</a>
                </h1>
                <h2 id="lander" onClick={triggerReset}>lander</h2>
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