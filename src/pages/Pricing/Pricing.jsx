import { useState, useEffect } from 'react';
import adminApi from "../../redux/fetures/admin/adminApi";
import HeaderContent from "../../components/Header/Header";
import landing from "../../assets/landing.svg"
import PricingDetails from '../../components/PricingDetails/PricingDetails';
import Plans from '../../components/Plans/Plans';
import FAQ from '../../components/FAQ/FAQ';
const Pricing = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const [billingCycle, setBillingCycle] = useState('monthly');
    const { data: getPlanData } = adminApi.useGetPlanQuery(undefined, { pollingInterval: 86400000 })
    console.log(getPlanData?.data[0]);
   

    return (
        <div>
            <div className='py-10 lg:pb-6 lg:pt-32'>
                <HeaderContent content={Contents} />
            </div>
            <Plans />
            <PricingDetails />
            <FAQ />
        </div>
    );
};

export default Pricing;