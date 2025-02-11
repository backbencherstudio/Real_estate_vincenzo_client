import { Select, Table } from "antd";
import adminApi from "../../../redux/fetures/admin/adminApi";
import moment from "moment";
import { useState } from "react";
import { statusOptions } from "../../../constent/constent";


const PayOutData = () => {

    const { data } = adminApi.usePayoutDataGetByAdminQuery()
    const [pageSize, setPageSize] = useState(10);
    const handlePageSizeChange = (current, size) => {
        setPageSize(size);
    };

    const tableData = data?.data?.map(({ _id, Receipt, accountId, amount, createdAt, ownerId, email, status }) => ({
        key: _id,
        Receipt,
        accountId,
        amount,
        ownerId,
        email,
        status,
        createdAt,
    }));

    const openInvoice = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    

    const projectsInfoHandler = async (keyName, selectedStatus, id) => {
        const updatedData = {
            id,
            data: {
                keyName,
                selectedStatus
            }
        }
        console.log(updatedData);       
        
        // const res = await updateProjectsInFo(updatedData)
        // if (res?.data?.success) {
        //     toast.success(res?.data?.message)
        // }

    };

    const columns = [
        {
            title: 'Receipt',
            dataIndex: 'Receipt',
            render: (text, record) => (
                <div>
                    {record.Receipt && record.Receipt.startsWith("http") ? (
                        <button
                            onClick={() => openInvoice(record.Receipt)}
                            style={{
                                background: "none",
                                border: "none",
                                color: "#2575fc",
                                textDecoration: "none",
                                fontWeight: "bold",
                                cursor: "pointer",
                            }}
                        >
                            📄 View Receipt
                        </button>
                    ) : (
                        "Upcoming"
                    )}
                </div>
            )
        },
        {
            title: 'Account Id',
            dataIndex: 'accountId',
        },
        { title: 'Paid Amount', dataIndex: 'amount' },
        { title: 'Email', dataIndex: "email" },
        {
            title: "Payment Placed",
            dataIndex: "PaymentPlacedDate",
            render: (createdAt) => (
                <div>
                    {moment(createdAt).format("DD MMMM YYYY, h:mm A")}
                </div>
            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (status, record) => {
                let color;
                switch (status) {
                    case 'Paid':
                        color = 'green';
                        break;
                    case 'Pending':
                        color = 'orange';
                        break;
                    case 'Failed':
                        color = 'red';
                        break;
                    default:
                        color = 'gray';
                }
                return (
                    //   <Tag color={color} className="px-3 py-1 rounded-md bg-opacity-20">
                    //     {status}
                    //   </Tag>

                    <div className="">
                        <Select
                            color={color}
                            placeholder={status}
                            style={{ width: '180px', textAlign: 'center' }}
                            options={statusOptions}
                            onChange={(value) => projectsInfoHandler("status", value, record.key)}
                        />
                    </div>
                );
            },
        },

    ];


    return (
        <div>



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
    );
};

export default PayOutData;