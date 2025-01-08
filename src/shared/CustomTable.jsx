import { Table } from "antd";

const CustomTable = ({ title, columns, data, rowKey = "key" }) => {
  const handleRowClick = (record) => {
    console.log("Row clicked:", record);
    alert(`Row clicked! Name: ${record.name}, Age: ${record.age}`);
  };
  return (
    <div className="bg-white p-5 mt-10 rounded-2xl">
      <div>
        <h1 className="clamp-text font-semibold my-5">{title}</h1>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        scroll={{ x: 800 }}
        onRow={(record) => {
          return {
            onClick: () => handleRowClick(record),
          };
        }}
      />
    </div>
  );
};

export default CustomTable;
