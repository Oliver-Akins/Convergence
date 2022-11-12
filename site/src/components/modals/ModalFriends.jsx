import React, { useState } from "react";
import { Button } from "../Button";
import Modal from "../Modal";
import Person from "../Person";

let friendsListFake = [
    {
      "username": "User1",
      "id": "0001",
    },
    {
        "username": "User2",
        "id": "2324",
    }
  ];

function ModalFriends({ setOpen }) {
    const HamburgerMenu = () => {
        return (
            <button className="btn-icon btn-icon--hamburger">
                <img src={require("../../images/icons/hamburger.svg").default} alt="Menu"></img> 
            </button>
        );
    }

    const CompareLibraryButton = () => {
        return (
            <Button text="Compare Library" classes="btn--small"/>
        );
    }

    function FriendsList({friendsList}) {
        return (
            <div className="friends-list">
                {friendsList.map((friend, i) => {
                    return (
                        <Person person={friend} classes="person--manage" key={i} buttons={[CompareLibraryButton, HamburgerMenu]}/>
                    );
                })}
            </div>
        );
    }

    function AddFriendSection() {
        return (
            <div className="add-friend modal__form">
                <label className="small-caps" htmlFor="username">Add Friend</label>
                <div className="modal__inputs">
                    <div className="input-combined">
                        <input type="text" id="username" placeholder="Username#0001"></input>
                        <Button text="Send Friend Request" classes="btn--small" />
                    </div>
                </div>
            </div>
        );
    }

    function ModalContent() {
        return (
            <>
                <h2 className="modal__header">Friends</h2>
                <FriendsList friendsList={friendsListFake} />
                <AddFriendSection />
            </>
        );
    }

    return (
        <Modal setOpen={ setOpen } children={[<ModalContent />]}/>
    )
}

export default ModalFriends;
