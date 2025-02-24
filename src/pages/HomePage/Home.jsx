import HomePageSubscriptionPlans from "./HomePageSubscriptionPlans";
import PropertyManagementCosts from "./PropertyManagementCosts";
import HeaderContent from "../../components/Header/Header";
import landing from "../../assets/landing.svg"
import dashboardImage from "../../assets/dashboard.png"
import { useEffect } from "react";
import JoinOurCommunity from "../../components/AboutComponents/JoinOurCommunity";
import Plans from "../../components/Plans/Plans";
const Home = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const Contents = {
        title: "The Best Property Management Solution",
        description: "This software boosts revenue, keeps you organized, and grows your business with advanced tech and top support.",
        buttonText: "Unlock your financial potential",
        images: [landing, landing],
    };
    return (
        <div>
            <div className="px-4 lg:px-0 bg-gradient-to-b from-zinc-50 to-zinc-100" >
                <div className="w-full  max-w-7xl mx-auto">
                    <div className=" mx-auto flex flex-col items-center ">
                        <div className='py-10 lg:pb-20 lg:pt-32'>
                            <HeaderContent content={Contents} />
                            <div className="flex justify-center">
                                <div className="flex justify-center gap-3 bg-white rounded-2xl p-1 w-full max-w-2xl"
                                style={{boxShadow: "0px 26px 62px 0px rgba(227, 229, 234, 0.50)"}}
                                >
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
                        </div>
                    </div>
                    <div className=" mx-auto mt-14 ">
                        <div className="w-full h-auto flex justify-center">
                            <img
                                className="w-full max-w-[100%] h-auto object-contain"
                                src={dashboardImage}
                                alt="Dashboard Preview"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-24">
                <JoinOurCommunity/>
            </div>
            <div className="max-w-[1400px] mx-auto" >
                <PropertyManagementCosts />
            </div>

            <div className="max-w-[1400px] mx-auto" >
                <Plans/>
            </div>
        </div>
    );
};

export default Home;