
import {  Table, Tag } from 'antd';
import 'antd/dist/reset.css';  
import { RiSettingsFill } from 'react-icons/ri';
import money from './../../assets/money.svg'
import tenantApi from '../../redux/fetures/tenant/tenantApi';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux/fetures/auth/authSlice';
import moment from 'moment';


function TenantDashboard() {
  const currentUser = useSelector(selectCurrentUser)

  const {data} = tenantApi.useGetSingleUserAllPaymentDataQuery(currentUser?.userId)
  console.log(data?.data);
  
  const getDynamicDate = (year = new Date().getFullYear(), month = new Date().getMonth() + 1) => {
    return new Date(year, month - 1, 5).toLocaleDateString();
  };

  const tableDatas = data?.data?.map(({ _id, invoice, propertyId, unitId,  status, createdAt }) => ({
    key: _id, 
    invoice,
    propertyName : propertyId?.propertyName,
    rent : unitId?.rent,
    lastDate: getDynamicDate(),
    status,     
    createdAt
  }));


  const columns = [
    { title: 'Invoice ID', dataIndex: 'invoice' },
    {
      title: 'Property Name',
      dataIndex: 'propertyName',
    },
    { title: 'Rent', dataIndex: 'rent'  },
    { title: 'Last Date', dataIndex: "lastDate" },
    { title: 'Created Payment', dataIndex: "createdAt" , 
      render: (createdAt) => (
            <div>
              {moment(createdAt).format("M/D/YYYY")} 
            </div>
          ), },
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
    },
    {
          title: "Pay",
          dataIndex: "",
          render: (text, record) => (
            <div>
              <button
                className="text-[#4A90E2]  cursor-pointer border border-sky-100 px-4 rounded "
              >
                Pay 
              </button>
            </div>
          ),
        },

  ];




  return (
    <div className="">
      {/* Header */}
      <div className="flex justify-between items-center mb-1">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
      </div>
      <div className=" mb-6">
        <div className="text-sm text-gray-500">
          Home / Dashboard
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="flex gap-4 items-baseline bg-white p-4 md:p-6 rounded-lg shadow-sm">
          <div className='flex justify-center items-center text-xl text-blue-500 w-10 h-10 bg-[#F9F9F9] rounded-full'>
            <img src={money} alt="" />
          </div>
          <div>
            <div className="text-3xl font-bold">$800</div>
            <h2 className="text-gray-600 text-sm">Rent Due</h2>
            <a href="#" className="text-blue-500 text-sm mt-2 inline-block">
              View Details
            </a>
          </div>
        </div>
        <div className="flex gap-4 items-baseline bg-white p-4 md:p-6 rounded-lg shadow-sm">
          <div className='flex justify-center items-center text-xl text-blue-500 w-10 h-10 bg-[#F9F9F9] rounded-full'>
            <RiSettingsFill />
          </div>
          <div>
            <div className="text-3xl font-bold">02</div>
            <h2 className="text-gray-600 text-sm">Pending Payment</h2>
            <a href="#" className="text-blue-500 text-sm mt-2 inline-block">
              View Details
            </a>
          </div>
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
            scroll={{ x: 800 }}
            columns={columns}
            dataSource={tableDatas}
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

export default TenantDashboard;
