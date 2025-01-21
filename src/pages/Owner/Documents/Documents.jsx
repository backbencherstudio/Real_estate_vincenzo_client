import { Select, Table, Tag } from "antd";
import { useState } from "react";
import documentApi from "../../../redux/fetures/document/documentApi";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/fetures/auth/authSlice";
import { url } from "../../../globalConst/const";
import { FaAngleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Documents = () => {
  const currentUser = useSelector(selectCurrentUser);
  const [pageSize, setPageSize] = useState(10);
  const {data} = documentApi.useGetSingleOwnerAllTenantsDocumentsQuery(currentUser?.userId);
  const navigate = useNavigate()
  
  const handlePageSizeChange = (current, size) => {
    setPageSize(size);
  };
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  
  const onSearch = (value) => {
    console.log("search:", value);
  };


  const tableDatas = data?.data?.map(({ _id, tenantName, propertyName, unitNumber, status, image, documentType }) => ({
    key: _id, 
    tenantName,
    propertyName,
    unitNumber,
    status,
    image,
    documentType
  }));

  const handleNavigate = (id) => {
    navigate(`/${currentUser?.role}/documents/${id}`);
  };


  const columns = [
    {
      title : "SL",
      dataIndex : "sl",
      render : (text, record, index)=> index + 1
    },
    {
      title: "Tenant Name",
      dataIndex: "tenantName",
    },
    {
      title: "Property Name",
      dataIndex: "propertyName",
    },
    { 
      title: "Unite",
      dataIndex: "unitNumber",
    },
    {
      title: "Attachment",
      dataIndex: "image",
      render: (text, record) => (
        <div>
          <img className=" w-[80px] h-[50px]" src={`${url}${record.image}`} alt="" />
        </div>
      ),
    },
    {
      title : "Document Type",
      dataIndex : "documentType"
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (

        <Tag
          color={
            status === "Pending"
              ? "orange"
              : status === "Approved"
              ? "green"
              : "red"
          }
          style={{ textTransform: "capitalize" }}
        >
          {status}
        </Tag>
        
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
 
  // const handleAddDocuments = () => {
  //   navigate("addDocuments");
  // };
  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-manrope text-2xl font-bold leading-[48px] tracking-[-0.03em] text-left">
            Documents
          </h2>
          <span>
            <p className="text-[#64748B] text-[14px] ">
              {" "}
              <span className="opacity-60">Home /</span>Documents
            </p>
          </span>
        </div>
        {/* <CustomButton
          handleClick={handleAddDocuments}
          content={
            <div className="flex items-center  gap-1">
              {"Add Documents"} <BiPlus size={16} />{" "}
            </div>
          }
        /> */}
      </div>
      <div className="bg-white p-5 mt-10 rounded-2xl">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="clamp-text font-semibold my-5">
              {" "}
              Recently Added Documents{" "}
            </h1>
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
            />
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={tableDatas}
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

export default Documents;
