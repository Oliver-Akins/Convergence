import React, { useState } from "react";
import { toast } from "react-toastify";

import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { SimpleNavigation } from "../components/Navigation";

import { getAccount, login } from "../components/api/authentication";

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
    if(inputState.username.indexOf('#') <= -1) {
      toast.error("Enter a username in the format 'username#123'.");
      return;
    }

    if(inputState.password.length < 6) {
      toast.error("Enter a password at 6 characters long.");
      return;
    }

    // for discriminator and password
    await login(inputState.username, inputState.password);
    if(getAccount() !== "undefined") {
      navigate("/app");
    } else {
      // TODO show validation errors
      toast.error("Login failed. Try a different username or password.")
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
          <form className="login__form">
            <label className="small-caps" htmlFor="username">Username</label>
            <input type="text" id="username" placeholder="Username#123" onChange={handleChange}></input>
            <label className="small-caps" htmlFor="password">Password</label>
            <input type="password" id="password" onChange={handleChange}></input>
            <Button text="Login" classes="btn btn--form" triggerOnEnter={true} onClickCallback={(e) => { handleFormSubmit(e); }}/>
          </form>
          <div>
            <p>Don't have an account? <Link to="/register">Register</Link></p>
          </div>
        </section>
      </main>
    </>
  );
}

export default Login;
