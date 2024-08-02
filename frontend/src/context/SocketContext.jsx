import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./useAuthContext";
import io from "socket.io-client";

export const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    // Set up the socket
      const socket = io("https://code-block-wh41.onrender.com");

      setSocket(socket);

      // Listen for the 'getOnlineUsers' event from the server
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      // When the component unmounts, close the socket connection
      return () => socket.close();
    
  }, []);

  return (
    // Provide the socket and onlineUsers to the rest of the app
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
