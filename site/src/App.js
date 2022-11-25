import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import './styles/App.scss';
import "react-toastify/dist/ReactToastify.css";

import Home from './pages/Home.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import NotFound from './pages/NotFound.jsx';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
        <Route path="app" element={<Dashboard />} />
      </Routes>
      <ToastContainer 
          position="top-center"
          hideProgressBar={true}
          theme="dark"
      />
    </div>
  );
}

export default App;
