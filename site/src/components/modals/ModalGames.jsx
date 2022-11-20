import React, { useState } from "react";
import { Button } from "../Button";
import Modal from "../Modal";
import Select from 'react-select';
import SearchList from "../SearchList";

import { getGameSearch, addGames } from "../api/gameEndpoints.ts";

const platformOptions = [
    { value: 'Steam', label: 'Steam' },
    { value: 'PC', label: 'PC' },
    { value: 'Nintendo Switch', label: 'Nintendo Switch' },
    { value: 'PlayStation 4', label: 'PlayStation 4' },
    { value: 'Xbox One', label: 'Xbox One' },
    { value: 'MacOS', label: 'Mac' },
    { value: 'Linux', label: 'Linux' },
    { value: 'Android', label: 'Android' },
    { value: 'IOS', label: 'iOS' },
    { value: 'Nintendo 3DS', label: 'Nintendo 3DS' },
];

function ModalAddGame({ setOpen }) {
    const handleAddGame = async (item) => {
        try {
            await addGames("@me", item);
            // setOpen(false);
        } catch(e) {
            // TODO handle error
            console.log("Could not add game");
        } 
    };

    const handleAddCustomGame = async (item) => {
        if(item["game-title"] === "" || Object.keys(item.platforms).length === 0) {
            // TODO validation
        } else {
            item["game-title"] = item["game-title"].replace(/ /g,"-");
            let itemParsed = {
                [item["game-title"]]: item.platforms.selectedOptions.map((obj) => obj.value) 
            };
            await handleAddGame(itemParsed);
        }
    };

    function AddGameButton({item}) {
        return <Button text="Add Game" classes="btn--add-result" onClickCallback={() => {handleAddGame({[item.slug]: item.platforms})}} />;
    }

    function ModalContent() {
        const [inputState, setInputState] = useState({
            "game-title": "",
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
                let searchResults = await getGameSearch(searchState);
                setSearchResults(searchResults)
            } catch(e) {
                // TODO handle error
                console.log("Could not search games");
            }
        }

        return (
            <>
                <h2 className="modal__header">Add New Game</h2>
                <div className="card modal__form">
                    <div className="modal__inputs">
                        <label className="small-caps" htmlFor="game-title">Game Title</label>
                        <input type="text" id="game-title" onChange={handleChange}></input>
                        <label className="small-caps" htmlFor="platforms">Platforms</label>
                        <Select className="select" isMulti name="platforms" id="platforms" onChange={handleSelectChange} options={platformOptions} />
                    </div>
                    <div className="modal__controls">
                        <Button text="Add Custom Game" classes="btn--small" onClickCallback={() => {handleAddCustomGame(inputState)}}></Button>
                    </div>
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
        <Modal setOpen={ setOpen } classes="modal--add-game" children={[<ModalContent />]}/>
    )
}

export { ModalAddGame };
