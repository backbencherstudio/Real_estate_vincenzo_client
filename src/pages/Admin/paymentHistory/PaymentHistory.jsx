
import { Table } from "antd";
import adminApi from "../../../redux/fetures/admin/adminApi";
import { useEffect, useState } from "react";


const PaymentHistory = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const query = { searchTerm }
    const { data, isLoading, refetch } = adminApi.useGetPaymentHistoryQuery(query)
    const [pageSize, setPageSize] = useState(10);

    useEffect(()=>{
        refetch()
    },[])

    const handlePageSizeChange = (current, size) => {
        setPageSize(size);
    };

    const tableData = data?.data?.map(({
        name,
        email,
        transactionId,
        amount,
        mainBalance,
        percentage,
        status,
        _id,
    }) => ({
        key: _id,
        name,
        email,
        transactionId,
        amount,
        mainBalance,
        percentage,
        status
    }));

    const columns = [
        {
            title: "SL",
            dataIndex: "sl",
            render: (text, record, index) => index + 1
        },
        {
            title: "Owner Name",
            dataIndex: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Transaction ID",
            dataIndex: "transactionId",
        },
        {
            title: "Main Balance",
            dataIndex: "mainBalance",
            render: (mainBalance) => (
                <div>
                    <h2 className='font-bold text-blue-700 text-[16px]'>{mainBalance} $</h2>
                </div>
            ),
        },
        {
            title: "Fee",
            dataIndex: "percentage",
            render: (percentage) => (
                <div>
                    <h2 className='font-bold text-yellow-600 text-[16px]'>{percentage} %</h2>
                </div>
            ),
        },
        {
            title: "Amount",
            dataIndex: "amount",
            render: (amount) => (
                <div>
                    <h2 className='font-bold text-green-700 text-[16px]'>{amount} $</h2>
                </div>
            ),
        },
        {
            title: "Status",
            dataIndex: "status",
            render: (status) => (
                <div>
                    <h2 className={`font-bold text-[16px] ${status === "Send" ? "text-red-600" : "text-green-600"}`}>
                        {status}
                    </h2>
                </div>
            ),
        }
    ];

    const searchHandlear = (value) => {
        setSearchTerm(value)
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6 " >
                <h2>Payment History</h2>
                {
                    <input onChange={(e) => searchHandlear(e.target.value)} type="text" placeholder='search by name/email/status' className='border p-2 rounded-lg mr-2 w-[200px]' />
                }
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
    );
};

export default PaymentHistory;