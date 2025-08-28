import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Footer() {
    return (
        <footer className="p-3 flex justify-between items-center text-gray-500">
            <div className='ms-6'>
                <p id='apeskinian'>
                    <a href="http://www.apeskinian.com" target="_blank" aria-label='visit my portfolio site'>apeskinian|</a>
                </p>
            </div>
            <div className='me-6 flex gap-1 text-3xl'>
                <a href="https://www.linkedin.com/in/apeskinian/" target="_blank" aria-label='view my linkedin profile'>
                    <FontAwesomeIcon icon={faLinkedin} />
                </a>
                <a href="https://github.com/apeskinian" target="_blank" aria-label='view my github profile'>
                    <FontAwesomeIcon icon={faGithub} />
                </a>
            </div>
        </footer>
    )
}