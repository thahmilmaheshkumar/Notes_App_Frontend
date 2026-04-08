import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);

  const checkAuth = async () => {
    // Implement your logic to check if the user is authenticated
    try {
      const response = await axios.get("http://localhost:5000/api/auth/me", {
        withCredentials: true,
      });
      setIsAuth(true);
    } catch (error) {
      console.error("Error checking authentication:", error.response);
    }
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/me", {
        withCredentials: true,
      });
      setIsAuth(true);
      setUser(response.data.user);
    } catch (error) {
      console.error("Error checking authentication:", error.response);
      setIsAuth(false);
    }
  };
  const logout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        {
          withCredentials: true,
        },
      );
      setIsAuth(false);
      setUser(null);
    } catch (error) {
      console.error("Error checking authentication:", error.response);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <AuthContext.Provider value={{ checkAuth, isAuth, user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
