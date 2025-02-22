import adminApi from "../../redux/fetures/admin/adminApi";

const Pricing = () => {
    const {data : getPlanData } = adminApi.useGetPlanQuery(undefined, { pollingInterval : 86400000 })
    console.log(getPlanData?.data[0]);
    
    return (
        <div>
            <h2>this is pricing page</h2>
        </div>
    );
};

export default Pricing;