import React from 'react';
import logo from './../../../assets/logo.svg'

const PaymentsDetails = () => {
    return (
        <div>
            {/* Header */}
            <div className="flex justify-between items-center mb-1">
                <h1 className="text-3xl font-semibold">Payments</h1>
            </div>
            <div className=" mb-6">
                <div className="text-sm text-gray-500">
                    Home / Payment Details / Checkout / invoice
                </div>
            </div>
            <div className="">
                <div className="w-full bg-white rounded-lg shadow-lg p-6">
                    {/* Invoice Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                        <div className="space-y-2">
                            <h2 className="text-2xl font-semibold mb-10">Invoice Details</h2>
                            <h2 className="flex items-center gap-2 text-xl">
                                <img src={logo} alt="" className="h-7 w-7" />
                                Real Estate </h2>
                        </div>
                        <div className="mt-4 md:mt-0">

                        </div>
                    </div>

                    <div className='flex justify-between'>
                        {/* Customer Info */}
                        <div>
                            <h3 className="text-lg font-medium  space-y-4">Invoice To</h3>
                            <p className='text-[#8390A2]'>Andrew Paul</p>
                            <p className='text-[#8390A2]'>Sunset Villa Oceanview Estate</p>
                            <p className='text-[#8390A2]'>andrewpaul@gmail.com</p>
                            <p className='text-[#8390A2]'>27 NW New Vexmont, USA</p>
                        </div>

                        {/* Invoice Details */}
                        <div className="">
                            <div className="w-56 space-y-4">
                                <p className="flex justify-between ">
                                    <span className="font-medium">Status:</span>
                                    <span className="px-3 py-0.5 text-sm font-semibold bg-green-100 text-green-600 rounded-md">
                                        Paid
                                    </span>
                                </p>
                                <p className="flex justify-between ">
                                    <span className="font-medium">Invoice No:</span>
                                    <span>#INV-089</span>
                                </p>
                                <p className="flex justify-between">
                                    <span className="font-medium">Invoice Month:</span>
                                    <span>July 2024</span>
                                </p>
                                <p className="flex justify-between">
                                    <span className="font-medium">End Date:</span>
                                    <span>31 July 2024</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Table Section */}
                    <div className="mt-6 overflow-x-auto">
                        <table className="min-w-full border border-gray-200 rounded-lg">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="text-left p-4 text-sm font-semibold text-gray-600">
                                        Transaction ID
                                    </th>
                                    <th className="text-left p-4 text-sm font-semibold text-gray-600">
                                        Invoice Type
                                    </th>
                                    <th className="text-left p-4 text-sm font-semibold text-gray-600">
                                        Date
                                    </th>
                                    <th className="text-left p-4 text-sm font-semibold text-gray-600">
                                        Amount
                                    </th>
                                    <th className="text-left p-4 text-sm font-semibold text-gray-600">
                                        Tax
                                    </th>
                                    <th className="text-left p-4 text-sm font-semibold text-gray-600">
                                        Total Amount
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="p-4 text-gray-800">#INV-089</td>
                                    <td className="p-4 text-gray-800">Property Rent</td>
                                    <td className="p-4 text-gray-800">30 Jun 2024</td>
                                    <td className="p-4 text-gray-800">$2,311.55</td>
                                    <td className="p-4 text-gray-800">$0.00</td>
                                    <td className="p-4 text-gray-800 font-semibold">$2,311.55</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Total Section */}
                    <div className="mt-6 flex justify-between text-lg font-medium">
                        <span>Total:</span>
                        <span>$2,311.55</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentsDetails;
