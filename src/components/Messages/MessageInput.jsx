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
    if (message.trim() && currentChat) {
      const messageData = {
        chatId: currentChat.id,
        senderId: "current-user-id", // Replace with actual user ID from auth
        content: message,
      };

      socket.emit("send_message", messageData);
      setMessage("");
    }
  };

  const handleTyping = (e) => {
    setMessage(e.target.value);

    if (!isTyping && currentChat) {
      setIsTyping(true);
      socket.emit("typing", {
        chatId: currentChat.id,
        userId: "current-user-id", // Replace with actual user ID
      });
    }

    // Stop typing indicator after 2 seconds
    const lastTypingTime = new Date().getTime();
    setTimeout(() => {
      const timeNow = new Date().getTime();
      const timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= 2000 && isTyping && currentChat) {
        socket.emit("stop_typing", {
          chatId: currentChat.id,
          userId: "current-user-id", // Replace with actual user ID
        });
        setIsTyping(false);
      }
    }, 2000);
  };

  return (
    <div>
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
