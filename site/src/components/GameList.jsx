import React from "react";
import Game from "./Game";

function GameList({ games=null, shared=false, controls=null }) {
    return (
        <section className={shared ? "game-list game-list--shared scrollable" : "game-list scrollable"}>
            <>
            <div className="game-list__heading">
                <div>
                    <h2>{ shared ? "Shared" : "All" } Games</h2>
                    { games && <p className="games-number">{ games.length } { shared && "in common"}</p>}
                </div>
                <div className="game-list__controls">
                    { controls && controls.map((Control, i) => { return <Control key={i} /> })}
                </div>
            </div>
            <div className="game-list__games">
                {games &&
                    games.map((game, i) => {
                        return (
                            <Game game={game} key={i} />
                        );
                    })
                }
            </div>
            </>
        </section>
    );
}

export default GameList;
