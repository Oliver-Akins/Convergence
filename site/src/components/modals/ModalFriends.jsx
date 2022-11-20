import React, { useEffect, useState } from "react";
import { Button, DeletableButton, SimpleDeleteButton, SimpleCheckButton } from "../Button";
import Modal from "../Modal";
import Friend from "../Friend";

import { getOwnFriends, addFriends } from "../api/user";

function ModalFriends({ friendsList, acceptedFriendsList, setFriendsList, setOpen, friendsToCompare, setFriendsToCompare }) {
    const HamburgerMenu = () => {
        return (
            <button className="btn-icon btn-icon--hamburger">
                <img src={require("../../images/icons/hamburger.svg").default} alt="Menu"></img> 
            </button>
        );
    }
    const CompareLibraryButton = ({friend, comparing}) => {
        if(comparing) {
            return <DeletableButton text="Stop Comparison" hoverText="Comparing" classes="btn--small btn--grey" onClickCallback={() => {
                setFriendsToCompare(friendsToCompare.filter(function(e) { return e !== friend }))
            }}/>;
        } else {
            return <Button text="Compare Library" classes="btn--small" onClickCallback={() => { setFriendsToCompare([...friendsToCompare, friend]) }}/>;
        }
    };
    
    const handleReject = async () => {

    };

    const handleAccept = async (friend) => {
        try {
            const result = await addFriends([friend]);
            console.log(result);
            const friendsListUpdated = await getOwnFriends();
            setFriendsList(friendsListUpdated);
        } catch(error) {
        }
    };

    function FriendsList({acceptedFriendsList, friendsList}) {
        console.log(acceptedFriendsList);
        return (
            <div className="friends-list">
                {acceptedFriendsList && acceptedFriendsList.map((friend, i) => {
                    return (
                        <Friend person={friend} isAccepted={true} classes="person--manage" key={i}>
                            <CompareLibraryButton friend={friend.id} comparing={friendsToCompare.includes(friend.id)}></CompareLibraryButton>
                            <HamburgerMenu></HamburgerMenu>
                        </Friend>
                    );
                })}
                {friendsList.requests && friendsList.requests.map((friend, i) => {
                    return (
                        <Friend person={friend} classes="person--manage person--requested" key={i}>
                            {/* <SimpleDeleteButton outlined={true} onClickCallback={()=> {handleReject()}} /> */}
                            <SimpleCheckButton outlined={true} onClickCallback={(e) => {handleAccept(friend)}} />
                        </Friend>
                    );
                })}
            </div>
        );
    }

    function AddFriendSection() {
        const [friendInput, setFriendInput] = useState("");

        const addFriendFetch = async () => {
            try {
                let response = await addFriends([friendInput]);
                console.log(response);
            } catch(error) {
                console.log("Could not add friend");
            }
        }

        return (
            <div className="add-friend modal__form">
                <label className="small-caps" htmlFor="username">Add Friend</label>
                <div className="modal__inputs">
                    <div className="input-combined">
                        <input type="text" id="username" placeholder="Username#0001" onChange={(e) => {setFriendInput(e.target.value)}}></input>
                        <Button text="Send Friend Request" classes="btn--small" onClickCallback={addFriendFetch} />
                    </div>
                </div>
            </div>
        );
    }

    function ModalContent() {
        return (
            <>
                <h2 className="modal__header">Friends</h2>
                <FriendsList friendsList={friendsList} acceptedFriendsList={acceptedFriendsList} />
                <AddFriendSection />
            </>
        );
    }

    return (
        <Modal setOpen={ setOpen } children={[<ModalContent />]}/>
    )
}

export default ModalFriends;
