import React from 'react';

const PaymentsDetails = () => {
    return (
        <div className=" p-6 flex items-center justify-center">
            <div className="w-full bg-white rounded-lg shadow-lg p-8">
                {/* Invoice Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                    <div className="space-y-2">
                        <h2 className="text-2xl font-semibold">Invoice Details</h2>
                        <p className="text-gray-500">Real Estate</p>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <span className="px-4 py-1 text-sm font-semibold bg-green-100 text-green-600 rounded-full">
                            Paid
                        </span>
                    </div>
                </div>

                {/* Customer Info */}
                <div className="border-b border-gray-200 pb-4 mb-4">
                    <h3 className="text-lg font-medium">Invoice To</h3>
                    <p className="text-gray-700">Andrew Paul</p>
                    <p className="text-gray-500">Sunset Villa Oceanview Estate</p>
                    <p className="text-gray-500">andrewpaul@gmail.com</p>
                    <p className="text-gray-500">27 NW New Vexmont, USA</p>
                </div>

                {/* Invoice Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2 w-full">
                        <p className="flex justify-between">
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
    );
};

export default PaymentsDetails;
