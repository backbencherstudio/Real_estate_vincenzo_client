import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import SubscriptionForm from "./SubscriptionForm";

// const stripePromise = loadStripe('pk_test_51Qj3DaLdWMYlebBQOl4ldkQkxLqx7lOVk1fNuTxq7j48MCK8Hfp8iS0xGgOTJD57aYiETTMXmEGbSVHGav8D6cyW00ZlYe2LyG'); //client
const stripePromise = loadStripe('pk_test_51NFvq6ArRmO7hNaVcPS5MwczdEtM4yEMOclovA0k5LtJTxhtzKZ2SKim3p8qmvssQ7j7bREjoRRmHB9Gvz8n8Dfm00UOo9bZYg');

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