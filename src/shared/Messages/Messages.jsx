import { useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { IoIosAttach, IoIosSend } from "react-icons/io";

const MessageInput = () => {
  return (
    <div className="">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
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

const Messages = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
          <div className="p-4 border-b border-gray-100">
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

          {/* Messages List */}
          <div className="overflow-y-auto h-[calc(100%-73px)]">
            <div className="p-2">
              <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <img
                    src="https://via.placeholder.com/40"
                    alt="User"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-grow">
                    <h3 className="font-semibold text-sm">Liam Anderson</h3>
                    <p className="text-gray-500 text-sm truncate">
                      Hey! How's it going?
                    </p>
                  </div>
                  <span className="text-xs text-gray-400">2m ago</span>
                </div>
              </button>
              {/* Add more message items here */}
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="col-span-2 flex flex-col bg-white relative">
          {/* Chat Header */}
          <MessageInput />
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
        <div className="p-4 border-b border-gray-100">
          <div className="flex justify-between items-center mb-4">
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
          <div className="flex gap-2 items-center">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500"
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
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <button className="h-9 w-9 bg-black rounded-lg flex items-center justify-center">
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

        {/* Messages List */}
        <div className="overflow-y-auto h-[calc(100%-137px)]">
          <div className="p-2">
            <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <img
                  src="https://via.placeholder.com/40"
                  alt="User"
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-grow">
                  <h3 className="font-semibold text-sm">Liam Anderson</h3>
                  <p className="text-gray-500 text-sm truncate">
                    Hey! How's it going?
                  </p>
                </div>
                <span className="text-xs text-gray-400">2m ago</span>
              </div>
            </button>
            {/* Add more message items here */}
          </div>
        </div>
      </div>

      {/* Mobile Content Area */}
      <div className="md:hidden mt-4 bg-white rounded-lg  min-h-[660px] p-4 relative">
        <MessageInput />
      </div>
    </div>
  );
};

export default Messages;
