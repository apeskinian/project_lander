import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Footer({ onOpen, darkMode }) {
    return (
        <footer className={`p-3 flex justify-between items-center light-mode${darkMode ? ' dark-mode' : ' light-mode'}`}>
            <div className='ms-5 flex items-center'>
                <p id='apeskinian'>
                    <a href="https://www.apeskinian.com" data-testid="footer-link" target="_blank" aria-label='visit my portfolio site'>apeskinian|</a>
                </p>
            </div>
            <div className='me-5 flex items-center gap-1 text-3xl'>
                <button aria-label="show help" onClick={onOpen}>
                    <FontAwesomeIcon id="help-icon" icon={faCircleInfo} />
                </button>
            </div>
        </footer>
    );
}