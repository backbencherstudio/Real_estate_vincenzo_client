import imagelogin from "../../../assets/loginpagegirlimage.png";
import iconimage from "../../../assets/loginiconimage.png";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Input } from "antd";

function SignUp() {
  return (
    <>
      <div className="max-w-[1300px] mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-16 px-4 md:px-8 lg:px-0 pt-8 md:pt-12 lg:pt-16">
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
              Sign Up
            </h3>
            <p className="text-[#64748B] font-manrope text-[14px] md:text-[15px] font-medium leading-[24px] tracking-[-0.15px] text-center lg:text-left">
              Please Sign Up to continue to your account.
            </p>
          </div>

          {/* Form Section */}
          <div className="pt-8 md:pt-10">
            {/* Email Field */}
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
                name="name"
                className="w-full rounded-[12px] p-4 md:p-6 border-2 border-[#1565C0] bg-white"
                placeholder="Enter your email"
                required
              />
            </div>
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
                name="email"
                className="w-full rounded-[12px] p-4 md:p-6 border-2 border-[#1565C0] bg-white"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <Input.Password
                className="w-full rounded-[12px] p-4 md:p-6 border-2 border-[#CDCDCD] bg-white"
                placeholder="Password"
                iconRender={(visible) =>
                  visible ? <FaRegEye /> : <FaRegEyeSlash />
                }
              />
            </div>

            {/* Uncommented Section for Buttons */}
            <div className="pt-8">
              <button className="rounded-[12px] bg-gradient-to-r from-[#4A90E2] to-[#1565C0] p-4 md:p-5 w-full text-white font-medium text-lg">
                Sign Up
              </button>

              {/* Forgot Password */}
              <div>
                <p className="text-[#070127] font-inter text-[14px] md:text-[16px] font-normal leading-[1.4] text-right pt-2 md:pt-5">
                  Forgot Password?
                </p>
              </div>

              {/* Divider */}
              {/* <div className="flex items-center my-6">
                            <div className="flex-grow border-t border-gray-300"></div>
                            <span className="mx-4 text-gray-500">or</span>
                            <div className="flex-grow border-t border-gray-300"></div>
                        </div> */}

              {/* Sign In with Google */}
              {/* <button className="w-full flex items-center justify-center py-4 px-2 border border-gray-300 rounded-full shadow-sm bg-white hover:bg-gray-50 active:bg-gray-200">
                            <span className="text-base font-medium text-gray-700">Sign in with Google</span>
                        </button> */}

              {/* Sign Up Link */}
              {/* <div className="text-center pt-6">
                            <p className="text-gray-600 text-sm md:text-base">
                                Don’t have an account?
                                <a href="#" className="text-blue-600 hover:text-blue-800 font-medium pl-1">
                                    Sign Up
                                </a>
                            </p>
                        </div> */}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-[50%] flex justify-center">
          <img
            src={imagelogin}
            alt="login illustration"
            className="lg:w-[663px lg:h-[852px] max-w-[500px] object-contain"
          />
        </div>
      </div>
      {/* Footer Copyright */}
      <footer className="text-center lg:mt-10  py-4 text-sm text-gray-400">
        <p>© 2024 Copyright - All rights reserved by Real estate</p>
      </footer>
    </>
  );
}

export default SignUp;
