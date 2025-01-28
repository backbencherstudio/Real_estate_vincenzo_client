/* eslint-disable react/no-unescaped-entities */
import { useSelector } from "react-redux";
import authApi from "../../redux/fetures/auth/authApi";
import { selectCurrentUser } from "../../redux/fetures/auth/authSlice";
import { UserPen } from "lucide-react";
import { Link } from "react-router-dom";
import { url } from "../../globalConst/const";
import { FaRegUser } from "react-icons/fa";
import Swal from "sweetalert2";
import { toast } from "sonner";

const UserProfile = () => {
    const currentUser = useSelector(selectCurrentUser);
    const { data, isLoading, error } = authApi.useGetSingleUserInfoQuery(currentUser?.email);
    const [cancelsubscription] = authApi.useCancelsubscriptionMutation()

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error fetching user information</p>;

    console.log(data?.data);


    const userInfo = data?.data || {};
    const { name, email, profileImage, permanentAddress, personalInfo, numberOfProperty, numberOfTotalUnits, totalAmount, totalRentAmount } = userInfo;

    const cancelsubscriptionFun = async () => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't cancel your plan",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await cancelsubscription(currentUser?.customerId)
                if (res.data?.subscriptionId) {
                    toast.success(res.data.message)
                }
            }
        });


    }


    return (
        <div>
            <div className="bg-white p-4 md:p-8 rounded-lg shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4 mb-8">
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0 flex justify-center items-center ">
                        {
                            profileImage ?
                                <img
                                    src={`${url}${profileImage}`}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                                : <FaRegUser className="size-full p-4" />
                        }
                    </div>
                    <div className="flex-grow">
                        <h2 className="text-xl font-semibold">{name || "No Name"}</h2>
                        <p className="text-gray-500">{email || "No Email Provided"}</p>
                    </div>
                    <Link to='edit'>
                        <button>
                            <UserPen className="h-5 w-5 text-yellow-500" />
                        </button>
                    </Link>
                </div>

                {
                    currentUser.role === "owner" &&
                    <div className="p-4 bg-gray-50 rounded-md shadow-md mb-8">
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">
                            Summary of Your Subscription
                        </h2>
                        <p className="text-gray-700 ">
                            - <strong>Total Units:</strong> <span className="font-bold text-blue-700 text-xl"  >{data?.data?.getTotalUnit || 0}</span>
                        </p>
                        <p className="text-gray-700 ">
                            - <strong>Added Units:</strong> <span className="font-bold text-red-700 text-xl" >{data?.data?.numberOfTotalUnits || 0}</span>
                        </p>
                        <p className="text-gray-700  mb-4">
                            - <strong>Available Units to Add:</strong> <span className="font-bold text-green-700 text-xl" >{data?.data?.getTotalUnit - data?.data?.numberOfTotalUnits || 0}</span>
                        </p>
                        <div className="mt-4">
                            <p className="text-gray-700">
                                If you'd like to cancel your current plan, you can do so by clicking the button below.
                            </p>
                            <button
                                className="mt-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition font-semibold"
                                onClick={cancelsubscriptionFun}
                            >
                                Cancel Subscription
                            </button>
                        </div>
                    </div>

                    // <div>
                    //     <h2>You get total {data?.data?.getTotalUnit} Units </h2>
                    //     <h2>Your total booked units was {data?.data?.bookedUnitNumber} </h2>
                    //     <h2>Now You can add  {data?.data?.getTotalUnit - data?.data?.bookedUnitNumber} more units </h2>
                    //     <h2>If you want to cancel your plan <button className="font-bold text-red-600 " onClick={cancelsubscriptionFun} >click here</button> </h2>
                    // </div>
                }

                {
                    currentUser.role === "owner" &&

                    <div className="mb-6">
                        <h2 className="text-2xl font-extrabold text-gray-800 mb-4 text-center">Property Overview</h2>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="flex flex-col items-center bg-zinc-50 p-4 rounded-lg shadow-md">
                                <p className="text-3xl font-bold text-blue-600">{numberOfProperty || 0}</p>
                                <p className="text-gray-500 text-sm">Properties</p>
                            </div>
                            <div className="flex flex-col items-center bg-zinc-50 p-4 rounded-lg shadow-md">
                                <p className="text-3xl font-bold text-indigo-600">{numberOfTotalUnits || 0}</p>
                                <p className="text-gray-500 text-sm">Total Units</p>
                            </div>
                            <div className="flex flex-col items-center bg-zinc-50 p-4 rounded-lg shadow-md">
                                <p className="text-3xl font-bold text-green-600">{totalAmount || 0}</p>
                                <p className="text-gray-500 text-sm">Total Amount</p>
                            </div>
                            <div className="flex flex-col items-center bg-zinc-50 p-4 rounded-lg shadow-md">
                                <p className="text-3xl font-bold text-red-600">{totalRentAmount || 0}</p>
                                <p className="text-gray-500 text-sm">Total Rent</p>
                            </div>
                        </div>
                    </div>
                }


                {/* Info Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                        {personalInfo ? (
                            Object.entries(personalInfo).map(([key, value]) => (
                                <div
                                    key={key}
                                    className="flex flex-col sm:flex-row sm:justify-between pb-2"
                                >
                                    <span className="text-gray-600 capitalize mb-1 sm:mb-0">
                                        {key.replace(/([A-Z])/g, " $1").trim()}
                                    </span>
                                    <span className="font-medium">{value || "N/A"}</span>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No personal information available.</p>
                        )}
                    </div>



                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold mb-4">Permanent Address</h3>
                        {permanentAddress ? (
                            Object.entries(permanentAddress).map(([key, value]) => (
                                <div
                                    key={key}
                                    className="flex flex-col sm:flex-row sm:justify-between pb-2"
                                >
                                    <span className="text-gray-600 capitalize mb-1 sm:mb-0">
                                        {key.replace(/([A-Z])/g, " $1").trim()}
                                    </span>
                                    <span className="font-medium">{value || "N/A"}</span>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No permanent address available.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
