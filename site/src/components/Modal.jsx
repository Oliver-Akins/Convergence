import React, { useState, useEffect } from "react";
import { SimpleDeleteButton } from "./Button";

function Modal({ setOpen, children, classes }) {
    const closeOnOverlay = (e) => {
        e.preventDefault();
        if(e.target === e.currentTarget) {
            setOpen(false);
        }
    }

    useEffect(() => {
        const listener = event => {
          if (event.code === "Escape") {
            event.preventDefault();
            setOpen(false);
          }
        };
        document.addEventListener("keydown", listener);
        return () => {
          document.removeEventListener("keydown", listener);
        };
      }, [setOpen]);
    

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
