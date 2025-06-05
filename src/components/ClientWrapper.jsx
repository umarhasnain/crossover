'use client';

import { PlayerProvider } from "@/context/PlayerContext";
import { UserProvider } from "@/context/UserContext";
// import ProtectedRoutes from "@/components/HOC/ProtectedRoute.jsx";

const ClientWrapper = ({ children }) => {
  return (
    <UserProvider>
      <PlayerProvider>
        {/* <ProtectedRoutes> */}
          {children}
          {/* </ProtectedRoutes> */}
      </PlayerProvider>
    </UserProvider>
  );
};

export default ClientWrapper;
