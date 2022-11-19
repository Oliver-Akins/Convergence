import React, { useState } from "react";
import { Button, SimpleDeleteButton } from "./Button";
import ModalFriends from "./modals/ModalFriends";
import Friend from "./Friend";

function Sidebar({ friendsList, friendsToCompare }) {
    const [openFriendsModal, setOpenFriendsModal] = useState(false);

    const RemoveButton = () => <SimpleDeleteButton outlined={true} onClickCallback={()=>{alert("Removes friend from comparison")}} />;

    return (
        <section className="sidebar">
            { openFriendsModal && <ModalFriends friendsList={friendsList} setOpen={ setOpenFriendsModal }/>}
            <Button text="Friends List" onClickCallback={()=> { setOpenFriendsModal(true) }} />
            <div className="friends-list">
            {friendsToCompare && friendsToCompare.map((friend, i) => {
                return (
                   <Friend person={friend} classes={"person--simple"} key={i} buttons={ [RemoveButton] }/>
                );
            })}
            </div>
        </section>
    );
}

export default Sidebar;
