import { MapPin } from 'lucide-react';
import React from 'react';

const HomeDetails = () => {
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
    );
};

const DetailRow = ({ label, value }) => (
    <div className="flex justify-between items-center py-2">
      <span className="text-gray-600 text-sm">{label}</span>
      <span className="text-gray-900 font-medium">{value}</span>
    </div>
  );

export default HomeDetails;