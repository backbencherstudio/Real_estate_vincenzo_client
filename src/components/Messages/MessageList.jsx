export const MessageList = () => {
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
                Hey! {"How's"} it going?
              </p>
            </div>
            <span className="text-xs text-gray-400">2m ago</span>
          </div>
        </button>
        {/* Add more message items here */}
      </div>
    </div>
  );
};
