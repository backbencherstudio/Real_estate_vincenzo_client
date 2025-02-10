import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../redux/fetures/auth/authSlice';
import authApi from '../../../redux/fetures/auth/authApi';
import { toast } from 'sonner';
import ownerApi from '../../../redux/fetures/owner/ownerApi';

const WithdrawForm = () => {
    const currentUser = useSelector(selectCurrentUser)
    const { data: userData, isLoading, error } = authApi.useGetSingleUserInfoQuery(
        currentUser?.email
    );

    console.log(userData?.data?.paidAmount);

    const [payout] = ownerApi.usePayoutMutation()


    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const [message, setMessage] = useState('');

    const onSubmit = async (data) => {
        setMessage('');

        if (userData?.data?.paidAmount < parseInt(data?.amount)) {
            return toast.warning("Insufficient balance. You cannot withdraw more than your available funds.");
        }

        const withdrowData = {
            ownerId: currentUser?.userId,
            amount: parseInt(data?.amount),
            email: currentUser?.email,
            accountId: data?.accountId
        }       

        const res = await payout(withdrowData)
        if(res?.data?.success){
            toast.success(res.data.message)
        }



        // try {
        //   const response = await fetch('http://localhost:5000/api/withdraw', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data),
        //   });

        //   const responseData = await response.json();
        //   if (response.ok) {
        //     setMessage('Withdrawal request submitted successfully.');
        //     reset(); // Reset form after successful submission
        //   } else {
        //     setMessage(responseData.error || 'Withdrawal failed.');
        //   }
        // } catch (error) {
        //   setMessage('Error submitting withdrawal request.');
        // } finally {
        //   setLoading(false);
        // }

    };

    return (
        <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">

            <h2 className="text-xl font-bold mb-4">Withdraw Form </h2>
            <h2>Current Ballance <span className='font-bold text-green-600 text-[18px] ' >{userData?.data?.paidAmount}</span> </h2>

            {message && <p className="text-center text-red-500">{message}</p>}

            <form onSubmit={handleSubmit(onSubmit)}>

                <label className="block mb-2">
                    Amount:
                    <input
                        type="number"
                        {...register('amount', { required: 'Amount is required', min: { value: 1, message: 'Minimum amount is 1' } })}
                        className="w-full p-2 border rounded-md"
                    />
                    {errors.amount && <span className="text-red-500">{errors.amount.message}</span>}
                </label>

                <label className="block mb-2">
                    Stripe Account ID:
                    <input
                        type="text"
                        {...register('accountId', { required: 'Account ID is required' })}
                        className="w-full p-2 border rounded-md"
                    />
                    {errors.accountId && <span className="text-red-500">{errors.accountId.message}</span>}
                </label>

                <label className="block mb-2">
                    Email:
                    <input
                        type="email"
                        placeholder={`${currentUser?.email}`}
                        readOnly
                        {...register('email')}
                        className="w-full p-2 border rounded-md"
                    />
                    {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                </label>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md mt-4"
                    disabled={isLoading}
                >
                    {isLoading ? 'Processing...' : 'Withdraw'}
                </button>
            </form>
        </div>
    );
};

export default WithdrawForm;
