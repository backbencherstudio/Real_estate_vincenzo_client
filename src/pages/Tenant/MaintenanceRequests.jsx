import { Avatar, Table, Tag } from 'antd';
import 'antd/dist/reset.css'; // To include Ant Design styles
import tableData from "../../../public/tabledata.json";
<<<<<<< HEAD
import { ChevronDown, Plus, X } from 'lucide-react'; // Importing 'X' for the cancel button
import { useState } from 'react';

function MaintenanceRequests() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    propertyName: '',
    unitNo: '',
    issueType: '',
    date: '',
    description: '',
    image: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submit is disabled for now.');
  };

  const tableDatas = tableData?.map(({ invoice_id, name, amount, due_date, status, profile_picture }) => ({
    key: invoice_id,
=======
import { Plus } from 'lucide-react';
import { useState } from 'react';
import MaintenanceForm from '../../components/Forms/MaintenanceForm';

function MaintenanceRequests() {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    setIsOpen(true)
  }
  const close = () => {
    setIsOpen(false)
  }

  const tableDatas = tableData?.map(({ invoice_id, name, amount, due_date, status, profile_picture }) => ({
    key: invoice_id, // Using invoice_id as the key for each row
>>>>>>> ecc7206689cd6929ac135e3e7fbd0d5ed00cc343
    invoice_id,
    name,
    amount,
    due_date,
    status,
<<<<<<< HEAD
    profile_picture,
  }));

=======
    profile_picture // including this even though it's not in columns, in case you need it later
  }));



>>>>>>> ecc7206689cd6929ac135e3e7fbd0d5ed00cc343
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
    <div className='relative'>
      {/* Header */}
      <div className="w-full p-4 md:px-6 lg:px-8">
<<<<<<< HEAD
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between">
=======
        {/* Main Container with responsive padding */}
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between">
          {/* Left side content */}
>>>>>>> ecc7206689cd6929ac135e3e7fbd0d5ed00cc343
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 truncate">
              Maintenance Requests
            </h1>
<<<<<<< HEAD
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

          <div className="flex justify-start md:justify-end">
            <button
              onClick={() => setIsModalOpen(true)} // Show modal on click
              className="flex items-center rounded-[12px] bg-gradient-to-r from-[#4A90E2] to-[#1565C0] p-4 md:p-5 w-full text-white font-medium text-lg"
            >
=======

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
            <button onClick={open} className="flex items-center py-5 px-6 bg-gradient-to-l to-[#4A90E2] from-[#1565C0] active:translate-y-0.5 duration-150 text-white rounded-md font-bold">
>>>>>>> ecc7206689cd6929ac135e3e7fbd0d5ed00cc343
              <span className="hidden sm:inline">Add Maintenance Request</span>
              <Plus className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:mr-2" />
              <span className="inline sm:hidden">Add Request</span>
            </button>
          </div>
<<<<<<< HEAD
=======
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
>>>>>>> ecc7206689cd6929ac135e3e7fbd0d5ed00cc343
        </div>
      </div>
      {
        isOpen && (
          <MaintenanceForm  close={close}/>
        )
      }

      {/* Table */}
      <Table
        dataSource={tableDatas}
        columns={columns}
        pagination={{ pageSize: 10 }}
        className="mt-4"
      />

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl p-6 space-y-6 relative">
            {/* Cancel Cross Button */}
            <button
              onClick={() => setIsModalOpen(false)} // Close modal on click
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-semibold text-gray-900">Add Maintenance Request</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Property Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Property Name*
                </label>
                <input
                  type="text"
                  placeholder="Rendering modern villa"
                  className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500"
                  value={formData.propertyName}
                  onChange={(e) => setFormData({ ...formData, propertyName: e.target.value })}
                />
              </div>

              {/* Two Column Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Unit No*</label>
                  <select
                    className="w-full px-4 py-2 border rounded-lg bg-white pr-10 focus:ring-2 focus:ring-blue-500"
                    value={formData.unitNo}
                    onChange={(e) => setFormData({ ...formData, unitNo: e.target.value })}
                  >
                    <option value="">Unit no 2</option>
                    <option value="1">Unit 1</option>
                    <option value="2">Unit 2</option>
                    <option value="3">Unit 3</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Issue Type*</label>
                  <select
                    className="w-full px-4 py-2 border rounded-lg bg-white pr-10 focus:ring-2 focus:ring-blue-500"
                    value={formData.issueType}
                    onChange={(e) => setFormData({ ...formData, issueType: e.target.value })}
                  >
                    <option value="">Electrical problems</option>
                    <option value="electrical">Electrical</option>
                    <option value="plumbing">Plumbing</option>
                    <option value="structural">Structural</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date*</label>
                  <input
                    type="text"
                    placeholder="11 July 2024"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image Attach*</label>
                  <div className="flex items-center">
                    <label className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg cursor-pointer hover:bg-blue-100">
                      Choose File
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
                <textarea
                  placeholder="Description here"
                  rows={4}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-gray-400 text-white px-6 py-2 rounded-lg flex items-center cursor-not-allowed"
                disabled
              >
                Submit Request
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MaintenanceRequests;
