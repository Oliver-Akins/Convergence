import React, { useState } from "react";
import { Button, SimpleDeleteButton } from "./Button";
import ModalFriends from "./modals/ModalFriends";
import Friend from "./Friend";

function Sidebar({ friendsList, setFriendsList, acceptedFriendsList, setAcceptedFriendsList, friendsToCompare, setFriendsToCompare }) {
    const [openFriendsModal, setOpenFriendsModal] = useState(false);

    const RemoveButton = ({friend}) => <SimpleDeleteButton outlined={true} onClickCallback={() => { setFriendsToCompare(friendsToCompare.filter(function(e) { return e !== friend })) }} />;

    return (
        <section className="sidebar">
            {/* TODO refactor this intense prop drilling with a singular state */}
            { openFriendsModal && 
                <ModalFriends   
                    friendsList={friendsList}
                    setFriendsList={setFriendsList}
                    acceptedFriendsList={acceptedFriendsList}
                    setAcceptedFriendsList={setAcceptedFriendsList}
                    friendsToCompare={friendsToCompare} 
                    setFriendsToCompare={setFriendsToCompare} 
                    setOpen={ setOpenFriendsModal 
                }/>}
            <Button text="Friends List" onClickCallback={()=> { setOpenFriendsModal(true) }} />
            <div className="friends-list">
            {friendsToCompare && friendsToCompare.map((friend, i) => {
                return (
                   <Friend person={friend} classes={"person--simple"} key={i}>
                        <RemoveButton friend={friend}></RemoveButton>
                   </Friend>
                );
            })}
            </div>
        </section>
    );
}

export default Sidebar;
