import  { useState } from 'react';
import { Select, Table, Tag, Button } from 'antd';
import { dummyData } from '../../../testJson/testJson';
import ProfileInformation from '../../../components/TenantDetailsTabs/ProfileInformation';
import { CircleX, Mail, MoreVertical } from 'lucide-react';

const Owner = () => {
  const [pageSize, setPageSize] = useState(10);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);


  const handlePageSizeChange = (current, size) => {
    setPageSize(size);
  };

  const handleRowClick = (record) => {
    setSelectedUser(record);
  };

  const clearSelection = () => {
    setSelectedUser(null);
  };

  const personalInfo = {
    name: 'Christopher',
    email: 'Chrispher@gmail.com',
    contact: '+111 582 654 963',
    age: '36',
    familyMember: '6',
    job: 'Designer'
  };

  const addressInfo = {
    address: 'Staten Island, NY 10314, USA',
    city: 'New York',
    state: 'Manhattan',
    zipCode: '1216',
    country: 'United State'
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <Tag
          color={
            status === "pending"
              ? "orange"
              : status === "complete"
                ? "green"
                : "red"
          }
          style={{ textTransform: "capitalize" }}
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Button type="link" onClick={() => handleRowClick(record)}>
          View Details
        </Button>
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
      <div className="mb-6 flex justify-between ">
        <div>
          <h1 className="text-3xl font-bold">Owner</h1>
          <p className="text-sm text-gray-500">User Management / Owner</p>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <MoreVertical className="h-5 w-5 text-gray-600" />
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 p-6 bg-white rounded-md shadow-lg z-50">
              <div className="py-1">
                <button className="flex items-center gap-2 w-full mb-4 text-[#64748B] text-left text-sm hover:text-green-500 duration-300 ">
                  <Mail size={16} /> Message Owner
                </button>
                <button className="flex items-center gap-2 w-full text-[#64748B] text-left text-sm hover:text-red-500 duration-300">
                  <CircleX size={16} /> Remove Owner
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedUser && (
        <div className="bg-white p-5 mb-6 rounded-2xl">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Profile Information</h2>
            <Button onClick={clearSelection} type="link" className="text-red-500">
            <CircleX />
            </Button>
          </div>
          <ProfileInformation
            personalInfo={personalInfo}
            addressInfo={addressInfo}
          />
        </div>
      )}

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
          dataSource={dummyData}
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
