import React from "react";

function HamburgerMenu({ classes, children }) {
    return (
        <div className={`hamburger ${classes}`}>
            <button className="btn-icon btn-icon--hamburger">
                <img src={require("../images/icons/hamburger.svg").default} alt="Menu"></img>
            </button>
            <div className="hamburger__controls">
                { children }
            </div>
        </div>
    );
};

export default HamburgerMenu;