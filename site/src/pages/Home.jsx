import React from "react";
import { Navigation } from "../components/Navigation";

function Home() {
  return (
    <>
      <header>
        <Navigation />
      </header>
      <main className="home">
        <h1 className="heading">Convergence</h1>
      </main>
    </>
  );
}

export default Home;
