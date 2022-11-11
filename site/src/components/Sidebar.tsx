import React, { useState } from "react";
import { Button, SimpleDeleteButton } from "../components/Button";
import ModalFriends from "./modals/ModalFriends";
import Person from "./Person";

function Sidebar({ friendsList }) {
    const [openFriendsModal, setOpenFriendsModal] = useState(false);

    const RemoveButton = () => <SimpleDeleteButton outlined={true} onClickCallback={()=>{alert("Removes friend from comparison")}} />;

    return (
        <section className="sidebar">
            { openFriendsModal && <ModalFriends setOpen={ setOpenFriendsModal }/>}
            <Button text="Friends List" onClickCallback={()=> { setOpenFriendsModal(true) }} />
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
