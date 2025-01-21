import { BsEmojiSmile } from "react-icons/bs";
import { IoIosAttach, IoIosSend } from "react-icons/io";

export const MessageInput = () => {
  return (
    <div>
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="https://via.placeholder.com/40"
            alt="User"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="font-semibold">Liam Anderson</h3>
            <span className="text-sm text-green-500">Online</span>
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
        <div className="flex gap-2 items-center">
          <BsEmojiSmile className="text-gray-400 h-6 w-6 cursor-pointer" />
          <input
            type="text"
            placeholder="Type message..."
            className="flex-grow p-2 rounded-lg  focus:outline-none "
          />
          <IoIosAttach className="text-gray-500 h-6 w-6 cursor-pointer" />
          <button className="px-4 py-2 rounded bg-gradient-to-t from-[#468ddf] to-[#1969c3] text-white font-medium flex items-center gap-2">
            Send
            <IoIosSend />
          </button>
        </div>
      </div>
    </div>
  );
};
