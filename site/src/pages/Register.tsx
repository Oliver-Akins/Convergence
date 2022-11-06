import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";


function Home() {
  return (
    <>
      <header>
      </header>
      <main>
        <section className="card card--register">
          <h1 className="header">Create an account</h1>
          <Button text="Continue with Discord" classes="btn--grey" iconSrc="icons/discord.svg" onClickCallback={()=>{alert("discord")}} />
          <Button text="Continue with Steam" classes="btn--grey" iconSrc="icons/steam.svg" onClickCallback={()=>{alert("steam")}} />
          <Button text="Continue with Itch.io"classes="btn--grey" iconSrc="icons/itch-io.svg" onClickCallback={()=>{alert("itch.io")}} />
          <span className="divider">
            <p className="caps">Or</p>
          </span>
          <div className="register__form">
            <label className="caps" htmlFor="email">Email Address</label>
            <input type="email" id="email"></input>
            <label className="caps" htmlFor="username">Username</label>
            <input type="text" id="username"></input>
            <label className="caps" htmlFor="password">Password</label>
            <input type="password" id="password"></input>
            <Button text="Register" classes="btn btn--form"/>
          </div>
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </section>
      </main>
    </>
  );
}

export default Home;
