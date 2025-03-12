import PropertyManagementCosts from "./PropertyManagementCosts";
import HeaderContent from "../../components/Header/Header";
import landing from "../../assets/landing.svg"
import dashboardImage from "../../assets/dashboard.png"
import { useEffect } from "react";
import JoinOurCommunity from "../../components/AboutComponents/JoinOurCommunity";
import Plans from "../../components/Plans/Plans";
import WhyChoooseUs from "../../components/HomeComponents/WhyChoooseUs";
import Testimonials from "../../components/HomeComponents/Testimonials";
import Features from "../../components/HomeComponents/Features";
import authApi from "../../redux/fetures/auth/authApi";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import adminApi from "../../redux/fetures/admin/adminApi";
import { Button } from "antd";
const Home = () => {
    const [emailCollection, { isLoading }] = authApi.useEmailCollectionMutation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const { data: getPlanData } = adminApi.useGetPlanQuery(undefined, { pollingInterval: 86400000 })

    const planData = getPlanData?.data[0]
    const Contents = {
        title: "The Best Property Management Solution",
        description: "This software boosts revenue, keeps you organized, and grows your business with advanced tech and top support.",
        buttonText: "Renting Made Simple",
        images: [landing, landing],
    };


    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const onSubmit = async (data) => {
        const res = await emailCollection({ email: data.email });
        if (res?.data?.success) {
            toast.success(res?.data?.message)
            reset()
        }
    };




    return (
        <div>
            <div className="px-4 lg:px-0 bg-gradient-to-b from-zinc-50 to-zinc-100" >
                <div className="w-full  max-w-7xl mx-auto">
                    <div className=" mx-auto flex flex-col items-center ">
                        <div className='py-10 lg:pb-20 lg:pt-32'>
                            <HeaderContent content={Contents} />
                            <div className="flex justify-center">
                                <form
                                    onSubmit={handleSubmit(onSubmit)}
                                    className="flex justify-center gap-3 bg-white rounded-2xl p-1 w-full max-w-2xl"
                                    style={{ boxShadow: "0px 26px 62px 0px rgba(227, 229, 234, 0.50)" }}
                                >
                                    <div className="flex-1">
                                        <input
                                            type="email"
                                            placeholder="Enter your email address.."
                                            {...register("email", {
                                                required: "Email is required",
                                                pattern: {
                                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                                    message: "Invalid email address"
                                                }
                                            })}
                                            className="bg-transparent w-full h-[100%] outline-none px-3 "
                                            autoComplete="off"
                                        />
                                        {errors.email && (
                                            <p className="text-red-500 text-sm px-3">{errors.email.message}</p>
                                        )}
                                    </div>
                                    <Button type="primary" disabled={isLoading} htmlType="submit" className="m-1 px-8 pt-5 pb-6 text-[18px]" >Send</Button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className=" mx-auto mt-14 ">
                        <div className="w-full h-auto flex justify-center">
                            <img
                                className="w-full max-w-[100%] h-auto object-contain"
                                src={dashboardImage}
                                alt="Dashboard Preview"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-24">
                <JoinOurCommunity />
            </div>
            <div className="max-w-[1400px] mx-auto" >
                <PropertyManagementCosts />
                <Features />
            </div>

            <WhyChoooseUs />

            <div className="max-w-[1400px] mx-auto" >
                <Plans planData={planData} />
            </div>
            <Testimonials />
        </div>
    );
};

export default Home;