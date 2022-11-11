import React, { useState } from "react";
import Sidebar from "components/Sidebar";
import Person from "components/Person";
import GameComparison from "../components/GameComparison";
import { IconButton } from "../components/Button"
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
];

function Dashboard() {
  const [openSettingsModal, setOpenSettingsModal] = useState(false);

  const SettingsButton = () => <IconButton imgSrc="settings.svg" onClickCallback={() => { setOpenSettingsModal(true) }} />;

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
        <GameComparison games={gamesFake} />
      </main>
    </>
  );
}

export default Dashboard;
