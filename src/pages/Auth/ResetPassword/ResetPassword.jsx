import { useForm, Controller } from "react-hook-form";
import { Input, Spin } from "antd";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import imagelogin from "../../../assets/loginpagegirlimage.png";
import iconimage from "../../../assets/loginiconimage.png";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../../../redux/fetures/auth/authApi";
import { toast } from "sonner";
import { useState } from "react";
import OTPVerification from "../OTPVerification/OTPVerification";

function ResetPassword() {

  const [resetPassword, { isLoading: resetIsLoading }] = authApi.useResetPasswordMutation();
  const [verifyOtpForResetPassword, { isLoading: VOFRPisLoading }] = authApi.useVerifyOtpForResetPasswordMutation()
  const [showOTP, setShowOTP] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    }
  });


  const password = watch("password", "");

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const resetPasswordData = {
        email: data.email,
        password: data.password,
      }

      const result = await resetPassword(resetPasswordData);

      console.log(result);
      if (result?.data?.success) {
        toast.success(result?.data?.message)
        setShowOTP(true);
      }
    } catch (error) {
      console.error('Password reset failed:', error);
    }
  };


  const handleVerifyOTP = async (otpValue) => {
    const otp = parseInt(otpValue)

    try {
      const result = await verifyOtpForResetPassword({ otp });
      console.log(result);
      if (result?.data?.success) {
        toast.success(result?.data?.message)
        setShowOTP(false);
        navigate("/signin")
      } else if (!result?.data?.success) {
        // setShowOTP(false);
      }
    } catch (error) {
      console.error('OTP verification failed:', error);
    }
  };


  return (
    <>
      <div className="max-w-[1200px] mx-auto flex flex-col-reverse md:flex-row-reverse lg:flex-row items-center gap-8 lg:gap-10 px-4 md:px-8 lg:px-0 pt-8 md:pt-12 lg:pt-10">
        {/* Left Section */}
        <div className="w-full lg:w-[50%]">
          {/* Logo Section */}
          <div className="flex items-center pb-6 justify-center lg:justify-start">
            <img className="mr-2 w-8 h-8" src={iconimage} alt="icon" />
            <h2 className="font-inter text-[22px] font-medium leading-[22px] tracking-[-0.88px] bg-gradient-to-r from-[#070127] to-[#A9A9A9] bg-clip-text text-transparent">
              Real estate
            </h2>
          </div>

          {/* Header Section */}
          <div>
            <h3 className="text-[#232323] font-inter text-[28px] md:text-[34px] font-semibold leading-[34px] tracking-[-0.68px] pb-4 text-center lg:text-left">
              Reset Password
            </h3>
            <p className="text-[#64748B] font-manrope text-[14px] md:text-[15px] font-medium leading-[24px] tracking-[-0.15px] text-center lg:text-left">
              Enter Your Email for update password
            </p>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit(onSubmit)} className="pt-8 md:pt-10">
            {/* Email Field */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                className={`w-full rounded-[12px] p-4 md:p-6 border-2 ${errors.email ? "border-red-500" : "border-[#1565C0]"
                  } bg-white`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                New Password
              </label>
              <Controller
                name="password"
                control={control}
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters"
                  }
                }}
                render={({ field }) => (
                  <Input.Password
                    {...field}
                    id="password"
                    className={`w-full rounded-[12px] p-4 md:p-6 border-2 ${errors.password ? "border-red-500" : "border-[#1565C0]"
                      } bg-white`}
                    placeholder="Enter your new password"
                    iconRender={(visible) => (visible ? <FaRegEye /> : <FaRegEyeSlash />)}
                  />
                )}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <Controller
                name="confirmPassword"
                control={control}
                rules={{
                  required: "Please confirm your password",
                  validate: value => value === password || "Passwords do not match"
                }}
                render={({ field }) => (
                  <Input.Password
                    {...field}
                    id="confirmPassword"
                    className={`w-full rounded-[12px] p-4 md:p-6 border-2 ${errors.confirmPassword ? "border-red-500" : "border-[#1565C0]"
                      } bg-white`}
                    placeholder="Confirm your new password"
                    iconRender={(visible) => (visible ? <FaRegEye /> : <FaRegEyeSlash />)}
                  />
                )}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>


            {
              resetIsLoading ?
                <button
                  type="submit"
                  className="rounded-[12px] bg-gradient-to-r border border-[#4A90E2] p-4 md:p-5 w-full  font-medium text-lg"
                >
                  <Spin size="large" />
                </button>
                :
                <button
                  type="submit"
                  className="rounded-[12px] bg-gradient-to-r from-[#4A90E2] to-[#1565C0] p-4 md:p-5 w-full text-white font-medium text-lg"
                >
                  Continue
                </button>

            }


          </form>

          {/* Sign in Link */}
          <div className="text-center pt-4">
            <p className="text-gray-600 text-lg md:text-base">
              Back to
              <Link
                to="/signin"
                className="text-blue-600 hover:text-blue-800 font-medium pl-1"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-[50%] flex justify-center">
          <img
            src={imagelogin}
            alt="login illustration"
            className="w-full sm:max-w-[400px] md:max-w-[500px] lg:max-w-[663px] lg:h-auto object-contain"
          />
        </div>
      </div>

      <OTPVerification
        isOpen={showOTP}
        onClose={() => setShowOTP(false)}
        onVerify={handleVerifyOTP}
        vIsLoading={VOFRPisLoading}
      />

      {/* Footer Copyright */}
      <footer className="text-center lg:mt-10 py-4 text-sm text-gray-400">
        <p>© 2024 Copyright - All rights reserved by Real estate</p>
      </footer>
    </>
  );
}

export default ResetPassword;