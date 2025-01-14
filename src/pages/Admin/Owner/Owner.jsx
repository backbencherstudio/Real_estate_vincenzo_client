import { useState } from 'react';
import { Select, Table, Tag, Button } from 'antd';
import { dummyData } from '../../../testJson/testJson';
import adminApi from '../../../redux/fetures/admin/adminApi';
import { FaAngleRight } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../redux/fetures/auth/authSlice';

const Owner = () => {
  const [pageSize, setPageSize] = useState(10);
  const { data: userData } = adminApi.useGetALlUserQuery("owner");
  const currentUser = useSelector(selectCurrentUser)

  const navigate = useNavigate()

  const tableData = userData?.data?.map(({
    name,
    numberOfProperty,
    numberOfTotalUnits,
    totalRentAmount,
    personalInfo,
    _id,
  }) => ({
    key: _id,
    name,
    numberOfProperty: numberOfProperty | 0,
    numberOfTotalUnits: numberOfTotalUnits | 0,
    totalRentAmount: totalRentAmount | 0,
    contactNumber: personalInfo?.contactNumber | "N/F",
  }));
  const handlePageSizeChange = (current, size) => {
    setPageSize(size);
  };
 
  const handleNavigate = (id) => {
    navigate(`/${currentUser?.role}/owner/${id}`);
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
      title: "Number of Property",
      dataIndex: "numberOfProperty",
    },
    {
      title: "Number of Unit",
      dataIndex: "numberOfTotalUnits",
    },
    {
      title: "Current Rent",
      dataIndex: "totalRentAmount",
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
    },
  ];

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value) => {
    console.log("search:", value);
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
            <Select
              showSearch
              placeholder="Select a Status"
              optionFilterProp="label"
              onChange={onChange}
              onSearch={onSearch}
              options={[
                {
                  value: "pending",
                  label: "Pending",
                },
                {
                  value: "cancel",
                  label: "Cancel",
                },
                {
                  value: "completed",
                  label: "Completed",
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
