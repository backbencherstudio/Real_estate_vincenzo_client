import line from "../../assets/line.svg"
import { IoMdCheckmarkCircle } from "react-icons/io";

const Plans = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 2xl:px-0 py-16 lg:py-20 ">
                {/* Billing Toggle */}
                <div className="flex justify-center gap-4 mb-4">
                   <button className='primary-btn cursor-auto'>Monthly</button>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {/* Starter Plan */}
                    <div className="rounded-2xl p-8 bg-white shadow-lg">
                        <h3 className="text-xl font-medium">Starter Plan</h3>
                        <div className="mt-6">
                            <span className="text-5xl font-medium">$20</span>
                            <span className="text-gray-600"> per unit/month</span>
                        </div>
                        <p className="mt-4 text-gray-600">Ideal for small property portfolios and new real estate investors.</p>
                        <button className="primary-btn w-full mt-6">
                            Book a Demo
                        </button>
                        <div className="mt-8">
                            <div className="flex items-center gap-2 mb-6">
                                <img src={line} alt="" className='scale-x-[-1]' />
                                <span className="px-4 py-1 rounded-full border border-[#1565C0] text-[#1565C0] text-sm">What you will get</span>
                                <img src={line} alt="" />
                            </div>
                            <ul className="space-y-6">
                                <li className="flex gap-3">
                                    <span className="text-blue-600 text-xl"><IoMdCheckmarkCircle /></span>
                                    <span>Affordable for small-scale investors.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-blue-600 text-xl"><IoMdCheckmarkCircle /></span>
                                    <span>Manage up to 4 units at a low cost.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-blue-600 text-xl"><IoMdCheckmarkCircle /></span>
                                    <span>Flexible pricing for small portfolios.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-blue-600 text-xl"><IoMdCheckmarkCircle /></span>
                                    <span>Transparent, no hidden fees.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-blue-600 text-xl"><IoMdCheckmarkCircle /></span>
                                    <span>Maximized value for key tools.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Growth Plan */}
                    <div className="rounded-2xl p-8 bg-[#000C2D] text-white shadow-lg">
                        <h3 className="text-xl font-medium">Growth Plan</h3>
                        <div className="mt-6">
                            <span className="text-5xl font-medium">$18</span>
                            <span className="text-gray-300"> per unit/month</span>
                        </div>
                        <p className="mt-4 text-gray-300">Ideal for growing businesses needing advanced features.</p>
                        <button className="w-full primary-btn mt-6">
                            Book a Demo
                        </button>
                        <div className="mt-8">
                            <div className="flex items-center gap-2 mb-6">
                                <img src={line} alt="" className='scale-x-[-1]' />
                                <span className="px-4 py-1 rounded-full border border-[#1565C0] text-[#1565C0] text-sm">What you will get</span>
                                <img src={line} alt="" />
                            </div>
                            <ul className="space-y-6">
                                <li className="flex items-center gap-3">
                                    <span className="bg-zinc-500/20 rounded-full p-0.5"><IoMdCheckmarkCircle className='text-blue-600 text-lg' /></span>
                                    <span>All basic plan features</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="bg-zinc-500/20 rounded-full p-0.5"><IoMdCheckmarkCircle className='text-blue-600 text-lg' /></span>
                                    <span>Advanced analytics</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="bg-zinc-500/20 rounded-full p-0.5"><IoMdCheckmarkCircle className='text-blue-600 text-lg' /></span>
                                    <span>Enhanced security</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="bg-zinc-500/20 rounded-full p-0.5"><IoMdCheckmarkCircle className='text-blue-600 text-lg' /></span>
                                    <span>Priority email support</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="bg-zinc-500/20 rounded-full p-0.5"><IoMdCheckmarkCircle className='text-blue-600 text-lg' /></span>
                                    <span>API access for integrations</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Professional Plan */}
                    <div className="rounded-2xl p-8 bg-white shadow-lg">
                        <h3 className="text-xl font-medium">Professional Plan</h3>
                        <div className="mt-6">
                            <span className="text-5xl font-medium">$15</span>
                            <span className="text-gray-600"> per unit/month</span>
                        </div>
                        <p className="mt-4 text-gray-600">Tailored for large property portfolios, the Enterprise Plan.</p>
                        <button className="w-full primary-btn mt-6">
                            Book a Demo
                        </button>
                        <div className="mt-8">
                            <div className="flex items-center gap-2 mb-6">
                                <img src={line} alt="" className='scale-x-[-1]' />
                                <span className="px-4 py-1 rounded-full border border-[#1565C0] text-[#1565C0] text-sm">What you will get</span>
                                <img src={line} alt="" />
                            </div>
                            <ul className="space-y-6">
                                <li className="flex gap-3">
                                    <span className="text-blue-600 text-xl"><IoMdCheckmarkCircle /></span>
                                    <span>Advanced operational tools included.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-blue-600 text-xl"><IoMdCheckmarkCircle /></span>
                                    <span>Effortless tenant communication.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-blue-600 text-xl"><IoMdCheckmarkCircle /></span>
                                    <span>Automated payment tracking.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-blue-600 text-xl"><IoMdCheckmarkCircle /></span>
                                    <span>24/7 phone and email support</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-blue-600 text-xl"><IoMdCheckmarkCircle /></span>
                                    <span>Priority support for issues.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default Plans;