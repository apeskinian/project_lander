import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Footer({ onOpen }) {
    return (
        <footer className="p-3 flex justify-between items-center text-gray-500">
            <div className='ms-6 flex items-center text-3xl'>
                <FontAwesomeIcon id="help-icon" icon={faCircleInfo} onClick={onOpen}/>
            </div>
            <div id='socials-links' className='me-6 flex items-center gap-1 text-3xl'>
                <p id='apeskinian'>
                    <a href="https://www.apeskinian.com" target="_blank" aria-label='visit my portfolio site'>apeskinian|</a>
                </p>
                <a href="https://www.linkedin.com/in/apeskinian" target="_blank" aria-label='view my linkedin profile'>
                    <FontAwesomeIcon icon={faLinkedin} />
                </a>
                <a href="https://github.com/apeskinian" target="_blank" aria-label='view my github profile'>
                    <FontAwesomeIcon icon={faGithub} />
                </a>
            </div>
        </footer>
    )
}