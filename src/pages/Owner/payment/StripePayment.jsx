import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import SubscriptionForm from "./SubscriptionForm";

const stripePromise = loadStripe('pk_test_51Qj3DaLdWMYlebBQOl4ldkQkxLqx7lOVk1fNuTxq7j48MCK8Hfp8iS0xGgOTJD57aYiETTMXmEGbSVHGav8D6cyW00ZlYe2LyG');

const StripePayment = () => {


    return (
        <div>
            <Elements stripe={stripePromise}>
                <SubscriptionForm />
            </Elements>
        </div>
    );
};

export default StripePayment;