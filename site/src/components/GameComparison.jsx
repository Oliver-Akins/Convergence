import React from "react";
import Game from "./Game";

function GameComparison({ games=null }) {
    return (
        <section className="game-comparison">
            {games ? games.map((game, i) => {
                    return (
                        <Game game={game} key={i} />
                    );
            }):<p className="get-started-text">Select a Friend to Begin!</p>}
        </section>
    );
}

export default GameComparison;
