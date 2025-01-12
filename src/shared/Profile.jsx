import React from 'react';

const Profile = () => {
    return (
        <div className='bg-white p-8'>
            <form action="">
                {/* this will add image */}
                <div className='w-20 h-20 bg-slate-400 rounded-full mb-12'>
                    <img src="" alt="" />
                </div>
                <div className='grid grid-cols-1  lg:grid-cols-12 gap-6'>
                    <div className="relative col-span-6">
                        <input
                            type="text"
                            className="peer w-full px-3 py-4 text-[#64636A] text-base font-bold border rounded-lg placeholder-transparent focus:outline-none focus:border-blue-500"
                        />
                        <label
                            htmlFor=''
                            className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500"
                        >
                            Full Name*
                        </label>

                    </div>
                    <div className="relative col-span-6">
                        <input
                            type="text"
                            className="peer w-full px-3 py-4 text-[#64636A] text-base font-bold border rounded-lg placeholder-transparent focus:outline-none focus:border-blue-500"
                        />
                        <label
                            htmlFor=''
                            className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500"
                        >
                            Email*
                        </label>

                    </div>
                    <div className="relative col-span-6">
                        <input
                            type="text"
                            className="peer w-full px-3 py-4 text-[#64636A] text-base font-bold border rounded-lg placeholder-transparent focus:outline-none focus:border-blue-500"
                        />
                        <label
                            htmlFor=''
                            className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500"
                        >
                            Phone No*
                        </label>
                    </div>
                    <div className="relative col-span-6">
                        <input
                            type="date"
                            className="peer w-full px-3 py-4 text-[#64636A] text-base font-bold border rounded-lg placeholder-transparent focus:outline-none focus:border-blue-500"
                        />
                        <label
                            htmlFor=''
                            className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500"
                        >
                            Date Of Birth*
                        </label>
                    </div>
                    <div className="relative col-span-6 lg:col-span-4">
                        <input
                            type="text"
                            className="peer w-full px-3 py-4 text-[#64636A] text-base font-bold border rounded-lg placeholder-transparent focus:outline-none focus:border-blue-500"
                        />
                        <label
                            htmlFor=''
                            className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500"
                        >
                            NID / Passport
                        </label>
                    </div>
                    
                    <div className="relative col-span-6 lg:col-span-4">
                        <input
                            type="text"
                            className="peer w-full px-3 py-4 text-[#64636A] text-base font-bold border rounded-lg placeholder-transparent focus:outline-none focus:border-blue-500"
                        />
                        <label
                            htmlFor=''
                            className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500"
                        >
                            Country*
                        </label>
                    </div>
                    <div className="relative col-span-6 lg:col-span-4">
                        <input
                            type="text"
                            className="peer w-full px-3 py-4 text-[#64636A] text-base font-bold border rounded-lg placeholder-transparent focus:outline-none focus:border-blue-500"
                        />
                        <label
                            htmlFor=''
                            className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500"
                        >
                            State*
                        </label>
                    </div>
                    <div className="relative col-span-6 lg:col-span-4">
                        <input
                            type="text"
                            className="peer w-full px-3 py-4 text-[#64636A] text-base font-bold border rounded-lg placeholder-transparent focus:outline-none focus:border-blue-500"
                        />
                        <label
                            htmlFor=''
                            className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500"
                        >
                            City*
                        </label>
                    </div>
                    <div className="relative col-span-6 lg:col-span-4">
                        <input
                            type="text"
                            className="peer w-full px-3 py-4 text-[#64636A] text-base font-bold border rounded-lg placeholder-transparent focus:outline-none focus:border-blue-500"
                        />
                        <label
                            htmlFor=''
                            className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500"
                        >
                            Address*
                        </label>
                    </div>
                    <div className="relative col-span-6 lg:col-span-4">
                        <input
                            type="text"
                            className="peer w-full px-3 py-4 text-[#64636A] text-base font-bold border rounded-lg placeholder-transparent focus:outline-none focus:border-blue-500"
                        />
                        <label
                            htmlFor=''
                            className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500"
                        >
                            Zip Code*
                        </label>
                    </div>
                    
                </div>
                <button type='submit' className='bg-gradient-to-l to-[#4A90E2] from-[#1565C0] text-white py-5 px-6 rounded-md mt-8 hover:scale-105 duration-300 '>
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default Profile;