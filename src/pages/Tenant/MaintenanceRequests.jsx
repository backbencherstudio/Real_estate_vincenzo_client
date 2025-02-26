import { Table, Tag } from 'antd';
import 'antd/dist/reset.css';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import MaintenanceForm from '../../components/Forms/MaintenanceForm';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux/fetures/auth/authSlice';
import tenantApi from '../../redux/fetures/tenant/tenantApi';
import maintenanceApi from '../../redux/fetures/maintenance/maintenanceApi';
import moment from 'moment';
import { FaAngleRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function MaintenanceRequests() {
  const [isOpen, setIsOpen] = useState(false);
  const currentUser = useSelector(selectCurrentUser)
  const navigate = useNavigate();
  const { data } = tenantApi.useGetTenantDetailseQuery(currentUser?.userId);
  const { data: maintenanceData, isLoading, refetch } = maintenanceApi.useGetSingleUserMaintenanceDataQuery(currentUser?.userId)

  useEffect(()=>{
    refetch()
  },[])

  const open = () => {
    setIsOpen(true)
  }
  const close = () => {
    setIsOpen(false)
  }

  const tableDatas = maintenanceData?.data?.map(({ _id, createdAt, issueType, description, propertyName, status }) => ({
    key: _id,
    createdAt,
    issueType,
    description,
    propertyName,
    status,
  }));

  const handleNavigate = (id) => {
    navigate(`/${currentUser?.role}/maintenance/${id}`);
  };


  const columns = [
    { title: 'propertyName', dataIndex: 'propertyName' },
    {
      title: 'Issue Type',
      dataIndex: 'issueType',
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (text) => {
        if (!text) return "-";
        const words = text.split(" ");
        const truncated = words.slice(0, 8).join(" ");
        return words.length > 8 ? `${truncated}...` : text;
      },
    },
    {
      title: 'Ussue Created',
      dataIndex: 'createdAt',
      render: (createdAt) => (
        <div>
          {moment(createdAt).format("DD MMMM YYYY, h:mm A")}
        </div>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status) => {
        let color;
        switch (status) {
          case 'Completed':
            color = 'green';
            break;
          case 'Pending':
            color = 'orange';
            break;
          case 'In Progress':
            color = 'red';
            break;
        }
        return (
          <Tag color={color} className="px-3 py-1 rounded-md bg-opacity-20">
            {status}
          </Tag>
        );
      },
      responsive: ['xs', 'sm', 'md', 'lg'],
    },
    {
      title: "Details",
      dataIndex: "details",
      render: (text, record) => (
        <div>
          <span
            onClick={() => handleNavigate(record?.key)}
            className="text-[#4A90E2] flex items-center cursor-pointer"
          >
            Details <FaAngleRight className="text-[18px] ml-1" />
          </span>
        </div>
      ),
    },
  ];

  return (
    <div className='relative'>
      <div className="w-full p-4 md:px-6 lg:px-8">
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 truncate">
              Maintenance Requests
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
                  <span className="hidden sm:inline">Maintenance Requests</span>
                  <span className="inline sm:hidden">Requests</span>
                </li>
              </ol>
            </nav>
          </div>

          <div className="flex justify-start md:justify-end">
            <button onClick={open} className="flex items-center py-5 px-6 bg-gradient-to-l to-[#4A90E2] from-[#1565C0] active:translate-y-0.5 duration-150 text-white rounded-md font-bold">
              <span className="hidden sm:inline">Add Maintenance Request</span>
              <Plus className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:mr-2" />
              <span className="inline sm:hidden">Add Request</span>
            </button>
          </div>
        </div>
      </div>


      <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
        <div className="overflow-x-auto">
          <Table
            className="rounded-md shadow-lg bg-white"
            columns={columns}
            dataSource={tableDatas}
            loading={isLoading}
            pagination={{
              responsive: true,
              showSizeChanger: true,
              pageSizeOptions: ['5', '10', '20'],
            }}
            bordered
          />
        </div>
      </div>
      {
        isOpen && (
          <MaintenanceForm tenantData={data?.data} close={close} />
        )
      }

      <footer className="mt-8 text-center text-sm text-gray-500">
        &copy; 2024 Copyright - All rights reserved
      </footer>
    </div>
  );
}

export default MaintenanceRequests;
