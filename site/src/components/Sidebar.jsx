import React, { useEffect, useState } from "react";
import { Button, SimpleDeleteButton, SimpleCheckButton } from "./Button";
import ModalFriends from "./modals/ModalFriends";
import Friend from "./Friend";

function Sidebar({ friendsList, setFriendsList, acceptedFriendsList, setAcceptedFriendsList, friendsToCompare, setFriendsToCompare }) {
    const [openFriendsModal, setOpenFriendsModal] = useState(false);
    const [friendsNotCompared, setFriendsNotCompared] = useState([]);
    const RemoveButton = ({friend}) => <SimpleDeleteButton outlined={true} onClickCallback={() => { setFriendsToCompare(friendsToCompare.filter(function(e) { return e !== friend })) }} />;

    useEffect(() => {
        let filtered = acceptedFriendsList.filter((item) => {
            return !friendsToCompare.includes(item);
        });
        setFriendsNotCompared(filtered);
    }, [acceptedFriendsList, friendsToCompare]);

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
            {(friendsToCompare && friendsToCompare.length > 0) && 
            <div className="friends-list friends-list--compared">
                {friendsToCompare.map((friend, i) => {
                    return (
                    <Friend person={friend} classes={"person--simple"} key={i}>
                            <RemoveButton friend={friend}></RemoveButton>
                    </Friend>
                    );
                })}
            </div>
            }
            {(friendsNotCompared && friendsNotCompared.length > 0) &&
            <div className="friends-list">
                {friendsNotCompared.map((friend, i) => {
                    return (
                    <Friend person={friend} classes={"person--simple"} key={i}>
                            <SimpleCheckButton friend={friend} outlined onClickCallback={(e) => {setFriendsToCompare([...friendsToCompare, friend])}}></SimpleCheckButton>
                    </Friend>
                    );
                })}
            </div>
            }
        </section>
    );
}

export default Sidebar;
