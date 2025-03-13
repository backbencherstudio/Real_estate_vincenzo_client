/* eslint-disable react/prop-types */
import axios from 'axios';
import { useState } from 'react';
import tenantApi from '../../redux/fetures/tenant/tenantApi';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux/fetures/auth/authSlice';
import { useForm } from 'react-hook-form';

const ACH = ({ paymentData, totalAmount, lateFee, setOpen, setSuccessPaymentData, securityDeposit }) => {
    const [customerId, setCustomerId] = useState('');
    const [bankToken, setBankToken] = useState('');
    const [bankAccountId, setBankAccountId] = useState('');
    const [amount, setAmount] = useState(totalAmount);
    const currentUser = useSelector(selectCurrentUser);
    const [createCustomerForACHpayment, { isLoading }] = tenantApi.useCreateCustomerForACHpaymentMutation();
    const [createBankTokenForACHpayment, { isLoading: isLoadinCreateBankToken }] = tenantApi.useCreateBankTokenForACHpaymentMutation();
    const [attachACHbankAccount, { isLoading: isLoadinattachACHbankAccount }] = tenantApi.useAttachACHbankAccountMutation();
    const [verifyBankAccountApi, { isLoading: verifyBankAccountIsLoading }] = tenantApi.useVerifyBankAccountApiMutation();


    const { register, handleSubmit } = useForm();
    const { register: createBankTokenRegister, handleSubmit: createBankTokenHandleSubmit } = useForm();
    const { register: attachBankAccountRegister, handleSubmit: attachBankAccountHandleSubmit } = useForm();
    const { register: verifyBankAccountRegister, handleSubmit: verifyBankAccountHandleSubmit } = useForm();

    const onSubmit = async (data) => {
        const res = await createCustomerForACHpayment(data);
        if (res?.data?.success) {
            setCustomerId(res?.data?.data?.customerId);
        }
    };

    const onSubmitFroCreateBankToken = async (data) => {
        const res = await createBankTokenForACHpayment(data);
        if (res?.data?.success) {
            setBankToken(res?.data?.data?.bankToken);
        }
    };

    const attachBankAccount = async () => {
        const response = await attachACHbankAccount({ customerId, bankToken });
        if (response?.data?.success) {
            setBankAccountId(response?.data?.data?.id);
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
        if (res?.data?.success) {
            console.log(res);
            // setBankAccountId(res?.data?.data?.id);
        }
    };



    // const attachBankAccount2 = async () => {
    //     const response = await axios.post('http://localhost:5000/attach-bank-account', {
    //         customerId,
    //         bankToken,
    //     });
    //     console.log(response);
    //     setBankAccountId(response.data.id);
    //     alert('Bank Account Attached');
    // };

    // Create Bank Account Token
    // const createBankToken = async () => {
    //     const response = await axios.post('http://localhost:5000/create-bank-token', {
    //         account_number: '000123456789', // Sample bank details
    //         routing_number: '110000000',
    //         account_holder_name: 'John Doe',
    //     });
    //     console.log(response);
    // };

    // Attach Bank Account to Customer




    // Verify Bank Account


    // const verifyBankAccount = async () => {
    //     const response = await axios.post('http://localhost:5000/verify-bank-account', {
    //         customerId,
    //         bankAccountId,
    //         amounts,
    //     });
    //     console.log(response);
    //     alert('Bank Account Verified');
    // };



    // Pay Rent via ACH
    const payRent = async () => {

        const res = await axios.post('http://localhost:5000/pay-rent', {
            customerId,
            bankAccountId,
            amount: parseInt(totalAmount) + parseInt(securityDeposit),
            lateFee: parseInt(lateFee),
            monthlyPaymentId: paymentData?.key,
            ownerId: paymentData?.ownerId
        });

        console.log(res);


        alert('Rent Paid Successfully');

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
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                        type="submit"
                        disabled={isLoading}
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
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                        type="submit"
                        disabled={isLoadinCreateBankToken}
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
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                        type="submit"
                        disabled={isLoadinattachACHbankAccount}
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

                    <button
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                        type="submit"
                        disabled={verifyBankAccountIsLoading}
                    >
                        {verifyBankAccountIsLoading ? "Loading..." : "Verify Bank Account"}
                    </button>
                    {/* {bankAccountId && (
                        <>
                            <p className="text-center font-semibold text-gray-600">Bank ID: {bankAccountId}</p>
                            <button
                                className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300"
                            >
                                Next
                            </button>
                        </>
                    )} */}
                </form>
            </div>



            {/* <button className='border p-1 mt-2' onClick={verifyBankAccount}>Verify Bank Account</button> */}

            <input type="number" placeholder="Rent Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />

            <button className='border p-1 mt-2' onClick={payRent}>Pay Rent</button>
        </div>
    );
};

export default ACH;