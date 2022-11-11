import React, { useState } from "react";
import Sidebar from "components/Sidebar";
import Person from "components/Person";
import GameList from "../components/GameList";
import { Button, IconButton } from "../components/Button"
import ModalSettings from "../components/modals/ModalSettings";

let personalProfileFake = {
  "username": "Me", 
  "id": "0001",
};

let friendsListFake = [
  {
    "username": "User1",
    "id": "0001",
  }
];

let gamesFake = [
  {
      "name": "Untitled Goose Game",
      "platforms": ["switch", "steam"],
  },
  {
    "name": "Xenoblade Chronicles",
    "platforms": ["switch"],
  },
  {
    "name": "It Takes Two",
    "platforms": ["switch", "steam"],
  },
  {
    "name": "Minish Cap",
    "platforms": ["steam"],
  },
];

function Dashboard() {
  const [openSettingsModal, setOpenSettingsModal] = useState(false);

  const SettingsButton = () => <IconButton imgSrc="settings.svg" onClickCallback={() => { setOpenSettingsModal(true) }} />;

  const AddGameButton = () => <Button text="Add Game" classes="btn--add-game" />;

  return (
    <>
      <header>
      </header>
      { openSettingsModal && <ModalSettings setOpen={ setOpenSettingsModal } />}
      <main className="dashboard">
        <div className="dashboard__sidebar">
        {openSettingsModal}
          <Person person={personalProfileFake} classes="person--personal" buttons={ [SettingsButton] }/>
          <Sidebar friendsList={ friendsListFake }></Sidebar>
        </div>
        <section className="dashboard__main">
          <div className="game-lists">
            { <GameList shared={true} games={gamesFake} /> }
            <GameList games={gamesFake} controls={[AddGameButton]} />
          </div>
        </section>
      </main>
    </>
  );
}

export default Dashboard;
