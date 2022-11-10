import React from "react";
import Game from "./Game";

function GameComparison({ games=null }) {
    return (
        <section className="game-comparison">
            {games ? 
                <>
                    <div className="game-comparison__heading">
                        <h2>Shared Games</h2>
                        <p className="games-number">{ games.length } in common</p>
                    </div>
                    {games.map((game, i) => {
                        return (
                            <Game game={game} key={i} />
                        );
                    })}
                </>
            :<p className="get-started-text">Select a Friend to Begin!</p>}
        </section>
    );
}

export default GameComparison;
