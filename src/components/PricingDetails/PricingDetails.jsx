import React from 'react';

const pricingData = {
    plans: [
        {
            name: "Starter",
            price: "20",
            badge: false,
            description: "Local advertising and services by region."
        },
        {
            name: "Growth",
            price: "18",
            badge: true,
            description: "Enhanced regional advertising and services for mid-sized managers."
        },
        {
            name: "Professional",
            price: "15",
            badge: false,
            description: "Comprehensive advertising tools for property managers in high-demand areas."
        }
    ],
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

const PricingDetails = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 overflow-x-auto">
            <h1 className="text-4xl font-bold text-center mb-12">See Pricing details</h1>
            
            {/* Header Row */}
            <div className="grid grid-cols-4 gap-4 mb-8 min-w-[768px]">
                <div className="font-medium">Pricing</div>
                {pricingData.plans.map((plan, index) => (
                    <div key={index} className="">
                        {plan.badge ? (
                            <div className="bg-blue-500 text-white rounded-full px-4 py-1 w-fit mx-auto mb-2">
                                {plan.name}
                            </div>
                        ) : (
                            <div className="mb-2">{plan.name}</div>
                        )}
                        <div className="text-2xl font-bold text-blue-600">${plan.price}</div>
                        <div className="text-sm text-gray-600">/per unit/month</div>
                        <div className="text-sm text-gray-600 mt-2">{plan.description}</div>
                    </div>
                ))}
            </div>

            {/* Features Grid */}
            <div className="space-y-4">
                {pricingData.features.map((feature, index) => (
                    <div key={index} className="grid grid-cols-4 gap-4 py-4 border-b min-w-[768px]">
                        <div className="font-medium">{feature.name}</div>
                        <div className="">{feature.starter}</div>
                        <div className="">{feature.growth}</div>
                        <div className="">{feature.professional}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PricingDetails;