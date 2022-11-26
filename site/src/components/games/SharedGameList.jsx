import React from "react";
import Game from "./Game";

function SharedGameList({ games=null, controls=null }) {
    return (
        <section className="game-list game-list--shared scrollable">
            <div className="game-list__heading">
                <div>
                    <h2>Shared Games</h2>
                    { games && games.length > 0?
                        <p className="games-number">{ games.length } in common</p>:
                        <p className="games-number">0</p>
                    }
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
        </section>
    );
}

export default SharedGameList;
