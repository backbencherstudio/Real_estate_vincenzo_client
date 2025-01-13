import { CircleX } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';

const MaintenanceForm = ({close}) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">

            {/* Form Container */}
            <div className="bg-white rounded-lg shadow-lg p-10 w-full max-w-3xl">
                <button onClick={close} className='float-end hover:text-red-500 duration-300'>
                    <CircleX />
                </button>
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Add Maintenance Request</h2>
                <form onSubmit={handleSubmit((data) => console.log(data))} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Property Name */}
                    <div className="relative col-span-2">
                        <input
                            type="text"
                            placeholder="Property Name*"
                            className="peer w-full px-4 py-5 border border-gray-300 rounded-lg placeholder-transparent focus:outline-none focus:border-blue-500"
                            {...register("propertyName", { required: "Property Name is required" })}
                        />
                        <label className="absolute left-4 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500">
                            Property Name*
                        </label>
                        {errors.propertyName && <span className="text-red-500 text-sm">{errors.propertyName.message}</span>}
                    </div>

                    {/* Select Unit No */}
                    <div className="relative col-span-2 md:col-span-1">
                        <select
                            className="peer w-full px-4 py-5 border border-gray-300 rounded-lg placeholder-transparent focus:outline-none focus:border-blue-500"
                            {...register("unitNo", { required: "Unit Number is required" })}
                        >
                            <option value="" hidden>
                                Select One
                            </option>
                            <option value="Unit 1">Unit 1</option>
                            <option value="Unit 2">Unit 2</option>
                            <option value="Unit 3">Unit 3</option>
                        </select>
                        <label className="absolute left-4 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500">
                            Select Unit No*
                        </label>
                        {errors.unitNo && <span className="text-red-500 text-sm">{errors.unitNo.message}</span>}
                    </div>

                    {/* Issue Type */}
                    <div className="relative col-span-2 md:col-span-1">
                        <select
                            className="peer w-full px-4 py-5 border border-gray-300 rounded-lg placeholder-transparent focus:outline-none focus:border-blue-500"
                            {...register("issueType", { required: "Issue Type is required" })}
                        >
                            <option value="" hidden>
                                Select Issue
                            </option>
                            <option value="Electrical">Electrical Problems</option>
                            <option value="Plumbing">Plumbing Issues</option>
                            <option value="Other">Other</option>
                        </select>
                        <label className="absolute left-4 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500">
                            Issue Type*
                        </label>
                        {errors.issueType && <span className="text-red-500 text-sm">{errors.issueType.message}</span>}
                    </div>

                    {/* Date */}
                    <div className="relative col-span-2 md:col-span-1">
                        <input
                            type="text"
                            placeholder="Date*"
                            className="peer w-full px-4 py-5 border border-gray-300 rounded-lg placeholder-transparent focus:outline-none focus:border-blue-500"
                            {...register("date", { required: "Date is required" })}
                        />
                        <label className="absolute left-4 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500">
                            Date*
                        </label>
                        {errors.date && <span className="text-red-500 text-sm">{errors.date.message}</span>}
                    </div>

                    {/* Image Attach */}
                    <div className="relative col-span-2 md:col-span-1">
                        <input
                            type="file"
                            className="peer w-full px-4 py-5 border border-gray-300 rounded-lg placeholder-transparent focus:outline-none focus:border-blue-500"
                            {...register("image", { required: "Please attach an image" })}
                        />
                        <label className="absolute left-4 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500">
                            Image Attach*
                        </label>
                        {errors.image && <span className="text-red-500 text-sm">{errors.image.message}</span>}
                    </div>

                    {/* Description */}
                    <div className="relative col-span-2">
                        <textarea
                            placeholder="Description*"
                            className="peer w-full px-4 py-5 border border-gray-300 rounded-lg placeholder-transparent focus:outline-none focus:border-blue-500 resize-none"
                            rows="4"
                            {...register("description", { required: "Description is required" })}
                        ></textarea>
                        <label className="absolute left-4 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500">
                            Description*
                        </label>
                        {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
                    </div>

                    {/* Submit Button */}
                    <div className="col-span-2">
                        <button
                            type="submit"
                            className="py-5 px-6 bg-gradient-to-l to-[#4A90E2] from-[#1565C0] active:translate-y-0.5 duration-150 text-white rounded-md font-bold"
                        >
                            Submit Request 
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MaintenanceForm;
