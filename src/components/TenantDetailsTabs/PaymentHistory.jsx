/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Modal, Table, Tag } from 'antd';
import tenantApi from '../../redux/fetures/tenant/tenantApi';
import moment from 'moment';
import { getDynamicDate } from '../../utils/getDynamicDate';
import { selectCurrentUser } from '../../redux/fetures/auth/authSlice';
import { useSelector } from 'react-redux';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CashPay from '../../pages/Owner/payment/CashPay';
import authApi from '../../redux/fetures/auth/authApi';

const stripePromise = loadStripe(
  "pk_test_51Qj3DaLdWMYlebBQOl4ldkQkxLqx7lOVk1fNuTxq7j48MCK8Hfp8iS0xGgOTJD57aYiETTMXmEGbSVHGav8D6cyW00ZlYe2LyG"
); // client

const PaymentHistory = ({ id, tenantData }) => {
  const { data, isLoading } = tenantApi.useGetSingleUserAllPaymentDataQuery(id, {
    pollingInterval: 15000,
  });

  const [open, setOpen] = useState(false);
  const [paymentData, setPaymentData] = useState({});
  const userData = tenantData?.userId;

  const [pageSize, setPageSize] = useState(10);
  const currentUser = useSelector(selectCurrentUser);
  const { data: ownerData } = authApi.useGetSingleUserInfoQuery(currentUser?.email);

  const percentage = ownerData?.data?.percentage;


  const handlePageSizeChange = (current, size) => {
    setPageSize(size);
  };

  const tableData = data?.data?.map(({ _id, invoice, propertyId, unitId, ownerId, status, createdAt, PaymentPlaced, lateFee, paidAmount }) => ({
    key: _id,
    invoice,
    propertyId: propertyId._id,
    propertyName: propertyId?.propertyName,
    rent: unitId?.rent,
    // lateFee: unitId?.lateFee,
    lastDate: getDynamicDate(),
    lateFee: lateFee !== 0 ? unitId?.lateFee : 0,
    securityDeposit: unitId?.securityDeposit,
    ownerId,
    status,
    createdAt,
    PaymentPlacedDate: PaymentPlaced,
    paidAmount: paidAmount || 0
  }));

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
    { title: 'Paid Amount', dataIndex: 'paidAmount' },
    { title: 'Last Date', dataIndex: "lastDate" },
    {
      title: "Payment Placed",
      dataIndex: "PaymentPlacedDate",
      render: (PaymentPlacedDate) => (
        <div>
          {PaymentPlacedDate
            ? moment(PaymentPlacedDate).format("DD MMMM YYYY, h:mm A")
            : "N/F"}
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

  ];

  if (currentUser?.role === "owner") {
    columns.push({
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div>
          {record.status === "Pending" ? (
            <button onClick={() => handleModalFun(record)} className="text-[#26861d] flex items-center cursor-pointer font-semibold">
              Cash Pay
            </button>
          ) : (
            <span className="text-gray-500">--</span>
          )}
        </div>
      ),
    });
  }


  const isPaymentLate = (lastDate) => {
    const dueDate = new Date(lastDate);
    const today = new Date();
    return today > dueDate;
  };


  const calculateTotalAmount = (rent, lateFee, lastDate) => {
    if (isPaymentLate(lastDate)) {
      return {
        lateFee: lateFee,
        total: rent + lateFee,
      };
    }
    return {
      lateFee: 0,
      total: rent,
    };
  };

  const totalAmount = calculateTotalAmount(
    paymentData?.rent,
    paymentData?.lateFee,
    paymentData?.lastDate
  );

  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });

  const handleModalFun = (data) => {
    setOpen(true);
    setPaymentData(data);
  };

  const securityDeposit =
    (!userData?.data?.isSecurityDepositPay && paymentData?.securityDeposit) ||
    0;

  return (
    <div>
      <div className="bg-white p-5 mt-10 rounded-2xl">
        <div className="flex justify-between items-center">
          <div>
            <h1 className=" text-lg font-semibold my-5"> Payment History </h1>
          </div>{" "}
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


      <Modal
        title="Monthly Rent Payment"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
        footer={false}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 justify-between items-start md:items-center gap-8 p-6 rounded-lg shadow-sm">
          <div className="w-full space-y-4">
            {/* {!userData?.data?.isSecurityDepositPay && (
              <div className="px-4 py-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h2 className="text-lg font-medium text-yellow-800">
                  Security Deposit Required :
                  <span className=" ml-2 font-bold text-green-600">
                    ${paymentData?.securityDeposit || 0}
                  </span>
                  <h2 className="text-[11px] font-bold -mt-1 ">
                    ( For The First Time )
                  </h2>
                </h2>

              </div>
            )} */}

            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 bg-white rounded-md shadow-sm">
                <span className="text-gray-600">Current Rent</span>
                <span className="text-lg font-semibold">
                  ${paymentData?.rent}
                </span>
              </div>

              <div className="flex justify-between items-center p-2 bg-white rounded-md shadow-sm">
                <span className="text-gray-600">Late Fee (Applied)</span>
                <span className="text-lg font-semibold text-red-600">
                  ${paymentData?.lateFee}
                </span>
              </div>

              <div className="flex justify-between items-center p-2 bg-white rounded-md shadow-sm">
                <span className="text-gray-600">Total Amount Due</span>
                <span className="text-lg font-bold">${totalAmount.total}</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-white rounded-md shadow-sm">
                <span className="text-gray-600">Fee</span>
                <span className="text-lg font-bold">${percentage}%</span>
              </div>

              <div className="flex justify-between items-center p-2 bg-white rounded-md shadow-sm">
                <span className="text-gray-600">Fee Amount</span>
                <span className="text-md font-bold text-red-500">
                  -{(totalAmount.total * (percentage / 100)).toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between items-center p-2 bg-white rounded-md shadow-sm">
                <span className="text-gray-600">Payment Due Date</span>
                <span className="text-lg font-semibold">
                  {paymentData?.lastDate}
                </span>
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
          {/* =====================       Cash Pay     ============================== */}
          <div className="w-full rounded-lg ">
            <div>
              <Elements stripe={stripePromise}>
                <CashPay
                  paymentData={paymentData}
                  totalAmount={totalAmount?.total}
                  lateFee={totalAmount.lateFee}
                  setOpen={setOpen}
                  securityDeposit={securityDeposit}
                  tenantId={id}
                  ownerData={ownerData}
                  percentage={percentage}
                  feeAmount={(totalAmount.total * (percentage / 100)).toFixed(2)}
                />
              </Elements>
            </div>


          </div>
        </div>
      </Modal>


    </div>
  );
};

export default PaymentHistory;