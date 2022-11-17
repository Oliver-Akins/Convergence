import React, { useState } from "react";
import { Button } from "../Button";
import Modal from "../Modal";
import Select from 'react-select';

const platformOptions = [
    { value: 'steam', label: 'Steam' },
    { value:  'switch', label: 'Nintendo Switch' },
    { value: 'epic', label: 'Epic Games Store' },
    { value: 'gog', label: 'GOG' },
];

function ModalAddGame({ setOpen }) {
    function ModalContent() {
        const [inputState, setInputState] = useState({
            "game-title": "",
            "game-publisher": "",
            "platforms": {}
        });
    
        const handleChange = (e) => {
            const {id , value} = e.target; 
            setInputState(prevState => ({
                ...prevState,
                [id]: value
            }));

            console.log(inputState);
        }

        const handleSelectChange = (selectedOptions) => {
            setInputState(prevState => ({
                ...prevState,
                "platforms": {selectedOptions}
            }));
        }

        return (
            <>
                <h2 className="modal__header">Add New Game</h2>
                <div className="card modal__form">
                    <div className="modal__inputs">
                        <label className="small-caps" htmlFor="game-title">Game Title</label>
                        <input type="text" id="game-title" onChange={handleChange}></input>
                        <label className="small-caps" htmlFor="game-publisher">Publisher</label>
                        <input type="text" id="game-publisher" onChange={handleChange}></input>
                        <label className="small-caps" htmlFor="platforms">Platforms</label>
                        <Select className="select" isMulti name="platforms" id="platforms" onChange={handleSelectChange} options={platformOptions} />
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
