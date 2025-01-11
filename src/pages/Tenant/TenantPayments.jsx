import { Avatar, Table, Tag } from 'antd';
import 'antd/dist/reset.css'; // To include Ant Design styles
import tableData from "../../../public/tabledata.json";

function TenantPayments() {


    const tableDatas = tableData?.map(({ invoice_id, name, amount, due_date, status, profile_picture }) => ({
        key: invoice_id, // Using invoice_id as the key for each row
        invoice_id,
        name,
        amount,
        due_date,
        status,
        profile_picture // including this even though it's not in columns, in case you need it later
      }));



    const columns = [
        { title: 'Invoice ID', dataIndex: 'invoice_id', responsive: ['xs', 'sm', 'md', 'lg'] },
        {
            title: 'Name',
            dataIndex: '',
            render: (record) => (
              <div className="flex items-center">
                <Avatar src={record.profile_picture} size={40} className="mr-4" />
                <span>{record.name}</span>
              </div>
            ),
            responsive: ['xs', 'sm', 'md', 'lg'],
          },
        { title: 'Amount', dataIndex: 'amount', responsive: ['xs', 'sm', 'md', 'lg'] },
        { title: 'Due Date', dataIndex: 'due_date', responsive: ['md', 'lg'] },
        {
          title: 'Status',
          dataIndex: 'status',
          render: (status) => {
            let color;
            switch (status) {
              case 'Paid':
                color = 'green';
                break;
              case 'Pending':
                color = 'orange';
                break;
              case 'Overdue':
                color = 'red';
                break;
              default:
                color = 'gray';
            }
            return (
              <Tag color={color} className="px-3 py-1 rounded-md bg-opacity-20">
                {status}
              </Tag>
            );
          },
          responsive: ['xs', 'sm', 'md', 'lg'],
        },
      ];

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-semibold mb-4 md:mb-0">Payments</h1>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
          <h2 className="text-gray-600 text-sm">Rent Due</h2>
          <div className="text-3xl font-bold">$800</div>
          <a href="#" className="text-blue-500 text-sm mt-2 inline-block">
            View Details
          </a>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
          <h2 className="text-gray-600 text-sm">Pending Payment</h2>
          <div className="text-3xl font-bold">02</div>
          <a href="#" className="text-blue-500 text-sm mt-2 inline-block">
            View Details
          </a>
        </div>
      </div>

      {/* Payments Section */}
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 space-y-4 md:space-y-0">
          <h2 className="text-lg font-semibold">Recent Payments</h2>
          <div className="flex flex-wrap gap-2">
            {/* All Dropdown */}
            <div className="relative">
              <button
                className="flex items-center bg-gray-100 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="flex items-center bg-gray-100 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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

        {/* Table */}
        <div className="overflow-x-auto">
          <Table
            className="rounded-md shadow-lg bg-white"
            columns={columns}
            dataSource={tableDatas}
            pagination={{
              responsive: true,
              showSizeChanger: true,
              pageSizeOptions: ['5', '10', '20'],
            }}
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

export default TenantPayments;
