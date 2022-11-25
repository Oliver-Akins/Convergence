import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "components/Sidebar";
import Person from "components/Person";
import SharedGameList from "../components/games/SharedGameList";
import OwnedGameList from "../components/games/OwnedGameList";
import { Button, IconButton } from "../components/Button"
import ModalSettings from "../components/modals/ModalSettings";
import { DashboardNavigation } from "../components/Navigation";
import { ModalAddGame } from "../components/modals/ModalGames";

import { getOwnedGames, getIntersection } from "../components/api/gameEndpoints";
import { getUser, getOwnFriends } from "../components/api/user";

function Dashboard() {
  const [openSettingsModal, setOpenSettingsModal] = useState(false);
  const [openAddGameModal, setOpenAddGameModal] = useState(false);
  const [user, setUser] = useState(null);
  const [ownedGames, setOwnedGames] = useState(null);
  const [sharedGames, setSharedGames] = useState([]);
  const [friendsList, setFriendsList] = useState([]);
  const [acceptedFriendsList, setAcceptedFriendsList] = useState([]);
  const [friendsToCompare, setFriendsToCompare] = useState([]);

  const navigate = useNavigate();

  const SettingsButton = () => <IconButton imgSrc="settings.svg" onClickCallback={() => { setOpenSettingsModal(true) }} />;

  const AddGameButton = () => <Button text="Add Game" classes="btn--add-game" onClickCallback={() => { setOpenAddGameModal(true) }} />;

  const parseUser = async (aUser) => {
    let userParsed = aUser;
    if(aUser.relations && aUser.relations.requests.length > 0) {
      for (let i = 0; i < aUser.relations.requests.length; i++) {
        const element = aUser.relations.requests[i];
        userParsed.relations.requests[i] = await getUser(element);
      }
    }

    return userParsed;
  };

  useEffect(() => {
    (async () => {
      try {
        if(localStorage.getItem("user") === null || localStorage.getItem("user") === "{}") {
          navigate("/login");
          return;
        }

        const aUser = await getUser("@me");
        if(!aUser || aUser === {}) {
          navigate("/login");
          return;
        }
        const ownedGames = await getOwnedGames();
        setOwnedGames(ownedGames);
        const userParsed = await parseUser(aUser);
        setUser(userParsed);
        setFriendsList(userParsed.relations);
      } catch(error) {
        
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const ownedGames = await getOwnedGames();
        setOwnedGames(ownedGames);
      } catch(error) {
        
      }
    })();
  }, [setOpenAddGameModal]);

  useEffect(() => {
    (async () => {
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
    })();
  }, [friendsToCompare]);

  useEffect(() => {
    (async () => {
      try {
        let result = await getOwnFriends();
        setAcceptedFriendsList(result);
      } catch(error) {
        
      }
    })();
  }, [friendsList]);

  return (
    <>
      <header>
        <DashboardNavigation />
      </header>
      { openSettingsModal && <ModalSettings user={user} setOpen={ setOpenSettingsModal } />}
      { openAddGameModal && <ModalAddGame setOwnedGames={setOwnedGames} setOpen={ setOpenAddGameModal } />}
      <main className="main--dashboard dashboard">
        <div className="dashboard__sidebar">
          <Person person={ user } classes="person--personal" buttons={ [SettingsButton] }/>
          <Sidebar 
            friendsList={friendsList}
            setFriendsList={setFriendsList}
            acceptedFriendsList={acceptedFriendsList}
            setAcceptedFriendsList={setAcceptedFriendsList}
            friendsToCompare={friendsToCompare}
            setFriendsToCompare={setFriendsToCompare}
           />
        </div>
        <section className="dashboard__main">
          <div className="game-lists">
            { friendsToCompare.length > 0 ?<SharedGameList games={sharedGames} />
              :<></>
            }
            <OwnedGameList ownedGames={ownedGames} setOwnedGames={setOwnedGames}>
              <AddGameButton />
            </OwnedGameList>
          </div>
        </section>
      </main>
    </>
  );
}

export default Dashboard;
