import { Tag } from "antd";
import CustomTable from "../../../shared/CustomTable";
import CustomButton from "../../../shared/CustomButton";
import { BiPlus } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Tenants = () => {
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
  const handleAddTenants = () => {
    navigate("addTenants");
  };
  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-manrope text-2xl font-bold leading-[48px] tracking-[-0.03em] text-left">
            Tenants
          </h2>
          <span>
            <p className="text-[#64748B] text-[14px] ">
              {" "}
              <span className="opacity-60">Home /</span> My Tenants
            </p>
          </span>
        </div>
        <CustomButton
          handleClick={handleAddTenants}
          content={
            <div className="flex items-center  gap-1">
              {"Add Tenants"} <BiPlus size={16} />{" "}
            </div>
          }
        />
      </div>
      <CustomTable
        title={"Recently Added Tenants"}
        columns={columns}
        data={data}
      />
    </div>
  );
};

export default Tenants;
