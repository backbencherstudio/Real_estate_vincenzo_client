import React from 'react';
import { useForm } from 'react-hook-form';
import { FaPlus } from "react-icons/fa6";

const Profile = () => {
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();

    // Watch for image preview
    const image = watch('image');

    const onSubmit = (data) => {
        console.log("Form Data Submitted: ", data); 
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setValue('image', reader.result); 
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className='bg-white p-8 rounded-2xl'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="relative w-20 h-20 mb-8">
                    <div className="w-full h-full bg-[#EBEFF5] rounded-full overflow-hidden">
                        {image ? (
                            <img
                                src={image}
                                alt="Selected"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-500">
                                No image
                            </div>
                        )}
                    </div>
                    <label htmlFor="fileInput" className="absolute bottom-0 -right-0">
                        <div className="bg-blue-600 flex justify-center items-center rounded-full p-1 cursor-pointer border-2 border-white">
                            <FaPlus className='text-white' />
                        </div>
                    </label>
                    <input
                        id="fileInput"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        {...register("imageFile")}
                        onChange={handleImageChange}
                    />
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
                    {/* Full Name */}
                    <div className="relative col-span-6">
                        <input
                            type="text"
                            placeholder="Full Name*"
                            className="peer w-full px-3 py-4 text-[#64636A] text-base font-bold border rounded-lg placeholder-transparent focus:outline-none focus:border-blue-500"
                            {...register("fullName", { required: "Full Name is required" })}
                        />
                        <label className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500">
                            Full Name*
                        </label>
                        {errors.fullName && <span className="text-red-500 text-sm">{errors.fullName.message}</span>}
                    </div>

                    {/* Email */}
                    <div className="relative col-span-6">
                        <input
                            type="email"
                            placeholder="Email*"
                            className="peer w-full px-3 py-4 text-[#64636A] text-base font-bold border rounded-lg placeholder-transparent focus:outline-none focus:border-blue-500"
                            {...register("email", { required: "Email is required", pattern: { value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, message: "Enter a valid email" } })}
                        />
                        <label className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500">
                            Email*
                        </label>
                        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                    </div>

                    {/* Phone No */}
                    <div className="relative col-span-6">
                        <input
                            type="tel"
                            placeholder="Phone No*"
                            className="peer w-full px-3 py-4 text-[#64636A] text-base font-bold border rounded-lg placeholder-transparent focus:outline-none focus:border-blue-500"
                            {...register("phone", { required: "Phone number is required" })}
                        />
                        <label className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500">
                            Phone No*
                        </label>
                        {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}
                    </div>

                    {/* Date of Birth */}
                    <div className="relative col-span-6">
                        <input
                            type="date"
                            className="peer w-full px-3 py-4 text-[#64636A] text-base font-bold border rounded-lg placeholder-transparent focus:outline-none focus:border-blue-500"
                            {...register("dob", { required: "Date of birth is required" })}
                        />
                        <label className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500">
                            Date Of Birth*
                        </label>
                        {errors.dob && <span className="text-red-500 text-sm">{errors.dob.message}</span>}
                    </div>

                    {/* NID / Passport */}
                    <div className="relative col-span-6 lg:col-span-4">
                        <input
                            type="text"
                            placeholder="NID / Passport"
                            className="peer w-full px-3 py-4 text-[#64636A] text-base font-bold border rounded-lg placeholder-transparent focus:outline-none focus:border-blue-500"
                            {...register("nid")}
                        />
                        <label className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500">
                            NID / Passport
                        </label>
                    </div>

                    {/* Country */}
                    <div className="relative col-span-6 lg:col-span-4">
                        <input
                            type="text"
                            placeholder="Country*"
                            className="peer w-full px-3 py-4 text-[#64636A] text-base font-bold border rounded-lg placeholder-transparent focus:outline-none focus:border-blue-500"
                            {...register("country", { required: "Country is required" })}
                        />
                        <label className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500">
                            Country*
                        </label>
                        {errors.country && <span className="text-red-500 text-sm">{errors.country.message}</span>}
                    </div>

                    {/* State */}
                    <div className="relative col-span-6 lg:col-span-4">
                        <input
                            type="text"
                            placeholder="State*"
                            className="peer w-full px-3 py-4 text-[#64636A] text-base font-bold border rounded-lg placeholder-transparent focus:outline-none focus:border-blue-500"
                            {...register("state", { required: "State is required" })}
                        />
                        <label className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500">
                            State*
                        </label>
                        {errors.state && <span className="text-red-500 text-sm">{errors.state.message}</span>}
                    </div>

                    {/* City */}
                    <div className="relative col-span-6 lg:col-span-4">
                        <input
                            type="text"
                            placeholder="City*"
                            className="peer w-full px-3 py-4 text-[#64636A] text-base font-bold border rounded-lg placeholder-transparent focus:outline-none focus:border-blue-500"
                            {...register("city", { required: "City is required" })}
                        />
                        <label className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500">
                            City*
                        </label>
                        {errors.city && <span className="text-red-500 text-sm">{errors.city.message}</span>}
                    </div>

                    {/* Address */}
                    <div className="relative col-span-6 lg:col-span-4">
                        <input
                            type="text"
                            placeholder="Address*"
                            className="peer w-full px-3 py-4 text-[#64636A] text-base font-bold border rounded-lg placeholder-transparent focus:outline-none focus:border-blue-500"
                            {...register("address", { required: "Address is required" })}
                        />
                        <label className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500">
                            Address*
                        </label>
                        {errors.address && <span className="text-red-500 text-sm">{errors.address.message}</span>}
                    </div>

                    {/* Zip Code */}
                    <div className="relative col-span-6 lg:col-span-4">
                        <input
                            type="text"
                            placeholder="Zip Code*"
                            className="peer w-full px-3 py-4 text-[#64636A] text-base font-bold border rounded-lg placeholder-transparent focus:outline-none focus:border-blue-500"
                            {...register("zipCode", { required: "Zip Code is required" })}
                        />
                        <label className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500">
                            Zip Code*
                        </label>
                        {errors.zipCode && <span className="text-red-500 text-sm">{errors.zipCode.message}</span>}
                    </div>
                </div>
                <button type='submit' className='bg-gradient-to-l to-[#4A90E2] from-[#1565C0] text-white py-5 px-6 rounded-md mt-8 hover:scale-105 duration-300'>
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default Profile;
