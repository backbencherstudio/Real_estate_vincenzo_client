import { Select, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ownerApi from "../../../redux/fetures/owner/ownerApi";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/fetures/auth/authSlice";
import { FaAngleRight } from "react-icons/fa";
import { toast } from "sonner";
import moment from "moment";

const Maintenance = () => {
  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState(10);

  const currentUser = useSelector(selectCurrentUser)

  const { data, isLoading, refetch } = ownerApi.useGetMaintenanceDataQuery(currentUser?.userId)
  const [statusChangeInMaintenanceData] = ownerApi.useStatusChangeInMaintenanceDataMutation()

  useEffect(()=>{
    refetch()
  },[])


  const tableData = data?.data?.map(({
    propertyName,
    unitNo,
    issueType,
    status,
    createdAt,
    description,
    _id,
    isEmergency
  }) => ({
    key: _id,
    propertyName,
    unitNo,
    issueType,
    status,
    createdAt,
    description,
    isEmergency
  }));



  const handlePageSizeChange = (current, size) => {
    setPageSize(size);
  };

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };

  const handleNavigate = (id) => {
    navigate(`/${currentUser?.role}/maintenance/${id}`);
  };


  const handleStatusChange = async (newStatus, maintenanceId) => {
    const status = {
      maintenanceId,
      status: newStatus
    }

    const response = await statusChangeInMaintenanceData(status)

    if (response?.data?.success) {
      close(false)
      toast.success(response?.data?.message)
    }

  };



  const columns = [
    {
      title: "SL",
      dataIndex: "sl",
      render: (text, record, index) => index + 1
    },
    {
      title: "Property Name",
      dataIndex: "propertyName",
    },
    {
      title: "Unit No",
      dataIndex: "unitNo",
    },
    {
      title: "Issue Type",
      dataIndex: "issueType",
    },
    {
      title: "Issue Created",
      dataIndex: "createdAt",
      render: (createdAt) => (
        <div>
          {moment(createdAt).format("DD MMMM YYYY, h:mm A")}
        </div>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (text) => {
        if (!text) return "-";
        const words = text.split(" ");
        const truncated = words.slice(0, 5).join(" ");
        return words.length > 5 ? `${truncated}...` : text;
      },
    },
    {
      title: 'Maintenance Type',
      dataIndex: 'isEmergency',
      render: (isEmergency) => (
        <div>
          {isEmergency ? <h2 className='text-red-500' >Emergency</h2> : <h2 className='text-green-600'>Normal</h2> }
        </div>
      )
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status, record) => (
        <div>
          <select className={`border p-1 rounded-lg text-center focus:outline-none duration-300 ${status === "Completed" ? "bg-green-50 border border-green-400" : status === "In Progress" ? "bg-yellow-50 border border-yellow-400" : "bg-red-50 border border-red-400"} `}
            defaultValue={status}
            onChange={(e) => handleStatusChange(e.target.value, record?.key)}
          >
            <option className=" bg-red-100 " value="Pending">Pending</option>
            <option className=" bg-yellow-100 " value="In Progress">In Progress</option>
            <option className=" bg-green-100 " value="Completed">Completed</option>
          </select>

        </div>
      ),
    },
    {
      title: "Details",
      dataIndex: "details",
      render: (text, record) => (
        <div>
          <span
            onClick={() => handleNavigate(record?.key)}
            className="text-[#4A90E2] flex items-center cursor-pointer"
          >
            Details <FaAngleRight className="text-[18px] ml-1" />
          </span>
        </div>
      ),
    },

  ];



  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-manrope text-2xl font-bold leading-[48px] tracking-[-0.03em] text-left">
            Maintenance
          </h2>
          <span>
            <p className="text-[#64748B] text-[14px] ">
              {" "}
              <span className="opacity-60">Home /</span>Maintenance
            </p>
          </span>
        </div>


      </div>
      <div className="bg-white p-5 mt-10 rounded-2xl">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="clamp-text font-semibold my-5">
              {" "}
              Recently Added Maintenance{" "}
            </h1>
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
          loading={isLoading}
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
  );
};

export default Maintenance;
