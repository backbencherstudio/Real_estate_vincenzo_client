/* eslint-disable react/prop-types */

import { Button } from "antd";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/fetures/auth/authSlice";
import authApi from "../../../redux/fetures/auth/authApi";
import { toast } from "sonner";

const Plan = ({ selectedPlan, getTotalUnit }) => {
    // console.log(selectedPlan);
    const currentUser = useSelector(selectCurrentUser);
    const [planController] = authApi.usePlanControllerMutation()


    const planData = async () => {
        const plan = { planName: selectedPlan.name, percentage: selectedPlan.price, getTotalUnit, email: currentUser?.email }
        const res = await planController(plan);
        if (res?.data?.success) {
            toast.success(res?.data?.message)
        }
    }



    return (
        <div className="flex justify-center items-center flex-col" >

            <h2>your selected plan Name :: {selectedPlan?.name} </h2>
            <h2>total unit:: {getTotalUnit}</h2>

            <Button onClick={planData} >Submit</Button>

        </div>
    );
};

export default Plan;