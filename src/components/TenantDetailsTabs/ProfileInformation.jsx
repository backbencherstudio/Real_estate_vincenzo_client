import React from 'react';

const ProfileInformation = ({ personalInfo = {}, addressInfo = {} }) => {
    const allowedFields = ["email", "name", "personalInfo", "permanentAddress"];
    return (
        <div className="bg-white p-4 md:p-8 rounded-lg shadow-sm">
            {/* Profile Header */}
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4 mb-8">
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                    <img
                        src="https://i.ibb.co/64FD6zw/nafiz.jpg"
                        alt="Profile"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex-grow">
                    <h2 className="text-xl font-semibold">Chrispher</h2>
                    <p className="text-gray-500">Chrispher@gmail.com</p>
                </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Personal Information */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                    {Object.entries(personalInfo)
                        .filter(([key]) => allowedFields.includes(key))
                        .map(([key, value]) => (
                            <div key={key} className="flex flex-col sm:flex-row sm:justify-between pb-2">
                                <span className="text-gray-600 capitalize mb-1 sm:mb-0">
                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                </span>
                                <span className="font-medium">
                                    {typeof value === 'object'
                                        ? Object.values(value).filter(Boolean).join(', ')
                                        : value || 'N/A'}
                                </span>
                            </div>
                        ))}
                </div>

                {/* Permanent Address */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold mb-4">Permanent Address</h3>
                    {addressInfo.permanentAddress ? (
                        Object.entries(addressInfo.permanentAddress).map(([key, value]) => (
                            <div key={key} className="flex flex-col sm:flex-row sm:justify-between pb-2">
                                <span className="text-gray-600 capitalize mb-1 sm:mb-0">
                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                </span>
                                <span className="font-medium">
                                    {typeof value === 'object'
                                        ? Object.values(value).filter(Boolean).join(', ')
                                        : value || 'N/A'}
                                </span>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No permanent address available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileInformation;
