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
  const [recipient, setRecipient] = useState("");
  const [user, setUser] = useState("");
  const currentUser = useSelector(selectCurrentUser);
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

  // Fetch all messages and set last messages when component mounts
  useEffect(() => {
    fetch("http://localhost:4000/chats")
      .then((response) => response.json())
      .then((data) => {
        // Update last message for all users - get the most recent message
        const lastMessagesMap = {};
        data.forEach((msg) => {
          // Only process messages where current user is either sender or recipient
          if (
            msg.sender === currentUser?.email ||
            msg.recipient === currentUser?.email
          ) {
            const otherUser =
              msg.sender === currentUser?.email ? msg.recipient : msg.sender;
            // Only update if this message is more recent than the existing one
            if (
              !lastMessagesMap[otherUser] ||
              new Date(msg.timestamp) >
                new Date(lastMessagesMap[otherUser].timestamp)
            ) {
              lastMessagesMap[otherUser] = {
                content: msg.content,
                timestamp: msg.timestamp,
              };
            }
          }
        });
        setLastMessages(lastMessagesMap);
      })
      .catch((error) => console.error("Error fetching messages:", error));
  }, [currentUser]);

  // Fetch messages for specific chat when recipient changes
  useEffect(() => {
    if (recipient) {
      fetch("http://localhost:4000/chats")
        .then((response) => response.json())
        .then((data) => {
          // Filter messages for the current chat
          const chatMessages = data.filter(
            (msg) =>
              (msg.recipient === recipient &&
                msg.sender === currentUser?.email) ||
              (msg.recipient === currentUser?.email && msg.sender === recipient)
          );
          setMessages(chatMessages);
        })
        .catch((error) => console.error("Error fetching messages:", error));
    }
  }, [recipient, currentUser]);

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

    // Listen for user connected event
    socket.on("user_connected", (userId) => {
      setOnlineUsers((prev) => ({
        ...prev,
        [userId]: true,
      }));
    });

    // Listen for user disconnected event
    socket.on("user_disconnected", (userId) => {
      setOnlineUsers((prev) => ({
        ...prev,
        [userId]: false,
      }));
    });

    socket.on("message", (message) => {
      // Only update messages if the current user is the sender or intended recipient
      if (
        (message.sender === currentUser?.email &&
          message.recipient === recipient) ||
        (message.recipient === currentUser?.email &&
          message.sender === recipient)
      ) {
        setMessages((prevMessages) => {
          // Check if message already exists to prevent duplication
          const messageExists = prevMessages.some(
            (msg) =>
              msg._id === message._id ||
              (msg.timestamp === message.timestamp &&
                msg.content === message.content)
          );
          return messageExists ? prevMessages : [...prevMessages, message];
        });
      }

      // Update last message for the relevant chat
      if (
        message.sender === currentUser?.email ||
        message.recipient === currentUser?.email
      ) {
        const otherUser =
          message.sender === currentUser?.email
            ? message.recipient
            : message.sender;
        setLastMessages((prev) => ({
          ...prev,
          [otherUser]: {
            content: message.content,
            timestamp: message.timestamp,
          },
        }));

        // Set unread only if message is received and not from current user
        if (message.sender !== currentUser?.email) {
          setUnreadMessages((prev) => ({
            ...prev,
            [message.sender]: true,
          }));
        }
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
  }, [currentUser, recipient]);
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
        to: recipient,
        message: message,
        timestamp: new Date(),
        user: currentUser?.email,
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
                lastMessage: lastMessages[user.email] || {
                  content: "No messages yet",
                  timestamp: null,
                },
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
            userData={userData?.data}
            currentUser={currentUser?.email}
          />
        </div>
      </div>
      <div className="md:hidden mt-4 bg-white rounded-lg  h-[660px] p-4 relative">
        {currentChat ? (
          <>
            <div className="flex-grow h-[540px] overflow-scroll p-4 mb-10">
              {messages
                .filter(
                  (msg) =>
                    (msg.to === recipient &&
                      msg.user === "sr.sohan088@gmail.com") ||
                    (msg.to === "sr.sohan088@gmail.com" &&
                      msg.user === recipient)
                )
                .map((msg, index) => (
                  <div
                    key={msg._id || index}
                    className={`mb-4 ${
                      msg.user === "sr.sohan088@gmail.com"
                        ? "text-right"
                        : "text-left"
                    }`}
                  >
                    <div
                      className={`inline-block p-3 rounded-lg ${
                        msg.user === "sr.sohan088@gmail.com"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      {msg.message}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </div>
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
