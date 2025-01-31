
import { Button, Modal, Table, Tag } from 'antd';
import 'antd/dist/reset.css';
import { RiSettingsFill } from 'react-icons/ri';
import money from './../../assets/money.svg'
import tenantApi from '../../redux/fetures/tenant/tenantApi';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux/fetures/auth/authSlice';
import moment from 'moment';
import {  useState } from 'react';
import authApi from '../../redux/fetures/auth/authApi';
import { Elements } from '@stripe/react-stripe-js';
import StripeTenantForm from './StripeTenantForm';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  "pk_test_51NFvq6ArRmO7hNaVcPS5MwczdEtM4yEMOclovA0k5LtJTxhtzKZ2SKim3p8qmvssQ7j7bREjoRRmHB9Gvz8n8Dfm00UOo9bZYg"
);


function TenantDashboard() {
  const currentUser = useSelector(selectCurrentUser)
  const { data } = tenantApi.useGetSingleUserAllPaymentDataQuery(currentUser?.userId,  {
    pollingInterval: 15000,
  });
  const { data: userData } = authApi.useGetSingleUserInfoQuery(currentUser?.email);
  const [open, setOpen] = useState(false);
  const [paymentData, setPaymentData] = useState({})
  const [pageSize, setPageSize] = useState(10);
  const [successPaymentData, setSuccessPaymentData] = useState({});

  console.log(successPaymentData);
  console.log(data?.data)

  const handlePageSizeChange = (current, size) => {
    setPageSize(size);
  };

  const dueRent = data?.data
  ?.filter(item => item.status !== "Paid") 
  ?.map(item => item.unitId.rent); 

  const totalDueRent = dueRent?.reduce((acc, rent) => acc + rent, 0);

  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });


  const getDynamicDate = (year = new Date().getFullYear(), month = new Date().getMonth() + 1) => {
    return new Date(year, month - 2, 31).toLocaleDateString();
  };
  const totalAmount = paymentData?.rent

  const tableData = data?.data?.map(({ _id, invoice, propertyId, unitId, ownerId, userId, status, createdAt }) => ({
    key: _id,
    invoice,
    propertyId: propertyId._id,
    propertyName: propertyId?.propertyName,
    rent: unitId?.rent,
    lateFee: unitId?.lateFee,
    securityDeposit: unitId?.securityDeposit,
    ownerId,
    userId: userId._id,
    lastDate: getDynamicDate(),
    status,
    createdAt
  }));

  const handleModalFun = (data) => {
    setOpen(true)
    setPaymentData(data)
  }

  const downloadInvoice = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };


  const columns = [
    {
      title: 'Invoice', dataIndex: 'invoice',
      render: (text, record) => (
        <div>
          {record.invoice && record.invoice.startsWith("http") ? (
            <button
              onClick={() => downloadInvoice(record.invoice)}
              style={{
                background: "none",
                border: "none",
                color: "#2575fc",
                textDecoration: "none",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              📄 Download
            </button>
          ) : (
            "Upcoming"
          )}
        </div>
      )


    },
    {
      title: 'Property Name',
      dataIndex: 'propertyName',
    },
    { title: 'Rent', dataIndex: 'rent' },
    { title: 'Late Fee', dataIndex: 'lateFee' },
    { title: 'Last Date', dataIndex: "lastDate" },
    {
      title: 'Created Payment', dataIndex: "createdAt",
      render: (createdAt) => (
        <div>
          {moment(createdAt).format("M/D/YYYY")}
        </div>
      ),
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
          case 'Overdue':
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
    {
      title: "Pay",
      dataIndex: "",
      render: (text, record) => (
        <div>
          <Button disabled={record.status === "Paid"} type="primary" onClick={() => handleModalFun(record)}>
            Pay
          </Button>
        </div>
      ),
    },

  ];


  return (
    <div className="">
      {/* Header */}
      <div className="flex justify-between items-center mb-1">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
      </div>
      <div className=" mb-6">
        <div className="text-sm text-gray-500">
          Home / Dashboard
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="flex gap-4 items-baseline bg-white p-4 md:p-6 rounded-lg shadow-sm">
          <div className='flex justify-center items-center text-xl text-blue-500 w-10 h-10 bg-[#F9F9F9] rounded-full'>
            <img src={money} alt="" />
          </div>
          <div>
            <div className="text-3xl font-bold">${ totalDueRent || 0  }</div>
            <h2 className="text-gray-600 text-sm">Rent Due</h2>
            {/* <a href="#" className="text-blue-500 text-sm mt-2 inline-block">
              View Details
            </a> */}
          </div>
        </div>
        <div className="flex gap-4 items-baseline bg-white p-4 md:p-6 rounded-lg shadow-sm">
          <div className='flex justify-center items-center text-xl text-blue-500 w-10 h-10 bg-[#F9F9F9] rounded-full'>
            <RiSettingsFill />
          </div>
          <div>
            <div className="text-3xl font-bold">{ dueRent?.length | 0 }</div>
            <h2 className="text-gray-600 text-sm">Pending Payment</h2>
            {/* <a href="#" className="text-blue-500 text-sm mt-2 inline-block">
              View Details
            </a> */}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Recent Payments</h2>
          <div className="flex space-x-2">

            {/* All Dropdown */}
            {/* <div className="relative">
              <button
                className="flex items-center bg-gray-100 px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <span className="mr-2">All</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div> */}
            {/* This Month Dropdown */}
            {/* <div className="relative">
              <button
                className="flex items-center bg-gray-100 px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 8h14M5 12h14m-7 4h7"
                  />
                </svg>
                <span>This Month</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div> */}
            

          </div>
        </div>

        <div className="overflow-x-auto">
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
      {/* Footer */}
      <footer className="mt-8 text-center text-sm text-gray-500">
        &copy; 2024 Copyright - All rights reserved
      </footer>



      <Modal
        title="This Month Payment History"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
        footer={false}
        
      >

        <div>
          {
            !userData?.data?.isSecurityDepositPay && <h2> Security deposit must be pay, For the first time :: <span className='text-[18px] text-green-600 ' >{paymentData?.securityDeposit || 0}</span> $/= </h2>
          }
          <h2>current rent :: {paymentData?.rent} </h2>
          <h2>Late Fee :: {paymentData?.lateFee} </h2>
          <h2> Last date for payment :: {paymentData?.lastDate} </h2>
          <h2>current date :: {currentDate} </h2>
          <h2>If you crose the last payment data you must be pay with late payment :: {paymentData?.rent + paymentData?.lateFee} </h2>
        </div>

        <div>
          <Elements stripe={stripePromise}>
            <StripeTenantForm paymentData={paymentData} totalAmount={totalAmount} setOpen={setOpen} setSuccessPaymentData={setSuccessPaymentData} />
          </Elements>
        </div>





      </Modal>



    </div>
  );
}

export default TenantDashboard;
