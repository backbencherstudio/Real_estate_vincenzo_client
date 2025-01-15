import CustomTable from "../../../shared/CustomTable";
import ownerApi from "../../../redux/fetures/owner/ownerApi";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/fetures/auth/authSlice";
import { FaAngleRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Tenants = () => {

  const currentUser = useSelector(selectCurrentUser)
  const { data: tenantData, isLoading } = ownerApi.useGetSingleOwnerAllTenantsQuery(currentUser?.userId)
  const navigate = useNavigate() 

  const tableData = tenantData?.data?.map(({
    _id,
    userId,
    propertyId,
    unitId
  }) => ({
    key: _id,
    name: userId.name,
    contactNumber: userId?.personalInfo?.contactNumber | 0,
    propertyName: propertyId.propertyName,
    unitNumber: unitId.unitNumber,
    rent: unitId.rent,

  }));

  const handleNavigate = (id) => {
    navigate(`/${currentUser?.role}/tenant/${id}`);
  };


  const columns = [
    {
      title: "SL",
      dataIndex: "sl",
      render: (text, record, index) => index + 1
    },
    {
      title: "Tenant Name",
      dataIndex: "name",
    },
    {
      title: "Property Name",
      dataIndex: "propertyName",
    },
    {
      title: "Unit",
      dataIndex: "unitNumber"
    },
    {
      title: "Current Rent",
      dataIndex: "rent"
    },
    {
      title: "Contact Number",
      dataIndex: "contactNumber",
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
            Tenants
          </h2>
          <span>
            <p className="text-[#64748B] text-[14px] ">
              {" "}
              <span className="opacity-60">Home /</span> My Tenants
            </p>
          </span>
        </div>
      </div>
      <CustomTable
        title={"Recently Added Tenants"}
        columns={columns}
        data={tableData}
        loading={isLoading}
      />
    </div>
  );
};

export default Tenants;
