import { Table, Avatar } from "antd";
import { useState } from "react";

function CustomTable() {
  const [columns] = useState([
    {
      title: "SL",
      dataIndex: "sl",
      key: "sl",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar style={{ marginRight: 8 }} />
          {text}
        </div>
      ),
    },
    {
      title: "Property Name",
      dataIndex: "propertyName",
      key: "propertyName",
      render: (text) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar
            shape="square"
            size="small"
            src="https://via.placeholder.com/32" // Replace with an actual image URL
            style={{ marginRight: 8 }}
          />
          {text}
        </div>
      ),
    },
    {
      title: "Unit",
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: "Current Rent",
      dataIndex: "currentRent",
      key: "currentRent",
    },
    {
      title: "Contact No",
      dataIndex: "contactNo",
      key: "contactNo",
    },
    {
      title: "Details",
      key: "details",
      render: () => (
        <a href="#" style={{ color: "#1890ff" }}>
          Details →
        </a>
      ),
    },
  ]);

  const [dataSource] = useState([
    {
      key: 1,
      sl: "01",
      name: "Broklin Simon",
      propertyName: "Green Wan",
      unit: "5A",
      currentRent: "$2,311.55",
      contactNo: "123 456 789",
    },
    {
      key: 2,
      sl: "02",
      name: "Broklin Simon",
      propertyName: "Green Wan",
      unit: "5A",
      currentRent: "$2,311.55",
      contactNo: "123 456 789",
    },
    {
      key: 3,
      sl: "03",
      name: "Broklin Simon",
      propertyName: "Green Wan",
      unit: "5A",
      currentRent: "$2,311.55",
      contactNo: "123 456 789",
    },
    {
      key: 4,
      sl: "04",
      name: "Broklin Simon",
      propertyName: "Green Wan",
      unit: "5A",
      currentRent: "$2,311.55",
      contactNo: "123 456 789",
    },
    {
      key: 5,
      sl: "05",
      name: "Broklin Simon",
      propertyName: "Green Wan",
      unit: "5A",
      currentRent: "$2,311.55",
      contactNo: "123 456 789",
    },
    {
      key: 6,
      sl: "06",
      name: "Broklin Simon",
      propertyName: "Green Wan",
      unit: "5A",
      currentRent: "$2,311.55",
      contactNo: "123 456 789",
    },
  ]);

  return(
<div className="w-[1300px] mx-auto">
<Table columns={columns} dataSource={dataSource} />;
</div>
  )
}

export default CustomTable;
