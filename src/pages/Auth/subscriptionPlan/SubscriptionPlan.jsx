import { Link } from "react-router-dom";
import StripePayment from "../../Owner/payment/StripePayment";

const SubscriptionPlan = () => {
    return (
        <div>
            <div className="flex justify-center py-10" >
                <Link to="/signin" className="font-bold text-green-800" >Login</Link>
            </div>
            {/* <StripePayment */}
            <StripePayment />

        </div>
    );
};

export default SubscriptionPlan;