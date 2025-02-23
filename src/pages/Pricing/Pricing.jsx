import { useState } from 'react';
import adminApi from "../../redux/fetures/admin/adminApi";
import HeaderContent from "../../components/Header/Header";
import landing from "../../assets/landing.svg"
import { IoMdCheckmarkCircle } from "react-icons/io";
import PricingDetails from '../../components/PricingDetails/PricingDetails';
import Plans from '../../components/Plans/Plans';
import FAQ from '../../components/FAQ/FAQ';
const Pricing = () => {
    const [billingCycle, setBillingCycle] = useState('monthly');
    const { data: getPlanData } = adminApi.useGetPlanQuery(undefined, { pollingInterval: 86400000 })
    console.log(getPlanData?.data[0]);
    const Contents = {
        title: "Choose the Right Plan",
        description: "Unlock streamlined processes with solutions for startups and enterprises alike",
        buttonText: "Pricing",
        images: [landing, landing],
    };

    return (
        <div>
            <div className='py-10 lg:pb-20 lg:pt-32'>
                <HeaderContent content={Contents} />
            </div>
            <Plans />
            <PricingDetails />
            <FAQ />
        </div>
    );
};

export default Pricing;