import { Select, Table, Tag } from "antd";
import DashboardChart from "../../components/AdminComponents/DashboardChart";
import { dashboardCounterObject } from "../../testJsonData/testJson";

const AdminDashboard = () => {

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


  const data = [
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
          dataSource={data}
          scroll={{ x: 800 }}
        />
      </div>




    </div>
  );
};

export default AdminDashboard;
