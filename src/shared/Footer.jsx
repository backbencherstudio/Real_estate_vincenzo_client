import logo from "../assets/logo-white.svg"
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import authApi from "../redux/fetures/auth/authApi";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import adminApi from "../redux/fetures/admin/adminApi";
import { Link } from "react-router-dom";
import privacyPdf from "../assets/pdf/RentPad Private Policy.pdf"
import refundPdf from "../assets/pdf/RentPad Refund Policy.pdf"
import termsPdf from "../assets/pdf/RentPad Terms of Service.pdf"
const Footer = () => {
    const [emailCollection] = authApi.useEmailCollectionMutation();
    const { data: getPlanData } = adminApi.useGetPlanQuery(undefined, { pollingInterval: 86400000 })
    const planData = getPlanData?.data[0]

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const onSubmit = async (data) => {
        const res = await emailCollection({ email: data.email });
        if (res?.data?.success) {
            toast.success(res?.data?.message)
            reset()
        }
    };

    return (
        <footer className="bg-[#010e27] text-gray-400 py-16 mt-20">
            <h1 className="text-white text-3xl 2xl:text-7xl font-bold text-center mb-14">Let’s Simplify Property Management</h1>
            <div className="max-w-7xl mx-auto px-4 xl:px-0">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-8 mb-12">
                    {/* Logo and Description Section */}
                    <div className="xl:col-span-4 lg:w-96">
                        <Link to="/" className="flex items-center gap-2 mb-12">
                            <img src={logo} alt="logo" className="" />
                            <span className="text-[22px] font-semibold bg-gradient-to-r from-[#ffffff] to-[#A9A9A9] bg-clip-text text-transparent tracking-[-0.88px]">RentPad Homes</span>
                        </Link>
                        <p className="text-2xl font-semibold text-white mb-4">
                            Starting at just ${planData?.starter} per unit/month
                        </p>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="flex justify-center gap-3  rounded-2xl p-1 w-full max-w-2xl border border-gray-600"
                        >
                            <div className="flex-1">
                                <input
                                    type="email"
                                    placeholder="Enter your email address.."
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                            message: "Invalid email address"
                                        }
                                    })}
                                    className="bg-transparent w-full h-[100%] outline-none px-3 rounded-l-xl"
                                    autoComplete="off"
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm px-3">{errors.email.message}</p>
                                )}
                            </div>
                            <button type="submit" className="primary-btn w-[120px]">
                                Send
                            </button>
                        </form>
                    </div>

                    {/* Company Links */}
                    <div className="xl:col-span-3">
                        <h3 className="text-white text-lg font-semibold mb-4">Company</h3>
                        <ul className="space-y-6">
                            {['Property platform', 'Full-service property management', 'Tenant communication',
                                'Maintenance coordination', 'Owner and tenant support', 'Market insights and reporting']
                                .map((item, index) => (
                                    <li key={index}><a href="#" className="hover:text-white transition">{item}</a></li>
                                ))}
                        </ul>
                    </div>

                    {/* Features Links */}
                    <div className="xl:col-span-3">
                        <h3 className="text-white text-lg font-semibold mb-4">Features</h3>
                        <ul className="space-y-6">
                            {['Payment Processing', 'Rent tracking', 'Lease management', 'Document storage',
                                'Property listings', 'Maintenance tracking']
                                .map((item, index) => (
                                    <li key={index}><a href="#" className="hover:text-white transition">{item}</a></li>
                                ))}
                        </ul>
                    </div>

                    {/* Solutions Links */}
                    <div className="xl:col-span-2">
                        <h3 className="text-white text-lg font-semibold mb-4">Solutions</h3>
                        <ul className="space-y-6">
                            {['Residential management', 'Property management', 'Real estate automation',
                                'Investment tracking', 'Online payment solutions']
                                .map((item, index) => (
                                    <li key={index}><a href="#" className="hover:text-white transition">{item}</a></li>
                                ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    {/* Copyright and Links */}
                    <div className="flex flex-wrap items-center gap-4">
                        <span>RentPad Homes ©2024</span>
                        <a href={privacyPdf} target="_blank" className="hover:text-white transition">Privacy</a>
                        <a href={refundPdf} target="_blank" className="hover:text-white transition">Refund Policy</a>
                        <a href={termsPdf} target="_blank" className="hover:text-white transition">Terms</a>
                    </div>

                    {/* Social Media Icons */}
                    <div className="flex gap-4">
                        {[
                            { icon: FaFacebook, platform: 'facebook' },
                            { icon: FaInstagram, platform: 'instagram' },
                            { icon: FaTwitter, platform: 'twitter' },
                            { icon: FaLinkedin, platform: 'linkedin' }
                        ].map(({ icon: Icon, platform }, index) => (
                            <a
                                key={index}
                                href="#"
                                className="w-10 h-10 rounded-full text-white border border-blue-700 flex items-center justify-center hover:bg-blue-700 transition"
                            >
                                <Icon className="text-xl" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;