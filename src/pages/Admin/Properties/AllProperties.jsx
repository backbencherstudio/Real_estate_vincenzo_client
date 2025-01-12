import { Select, Table } from "antd";
import { useState } from "react";
import adminApi from "../../../redux/fetures/admin/adminApi";
import { FaAngleRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/fetures/auth/authSlice";

const AllProperties = () => {
    const [pageSize, setPageSize] = useState(10);
    const { data: propertyData } = adminApi.useGetAllPropertiesQuery();

    const handlePageSizeChange = (current, size) => {
        setPageSize(size);
    };

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
            title: "Status",
            dataIndex: "status",
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

export default AllProperties;