import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/fetures/auth/authSlice";
import authApi from "../../../redux/fetures/auth/authApi";
import { url } from "../../../globalConst/const";
import { Avatar } from "antd";
import { UserOutlined, StarFilled, StarOutlined } from "@ant-design/icons";
import ownerApi from "../../../redux/fetures/owner/ownerApi";
import { toast } from "sonner";

const ReviewForm = () => {
    const currentUser = useSelector(selectCurrentUser);
    const { data } = authApi.useGetSingleUserInfoQuery(currentUser?.email);
    const [createReviewFromOwner] = ownerApi.useCreateReviewFromOwnerMutation();
    const [hoverRating, setHoverRating] = useState(0);
    const [selectedRating, setSelectedRating] = useState(0);
    const [message, setMessage] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue
    } = useForm();

    const onSubmit = async (formData) => {
        const review = ({
            ...formData,
            image: data?.data?.profileImage,
            name: data?.data?.name,
            email: data?.data?.email,
            reating: selectedRating
        });

        const res = await createReviewFromOwner(review);
        if (res?.data?.success) {
            toast.success(res?.data?.message);
            reset();
            setMessage('')
            setSelectedRating(0);
        }
    };

    const handleRatingClick = (rating) => {
        setSelectedRating(rating);
        setValue("reating", rating);
    };

    const handleMessageChange = (e) => {
        const text = e.target.value;
        if (text.length <= 300) {
            setMessage(text);
        }
    };

    return (
        <div className=" mx-auto bg-white rounded-xl shadow-lg overflow-hidden ">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white text-center">
                <h2 className="text-xl font-bold">Share Your Experience</h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                {/* User Profile Section */}
                <div className="flex items-center space-x-4 mb-6">
                    {data?.data?.profileImage ? (
                        <img
                            src={`${url}${data?.data?.profileImage}`}
                            className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
                            alt="Profile"
                        />
                    ) : (
                        <Avatar
                            size={64}
                            icon={<UserOutlined />}
                            className="bg-blue-500"
                        />
                    )}
                    <div>
                        <p className="font-medium text-gray-800">{data?.data?.name}</p>
                        <p className="text-sm text-gray-500">{data?.data?.email}</p>
                    </div>
                </div>

                {/* Rating Section */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rating:
                    </label>
                    <div className="flex space-x-2">
                        {[1, 2, 3, 4, 5].map((rating) => (
                            <button
                                key={rating}
                                type="button"
                                onMouseEnter={() => setHoverRating(rating)}
                                onMouseLeave={() => setHoverRating(0)}
                                onClick={() => handleRatingClick(rating)}
                                className="focus:outline-none transition-transform transform hover:scale-110"
                            >
                                {rating <= (hoverRating || selectedRating) ? (
                                    <StarFilled className="text-yellow-400 text-2xl" />
                                ) : (
                                    <StarOutlined className="text-gray-300 text-2xl" />
                                )}
                            </button>
                        ))}
                    </div>
                    <input
                        type="hidden"
                        {...register("reating", { required: "Rating is required" })}
                    />
                    {errors.reating && (
                        <p className="text-red-500 text-sm mt-1">{errors.reating.message}</p>
                    )}
                </div>

                {/* Message Field */}
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Message:
                </label>
                <textarea
                    rows={4}
                    maxLength={300} // Restrict to 200 characters
                    placeholder="Share your thoughts and experience..."
                    {...register("message", {
                        required: "Message is required",
                        maxLength: {
                            value: 300,
                            message: "Message cannot exceed 200 characters",
                        },
                    })}
                    value={message}
                    onChange={handleMessageChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className={`text-sm ${message.length === 300 ? 'text-red-500' : 'text-gray-500'}`}>
                    {message.length}/300 characters
                </p>
                {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                )}
            </div>

                {/* Designation Field */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Designation:
                    </label>
                    <input
                        type="text"
                        placeholder="Your role or title"
                        {...register("designation", { required: "Designation is required" })}
                        className="w-full px-3 py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.designation && (
                        <p className="text-red-500 text-sm mt-1">{errors.designation.message}</p>
                    )}
                </div>

                {/* Name Field (Read Only) */}
                <input
                    type="hidden"
                    {...register("name")}
                    defaultValue={data?.data?.name}
                />

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-fit bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-md hover:opacity-90 transition-opacity font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Submit Review
                </button>
            </form>
        </div>
    );
};

export default ReviewForm;