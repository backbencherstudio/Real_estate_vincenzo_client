import { useState, useEffect } from 'react';
import adminApi from "../../redux/fetures/admin/adminApi";
import PricingDetails from '../../components/PricingDetails/PricingDetails';
import Plans from '../../components/Plans/Plans';
import FAQ from '../../components/FAQ/FAQ';
const Pricing = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const [billingCycle, setBillingCycle] = useState('monthly');
    const { data: getPlanData } = adminApi.useGetPlanQuery(undefined, { pollingInterval: 86400000 })

    const planData = getPlanData?.data[0]
    

    return (
        <div>
            <Plans planData={planData} />
            <PricingDetails planData={planData} />
            <FAQ />
        </div>
    );
};

export default Pricing;