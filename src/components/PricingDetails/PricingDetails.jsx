import React from 'react';

const pricingData = {
    features: [
        {
            name: "Property Listings",
            starter: "5",
            growth: "15",
            professional: "Unlimited listings"
        },
        {
            name: "Tenant Screening",
            starter: "Basic tenant screening",
            growth: "Advanced tenant screening",
            professional: "Comprehensive background checks"
        },
        {
            name: "Rent Collection",
            starter: "Manual rent collection",
            growth: "Automated rent collection",
            professional: "Automated with direct deposit"
        },
        {
            name: "Lease Management",
            starter: "Standard lease templates",
            growth: "Customizable lease agreements",
            professional: "Fully customizable leases"
        },
        {
            name: "Maintenance Services",
            starter: "Request-based service",
            growth: "Scheduled maintenance",
            professional: "24/7 maintenance support"
        },
        {
            name: "Marketing & Advertising",
            starter: "Limited property listing ads",
            growth: "Enhanced property ads",
            professional: "Premium property marketing"
        },
        {
            name: "Financial Reporting",
            starter: "Basic reports",
            growth: "Monthly financial reports",
            professional: "Detailed financial and tax reports"
        },
        {
            name: "Dedicated Property Manager",
            starter: "✕",
            growth: "Limited support",
            professional: "Full-time dedicated property manager"
        },
        {
            name: "Legal Assistance",
            starter: "✕",
            growth: "Available as an add-on",
            professional: "Included for all properties"
        },
        {
            name: "Custom Reports",
            starter: "✕",
            growth: "Available on request",
            professional: "Automated custom reports"
        },
        {
            name: "Insurance Coverage",
            starter: "✕",
            growth: "Optional add-on",
            professional: "Full coverage included"
        },
        {
            name: "Property Valuation",
            starter: "✕",
            growth: "Available on request",
            professional: "Quarterly property valuations"
        }
    ]
};

const PricingDetails = ({planData}) => {
console.log(planData);

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
                                <h1 className="text-xl font-normal text-zinc-600">${plan.price} /</h1>
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
            <div className='max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 justify-center mt-4'>
                <div className='hidden lg:block'></div>
                <button className='border border-zinc-200 rounded-lg px-4 py-2 w-full'>Get Started</button>
                <button className='primary-btn w-full'>Choose Plan </button>
                {/* <button className='border border-zinc-200 rounded-lg px-4 py-2 w-full'>Upgrade to Premium</button> */}
            </div>
        </div>
    );
};

export default PricingDetails;