import React from "react";

import OwnedGame from "./OwnedGame";
import { DeletableButton } from "../Button";
import HamburgerMenu from "../HamburgerMenu";

import { deleteGames } from "../api/gameEndpoints";

function OwnedGameList({ ownedGames, setOwnedGames, children }) {
    const handleDeleteGame = async (gameTitle) => {
        try {
            let gamesParsed = ownedGames;
            gamesParsed[gameTitle] = null;
            const response = await deleteGames(ownedGames);
            delete gamesParsed[gameTitle];
            setOwnedGames({...gamesParsed});
        } catch(e) {

        }
    };

    return (
        <section className="game-list scrollable">
            <>
            <div className="game-list__heading">
                <div>
                    <h2>My Games</h2>
                    { ownedGames && <p className="games-number">{ Object.keys(ownedGames).length }</p>}
                    { children }
                </div>
            </div>
            <div className="game-list__games">
                {ownedGames &&
                    Object.keys(ownedGames).map((gameTitle, i) => {
                        return (
                            <OwnedGame gameTitle={gameTitle} platforms={ownedGames[gameTitle]} key={gameTitle} >
                                <HamburgerMenu>
                                    <DeletableButton classes="btn--small btn--grey" text="Remove Game" onClickCallback={()=>{handleDeleteGame(gameTitle)}}/>
                                </HamburgerMenu>
                            </OwnedGame>
                        );
                    })
                }
            </div>
            </>
        </section>
    );
}

export default OwnedGameList;
