import React from "react";

function Person({ person, classes, buttons }) {
    return (
        <div className={`person ${ classes }`}>
            { person.imgSrc ? 
                <img src={require(person.imgSrc).default} className="person__img" alt=""></img>
                :<img src={require("../images/icons/profile.svg").default} className="person__img" alt=""></img>
            }
            <div className="person__info">
                <p className="person__name">{ person.username }</p>
                <p className="person__id">#{ person.id }</p>
            </div>
            <div className="person__buttons">
                { buttons && buttons.map((AButton) => <AButton/>) }
            </div>
        </div>
    );
}

export default Person;
