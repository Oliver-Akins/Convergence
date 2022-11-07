import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";


function Home() {
  return (
    <>
      <header>
      </header>
      <main>
        <section className="card card--login">
          <h1 className="header">Convergence</h1>
          <Button text="Login with Discord" classes="btn--grey" iconSrc="icons/discord.svg" onClickCallback={()=>{alert("discord")}} />
          <Button text="Login with Steam" classes="btn--grey" iconSrc="icons/steam.svg" onClickCallback={()=>{alert("steam")}} />
          <Button text="Login with Itch.io"classes="btn--grey" iconSrc="icons/itch-io.svg" onClickCallback={()=>{alert("itch.io")}} />
          <span className="divider">
            <p className="small-caps">Or</p>
          </span>
          <div className="login__form">
            <label className="small-caps" htmlFor="username">Username</label>
            <input type="text" id="username"></input>
            <label className="small-caps" htmlFor="password">Password</label>
            <input type="password" id="password"></input>
            <Button text="Login" classes="btn btn--form"/>
          </div>
          <div>
            <p>Don't have an account? <Link to="/register">Register</Link></p>
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;
