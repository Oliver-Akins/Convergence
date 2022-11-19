import React from "react";
import OwnedGame from "./OwnedGame";

function OwnedGameList({ games=null }) {
    return (
        <section className="game-list scrollable">
            <>
            <div className="game-list__heading">
                <div>
                    <h2>All Games</h2>
                    { games && <p className="games-number">{ Object.keys(games).length }</p>}
                </div>
            </div>
            <div className="game-list__games">
                {games &&
                    Object.keys(games).map((gameTitle, i) => {
                        return (
                            <OwnedGame gameTitle={gameTitle} platforms={games[gameTitle]} key={i} />
                        );
                    })
                }
            </div>
            </>
        </section>
    );
}

export default OwnedGameList;
