import { useState } from 'react';
import { Select, Table } from 'antd';
import adminApi from '../../../redux/fetures/admin/adminApi';
import { FaAngleRight } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../redux/fetures/auth/authSlice';
const AllTenant = () => {
    const [pageSize, setPageSize] = useState(10);
    const { data } = adminApi.useGetAllTenantsQuery();
    
    const navigate = useNavigate();
    const currentUser = useSelector(selectCurrentUser);

    const tableData = data?.data?.map(({
        createdAt,
        ownerId,
        propertyId,
        unitId,
        updatedAt,
        userId,
        _id,
    }) => ({
        key: _id,
        createdAt,
        updatedAt,
        ownerId,
        propertyName: propertyId?.propertyName || "N/A",
        totalRent: propertyId?.totalRent || "N/A",
        unitNumber: unitId?.unitNumber || "N/A",
        tenantName: userId?.name || "N/A",
        address: userId?.permanentAddress?.address
            ? `${userId?.permanentAddress?.address}, ${userId?.permanentAddress?.city || "N/A"}`
            : "N/A",
        tenantEmail: userId?.email || "N/A",
    }));

    const handlePageSizeChange = (current, size) => {
        setPageSize(size);
    };

    const handleNavigate = (id) => {
        navigate(`/${currentUser?.role}/tenant/${id}`);
    };

    const columns = [
        {
            title: "SL",
            dataIndex: "sl",
            render: (text, record, index) => index + 1
        },
        {
            title: "Name",
            dataIndex: "tenantName",
        },
        {
            title: "Email",
            dataIndex: "tenantEmail",
        },
        {
            title: "Property Name",
            dataIndex: "propertyName",
        },
        {
            title: "Unit",
            dataIndex: "unitNumber",
        },
        {
            title: "Rent",
            dataIndex: "totalRent",
        },
        {
            title: "Address",
            dataIndex: "address",
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
                        Details  <FaAngleRight className="text-[18px] ml-1" />
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
            <div className=" mb-6">
                <div>
                    <h1 className='text-3xl font-bold'>Tenants</h1>
                    <p className="text-sm text-gray-500">User Management / Tenant </p>
                </div>
            </div>
            <div className="bg-white p-5 mt-10 rounded-2xl">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-xl font-semibold my-5"> Tenents List </h1>
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

export default AllTenant;