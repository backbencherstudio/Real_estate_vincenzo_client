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
        // <div className="flex justify-center items-center flex-col" >

        //     <h2>your selected plan Name :: {selectedPlan?.name} </h2>
        //     <h2>total unit:: {getTotalUnit}</h2>

        //     <Button onClick={planData} >Submit</Button>

        // </div>
        <div className="flex flex-col items-center justify-center bg-white shadow-lg rounded-2xl p-6 w-full max-w-md border border-gray-200 mt-5 md:mt-0">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Selected Plan: <span className="text-blue-600">{selectedPlan?.name}</span>
            </h2>
            <h2 className="text-lg text-gray-600 mb-4">
                Total Units: <span className="font-medium text-gray-900">{getTotalUnit}</span>
            </h2>
            <Button
                onClick={planData}
                className="bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
            >
                Submit
            </Button>
        </div>
    );
};

export default Plan;