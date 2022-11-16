import React from "react";
import { Button } from "./Button";

function Game({ game }) {
    return (
        <div className="game">
            { game.imgSrc ? 
                <img src={require(game.imgSrc).default} className="game__img" alt=""></img>
                :<img src={require("../images/game-default.png")} className="game__img" alt=""></img>
            }
            <div className="game__info">
                <p className="game__name">{ game.name }</p>
                <div className="game__platforms">
                { game.platforms && game.platforms.map((platform, i) => {
                    return (
                        <Button text={platform} iconSrc={`icons/${ platform }.svg`} classes={`btn--pill btn--decorative platform platform--${ platform }`} key={i} />
                    );
                })}
                </div>
            </div>
        </div>
    );
}

export default Game;
