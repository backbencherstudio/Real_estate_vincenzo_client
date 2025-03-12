/* eslint-disable react/prop-types */
import { useState } from "react";
import { useForm } from "react-hook-form";
import tenantApi from "../../redux/fetures/tenant/tenantApi";
import { toast } from "sonner";

const ACHPaymentForm = ({paymentData, totalAmount, lateFee, setOpen, setSuccessPaymentData, securityDeposit, email}) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [stripeTenantACHpayment, { isLoading, error }] = tenantApi.useStripeTenantACHpaymentMutation();
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        const paymentDatas = {
            amount: parseInt(totalAmount) + parseInt(securityDeposit),
            accountHolder: data.accountHolder,
            accountNumber: data.accountNumber,
            routingNumber: data.routingNumber,
            email,
            monthlyPaymentId: paymentData?.key,
            ownerId: paymentData?.ownerId,
            lateFee: parseInt(lateFee),
        }

        console.log(paymentDatas);
        

        try {
            const response = await stripeTenantACHpayment(paymentDatas).unwrap();

            if (response?.data?.success) {
                setSuccess(true);
                setOpen(false)
                setLoading(false);
                setSuccessPaymentData(response?.data)
                toast.success(response?.data?.message || "Payment successful!");
                return;
            }

        } catch (err) {
            console.error("Payment failed:", err);
        }
    };

    return (
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">ACH Bank Payment</h2>
        
        {success && <p className="text-green-600 text-center">{success}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label className="block text-gray-700 font-medium">Email</label>
                <input
                    {...register("email")}
                    placeholder={email}
                    readOnly
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div>
                <label className="block text-gray-700 font-medium">Account Holder</label>
                <input
                    {...register("accountHolder", { required: "Account Holder is required" })}
                    placeholder="Account Holder Name"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                {errors.accountHolder && <p className="text-red-500 text-sm">{errors.accountHolder.message}</p>}
            </div>

            <div>
                <label className="block text-gray-700 font-medium">Account Number</label>
                <input
                    type="text"
                    {...register("accountNumber", { required: "Account Number is required" })}
                    placeholder="Account Number"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                {errors.accountNumber && <p className="text-red-500 text-sm">{errors.accountNumber.message}</p>}
            </div>

            <div>
                <label className="block text-gray-700 font-medium">Routing Number</label>
                <input
                    type="text"
                    {...register("routingNumber", { required: "Routing Number is required" })}
                    placeholder="Routing Number"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                {errors.routingNumber && <p className="text-red-500 text-sm">{errors.routingNumber.message}</p>}
            </div>

            {/* <div>
                <label className="block text-gray-700 font-medium">Amount ($)</label>
                <input
                    type="number"
                    {...register("amount", { required: "Amount is required" })}
                    placeholder="Enter amount"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                {errors.amount && <p className="text-red-500 text-sm">{errors.amount.message}</p>}
            </div> */}

            <button
                type="submit"
                disabled={ loading}
                className={`w-full my-2 py-3 text-white font-bold rounded-lg ${loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:opacity-90"
                    }`}
            >
                {loading
                    ? "Processing..."
                    : `Pay Now : $${totalAmount + parseInt(securityDeposit)}`}
            </button>
        </form>
    </div>
    );
};

export default ACHPaymentForm;
