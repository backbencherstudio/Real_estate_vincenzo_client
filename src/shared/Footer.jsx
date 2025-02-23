import logo from "../assets/logo-white.png"
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
const Footer = () => {
    return (
        <footer className="bg-[#010e27] text-gray-400 py-16 mt-20">
            <h1 className="text-white text-3xl 2xl:text-7xl font-bold text-center mb-14">Let’s Simplify Property Management</h1>
            <div className="max-w-7xl mx-auto px-4">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-8 mb-12">
                    {/* Logo and Description Section */}
                    <div className="xl:col-span-4 lg:w-96">
                        <div className="flex items-center gap-2 text-white mb-12">
                            <img src={logo} alt="Real Estate Logo" className="" />
                        </div>
                        <p className="text-2xl font-semibold text-white mb-4">
                            Starting at just $20 per unit/month
                        </p>
                        <div className="flex gap-3 ] border border-[#64636A] rounded-2xl p-1 max-w-md">
                            <input
                                type="email"
                                placeholder="Enter you email address.."
                                className="bg-transparent flex-1 outline-none px-3"
                            />
                            <button className="primary-btn">
                                Book a Demo
                            </button>
                        </div>
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
                        <span>realestate ©2024</span>
                        {['Privacy', 'Accessibility', 'Terms', 'Licenses', 'Site map'].map((item, index) => (
                            <a key={index} href="#" className="hover:text-white transition">{item}</a>
                        ))}
                    </div>

                    {/* Social Media Icons */}
                    <div className="flex gap-4">
                        {[
                            { icon: FaFacebook, platform: 'facebook' },
                            { icon: FaInstagram, platform: 'instagram' }, 
                            { icon: FaTwitter, platform: 'twitter' },
                            { icon: FaLinkedin, platform: 'linkedin' }
                        ].map(({icon: Icon, platform}, index) => (
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