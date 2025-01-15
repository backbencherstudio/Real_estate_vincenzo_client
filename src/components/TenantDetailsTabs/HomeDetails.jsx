import { MapPin } from 'lucide-react';
import React from 'react';

const HomeDetails = ({ homeDetails }) => {
  console.log("home", homeDetails);
  const {
    propertyName,
    Description,
    propertyLocation,
    numberOfUnits,
    houseNumber,
    availableParking,
  } = homeDetails;

  return (
    <div className="lg:flex gap-8 space-y-4 lg:space-y-0">
      {/* Left side - Image */}
      <div className="lg:w-1/2">
        <img
          src="https://i.ibb.co.com/NZnJxtY/pexels-fotoaibe-1571459.jpg"
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
          {/* <DetailRow label="Tenant Name" value={maintainerName || 'N/A'} /> */}
          <DetailRow label="House Number" value={houseNumber || 'N/A'} />
          <DetailRow label="Number of Units" value={numberOfUnits || 'N/A'} />
          <DetailRow label="Available Parking" value={availableParking ? "Yes" : "No"} />
          <DetailRow label="Rent" value="$300" />
          <DetailRow label="Security Deposit" value="$1200" />
          <DetailRow label="Rent Type" value="Monthly" />
          <DetailRow label="Late Fee" value="$100" />
          <DetailRow label="Receipt" value="$100" />
          <DetailRow label="Payment Due Date" value="30/12/2024" />
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
