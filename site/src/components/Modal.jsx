import React, { useState } from "react";
import { SimpleDeleteButton } from "./Button";

function Modal({ setOpen, children, classes }) {
    const closeOnOverlay = (e) => {
        e.preventDefault();
        if(e.target === e.currentTarget) {
            setOpen(false);
        }
    }

    return (
        <div className="overlay scrollable--light" onClick={closeOnOverlay}>
            <section tabIndex={-1} role="dialog" className={`modal ${classes}`}>
                <div className="modal__button--close">
                    <SimpleDeleteButton onClickCallback={()=>{setOpen(false)}} thin={true} />
                </div>
                { children && children.map((ChildEl) => ChildEl) }
            </section>
        </div>
    )
}

export default Modal;
