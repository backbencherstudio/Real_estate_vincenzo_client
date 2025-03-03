import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../redux/fetures/auth/authSlice';
import authApi from '../../../redux/fetures/auth/authApi';
import { toast } from 'sonner';
import ownerApi from '../../../redux/fetures/owner/ownerApi';
import { Table, Tag } from 'antd';
import moment from 'moment';

const WithdrawForm = () => {
    const currentUser = useSelector(selectCurrentUser)
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const [message, setMessage] = useState('');

    const { data: userData, isLoading } = authApi.useGetSingleUserInfoQuery(
        currentUser?.email,
        {
            pollingInterval: 5000
        }
    );
    
    const [payout, { isLoading: isPayoutIsloadin }] = ownerApi.usePayoutMutation()
    const { data: payoutData, isLoading: payoutDataIsloading, refetch } = ownerApi.useGetPayoutDataBySingleOwnerQuery(currentUser.userId)

    useEffect(()=>{
        refetch()
    },[])

    

    const [pageSize, setPageSize] = useState(10);
    const handlePageSizeChange = (current, size) => {
        setPageSize(size);
    };

    const tableData = payoutData?.data?.map(({ _id, Receipt, accountId, amount, createdAt, ownerId, email, status, payoutId }) => ({
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
            dataIndex: "createdAt",
            render: (createdAt) => (
                <div>
                    {moment(createdAt).format("DD MMMM YYYY, h:mm A")}
                </div>
            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (status) => {
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
                    case 'Rejected':
                        color = 'red';
                        break;
                    default:
                        color = 'gray';
                }
                return (
                    <Tag color={color} className="px-3 py-1 rounded-md bg-opacity-20">
                        {status}
                    </Tag>


                );
            },
        },

    ];

    const onSubmit = async (data) => {
        setMessage('');

        if (!userData?.data?.paidAmount) {
            return toast.warning("Your Not abale to send withdraw request");                        
        }
        if (userData?.data?.paidAmount < parseInt(data?.amount)) {            
            return toast.warning("Insufficient balance. You cannot withdraw more than your available funds.");
        }
       
        const withdrowData = {
            ownerId: currentUser?.userId,
            amount: parseInt(data?.amount),
            email: currentUser?.email,
            accountId: userData?.data?.stripeAccountId
        }
        const res = await payout(withdrowData)
        if (res?.data?.success) {
            toast.success(res.data.message)
            reset()
        }
    };




    return (
        <div className='' >

            <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">

                <h2 className="text-xl font-bold mb-4">Withdraw Form </h2>
                <h2>Current Ballance <span className='font-bold text-green-600 text-[18px] ' >{userData?.data?.paidAmount}</span> </h2>
                {message && <p className="text-center text-red-500">{message}</p>}

                <form onSubmit={handleSubmit(onSubmit)}>
                    <label className="block mb-2">
                        Amount:
                        <input
                            type="number"
                            {...register('amount', { required: 'Amount is required', min: { value: 1, message: 'Minimum amount is 1' } })}
                            className="w-full p-2 border rounded-md"
                        />
                        {errors.amount && <span className="text-red-500">{errors.amount.message}</span>}
                    </label>

                    <label className="block mb-2">
                        Stripe Account ID:
                        <input
                            type="text"
                            placeholder={`${userData?.data?.stripeAccountId}`}
                            readOnly
                            {...register('accountId')}
                            className="w-full p-2 border rounded-md"
                        />
                        {errors.accountId && <span className="text-red-500">{errors.accountId.message}</span>}
                    </label>

                    <label className="block mb-2">
                        Email:
                        <input
                            type="email"
                            placeholder={`${currentUser?.email}`}
                            readOnly
                            {...register('email')}
                            className="w-full p-2 border rounded-md"
                        />
                        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                    </label>

                    <button
                        type="submit"
                        className={`w-full  text-white py-2 rounded-md mt-4 ${!userData?.data?.paidAmount || parseInt(userData?.data?.paidAmount) === 0 ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500"} `}
                        disabled={isPayoutIsloadin || !userData?.data?.paidAmount || parseInt(userData?.data?.paidAmount) === 0 }
                    >
                        {isPayoutIsloadin ? 'Processing...' : 'Withdraw'}
                    </button>
                </form>

            </div>

            <div className='mt-10 '>
                <Table
                    columns={columns}
                    dataSource={tableData}
                    scroll={{ x: 800 }}
                    loading={payoutDataIsloading || isLoading}
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

export default WithdrawForm;
