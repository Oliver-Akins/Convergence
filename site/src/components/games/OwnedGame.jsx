import React from "react";
import { Button } from "../Button";

function OwnedGame({ gameTitle, platforms, children }) {
    return (
        <div className="game game--owned">
            <div className="game__info">
                <div className="game__header">
                    <p className="game__name">{ gameTitle }</p>
                    <div className="game__controls">
                        { children }
                    </div>
                </div>
                <div className="game__platforms">
                { platforms && platforms.map((platform, i) => {
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
