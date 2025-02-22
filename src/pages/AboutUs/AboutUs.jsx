import landing from "../../assets/landing.svg"
import HeaderContent from "../../components/Header/Header";
const AboutUs = () => {
    const Contents = {
        title: "Effective Tenant Management for Superior Property Performance",
        description: "Effective tenant management boosts property performance and ensures steady income. Strong relationships and timely support lead to smoother operations.",
        buttonText: "About Us",
        images: [landing, landing],
    };
    return (
        <div>
            <HeaderContent content={Contents} />
        </div>
    );
};

export default AboutUs;