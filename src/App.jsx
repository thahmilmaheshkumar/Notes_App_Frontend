import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navebar from "../src/components/Navebar";
import Login from "../src/components/Login";
import Register from "../src/components/Register";
import Dashboard from "../src/components/Dashboard";
import Profile from "../src/components/Profile";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

const App = () => {
  const { isAuth } = useContext(AuthContext);
  return (
    <div>
      <BrowserRouter>
        <Navebar />

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
