/* eslint-disable react/no-unescaped-entities */
import { useSelector } from "react-redux";
import authApi from "../../redux/fetures/auth/authApi";
import { selectCurrentUser } from "../../redux/fetures/auth/authSlice";
import { MapPin, UserPen } from "lucide-react";
import { Link } from "react-router-dom";
import { url } from "../../globalConst/const";
import { FaRegUser } from "react-icons/fa";
import Swal from "sweetalert2";
import { toast } from "sonner";
import tenantApi from "../../redux/fetures/tenant/tenantApi";
import adminApi from "../../redux/fetures/admin/adminApi";
import { Button } from "antd";
import { useForm } from "react-hook-form";
import { skipToken } from "@reduxjs/toolkit/query";

const UserProfile = () => {
    const currentUser = useSelector(selectCurrentUser);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const { data, isLoading, error } = authApi.useGetSingleUserInfoQuery(
        currentUser?.email,
        {
            pollingInterval: 20000
        }
    );
    const [cancelsubscription] = authApi.useCancelsubscriptionMutation();

    let tenantWithOwnerData
    if (currentUser?.role === "tenant") {
        const { data: tenantDatas } = tenantApi.useGetTenantDetailseQuery(currentUser?.userId);
        tenantWithOwnerData = tenantDatas?.data?.ownerId
    }
    const { data: getPlanData } = adminApi.useGetPlanQuery(currentUser.role !== "admin" && skipToken)

    console.log(getPlanData);
    

    const [planData] = adminApi.useCreatePlanMutation()

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error fetching user information</p>;


    const userInfo = data?.data || {};
    const {
        name,
        email,
        profileImage,
        permanentAddress,
        personalInfo,
        numberOfProperty,
        numberOfTotalUnits,
        totalAmount,
        totalRentAmount,
    } = userInfo;

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

    const onSubmit = async (formData) => {
        const updatedData = {
            starter: formData.starter ?? getPlanData?.data?.[0]?.starter ?? 0,
            growth: formData.growth ?? getPlanData?.data?.[0]?.growth ?? 0,
            professional: formData.professional ?? getPlanData?.data?.[0]?.professional ?? 0,
        };

        const res = await planData(updatedData);
        if (res.data.success) {
            toast.success(res.data.message);
            reset()
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="col-span-3">
                {
                    currentUser.role === "admin" &&
                    <div className=" mx-auto p-6 bg-white rounded-xl shadow-lg border">
                        <h2 className="text-xl font-semibold text-center mb-4">Subscription Plans</h2>
                        <form onSubmit={handleSubmit(onSubmit)} noValidate>

                            <div className="mb-4">
                                <label htmlFor="starter" className="block text-sm font-medium text-gray-700">
                                    Starter
                                </label>
                                <input
                                    {...register("starter", {
                                        valueAsNumber: true,
                                        required: "Starter plan price is required",
                                    })}
                                    type="number"
                                    id="starter"
                                    placeholder={`Enter Starter Plan Price . Resent Price ${getPlanData?.data?.[0]?.starter ?? 0} `}
                                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                                />
                                {errors.starter && (
                                    <p className="text-red-500 text-sm">{errors.starter?.message}</p>
                                )}
                            </div>

                            {/* Growth Plan Field */}
                            <div className="mb-4">
                                <label htmlFor="growth" className="block text-sm font-medium text-gray-700">
                                    Growth
                                </label>
                                <input
                                    {...register("growth", {
                                        valueAsNumber: true,
                                        required: "Growth plan price is required",
                                    })}
                                    type="number"
                                    id="growth"
                                    placeholder={`Enter Growth Plan Price . Resent Price ${getPlanData?.data?.[0]?.growth ?? 0} `}
                                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                                />
                                {errors.growth && (
                                    <p className="text-red-500 text-sm">{errors.growth?.message}</p>
                                )}
                            </div>

                            {/* Professional Plan Field */}
                            <div className="mb-4">
                                <label htmlFor="professional" className="block text-sm font-medium text-gray-700">
                                    Professional
                                </label>
                                <input
                                    {...register("professional", {
                                        valueAsNumber: true,
                                        required: "Professional plan price is required",
                                    })}
                                    type="number"
                                    id="professional"
                                    placeholder={`Enter Professional Plan Price . Resent Price ${getPlanData?.data?.[0]?.professional ?? 0} `}
                                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                                />
                                {errors.professional && (
                                    <p className="text-red-500 text-sm">{errors.professional?.message}</p>
                                )}
                            </div>

                            <Button type="primary" htmlType="submit" block>
                                Submit
                            </Button>
                        </form>
                    </div>
                }
                {
                    currentUser.role === "tenant" &&
                    <div className=" bg-white rounded-lg shadow-md h-full">
                        <div className="relative h-32 bg-gradient-to-r from-blue-500 to-blue-600">
                            <div className="absolute -bottom-12 left-6">
                                <div className="h-24 w-24 rounded-full border-4 border-white overflow-hidden bg-gray-100">
                                    <img
                                        src={`${url}${tenantWithOwnerData?.profileImage}`}
                                        alt={tenantWithOwnerData?.name}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-16 pb-6 px-6">
                            <div className="space-y-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                        {tenantWithOwnerData?.name}
                                    </h2>
                                    <p className="text-sm text-gray-500">Property Owner</p>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-start gap-2">
                                        <MapPin className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
                                        <div className="space-y-1">
                                            <p className="text-gray-700">{tenantWithOwnerData?.permanentAddress?.address}</p>
                                            <p className="text-gray-600">
                                                {tenantWithOwnerData?.permanentAddress?.city}, {tenantWithOwnerData?.permanentAddress?.state}
                                            </p>
                                            <p className="text-gray-600">{tenantWithOwnerData?.permanentAddress?.country}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                }
            </div>
            <div className={`${currentUser.role === "tenant" ? "col-span-8" : "col-span-12"} bg-white p-4  md:p-8 rounded-lg shadow-sm`}>
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

                    <div>

                        <div className="mb-6">
                            <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                                💰 Your Current Paid Amount <span className="text-[10px] uppercase font-bold text-green-600 mx-2 " >( rent )</span> :                                
                                <span className="text-blue-600 font-bold flex ml-2 "> ${data?.data?.paidAmount ?? "0.00"} <Link to="/owner/Withdraw" className="ml-4 text-[14px] text-green-500 border rounded-lg px-2 " >Withdrow Request</Link>  </span>
                            </h2>
                        </div>
                        

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




                    </div>
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
