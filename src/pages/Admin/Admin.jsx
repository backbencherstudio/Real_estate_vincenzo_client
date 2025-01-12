import { Select, Table } from "antd";
import DashboardChart from "../../components/AdminComponents/DashboardChart";
import { dashboardCounterObject } from "../../testJsonData/testJson";
import { useState } from "react";
import adminApi from "../../redux/fetures/admin/adminApi";
import { FaAngleRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { selectCurrentUser } from "../../redux/fetures/auth/authSlice";
import { useSelector } from "react-redux";


const AdminDashboard = () => {
  const [pageSize, setPageSize] = useState(10);
  const { data: propertyData } = adminApi.useGetAllPropertiesQuery();
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser); 

  const handleNavigate = (id) => {
    navigate(`/${currentUser?.role}/properties/${id}`);
  };

  const tableData = propertyData?.data?.map(({
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
      title: "SL",
      dataIndex: "sl",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Property Name",
      dataIndex: "propertyName",
    },
    {
      title: "Total Unit",
      dataIndex: "numberOfUnits",
    },
    {
      title: "Total Rent",
      dataIndex: "totalRent",
    },
    {
      title: "Description",
      dataIndex: "Description",
      render: (text) => {
        if (!text) return "-";
        const words = text.split(" ");
        const truncated = words.slice(0, 5).join(" ");
        return words.length > 5 ? `${truncated}...` : text;
      },
    },
    {
      title: "_id",
      dataIndex: "_id",
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


  const handlePageSizeChange = (current, size) => {
    setPageSize(size);
  };
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

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 ">
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
            <h1 className="clamp-text font-semibold my-5"> Recently Added Properties </h1>
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

export default AdminDashboard;
