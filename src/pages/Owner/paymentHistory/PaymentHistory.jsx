
import { Select, Table } from "antd";
import { useEffect, useState } from "react";
import ownerApi from "../../../redux/fetures/owner/ownerApi";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/fetures/auth/authSlice";
import moment from "moment";
import { statusOptionsForPaymentHistory } from "../../../constent/constent";
import { toast } from "sonner";


const PaymentHistory = () => {
    const currentUser = useSelector(selectCurrentUser)

  

    const { data, isLoading, refetch } = ownerApi.useGetSingleOwnerPaymentHistoryQuery(currentUser?.email)
    const [changePaymentHistoryStatus, { isLoading: statusChangeIsLoading }] = ownerApi.useChangePaymentHistoryStatusMutation()
    const [pageSize, setPageSize] = useState(10);

    useEffect(()=>{
        refetch()
    },[])

    const handlePageSizeChange = (current, size) => {
        setPageSize(size);
    };

    const paymentHistoryHandler = async (selectedStatus, record) => {
        const updatedData = {
            id: record?.key,
            status: selectedStatus
        };
        const res = await changePaymentHistoryStatus(updatedData);
        if (res?.data?.success) {
            toast.success(res?.data?.message);
        }
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
        createdAt
    }) => ({
        key: _id,
        name,
        email,
        transactionId,
        amount,
        mainBalance,
        percentage,
        status,
        createdAt
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
            title: "Transfer Placed",
            dataIndex: "createdAt",
            render: (createdAt) => (
                <div>
                    {moment(createdAt).format("DD MMMM YYYY, h:mm A")}
                </div>
            )
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
            title: "Current Amount",
            dataIndex: "amount",
            render: (amount) => (
                <div>
                    <h2 className='font-bold text-green-700 text-[16px]'>{amount} $</h2>
                </div>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (status, record) => {
                return (
                    <div className="">
                        <Select
                            placeholder={status}
                            // disabled={status !== "Pending"}
                            disabled={status === "Received"}
                            style={{ width: '180px', textAlign: 'center' }}
                            options={statusOptionsForPaymentHistory}
                            onChange={(value) => paymentHistoryHandler(value, record)}
                        />
                    </div>
                );
            },
        },
    ];

  


    return (
        <div>
            <h2>Payment History</h2>
            


            <Table
                columns={columns}
                dataSource={tableData}
                loading={isLoading || statusChangeIsLoading}
                scroll={{ x: 1000 }}
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