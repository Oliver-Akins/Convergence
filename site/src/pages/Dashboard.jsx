import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [sharedGames, setSharedGames] = useState([]);
  const [friendsList, setFriendsList] = useState([]);
  const [acceptedFriendsList, setAcceptedFriendsList] = useState([]);
  const [friendsToCompare, setFriendsToCompare] = useState([]);

  const SettingsButton = () => <IconButton imgSrc="settings.svg" onClickCallback={() => { setOpenSettingsModal(true) }} />;

  const AddGameButton = () => <Button text="Add Game" classes="btn--add-game" onClickCallback={() => { setOpenAddGameModal(true) }} />;

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const ownedGames = await getOwnedGames();
        setOwnedGames(ownedGames);

        const aUser = await getSelf();
        setUser(aUser);
        setFriendsList(aUser.relations);
      } catch(error) {
        
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const ownedGames = await getOwnedGames();
        setOwnedGames(ownedGames);
      } catch(error) {
        
      }
    }

    fetchGames();
  }, [setOpenAddGameModal]);

  useEffect(() => {
    const fetchIntersection = async () => {
      if(friendsToCompare.length > 0) {
        const parsedList = friendsToCompare.map((item) => {
          return item.id;
        }).join();
  
        try {
          const sharedGames = await getIntersection(parsedList, true);
          setSharedGames(sharedGames.games);
        } catch(error) {
          
        }
      } else {
        setSharedGames([]);
      }
    }

    fetchIntersection();
  }, [friendsToCompare]);

  useEffect(() => {
    (async () => {
      let result = await getOwnFriends();
      setAcceptedFriendsList(result);
    })();
  }, [friendsList]);

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
          <Sidebar friendsList={friendsList} acceptedFriendsList={acceptedFriendsList} setFriendsList={setFriendsList} friendsToCompare={friendsToCompare} setFriendsToCompare={setFriendsToCompare} ></Sidebar>
        </div>
        <section className="dashboard__main">
          <div className="game-lists">
            <SharedGameList games={sharedGames} />
            <OwnedGameList games={ownedGames} controls={[AddGameButton]} />
          </div>
        </section>
        <ToastContainer 
          position="top-center"
          hideProgressBar={true}
          theme="dark"
        />
      </main>
    </>
  );
}

export default Dashboard;
