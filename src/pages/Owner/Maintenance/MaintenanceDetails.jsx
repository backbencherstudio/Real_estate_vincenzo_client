import { MapPin } from "lucide-react";
import { useParams } from "react-router-dom";
import ownerApi from "../../../redux/fetures/owner/ownerApi";
import { url } from "../../../globalConst/const";
import moment from "moment";

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
            Design of a modern house as mansion blue couch
          </h1>

          <div className="flex items-center text-lg mb-6">
            <span className="">{data?.data.description}</span>
          </div>

          <div className="space-y-4">
            <DetailRow label="Property Name" value={data?.data.propertyName} />
            <DetailRow label="Unit No" value={data?.data.unitNo} />
            <DetailRow label="Issue Type" value={data?.data.issueType} />
            <DetailRow label="Status" value={data?.data.status} />
            <DetailRow
              label="CreatedAt"
              value={moment(data?.data.createdAt).format("DD MMMM YYYY")}
            />
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
