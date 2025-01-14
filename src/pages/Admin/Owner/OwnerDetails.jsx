import ProfileInformation from '../../../components/TenantDetailsTabs/ProfileInformation';
import { useState } from 'react';
import { Select, Table, Tag } from 'antd';
import { dummyData } from '../../../testJson/testJson';
import { CircleX, Mail, MoreVertical } from 'lucide-react';
import { useParams } from 'react-router-dom';
import adminApi from '../../../redux/fetures/admin/adminApi';

const OwnerDetails = () => {
    const [pageSize, setPageSize] = useState(10);
    const [showMenu, setShowMenu] = useState(false);

    const { id } = useParams();

    const { data } = adminApi.useGetSingleOwnerAllPropertiesWithOwnerInfoQuery(id)

    const ownerData = data?.data.ownerData[0];
    const properties = data?.data.properties;

    console.log(ownerData);
    console.log(properties);
    



    const handlePageSizeChange = (current, size) => {
        setPageSize(size);
    };

    const personalInfo = {
        name: 'Christopher',
        email: 'Chrispher@gmail.com',
        contact: '+111 582 654 963',
        age: '36',
        familyMember: '6',
        job: 'Designer'
    };

    const addressInfo = {
        address: 'Staten Island, NY 10314, USA',
        city: 'New York',
        state: 'Manhattan',
        zipCode: '1216',
        country: 'United State'
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
            <div className="mb-6 flex justify-between ">
                <div>
                    <h1 className="text-3xl font-bold">Owner</h1>
                    <p className="text-sm text-gray-500">User Management / Owner / OwnerDetails</p>
                </div>
                <div className="relative">
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
                </div>
            </div>
            <div className="">
                <ProfileInformation
                    personalInfo={personalInfo}
                    addressInfo={addressInfo}
                />
            </div>

            <div className="bg-white p-5 mt-10 rounded-2xl">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-xl font-semibold my-5">Property List</h1>
                    </div>
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

export default OwnerDetails;