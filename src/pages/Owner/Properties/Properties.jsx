import { Tag } from "antd";
import DashboardChart from "../../../components/AdminComponents/DashboardChart";
import CustomTable from "../../../shared/CustomTable";
import { dashboardCounterObject } from "../../../testJsonData/testJson";
import CustomButton from "../../../shared/CustomButton";
import { BiPlus } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Properties = () => {
  const navigate = useNavigate();
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
  const handleAddProperties = () => {
    navigate("addProperties");
  };
  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-manrope text-2xl font-bold leading-[48px] tracking-[-0.03em] text-left">
            Properties
          </h2>
          <span>
            <p className="text-[#64748B] text-[14px] ">
              {" "}
              <span className="opacity-60">Home /</span> My Properties
            </p>
          </span>
        </div>
        <CustomButton
          handleClick={handleAddProperties}
          content={
            <div className="flex items-center  gap-1">
              {"Add Properties"} <BiPlus size={16} />{" "}
            </div>
          }
        />
      </div>
      <CustomTable
        title={"Recently Added Properties"}
        columns={columns}
        data={data}
      />
    </div>
  );
};

export default Properties;
