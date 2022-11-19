import React from "react";
import { Button } from "./Button";

function Game({ game, controls }) {
    return (
        <div className="game">
            { game.cover ? 
                <img src={game.cover} className="game__img" alt=""></img>
                :<img src={require("../images/game-default.png")} className="game__img" alt=""></img>
            }
            <div className="game__info">
                <p className="game__name">{ game.name }</p>
                <div className="game__platforms">
                { game.platforms && game.platforms.map((platform, i) => {
                    return (
                        <Button text={platform} classes={`btn--pill btn--decorative platform platform--${ platform }`} key={i} />
                    );
                })}
                </div>
                { controls && 
                    controls.map((Control, i) => {
                        return <Control item={game} ></Control>
                    })
                }
            </div>
        </div>
    );
}

export default Game;
