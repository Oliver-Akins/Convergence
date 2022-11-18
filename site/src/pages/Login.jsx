import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { login } from "../components/authentication";
import { SimpleNavigation } from "../components/Navigation";

import { getAccount } from "../components/authentication";

function Login() {
  let navigate = useNavigate();

  const [inputState, setInputState] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    const {id , value} = e.target; 
    setInputState(prevState => ({
        ...prevState,
        [id]: value
    }));        
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // TODO validation and error messages
    // for discriminator and password
    await login(inputState.username, inputState.password);
    if(getAccount() !== "undefined") {
      navigate("/app");
    } else {
      // TODO show validation errors
    }
  }
  
  return (
    <>
      <header>
        <SimpleNavigation />
      </header>
      <main className="main--login">
        <section className="card card--large">
          <h1 className="header">Convergence</h1>
          <Button text="Login with Discord" classes="btn--grey" iconSrc="icons/discord.svg" onClickCallback={()=>{alert("discord")}} />
          <Button text="Login with Steam" classes="btn--grey" iconSrc="icons/steam.svg" onClickCallback={()=>{alert("steam")}} />
          <Button text="Login with Itch.io"classes="btn--grey" iconSrc="icons/itch-io.svg" onClickCallback={()=>{alert("itch.io")}} />
          <span className="divider">
            <p className="small-caps">Or</p>
          </span>
          <div className="login__form">
            <label className="small-caps" htmlFor="username">Username</label>
            <input type="text" id="username" onChange={handleChange}></input>
            <label className="small-caps" htmlFor="password">Password</label>
            <input type="password" id="password" onChange={handleChange}></input>
            <Button text="Login" classes="btn btn--form" onClickCallback={(e) => { handleFormSubmit(e); }}/>
          </div>
          <div>
            <p>Don't have an account? <Link to="/register">Register</Link></p>
          </div>
        </section>
      </main>
    </>
  );
}

export default Login;
