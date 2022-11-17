import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";

import { register } from "../components/authentication";

function Home() {
  const [inputState, setInputState] = useState({
    username: "",
    password: "",
    confirmPassword: ""
  });

  const [isPasswordSame, setIsPasswordSame] = useState(true);

  const handleChange = (e) => {
    const {id , value} = e.target; 
    setInputState(prevState => ({
        ...prevState,
        [id]: value
    }));
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // TODO validation and error messages
    setIsPasswordSame(inputState.password === inputState.confirmPassword);
    if(inputState.password !== inputState.confirmPassword) {
      return;
    }
    register(inputState.username, inputState.password);
  }

  return (
    <>
      <header>
      </header>
      <main>
        <section className="card card--large">
          <h1 className="header">Create an account</h1>
          <Button text="Continue with Discord" classes="btn--grey" iconSrc="icons/discord.svg" onClickCallback={()=>{alert("discord")}} />
          <Button text="Continue with Steam" classes="btn--grey" iconSrc="icons/steam.svg" onClickCallback={()=>{alert("steam")}} />
          <Button text="Continue with Itch.io"classes="btn--grey" iconSrc="icons/itch-io.svg" onClickCallback={()=>{alert("itch.io")}} />
          <span className="divider">
            <p className="small-caps">Or</p>
          </span>
          <div className="register__form">
            {/* <label className="small-caps" htmlFor="email">Email Address</label>
            <input type="email" id="email"></input> */}
            <label className="small-caps" htmlFor="username">Username</label>
            <input type="text" id="username" onChange={handleChange}></input>
            <label className="small-caps" htmlFor="password">Password</label>
            <input type="password" id="password" onChange={handleChange}></input>
            <label className="small-caps" htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" className={isPasswordSame ? "": "invalid"} id="confirmPassword" onChange={handleChange}></input>
            <Button text="Register" classes="btn btn--form" onClickCallback={(e) => { handleFormSubmit(e);}}/>
          </div>
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </section>
      </main>
    </>
  );
}

export default Home;