import { Controller, useForm } from "react-hook-form";
import imagelogin from "../../../assets/loginpagegirlimage.png";
import iconimage from "../../../assets/loginiconimage.png";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Input, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../../../redux/fetures/auth/authApi";
import { useState } from "react";
import OTPVerification from "../OTPVerification/OTPVerification";
import { toast } from "sonner";
import Footer from "../../../shared/Footer/Footer";

function SignUp() {

  const [createUser, { isLoading: cIsLoading }] = authApi.useCreateUserMutation();
  const [verifyOTP, { isLoading: vIsLoading }] = authApi.useVerifyOTPMutation();
  const [showOTP, setShowOTP] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userData = {
      ...data
    }
    const result = await createUser(userData);

    if (result?.data?.success) {
      toast.success(result?.data?.message)
      setShowOTP(true);
    }
  };

  const handleVerifyOTP = async (otpValue) => {
    const otp = parseInt(otpValue)
    try {
      const result = await verifyOTP({ otp });
      if (result?.data?.success) {
        if(!result?.data?.data?.email){
          return toast.error("Registration failed. Please try again or reach out to support for assistance.")
        }
        localStorage.setItem("email", result?.data?.data?.email)     
        toast.success(result?.data?.message)
        setShowOTP(false);
        navigate("/subscription-plan")
      }
    } catch (error) {
      console.error('OTP verification failed:', error);
    }
  };


  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-16 px-4 md:px-8 lg:px-4 pt-8 md:pt-12 lg:pt-16"
      >
        <div className="w-full lg:w-[50%]">
          <Link to="/" className="flex items-center pb-6 justify-center lg:justify-start">
            <img className="mr-2 w-8 h-8" src={iconimage} alt="icon" />
            <h2 className="font-inter text-[22px] font-medium leading-[22px] tracking-[-0.88px] bg-gradient-to-r from-[#070127] to-[#A9A9A9] bg-clip-text text-transparent">
              Real estate
            </h2>
          </Link>

          <div>
            <h3 className="text-[#232323] font-inter text-[28px] md:text-[34px] font-semibold leading-[34px] tracking-[-0.68px] pb-4 text-center lg:text-left">
              Sign Up
            </h3>
            <p className="text-[#64748B] font-manrope text-[14px] md:text-[15px] font-medium leading-[24px] tracking-[-0.15px] text-center lg:text-left">
              Please Sign Up to continue to your account.
            </p>
          </div>
          <div className="pt-8 md:pt-10">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                {...register("name", { required: "Name is required" })}
                className={`w-full rounded-[12px] p-4 md:p-6 border-2 ${errors.name ? "border-red-500" : "border-[#1565C0]"
                  } bg-white`}
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

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
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
                className={`w-full rounded-[12px] p-4 md:p-6 border-2 ${errors.email ? "border-red-500" : "border-[#1565C0]"
                  } bg-white`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <Controller
                name="password"
                control={control}
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                }}
                render={({ field }) => (
                  <Input.Password
                    id="password"
                    className={`w-full rounded-[12px] p-4 md:p-6 border-2 ${errors.password ? "border-red-500" : "border-[#CDCDCD]"
                      } bg-white`}
                    placeholder="Password"
                    iconRender={(visible) =>
                      visible ? <FaRegEye /> : <FaRegEyeSlash />
                    }
                    {...field}
                  />
                )}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="pt-8">
              {
                cIsLoading ?
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
                    Sign Up
                  </button>

              }

              <div className="text-center pt-6">
                <p className="text-gray-600 text-sm md:text-base">
                  Already have an account?
                  <Link
                    to="/signin"
                    className="text-blue-600 hover:text-blue-800 font-medium pl-1"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[50%] flex justify-center">
          <img
            src={imagelogin}
            alt="login illustration"
            className="hidden lg:block w-full sm:max-w-[400px] md:max-w-[500px] lg:max-w-[663px] lg:h-auto object-contain"
          />
        </div>
      </form>

      <OTPVerification
        isOpen={showOTP}
        onClose={() => setShowOTP(false)}
        onVerify={handleVerifyOTP}
        vIsLoading={vIsLoading}
      />

      <Footer/>
    </>
  );
}

export default SignUp;
