import adminApi from "../../../redux/fetures/admin/adminApi";


const PayOutData = () => {

    const {data} = adminApi.usePayoutDataGetByAdminQuery()

    console.log(data?.data);
    
    return (
        <div>
            
        </div>
    );
};

export default PayOutData;