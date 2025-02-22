import authApi from "../../redux/fetures/auth/authApi";

const AboutUs = () => {
    const {data, isLoading} = authApi.useGetAdvisersDataQuery();
    
    console.log(data?.data);
    
    return (
        <div>
            <h2>About Us</h2>
        </div>
    );
};

export default AboutUs;