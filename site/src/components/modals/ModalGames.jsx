import React, { useState } from "react";
import { Button } from "../Button";
import Modal from "../Modal";

function ModalAddGame({ setOpen }) {
    function ModalContent() {
        return (
            <>
                <h2 className="modal__header">Add New Game</h2>
                <div className="card modal__form">
                    <div className="modal__inputs">
                        <label className="small-caps" htmlFor="addGame">Game Title</label>
                        <input type="text" id="addGame"></input>
                    </div>
                </div>
                <div className="modal__controls">
                    <Button text="Add Game"></Button>
                </div>
            </>
        );
    }

    return (
        <Modal setOpen={ setOpen } classes="add-game" children={[<ModalContent />]}/>
    )
}

export { ModalAddGame };
