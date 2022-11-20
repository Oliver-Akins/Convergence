import React, { useState } from "react";
import { Button, DeletableButton } from "../Button";
import Modal from "../Modal";
import Friend from "../Friend";

import { getUser, addFriends } from "../api/user";

function ModalFriends({ friendsList, setOpen, friendsToCompare, setFriendsToCompare }) {
    const HamburgerMenu = () => {
        return (
            <button className="btn-icon btn-icon--hamburger">
                <img src={require("../../images/icons/hamburger.svg").default} alt="Menu"></img> 
            </button>
        );
    }
    const CompareLibraryButton = ({friend, comparing}) => {
        if(comparing) {
            return <DeletableButton text="Comparing" classes="btn--small btn--grey" onClickCallback={() => {
                setFriendsToCompare(friendsToCompare.filter(function(e) { return e !== friend }))
            }}/>;
        } else {
            return <Button text="Compare Library" classes="btn--small" onClickCallback={() => { setFriendsToCompare([...friendsToCompare, friend]) }}/>;
        }
    };

    const RequestedLabel = () => <Button text="Requested" classes={`btn--pill btn--grey btn--decorative`} />;

    function FriendsList({friendsList}) {
        return (
            <div className="friends-list">
                {friendsList.friends && friendsList.friends.map((friend, i) => {
                    return (
                        <Friend person={friend} classes="person--manage" key={i}>
                            <CompareLibraryButton friend={friend} comparing={friendsToCompare.includes(friend)}></CompareLibraryButton>
                            <HamburgerMenu></HamburgerMenu>
                        </Friend>
                    );
                })}
                {friendsList.requests && friendsList.requests.map((friend, i) => {
                    return (
                        <Friend person={friend} classes="person--manage person--requested" key={i}>
                            <RequestedLabel></RequestedLabel>
                            <HamburgerMenu></HamburgerMenu>
                        </Friend>
                    );
                })}
            </div>
        );
    }

    function AddFriendSection() {
        const [friendInput, setFriendInput] = useState("");

        const addFriendFetch = async () => {
            await addFriends([friendInput]);
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
                <FriendsList friendsList={friendsList} />
                <AddFriendSection />
            </>
        );
    }

    return (
        <Modal setOpen={ setOpen } children={[<ModalContent />]}/>
    )
}

export default ModalFriends;
