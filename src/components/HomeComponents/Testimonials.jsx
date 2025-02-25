import React from 'react';
import HeaderContent from '../Header/Header';
import landing from "../../assets/landing.svg"
import adminApi from '../../redux/fetures/admin/adminApi';
import { url } from '../../globalConst/const';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaStar } from 'react-icons/fa';

const Testimonials = () => {
    const { data } = adminApi.useGetAllReviewQuery();
    console.log(data?.data);
    const Contents = {
        title: "What Our Clients Say About Our Property Management Solutions",
        description: "Our clients love how our platform simplifies property management, enhancing communication and streamlining payments and maintenance.",
        buttonText: "Testimonial",
        images: [landing, landing],
    };

    const testimonialData = data?.data;
    console.log(testimonialData);

    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    return (
        <div className="max-w-7xl mx-auto py-16 px-4 lg:px-0">
            <div>
                <HeaderContent content={Contents} />
            </div>
            <div className="mt-12">
                <Slider {...settings}>
                    {testimonialData?.map((testimonial, index) => (
                        <div key={index} className="px-3">
                            <div className="bg-white p-6">
                                <div className="flex my-6 space-x-1">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar className={`w-4 h-4 ${i < testimonial?.reating ? 'text-black' : 'text-gray-300'}`} />
                                    ))}
                                </div>
                                <p className="text-[#726f85] mb-6">{testimonial.message}</p>
                                <div className="flex items-center gap-4">
                                    <div className="">
                                        <img src={`${url}${testimonial?.image}`} alt="testimonial" className="w-[52px] h-[52px] rounded-full" />
                                    </div>
                                    <div className="-mb-5">
                                        <h4 className="font-semibold text-lg">{testimonial?.name}</h4>
                                        <p className="text-gray-500">{testimonial?.designation}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default Testimonials;