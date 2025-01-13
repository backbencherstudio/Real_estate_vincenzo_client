import { Avatar, Table, Tag } from 'antd';
import 'antd/dist/reset.css';
import tableData from "../../../public/tabledata.json";
import { ChevronDown, Plus, Upload, X } from 'lucide-react';
import { useState } from 'react';

function DocumentsTenant() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('Passport');
  const [isDragging, setIsDragging] = useState(false);
  
  const documentTypes = ['Passport', 'Driver License', 'ID Card', 'Birth Certificate'];

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    // Handle file drop here
  };

  const tableDatas = tableData?.map(({ invoice_id, name, amount, due_date, status, profile_picture }) => ({
    key: invoice_id,
    invoice_id,
    name,
    amount,
    due_date,
    status,
    profile_picture,
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
    <div className="bg-gray-50 min-h-screen p-2 sm:p-4">
      {/* Header */}
      <div className="w-full p-4 md:px-6 lg:px-8">
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 truncate">
              Documents
            </h1>
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
                  <span className="hidden sm:inline">Documents</span>
                  <span className="inline sm:hidden">Docs</span>
                </li>
              </ol>
            </nav>
          </div>

          <div className="flex justify-start md:justify-end">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <span>Add Document</span>
              <Plus className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="mt-4">
        <Table
          dataSource={tableDatas}
          columns={columns}
          pagination={{ pageSize: 10 }}
        />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsModalOpen(false)} />
          <div className="relative min-h-screen flex items-center justify-center p-2 sm:p-4">
            <div className="relative bg-white rounded-lg w-full max-w-[95%] sm:max-w-lg lg:max-w-2xl p-3 sm:p-4 lg:p-6">
              {/* X button in top right corner */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
              </button>

              <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 pr-8">Add New Document</h2>

              <div className="mb-4 sm:mb-6">
                <label className="block text-sm sm:text-base mb-1.5 sm:mb-2">Select Document type</label>
                <div className="relative">
                  <button
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 lg:px-6 lg:py-4 text-left bg-white border rounded-lg flex items-center justify-between"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <span className="text-sm sm:text-base text-gray-600">{selectedType}</span>
                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  </button>
                  
                  {isDropdownOpen && (
                    <div className="absolute w-full mt-1 bg-white border rounded-lg shadow-lg z-50">
                      {documentTypes.map((type) => (
                        <button
                          key={type}
                          className="w-full px-3 py-2 sm:px-4 sm:py-2.5 text-sm sm:text-base text-left hover:bg-gray-50"
                          onClick={() => {
                            setSelectedType(type);
                            setIsDropdownOpen(false);
                          }}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div
                className={`border-2 border-dashed rounded-lg p-4 sm:p-6 lg:p-8 text-center ${
                  isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                }`}
                onDragEnter={handleDragEnter}
                onDragOver={(e) => e.preventDefault()}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <Upload className="mx-auto h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-gray-400" />
                <div className="mt-2 sm:mt-3 lg:mt-4 text-sm sm:text-base">
                  <span className="text-gray-600">Drag to </span>
                  <span className="text-blue-500">New File</span>
                  <span className="text-gray-600"> to Upload</span>
                </div>
              </div>

              <div className="mt-4 sm:mt-6 flex justify-start">
                <button className="w-full sm:w-auto px-4 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 text-sm sm:text-base bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  Add Document
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DocumentsTenant;