import { Select, Table } from "antd";


const CustomTable = ({ title, columns, data }) => {
  const handleRowClick = (record) => {
    console.log("Row clicked:", record);
    alert(`Row clicked! Name: ${record.name}, Age: ${record.age}`);
  };
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };
  return (
    <div className="bg-white p-5 mt-10 rounded-2xl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="clamp-text font-semibold my-5">{title}</h1>
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
