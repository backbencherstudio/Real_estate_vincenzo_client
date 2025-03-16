/* eslint-disable react/prop-types */

import { Button } from "antd";

const Plan = ({selectedPlan, getTotalUnit}) => {

    const planData = async ()=>{
        const plan = {planName : selectedPlan.name, getTotalUnit}
        console.log(plan);        
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