import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

export default function Modal({ open, onClose }) {
    const dialog = useRef();

    useEffect(() => {
        if (open) {
            dialog.current.showModal();
        } else {
            dialog.current.close();
        }
    }, [open]);

    return createPortal(
        <dialog ref={dialog} className="help-modal" onClose={onClose}>
            <div id="modal-title">
                <h1>a|</h1>
                <h2>lander</h2>
            </div>
            <p>Welcome to the <strong>apeskinian|</strong> Fortnite landing site picker!</p>
            <p>Click on the map to get a landing site, click again to get another!</p>
            <p>Choose between all POIs and just main ones at the top!</p>
            <form method="dialog">
                <button id="close-modal">Close</button>
            </form>
        </dialog>,
        document.getElementById('modal')
    );
}