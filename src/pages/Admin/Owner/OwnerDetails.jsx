import ProfileInformation from '../../../components/TenantDetailsTabs/ProfileInformation';
import { useEffect, useState } from 'react';
import {  Table } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import adminApi from '../../../redux/fetures/admin/adminApi';
import { FaAngleRight } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../redux/fetures/auth/authSlice';

const OwnerDetails = () => {
    const [pageSize, setPageSize] = useState(10);
    // const [showMenu, setShowMenu] = useState(false);
    const { id } = useParams();
    const { data , isLoading, refetch} = adminApi.useGetSingleOwnerAllPropertiesWithOwnerInfoQuery(id)
    const navigate = useNavigate();
    const currentUser = useSelector(selectCurrentUser);

    const handleNavigate = (id) => {
        navigate(`/${currentUser?.role}/properties/${id}`);
    };

    useEffect(()=>{
        refetch()
    },[])

    const ownerData = data?.data.ownerData[0];
    const properties = data?.data.properties;

    // console.log("Hello from details",ownerData?.permanentAddress);
    // console.log(properties);

    const tableData = properties?.map(({
        propertyName,
        numberOfBookedUnits,
        numberOfUnits,
        totalRent,
        totalBookedRent,
        Description,
        _id,
    }) => ({
        key: _id,
        propertyName,
        numberOfBookedUnits,
        numberOfUnits,
        totalRent,
        totalBookedRent,
        Description,
    }));

    const columns = [
        {
            title: "SL",
            dataIndex: "sl",
            render: (text, record, index) => index + 1
        },
        {
            title: "Property Name",
            dataIndex: "propertyName",
        },
        {
            title: "Total Rent",
            dataIndex: "totalRent",
        },
        {
            title: "Total Booked Rent",
            dataIndex: "totalBookedRent",
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
            title: "Details",
            dataIndex: "details",
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




    const handlePageSizeChange = (current, size) => {
        setPageSize(size);
    };

    return (
        <div>
            <div className="mb-6 flex justify-between ">
                <div>
                    <h1 className="text-3xl font-bold">Owner</h1>
                    <p className="text-sm text-gray-500">User Management / Owner / OwnerDetails</p>
                </div>
                {/* <div className="relative">
                    <button
                        onClick={() => setShowMenu(!showMenu)}
                        className="p-2 hover:bg-gray-100 rounded-full"
                    >
                        <MoreVertical className="h-5 w-5 text-gray-600" />
                    </button>

                    {showMenu && (
                        <div className="absolute right-0 mt-2 w-48 p-6 bg-white rounded-md shadow-lg z-50">
                            <div className="py-1">
                                <button className="flex items-center gap-2 w-full mb-4 text-[#64748B] text-left text-sm hover:text-green-500 duration-300 ">
                                    <Mail size={16} /> Message Owner
                                </button>
                                <button className="flex items-center gap-2 w-full text-[#64748B] text-left text-sm hover:text-red-500 duration-300">
                                    <CircleX size={16} /> Remove Owner
                                </button>
                            </div>
                        </div>
                    )}
                </div> */}
            </div>
            <div className="">
                <ProfileInformation
                    personalInfo={ownerData}
                    addressInfo={ownerData?.permanentAddress}
                />
            </div>

            <div className="bg-white p-5 mt-10 rounded-2xl">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-xl font-semibold my-5">Property List</h1>
                    </div>
                    <div>
                        {/* <Select
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
                        /> */}
                    </div>
                </div>

                <Table
                    columns={columns}
                    dataSource={tableData}
                    loading={isLoading}
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

export default OwnerDetails;