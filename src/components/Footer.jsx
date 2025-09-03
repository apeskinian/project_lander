import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Footer({ onOpen }) {
    return (
        <footer className="p-3 flex justify-between items-center text-gray-500">
            <div className='ms-5 flex items-center'>
                <p id='apeskinian'>
                    <a href="https://www.apeskinian.com" data-testId="footer-link" target="_blank" aria-label='visit my portfolio site'>apeskinian|</a>
                </p>
            </div>
            <div className='me-5 flex items-center gap-1 text-3xl' aria-label="show help">
                <FontAwesomeIcon id="help-icon" icon={faCircleInfo} onClick={onOpen} />
            </div>
        </footer>
    )
}