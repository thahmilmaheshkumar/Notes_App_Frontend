import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Nave.css";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const Navebar = () => {
  const Navigate = useNavigate();
  const { isAuth, logout } = useContext(AuthContext);
  const handleLogout = async () => {
    try {
      const response = await logout();
      Navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <nav>
        <div className="logo">
          <Link to="/" className="a">
            Notes
          </Link>
        </div>

        <div className="sites">
          <Link to="/login" className="a">
            <FaSignInAlt />
            Login
          </Link>
          <Link to="/register" className="a">
            <FaUser />
            Register
          </Link>

          {isAuth && (
            <>
              <Link to="/dashboard" className="a">
                Dashboard
              </Link>

              <Link to="/profile" className="a">
                Profile
              </Link>

              <button onClick={handleLogout} className="btn">
                <FaSignOutAlt />
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navebar;
