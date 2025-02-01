import { Select, Spin, Table, Tag } from "antd";
import DashboardChart from "../../components/AdminComponents/DashboardChart";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/fetures/auth/authSlice";
import ownerApi from "../../redux/fetures/owner/ownerApi";
import OverviewData from "../Admin/overviewData/OverviewData";
import moment from "moment";

const OwnerDashboard = () => {
  const [pageSize, setPageSize] = useState(10);

  const handlePageSizeChange = (current, size) => {
    setPageSize(size);
  };

  const currentUser = useSelector(selectCurrentUser);

  // =============================>>>>>>>>  this API not for this page this is for this route http://localhost:5173/owner/properties
  // const { data } = ownerApi.useGetSingleOwnerAllPropertiesQuery(
  //   currentUser?.userId
  // );

  const { data: overviewData, isLoading } =
    ownerApi.useGetAllDataOverviewByOwnerQuery(currentUser?.userId);

  const [status, setStatus] = useState("Paid");

  const { data: resentPaymentData, isLoading: resentPaymentIsLoading } =
    ownerApi.useGetResentPaymentDataByOwnerQuery({
      ownerId: currentUser?.userId,
      status : status
    });

  const tableData = resentPaymentData?.data?.map(
    ({
      invoice,
      createdAt,
      updatedAt,
      propertyId,
      unitId,
      userId,
      paidAmount,
      status,
      PaymentPlaced,
      lateFee,
      _id,
    }) => ({
      key: _id,
      invoice,
      createdAt,
      updatedAt,
      propertyName: propertyId?.propertyName || "N/A",
      unit: unitId?.unitNumber || "N/A",
      tenantName: userId?.name || "N/A",
      paidAmount : paidAmount || unitId?.rent,
      status,
      PaymentPlacedDate : PaymentPlaced,
      lateFee : lateFee !== 0 ? unitId?.lateFee : "None"
    })
  );

  const downloadInvoice = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };


  const columns = [
    {
      title: "Invoice",
      dataIndex: "invoice",
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
              📄 Show
            </button>
          ) : (
            "Upcoming"
          )}
        </div>
      )
    },
    {
      title: "Property Name",
      dataIndex: "propertyName",
    },
    {
      title: "Unit",
      dataIndex: "unit",
    },
    {
      title: "Tenant Name",
      dataIndex: "tenantName",
    },
    {
      title: "lateFee",
      dataIndex: "lateFee",
    },
    {
      title: "Amount",
      dataIndex: "paidAmount",
    },
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
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <Tag
          color={
            status === "Pending"
              ? "orange"
              : status === "Paid"
                ? "green"
                : "red"
          }
          style={{ textTransform: "capitalize" }}
        >
          {status}
        </Tag>
      ),
    },
  ];


  const onChange = (value) => {
    setStatus(value)
  };
  
  const onSearch = (value) => {
    setStatus(value)
  };

  return (
    <div>
      <div>
        <h2 className="font-manrope text-2xl font-bold leading-[48px] tracking-[-0.03em] text-left">
          Dashboard
        </h2>
        <span>
          <p className="text-[#64748B] text-[14px] ">
            {" "}
            <span className="opacity-60">Home /</span> Dashboard
          </p>
        </span>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-[150px] ">
          <Spin size="large" />
        </div>
      ) : (
        <OverviewData overviewAllData={overviewData} />
      )}

      <div>
        <DashboardChart overviewData={overviewData} />
      </div>
      <div className="bg-white p-5 mt-10 rounded-2xl">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="clamp-text font-semibold my-5">  { status === "Paid" ? "Recent" : "Pending" } Payments </h1>
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
                  value: "Paid",
                  label: "Paid",
                },
                {
                  value: "Pending",
                  label: "Pending",
                }
              ]}
            />
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={tableData}
          loading={resentPaymentIsLoading}
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

export default OwnerDashboard;
