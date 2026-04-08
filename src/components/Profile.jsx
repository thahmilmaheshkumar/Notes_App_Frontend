import React from "react";
import img from "../assets/hero.png";
import "../css/Profile.css";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const Profile = () => {
  // const { user } = useContext(AuthContext);
  const [profile_image, setProfile_Image] = useState("");
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");

  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/me", {
        withCredentials: true,
      });

      setUser(response.data.user);
      setProfile_Image(user.Image);
      setName(user.name);
      setEmail(user.email);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("Image", image);
      const response = await axios.post(
        "http://localhost:5000/api/auth/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        },
      );
      setImage("");
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  });

  return (
    <div className="containers">
      <div className="img">
        <img src={`http://localhost:5000${profile_image}`} alt="" />
      </div>
      <div className="details">
        <p>Name : {name}</p>
        <p>Email : {email}</p>
      </div>

      <div className="input">
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />

        {image && (
          <button className="btn btn-primary" onClick={handleUpload}>
            Upload File
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
