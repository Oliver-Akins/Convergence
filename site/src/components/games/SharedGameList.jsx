import React from "react";
import Game from "./Game";

function SharedGameList({ games=null, controls=null }) {
    if(!games || (games && games.length < 1)) {
        return <></>;
    }

    return (
        <section className="game-list game-list--shared scrollable">
            <>
            <div className="game-list__heading">
                <div>
                    <h2>Shared Games</h2>
                    { games && <p className="games-number">{ games.length } in common</p>}
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

export default SharedGameList;
