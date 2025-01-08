// import imageright from "../../assets/imageright.png";
import dolaricon from "../../assets/money-recive.png";
import bgimage from "../../assets/authbackground.png"

const Auth = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      {/* Header Section */}
      <div className="text-center pt-12 px-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
          Select Account Type To Get Started
        </h2>
        <p className="mt-2 text-gray-500 text-sm md:text-base">
          Communicate your best with videos auto-enhanced by AI and intuitive
          editing
        </p>
      </div>

      {/* Main Section */}
      <div className="w-full max-w-[1100px] flex flex-col lg:flex-row lg:items-start justify-between  lg:gap-12 mx-auto mt-10 lg:mt-4 px-4 md:px-8">
        {/* Left: Account Type Selection */}
        <div className="w-full lg:w-1/3 space-y-4">
          {/* Static Account Type Buttons with Hover Effects */}
          <div className="flex items-center p-5 border rounded-xl shadow-sm bg-white border-gray-200 hover:bg-blue-50 hover:border-blue-500 cursor-pointer transition-all duration-300">
            <div className="w-8 h-8 bg-blue-100 flex items-center justify-center rounded-full mr-4">
              <img className="w-5 h-5" src={dolaricon} alt="Tenant icon" />
            </div>
            <span className="text-base font-medium text-gray-800 hover:text-blue-600">
              Tenant
            </span>
          </div>

          <div className="flex items-center p-5 border rounded-xl shadow-sm bg-white border-gray-200 hover:bg-blue-50 hover:border-blue-500 cursor-pointer transition-all duration-300">
            <div className="w-8 h-8 bg-blue-100 flex items-center justify-center rounded-full mr-4">
              <img className="w-5 h-5" src={dolaricon} alt="Owner icon" />
            </div>
            <span className="text-base font-medium text-gray-800 hover:text-blue-600">
              Owner
            </span>
          </div>

          <div className="flex items-center p-5 border rounded-xl shadow-sm bg-white border-gray-200 hover:bg-blue-50 hover:border-blue-500 cursor-pointer transition-all duration-300">
            <div className="w-8 h-8 bg-blue-100 flex items-center justify-center rounded-full mr-4">
              <img className="w-5 h-5" src={dolaricon} alt="Admin icon" />
            </div>
            <span className="text-base font-medium text-gray-800 hover:text-blue-600">
              Admin
            </span>
          </div>
        </div>

        {/* Right: Image Section */}
        <div className="w-full lg:w-2/3 flex lg:justify-end bg-cover bg-center bg-no-repeat lg:px-10 lg:py-20 rounded-[28px]" style={{ backgroundImage: `url(${bgimage})` }} >
          <div className="w-full pt-4 max-w-sm bg-white rounded-2xl shadow-md lg:p-6">
            {/* Basic Package */}
            <div className="border border-blue-500 rounded-lg p-4 mb-4 cursor-pointer hover:bg-blue-50 transition">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="package"
                    className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                    checked
                    readOnly
                  />
                  <label className="ml-3 text-lg font-medium text-gray-900">
                    Basic Package
                  </label>
                </div>
                <span className="text-lg font-semibold text-gray-900">
                  $48.00
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                PDF 20+ file full access to premium contact
              </p>
            </div>

            {/* VIP Package */}
            <div className="border border-gray-300 rounded-lg p-4 cursor-pointer hover:bg-blue-50 transition">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="package"
                    className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <label className="ml-3 text-lg font-medium text-gray-900">
                    VIP Package
                  </label>
                </div>
                <span className="text-lg font-semibold text-gray-900">
                  $89.00
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                PDF 40+ file full access to premium contact
              </p>
            </div>

            {/* Payment Button */}
            <button className="mt-6 w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium text-lg py-3 rounded-lg shadow-lg hover:opacity-90 transition">
              Pay $98.00
            </button>
          </div>

          {/* <img
            src={imageright}
            alt="Illustration"
            className="lg:w-[663px lg:h-[852px] max-w-[500px] object-contain"
          /> */}
        </div>
      </div>

      {/* Footer Copyright */}
      <footer className="text-center lg:mt-10  py-4 text-sm text-gray-400">
        <p>© 2024 Copyright - All rights reserved by Real estate</p>
      </footer>
    </div>
  );
};

export default Auth;
