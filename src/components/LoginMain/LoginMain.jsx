import React from 'react';
import imageright from "../../assets/imageright.png";
import dolaricon from "../../assets/money-recive.png"

const LoginMain = () => {
    return (
        <div className="min-h-screen bg-white flex flex-col justify-between">
            {/* Header Section */}
            <div className="text-center pt-12 px-4">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
                    Select Account Type To Get Started
                </h2>
                <p className="mt-2 text-gray-500 text-sm md:text-base">
                    Communicate your best with videos auto-enhanced by AI and intuitive editing
                </p>
            </div>

            {/* Main Section */}
            <div className="w-full max-w-[1020px] flex flex-col lg:flex-row items-center justify-between  lg:gap-16 mx-auto mt-10 lg:mt-4 px-4 md:px-8">
                {/* Left: Account Type Selection */}
                <div className="w-full lg:w-1/2 space-y-4">
                    {/* Static Account Type Buttons with Hover Effects */}
                    <div className="flex items-center p-5 border rounded-xl shadow-sm bg-white border-gray-200 hover:bg-blue-50 hover:border-blue-500 cursor-pointer transition-all duration-300">
                        <div className="w-8 h-8 bg-blue-100 flex items-center justify-center rounded-full mr-4">
                            <img
                                className="w-5 h-5"
                                src={dolaricon}
                                alt="Tenant icon"
                            />
                        </div>
                        <span className="text-base font-medium text-gray-800 hover:text-blue-600">
                            Tenant
                        </span>
                    </div>

                    <div className="flex items-center p-5 border rounded-xl shadow-sm bg-white border-gray-200 hover:bg-blue-50 hover:border-blue-500 cursor-pointer transition-all duration-300">
                        <div className="w-8 h-8 bg-blue-100 flex items-center justify-center rounded-full mr-4">
                            <img
                                className="w-5 h-5"
                                src={dolaricon}
                                alt="Owner icon"
                            />
                        </div>
                        <span className="text-base font-medium text-gray-800 hover:text-blue-600">
                            Owner
                        </span>
                    </div>

                    <div className="flex items-center p-5 border rounded-xl shadow-sm bg-white border-gray-200 hover:bg-blue-50 hover:border-blue-500 cursor-pointer transition-all duration-300">
                        <div className="w-8 h-8 bg-blue-100 flex items-center justify-center rounded-full mr-4">
                            <img
                                className="w-5 h-5"
                                src={dolaricon}
                                alt="Admin icon"
                            />
                        </div>
                        <span className="text-base font-medium text-gray-800 hover:text-blue-600">
                            Admin
                        </span>
                    </div>
                </div>

                {/* Right: Image Section */}
                <div className="w-full lg:w-1/2 flex justify-center">
                    <img
                        src={imageright}
                        alt="Illustration"
                        className="w-full max-w-[400px] object-contain"
                    />
                </div>
            </div>

            {/* Footer Copyright */}
            <footer className="flex w-[1020px] mx-auto justify-between py-4 text-sm text-gray-400">
                <p>© 2024 Copyright - All rights reserved</p>
                <p>Designed by Patternist</p>
            </footer>
        </div>
    );
};

export default LoginMain;
