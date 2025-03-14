/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from 'axios';
import { useState } from 'react';
import tenantApi from '../../redux/fetures/tenant/tenantApi';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux/fetures/auth/authSlice';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const ACH = ({ paymentData, totalAmount, lateFee, setOpen, setSuccessPaymentData, securityDeposit }) => {
    const [customerId, setCustomerId] = useState('');
    const [bankToken, setBankToken] = useState('');
    const [bankAccountId, setBankAccountId] = useState('');
    const [verifyAccountId, setVerifyaccountId] = useState('');
    const [amount, setAmount] = useState(totalAmount);
    const currentUser = useSelector(selectCurrentUser);
    const [createCustomerForACHpayment, { isLoading }] = tenantApi.useCreateCustomerForACHpaymentMutation();
    const [createBankTokenForACHpayment, { isLoading: isLoadinCreateBankToken }] = tenantApi.useCreateBankTokenForACHpaymentMutation();
    const [attachACHbankAccount, { isLoading: isLoadinattachACHbankAccount }] = tenantApi.useAttachACHbankAccountMutation();
    const [verifyBankAccountApi, { isLoading: verifyBankAccountIsLoading }] = tenantApi.useVerifyBankAccountApiMutation();
    const [payRentUserACHcontroller, { isLoading: payRentUserACHcontrollerIsLoading }] = tenantApi.usePayRentUserACHcontrollerMutation();


    const { register, handleSubmit } = useForm();
    const { register: createBankTokenRegister, handleSubmit: createBankTokenHandleSubmit } = useForm();
    const { register: attachBankAccountRegister, handleSubmit: attachBankAccountHandleSubmit } = useForm();
    const { register: verifyBankAccountRegister, handleSubmit: verifyBankAccountHandleSubmit } = useForm();

    const onSubmit = async (data) => {
        const res = await createCustomerForACHpayment(data);
        console.log(res);

        if (res?.data?.success) {
            setCustomerId(res?.data?.data?.customerId);
            toast.success(res?.data?.message)
        }
    };

    const onSubmitFroCreateBankToken = async (data) => {
        const res = await createBankTokenForACHpayment(data);
        console.log(res);
        if (res?.data?.success) {
            setBankToken(res?.data?.data?.bankToken);
            toast.success(res?.data?.message)
        }
    };

    const attachBankAccount = async () => {
        const res = await attachACHbankAccount({ customerId, bankToken });
        console.log(res);
        if (res?.data?.success) {
            setBankAccountId(res?.data?.data?.id);
            toast.success(res?.data?.message)
        }
    };


    const verifyBankAccount = async (data) => {
        const newAmounts = [data.firstDeposit, data.secondDeposit];
        const newData = {
            customerId,
            bankAccountId,
            amounts: newAmounts
        };
        const res = await verifyBankAccountApi(newData);
        console.log(res);
        if (res?.data?.success) {
            setVerifyaccountId(res?.data?.data?.verification?.id);
            toast.success(res?.data?.message)
        }
    };
    

    const payRent = async () => {
        const res = await payRentUserACHcontroller({
            customerId,
            bankAccountId,
            amount: parseInt(totalAmount) + parseInt(securityDeposit),
            lateFee: parseInt(lateFee),
            monthlyPaymentId: paymentData?.key,
            ownerId: paymentData?.ownerId
        });
        console.log(res);
        if (res?.data?.success) {
            toast.success(res?.data?.message)
        }
    };


    return (
        <div>
            <h1>ACH Rent Payment</h1>
            <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6">
                <h2 className="text-xl font-bold text-center mb-4">Create Stripe Customer</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <input
                        {...register("name")}
                        type="text"
                        placeholder="Enter Your Name"
                        required
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        {...register("email")}
                        type="email"
                        placeholder={currentUser?.email}
                        readOnly
                        className="w-full p-2 border rounded-lg bg-gray-100 cursor-not-allowed"
                    />
                    <button
                        className={`w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 ${customerId && "cursor-not-allowed"}`}
                        type="submit"
                        disabled={isLoading || customerId}
                    >
                        {isLoading ? "Loading..." : "Create Stripe Customer"}
                    </button>
                    {customerId && (
                        <>
                            <p className="text-center font-semibold text-gray-600">Customer ID: {customerId}</p>
                            <button
                                className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300"
                            >
                                Next
                            </button>
                        </>
                    )}
                </form>
            </div>

            <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6">
                <h2 className="text-xl font-bold text-center mb-4">Create Bank Token</h2>
                <form onSubmit={createBankTokenHandleSubmit(onSubmitFroCreateBankToken)} className="space-y-4">
                    <input
                        {...createBankTokenRegister("account_number")}
                        type="text"
                        placeholder="Account Number"
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        {...createBankTokenRegister("routing_number")}
                        type="text"
                        placeholder="Routing Number"
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        {...createBankTokenRegister("account_holder_name")}
                        type="text"
                        placeholder="Account Holder Name"
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        className={`w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 ${bankToken && "cursor-not-allowed"}`}
                        type="submit"
                        disabled={isLoadinCreateBankToken || bankToken}
                    >
                        {isLoadinCreateBankToken ? "Loading..." : "Create Bank Token"}
                    </button>
                    {bankToken && (
                        <>
                            <p className="text-center font-semibold text-gray-600">Bank Token: {bankToken}</p>
                            <button
                                className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300"
                            >
                                Next
                            </button>
                        </>
                    )}
                </form>
            </div>

            <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6">
                <h2 className="text-xl font-bold text-center mb-4">Attach Bank Account </h2>
                <form onSubmit={attachBankAccountHandleSubmit(attachBankAccount)} className="space-y-4">
                    <input
                        {...attachBankAccountRegister("customerId")}
                        type="text"
                        placeholder={customerId}
                        readOnly
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        {...attachBankAccountRegister("bankToken")}
                        type="text"
                        placeholder={bankToken}
                        readOnly
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        className={`w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 ${bankAccountId && "cursor-not-allowed"}`}
                        type="submit"
                        disabled={isLoadinattachACHbankAccount || bankAccountId}
                    >
                        {isLoadinattachACHbankAccount ? "Loading..." : "Attach Bank Account"}
                    </button>
                    {bankAccountId && (
                        <>
                            <p className="text-center font-semibold text-gray-600">Bank ID: {bankAccountId}</p>
                            <button
                                className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300"
                            >
                                Next
                            </button>
                        </>
                    )}
                </form>
            </div>

            <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6">
                <h2 className="text-xl font-bold text-center mb-4">Verify Bank Account </h2>
                <form onSubmit={verifyBankAccountHandleSubmit(verifyBankAccount)} className="space-y-4">
                    <input
                        {...verifyBankAccountRegister("firstDeposit")}
                        type="text"
                        placeholder="Inter first deposit amount"
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        {...verifyBankAccountRegister("secondDeposit")}
                        type="text"
                        placeholder="Inter second deposit amount"
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {
                        verifyAccountId && <p className="text-center font-semibold text-gray-600">Verify ID: {verifyAccountId}</p>
                    }

                    <button
                        className={`w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 ${verifyAccountId && "cursor-not-allowed"}`}
                        type="submit"
                        disabled={verifyBankAccountIsLoading || verifyAccountId}
                    >
                        {verifyBankAccountIsLoading ? "Loading..." : "Verify Bank Account"}
                    </button>

                </form>
            </div>

            <div className="flex flex-col items-center space-y-4 p-6 max-w-sm mx-auto bg-gray-100 rounded-lg shadow-lg">
                <input
                    type="number"
                    placeholder="Enter Rent Amount"
                    value={amount}
                    readOnly
                    className="w-full px-4 py-3 text-lg text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-gray-50"
                />

                <button
                    className="w-full py-3 text-white bg-green-500 rounded-md hover:bg-green-600 focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 transition ease-in-out duration-300"
                    onClick={payRent}
                >
                    Pay Rent
                </button>
            </div>



        </div>
    );
};

export default ACH;