import React, { useState } from "react";
import { toast } from "react-toastify";

import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { SimpleNavigation } from "../components/Navigation";

import { register, getAccount, login } from "../components/api/authentication";

function Register() {
  let navigate = useNavigate();

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
    if(inputState.password.length < 6) {
      toast.error("Enter a password at least 6 characters long.");
      return;
    }

    setIsPasswordSame(inputState.password === inputState.confirmPassword);
    if(inputState.password !== inputState.confirmPassword) {
      toast.error("Make sure your passwords match.");
      return;
    }

    (async()=> {
      const response = await register(inputState.username, inputState.password);
      if(response && response.username === inputState.username) {
        await login(`${response.username}#${response.discriminator}`, inputState.password);
        navigate("/app");
      } else {
        toast.error("Failed to register an account. Please try again.");
      }
    })();
  }

  return (
    <>
      <header>
        <SimpleNavigation />
      </header>
      <main className="main--register">
        <section className="card card--large">
          <h1 className="header">Create an account</h1>
          <Button text="Continue with Discord" classes="btn--grey" iconSrc="icons/discord.svg" onClickCallback={()=>{alert("discord")}} />
          <Button text="Continue with Steam" classes="btn--grey" iconSrc="icons/steam.svg" onClickCallback={()=>{alert("steam")}} />
          <Button text="Continue with Itch.io"classes="btn--grey" iconSrc="icons/itch-io.svg" onClickCallback={()=>{alert("itch.io")}} />
          <span className="divider">
            <p className="small-caps">Or</p>
          </span>
          <div className="register__form">
            <label className="small-caps" htmlFor="username">Username</label>
            <input type="text" id="username" placeholder="Username" onChange={handleChange}></input>
            <label className="small-caps" htmlFor="password">Password</label>
            <input type="password" id="password" onChange={handleChange}></input>
            <label className="small-caps" htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" className={isPasswordSame ? "": "invalid"} id="confirmPassword" onChange={handleChange}></input>
            <Button text="Register" classes="btn btn--form" triggerOnEnter={true} onClickCallback={(e) => { handleFormSubmit(e) }}/>
          </div>
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </section>
      </main>
    </>
  );
}

export default Register;
