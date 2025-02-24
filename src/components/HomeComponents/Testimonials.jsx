import React from 'react';
import HeaderContent from '../Header/Header';
import landing from "../../assets/landing.svg"
import adminApi from '../../redux/fetures/admin/adminApi';
import { url } from '../../globalConst/const';

const Testimonials = () => {
    const { data } = adminApi.useGetAllReviewQuery();
    console.log(data?.data);
    const Contents = {
        title: "What Our Clients Say About Our Property Management Solutions",
        description: "Our clients love how our platform simplifies property management, enhancing communication and streamlining payments and maintenance.",
        buttonText: "Testimonial",
        images: [landing, landing],
    };

    // const testimonialData = [
    //     {
    //         company: "FocalPoint",
    //         rating: 4,
    //         text: "As a property manager, this platform has greatly simplified our work. It streamlines tenant communication, rent collection, and maintenance requests, saving us time and keeping everything organized.",
    //         name: "Olivia Rhye",
    //         role: "Property Manager",
    //         image: "https://i.ibb.co.com/cLNJ0xR/converted-b539af53-086d-47b9-9dcd-7789a6bda741.jpg"
    //     },
    //     {
    //         company: "Sisyphus",
    //         rating: 4,
    //         text: "The platform has made managing multiple properties so much easier. The payment tracking and maintenance request system are incredibly user-friendly. Our tenants love the seamless communication, and we save so much time handling.",
    //         name: "Jhon Smith",
    //         role: "Property Manager",
    //         image: "https://i.ibb.co.com/64FD6zw/nafiz.jpg"
    //     },
    //     {
    //         company: "Luminous",
    //         rating: 4,
    //         text: "I've been in property management for years, but this platform has taken efficiency to the next level. The automated payment reminders and real-time updates on maintenance requests have reduced our workload significantly",
    //         name: "Olivia Rhye",
    //         role: "Property Manager",
    //         image: "https://i.ibb.co.com/xsrLHwb/converted-318e0b72-2e87-45d9-ad21-908528e0bdcb.jpg"
    //     }
    // ];
    const testimonialData = data?.data;
    console.log(testimonialData);
    return (
        <div className="max-w-7xl mx-auto py-16 px-4 lg:px-0">
            <div>
                <HeaderContent content={Contents} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                {testimonialData?.map((testimonial, index) => (
                    <div key={index} className="bg-white p-6 ">
                        {/* <div className="h-8 mb-4">
                            <span className="text-xl font-semibold">
                                <img src="https://i.ibb.co.com/TDFZdh7P/Group-2085665113.png" alt="" />
                            </span>
                        </div> */}
                        <div className="flex my-6">
                            {[...Array(5)].map((_, i) => (
                                <svg
                                    key={i}
                                    className={`w-5 h-5 ${i < testimonial?.reating ? 'text-black' : 'text-gray-300'}`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
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
                ))}
            </div>
        </div>
    );
};

export default Testimonials;