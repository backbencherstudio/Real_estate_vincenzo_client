/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import {
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/fetures/auth/authSlice";
import { toast } from "sonner";
import tenantApi from "../../redux/fetures/tenant/tenantApi";
const StripeTenantForm = ({ paymentData, totalAmount, setOpen, setSuccessPaymentData }) => {
    const [paymentPlacedApi] = tenantApi.usePaymentPlacedApiMutation()
    const currentUser = useSelector(selectCurrentUser)
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [email, setEmail] = useState(currentUser?.email);

    console.log(paymentData);
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError("");

        const cardElement = elements.getElement(CardNumberElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement,
            billing_details: { email },
        });

        if (error) {
            setError(error.message);
            setLoading(false);
            return;
        }

        try {
            const data = await paymentPlacedApi({
                paymentMethodId: paymentMethod.id,
                amount: parseInt(totalAmount),
                monthlyPaymentId: paymentData?.key,
                ownerId : paymentData?.ownerId
            });            

            if (data?.data?.success) {
                setSuccess(true);
                setOpen(false)
                setLoading(false);
                setSuccessPaymentData(data?.data)
                elements.getElement(CardNumberElement)?.clear();
                elements.getElement(CardExpiryElement)?.clear();
                elements.getElement(CardCvcElement)?.clear();
                toast.success(data?.data?.message || "Payment successful!");                
                return;
            }

            setError(`Payment failed: ${data?.message || "Unknown error"}`);
        } catch (err) {
            console.error("Payment Error:", err);
            setError(err.response?.data?.message || "Payment failed.");
        }
        setLoading(false);
    };


    const elementStyle = {
        style: {
            base: {
                fontSize: "16px",
                color: "#32325d",
                fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                "::placeholder": {
                    color: "#aab7c4",
                },
                padding: "10px",
            },
            invalid: {
                color: "#fa755a",
            },
        },
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white shadow border-t py-6 border-zinc-100 rounded-lg px-3 max-w-lg mx-auto"
        >
            <h2 className="text-2xl font-bold text-center mb-2">Secure Payment</h2>

            <div className="mb-2">
                <label
                    className="block text-lg font-semibold mb-2 text-gray-700"
                    htmlFor="email"
                >
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    className="w-full p-3 border rounded-lg focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    readOnly
                />
            </div>

            <div className="mb-2">
                <label className="block text-lg font-semibold mb-2 text-gray-700">
                    Card Number
                </label>
                <div className="p-3 border rounded-lg bg-gray-50">
                    <CardNumberElement options={elementStyle} />
                </div>
            </div>

            <div className="flex gap-4 mb-2">
                <div className="w-1/2">
                    <label className="block text-lg font-semibold mb-2 text-gray-700">
                        Expiration Date
                    </label>
                    <div className="p-3 border rounded-lg bg-gray-50">
                        <CardExpiryElement options={elementStyle} />
                    </div>
                </div>
                <div className="w-1/2">
                    <label className="block text-lg font-semibold mb-2 text-gray-700">
                        CVC
                    </label>
                    <div className="p-3 border rounded-lg bg-gray-50">
                        <CardCvcElement options={elementStyle} />
                    </div>
                </div>
            </div>
            <button
                type="submit"
                disabled={!stripe || loading}
                className={`w-full my-2 py-3 text-white font-bold rounded-lg ${loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:opacity-90"
                    }`}
            >
                {loading
                    ? "Processing..."
                    : `Pay Now : $${totalAmount}`}
            </button>

            {error && (
                <div className="pb-2 text-red-500 font-medium text-center">{error}</div>
            )}
            
        </form>
    );
};

export default StripeTenantForm;
