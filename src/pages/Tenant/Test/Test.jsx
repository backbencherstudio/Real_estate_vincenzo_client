

import { Table } from 'antd';
import 'antd/dist/reset.css';  // To include Ant Design styles
import tableData from "../../../../public/tabledata.json"


function TenantHome() {


  const columns = [
    { title: 'Invoice ID', dataIndex: 'invoice_id' },
    { title: 'Name', dataIndex: 'name' },
    { title: 'Amount', dataIndex: 'amount' },
    { title: 'Due Date', dataIndex: 'due_date' },
    { title: 'Status', dataIndex: 'status' },
  ];
  



  return (
    <div className="bg-gray-50 min-h-screen p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <img
            src="/path-to-avatar.png"
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
          <div className="text-sm text-gray-600">Jonathan</div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-gray-600 text-sm">Rent Due</h2>
          <div className="text-3xl font-bold">$800</div>
          <a href="#" className="text-blue-500 text-sm mt-2 inline-block">
            View Details
          </a>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-gray-600 text-sm">Maintenance Requests</h2>
          <div className="text-3xl font-bold">02</div>
          <a href="#" className="text-blue-500 text-sm mt-2 inline-block">
            View Details
          </a>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-lg font-semibold">Recent Payments</h2>
    <div className="flex space-x-2">
      {/* All Dropdown */}
      <div className="relative">
        <button
          className="flex items-center bg-gray-100 px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <span className="mr-2">All</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {/* This Month Dropdown */}
      <div className="relative">
        <button
          className="flex items-center bg-gray-100 px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 8h14M5 12h14m-7 4h7"
            />
          </svg>
          <span>This Month</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>
    </div>




  </div>

  <div className="overflow-x-auto">
      <Table
        className="rounded-md shadow-lg bg-white"
        columns={columns}
        dataSource={tableData}
        pagination={false}
        bordered
      />
    </div>
</div>
      {/* Footer */}
      <footer className="mt-8 text-center text-sm text-gray-500">
        &copy; 2024 Copyright - All rights reserved
      </footer>
    </div>
  );
}

export default TenantHome;
