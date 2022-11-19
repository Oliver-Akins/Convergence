import React, { useState } from "react";
import { Button } from "../Button";
import Modal from "../Modal";
import Select from 'react-select';
import SearchList from "../SearchList";

import { getGameSearch, addGames } from "../api/gameEndpoints.ts";

const platformOptions = [
    { value: 'steam', label: 'Steam' },
    { value:  'switch', label: 'Nintendo Switch' },
    { value: 'epic', label: 'Epic Games Store' },
    { value: 'gog', label: 'GOG' },
];

function ModalAddGame({ setOpen }) {
    function AddGameButton({item}) {
        const handleAddGame = async (item) => {
            let passedGame = {
                [item.slug]: item.platforms
            };

            try {
                await addGames("@me", passedGame);
            } catch(e) {
                // TODO handle error
                console.log("Could not add game");
            }
        };

        return <Button text="Add Game" classes="btn--add-result" onClickCallback={() => {handleAddGame(item)}} />;
    }

    function ModalContent() {
        const [inputState, setInputState] = useState({
            "game-title": "",
            "game-publisher": "",
            "platforms": {}
        });
        const [searchResults, setSearchResults] = useState([]);
        const [searchState, setSearchState] = useState("");
    
        const handleChange = (e) => {
            const {id , value} = e.target; 
            setInputState(prevState => ({
                ...prevState,
                [id]: value
            }));
        }

        const handleSelectChange = (selectedOptions) => {
            setInputState(prevState => ({
                ...prevState,
                "platforms": {selectedOptions}
            }));
        }

        const handleSearchSubmit = async (e) => {
            e.preventDefault();

            try {
                await getGameSearch(searchState);
            } catch(e) {
                // TODO handle error
                console.log("Could not search games");
            }
            setSearchResults(JSON.parse(localStorage.getItem("gameSearch")));
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
                    <Button text="Add Custom Game"></Button>
                </div>
                <div className="card modal__form">
                    <div className="modal__inputs">
                        <label className="small-caps" htmlFor="game-search">Game Title</label>
                        <div className="input-combined">
                            <input type="text" id="game-search" className="input--game-search" onChange={(e) => { setSearchState(e.target.value) }}></input>
                            <Button classes="btn--game-search" text="Search Games" onClickCallback={async (e) => { handleSearchSubmit(e) }}></Button>
                        </div>
                    </div>
                    <SearchList results={searchResults} controls={[AddGameButton]}></SearchList>
                </div>
            </>
        );
    }

    return (
        <Modal setOpen={ setOpen } classes="add-game" children={[<ModalContent />]}/>
    )
}

export { ModalAddGame };
