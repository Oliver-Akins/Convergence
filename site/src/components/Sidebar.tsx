import React, { useState } from "react";
import { Button, SimpleDeleteButton } from "../components/Button";

function Sidebar({ friendsList }) {

    return (
        <section className="sidebar">
            <Button text="Friends List" onClickCallback={()=>{alert("Opens Friends List popup")}} />
            <div className="friends-list">
            {friendsList.map((friend, i) => {
                return (
                    <div className="friend friend--simple" key={i}>
                        { friend.imgSrc ? 
                            <img src={require(friend.imgSrc).default} className="friend__img--profile" alt=""></img>
                            :<img src={require("../images/icons/profile.svg").default} className="friend__img--profile" alt=""></img>
                        }
                        <div className="friend__info">
                            <p className="friend__name">{ friend.username }</p>
                            <p className="friend__id">#{ friend.id }</p>
                        </div>
                        <SimpleDeleteButton onClickCallback={()=>{alert("Removes friend from comparison")}} />
                    </div>
                );
            })}
            </div>
        </section>
    );
}

export default Sidebar;
