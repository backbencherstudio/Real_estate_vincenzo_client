import landing from "../../assets/landing.svg"
import AboutSlider from "../../components/AboutComponents/AboutSlider";
import InvestmentStory from "../../components/AboutComponents/InvestmentStory";
import HeaderContent from "../../components/Header/Header";
import TeamMember from "../../components/AboutComponents/TeamMember";
import CoreValue from "../../components/AboutComponents/CoreValue";
import JoinOurCommunity from "../../components/AboutComponents/JoinOurCommunity";
import { useEffect } from "react";
import { Link } from "react-router-dom";
const AboutUs = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const Contents = {
        title: "Effective Tenant Management for Superior Property Performance",
        description: "Effective tenant management boosts property performance and ensures steady income. Strong relationships and timely support lead to smoother operations.",
        buttonText: "About Us",
        images: [landing, landing],
    };

    

    return (
        <div>
            <div className='py-10 lg:pb-20 lg:pt-32'>
                <HeaderContent content={Contents} />
                <div className="flex gap-4 justify-center">
                    <Link to="/signIn" className="primary-btn2">
                        Get Started
                    </Link>
                    <Link to="/contact-us" className="secondary-btn">
                        Contact Us
                    </Link>
                </div>
            </div> 
            <div>
                <AboutSlider />
            </div>
            <InvestmentStory />
            <TeamMember />
            <CoreValue />
            <JoinOurCommunity />
        </div>
    );
};

export default AboutUs;