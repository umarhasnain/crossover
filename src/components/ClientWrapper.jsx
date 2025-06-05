// components/ClientWrapper.jsx
"use client";
import { PlayerProvider } from "@/context/PlayerContext";

export default function ClientWrapper({ children }) {
  return <PlayerProvider>{children}</PlayerProvider>;
}
