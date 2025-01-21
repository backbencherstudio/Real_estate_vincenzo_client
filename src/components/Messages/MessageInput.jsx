import { useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { IoIosAttach, IoIosSend } from "react-icons/io";
import { useSocket } from "../../context/SocketContext";

export const MessageInput = ({ currentChat }) => {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const { socket } = useSocket();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      const messageData = {
        chatId: currentChat.id,
        content: message,
        senderId: "current-user-id", // Replace with actual user ID
        receiverId: currentChat.userId,
        timestamp: new Date().toISOString(),
      };

      socket.emit("send_message", messageData);
      setMessage("");
    }
  };

  const handleTyping = (e) => {
    setMessage(e.target.value);

    if (!isTyping) {
      setIsTyping(true);
      socket.emit("typing", {
        chatId: currentChat.id,
        userId: "current-user-id",
      });
    }

    // Stop typing indicator after 2 seconds of no input
    const lastTypingTime = new Date().getTime();
    setTimeout(() => {
      const timeNow = new Date().getTime();
      const timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= 2000 && isTyping) {
        socket.emit("stop_typing", {
          chatId: currentChat.id,
          userId: "current-user-id",
        });
        setIsTyping(false);
      }
    }, 2000);
  };

  return (
    <div>
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
            <span className="text-sm text-green-500">
              {currentChat?.isOnline ? "Online" : "Offline"}
            </span>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
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
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </button>
      </div>
      <div className="flex-grow overflow-y-auto p-4">
        {/* Chat messages will go here */}
      </div>
      <div className="md:p-4 py-4 border-t border-gray-100 absolute bottom-0 w-[90%] md:w-full">
        <form onSubmit={handleSubmit} className="flex gap-2 items-center">
          <BsEmojiSmile className="text-gray-400 h-6 w-6 cursor-pointer" />
          <input
            type="text"
            value={message}
            onChange={handleTyping}
            placeholder="Type message..."
            className="flex-grow p-2 rounded-lg focus:outline-none"
            disabled={!currentChat}
          />
          <IoIosAttach className="text-gray-500 h-6 w-6 cursor-pointer" />
          <button
            type="submit"
            disabled={!currentChat || !message.trim()}
            className="px-4 py-2 rounded bg-gradient-to-t from-[#468ddf] to-[#1969c3] text-white font-medium flex items-center gap-2 disabled:opacity-50"
          >
            Send
            <IoIosSend />
          </button>
        </form>
      </div>
    </div>
  );
};
