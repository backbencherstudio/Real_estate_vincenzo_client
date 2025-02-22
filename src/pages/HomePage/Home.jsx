import dashboardImage from "../../../public/Dashboard.png"
import HomePageSubscriptionPlans from "./HomePageSubscriptionPlans";
import PropertyManagementCosts from "./PropertyManagementCosts";
import HeaderContent from "../../components/Header/Header";
import landing from "../../assets/landing.svg"
const Home = () => {
    const Contents = {
        title: "The Best Property Management Solution",
        description: "This software boosts revenue, keeps you organized, and grows your business with advanced tech and top support.",
        buttonText: "Unlock your financial potential",
        images: [landing, landing],
    };  
    return (
        <div className="px-4 lg:px-0" >
            <div className="w-full  max-w-7xl mx-auto">
                <div className=" mx-auto flex flex-col items-center ">
                    <HeaderContent content={Contents} />
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
            <div className=" mx-auto my-24 ">
                <p className="font-inter font-medium text-2xl sm:text-3xl md:text-4xl lg:text-[48px] leading-tight text-center">
                    Join our community of 10,000+ Real Estates
                </p>
                <p className="text-center mt-4">logo marque</p>
            </div>
            <div className="max-w-[1400px] mx-auto" >
                <PropertyManagementCosts />
            </div>

            <div className="max-w-[1400px] mx-auto" >
                <HomePageSubscriptionPlans/>
            </div>
        </div>
    );
};

export default Home;