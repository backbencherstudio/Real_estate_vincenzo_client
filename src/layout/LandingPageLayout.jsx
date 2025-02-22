import { Outlet } from "react-router-dom";
import NavBar from "../shared/NavBar";
import Footer from "../shared/Footer";


const LandingPageLayout = () => {
    return (
        <div className="bg-white">
            <div className="fixed top-0 left-0 w-full z-50 bg-white shadow">
                <NavBar />
            </div>

            <div className="pt-[80px]">
                <Outlet />
            </div>

            <Footer />
        </div>
    );
};

export default LandingPageLayout;
