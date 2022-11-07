import React from "react";
import Sidebar from "components/Sidebar";

let friendsListFake = [
  {
    "username": "User1",
    "id": "0001",
  }
];

function Home() {
  return (
    <>
      <header>
      </header>
      <main className="dashboard">
        <h1 className="heading">Convergence App Dashboard</h1>
        <Sidebar friendsList={ friendsListFake }></Sidebar>
      </main>
    </>
  );
}

export default Home;
