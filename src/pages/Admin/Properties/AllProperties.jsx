import { Select, Table, Tag } from "antd";
import { data } from "../../../testJson/testJson";
import { useState } from "react";

const AllProperties = () => {

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

            <div>
                <h2 className="font-manrope text-2xl font-bold leading-[48px] tracking-[-0.03em] text-left">
                    Properties
                </h2>
                <span>
                    <p className="text-[#64748B] text-[14px] ">
                        {" "}
                        <span className="opacity-60">Home /</span> All Properties
                    </p>
                </span>
            </div>

            <div className="bg-white p-5 mt-10 rounded-2xl">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="clamp-text font-semibold my-5"> Property List </h1>
                    </div>{" "}
                    <div>
                        <Select
                            showSearch
                            placeholder="This Month"
                            optionFilterProp="label"
                            onChange={onChange}
                            onSearch={onSearch}
                            options={[
                                {
                                    value: "january",
                                    label: "January",
                                },
                                {
                                    value: "february",
                                    label: "February",
                                },
                                {
                                    value: "march",
                                    label: "March",
                                },
                                {
                                    value: "april",
                                    label: "April",
                                },
                                {
                                    value: "may",
                                    label: "May",
                                },
                                {
                                    value: "june",
                                    label: "June",
                                },
                                {
                                    value: "july",
                                    label: "July",
                                },
                                {
                                    value: "august",
                                    label: "August",
                                },
                                {
                                    value: "september",
                                    label: "September",
                                },
                                {
                                    value: "october",
                                    label: "October",
                                },
                                {
                                    value: "november",
                                    label: "November",
                                },
                                {
                                    value: "december",
                                    label: "December",
                                },
                            ]}
                        />
                    </div>
                </div>

                <Table
                    columns={columns}
                    dataSource={data}
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

export default AllProperties;