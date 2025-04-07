import { useForm } from 'react-hook-form';
import { FaPlus } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../redux/fetures/auth/authSlice';
import sharedApi from '../redux/fetures/sharedApi/sharedApi';
import { useState } from 'react';
import { toast } from 'sonner';
import { Select, Spin } from 'antd';
import { lastDueDateNumberOptionas } from '../constent/constent';

const Profile = () => {
    const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm();
    const [updateProfile, { isLoading }] = sharedApi.useUpdateProfileMutation();
    const [lastDueDateNumberValue, setLastDueDateNumberValue] = useState(null)



    const currentUser = useSelector(selectCurrentUser);
    const image = watch('image');
    const [imageFile, setImageFile] = useState()

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImageFile(file)

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setValue('image', reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = async (data) => {

        const formData = new FormData();
        formData.append("userId", currentUser.userId);
        formData.append("name", data.name);
        formData.append("personalInfo[contactNumber]", data.contactNumber);
        formData.append("personalInfo[age]", data.age);
        formData.append("personalInfo[familyMember]", data.familyMember);
        formData.append("personalInfo[jobTitle]", data.jobTitle);
        formData.append("permanentAddress[address]", data.address);
        formData.append("permanentAddress[city]", data.city);
        formData.append("permanentAddress[state]", data.state);
        formData.append("permanentAddress[zipCode]", data.zipCode);
        formData.append("permanentAddress[country]", data.country);
        formData.append("bankAccountNumber", data.bankAccountNumber);
        formData.append("routingNumber", data.routingNumber);
        // formData.append("lastDueDateNumber", parseInt(lastDueDateNumberValue) );

        if (lastDueDateNumberValue !== null) {
            formData.append("lastDueDateNumber", parseInt(lastDueDateNumberValue));
        }

        if (imageFile) {
            formData.append("profileImage", imageFile);
        }
        const res = await updateProfile(formData);
        if (res.data.success) {
            toast.success(res.data.message);
            reset();
            setLastDueDateNumberValue(null)
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
                            id="name"
                            placeholder="Full Name*"
                            className="peer w-full px-3 py-4 text-[#64636A] text-base font-bold border rounded-lg placeholder-transparent focus:outline-none focus:border-blue-500"
                            {...register("name")}
                        />
                        <label htmlFor='name' className="absolute left-3 -top-2.5 cursor-text bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500">
                            Full Name*
                        </label>
                        {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                    </div>
                    {/* Phone No */}
                    <div className="relative col-span-6">
                        <input
                            type="number"
                            id='contactNumber'
                            placeholder="contact Number"
                            className="peer w-full px-3 py-4 text-[#64636A] text-base font-bold border rounded-lg placeholder-transparent focus:outline-none focus:border-blue-500"
                            {...register("contactNumber")}
                        />
                        <label htmlFor='contactNumber' className="absolute left-3 -top-2.5 cursor-text bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500">
                            Contact No*
                        </label>
                        {errors.contactNumber && <span className="text-red-500 text-sm">{errors.contactNumber.message}</span>}
                    </div>

                    <div className={`relative col-span-6 ${currentUser.role==="owner" ? "xl:col-span-4" : "xl:col-span-6" }`}>
                        <input
                            type="text"
                            id="bankAccountNumber"
                            placeholder="Bank Account Number*"
                            className="peer w-full px-3 py-4 text-[#64636A] text-base font-bold border rounded-lg placeholder-transparent focus:outline-none focus:border-blue-500"
                            {...register("bankAccountNumber")}
                        />
                        <label htmlFor='bankAccountNumber' className="absolute left-3 -top-2.5 cursor-text bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500">
                            Bank Account Number*
                        </label>
                        {errors.bankAccountNumber && <span className="text-red-500 text-sm">{errors.bankAccountNumber.message}</span>}
                    </div>

                    {/* routingNumber No */}
                    <div className={`relative col-span-6 ${currentUser.role==="owner" ? "xl:col-span-4" : "xl:col-span-6" }`}>
                        <input
                            type="text"
                            id='routingNumber'
                            placeholder="Routing Number"
                            className="peer w-full px-3 py-4 text-[#64636A] text-base font-bold border rounded-lg placeholder-transparent focus:outline-none focus:border-blue-500"
                            {...register("routingNumber")}
                        />
                        <label htmlFor='routingNumber' className="absolute left-3 -top-2.5 cursor-text bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500">
                            Routing Number*
                        </label>
                        {errors.routingNumber && <span className="text-red-500 text-sm">{errors.routingNumber.message}</span>}
                    </div>

                    {
                        currentUser.role === "owner" &&
                        <div className="relative col-span-6 xl:col-span-4">
                            <Select
                                id="lastDueDateNumber"
                                options={lastDueDateNumberOptionas}
                                className='w-full h-[55px]'
                                placeholder="Select Date"
                                // {...register("lastDueDateNumber")}
                                onChange={(value) => setLastDueDateNumberValue(value)}
                            />
                            <label htmlFor="lastDueDateNumber" className="absolute left-3 -top-2.5 cursor-text bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500">
                                Set Tenant Payment Last Due Date*
                            </label>
                            {errors.lastDueDateNumber && <span className="text-red-500 text-sm">{errors.lastDueDateNumber.message}</span>}
                        </div>
                    }



                    <div className="relative col-span-6 xl:col-span-4">
                        <input
                            type="text"
                            id='jobTitle'
                            placeholder="Job Title*"
                            className="peer w-full px-3 py-4 text-[#64636A] text-base font-bold border rounded-lg placeholder-transparent focus:outline-none focus:border-blue-500"
                            {...register("jobTitle")}
                        />
                        <label htmlFor='jobTitle' className="absolute left-3 -top-2.5 cursor-text bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500">
                            Job Title*
                        </label>
                        {errors.jobTitle && <span className="text-red-500 text-sm">{errors.jobTitle.message}</span>}
                    </div>
                    <div className="relative col-span-6 xl:col-span-4">
                        <input
                            type="number"
                            id='age'
                            placeholder="age*"
                            className="peer w-full px-3 py-4 text-[#64636A] text-base font-bold border rounded-lg placeholder-transparent focus:outline-none focus:border-blue-500"
                            {...register("age")}
                        />
                        <label htmlFor='age' className="absolute left-3 -top-2.5 cursor-text bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500">
                            Age*
                        </label>
                        {errors.age && <span className="text-red-500 text-sm">{errors.age.message}</span>}
                    </div>
                    {/* family member */}
                    <div className="relative col-span-6 xl:col-span-4">
                        <input
                            type="number"
                            id='familyMember'
                            placeholder="Family Member*"
                            className="peer w-full px-3 py-4 text-[#64636A] text-base font-bold border rounded-lg placeholder-transparent focus:outline-none focus:border-blue-500"
                            {...register("familyMember")}
                        />
                        <label htmlFor='familyMember' className="absolute left-3 -top-2.5 cursor-text bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500">
                            Family Member*
                        </label>
                        {errors.familyMember && <span className="text-red-500 text-sm">{errors.familyMember.message}</span>}
                    </div>


                    {/* Country */}
                    <div className="relative col-span-6 lg:col-span-">
                        <input
                            type="text"
                            id='country'
                            placeholder="Country*"
                            className="peer w-full px-3 py-4 text-[#64636A] text-base font-bold border rounded-lg placeholder-transparent focus:outline-none focus:border-blue-500"
                            {...register("country")}
                        />
                        <label htmlFor='country' className="absolute left-3 -top-2.5 cursor-text bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500">
                            Country*
                        </label>
                        {errors.country && <span className="text-red-500 text-sm">{errors.country.message}</span>}
                    </div>

                    {/* State */}
                    <div className="relative col-span-6 lg:col-span-6">
                        <input
                            type="text"
                            id='state'
                            placeholder="State*"
                            className="peer w-full px-3 py-4 text-[#64636A] text-base font-bold border rounded-lg placeholder-transparent focus:outline-none focus:border-blue-500"
                            {...register("state")}
                        />
                        <label htmlFor='state' className="absolute left-3 -top-2.5 cursor-text bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500">
                            State*
                        </label>
                        {errors.state && <span className="text-red-500 text-sm">{errors.state.message}</span>}
                    </div>

                    {/* City */}
                    <div className="relative col-span-6 lg:col-span-4">
                        <input
                            type="text"
                            id='city'
                            placeholder="City*"
                            className="peer w-full px-3 py-4 text-[#64636A] text-base font-bold border rounded-lg placeholder-transparent focus:outline-none focus:border-blue-500"
                            {...register("city")}
                        />
                        <label htmlFor='city' className="absolute left-3 -top-2.5 cursor-text bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500">
                            City*
                        </label>
                        {errors.city && <span className="text-red-500 text-sm">{errors.city.message}</span>}
                    </div>

                    {/* Address */}
                    <div className="relative col-span-6 lg:col-span-4">
                        <input
                            type="text"
                            id='address'
                            placeholder="Address*"
                            className="peer w-full px-3 py-4 text-[#64636A] text-base font-bold border rounded-lg placeholder-transparent focus:outline-none focus:border-blue-500"
                            {...register("address")}
                        />
                        <label htmlFor='address' className="absolute left-3 -top-2.5 cursor-text bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500">
                            Address*
                        </label>
                        {errors.address && <span className="text-red-500 text-sm">{errors.address.message}</span>}
                    </div>

                    {/* Zip Code */}
                    <div className="relative col-span-6 lg:col-span-4">
                        <input
                            type="number"
                            id='zipCode'
                            placeholder="Zip Code*"
                            className="peer w-full px-3 py-4 text-[#64636A] text-base font-bold border rounded-lg placeholder-transparent focus:outline-none focus:border-blue-500"
                            {...register("zipCode")}
                        />
                        <label htmlFor='zipCode' className="absolute left-3 -top-2.5 cursor-text bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500">
                            Zip Code*
                        </label>
                        {errors.zipCode && <span className="text-red-500 text-sm">{errors.zipCode.message}</span>}
                    </div>
                </div>
                {
                    isLoading ?
                        <button
                            type="submit"
                            className="rounded-[12px] bg-gradient-to-r border border-[#4A90E2] p-4 md:p-5 font-medium text-lg"
                        >
                            <Spin size="large" />
                        </button>
                        :
                        <button type='submit' className='bg-gradient-to-l to-[#4A90E2] from-[#1565C0] text-white py-5 px-6 rounded-md mt-8 hover:scale-105 duration-300'>
                            Save Changes
                        </button>
                }
            </form>
        </div>
    );
};

export default Profile;
