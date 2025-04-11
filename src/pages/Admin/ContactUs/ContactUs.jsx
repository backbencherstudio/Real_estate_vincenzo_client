import { useEffect, useState } from 'react';
import { Trash2, Mail, User, Phone, MessageSquare } from 'lucide-react';
import authApi from '../../../redux/fetures/auth/authApi';
import Swal from 'sweetalert2';
import { toast } from 'sonner';
import { Spin } from 'antd';
import { FaDatabase } from 'react-icons/fa';
import moment from 'moment';

export default function ContactUs() {
    const { data, isLoading, refetch } = authApi.useGetContactUsQuery()
    const [deleteContactUs, { isLoading: deleteIsloadingData }] = authApi.useDeleteContactUsMutation()
    const [selectedId, setSelectedId] = useState("")

    useEffect(() => {
        refetch();
    }, []);

    const handleDelete = (id) => {
        setSelectedId(id)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await deleteContactUs(id);
                if (res?.data?.success) {
                    toast.success(res?.data?.message);
                }
            }
        });
    };

    if (isLoading) {
        return <div className='h-[50vh] flex items-center justify-center ' > <h2 className='text-xl font-semibold' >Loading...</h2> </div>
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {
                data?.data?.length !== 0 &&
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Contact Us Data</h1>
            }

            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {data?.data?.map(item => (
                    <div
                        key={item._id}
                        className="flex flex-col bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-500 ease-in-out"
                    >
                        {/* Card Header */}
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 text-white relative">
                            <h2 className="text-2xl font-bold mb-1">Contact Details</h2>
                            <p className="text-blue-100 text-sm">Contact information card</p>

                            {/* Delete Button */}
                            <button
                                onClick={() => handleDelete(item._id)}
                                className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transform transition-all duration-300 hover:rotate-12 hover:scale-110 focus:outline-none"
                                aria-label="Delete contact"
                            >
                                {
                                    item?._id === selectedId && deleteIsloadingData ? <Spin /> : <Trash2 size={20} />
                                }

                            </button>
                        </div>

                        {/* Card Content - Using flex-grow to push footer down */}
                        <div className="flex-grow p-2">
                            <div className="flex items-center space-x-3 p-1 hover:bg-gray-50 rounded-lg transition-colors duration-300">
                                <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                                    <User size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Full Name</p>
                                    <p className="font-medium">{item?.fullName}</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3 p-1 hover:bg-gray-50 rounded-lg transition-colors duration-300">
                                <div className="bg-purple-100 p-2 rounded-full text-purple-600">
                                    <Mail size={20} />
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-sm text-gray-500">Email</p>
                                    <p className="font-medium truncate">{item?.email}</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3 p-1 hover:bg-gray-50 rounded-lg transition-colors duration-300">
                                <div className="bg-green-100 p-2 rounded-full text-green-600">
                                    <Phone size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Mobile Number</p>
                                    <p className="font-medium">{item?.mobileNumber}</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3 p-1 hover:bg-gray-50 rounded-lg transition-colors duration-300">
                                <div className="bg-amber-100 p-2 rounded-full text-amber-600">
                                    <MessageSquare size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Message</p>
                                    <p className="font-medium">{item?.message}</p>
                                </div>
                            </div>
                        </div>

                        {/* Card Footer - Will always be at the bottom */}
                        <div className="bg-gray-50 p-4 border-t border-gray-100 mt-auto">
                            <p className="text-sm text-gray-500 text-center">Contact added on { moment(item.createdAt).format("DD MMMM YYYY h:mm A")}</p>
                        </div>
                    </div>
                ))}
            </div>

            {data?.data?.length === 0 && (
                <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl shadow mt-6">
                    <div className="p-4 bg-blue-100 rounded-full mb-4">
                        <FaDatabase size={32} className="text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">No Data Available </h3>
                    <p className="text-gray-500 text-center mt-2">All contact Us have been deleted</p>
                </div>
            )}
        </div>
    );
}