import React from "react";
import { Link } from "react-router-dom";

import { Navigation } from "../components/Navigation";
import logo from "../images/logo.svg";
import friends from "../images/friends.png";
import sharedgames from "../images/sharedgames.png";

function Home() {
  return (
    <>
      <header>
        <Navigation />
      </header>
      <main className="main--home">
          <div className="home-section">
            <div className="grid-container">
              <div className="grid-item grid-item1">
                <h2>
                  Find Common Ground With Your Friends 
                </h2>
                <p className="p-home">Convergence allows you to see what games you and your friends
                  all own to make finding games to play together easier!
                </p>
                <Link to="/register">
                  <button className="btn btn--primary get-started-button">Get Started</button>
                </Link>
              </div>
              <div className="grid-item">
                <img src={logo} alt="logo" width="200"></img>
              </div>
            </div>
          </div>
          <div className="home-section home-section--dark">
            <div className="grid-container">
              <div className="grid-item grid-item1">
                <h3>
                  Large Game Group? No Problem! 
                </h3>
                <p className="p-home">Convergence allows you to easily see what games you and your multiple friends
                  all own. Only playing games with one person? you got it! playing games with 10 
                  other people? Easily see what games everyone owns
                </p>
              </div>
              <div className="grid-item">
                <img src={sharedgames} alt="shared games"></img>
              </div>
            </div>
          </div>
          <div className="home-section">
            <div className="grid-container">
              <div className="grid-item grid-item1">
                <img src={friends} alt="friends"></img>
              </div>
              <div className="grid-item">
                  <h3>
                    Automatically Add Games From Your Favourite Platforms!
                  </h3>
                  <p className="p-home">No one likes adding things manually whenever they dont have to, 
                    which is why convergence allows you to link some of your Favourite
                    platforms to the site. so that you can have large parts of your game 
                    library automatically added to the site!
                  </p>
              </div>
            </div>
          </div>
          <Link to="/register">
            <button className="btn btn--primary get-started-button btn-center">Get Started</button>
          </Link>
      </main>
    </>
  );
}

export default Home;


