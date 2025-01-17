import { Select, Table, Tag } from "antd";
import DashboardChart from "../../components/AdminComponents/DashboardChart";
import { dashboardCounterObject } from "../../testJsonData/testJson";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/fetures/auth/authSlice";
import ownerApi from "../../redux/fetures/owner/ownerApi";

const OwnerDashboard = () => {
  const [pageSize, setPageSize] = useState(10);

  const handlePageSizeChange = (current, size) => {
    setPageSize(size);
  };
  
  const currentUser = useSelector(selectCurrentUser);

  // =============================>>>>>>>>  this API not for this page this is for this route http://localhost:5173/owner/properties
  const { data } = ownerApi.useGetSingleOwnerAllPropertiesQuery(currentUser?.userId);

  console.log(data?.data);
  

  const tableData = data?.data?.map(({
    Description,
    amenities,
    availableParking,
    createdAt,
    houseNumber,
    maintainerName,
    numberOfUnits,
    ownerId,
    propertyImages,
    propertyLocation,
    propertyName,
    totalRent,
    updatedAt,
    _id,
  }) => ({
    key: _id,
    Description,
    amenities,
    availableParking,
    createdAt,
    houseNumber,
    maintainerName,
    numberOfUnits,
    ownerId,
    propertyImages,
    propertyLocation,
    propertyName,
    totalRent,
    updatedAt,
  }));



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
  ];
  const data2 = [
    {
      key: 1,
      name: `Edward King `,
      age: 32,
      address: `London, Park Lane no. `,
      status: "pending",
    },
    {
      key: 1,
      name: `Edward King `,
      age: 32,
      address: `London, Park Lane no. `,
      status: "cancel",
    },
    {
      key: 1,
      name: `Edward King `,
      age: 32,
      address: `London, Park Lane no. `,
      status: "complete",
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
      <div>
        <h2 className="font-manrope text-2xl font-bold leading-[48px] tracking-[-0.03em] text-left">
          Dashboard
        </h2>
        <span>
          <p className="text-[#64748B] text-[14px] ">
            {" "}
            <span className="opacity-60">Home /</span> Dashboard
          </p>
        </span>
      </div>

      <div className="mt-8 grid grid-cols-4 gap-10 ">
        {dashboardCounterObject?.map((item) => (
          <div className="bg-[#FFFFFF] p-5 rounded-lg " key={item._id}>
            <h2 className="text-[#64748B] font-semibold text-[14px] ">
              {item.title}
            </h2>
            <h2 className="text-[#1C2434] font-semibold text-[24px] py-4 ">
              {item.count}
            </h2>
            <button className="text-[#4A90E2]">View List</button>
          </div>
        ))}
      </div>

      <div>
        <DashboardChart />
      </div>
      <div className="bg-white p-5 mt-10 rounded-2xl">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="clamp-text font-semibold my-5">
              {" "}
              Recent Payments{" "}
            </h1>
          </div>{" "}
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
          dataSource={data2}
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

export default OwnerDashboard;
