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
import { getSelf, getOwnFriends } from "../components/api/user";

function Dashboard() {
  const [openSettingsModal, setOpenSettingsModal] = useState(false);
  const [openAddGameModal, setOpenAddGameModal] = useState(false);
  const [user, setUser] = useState(null);
  const [ownedGames, setOwnedGames] = useState(null);
  const [sharedGames, setSharedGames] = useState(null);
  const [friendsList, setFriendsList] = useState([]);
  const [friendsToCompare, setFriendsToCompare] = useState([]);

  const SettingsButton = () => <IconButton imgSrc="settings.svg" onClickCallback={() => { setOpenSettingsModal(true) }} />;

  const AddGameButton = () => <Button text="Add Game" classes="btn--add-game" onClickCallback={() => { setOpenAddGameModal(true) }} />;

  useEffect(() => {
    const fetchItems = async () => {
      try {
        await getOwnedGames();
        const ownedGames = JSON.parse(localStorage.getItem("ownedGames"));
        setOwnedGames(ownedGames);

        await getSelf();
        const aUser = JSON.parse(localStorage.getItem("user"));
        setUser(aUser);
        setFriendsList(aUser.relations);

        // const sharedGames = await getIntersection("");
        // setSharedGames(sharedGames);
      } catch(error) {
        
      }
    };
    
    fetchItems();
  }, []);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        await getOwnedGames();
        const ownedGames = JSON.parse(localStorage.getItem("ownedGames"));
        setOwnedGames(ownedGames);
      } catch(error) {
        
      }
    }

    fetchGames();
  }, [setOpenAddGameModal]);

  useEffect(() => {
    const fetchIntersection = async () => {
      if(friendsToCompare.length > 0) {
        const parsedList = friendsToCompare.join();
  
        try {
          await getIntersection(parsedList, true);
          const sharedGames = JSON.parse(localStorage.getItem("sharedGames"));
          setSharedGames(sharedGames);
        } catch(error) {
          
        }
      } else {
        setSharedGames([]);
      }
    }

    fetchIntersection();
  }, [friendsToCompare]);

  return (
    <>
      <header>
        <DashboardNavigation />
      </header>
      { openSettingsModal && <ModalSettings user={user} setOpen={ setOpenSettingsModal } />}
      { openAddGameModal && <ModalAddGame setOpen={ setOpenAddGameModal } />}
      <main className="main--dashboard dashboard">
        <div className="dashboard__sidebar">
          <Person person={ user } classes="person--personal" buttons={ [SettingsButton] }/>
          <Sidebar friendsList={ friendsList } friendsToCompare={friendsToCompare} setFriendsToCompare={setFriendsToCompare} ></Sidebar>
        </div>
        <section className="dashboard__main">
          <div className="game-lists">
            <SharedGameList games={sharedGames} />
            <OwnedGameList games={ownedGames} controls={[AddGameButton]} />
          </div>
        </section>
      </main>
    </>
  );
}

export default Dashboard;
