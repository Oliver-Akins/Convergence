import React from "react";

function HamburgerMenu({ classes, children }) {
    return (
        <div className={`hamburger ${classes}`}>
            <button className="btn-icon btn-icon--hamburger">
                <img src={require("../images/icons/hamburger.svg").default} alt="Menu"></img>
                <div className="hamburger__controls">
                    { children }
                </div>
            </button>
        </div>
    );
};

export default HamburgerMenu;