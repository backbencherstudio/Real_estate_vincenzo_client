import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";

const SubscriptionForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [email, setEmail] = useState('');
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [invoiceUrl, setInvoiceUrl] = useState(null);

    const handleSubscribe = async (e) => {
        e.preventDefault();

        if (!email || !amount || isNaN(amount) || parseFloat(amount) <= 0) {
            setMessage("Please provide a valid email and subscription amount.");
            return;
        }

        if (!stripe || !elements) {
            setMessage("Stripe has not loaded yet. Please try again later.");
            return;
        }

        setLoading(true);
        try {
            const cardElement = elements.getElement(CardElement);
            if (!cardElement) {
                setMessage("Payment details are missing. Please check and try again.");
                setLoading(false);
                return;
            }
            const { paymentMethod, error: paymentError } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
            });

            if (paymentError) {
                console.error("Error creating payment method:", paymentError);
                setMessage(paymentError.message || "Failed to create payment method.");
                setLoading(false);
                return;
            }

            console.log("PaymentMethod created:", paymentMethod);

            const response = await axios.post('http://localhost:5000/api/v1/payment/stripe', {
                email,
                amount,
                paymentMethodId: paymentMethod.id, 
            });

            console.log(response?.data);

            if (response?.data?.hostedInvoiceUrl) {
                setInvoiceUrl(response.data.hostedInvoiceUrl);
            }

            // setMessage(`Subscription created successfully! ID: ${response.data.subscriptionId}`);
            setMessage(`Subscription created successfully!`);
        } catch (error) {
            console.error('Error creating subscription:', error);

            setMessage(error.response?.data?.error || "Failed to create subscription. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto font-sans p-6 bg-white shadow-md rounded-md">
            <h1 className="text-center text-2xl font-bold text-gray-800">Subscribe to Our Service</h1>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-6 mt-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>

                <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Subscription Amount (USD)</label>
                    <input
                        type="number"
                        id="amount"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Payment Details</label>
                    <div className="mt-1 p-3 border border-gray-300 rounded-md">
                        <CardElement className="focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                </div>

                <button 
                    type="submit"
                    disabled={!stripe || loading}
                    className={`w-full py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}>
                    {loading ? 'Processing...' : 'Subscribe'}
                </button>

                {message && <p className={`text-center mt-4 ${message.startsWith('Subscription created') ? 'text-green-500' : 'text-red-500'}`}>{message}</p>}

                {invoiceUrl && (
                    <a 
                        href={invoiceUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-600 hover:underline mt-2 block text-center">
                        View Your Invoice
                    </a>
                )}
            </form>
        </div>
    );
};

export default SubscriptionForm;
