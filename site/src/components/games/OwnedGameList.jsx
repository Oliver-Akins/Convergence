import React from "react";

import OwnedGame from "./OwnedGame";
import { DeletableButton } from "../Button";
import HamburgerMenu from "../HamburgerMenu";

import { deleteGames } from "../api/gameEndpoints";

function OwnedGameList({ ownedGames, ownedGamesSimple, setOwnedGames, setOwnedGamesSimple, children }) {
    const handleDeleteGame = async (game) => {
        try {
            let gamesParsed = ownedGamesSimple;
            gamesParsed[game.slug] = null;
            console.log(gamesParsed);
            const response = await deleteGames(ownedGamesSimple);
            delete gamesParsed[game.slug];
            setOwnedGamesSimple({...gamesParsed});

            // parse displayed list
            const newDisplayedGames = ownedGames.filter((item) => { return item !== game });
            setOwnedGames(newDisplayedGames);
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
                    ownedGames.map((game, i) => {
                        return (
                            <OwnedGame game={game} key={game.name} >
                                <HamburgerMenu>
                                    <DeletableButton classes="btn--small btn--grey" text="Remove Game" onClickCallback={()=>{handleDeleteGame(game)}}/>
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
