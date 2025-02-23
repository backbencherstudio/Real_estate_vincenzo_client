import landing from "../../assets/landing.svg"
import AboutSlider from "../../components/AboutComponents/AboutSlider";
import InvestmentStory from "../../components/AboutComponents/InvestmentStory";
import HeaderContent from "../../components/Header/Header";
import TeamMember from "../../components/AboutComponents/TeamMember";
import authApi from "../../redux/fetures/auth/authApi";
import CoreValue from "../../components/AboutComponents/CoreValue";
import JoinOurCommunity from "../../components/AboutComponents/JoinOurCommunity";
const AboutUs = () => {
    const Contents = {
        title: "Effective Tenant Management for Superior Property Performance",
        description: "Effective tenant management boosts property performance and ensures steady income. Strong relationships and timely support lead to smoother operations.",
        buttonText: "About Us",
        images: [landing, landing],
    };
    const { data, isLoading } = authApi.useGetAdvisersDataQuery();

    console.log(data?.data);

    return (
        <div>
            <div className='py-10 lg:pb-20 lg:pt-32'>
                <HeaderContent content={Contents} />
                <div className="flex gap-4 justify-center">
                    <button className="primary-btn2">
                        Get Started
                    </button>
                    <button className="secondary-btn">
                        Contact Us
                    </button>
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