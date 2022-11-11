import React, { useState } from "react";
import { Button, DeletableButton } from "../Button";
import Modal from "../Modal";

function ModalSettings() {
    function ModalContent() {
        // TODO Component-ize this
        return (
            <>
                <h2 className="modal__header">Account Settings</h2>
                <div className="card settings__form">
                    <div>
                        <img src={require("../../images/icons/profile.svg").default} alt="Profile"></img>
                    </div>
                    <div className="inputs">
                        <label className="small-caps" htmlFor="username">Username</label>
                        <div className="current-username">
                            <input type="text" id="username"></input>
                            <p>#0001</p>
                        </div>
                        <label className="small-caps" htmlFor="password">Password</label>
                        <input type="password" id="password"></input>
                        <label className="small-caps" htmlFor="confirm-password">Confirm Password</label>
                        <input type="password" id="confirm-password"></input>
                    </div>
                </div>
                <div className="card incoming-requests">
                    <p>Allow Incoming Friend Requests</p>
                </div>
                <div className="card settings__linked-accounts">
                    <DeletableButton text="Unlink from Discord" isGrey={true} hoverText="Linked with Discord" iconSrc={"icons/discord.svg"}></DeletableButton>
                    <Button text="Link with Steam" iconSrc="icons/steam.svg"></Button>
                    <Button text="Link with Itch.io" iconSrc="icons/itch-io.svg"></Button>
                </div>
            </>
        );
    }

    return (
        <Modal classes="settings" children={[<ModalContent />]}/>
    )
}

export default ModalSettings;
