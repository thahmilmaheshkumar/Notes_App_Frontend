import React, { useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import "../css/Login.css";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const Navigate = useNavigate();
  const { user, checkAuth, isAuth } = useContext(AuthContext);
  const api = "https://notes-app-backend-tawny-two.vercel.app";
  const [passOrText, setPassOrText] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errOrCor, setErrOrCor] = useState(false);

  const ChangePass = () => {
    if (passOrText) return setPassOrText(false);
    setPassOrText(true);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${api}/api/auth/login`,
        {
          name: userName,
          password: password,
        },
        { withCredentials: true },
      );
      setErrOrCor(true);
      setError(response.data.message);
      checkAuth();
      if (isAuth) {
        Navigate("/dashboard");
      }
    } catch (err) {
      setErrOrCor(false);
      setError(err.response.data.message);
    }
  };
  return (
    <div className="containers">
      <h1>
        <FaSignInAlt />
        Login
      </h1>

      {error && <p className={errOrCor ? "cor" : "err"}>{error}</p>}

      <div className="input">
        <label htmlFor="name">UserName or Email</label>
        <input
          type="text"
          id="name"
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter Username or Email"
        />
      </div>

      <div className="input">
        <label htmlFor="password">Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type={passOrText ? "text" : "password"}
          id="password"
          placeholder="Enter password"
        />
      </div>

      <div className="showpass">
        <input type="checkbox" id="checkpass" onClick={ChangePass} />
        <label htmlFor="checkpass">Show Password</label>
      </div>

      <div className="input">
        <button onClick={handleSubmit} className="btn btn-primary">
          <FaSignInAlt /> Login
        </button>
      </div>
    </div>
  );
};

export default Login;
