import React from "react";
import Game from "./Game";

function GameComparison({ games }) {
    return (
        <section className="game-comparison">
            {games.map((game, i) => {
                    return (
                        <Game game={game} key={i} />
                    );
            })}
        </section>
    );
}

export default GameComparison;
