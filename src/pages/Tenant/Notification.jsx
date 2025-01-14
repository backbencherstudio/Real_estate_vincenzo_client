
const Notification = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
    <div className="max-w-full mx-auto bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="border-b border-gray-200 px-4 sm:px-6 py-4">
        <h1 className="text-lg sm:text-xl font-semibold text-gray-800">Notification</h1>
        <p className="text-sm text-gray-500">Home / Notification</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center justify-between px-4 sm:px-6 py-4 gap-2">
        <div className="flex gap-2 sm:gap-4">
          <button className="px-3 sm:px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600">
            All
          </button>
          <button className="px-3 sm:px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200">
            Unread (12)
          </button>
        </div>
        <button className="text-sm text-blue-500 hover:underline">Mark all as read</button>
      </div>

      {/* Notifications */}
      <div className="px-4 sm:px-6 py-4">
        {/* Today Section */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-gray-500">Today</p>
          <div className="mt-2 space-y-4">
            {["2 min ago", "1 hr ago", "Today at 04:50 PM", "Today at 02:30 PM"].map(
              (time, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between flex-wrap gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Liam Anderson</span> has accepted your
                      maintenance request
                    </p>
                  </div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                </div>
              )
            )}
          </div>
        </div>

        {/* Yesterday Section */}
        <div>
          <p className="text-sm font-semibold text-gray-500">Yesterday</p>
          <div className="mt-2 space-y-4">
            {[
              "July 16, 2024 at 04:50 PM",
              "July 16, 2024 at 04:50 PM",
              "July 16, 2024 at 04:50 PM",
            ].map((time, index) => (
              <div
                key={index}
                className="flex items-center justify-between flex-wrap gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Liam Anderson</span> has accepted your
                    maintenance request
                  </p>
                </div>
                <p className="text-sm text-gray-500">{time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Notification;
