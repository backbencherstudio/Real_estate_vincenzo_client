import { useState, useEffect } from "react";
import { MessageList } from "../../components/Messages/MessageList";
import { MessageInput } from "../../components/Messages/MessageInput";
import { useSocket } from "../../context/SocketContext";

const Messages = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const { socket } = useSocket();

  useEffect(() => {
    if (socket) {
      socket.emit("user_connected", "current-user-id"); // Replace with actual user ID

      socket.on("receive_message", (newMessage) => {
        if (currentChat && newMessage.chatId === currentChat.id) {
          setMessages((prev) => [...prev, newMessage]);
        }
      });

      socket.on("chat_history", (chatMessages) => {
        setMessages(chatMessages);
      });

      return () => {
        socket.off("receive_message");
        socket.off("chat_history");
      };
    }
  }, [socket, currentChat]);

  const handleChatSelect = (chat) => {
    setCurrentChat(chat);
    socket.emit("join_chat", chat.id);
    setIsSidebarOpen(false);
  };

  return (
    <div className="">
      {/* Header */}
      <div className="mb-6">
        <h2 className="font-manrope text-2xl font-bold mb-1">Messages</h2>
        <p className="text-[#64748B] text-sm">
          <span className="opacity-60">Messages / </span> Inbox
        </p>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg h-[660px] hidden md:grid md:grid-cols-3 shadow-sm">
        {/* Left Sidebar */}
        <div className="col-span-1 border-r border-gray-100">
          {/* Search and Add Button */}

          <div className="overflow-y-auto h-[calc(100%-73px)]">
            <MessageList onChatSelect={handleChatSelect} />
          </div>
        </div>

        <div className="col-span-2 flex flex-col bg-white relative">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={currentChat?.avatar || "https://via.placeholder.com/40"}
                alt="User"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="font-semibold">
                  {currentChat?.name || "Select a chat"}
                </h3>
                <span
                  className={`text-sm ${
                    currentChat?.isOnline ? "text-green-500" : "text-gray-500"
                  }`}
                >
                  {currentChat?.isOnline ? "Online" : "Offline"}
                </span>
              </div>
            </div>
          </div>
          {currentChat ? (
            <>
              <div className="flex-grow overflow-y-auto p-4">
                {messages.map((msg, index) => (
                  <div
                    key={msg._id || index}
                    className={`mb-4 ${
                      msg.senderId === "current-user-id"
                        ? "text-right"
                        : "text-left"
                    }`}
                  >
                    <div
                      className={`inline-block p-3 rounded-lg ${
                        msg.senderId === "current-user-id"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      {msg.content}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                ))}
              </div>
              <MessageInput currentChat={currentChat} />
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Select a chat to start messaging
            </div>
          )}
        </div>
      </div>
      <div className="md:hidden mt-4">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 bg-black rounded-lg"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`md:hidden fixed inset-y-0 left-0 w-3/4 bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Search Header */}
        <div className="flex justify-between items-center m-4 mt-8">
          <h3 className="font-bold">Messages</h3>
          <button onClick={() => setIsSidebarOpen(false)} className="p-2">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="overflow-y-auto h-[calc(100%-137px)]">
          <MessageList onChatSelect={handleChatSelect} />
        </div>
      </div>
      <div className="md:hidden mt-4 bg-white rounded-lg  min-h-[660px] p-4 relative">
        {currentChat ? (
          <>
            <div className="flex-grow overflow-y-auto p-4 mb-20">
              {messages.map((msg, index) => (
                <div
                  key={msg._id || index}
                  className={`mb-4 ${
                    msg.senderId === "current-user-id"
                      ? "text-right"
                      : "text-left"
                  }`}
                >
                  <div
                    className={`inline-block p-3 rounded-lg ${
                      msg.senderId === "current-user-id"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    {msg.content}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
            <MessageInput currentChat={currentChat} />
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
