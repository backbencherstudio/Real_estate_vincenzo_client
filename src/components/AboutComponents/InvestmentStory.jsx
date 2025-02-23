import React from 'react';
import { TbStars } from 'react-icons/tb';
import happyTenant from '../../assets/happyTenant.svg'
import world from '../../assets/world.svg'
const InvestmentStory = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 xl:px-0 py-20">
            {/* Header Section */}
            <div className="mb-16">
                <button className='text-blue-500 border border-blue-500 px-4 py-2 rounded-full'>Our story</button>
                <div className="flex flex-col md:flex-row justify-between mt-6 gap-8">
                    <h1 className="text-4xl md:text-5xl font-bold flex-1">Our Investment Story</h1>
                    <p className="text-gray-600 flex-1">
                        Our Investment Story is built on strategic decisions and strong partnerships
                        that have driven our growth in real estate management. By carefully selecting
                        high-value properties and focusing on long-term value.
                    </p>
                </div>
            </div>

            {/* Vision & Mission Section */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
                <div className="bg-[#F5F6F9] p-8 rounded-3xl">
                    <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
                    <p className="text-gray-600 w-[50ch]">
                        Our vision is to redefine real estate management by providing innovative solutions that enhance property value and create long-term relationships with tenants and investors. We aim to be the leading force in the industry, focusing on sustainable growth, transparency, and exceptional service. By leveraging market insights and technology.
                    </p>
                </div>
                <div className="bg-[#F5F6F9] p-8 rounded-3xl">
                    <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                    <p className="text-gray-600 w-[50ch]">
                        Our mission is to provide exceptional real estate management services that ensure the highest level of satisfaction for both property owners and tenants. We are committed to maximizing the value of every property we manage through proactive maintenance, transparent communication, and tailored solution. By fostering strong relationships and maintaining a customer.
                    </p>
                </div>
            </div>

            {/* Stats Section */}
            <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-[#F5F6F9] p-8 rounded-3xl relative group">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-5xl font-bold flex items-center gap-2"><span className='text-3xl'>•</span> 10K+</h3>
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                            <span className="text-blue-600">
                                <img src={world} alt="" />
                            </span>
                        </div>
                    </div>
                    <div className='flex justify-between items-center'>
                        <p className="text-zinc-600 ml-4">• Sturt up ready to connected</p>
                        <span className=" text-gray-200 text-4xl font-bold">01</span>
                    </div>
                </div>
                <div className="bg-[#F5F6F9] p-8 rounded-3xl relative group">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-5xl font-bold flex items-center gap-2"><span className='text-3xl'>•</span> 8K+</h3>
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                            <span className="text-blue-600">
                                <img src={happyTenant} alt="" />
                            </span>
                        </div>
                    </div>
                    <div className='flex justify-between items-center'>
                        <p className="text-zinc-600 ml-4">• Happy tenant</p>
                        <span className=" text-gray-200 text-4xl font-bold">02</span>
                    </div>
                </div>
                <div className="bg-[#F5F6F9] p-8 rounded-3xl relative group">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-5xl font-bold flex items-center gap-2"><span className='text-3xl'>•</span> 5.00</h3>
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                            <span className="text-blue-400"><TbStars /></span>
                        </div>
                    </div>
                    <div className='flex justify-between items-center'>
                        <p className="text-zinc-600 ml-4">• 05k+ rating</p>
                        <span className=" text-gray-200 text-4xl font-bold">03</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvestmentStory;