import React, { useState, useEffect } from "react";

import Sidebar from "components/Sidebar";
import Person from "components/Person";
import SharedGameList from "../components/games/SharedGameList";
import OwnedGameList from "../components/games/OwnedGameList";
import { Button, IconButton } from "../components/Button"
import ModalSettings from "../components/modals/ModalSettings";
import { DashboardNavigation } from "../components/Navigation";
import { ModalAddGame } from "../components/modals/ModalGames";

import { getOwnedGames, getIntersection } from "../components/api/gameEndpoints";

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
  const [openAddGameModal, setOpenAddGameModal] = useState(false);
  const [ownedGames, setOwnedGames] = useState(null);
  const [sharedGames, setSharedGames] = useState(null);

  const SettingsButton = () => <IconButton imgSrc="settings.svg" onClickCallback={() => { setOpenSettingsModal(true) }} />;

  const AddGameButton = () => <Button text="Add Game" classes="btn--add-game" onClickCallback={() => { setOpenAddGameModal(true) }} />;

  useEffect(() => {
    const fetchGames = async () => {
      try {
        await getOwnedGames();
        const ownedGames = JSON.parse(localStorage.getItem("ownedGames"));
        setOwnedGames(ownedGames);

        // const sharedGames = await getIntersection("");
        // setSharedGames(sharedGames);
      } catch(error) {
        
      }
    };
    
    fetchGames();
  }, []);

  return (
    <>
      <header>
        <DashboardNavigation />
      </header>
      { openSettingsModal && <ModalSettings setOpen={ setOpenSettingsModal } />}
      { openAddGameModal && <ModalAddGame setOpen={ setOpenAddGameModal } />}
      <main className="main--dashboard dashboard">
        <div className="dashboard__sidebar">
          <Person person={personalProfileFake} classes="person--personal" buttons={ [SettingsButton] }/>
          <Sidebar friendsList={ friendsListFake }></Sidebar>
        </div>
        <section className="dashboard__main">
          <div className="game-lists">
            {/* <SharedGameList games={gamesFake} /> */}
            <OwnedGameList games={ownedGames} controls={[AddGameButton]} />
          </div>
        </section>
      </main>
    </>
  );
}

export default Dashboard;
