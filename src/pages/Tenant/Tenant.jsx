import { Button, Modal, Table, Tag } from 'antd';
import 'antd/dist/reset.css';
import { RiSettingsFill } from 'react-icons/ri';
import money from './../../assets/money.svg'
import tenantApi from '../../redux/fetures/tenant/tenantApi';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux/fetures/auth/authSlice';
import moment from 'moment';
import { useState } from 'react';
import authApi from '../../redux/fetures/auth/authApi';
import { Elements } from '@stripe/react-stripe-js';
import StripeTenantForm from './StripeTenantForm';
import { loadStripe } from '@stripe/stripe-js';
import { message } from 'antd';

const stripePromise = loadStripe(
  "pk_test_51NFvq6ArRmO7hNaVcPS5MwczdEtM4yEMOclovA0k5LtJTxhtzKZ2SKim3p8qmvssQ7j7bREjoRRmHB9Gvz8n8Dfm00UOo9bZYg"
);


function TenantDashboard() {
  const currentUser = useSelector(selectCurrentUser)
  const { data } = tenantApi.useGetSingleUserAllPaymentDataQuery(currentUser?.userId, {
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
    return new Date(year, month -1 , 5).toLocaleDateString();
  };

  // Calculate if payment is late and determine total amount
  const isPaymentLate = (lastDate) => {
    const dueDate = new Date(lastDate);
    const today = new Date();
    return today > dueDate;
  };

  const calculateTotalAmount = (rent, lateFee, lastDate) => {
    return isPaymentLate(lastDate) ? rent + lateFee : rent;
  };

  const totalAmount = calculateTotalAmount(paymentData?.rent, paymentData?.lateFee, paymentData?.lastDate);

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

  const openInvoice = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const columns = [
    {
      title: 'Invoice', 
      dataIndex: 'invoice',
      render: (text, record) => (
        <div>
          {record.invoice && record.invoice.startsWith("http") ? (
            <button
              onClick={() => openInvoice(record.invoice)}
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
            <div className="text-3xl font-bold">${totalDueRent || 0}</div>
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
            <div className="text-3xl font-bold">{dueRent?.length | 0}</div>
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
        title="Monthly Rent Payment"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
        footer={false}

      >

        <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-8 p-6 rounded-lg shadow-sm'>
          <div className='w-full space-y-4'>
            {
              !userData?.data?.isSecurityDepositPay && (
                <div className="px-4 py-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h2 className="text-lg font-medium text-yellow-800">
                    Security Deposit Required:
                    <span className=" ml-2 font-bold text-green-600">
                      ${paymentData?.securityDeposit || 0}
                    </span>
                  </h2>
                  {/* <p className="mt-1 text-sm text-yellow-600">This is a one-time payment required for new tenants</p> */}
                </div>
              )
            }

            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 bg-white rounded-md shadow-sm">
                <span className="text-gray-600">Current Rent</span>
                <span className="text-lg font-semibold">${paymentData?.rent}</span>
              </div>

           
                <div className="flex justify-between items-center p-2 bg-white rounded-md shadow-sm">
                  <span className="text-gray-600">Late Fee (Applied)</span>
                  <span className="text-lg font-semibold text-red-600">${paymentData?.lateFee}</span>
                </div>

              <div className="flex justify-between items-center p-2 bg-white rounded-md shadow-sm">
                <span className="text-gray-600">Total Amount Due</span>
                <span className="text-lg font-bold">${totalAmount}</span>
              </div>

              <div className="flex justify-between items-center p-2 bg-white rounded-md shadow-sm">
                <span className="text-gray-600">Payment Due Date</span>
                <span className="text-lg font-semibold">{paymentData?.lastDate}</span>
              </div>

              <div className="flex justify-between items-center p-2 bg-white rounded-md shadow-sm">
                <span className="text-gray-600">Current Date</span>
                <span className="text-lg font-semibold">{currentDate}</span>
              </div>

              <div className="px-4 pt-2  bg-red-50 border border-red-200 rounded-lg mt-4">
                <p className="text-red-800">
                  <span className="font-medium">Late Payment Notice: </span>
                  If payment is made after the due date, total amount will be:
                  <span className="font-bold ml-2">
                    ${paymentData?.rent + paymentData?.lateFee}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className='w-full rounded-lg shadow-sm'>
            <Elements stripe={stripePromise}>
              <StripeTenantForm paymentData={paymentData} totalAmount={totalAmount} setOpen={setOpen} setSuccessPaymentData={setSuccessPaymentData} />
            </Elements>
          </div>
        </div>





      </Modal>



    </div>
  );
}

export default TenantDashboard;
