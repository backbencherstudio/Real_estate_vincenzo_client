import  { useState } from 'react';
import { dummyData } from '../../testJson/testJson';
import { Select, Table, Tag } from 'antd';

const PaymentHistory = () => {
    const [pageSize, setPageSize] = useState(10);

    const handlePageSizeChange = (current, size) => {
        setPageSize(size);
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
    ];
    const onChange = (value) => {
        console.log(`selected ${value}`);
      };
    
      const onSearch = (value) => {
        console.log("search:", value);
      };
    
    return (
        <div>
            <div className="bg-white p-5 mt-10 rounded-2xl">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className=" text-lg font-semibold my-5"> Payment History </h1>
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

export default PaymentHistory;