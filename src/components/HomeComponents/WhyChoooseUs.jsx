import React from 'react';
import HeaderContent from '../Header/Header';
import landing from "../../assets/landing.svg"
const WhyChoooseUs = () => {
    const Contents = {
        title: "Simplifying Property Management for Maximum Efficiency",
        description: "We make property management easier and more efficient with tools that save time, reduce manual tasks, and enhance tenant satisfaction.",
        buttonText: "Why choose us",
        images: [landing, landing],
    };
    return (
        <div>
            <div>
                <HeaderContent content={Contents} />
            </div>
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Advanced Management Tools Card */}
                    <div className="p-6 bg-white rounded-lg shadow-lg">
                        <div className="w-20 h-20 mb-6 p-4 bg-blue-50 rounded-full">
                            <img src={landing} alt="Management Tools" className="w-full h-full" />
                        </div>
                        <h3 className="text-2xl font-semibold mb-4">Advanced Management Tools</h3>
                        <p className="text-gray-600">
                            Easily manage payments, maintenance requests, and tenant communication with a secure and intuitive interface.
                        </p>
                    </div>

                    {/* Exceptional Customer Support Card */}
                    <div className="p-6 bg-white rounded-lg shadow-lg">
                        <div className="w-20 h-20 mb-6 p-4 bg-blue-50 rounded-full">
                            <img src={landing} alt="Customer Support" className="w-full h-full" />
                        </div>
                        <h3 className="text-2xl font-semibold mb-4">Exceptional Customer Support</h3>
                        <p className="text-gray-600">
                            Access a team of experts ready to assist you at every step, ensuring a seamless experience.
                        </p>
                    </div>

                    {/* Comprehensive Learning Resources Card */}
                    <div className="p-6 bg-white rounded-lg shadow-lg">
                        <div className="w-20 h-20 mb-6 p-4 bg-blue-50 rounded-full">
                            <img src={landing} alt="Learning Resources" className="w-full h-full" />
                        </div>
                        <h3 className="text-2xl font-semibold mb-4">Comprehensive Learning Resources</h3>
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