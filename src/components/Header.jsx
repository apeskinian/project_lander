import { usePOI } from "../context/POIContext"

export default function Header() {
    const { useFullPOIS, setUseFullPOIS, triggerReset } = usePOI();

    return (
        <>
            <header className="p-3 flex items-center justify-between">
                <div className="flex items-center">
                    <h1 id="header">
                        <a href="http://www.apeskinian.com" target="_blank">apeskinian|</a>
                    </h1>
                    <h2 onClick={triggerReset}>lander</h2>
                </div>
                <div className="flex items-center gap-3">
                    <p>{useFullPOIS ? 'All POIs' : 'Main POIs'}</p>
                    <input
                        className="toggle bg-indigo-500 text-indigo-900 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
                        type="checkbox"
                        checked={useFullPOIS}
                        onChange={() => setUseFullPOIS(prev => !prev)}
                    />
                </div>
            </header>
        </>
    )
}