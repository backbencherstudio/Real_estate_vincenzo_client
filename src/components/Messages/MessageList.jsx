import { useState, useEffect } from "react";
import { useSocket } from "../../context/SocketContext";

export const MessageList = ({ onChatSelect }) => {
  const [chats, setChats] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { socket, onlineUsers } = useSocket();

  useEffect(() => {
    if (socket) {
      // Get initial chats
      socket.emit("get_chats");

      socket.on("chats_received", (receivedChats) => {
        setChats(receivedChats);
      });

      socket.on("new_message_notification", (chatId) => {
        setChats((prevChats) =>
          prevChats.map((chat) =>
            chat.id === chatId
              ? { ...chat, unreadCount: (chat.unreadCount || 0) + 1 }
              : chat
          )
        );
      });

      return () => {
        socket.off("chats_received");
        socket.off("new_message_notification");
      };
    }
  }, [socket]);

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="p-4">
        <div className="flex gap-2 items-center">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <button className="h-9 w-9 bg-black rounded-lg flex items-center justify-center hover:bg-blue-600">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="p-2">
        {filteredChats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onChatSelect(chat)}
            className="w-full text-left p-3 rounded-lg hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={chat.avatar || "https://via.placeholder.com/40"}
                  alt={chat.name}
                  className="w-10 h-10 rounded-full"
                />
                {onlineUsers[chat.userId] && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div className="flex-grow">
                <h3 className="font-semibold text-sm">{chat.name}</h3>
                <p className="text-gray-500 text-sm truncate">
                  {chat.lastMessage}
                </p>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs text-gray-400">
                  {chat.lastMessageTime}
                </span>
                {chat.unreadCount > 0 && (
                  <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1 mt-1">
                    {chat.unreadCount}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
