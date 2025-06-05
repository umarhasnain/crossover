// src/context/PlayerContext.jsx
"use client"; // 👈 VERY IMPORTANT

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPlayers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/players");
      setPlayers(res.data);
    } catch (err) {
      console.error("Error fetching players", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  return (
    <PlayerContext.Provider value={{ players, loading }}>
      {children}
    </PlayerContext.Provider>
  );
};

// Custom hook
export const usePlayers = () => useContext(PlayerContext);
