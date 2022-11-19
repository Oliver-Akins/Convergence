import React, { useState, useEffect, useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import './styles/App.scss';

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

        <Route element={<ProtectedRoute user={true} />}>
          <Route path="app" element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
