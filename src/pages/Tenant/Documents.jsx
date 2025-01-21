import { Avatar, Table, Tag } from 'antd';
import 'antd/dist/reset.css'; // To include Ant Design styles
import tableData from "../../../public/tabledata.json";
import { Plus } from 'lucide-react';

function Documents() {
  
  


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
    <div className="bg-gray-50 min-h-screen p-4">
      {/* Header */}
      <div className="w-full p-4 md:px-6 lg:px-8">
      {/* Main Container with responsive padding */}
      <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between">
        {/* Left side content */}
        <div className="flex-1 min-w-0">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 truncate">
            Maintenance Requests
          </h1>
          
          {/* Breadcrumb navigation */}
          <nav className="flex mt-1 sm:mt-2" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center space-x-2 text-xs sm:text-sm text-gray-500">
              <li className="flex items-center">
                <a href="#" className="hover:text-blue-600 transition-colors">
                  My Apartment
                </a>
              </li>
              <li className="flex items-center">
                <svg 
                  className="w-3 h-3 sm:w-4 sm:h-4 mx-1" 
                  viewBox="0 0 16 16" 
                  fill="currentColor"
                >
                  <path d="M6.6 13.4L5.2 12l4-4-4-4 1.4-1.4L12 8z" />
                </svg>
                <span className="hidden sm:inline">Maintenance Requests</span>
                <span className="inline sm:hidden">Requests</span>
              </li>
            </ol>
          </nav>
        </div>

        {/* Add Request Button - responsive size and padding */}
        <div className="flex justify-start md:justify-end">
          <button className="flex items-center px-3 py-4 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:bg-blue-700">
            <span className="hidden sm:inline">Add Maintenance Request</span>
            <Plus className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:mr-2" />
            <span className="inline sm:hidden">Add Request</span>
          </button>
        </div>
      </div>
    </div>


      {/* Payments Section */}
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
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

export default Documents;
