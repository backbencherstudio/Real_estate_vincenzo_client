import imagelogin from "../../../assets/loginpagegirlimage.png";
import iconimage from "../../../assets/loginiconimage.png";

function ResetPassword() {
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
              Reset Password
            </h3>
            <p className="text-[#64748B] font-manrope text-[14px] md:text-[15px] font-medium leading-[24px] tracking-[-0.15px] text-center lg:text-left">
              Enter Your Email for update password{" "}
            </p>
          </div>

          {/* Form Section */}
          <div className="pt-8 md:pt-10">
            {/* Email Field */}

            <div className="w-full max-w-md pb-5 flex items-center">
              {/* Icon */}
              <div className="w-8 h-8  flex items-center justify-center rounded-full mr-4">
                <svg
                  className="w-7 h-7 text-white te bg-blue-300 rounded-full p-1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              {/* Text Content */}
              <div>
                <p className="text-lg text-[#64748B]">
                  We sent a link to <br></br>
                  <span className="font-medium text-lg">hellodemo@gmail.com</span>
                </p>
                <p className="text-lg text-[#64748B]">
                  to update your password.
                </p>
              </div>
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
                name="email"
                className="w-full rounded-[12px] p-4 md:p-6 border-2 border-[#1565C0] bg-white"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="">
              <button className="rounded-[12px] bg-gradient-to-r from-[#4A90E2] to-[#1565C0] p-4 md:p-5 w-full text-white font-medium text-lg">
                Continue
              </button>
            </div>
          </div>
          {/* Sign in Link */}
          <div className="text-center pt-4">
            <p className="text-gray-600 text-lg md:text-base">
              Back to
              <a
                href="#"
                className="text-blue-600 hover:text-blue-800 font-medium pl-1"
              >
                Sign In
              </a>
            </p>
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

export default ResetPassword;
