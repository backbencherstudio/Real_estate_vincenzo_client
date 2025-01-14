import  { useState } from 'react';
import { Select, Table, Tag, Button } from 'antd';
import { dummyData } from '../../../testJson/testJson';

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
