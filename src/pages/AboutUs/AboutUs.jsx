import landing from "../../assets/landing.svg"
import HeaderContent from "../../components/Header/Header";
import authApi from "../../redux/fetures/auth/authApi";

const AboutUs = () => {
    const Contents = {
        title: "Effective Tenant Management for Superior Property Performance",
        description: "Effective tenant management boosts property performance and ensures steady income. Strong relationships and timely support lead to smoother operations.",
        buttonText: "About Us",
        images: [landing, landing],
    };
    const {data, isLoading} = authApi.useGetAdvisersDataQuery();
    
    console.log(data?.data);
    
    return (
        <div>
            <HeaderContent content={Contents} />
        </div>
    );
};

export default AboutUs;