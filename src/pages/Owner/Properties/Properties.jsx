import { Select, Table } from "antd";
import { useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/fetures/auth/authSlice";
import ownerApi from "../../../redux/fetures/owner/ownerApi";
import CustomButton from "../../../shared/CustomButton";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { FaRegEdit } from "react-icons/fa";

const AllProperties = () => {
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser)


  const { data: propertyData, isLoading } = ownerApi.useGetSingleOwnerAllPropertiesQuery(currentUser?.userId);
  const [deleteProperties, { isLoading: deletePropertyMutationLoadin }] = ownerApi.useDeletePropertiesMutation()
  const handlePageSizeChange = (current, size) => {
    setPageSize(size);
  };

  const handleNavigate = (id) => {
    navigate(`/${currentUser?.role}/properties/${id}`);
  };

  const handleNavigateForUpdateProperties = (id) => {
    navigate(`/${currentUser?.role}/updateProperties/${id}`);
  };

  const deletePropertyHandler = async (propertyData) => {
    if(propertyData?.numberOfUnits > 0  ){
     return toast.warning("This property cannot be deleted at the moment. Please delete all associated units first before proceeding.")
    }    
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteProperties(propertyData?.key);
        if (res?.data?.success) {
          toast.success(res?.data?.message);
        }
      }
    });
  };

  const addPropertiesNavigation = () => {
    navigate(`addProperties`);
  };


  const tableData = propertyData?.data?.map(
    ({
      Description,
      amenities,
      availableParking,
      createdAt,
      houseNumber,
      maintainerName,
      numberOfUnits,
      ownerId,
      propertyImages,
      propertyLocation,
      propertyName,
      totalRent,
      updatedAt,
      _id,
    }) => ({
      key: _id,
      Description,
      amenities,
      availableParking,
      createdAt,
      houseNumber,
      maintainerName,
      numberOfUnits,
      ownerId,
      propertyImages,
      propertyLocation,
      propertyName,
      totalRent,
      updatedAt,
    })
  );

  const columns = [
    {
      title: "SL",
      dataIndex: "sl",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Property Name",
      dataIndex: "propertyName",
    },
    {
      title: "Total Unit",
      dataIndex: "numberOfUnits",
    },
    {
      title: "Total Rent",
      dataIndex: "totalRent",
    },
    {
      title: "Description",
      dataIndex: "Description",
      render: (text) => {
        if (!text) return "-";
        const words = text.split(" ");
        const truncated = words.slice(0, 5).join(" ");
        return words.length > 5 ? `${truncated}...` : text;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
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
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div className="flex items-center" >

          <span
            onClick={() => deletePropertyHandler(record)}
            className="text-red-500 flex items-center cursor-pointer"
          >
            <MdDeleteForever className="text-[24px] ml-1" />
          </span>

          <span
            onClick={() => handleNavigateForUpdateProperties(record?.key)}
            className="text-[#4A90E2] flex items-center cursor-pointer"
          >
            <FaRegEdit className="text-[22px] ml-1" />
          </span>


        </div>
      ),
    },
  ];

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };

  return (
    <div>

      <div className="flex justify-between items-center" >
        <div>
          <h2 className="font-manrope text-2xl font-bold leading-[48px] tracking-[-0.03em] text-left">
            Properties
          </h2>
          <span>
            <p className="text-[#64748B] text-[14px] ">
              {" "}
              <span className="opacity-60">Home /</span> All Properties
            </p>
          </span>
        </div>

        <CustomButton content="Add Properties" handleClick={addPropertiesNavigation} ></CustomButton>

      </div>

      <div className="bg-white p-5 mt-10 rounded-2xl">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="clamp-text font-semibold my-5"> Property List </h1>
          </div>{" "}
          <div>
            <Select
              showSearch
              placeholder="This Month"
              optionFilterProp="label"
              onChange={onChange}
              onSearch={onSearch}
              options={[
                {
                  value: "january",
                  label: "January",
                },
                {
                  value: "february",
                  label: "February",
                },
                {
                  value: "march",
                  label: "March",
                },
                {
                  value: "april",
                  label: "April",
                },
                {
                  value: "may",
                  label: "May",
                },
                {
                  value: "june",
                  label: "June",
                },
                {
                  value: "july",
                  label: "July",
                },
                {
                  value: "august",
                  label: "August",
                },
                {
                  value: "september",
                  label: "September",
                },
                {
                  value: "october",
                  label: "October",
                },
                {
                  value: "november",
                  label: "November",
                },
                {
                  value: "december",
                  label: "December",
                },
              ]}
            />
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

export default AllProperties;
