import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Button, DeletableButton, SimpleDeleteButton, SimpleCheckButton } from "../Button";
import Modal from "../Modal";
import Friend from "../Friend";

import { getOwnFriends, addFriends, rejectFriendRequests, deleteFriends, getSelf } from "../api/user";

function ModalFriends({ friendsList, setFriendsList, acceptedFriendsList, setAcceptedFriendsList, friendsToCompare, setFriendsToCompare, setOpen }) {
    useEffect(() => {
        (async () => {
            try {
              const result = await getOwnFriends();
              if(result.length !== acceptedFriendsList.length) {
                setAcceptedFriendsList(result);
              }
              const aUser = await getSelf();
              if(aUser.relations !== friendsList) {
                setFriendsList(aUser.relations);
              }
              setFriendsToCompare([]);
            } catch(error) {
              
            }
          })();
    }, [setOpen]);
    
    const handleAddComparison = (newItem) => {
        if(friendsToCompare.indexOf(newItem) === -1) {
            setFriendsToCompare([...friendsToCompare, newItem]);
        }
    }

    const CompareLibraryButton = ({friend, comparing}) => {
        if(comparing) {
            return <DeletableButton text="Stop Comparison" hoverText="Comparing" classes="btn--small btn--grey" onClickCallback={() => {
                setFriendsToCompare(friendsToCompare.filter(function(e) { return e !== friend }))
            }}/>;
        } else {
            return <Button text="Compare Library" classes="btn--small" onClickCallback={() => { handleAddComparison(friend) }}/>;
        }
    };
    
    const handleAccept = async (friend) => {
        try {
            const result = await addFriends([friend]);
            const friendsListUpdated = await getOwnFriends();
            setFriendsList(friendsListUpdated);
        } catch(error) {
        }
    };

    const handleReject = async (friend) => {
        try {
            console.log(friend);
            await rejectFriendRequests([friend]);
            const aUser = await getSelf();
            localStorage.setItem("user", JSON.stringify(aUser));
            const friendsListUpdated = await getOwnFriends();
            setFriendsList(friendsListUpdated);
        } catch(error) {
        }
    };


    const handleDelete = async (friend) => {
        try {
            const result = await deleteFriends([friend]);
            const friendsListUpdated = await getOwnFriends();
            setFriendsList(friendsListUpdated);
        } catch(error) {
        }
    };

    const HamburgerMenu = ({friend}) => {
        return (
            <button className="btn-icon btn-icon--hamburger hamburger">
                <img src={require("../../images/icons/hamburger.svg").default} alt="Menu"></img>
                <div className="hamburger__controls">
                    <DeletableButton classes="btn--small btn--grey" text="Remove Friend" onClickCallback={()=>{handleDelete(friend.id)}}/>
                </div>
            </button>
        );
    };

    function FriendsList({acceptedFriendsList, friendsList}) {
        return (
            <div className="friends-list">
                {acceptedFriendsList && acceptedFriendsList.map((friend, i) => {
                    return (
                        <Friend person={friend} classes="person--manage" key={i}>
                            <CompareLibraryButton friend={friend} comparing={friendsToCompare.includes(friend)}></CompareLibraryButton>
                            <HamburgerMenu friend={friend}></HamburgerMenu>
                        </Friend>
                    );
                })}
                {friendsList.requests && friendsList.requests.map((friend, i) => {
                    return (
                        <Friend person={friend} classes="person--manage person--requested" key={i}>
                            <SimpleDeleteButton outlined={true} onClickCallback={(e) => {handleReject(friend)}} />
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
                const ownInfo = JSON.parse(localStorage.getItem("user"));
                let parsedInput = friendInput.split("#");
                if(parsedInput.length < 2) {
                    toast.error("Friend request must be in the format 'username#123'.");
                    return;
                } else if(parsedInput[0] == ownInfo.username && parsedInput[1] == ownInfo.discriminator) {
                    toast.error("You cannot add yourself as a friend.");
                    return;
                }
                let response = await addFriends([friendInput]);
                
                if(response.sent && response.sent.length > 0) {
                    toast.success("Friend request sent!");
                } else if(response.errored && response.errored.length > 0) {
                    toast.error("Friend request failed. Try a different username combo.");
                }
            } catch(error) {
                toast.error("Friend request failed. Try a different username combo.");
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
