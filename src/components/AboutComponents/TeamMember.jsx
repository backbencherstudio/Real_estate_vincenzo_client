/* eslint-disable react/jsx-key */
import React, { useState } from 'react';
import Slider from 'react-slick';
import { FaInstagram, FaTwitter, FaFacebookF, FaGlobe, FaLinkedin } from 'react-icons/fa';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HeaderContent from '../Header/Header';
import landing from "../../assets/landing.svg"
import authApi from "../../redux/fetures/auth/authApi";
import { url } from '../../globalConst/const';


const TeamMember = () => {
    
    const [activeSlide, setActiveSlide] = useState(0);
    const { data, isLoading } = authApi.useGetAdvisersDataQuery();


    console.log(data?.data);

    const Contents = {
        title: "Your Trusted RentPad Home's Team",
        description: "Change to- Finding the right tools to manage your property can be hard. At RentPad, we're here to guide you every step of the way, with on  emand customer support and easy to use software-",
        buttonText: "Team members",
        images: [landing, landing],
    };

    const teamMembers = data?.data;
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
                {teamMembers?.map((member, index) => (
                    <div key={index} className="p-4">
                        <div className={`bg-white rounded-3xl p-2 pb-4 max-w-full h-[422px] transition-all duration-300  
                            ${activeSlide === index ? '' : ''}`}>
                            <div className="mb-4">
                                <img
                                    src={`${url}${member?.image}`}
                                    alt={member?.name}
                                    className="w-full h-[252px] rounded-3xl object-cover"
                                />
                            </div>
                            <div className="text-black mb-6 pl-6">
                                <h3 className={`${activeSlide === index ? 'text-black' : 'text-black'} text-2xl font-bold mb-1`}>{member?.name}</h3>
                                <p className={`${activeSlide === index ? 'text-black' : 'text-zinc-600'}`}>{member?.designation}</p>
                            </div>
                            <div className="flex gap-4 pl-6">
                                {[
                                    { Icon: FaFacebookF, link: member?.facebook },
                                    { Icon: FaInstagram, link: member?.instagram },
                                    { Icon: FaTwitter, link: member?.twitter }, 
                                    { Icon: FaLinkedin, link: member?.linkedin }
                                ].filter(({link}) => link).map(({Icon, link}) => (
                                    <a 
                                        target='_blank'
                                        href={link} 
                                        className={`
                                            w-10 h-10 rounded-full 
                                            flex items-center justify-center
                                            transition-colors duration-300 ease-in-out
                                            ${activeSlide === index 
                                                ? 'bg-[#F5F5F9] text-black hover:bg-black hover:text-white' 
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