import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState({});

  // useEffect(() => {
  //   const newSocket = io("http://localhost:4000"); // Replace with your backend URL
  //   setSocket(newSocket);

  //   newSocket.on("users_online", (users) => {
  //     setOnlineUsers(users);
  //   });

  //   return () => newSocket.close();
  // }, []);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
