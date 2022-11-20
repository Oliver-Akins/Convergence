import React from "react";

function Friend({ person, classes, children }) {
    return (
        <div className={`person ${ classes }`}>
            { person.imgSrc ? 
                <img src={require(person.imgSrc).default} className="person__img" alt=""></img>
                :<img src={require("../images/icons/profile.svg").default} className="person__img" alt=""></img>
            }
            <div className="person__info">
                <p className="person__name">{ person }</p>
                <p className="person__id">#{  }</p>
            </div>
            <div className="person__buttons">
                { children }
            </div>
        </div>
    );
}

export default Friend;
