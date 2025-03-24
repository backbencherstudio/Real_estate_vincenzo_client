import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux/fetures/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const pricingData = {
    features: [
        {
            name: "Property Listings",
            starter: "1 - 4 units",
            growth: "5 - 12 units",
            professional: "13 - 40 units"
        },
        // {
        //     name: "Tenant Screening",
        //     starter: "Basic tenant screening",
        //     growth: "Advanced tenant screening",
        //     professional: "Comprehensive background checks"
        // },
        {
            name: "Rent Collection",
            starter: "Automated rent collection",
            growth: "Automated rent collection",
            professional: "Automated rent collection"
        },
        {
            name: "Lease Management",
            starter: "Standard Lease Templates",
            growth: "Standard Lease Templates",
            professional: "Standard Lease Templates"
        },
        {
            name: "Maintenance Services",
            starter: "Maintenance request system",
            growth: "Maintenance request system",
            professional: "Maintenance request system"
        },
        {
            name: "Marketing & Advertising",
            starter: "",
            growth: "Enhanced property ads",
            professional: "Free Advertising Consultation"
        },
        {
            name: "Financial Reporting",
            starter: "Basic reports",
            growth: "Basic Reports",
            professional: "Free Finance Reports Consultation"
        },
        {
            name: "Customer Service",
            starter: "personalized on-demand assistance",
            growth: "personalized on-demand assistance",
            professional: "personalized on-demand assistance"
        },
       
    ]
};

const PricingDetails = ({ planData }) => {
    const plans = [
        {
            name: "Starter",
            price: planData?.starter,
            badge: false,
            description: "Local advertising and services by region."
        },
        {
            name: "Growth",
            price: planData?.growth,
            badge: true,
            description: "Enhanced regional advertising and services for mid-sized managers."
        },
        {
            name: "Professional",
            price: planData?.professional,
            badge: false,
            description: "Comprehensive advertising tools for property managers in high-demand areas."
        }
    ]

    const currentUser = useSelector(selectCurrentUser);
    const navigate = useNavigate();
    const selectPlanFun = () => {
        if (!currentUser) {
            return navigate("/signIn")
        }
        if (currentUser?.role === "admin") {
            navigate(`/subscription-plan`)
        }
        if (currentUser.role === "owner") {
            navigate(`/${currentUser?.role}/payment`)
        }
    }


    return (
        <div className=' px-4 py-16 lg:py-20 sm:px-6 2xl:px-0'>
            <h1 className="text-2xl md:text-5xl lg:text-6xl font-medium text-[#0F1320] mb-6 md:mb-12 text-center">See Pricing details</h1>
            <div className="max-w-7xl mx-auto  overflow-x-auto">
                {/* Header Row */}
                <div className="grid grid-cols-4 gap-4 mb-8 min-w-[768px]">
                    <div className="text-2xl font-medium text-[#070127]">Pricing</div>
                    {plans?.map((plan, index) => (
                        <div key={index} className="">
                            {plan.badge ? (
                                <div className="w-fit bg-gradient-to-r from-[#4A90E2] to-[#1565C0] text-white rounded-full px-4 py-2 mb-2">
                                    {plan.name}
                                </div>
                            ) : (
                                <div className="mb-2 text-zinc-600 bg-[#F1F7FE] rounded-full px-4 py-2 w-fit">{plan.name}</div>
                            )}
                            <div className='flex items-center'>
                                <h1 className="text-xl font-normal text-zinc-600">{plan.price}% /</h1>
                                <p className="text-sm font-normal text-gray-600 mt-2">per unit/month</p>
                            </div>
                            <div className="text-sm text-gray-600 mt-2">{plan.description}</div>
                        </div>
                    ))}
                </div>

                {/* Features Grid */}
                <div className="space-y-4 lg:border lg:border-zinc-200 lg:rounded-lg lg:p-4">
                    {pricingData.features.map((feature, index) => (
                        <div key={index} className="grid grid-cols-4 gap-4 py-4 border-b min-w-[768px] text-[#070127]">
                            <div className="font-medium">{feature.name}</div>
                            <div className="">{feature.starter}</div>
                            <div className="">{feature.growth}</div>
                            <div className="">{feature.professional}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='max-w-7xl mx-auto flex  justify-center mt-4'>
                <button onClick={selectPlanFun} className='primary-btn w-[100%] md:w-[50%] xl:w-[25%]'>Choose Plan </button>
            </div>
        </div>
    );
};

export default PricingDetails;