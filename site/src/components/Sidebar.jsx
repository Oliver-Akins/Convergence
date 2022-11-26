import React, { useEffect, useState } from "react";
import { Button, SimpleDeleteButton, SimpleCheckButton } from "./Button";
import ModalFriends from "./modals/ModalFriends";
import Friend from "./Friend";

function Sidebar({ friendsList, setFriendsList, acceptedFriendsList, setAcceptedFriendsList, friendsToCompare, setFriendsToCompare }) {
    const [openFriendsModal, setOpenFriendsModal] = useState(false);
    const [friendsNotCompared, setFriendsNotCompared] = useState([]);
    const RemoveButton = ({friend}) => <SimpleDeleteButton outlined={true} onClickCallback={() => { setFriendsToCompare(friendsToCompare.filter(function(e) { return e !== friend })) }} />;

    useEffect(() => {
        if(acceptedFriendsList) {
            let filtered = acceptedFriendsList.filter((item) => {
                return !friendsToCompare.includes(item);
            });
            setFriendsNotCompared(filtered);
        }
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
            { (!acceptedFriendsList || acceptedFriendsList.length < 1) && 
                <div className="sidebar__get-started">
                    <img src={require("../images/icons/arrow-up.svg").default} alt=""></img>
                    <h2>Add a friend to get started!</h2>
                </div>
            }
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
