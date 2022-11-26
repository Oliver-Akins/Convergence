import React from "react";
import Game from "./Game";

function GameList({ games=null, controls=null }) {
    return (
        <section className="game-list scrollable">
            <div className="game-list__heading">
                <div>
                    <h2>All Games</h2>
                    { games && <p className="games-number">{ games.length }</p>}
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

export default GameList;
