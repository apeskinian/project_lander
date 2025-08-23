import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Footer() {
    return (
        <>
            <div className="p-3 flex justify-center gap-3 text-4xl text-gray-500 object-bottom">
                <a href="https://www.linkedin.com/in/apeskinian/" target="_blank">
                    <FontAwesomeIcon icon={faLinkedin} />
                </a>
                <a href="https://github.com/apeskinian" target="_blank">
                    <FontAwesomeIcon icon={faGithub} />
                </a>
            </div>
        </>
    )
}