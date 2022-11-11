import React, { useState } from "react";
import { SimpleDeleteButton } from "./Button";

function Modal({ children, classes }) {
    const [isOpen, setOpen] = useState(true);

    const closeOnOverlay = (e) => {
        e.preventDefault();
        if(e.target === e.currentTarget) {
            setOpen(false);
        }
    }

    if(isOpen) {
        return (
            <div className="overlay" onClick={closeOnOverlay}>
                <section tabIndex={-1} role="dialog" className={`modal ${classes}`}>
                    <div className="modal__button--close">
                        <SimpleDeleteButton onClickCallback={()=>{setOpen(false)}} thin={true} />
                    </div>
                    { children && children.map((ChildEl) => ChildEl) }
                </section>
            </div>
        )
    }
}

export default Modal;
