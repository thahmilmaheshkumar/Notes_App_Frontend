import React, { useState } from "react";
import "../css/Login.css";
import { FaUser } from "react-icons/fa";
import axios from "axios";

const Register = () => {
  const api = "http://localhost:5000";
  const [passOrText, setPassOrText] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState("");
  const [errOrCor, setErrOrCor] = useState(false);

  const ChangePass = () => {
    if (passOrText) return setPassOrText(false);
    setPassOrText(true);
  };

  const handleSubmit = async (e) => {
    e.target.preventDefault;
    const formdata = new FormData();
    if (password != conPassword) return setError("Password did not match");
    setError("");

    formdata.append("name", userName);
    formdata.append("email", email);
    formdata.append("password", password);

    if (profileImage) formdata.append("Image", profileImage);
    try {
      const response = await axios.post(`${api}/api/auth/register`, formdata, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      setErrOrCor(true);
      setError(response.data.message);
    } catch (err) {
      setErrOrCor(false);
      // console.log(err.response);
      setError(err.response.data.message);
    }
  };

  return (
    <div className="containers">
      <h1>
        <FaUser />
        Register
      </h1>

      {error && <p className={errOrCor ? "cor" : "err"}>{error}</p>}

      <div className="input">
        <label htmlFor="name">UserName</label>
        <input
          type="text"
          id="name"
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter Username"
        />
      </div>

      <div className="input">
        <label htmlFor="name">Email</label>
        <input
          type="email"
          id="name"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
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

      <div className="input">
        <label htmlFor="password">Confirm Password</label>
        <input
          onChange={(e) => setConPassword(e.target.value)}
          type={passOrText ? "text" : "password"}
          id="password"
          placeholder="Confirm Password"
        />
      </div>

      <div className="showpass">
        <input type="checkbox" id="checkpass" onClick={ChangePass} />
        <label htmlFor="checkpass">Show Password</label>
      </div>

      <div className="input">
        <label htmlFor="image">Profile Image</label>
        <input
          onChange={(e) => setProfileImage(e.target.files[0])}
          type="file"
          id="image"
        />
      </div>

      <div className="input">
        <button onClick={handleSubmit} className="btn btn-primary">
          <FaUser /> Register
        </button>
      </div>
    </div>
  );
};

export default Register;
