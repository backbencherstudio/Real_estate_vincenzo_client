import React from 'react';
import HeaderContent from '../Header/Header';
import landing from "../../assets/landing.svg"
import managementTools from "../../assets/tools.svg"
import customerSupport from "../../assets/support.svg"
import learningResources from "../../assets/resource.svg" 
const WhyChoooseUs = () => {
    const Contents = {
        title: "Simplifying Property Management for Maximum Efficiency",
        description: "We make property management easier and more efficient with tools that save time, reduce manual tasks, and enhance tenant satisfaction.",
        buttonText: "Why choose us",
        images: [landing, landing],
    };
    return (
        <div className="py-10 lg:py-20">
            <div>
                <HeaderContent content={Contents} />
            </div>
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
                    <div className="pb-10 md:pb-0 md:pr-10 bg-white">
                        <div className="flex justify-center items-center w-24 h-24 mb-6 p-4 border border-blue-300 rounded-full">
                            <img src={managementTools} alt="Management Tools" className="" />
                        </div>
                        <h3 className="text-xl lg:text-3xl font-medium mb-4">Advanced Management Tools</h3>
                        <p className="text-gray-600">
                            Easily manage payments, maintenance requests, and tenant communication with a secure and intuitive interface.
                        </p>
                    </div>
                    <div className="py-10 md:py-0 md:px-10 border-y md:border-y-0 md:border-x border-gray-200 bg-white">
                        <div className="flex justify-center items-center w-24 h-24 mb-6 p-4 border border-blue-300 rounded-full">
                            <img src={customerSupport} alt="Customer Support" className="" />
                        </div>
                        <h3 className="text-xl lg:text-3xl font-medium mb-4">Exceptional Customer Support</h3>
                        <p className="text-gray-600">
                            Access a team of experts ready to assist you at every step, ensuring a seamless experience.
                        </p>
                    </div>
                    <div className="pt-10 md:pt-0 md:pl-10 bg-white">
                        <div className="flex justify-center items-center w-24 h-24 mb-6 p-4 border border-blue-300 rounded-full">
                            <img src={learningResources} alt="Learning Resources" className="" />
                        </div>
                        <h3 className="text-xl lg:text-3xl font-medium mb-4">Comprehensive Learning Resources</h3>
                        <p className="text-gray-600">
                            Explore detailed guides, videos, and checklists to maximize your property management efficiency.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhyChoooseUs;