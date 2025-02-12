import { Select, Table } from "antd";
import adminApi from "../../../redux/fetures/admin/adminApi";
import moment from "moment";
import { useEffect, useState } from "react";
import { statusOptions } from "../../../constent/constent";
import { toast } from "sonner";


const PayOutData = () => {

    const { data, refetch, isLoading } = adminApi.usePayoutDataGetByAdminQuery();
    const [sendPayoutRequestByAdmin, {isLoading : payoutIsLoading}] = adminApi.useSendPayoutRequestByAdminMutation();
    const [pageSize, setPageSize] = useState(10);
    const handlePageSizeChange = (current, size) => {
        setPageSize(size);
    };

    useEffect(() => {
        refetch();
    }, []);

    const tableData = data?.data?.map(({ _id, Receipt, accountId, amount, createdAt, ownerId, email, status, payoutId }) => ({
        key: _id,
        Receipt,
        accountId,
        amount,
        ownerId,
        email,
        status,
        createdAt,
        payoutId
    }));

    const openInvoice = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };


    const payoutHandler = async (selectedStatus, record) => {
        const updatedData = {
            record,
            selectedStatus
        };        
        const res = await sendPayoutRequestByAdmin(updatedData);

        console.log(res);
        

        if (res?.data?.success) {
            toast.success(res?.data?.message);
        } 
    };


    const columns = [
        {
            title: "SL",
            dataIndex: "sl",
            render: (text, record, index) => index + 1,
        },
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
        {
            title: 'Payout Id',
            dataIndex: 'payoutId',
            render : (text, record)=>(
                <div> 
                    {
                        record.payoutId ? (
                            <div>
                                <h2>{ record.payoutId }</h2>
                            </div>
                        ) : ( "N/F" )
                    }
                     </div>
            )
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
                return (
                    <div className="">
                        <Select
                            placeholder={status}
                            disabled={status === "On Progress"}
                            style={{ width: '180px', textAlign: 'center' }}
                            options={statusOptions}
                            onChange={(value) => payoutHandler(value, record)}
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
                isLoading={isLoading || payoutIsLoading}
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