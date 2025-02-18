import { useState } from 'react';
import { Select, Table } from 'antd';
import adminApi from '../../../redux/fetures/admin/adminApi';
import { FaAngleRight } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../redux/fetures/auth/authSlice';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { toast } from 'sonner';
import Swal from 'sweetalert2';

const Owner = () => {
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("")
  const [activeOwner, setSetActiveOwner] = useState("active")

  const query = {
    role: "owner",
    subscriptionStatus: activeOwner,
    searchTerm
  }

  const { data: userData } = adminApi.useGetALlUserQuery(query, {
    pollingInterval: 20000
  });

  const [deleteNoSubscriberOwner] = adminApi.useDeleteNoSubscriberOwnerMutation()

  const currentUser = useSelector(selectCurrentUser)

  const navigate = useNavigate()

  const tableData = userData?.data?.map(({
    name,
    numberOfProperty,
    numberOfTotalUnits,
    bookedUnitNumber,
    totalRentAmount,
    personalInfo,
    paidAmount,
    _id,
    email
  }) => ({
    key: _id,
    name,
    numberOfProperty: numberOfProperty | 0,
    numberOfTotalUnits: numberOfTotalUnits | 0,
    bookedUnitNumber: bookedUnitNumber | 0,
    totalRentAmount: totalRentAmount | 0,
    paidAmount: paidAmount | 0,
    contactNumber: personalInfo?.contactNumber | "N/F",
    email
  }));

  const handlePageSizeChange = (current, size) => {
    setPageSize(size);
  };


  const handleNavigate = (id) => {
    navigate(`/${currentUser?.role}/owner/${id}`);
  };

  const nonSubscriberUserDeleteFun = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteNoSubscriberOwner(id);
        if (res?.data?.success) {
          toast.success(res?.data?.message);
        }
      }
    });
  };

  const columns = [
    {
      title: "SL",
      dataIndex: "sl",
      render: (text, record, index) => index + 1
    },
    {
      title: "Owner Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Number of Property",
      dataIndex: "numberOfProperty",
    },
    {
      title: "Number of Unit",
      dataIndex: "numberOfTotalUnits",
    },
    {
      title: "Number of Booked Unit",
      dataIndex: "bookedUnitNumber",
    },
    {
      title: "Current Rent",
      dataIndex: "totalRentAmount",
    },
    {
      title: "Current Balance",
      dataIndex: "paidAmount",
      render: (paidAmount) => (
        <div> <h2 className='font-bold text-green-700 text-[16px]' >{paidAmount} $ </h2> </div>
      )

    },
    {
      title: "Contact No",
      dataIndex: "contactNumber"
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
    }
  ];

  if (activeOwner === "nonSubscriber") {
    columns.push({
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div>
          <span
            onClick={() => nonSubscriberUserDeleteFun(record?.key)}
            className="text-[#4A90E2] flex items-center cursor-pointer"
          >
            <RiDeleteBin5Fill className="text-[20px] ml-1 text-red-600 " />
          </span>
        </div>
      ),
    });
  }

  const searchHandlear = (value) => {
    setSearchTerm(value)
  };

  const handleRoleChange = (value) => {
    setSetActiveOwner(value)
  };


  return (
    <div>
      <div className="mb-6">
        <div>
          <h1 className="text-3xl font-bold">Owner</h1>
          <p className="text-sm text-gray-500">User Management / Owner</p>
        </div>
      </div>
      <div className="bg-white p-5 mt-10 rounded-2xl">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold my-5">Owner List</h1>
          </div>
          <div>

            {
              activeOwner !== "nonSubscriber" &&
              <input onChange={(e) => searchHandlear(e.target.value)} type="text" placeholder='search by name/email' className='border p-2 rounded-lg mr-2' />
            }


            <Select
              defaultValue="Active"
              style={{
                width: 150,
              }}
              onChange={handleRoleChange}
              options={[
                {
                  label: <span>Status</span>,
                  title: "Status",
                  options: [
                    {
                      label: <span>Active</span>,
                      value: "active",
                    },
                    {
                      label: <span>Deactive</span>,
                      value: "canceled",
                    },
                    {
                      label: <span>Non-subscriber</span>,
                      value: "nonSubscriber",
                    },
                  ],
                },
              ]}
            />


          </div>
        </div>

        <Table
          columns={columns}
          dataSource={tableData}
          scroll={{ x: 800 }}
          pagination={{
            pageSize: pageSize,
            pageSizeOptions: ["5", "10", "15", "20", "25"],
            showSizeChanger: true,
            onShowSizeChange: handlePageSizeChange,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
          }}
        />
      </div>
    </div>
  );
};

export default Owner;
