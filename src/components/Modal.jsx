import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

export default function Modal({ open, onClose, darkMode }) {
    const dialog = useRef();

    useEffect(() => {
        const hasSeenModal = localStorage.getItem('seenModal');
        if (open) {
            if (!hasSeenModal) {
                localStorage.setItem('seenModal', 'true');
            }
            dialog.current.showModal();
        } else {
            dialog.current.close();
        }
    }, [open]);

    return createPortal(
        <dialog ref={dialog} onClose={onClose} data-testid="modal"
            className={`help-modal w-80 sm:w-fit${darkMode ? ' dark-mode' : ' light-mode'}`}
        >
            <div id="modal-title">
                <h1>apeskinian|</h1>
            </div>
            <p>Click the map to get a site, click again to get another!</p>
            <p>Choose between all POIs and main POIs above.</p>
            <button id="close-modal" onClick={onClose}>Close</button>
        </dialog>,
        document.getElementById('modal')
    );
}