import React from 'react';
import { BsGear, BsPeople, BsStar, BsTools } from 'react-icons/bs';
import HeaderContent from '../Header/Header';
import landing from "../../assets/landing.svg"

const CoreValue = () => {
    const Contents = {
        title: "Our Guiding Principles and Core Values",
        description: "Our core values embody excellence, integrity, and innovation, guiding us to deliver impactful solutions and build trust.",
        buttonText: "Our core values",
        images: [landing, landing],
    };
    const coreValues = [
        {
            icon: <BsGear className="text-2xl" />,
            title: "Streamlined Operations for Investors",
            description: "Our platform simplifies real estate management, offering property owners and managers an efficient way to track investments, manage portfolios, and optimize operations."
        },
        {
            icon: <BsPeople className="text-2xl" />,
            title: "Seamless Tenant Experience",
            description: "Tenants can easily manage rent payments, submit maintenance requests, and communicate directly with property managers, making the rental experience hassle-free."
        },
        {
            icon: <BsStar className="text-2xl" />,
            title: "Effortless Tenant-Manager Connections",
            description: "Built-in messaging tools ensure smooth and direct communication between property managers and tenants, fostering stronger relationships."
        },
        {
            icon: <BsTools className="text-2xl" />,
            title: "Hassle-Free Maintenance Solutions",
            description: "Our platform simplifies real estate management, offering property owners and managers an efficient way to track investments, manage portfolios, and optimize operations."
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 xl:px-0 py-10 xl:py-20">
            <div className='mb-14 '>
                <HeaderContent content={Contents} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {coreValues.map((value, index) => (
                    <div
                        key={index}
                        className="bg-[#F5F6F9] p-6 rounded-lg hover:shadow-lg transition-shadow duration-300"
                    >
                        <div className="mb-5 bg-white rounded-full p-6 w-fit">
                            {value.icon}
                        </div>
                        <h3 className="text-xl font-semibold mb-4">
                            {value.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                            {value.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CoreValue;