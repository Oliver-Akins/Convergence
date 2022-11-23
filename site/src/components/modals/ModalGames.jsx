import React, { useState } from "react";
import { toast } from "react-toastify";

import { Button } from "../Button";
import Modal from "../Modal";
import SearchList from "../SearchList";

import { getOwnedGames, getGameSearch, addGames } from "../api/gameEndpoints.ts";

function ModalAddGame({ setOwnedGames, setOpen }) {
    const handleAddGame = async (item) => {
        try {
            let response = await addGames(item);
            if(!response || response.errors.length > 0) {
                toast.error("Error! Game could not be added.");
            } else if(response.successes.length > 0) {
                toast.success("Game added!");
                const ownedGames = await getOwnedGames();
                setOwnedGames(ownedGames);
            }
        } catch(e) {
            // TODO handle error
            toast.error("Error! Game could not be added.");
        } 
    };

    function AddGameButton({item}) {
        return <Button text="Add Game" classes="btn--add-result" onClickCallback={() => {handleAddGame({[item.slug]: item.platforms})}} />;
    }

    function ModalContent() {
        const [searchResults, setSearchResults] = useState([]);
        const [searchState, setSearchState] = useState("");

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
