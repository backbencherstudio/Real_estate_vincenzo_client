import { useState, useEffect, useRef } from "react";
import { MessageList } from "../../components/Messages/MessageList";
import { MessageInput } from "../../components/Messages/MessageInput";
import io from "socket.io-client";
import adminApi from "../../redux/fetures/admin/adminApi";
import { selectCurrentUser } from "../../redux/fetures/auth/authSlice";
import { useSelector } from "react-redux";
const socket = io("http://localhost:4000");

const Messages = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [currentChat, setCurrentChat] = useState(null);
  const [user, setUser] = useState("");
  const currentUser = useSelector(selectCurrentUser);
  const [recipient, setRecipient] = useState(currentUser?.email);
  const { data: userData } = adminApi.useGetALlUserQuery("");
  const [unreadMessages, setUnreadMessages] = useState({});
  const [lastMessages, setLastMessages] = useState({});
  const messagesEndRef = useRef(null);
  const [onlineUsers, setOnlineUsers] = useState({});

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch message history when component mounts or recipient changes
  // useEffect(() => {
  //   if (recipient) {
  //     fetch("http://localhost:4000/chats")
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setMessages(data);
  //         const lastMessagesMap = {};
  //         data.forEach((msg) => {
  //           const otherUser =
  //             msg.sender === currentUser?.email ? msg.recipient : msg.sender;
  //           if (
  //             !lastMessagesMap[otherUser] ||
  //             new Date(msg.timestamp) >
  //               new Date(lastMessagesMap[otherUser].timestamp)
  //           ) {
  //             lastMessagesMap[otherUser] = {
  //               content: msg.content,
  //               timestamp: msg.timestamp,
  //             };
  //           }
  //         });
  //         setLastMessages(lastMessagesMap);
  //       })
  //       .catch((error) => console.error("Error fetching messages:", error));
  //   }
  // }, [recipient, currentUser]);

  useEffect(() => {
    socket.emit("join", currentUser?.email);

    socket.on("connect", () => {
      console.log("Connected to socket server");
      // Emit user online status when connected
      socket.emit("user_online", currentUser?.email);
    });

    // Listen for online users updates
    socket.on("online_users", (users) => {
      setOnlineUsers(users);
    });

    socket.on("user_connected", (userId) => {
      setOnlineUsers((prev) => ({
        ...prev,
        [userId]: true,
      }));
    });

    socket.on("user_disconnected", (userId) => {
      setOnlineUsers((prev) => ({
        ...prev,
        [userId]: false,
      }));
    });

    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      // setLastMessages((prev) => ({
      //   ...prev,
      //   [message.sender === currentUser?.email
      //     ? message.recipient
      //     : message.sender]: {
      //     content: message.content,
      //     timestamp: message.timestamp,
      //   },
      // }));

      if (message.sender !== currentUser?.email) {
        setUnreadMessages((prev) => ({
          ...prev,
          [message.sender]: true,
        }));
      }
    });

    socket.on("message history", (history) => {
      setMessages(history);
    });

    socket.on("user list", (userList) => {
      // console.log("User list updated:", userList);
    });
    return () => {
      socket.emit("user_offline", currentUser?.email);
      socket.off("online_users");
      socket.off("user_connected");
      socket.off("user_disconnected");
      socket.off("message");
      socket.off("message history");
      socket.off("user list");
    };
  }, [currentUser]);
  useEffect(() => {
    if (recipient) {
      const foundUser = userData?.data.find((u) => u.email === recipient);
      if (foundUser) {
        setUser(foundUser);
      }
    }
  }, [recipient, userData?.data]);
  const sendMessage = (e) => {
    e.preventDefault();
    if (message && recipient) {
      const messageData = {
        recipient: recipient,
        message: message,
        timestamp: new Date(),
        sender: currentUser?.email,
      };
      socket.emit("message", messageData);
      setMessage(""); // Clear input after sending
    } else {
      console.warn("Input or recipient is empty");
    }
  };
  const handleChatSelect = (chat) => {
    setRecipient(chat.email);
    setCurrentChat(chat);
    socket.emit("join_chat", chat.email);
    setIsSidebarOpen(false);

    // Clear unread status when chat is selected
    setUnreadMessages((prev) => ({
      ...prev,
      [chat.email]: false,
    }));
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

          <div className="overflow-y-auto h-full">
            <MessageList
              onChatSelect={handleChatSelect}
              userData={userData?.data?.map((user) => ({
                ...user,
                hasUnread: unreadMessages[user.email] || false,
                lastMessage: lastMessages[user.email] || "No messages yet",
                isOnline: onlineUsers[user.email] || false,
              }))}
              currentUser={currentUser?.email}
            />
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
                    onlineUsers[currentChat?.email]
                      ? "text-green-500"
                      : "text-gray-500"
                  }`}
                >
                  {onlineUsers[currentChat?.email] ? "Online" : "Offline"}
                </span>
              </div>
            </div>
          </div>
          {currentChat ? (
            <>
              <div
                className="flex-grow h-[540px] overflow-y-auto p-4 mb-10"
                style={{ display: "flex", flexDirection: "column-reverse" }}
              >
                <div ref={messagesEndRef} />
                {messages
                  .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                  .map((msg, index) => (
                    <div key={index}>
                      {((msg.sender === currentUser?.email &&
                        msg.recipient === currentChat?.email) ||
                        (msg.recipient === currentUser?.email &&
                          msg.sender === currentChat?.email)) && (
                        <div
                          key={msg._id || index}
                          className={`mb-4 ${
                            msg.sender === currentUser?.email
                              ? "text-right"
                              : "text-left"
                          }`}
                        >
                          <div
                            className={`inline-block p-3 rounded-lg ${
                              msg.sender === currentUser?.email
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
                      )}
                    </div>
                  ))}
              </div>
              <MessageInput
                currentChat={currentChat}
                message={message}
                setMessage={setMessage}
                sendMessage={sendMessage}
              />
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
          <MessageList
            onChatSelect={handleChatSelect}
            userData={userData?.data?.map((user) => ({
              ...user,
              hasUnread: unreadMessages[user.email] || false,
              lastMessage: lastMessages[user.email] || "No messages yet",
              isOnline: onlineUsers[user.email] || false,
            }))}
            currentUser={currentUser?.email}
          />
        </div>
      </div>
      <div className="md:hidden mt-4 bg-white rounded-lg  h-[660px] p-4 relative">
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
                  onlineUsers[currentChat?.email]
                    ? "text-green-500"
                    : "text-gray-500"
                }`}
              >
                {onlineUsers[currentChat?.email] ? "Online" : "Offline"}
              </span>
            </div>
          </div>
        </div>
        {currentChat ? (
          <>
            <div
              className="flex-grow h-[540px] overflow-y-auto p-4 mb-10 pb-10"
              style={{ display: "flex", flexDirection: "column-reverse" }}
            >
              <div ref={messagesEndRef} />
              {messages
                .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                .map((msg, index) => (
                  <div key={index}>
                    {((msg.sender === currentUser?.email &&
                      msg.recipient === currentChat?.email) ||
                      (msg.recipient === currentUser?.email &&
                        msg.sender === currentChat?.email)) && (
                      <div
                        key={msg._id || index}
                        className={`mb-4 ${
                          msg.sender === currentUser?.email
                            ? "text-right"
                            : "text-left"
                        }`}
                      >
                        <div
                          className={`inline-block p-3 rounded-lg ${
                            msg.sender === currentUser?.email
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
                    )}
                  </div>
                ))}
            </div>
            <MessageInput
              currentChat={currentChat}
              message={message}
              setMessage={setMessage}
              sendMessage={sendMessage}
            />
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
