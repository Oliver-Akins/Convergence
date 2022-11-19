import React, { useState } from "react";
import { Button } from "../Button";
import Modal from "../Modal";
import Friend from "../Friend";

import { getUser, addFriends, friends } from "../api/user";

function ModalFriends({ friendsList, setOpen }) {
    const HamburgerMenu = () => {
        return (
            <button className="btn-icon btn-icon--hamburger">
                <img src={require("../../images/icons/hamburger.svg").default} alt="Menu"></img> 
            </button>
        );
    }
    const CompareLibraryButton = () => <Button text="Compare Library" classes="btn--small"/>;
    const RequestedLabel = () => <Button text="Requested" classes={`btn--pill btn--grey btn--decorative`} />;

    function FriendsList({friendsList}) {
        return (
            <div className="friends-list">
                {friendsList.friends && friendsList.friends.map((friend, i) => {
                    return (
                        <Friend person={friend} classes="person--manage" key={i} buttons={[CompareLibraryButton, HamburgerMenu]}/>
                    );
                })}
                {friendsList.requests && friendsList.requests.map((friend, i) => {
                    return (
                        <Friend person={friend} classes="person--manage person--requested" key={i} buttons={[RequestedLabel, HamburgerMenu]}/>
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
