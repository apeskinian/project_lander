import { usePOI } from "../context/usePOIS";
import { faCircleHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Header({ changeMode, darkMode }) {
    const { showFullPOIS, setShowFullPOIS, triggerReset } = usePOI();

    return (
        <header className={`p-3 flex items-center justify-between${darkMode ? ' dark-mode' : ' light-mode'}`}>
            <div className="flex items-center">
                <h1 id="a">
                    <a href="https://www.apeskinian.com" data-testid="header-link" target="_blank" aria-label='visit my portfolio site'>a|</a>
                </h1>
                <h2 id="lander" onClick={triggerReset}>lander</h2>
            </div>
            <div className="flex items-center gap-3">
                <label id="showing-pois" htmlFor="poi-toggle" aria-label="click to change poi sets">{showFullPOIS ? 'All POIs' : 'Main POIs'}</label>
                <input
                    id="poi-toggle"
                    className="toggle"
                    type="checkbox"
                    checked={showFullPOIS}
                    onChange={() => setShowFullPOIS(prev => !prev)}
                />
                <button className="text-xl" aria-label="toggle light and dark mode" onClick={changeMode}>
                    <FontAwesomeIcon id="mode-change" icon={faCircleHalfStroke} />
                </button>
            </div>
        </header>
    );
}