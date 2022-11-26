import React from "react";
import { Button } from "../Button";

function OwnedGame({ game, children }) {
    if(!game || !game.hasOwnProperty('name')) {
        return <></>;
    }

    return (
        <div className="game game--owned">
            { game.cover ? 
                <img src={game.cover} className="game__img" alt=""></img>
                :<img src={require("../../images/game-default.png")} className="game__img" alt=""></img>
            }
            <div className="game__info">
                <div className="game__header">
                    <p className="game__name">{ game.name }</p>
                    <div className="game__controls">
                        { children }
                    </div>
                </div>
                <div className="game__platforms">
                { game.platforms && game.platforms.map((platform, i) => {
                    return (
                        <Button text={platform} classes={`btn--pill btn--decorative platform platform--${ platform }`} key={i} />
                    );
                })}
                </div>
            </div>
        </div>
    );
}

export default OwnedGame;
