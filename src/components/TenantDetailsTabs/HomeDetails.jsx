import { MapPin } from 'lucide-react';
import { url } from '../../globalConst/const';

const HomeDetails = ({ homeDetails }) => {
  const {
    maintainerName,
    propertyImages,
    propertyName,
    Description,
    propertyLocation,
    numberOfUnits,
    houseNumber,
    availableParking,
    totalRent,
    totalBookedRent,
    numberOfBookedUnits,
  
  } = homeDetails;
  const images = Array.isArray(propertyImages) ? propertyImages : [];
  return (
    <div className="lg:flex gap-8 space-y-4 lg:space-y-0">
      {/* Left side - Image */}
      <div className="lg:w-1/2">
        <img
          src={`${url}${images[0]}`}
          alt="Modern mansion"
          className="w-full lg:h-[650px] xl:h-[550px] object-cover rounded-lg"
        />
      </div>

      {/* Right side - Details Card */}
      <div className="lg:w-1/2 bg-white rounded-lg p-6 shadow-sm">
        {/* Property Name and Description */}
        <h1 className="text-lg lg:text-3xl font-bold text-gray-900 mb-4">
          {propertyName}
        </h1>
        <p className="text-gray-700 mb-4">{Description}</p>

        {/* Location */}
        <div className="flex items-center text-lg mb-6">
          <MapPin className="w-5 h-5 mr-2 text-blue-600" />
          <span className="">
            {`${propertyLocation?.address}, ${propertyLocation?.city}, ${propertyLocation?.state} ${propertyLocation?.zipCode}, ${propertyLocation?.country}`}
          </span>
        </div>

        {/* Additional Details */}
        <div className="space-y-4">
          <DetailRow label="Tenant Name" value={maintainerName || 'N/A'} />
          <DetailRow label="House Number" value={houseNumber || 'N/A'} />
          <DetailRow label="Number of Units" value={numberOfUnits || 'N/A'} />
          <DetailRow label="Number Of Booked Units" value={numberOfBookedUnits || 0} />
          <DetailRow label="Available Parking" value={availableParking ? "Yes" : "No"} />
          <DetailRow label="Rent" value={totalRent || 0} />
          {/* <DetailRow label="Security Deposit" value={totalBookedRent || 0} /> */}
        </div>
      </div>
    </div>
  );
};

// Reusable DetailRow component
const DetailRow = ({ label, value }) => (
  <div className="flex justify-between items-center py-2">
    <span className="text-gray-600 text-sm">{label}</span>
    <span className="text-gray-900 font-medium">{value}</span>
  </div>
);

export default HomeDetails;
