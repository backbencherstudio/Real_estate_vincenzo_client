import { Select, Table, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ownerApi from "../../../redux/fetures/owner/ownerApi";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/fetures/auth/authSlice";

const Maintenance = () => {
  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState(10);

  const currentUser = useSelector(selectCurrentUser)

  const {data} = ownerApi.useGetMaintenanceDataQuery(currentUser?.userId)

  console.log(data?.data);

  const tableData = data?.data?.map(({
    propertyName,
    unitNo,
    issueType,
    status,
    createdAt,
    description,
    _id,
  }) => ({
    key: _id,
    propertyName,
    unitNo,
    issueType,
    status,
    createdAt,
    description
  }));



  const handlePageSizeChange = (current, size) => {
    setPageSize(size);
  };

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };

  const columns = [
    {
      title : "SL",
      dataIndex : "sl",
      render : (text, record, index ) => index + 1
    },
    {
      title: "Property Name",
      dataIndex: "propertyName",
    },
    {
      title: "Unit No",
      dataIndex: "unitNo",
    },
    {
      title: "Issue Type",
      dataIndex: "issueType",
    },

    {
      title: "Description",
      dataIndex: "description",
      render: (text) => {
        if (!text) return "-";
        const words = text.split(" ");
        const truncated = words.slice(0, 5).join(" ");
        return words.length > 5 ? `${truncated}...` : text;
      },
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



// handleClick={handleAddMaintenance}

  ];
  

  const handleAddMaintenance = () => {
    navigate("addMaintenance");
  };


  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-manrope text-2xl font-bold leading-[48px] tracking-[-0.03em] text-left">
            Maintenance
          </h2>
          <span>
            <p className="text-[#64748B] text-[14px] ">
              {" "}
              <span className="opacity-60">Home /</span>Maintenance
            </p>
          </span>
        </div>


      </div>
      <div className="bg-white p-5 mt-10 rounded-2xl">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="clamp-text font-semibold my-5">
              {" "}
              Recently Added Maintenance{" "}
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

export default Maintenance;
