'use client';

import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isPaid, setIsPaid] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      await new Promise(res => setTimeout(res, 1000)); // simulate delay

      const userData = JSON.parse(localStorage.getItem("user")); // mock logic
      if (userData) {
        setIsAuthenticated(userData.authenticated);
        setIsPaid(userData.paid);
        setUser(userData);
      } else {
        setIsAuthenticated(false);
        setIsPaid(false);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setIsPaid(false);
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        isAuthenticated,
        isPaid,
        user,
        setIsAuthenticated,
        setIsPaid,
        setUser,
        logout, // ✅ expose logout
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
