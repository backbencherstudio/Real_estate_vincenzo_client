import { useForm } from 'react-hook-form';
import authApi from '../../redux/fetures/auth/authApi';
import { toast } from 'sonner';

const ContactForm = () => {


    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [contactUs, {isLoading}] = authApi.useContactUsMutation()


    const onSubmit = async (data) => {
        const res = await contactUs(data)
        if(res?.data?.success){
            toast.success(res?.data?.message)
            reset()
        }
    }

    return (
        <div className='max-w-7xl mx-auto my-20'>
            <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-1 md:grid-cols-3 gap-6 px-4 lg:px-0'>
                <div className="relative">
                    <input
                        type="text"
                        placeholder=""
                        className="peer w-full px-4 py-6 border border-gray-300 rounded-2xl focus:outline-none focus:border-[#CDCDCD]"
                        {...register("fullName", { required: true })}
                    />
                    <label className="absolute font-medium left-4 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-[#070127]">
                        Full Name
                    </label>
                    {errors.fullName && <span className="text-red-500 text-sm">This field is required</span>}
                </div>
                <div className="relative">
                    <input
                        type="email"
                        placeholder=""
                        className="peer w-full px-4 py-6 border border-gray-300 rounded-2xl focus:outline-none focus:border-[#CDCDCD]"
                        {...register("email", { required: true })}
                    />
                    <label className="absolute font-medium left-4 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-[#070127]">
                        Email
                    </label>
                    {errors.email && <span className="text-red-500 text-sm">This field is required</span>}
                </div>
                <div className="relative">
                    <input
                        type="number"
                        placeholder=""
                        className="peer w-full px-4 py-6 border border-gray-300 rounded-2xl focus:outline-none focus:border-[#CDCDCD]"
                        {...register("mobileNumber", { required: true })}
                    />
                    <label className="absolute font-medium left-4 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-[#070127]">
                       Mobile Number
                    </label>
                    {errors.mobileNumber && <span className="text-red-500 text-sm">This field is required</span>}
                </div>
                <textarea
                    placeholder="Write your message msg..."
                    className="md:col-span-3 peer w-full h-44 px-4 py-6 border border-gray-300 rounded-2xl focus:outline-none focus:border-[#CDCDCD]"
                    {...register("message", { required: true })}
                />
                {errors.message && <span className="md:col-span-3 text-red-500 text-sm">This field is required</span>}
                <button type="submit" className="w-32 rounded-[12px] bg-gradient-to-r from-[#4A90E2] to-[#1565C0] p-4 text-white  active:scale-95 transition-all duration-300"> { isLoading ? "Loading..." : "Submit" }</button>
            </form>
        </div>
    );
};

export default ContactForm;