import React from "react";
import Sidebar from "components/Sidebar";
import Person from "components/Person";
import GameComparison from "components/GameComparison";
import { IconButton } from "../components/Button"

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

function Home() {
  const SettingsButton = () => <IconButton imgSrc="settings.svg" />;

  return (
    <>
      <header>
      </header>
      <main className="dashboard">
        <div className="dashboard__sidebar">
          <Person person={personalProfileFake} classes="person--personal" buttons={ [SettingsButton] }/>
          <Sidebar friendsList={ friendsListFake }></Sidebar>
        </div>
        <GameComparison games={gamesFake} />
      </main>
    </>
  );
}

export default Home;
