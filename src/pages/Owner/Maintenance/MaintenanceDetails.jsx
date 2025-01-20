import { MapPin } from "lucide-react";
import { useParams } from "react-router-dom";
import ownerApi from "../../../redux/fetures/owner/ownerApi";
import { url } from "../../../globalConst/const";

const MaintenanceDetails = () => {
const {id} = useParams();
const {data} = ownerApi.useGetSingleMaintenanceDataQuery(id)

  return (
    <div>
      <div>
        <h2 className="font-manrope text-2xl font-bold leading-[48px] tracking-[-0.03em] text-left">
          Maintenance
        </h2>
        <span>
          <p className="text-[#64748B] text-[14px] ">
            {" "}
            <span className="opacity-60">Home / </span>Maintenance Details
          </p>
        </span>
      </div>
      <div className="lg:flex gap-8 space-y-4 lg:space-y-0">
        {/* Left side - Image */}
        <div className="lg:w-1/2">
          <img
            src={`${url}${data?.data.image}`}
            alt="Modern mansion"
            className="w-full lg:h-[650px] xl:h-[550px] object-cover rounded-lg"
          />
        </div>

        {/* Right side - Details Card */}
        <div className="lg:w-1/2 bg-white rounded-lg p-6 shadow-sm">
          <h1 className="text-lg lg:text-3xl font-bold text-gray-900 mb-4">
            Design of a modern h mansion blue couch
          </h1>

          <div className="flex items-center text-lg mb-6">
            <MapPin className="w-5 h-5 mr-2 text-blue-600" />
            <span className="">New York Staten Island, NY 10314, USA</span>
          </div>

          <div className="space-y-4">
            <DetailRow label="Tenant Name" value="Adam Smith" />
            <DetailRow label="Unit No" value="5A" />
            <DetailRow label="Rent" value="$300" />
            <DetailRow label="Security Deposit" value="$1200" />
            <DetailRow label="Rent Type" value="Monthly" />
            <DetailRow label="Late Fee" value="$100" />
            <DetailRow label="Receipt" value="$100" />
            <DetailRow label="Payment Due Date" value="30/12/2024" />
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailRow = ({ label, value }) => (
  <div className="flex justify-between items-center py-2">
    <span className="text-gray-600 text-sm">{label}</span>
    <span className="text-gray-900 font-medium">{value}</span>
  </div>
);

export default MaintenanceDetails;
