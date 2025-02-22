import { Outlet } from "react-router-dom";
import Footer from "../shared/Footer";
import Navbar from "../shared/NavBar";


const LandingPageLayout = () => {
    return (
        <div className="bg-white">
            <div className="fixed top-0 left-0 w-full z-50 bg-white shadow">
                <Navbar />
            </div>

            <div className="pt-[80px]">
                <Outlet />
            </div>

            <Footer />
        </div>
    );
};

export default LandingPageLayout;
