import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email) => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
      const foundUser = res.data.find((u) => u.email === email);
      if (foundUser) setUser(foundUser);
    });
  };

  const signup = (name, email) => {
    const newUser = { name, email, id: Date.now() };
    setUser(newUser);
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
