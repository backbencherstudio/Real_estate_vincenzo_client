import React, { useState } from 'react';
import Slider from 'react-slick';
import { FaInstagram, FaTwitter, FaFacebookF, FaGlobe } from 'react-icons/fa';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HeaderContent from '../Header/Header';
import landing from "../../assets/landing.svg"
import authApi from "../../redux/fetures/auth/authApi";


const TeamMember = () => {
    
    const [activeSlide, setActiveSlide] = useState(0);
    const { data, isLoading } = authApi.useGetAdvisersDataQuery();

    console.log(data?.data);

    const Contents = {
        title: "Your Trusted Real Estate Advisors",
        description: "Finding your dream property or the right investment can be overwhelming. As your trusted advisors, we’re here to guide you every step of the way, making the process seamless and stress-free.",
        buttonText: "Team member",
        images: [landing, landing],
    };

    const teamMembers = [
        {
            name: "Cooper",
            role: "Manager",
            image: "https://i.ibb.co.com/64FD6zw/nafiz.jpg"
        },
        {
            name: "Esther Howard",
            role: "Real Estate Asset Manager",
            image: "https://i.ibb.co.com/6gHFxYG/converted-ab5d1216-1987-46f4-b5d5-08e794cc49bc.jpg"
        },
        {
            name: "Leslie Alexander",
            role: "Leasing Consultant",
            image: "https://i.ibb.co.com/rdFMX6Q/converted-d0a11986-ef23-4b25-90ff-cc4814a9cc7e.jpg"
        },
        {
            name: "Eleanor Pena",
            role: "Community Association Manager",
            image: "https://i.ibb.co.com/s1WL3rk/black-jacket-second.webp"
        },
        {
            name: "Darrell Steward",
            role: "Facilities Manager",
            image: "https://i.ibb.co.com/7k3Sns7/women-p-jacket.webp"
        },
        {
            name: "Leslie Alexander",
            role: "Leasing Consultant",
            image: "https://i.ibb.co.com/rdFMX6Q/converted-d0a11986-ef23-4b25-90ff-cc4814a9cc7e.jpg"
        },
    ];

    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 5,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        dots: false,
        beforeChange: (current, next) => setActiveSlide(next),
        responsive: [
            {
                breakpoint: 1536,
                settings: {
                    slidesToShow: 4,
                    centerPadding: "40px",
                }
            },
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 3,
                    centerPadding: "30px",
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    centerPadding: "20px",
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    centerPadding: "10px",
                }
            }
        ]
    };

    

    return (
        <div className='bg-[#F6F7FA] py-20'>
            <div className='pb-14'>
            <HeaderContent content={Contents} />
            </div>
            <Slider {...settings}>
                {teamMembers.map((member, index) => (
                    <div key={index} className="p-4">
                        <div className={`bg-white rounded-3xl p-2 pb-4 max-w-full h-[422px] transition-all duration-300  
                            ${activeSlide === index ? 'transform  !bg-[#1565C0]' : ''}`}>
                            <div className="mb-4">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-[252px] rounded-3xl object-cover"
                                />
                            </div>
                            <div className="text-black mb-6 pl-6">
                                <h3 className={`${activeSlide === index ? 'text-white' : 'text-black'} text-2xl font-bold mb-1`}>{member.name}</h3>
                                <p className={`${activeSlide === index ? 'text-white' : 'text-zinc-600'}`}>{member.role}</p>
                            </div>
                            <div className="flex gap-4 pl-6">
                                {[
                                    { Icon: FaGlobe, link: 'https://www.google.com' },
                                    { Icon: FaInstagram, link: 'https://www.instagram.com' },
                                    { Icon: FaTwitter, link: 'https://www.twitter.com' }, 
                                    { Icon: FaFacebookF, link: 'https://www.facebook.com' }
                                ].map(({Icon, link}) => (
                                    <a 
                                        href={link} 
                                        className={`
                                            w-10 h-10 rounded-full 
                                            flex items-center justify-center
                                            transition-colors duration-300 ease-in-out
                                            ${activeSlide === index 
                                                ? 'border border-white text-white hover:bg-white hover:text-black' 
                                                : 'bg-[#F5F5F9] text-black hover:bg-black hover:text-white'
                                            }
                                        `}
                                    >
                                        <Icon className="text-xs" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default TeamMember;