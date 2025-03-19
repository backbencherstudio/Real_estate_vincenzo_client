/* eslint-disable react/prop-types */
import  { useState } from 'react';
import {  Table, Tag } from 'antd';
import tenantApi from '../../redux/fetures/tenant/tenantApi';
import moment from 'moment';
import { getDynamicDate } from '../../utils/getDynamicDate';
import { selectCurrentUser } from '../../redux/fetures/auth/authSlice';
import { useSelector } from 'react-redux';

const PaymentHistory = ({userId}) => {    
    const { data, isLoading } = tenantApi.useGetSingleUserAllPaymentDataQuery(userId, {
        pollingInterval: 15000,
      });     

    const [pageSize, setPageSize] = useState(10);
    const currentUser = useSelector(selectCurrentUser);

    const handlePageSizeChange = (current, size) => {
        setPageSize(size);
    };

    const tableData = data?.data?.map(({ _id, invoice, propertyId, unitId, ownerId,  status, createdAt, PaymentPlaced, lateFee, paidAmount }) => ({
        key: _id,
        invoice,
        propertyId: propertyId._id,
        propertyName: propertyId?.propertyName,
        rent: unitId?.rent,
        // lateFee: unitId?.lateFee,
        lastDate: getDynamicDate(),
        lateFee : lateFee !== 0 ? unitId?.lateFee : 0,
        securityDeposit: unitId?.securityDeposit,
        ownerId,
        status,
        createdAt,
        PaymentPlacedDate: PaymentPlaced,
        paidAmount : paidAmount || 0 
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
                <span className="text-[#26861d] flex items-center cursor-pointer font-semibold">
                  Cash Pay
                </span>
              ) : (
                <span className="text-gray-500">--</span>
              )}
            </div>
          ),
        });
      }
      


    // const onChange = (value) => {
    //     console.log(`selected ${value}`);
    //   };
    
    //   const onSearch = (value) => {
    //     console.log("search:", value);
    //   };
    
    return (
        <div>
            <div className="bg-white p-5 mt-10 rounded-2xl">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className=" text-lg font-semibold my-5"> Payment History </h1>
                    </div>{" "}
                    <div>
                        {/* <Select
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
                        /> */}
                    </div>
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
        </div>
    );
};

export default PaymentHistory;