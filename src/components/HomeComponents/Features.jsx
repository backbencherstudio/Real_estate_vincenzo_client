import React from 'react';
import image1 from "../../assets/Frame1.png";
import image2 from "../../assets/Frame10.png";
import image3 from "../../assets/Frame3.png";
import { FaCircleCheck } from "react-icons/fa6";
import AOS from "aos";
import "aos/dist/aos.css";
import adminApi from '../../redux/fetures/admin/adminApi';


const FeatureItem = ({ title, description }) => (
    <div className="flex items-start gap-3">
        <span className="text-blue-600 mt-1">
            <FaCircleCheck />
        </span> 
        <p className="text-base w-[40ch]">
            <span className="font-semibold">{title}:</span> {description}
        </p>
    </div>
);

const FeatureSection = ({ title, description, image, features }) => (
    <div className="max-w-7xl mx-auto px-4 mb-8">
        <div  className="flex items-center justify-between gap-12">
            <div data-aos="fade-up" data-aos-duration="2000" className="lg:w-1/2 space-y-6">
                <h2 className="text-3xl font-bold w-[20ch]">{title}</h2>
                <p className="text-gray-600 md:w-[50ch] text-base">{description}</p>
                <div className="text-[#070127]">
                    {features.map((feature, index) => (
                        <FeatureItem 
                            key={index}
                            title={feature.title}
                            description={feature.description}
                        />
                    ))}
                </div>
            </div>
            <div data-aos="zoom-in" data-aos-duration="2000" className="w-1/2">
                <img src={image} alt={title} className="w-full rounded-lg" />
            </div>
        </div>
    </div>
);

const Features = () => {
    const [scrollProgress, setScrollProgress] = React.useState(0);
    const [isVisible, setIsVisible] = React.useState(false);
    const { data: getPlanData } = adminApi.useGetPlanQuery(undefined, { pollingInterval: 86400000 })
    const planData = getPlanData?.data[0]
    const featureSections = [
        {
            title: "Subscription Plans for Every Investor",
            description: "Manage your properties effortlessly with plans tailored to your portfolio size:",
            image: image2,
            features: [
                {
                    title: "Starter Plan",
                    description: `Perfect for small portfolios, manage 1-4 units at ${planData?.starter} per unit/month.`
                },
                {
                    title: "Growth Plan",
                    description: `Scale up to 5-12 units at ${planData?.growth} per unit/month.`
                },
                {
                    title: "Professional Plan",
                    description: `Manage 13-40 units at ${planData?.professional} per unit/month, ideal for larger investments.`
                }
            ]
        },
        {
            title: "Empowering Tenants with Essential Tools",
            description: "Give tenants control with an intuitive and functional portal:",
            image: image1,
            features: [
                {
                    title: "Pay Rent",
                    description: "Flexible payment methods like bank transfer and credit card."
                },
                {
                    title: "Request Maintenance",
                    description: "Easily submit and track service requests for repairs."
                },
                {
                    title: "Store Documents",
                    description: "Upload and manage important files like rental agreements."
                }
            ]
        },
        {
            title: "Comprehensive Tools for Property Owners",
            description: "Streamline property management with advanced features for investors:",
            image: image3,
            features: [
                {
                    title: "Manage Payments",
                    description: "Create payment listings, track rent, and receive payments."
                },
                {
                    title: "Handle Maintenance Requests",
                    description: "View and resolve tenant service requests efficiently."
                },
                {
                    title: "Organize Tenants",
                    description: "Group tenants and assign them based on your subscription plan."
                }
            ]
        }
    ];
    
    React.useEffect(() => {
        AOS.init();
        const handleScroll = () => {
            const element = document.getElementById('features-container');
            if (!element) return;
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            if (rect.top < windowHeight && rect.bottom > 0) {
                setIsVisible(true);
                const progress = Math.max(0, Math.min(1, 
                    (windowHeight - rect.top) / (rect.height + windowHeight/2)
                ));
                setScrollProgress(progress * 100);
            } else {
                setIsVisible(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll(); 
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div id="features-container" className="relative">
            {/* Animated Line */}
            {isVisible && (
                <div className="absolute left-2 xl:left-12 top-0 h-full w-[1px] ">
                    <div className="h-full w-full bg-gray-200 relative">
                        <div 
                            className="absolute top-0 left-0 w-full bg-gradient-to-b to-blue-500 from-transparent transition-all duration-500"
                            style={{ height: `${scrollProgress}%` }}
                        />
                    </div>
                </div>
            )}

            {featureSections.map((section, index) => (
                <FeatureSection 
                    key={index}
                    {...section}
                />
            ))}
        </div>
    );
};

export default Features;