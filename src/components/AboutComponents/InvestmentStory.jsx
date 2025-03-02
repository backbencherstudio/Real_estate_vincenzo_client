import React, { useEffect, useRef, useState } from 'react';
import { TbStars } from 'react-icons/tb';
import happyTenant from '../../assets/happyTenant.svg'
import world from '../../assets/world.svg'
import CountUp from 'react-countup';

const InvestmentStory = () => {
    const [isVisible, setIsVisible] = useState(false);
    const statsRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );

        if (statsRef.current) {
            observer.observe(statsRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 xl:px-0 py-20">
            {/* Header Section */}
            <div className="mb-16">
                <button className='text-blue-500 border border-blue-500 px-4 py-2 rounded-full'>Our story</button>
                <div className="flex flex-col md:flex-row justify-between mt-6 gap-8">
                    <h1 className="text-4xl md:text-5xl font-bold flex-1">Our Investment Story</h1>
                    <p className="text-gray-600 flex-1">
                        RentPad Homes began as a simple solution to help family members manage their properties more efficiently. It has since evolved into a mission-driven platform dedicated to empowering small and mid-sized investors. Our goal is to streamline property management, maximize returns, and make real estate investing more accessible. By leveraging technology and innovation, we help property owners take control of their investments with ease, efficiency, and confidence.
                    </p>
                </div>
            </div>

            {/* Vision & Mission Section */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
                <div className="bg-[#F5F6F9] p-8 rounded-3xl">
                    <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
                    <p className="text-gray-600 xl:w-[50ch]">
                        To revolutionize the rental experience by creating a seamless, transparent, and technology-driven platform that empowers landlords and tenants alike. We strive to simplify property management, enhance communication, and optimize financial transactions, making renting smarter, stress-free, and more efficient for everyone. Our goal is to set the industry standard for innovation, trust, and convenience in real estate management.

                    </p>
                </div>
                <div className="bg-[#F5F6F9] p-8 rounded-3xl">
                    <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                    <p className="text-gray-600 xl:w-[50ch]">
                        At RentPad, our mission is to make real estate investing and property ownership easier and more accessible for everyone. We believe that managing rental properties shouldn’t be complicated or time-consuming.. Whether you own one property or a growing portfolio, RentPad simplifies the process, reduces stress, and maximizes efficiency. We are committed to helping property owners succeed by making real estate management smarter, more transparent, and hassle-free.
                    </p>
                </div>
            </div>

            {/* Stats Section */}
            <div className="grid md:grid-cols-3 gap-8" ref={statsRef}>
                <div className="bg-[#F5F6F9] p-8 rounded-3xl relative group">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-3xl font-bold flex items-center gap-2">
                            <span className='text-3xl'>•</span>
                            <CountUp end={40} suffix="K+ Followers" duration={5} start={isVisible ? undefined : 0} />
                        </h3>
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                            <span className="text-blue-600">
                                <img src={world} alt="" />
                            </span>
                        </div>
                    </div>
                    <div className='flex justify-between items-center'>
                        <p className="text-zinc-600 ml-4">• Follow our socials for key updates!</p>
                        <span className=" text-gray-200 text-4xl font-bold">01</span>
                    </div>
                </div>
                <div className="bg-[#F5F6F9] p-8 rounded-3xl relative group">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-5xl font-bold flex items-center gap-2">
                            {/* <span className='text-3xl'>•</span> */}
                            {/* <CountUp end={8} suffix="K+" duration={5} start={isVisible ? undefined : 0} /> */}
                        </h3>
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                            <span className="text-blue-600">
                                <img src={happyTenant} alt="" />
                            </span>
                        </div>
                    </div>
                    <div className='flex justify-between items-center'>
                        <p className="text-zinc-600 ml-4 text-2xl">• COMING SOON</p>
                        <span className=" text-gray-200 text-4xl font-bold">02</span>
                    </div>
                </div>
                <div className="bg-[#F5F6F9] p-8 rounded-3xl relative group">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-5xl font-bold flex items-center gap-2">
                            {/* <span className='text-3xl'>•</span> */}
                            {/* <CountUp end={5.00} decimals={2} duration={5} start={isVisible ? undefined : 0} /> */}
                        </h3>
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                            <span className="text-blue-400"><TbStars /></span>
                        </div>
                    </div>
                    <div className='flex justify-between items-center'>
                        <p className="text-zinc-600 text-2xl ml-4">• COMING SOON</p>
                        <span className=" text-gray-200 text-4xl font-bold">03</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvestmentStory;