import line from "../../assets/line.svg"
import { IoMdCheckmarkCircle } from "react-icons/io";
import landing from "../../assets/landing.svg"
import HeaderContent from "../Header/Header";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/fetures/auth/authSlice";
const Plans = ({planData}) => {
    const currentUser = useSelector(selectCurrentUser);
    const Contents = {
        title: "Choose the Right Plan",
        description: "Unlock streamlined processes with solutions for startups and enterprises alike",
        buttonText: "Pricing",
        images: [landing, landing],
    };
    const navigate = useNavigate();    
    const selectPlanFun = () =>{
        if (!currentUser) {
         return navigate("/signIn")            
        }
        navigate(`/${currentUser?.role}/payment`)
    }


    return (
        <div className="max-w-7xl mx-auto px-4 2xl:px-0 pb-16 lg:pb-20  ">
             <div className='py-10 lg:pb-6 lg:pt-32'>
                <HeaderContent content={Contents} />
            </div>
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
                            <span className="text-5xl font-medium">${planData?.starter}</span>
                            <span className="text-gray-600"> per unit/month</span>
                        </div>
                        <p className="mt-4 text-gray-600">Ideal for small property portfolios and new real estate investors.</p>
                        <button onClick={selectPlanFun} className="primary-btn w-full mt-6">
                            Select Your Plan
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
                                    <span>Manage up to 4 units.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-blue-600 text-xl"><IoMdCheckmarkCircle /></span>
                                    <span>Fully automated rent collection system.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-blue-600 text-xl"><IoMdCheckmarkCircle /></span>
                                    <span>Ability to file maintenance requests.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-blue-600 text-xl"><IoMdCheckmarkCircle /></span>
                                    <span>Property and Revenue Metrics.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-blue-600 text-xl"><IoMdCheckmarkCircle /></span>
                                    <span>Secure document and lease storage.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Growth Plan */}
                    <div className="rounded-2xl p-8 bg-[#000C2D] text-white shadow-lg">
                        <h3 className="text-xl font-medium">Growth Plan</h3>
                        <div className="mt-6">
                            <span className="text-5xl font-medium">${planData?.growth}</span>
                            <span className="text-gray-300"> per unit/month</span>
                        </div>
                        <p className="mt-4 text-gray-300">Ideal for growing businesses needing advanced features.</p>
                        <button onClick={selectPlanFun} className="primary-btn w-full mt-6">
                            Select Your Plan
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
                                    <span>Manage up to 12 units.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="bg-zinc-500/20 rounded-full p-0.5"><IoMdCheckmarkCircle className='text-blue-600 text-lg' /></span>
                                    <span>Fully automated rent collection system.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="bg-zinc-500/20 rounded-full p-0.5"><IoMdCheckmarkCircle className='text-blue-600 text-lg' /></span>
                                    <span>Ability to file maintenance requests.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="bg-zinc-500/20 rounded-full p-0.5"><IoMdCheckmarkCircle className='text-blue-600 text-lg' /></span>
                                    <span>Property and Revenue Metrics.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="bg-zinc-500/20 rounded-full p-0.5"><IoMdCheckmarkCircle className='text-blue-600 text-lg' /></span>
                                    <span>Secure document and lease storage.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Professional Plan */}
                    <div className="rounded-2xl p-8 bg-white shadow-lg">
                        <h3 className="text-xl font-medium">Professional Plan</h3>
                        <div className="mt-6">
                            <span className="text-5xl font-medium">${planData?.professional}</span>
                            <span className="text-gray-600"> per unit/month</span>
                        </div>
                        <p className="mt-4 text-gray-600">Tailored for large property portfolios, the Enterprise Plan.</p>
                        <button onClick={selectPlanFun} className="primary-btn w-full mt-6">
                            Select Your Plan
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
                                    <span>Manage up to 40 units.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-blue-600 text-xl"><IoMdCheckmarkCircle /></span>
                                    <span>Fully automated rent collection system.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-blue-600 text-xl"><IoMdCheckmarkCircle /></span>
                                    <span>Ability to file maintenance requests.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-blue-600 text-xl"><IoMdCheckmarkCircle /></span>
                                    <span>Property and Revenue Metrics.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-blue-600 text-xl"><IoMdCheckmarkCircle /></span>
                                    <span>Secure document and lease storage.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default Plans;