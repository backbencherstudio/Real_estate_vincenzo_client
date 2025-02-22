import landing from "../../assets/landing.svg"
import HeaderContent from "../../components/Header/Header";
import { LuPhone, LuMail, LuMessageCircle, LuMapPin } from "react-icons/lu";
const ContactUs = () => {
    const Contents = {
        title: "Let's Start Your Real Estate Journey Together",
        description:
          "Contact us today to explore your real estate options, ask questions, or schedule a consultation. Our team of expert agents is here to provide personalized service.",
        buttonText: "Contact Us",
        images: [landing, landing],
      };
    return (
        <div>
            <HeaderContent content={Contents} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 max-w-7xl mx-auto">
                {/* Phone Number Card */}
                <div className="bg-[#F5F6F9] p-6 rounded-lg">
                    <div className="w-16 h-16 flex items-center justify-center text-blue-500 bg-white rounded-full p-2 mb-5">
                        <LuPhone size={24} />
                    </div>
                    <h3 className="text-sm md:text-xl font-semibold mb-6">Phone Number</h3>
                    <p className="text-sm text-gray-600">Phone: (505) 555-0125</p>
                    <p className="text-sm text-gray-600">Phone: (505) 555-5841</p>
                </div>

                {/* Email Address Card */}
                <div className="bg-[#F5F6F9] p-6 rounded-lg">
                    <div className="text-blue-500 w-16 h-16 flex items-center justify-center bg-white rounded-full p-2 mb-5">
                        <LuMail size={24} />
                    </div>
                    <h3 className="text-sm md:text-xl font-semibold mb-6">Email Address</h3>
                    <p className="text-sm text-gray-600">Email: contact@inestbes.com</p>
                    <p className="text-sm text-gray-600">Email: info@inestbes.com</p>
                </div>

                {/* Community Card */}
                <div className="bg-[#F5F6F9] p-6 rounded-lg">
                    <div className="text-blue-500 w-16 h-16 flex items-center justify-center bg-white rounded-full p-2 mb-5">
                        <LuMessageCircle size={24} />
                    </div>
                    <h3 className="text-sm md:text-xl font-semibold mb-6">Ask the community</h3>
                    <p className="text-sm text-gray-600">Join thousands of fellow Plutio customers sharing ideas, collaborating and helping each other</p>
                    <a href="#" className="text-sm text-blue-500 hover:underline mt-2 inline-block">Click here to request access</a>
                </div>

                {/* Location Card */}
                <div className="bg-[#F5F6F9] p-6 rounded-lg">
                    <div className="text-blue-500 w-16 h-16 flex items-center justify-center bg-white rounded-full p-2 mb-5">
                        <LuMapPin size={24} />
                    </div>
                    <h3 className="text-sm md:text-xl font-semibold mb-6">Location</h3>
                    <p className="text-sm text-gray-600">8502 Preston Rd. Inglewood, Maine 98380</p>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;