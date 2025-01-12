import React, { useState } from 'react';
import { BadgeEuro, CircleX, File, Home, Mail, MoreVertical, User } from 'lucide-react';
import ProfileInformation from '../../../components/TenantDetailsTabs/ProfileInformation';
import HomeDetails from '../../../components/TenantDetailsTabs/HomeDetails';
import PaymentHistory from '../../../components/TenantDetailsTabs/PaymentHistory';
import TenantDocument from '../../../components/TenantDetailsTabs/TenantDocument';

const TenantDetails = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [showMenu, setShowMenu] = useState(false);

    const tabs = [
        { id: 'profile', name: 'Profile Information', icon: <User /> },
        { id: 'home', name: 'Home Details', icon: <Home /> },
        { id: 'payment', name: 'Payment History', icon: <BadgeEuro /> },
        { id: 'document', name: 'Document', icon: <File /> }
    ];

    const breadcrumbMapping = {
        profile: 'Profile Information',
        home: 'Home Details',
        payment: 'Payment History',
        document: 'Tenant Document'
    };

    const personalInfo = {
        name: 'Christopher',
        email: 'Chrispher@gmail.com',
        contact: '+111 582 654 963',
        age: '36',
        familyMember: '6',
        job: 'Designer'
    };

    const addressInfo = {
        address: 'Staten Island, NY 10314, USA',
        city: 'New York',
        state: 'Manhattan',
        zipCode: '1216',
        country: 'United State'
    };

    return (
        <div className=" mx-auto p-4 ">
            {/* Header with breadcrumb and menu */}
            <div className=" mb-6">
                <div className="text-sm text-gray-500">
                    Home / Tenant / Tenant Details/ {breadcrumbMapping[activeTab]}
                </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold mb-6">Tenant Details</h1>

            {/* Tabs - Scrollable on mobile */}
            <div className='flex justify-between '>
                <div className="overflow-x-auto mb-6">
                    <div className="flex min-w-max space-x-4">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-6 py-4  flex items-center space-x-2 whitespace-nowrap rounded-lg font-medium ${activeTab === tab.id
                                    ? 'bg-gradient-to-l to-[#4A90E2] from-[#1565C0] text-white'
                                    : 'text-gray-500 border bg-white hover:text-gray-700'
                                    }`}
                            >
                                <span>{tab.icon}</span>
                                <span>{tab.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
                <div className="relative">
                    <button
                        onClick={() => setShowMenu(!showMenu)}
                        className="p-2 hover:bg-gray-100 rounded-full"
                    >
                        <MoreVertical className="h-5 w-5 text-gray-600" />
                    </button>

                    {showMenu && (
                        <div className="absolute right-0 mt-2 w-48 p-6 bg-white rounded-md shadow-lg z-50">
                            <div className="py-1">
                                <button className="flex items-center gap-2 w-full mb-4 text-[#64748B] text-left text-sm hover:text-green-500 duration-300 ">
                                    <Mail size={16} /> Message Owner
                                </button>
                                <button className="flex items-center gap-2 w-full text-[#64748B] text-left text-sm hover:text-red-500 duration-300">
                                    <CircleX size={16} /> Remove Owner
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Profile Section */}
            {activeTab === 'profile' && (
                <ProfileInformation personalInfo={personalInfo} addressInfo={addressInfo} />
            )}

            {/* Other tabs content */}
            {activeTab === 'home' && (
                <HomeDetails />
            )}
            {activeTab === 'payment' && (
                <PaymentHistory />
            )}
            {activeTab === 'document' && (
                <TenantDocument />
            )}
        </div>
    );
};

export default TenantDetails;