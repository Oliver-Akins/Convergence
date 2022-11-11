import React from "react";
import { Button, SimpleDeleteButton } from "../components/Button";
import Person from "./Person";

function Sidebar({ friendsList }) {

    const RemoveButton = () => <SimpleDeleteButton outlined={true} onClickCallback={()=>{alert("Removes friend from comparison")}} />;

    return (
        <section className="sidebar">
            <Button text="Friends List" onClickCallback={()=>{alert("Opens Friends List popup")}} />
            <div className="friends-list">
            {friendsList.map((friend, i) => {
                return (
                   <Person person={friend} classes={"person--simple"} key={i} buttons={ [RemoveButton] }/>
                );
            })}
            </div>
        </section>
    );
}

export default Sidebar;
